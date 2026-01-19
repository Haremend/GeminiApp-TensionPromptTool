import { GoogleGenAI } from "@google/genai";
import { GeminiModel } from "../types";

// Helper to validate API key
const getApiKey = (): string => {
  const key = process.env.API_KEY;
  if (!key) {
    throw new Error("API Key is missing. Please ensure process.env.API_KEY is available.");
  }
  return key;
};

export const generateImage = async (
  prompt: string, 
  model: GeminiModel
): Promise<string> => {
  const apiKey = getApiKey();
  const ai = new GoogleGenAI({ apiKey });

  // Add negative prompt concepts conceptually by reinforcing positive stylistic choices in the main prompt
  // Gemini Image Gen doesn't always support explicit negative prompts in the standard SDK call the same way SD does,
  // but we can structure the prompt to be very specific.
  const enhancedPrompt = `${prompt} . High quality, detailed, accurate anatomy, dynamic composition.`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [{ text: enhancedPrompt }],
      },
      config: {
        // Nano Banana / Flash Image usually infers settings, but specific aspect ratios can be requested if using Pro
        // For 'Tension', varied aspect ratios often help, but we'll stick to 1:1 or 16:9 for consistency in demo
      }
    });

    // Handle response structure for images
    // The SDK returns candidates with content parts.
    // For images, we look for inlineData (base64).
    
    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
       for (const part of response.candidates[0].content.parts) {
          if (part.inlineData && part.inlineData.data) {
             const base64Data = part.inlineData.data;
             // Determine mime type or default to png
             const mimeType = part.inlineData.mimeType || 'image/png';
             return `data:${mimeType};base64,${base64Data}`;
          }
       }
    }

    throw new Error("No image data found in response.");

  } catch (error) {
    console.error("Gemini Image Gen Error:", error);
    throw error;
  }
};