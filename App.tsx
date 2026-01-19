import React, { useState } from 'react';
import { ViewMode, GeneratedImage, GeminiModel, Language } from './types';
import TheoryCard from './components/TheoryCard';
import PromptBuilder from './components/PromptBuilder';
import Gallery from './components/Gallery';
import Favorites from './components/Favorites';
import { generateImage } from './services/geminiService';
import { Layout, Paintbrush, Images, Info, AlertTriangle, Languages, Bookmark } from 'lucide-react';
import { UI_TEXT } from './constants';

const App = () => {
  const [view, setView] = useState<ViewMode>(ViewMode.THEORY);
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lang, setLang] = useState<Language>('zh'); 
  const [prefillPrompt, setPrefillPrompt] = useState<string | null>(null);

  const t = UI_TEXT[lang];

  const handleGenerate = async (prompt: string, model: GeminiModel) => {
    setIsGenerating(true);
    setError(null);
    try {
      const imageUrl = await generateImage(prompt, model);
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        url: imageUrl,
        prompt: prompt,
        model: model,
        timestamp: Date.now()
      };
      setImages(prev => [newImage, ...prev]);
      setView(ViewMode.GALLERY);
    } catch (err: any) {
      setError(err.message || "Failed to generate image. Please check API Key or try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDelete = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'zh' : 'en');
  };

  const handleSelectFavorite = (prompt: string) => {
    setPrefillPrompt(prompt);
    setView(ViewMode.BUILDER);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
             <div className="bg-gradient-to-br from-tension-accent to-purple-600 p-2 rounded-lg shadow-lg shadow-red-900/20">
                <Layout className="text-white w-6 h-6" />
             </div>
             <div>
               <h1 className="text-xl font-bold text-white tracking-tight">{t.title}</h1>
               <p className="text-xs text-gray-400">{t.subtitle}</p>
             </div>
          </div>
          
          <div className="flex items-center gap-3">
             <button
               onClick={toggleLanguage}
               className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700"
               title="Switch Language"
             >
                <Languages size={16} />
                <span className="uppercase">{lang}</span>
             </button>

             <nav className="flex bg-slate-800 p-1 rounded-lg">
                <button 
                  onClick={() => setView(ViewMode.THEORY)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${view === ViewMode.THEORY ? 'bg-slate-700 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                >
                  <Info size={16} />
                  <span className="hidden sm:inline">{t.nav.theory}</span>
                </button>
                <button 
                  onClick={() => setView(ViewMode.FAVORITES)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${view === ViewMode.FAVORITES ? 'bg-slate-700 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                >
                  <Bookmark size={16} />
                  <span className="hidden sm:inline">{t.nav.favorites}</span>
                </button>
                <button 
                  onClick={() => setView(ViewMode.BUILDER)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${view === ViewMode.BUILDER ? 'bg-slate-700 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                >
                  <Paintbrush size={16} />
                  <span className="hidden sm:inline">{t.nav.builder}</span>
                </button>
                <button 
                  onClick={() => setView(ViewMode.GALLERY)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${view === ViewMode.GALLERY ? 'bg-slate-700 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                >
                  <Images size={16} />
                  <span className="hidden sm:inline">{t.nav.gallery}</span>
                  {images.length > 0 && (
                    <span className="bg-tension-secondary text-[10px] px-1.5 rounded-full text-white">{images.length}</span>
                  )}
                </button>
             </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full relative">
        
        {/* Error Notification */}
        {error && (
          <div className="absolute top-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 bg-red-900/90 border border-red-500 text-white p-4 rounded-lg shadow-xl flex items-start gap-3 backdrop-blur-sm animate-bounce-in">
             <AlertTriangle className="shrink-0 text-red-200" />
             <div className="flex-1">
               <h4 className="font-bold text-sm">Generation Failed</h4>
               <p className="text-xs text-red-200 mt-1">{error}</p>
             </div>
             <button onClick={() => setError(null)} className="text-red-200 hover:text-white">✕</button>
          </div>
        )}

        <div className="h-full">
          {view === ViewMode.THEORY && <TheoryCard lang={lang} />}
          {view === ViewMode.FAVORITES && <Favorites lang={lang} onSelect={handleSelectFavorite} />}
          {view === ViewMode.BUILDER && (
             <PromptBuilder 
               onGenerate={handleGenerate} 
               isGenerating={isGenerating} 
               lang={lang} 
               prefillPrompt={prefillPrompt}
               onClearPrefill={() => setPrefillPrompt(null)}
             />
          )}
          {view === ViewMode.GALLERY && (
             <Gallery images={images} onDelete={handleDelete} lang={lang} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-500 py-6 text-center text-xs border-t border-slate-900">
        <p>Engineered for Stable Diffusion XL & Gemini (Nano Banana/Pro)</p>
        <p className="mt-1">"Visual Tension" concepts derived from Sakuga animation techniques.</p>
      </footer>
    </div>
  );
};

export default App;