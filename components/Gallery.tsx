import React from 'react';
import { GeneratedImage, Language } from '../types';
import { Download, Trash2 } from 'lucide-react';
import { UI_TEXT } from '../constants';

interface Props {
  images: GeneratedImage[];
  onDelete: (id: string) => void;
  lang: Language;
}

const Gallery: React.FC<Props> = ({ images, onDelete, lang }) => {
  const t = UI_TEXT[lang].gallery;

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <p className="text-lg">{t.emptyTitle}</p>
        <p className="text-sm">{t.emptyDesc}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {images.map((img) => (
        <div key={img.id} className="bg-tension-panel rounded-xl overflow-hidden border border-slate-700 shadow-xl group">
          <div className="relative aspect-square bg-black">
            <img 
              src={img.url} 
              alt="Generated Result" 
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
               <a 
                 href={img.url} 
                 download={`tension-${img.id}.png`}
                 className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-sm transition-colors"
                 title="Download"
               >
                 <Download size={20} />
               </a>
               <button 
                 onClick={() => onDelete(img.id)}
                 className="p-3 bg-red-500/20 hover:bg-red-500/40 rounded-full text-red-200 backdrop-blur-sm transition-colors"
                 title="Delete"
               >
                 <Trash2 size={20} />
               </button>
            </div>
          </div>
          <div className="p-4">
             <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] uppercase font-bold text-tension-secondary border border-tension-secondary/30 px-2 py-0.5 rounded">
                    {img.model.includes('flash') ? 'Nano/Flash' : 'Pro'}
                </span>
                <span className="text-[10px] text-gray-500">{new Date(img.timestamp).toLocaleTimeString()}</span>
             </div>
             <p className="text-xs text-gray-400 line-clamp-3 font-mono">{img.prompt}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;