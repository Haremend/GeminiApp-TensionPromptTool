export enum ViewMode {
  BUILDER = 'BUILDER',
  THEORY = 'THEORY',
  GALLERY = 'GALLERY',
  FAVORITES = 'FAVORITES'
}

export enum GeminiModel {
  FLASH_IMAGE = 'gemini-2.5-flash-image', // "Nano Banana" equivalent
  PRO_IMAGE = 'gemini-3-pro-image-preview' // High Quality
}

export type Language = 'en' | 'zh';

export interface PromptSection {
  id: string;
  name: string;
  description: string;
  keywords: string[];
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  model: string;
  timestamp: number;
}

export interface PresetScenario {
  title: string;
  description: string;
  basePrompt: string;
  technicalNotes: string;
}

export interface TheoryContent {
  title: string;
  desc: string;
  points: { label: string; text: string }[];
}

export interface RecommendedPrompt {
  id: string;
  title: string;
  prompt: string;
}