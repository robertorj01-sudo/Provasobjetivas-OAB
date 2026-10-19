import { useState } from 'react';
import { History, Search, Calendar, Award, Play, CheckCircle, ExternalLink, HelpCircle } from 'lucide-react';
import { FGV_EXAMS_CATALOG } from '../data/fgvExamsCatalog';

interface ExamCatalogViewProps {
  onStartExam: (editionName: string, examId?: string) => void;
}

export function ExamCatalogView({ onStartExam }: ExamCatalogViewProps) {
  const [search, setSearch] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('all');

  const years = Array.from(new Set(FGV_EXAMS_CATALOG.map(e => e.year))).sort((a, b) => b - a);

  const filteredExams = FGV_EXAMS_CATALOG.filter(e => {
    const matchesSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      e.edition.toString().includes(search);
    const matchesYear = selectedYear === 'all' || e.year.toString() === selectedYear;
    return matchesSearch && matchesYear;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
        <div className="flex items-center gap-2.5 text-amber-700 mb-2">
          <History className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Histórico Oficial de Certames</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Provas da Banca FGV (Exames 47, 46, 45, 41 e Histórico Completo)
        </h1>
        <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
          A Fundação Getulio Vargas (FGV) assumiu a realização do Exame de Ordem Unificado em 2010.
          Pratique com os cadernos oficiais, incluindo os recém-incorporados <strong>47º Exame</strong>, <strong>46º Exame</strong> e <strong>45º Exame de Ordem Unificado (Tipo 1 - Branca)</strong> com todas as 80 questões gabaritadas e comentadas pedagogicamente.
        </p>

        {/* Filter bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por edição (ex: 47º, 46º, 45º, 41º, 38º) ou tema..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full sm:w-auto px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            >
              <option value="all">Todos os Anos</option>
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Exams */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredExams.map((exam) => {
          const isExam47 = exam.id === 'oab-47';
          const isExam46 = exam.id === 'oab-46';
          const isExam45 = exam.id === 'oab-45';
          const isFeatured = isExam47 || isExam46 || isExam45;
          const isDirectlyAvailable = exam.id === 'oab-47' || exam.id === 'oab-46' || exam.id === 'oab-45' || exam.id === 'oab-41';

          return (
            <div
              key={exam.id}
              className={`bg-white rounded-2xl p-6 border shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group ${
                isFeatured ? 'border-amber-400 ring-2 ring-amber-400/20 bg-linear-to-b from-amber-50/20 to-white' : 'border-slate-200 hover:border-amber-400/80'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-amber-100 text-amber-900 font-extrabold text-xs rounded-lg border border-amber-200">
                      {exam.edition}º Exame
                    </span>
                    {isFeatured && (
                      <span className="px-2.5 py-0.5 bg-emerald-600 text-white font-extrabold text-[10px] rounded-md uppercase tracking-wider animate-pulse">
                        NOVO NO BANCO
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-slate-400">
                    Ano {exam.year} • 1ª Fase
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-lg group-hover:text-amber-700 transition-colors">
                  {exam.name}
                </h3>

                <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {exam.description}
                </p>

                {/* Statistics & Meta */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Data / Caderno:</span>
                    <span className="font-semibold text-slate-700">{exam.officialDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Aprovação Histórica:</span>
                    <span className="font-bold text-amber-700">{exam.passRatePercentage}% dos candidatos</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 flex items-center justify-between gap-3">
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                  isDirectlyAvailable ? 'text-emerald-700 bg-emerald-50 font-bold' : 'text-slate-600 bg-slate-100'
                }`}>
                  {isDirectlyAvailable ? '80Q Gabaritadas & Comentadas' : '80 Questões Estruturadas'}
                </span>

                <button
                  onClick={() => onStartExam(exam.name, exam.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 font-bold text-xs rounded-xl shadow-xs transition-all ${
                    isFeatured
                      ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/30'
                      : 'bg-slate-900 hover:bg-amber-600 text-white'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isFeatured ? `Iniciar ${exam.edition}º Exame` : 'Praticar Este Exame'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
