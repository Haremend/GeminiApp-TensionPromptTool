import React, { useState, useEffect } from 'react';
import { getData, UI_TEXT } from '../constants';
import { Wand2, Copy, Check } from 'lucide-react';
import { GeminiModel, Language } from '../types';

interface Props {
  onGenerate: (prompt: string, model: GeminiModel) => void;
  isGenerating: boolean;
  lang: Language;
  prefillPrompt?: string | null;
  onClearPrefill?: () => void;
}

const PromptBuilder: React.FC<Props> = ({ onGenerate, isGenerating, lang, prefillPrompt, onClearPrefill }) => {
  const [subject, setSubject] = useState<string>("1girl, martial arts uniform");
  const [action, setAction] = useState<string>("punching towards camera");
  const [selectedKeywords, setSelectedKeywords] = useState<Set<string>>(new Set());
  const [selectedModel, setSelectedModel] = useState<GeminiModel>(GeminiModel.FLASH_IMAGE);
  const [copied, setCopied] = useState(false);

  const { PERSPECTIVE_MODIFIERS, VISUAL_FX, STYLES, PRESETS } = getData(lang);
  const t = UI_TEXT[lang].builder;

  useEffect(() => {
    if (prefillPrompt) {
      setSubject("");
      setSelectedKeywords(new Set());
      setAction(prefillPrompt);
      if (onClearPrefill) {
        onClearPrefill();
      }
    }
  }, [prefillPrompt, onClearPrefill]);

  const toggleKeyword = (keyword: string) => {
    const newSet = new Set(selectedKeywords);
    if (newSet.has(keyword)) {
      newSet.delete(keyword);
    } else {
      newSet.add(keyword);
    }
    setSelectedKeywords(newSet);
  };

  const loadPreset = (presetBase: string) => {
    setSubject("");
    setAction(presetBase);
    setSelectedKeywords(new Set());
  };

  const constructFinalPrompt = () => {
    const core = subject ? `${subject}, ${action}` : action;
    const modifiers = Array.from(selectedKeywords).join(', ');
    return `(masterpiece, best quality), ${core}, ${modifiers}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(constructFinalPrompt());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const finalPrompt = constructFinalPrompt();

  return (
    <div className="flex flex-col lg:flex-row h-full gap-6 p-4 md:p-6 overflow-hidden">
      {/* LEFT: Controls */}
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2 pb-20 lg:pb-0">
        
        {/* Presets Section */}
        <div className="bg-tension-panel p-4 rounded-xl border border-slate-700">
          <h3 className="text-white font-bold mb-3">{t.presetsTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => loadPreset(preset.basePrompt)}
                className="text-left bg-slate-800 hover:bg-slate-700 border border-slate-600 p-3 rounded-lg transition-colors group"
              >
                <div className="font-semibold text-tension-accent group-hover:text-pink-400">{preset.title}</div>
                <div className="text-xs text-gray-400 mt-1 line-clamp-2">{preset.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{t.subjectLabel}</label>
            <input 
              type="text" 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-tension-secondary outline-none"
              placeholder={t.subjectPlaceholder}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{t.actionLabel}</label>
            <textarea 
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-tension-secondary outline-none h-24 resize-none"
              placeholder={t.actionPlaceholder}
            />
          </div>
        </div>

        {/* Modifiers Grid */}
        <div className="space-y-6">
          {[...PERSPECTIVE_MODIFIERS, ...VISUAL_FX, ...STYLES].map((section) => (
            <div key={section.id}>
              <div className="flex justify-between items-baseline mb-2">
                <h4 className="text-sm font-bold text-gray-200">{section.name}</h4>
                <span className="text-xs text-gray-500 hidden sm:inline">{section.description}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {section.keywords.map(kw => (
                  <button
                    key={kw}
                    onClick={() => toggleKeyword(kw)}
                    className={`px-3 py-1.5 rounded-full text-xs transition-all border ${
                      selectedKeywords.has(kw)
                        ? 'bg-tension-secondary/20 border-tension-secondary text-blue-200 shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                        : 'bg-slate-800 border-slate-700 text-gray-400 hover:border-gray-500'
                    }`}
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: Preview & Generate */}
      <div className="lg:w-[400px] flex flex-col gap-4">
        
        {/* Prompt Output */}
        <div className="bg-black/50 p-4 rounded-xl border border-slate-700">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-gray-500">{t.compiledLabel}</span>
            <button 
              onClick={handleCopy}
              className="text-gray-400 hover:text-white transition-colors"
              title="Copy to clipboard"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
          <div className="text-sm text-gray-300 font-mono break-words bg-slate-900 p-3 rounded min-h-[100px] border border-slate-800">
            {finalPrompt}
          </div>
        </div>

        {/* Model Selection */}
        <div className="bg-tension-panel p-4 rounded-xl border border-slate-700">
           <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{t.modelLabel}</label>
           <select 
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value as GeminiModel)}
              className="w-full bg-slate-900 border border-slate-700 text-white rounded p-2 text-sm outline-none focus:border-tension-secondary"
           >
             <option value={GeminiModel.FLASH_IMAGE}>Gemini 2.5 Flash (Nano Banana) - Fast</option>
             <option value={GeminiModel.PRO_IMAGE}>Gemini 3 Pro Image (High Res) - Slow</option>
           </select>
        </div>

        {/* Generate Button */}
        <button
          onClick={() => onGenerate(finalPrompt, selectedModel)}
          disabled={isGenerating || (!subject && !action)}
          className={`
            w-full py-4 rounded-xl font-bold text-lg tracking-wide flex items-center justify-center gap-2 shadow-lg transition-all
            ${isGenerating || (!subject && !action) 
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-tension-accent to-red-600 text-white hover:scale-[1.02] hover:shadow-red-900/50'
            }
          `}
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>{t.generatingBtn}</span>
            </>
          ) : (
            <>
              <Wand2 size={20} />
              <span>{t.generateBtn}</span>
            </>
          )}
        </button>

        <div className="bg-blue-900/20 border border-blue-500/30 p-3 rounded-lg text-xs text-blue-200">
          {t.tip}
        </div>
      </div>
    </div>
  );
};

export default PromptBuilder;