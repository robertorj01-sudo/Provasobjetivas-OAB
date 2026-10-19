import { useState } from 'react';
import { Scale, Play, Filter, BookOpen, Layers } from 'lucide-react';
import { OAB_OFFICIAL_DISTRIBUTION } from '../data/oabOfficialDistributions';
import { DisciplineType } from '../types/oab';

interface DisciplinePickerViewProps {
  onSelectDiscipline: (discipline: DisciplineType) => void;
}

export function DisciplinePickerView({ onSelectDiscipline }: DisciplinePickerViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
        <div className="flex items-center gap-2.5 text-amber-700 mb-2">
          <Scale className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Treinamento Direcionado</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Treino por Disciplina da 1ª Fase OAB
        </h1>
        <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
          Selecione uma das 19 disciplinas oficiais do edital da FGV para praticar com questões reais comentadas.
          Foque nas matérias de maior peso (como Ética Profissional com 8 questões, Constitucional, Civil e Processual com 6 cada).
        </p>
      </div>

      {/* Grid of Disciplines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {OAB_OFFICIAL_DISTRIBUTION.map((dist) => {
          const isHighWeight = dist.questionCount >= 6;
          return (
            <div
              key={dist.discipline}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 hover:border-amber-400/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-xs font-extrabold uppercase ${
                      isHighWeight
                        ? 'bg-amber-100 text-amber-900 border border-amber-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {dist.questionCount} Questões no Exame
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    Q{dist.questionRange[0]} a Q{dist.questionRange[1]}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                  {dist.discipline}
                </h3>

                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Histórico oficial cobrado pela FGV com jurisprudência vinculante e base legislativa.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">
                  Caderno FGV
                </span>

                <button
                  onClick={() => onSelectDiscipline(dist.discipline)}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-colors shadow-2xs"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Praticar Matéria</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
