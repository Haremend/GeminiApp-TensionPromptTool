import React from 'react';
import { RecommendedPrompt, Language } from '../types';
import { RECOMMENDED_PROMPTS } from '../recommendedPrompts';
import { UI_TEXT } from '../constants';
import { ArrowRight, Bookmark } from 'lucide-react';

interface Props {
  onSelect: (prompt: string) => void;
  lang: Language;
}

const Favorites: React.FC<Props> = ({ onSelect, lang }) => {
  const t = UI_TEXT[lang].favorites;

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <Bookmark className="text-yellow-400 fill-yellow-400" />
        {t.title}
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {RECOMMENDED_PROMPTS.map((item) => (
          <div key={item.id} className="bg-tension-panel border border-slate-700 p-5 rounded-xl hover:border-slate-500 transition-colors shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
               <div className="flex-1 w-full">
                 <h3 className="font-bold text-lg text-tension-accent mb-2">{item.title}</h3>
                 <div className="relative">
                   <p className="text-sm text-gray-300 font-mono bg-slate-950 p-3 rounded border border-slate-800 break-words">
                      {item.prompt}
                   </p>
                 </div>
               </div>
               <button 
                 onClick={() => onSelect(item.prompt)}
                 className="shrink-0 w-full md:w-auto bg-slate-700 hover:bg-tension-secondary text-white px-5 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md group"
               >
                 <span>{t.apply}</span>
                 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;