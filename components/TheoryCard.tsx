import React from 'react';
import { Camera, Zap, MoveDiagonal } from 'lucide-react';
import { getTheoryContent } from '../constants';
import { Language } from '../types';

interface Props {
  lang: Language;
}

const TheoryCard: React.FC<Props> = ({ lang }) => {
  const content = getTheoryContent(lang);
  const icons = [Camera, MoveDiagonal, Zap];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {content.map((card, idx) => {
        const Icon = icons[idx % icons.length];
        return (
          <div key={idx} className="bg-tension-panel border border-slate-700 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Icon className="text-tension-accent w-6 h-6" />
              <h3 className="text-xl font-bold text-white">{card.title}</h3>
            </div>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed min-h-[60px]">
              {card.desc}
            </p>
            <ul className="list-disc list-inside text-gray-400 text-sm space-y-2">
              {card.points.map((p, pIdx) => (
                <li key={pIdx}>
                  <span className="text-white font-semibold">{p.label}:</span> {p.text}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default TheoryCard;