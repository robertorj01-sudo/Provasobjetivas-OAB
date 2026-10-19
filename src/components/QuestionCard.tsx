import { useState } from 'react';
import { Flag, Bookmark, CheckCircle2, XCircle, BookOpen, ChevronDown, ChevronUp, Award, Code, AlertTriangle, Lightbulb } from 'lucide-react';
import { Question, OptionLetter, SimuladoMode } from '../types/oab';
import { QuestionJsonModal } from './QuestionJsonModal';
import { questionToRawJson } from '../utils/questionSchemaConverter';

interface QuestionCardProps {
  key?: string | number;
  question: Question;
  selectedOption?: OptionLetter;
  onSelectOption: (option: OptionLetter) => void;
  isFlagged: boolean;
  onToggleFlag: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  mode: SimuladoMode;
  isExamFinished: boolean;
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
  questionNumberOverride?: number;
  onUpdateQuestion?: (updated: Question) => void;
}

export function QuestionCard({
  question,
  selectedOption,
  onSelectOption,
  isFlagged,
  onToggleFlag,
  isBookmarked,
  onToggleBookmark,
  mode,
  isExamFinished,
  fontSize,
  questionNumberOverride,
  onUpdateQuestion,
}: QuestionCardProps) {
  const [showCommentary, setShowCommentary] = useState<boolean>(false);
  const [showJsonModal, setShowJsonModal] = useState<boolean>(false);

  // In study mode or when finished, we show instant verification
  const isEvaluating = mode === 'study' ? Boolean(selectedOption) : isExamFinished;
  const isCorrect = selectedOption === question.correctOption;

  // Derive Pegadinha da FGV
  const rawData = questionToRawJson(question);
  const pegadinha = question.comentario_educativo?.pegadinha_da_fgv || rawData.comentario_educativo?.pegadinha_da_fgv;
  const analiseGabarito = question.comentario_educativo?.analise_gabarito || question.commentary;
  const baseLegal = question.comentario_educativo?.base_legal || question.legalBasis;

  // Typography scale
  const fontSizes = {
    sm: { statement: 'text-sm sm:text-base leading-relaxed', option: 'text-xs sm:text-sm' },
    base: { statement: 'text-base sm:text-lg leading-relaxed', option: 'text-sm sm:text-base' },
    lg: { statement: 'text-lg sm:text-xl leading-relaxed', option: 'text-base sm:text-lg' },
    xl: { statement: 'text-xl sm:text-2xl leading-relaxed', option: 'text-lg sm:text-xl' },
  }[fontSize];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all">
      {/* Top Meta Bar */}
      <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3 py-1 bg-slate-900 text-white font-extrabold text-xs rounded-lg tracking-wide">
            Questão {questionNumberOverride || question.number}
          </span>
          <span className="px-2.5 py-1 bg-amber-100 text-amber-900 font-bold text-xs rounded-lg border border-amber-200">
            {question.discipline}
          </span>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
            {question.topic}
          </span>
        </div>

        {/* Right action icons */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
            {question.difficulty}
          </span>

          <button
            onClick={onToggleFlag}
            title={isFlagged ? 'Remover marcação de revisão' : 'Marcar questão para revisar'}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
              isFlagged
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-amber-700 hover:bg-amber-50 border border-slate-200'
            }`}
          >
            <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-current' : ''}`} />
            <span className="hidden sm:inline">{isFlagged ? 'Marcada' : 'Revisar'}</span>
          </button>

          <button
            onClick={onToggleBookmark}
            title={isBookmarked ? 'Remover dos favoritos' : 'Salvar no Caderno de Estudos'}
            className={`p-1.5 rounded-lg border transition-all ${
              isBookmarked
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 border-slate-200'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={() => setShowJsonModal(true)}
            title="Visualizar ou importar questão no formato JSON da FGV"
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-white text-slate-600 hover:text-amber-700 hover:bg-amber-50 border border-slate-200 transition-all cursor-pointer"
          >
            <Code className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">JSON FGV</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 sm:p-8">
        {/* Source info */}
        <div className="text-xs text-slate-400 font-mono mb-4 flex items-center gap-1.5">
          <span>Origem: {question.examOrigin}</span>
        </div>

        {/* Statement (Enunciado) */}
        <div className={`text-slate-900 font-normal font-sans mb-8 ${fontSizes.statement} select-text`}>
          {question.statement}
        </div>

        {/* Options (Alternativas A, B, C, D) */}
        <div className="space-y-3 mb-8">
          {question.options.map((option) => {
            const isSelected = selectedOption === option.id;
            const isCorrectOption = option.id === question.correctOption;

            let optionStyle = 'border-slate-200 hover:border-amber-300 hover:bg-slate-50/60 text-slate-800';
            let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-200';

            if (isEvaluating) {
              if (isCorrectOption) {
                optionStyle = 'border-emerald-500 bg-emerald-50/60 text-emerald-950 font-medium ring-1 ring-emerald-500/20';
                badgeStyle = 'bg-emerald-600 text-white border-emerald-600';
              } else if (isSelected && !isCorrectOption) {
                optionStyle = 'border-red-400 bg-red-50/60 text-red-950 ring-1 ring-red-400/20';
                badgeStyle = 'bg-red-600 text-white border-red-600';
              } else {
                optionStyle = 'border-slate-200 opacity-60 text-slate-600';
                badgeStyle = 'bg-slate-100 text-slate-400 border-slate-200';
              }
            } else if (isSelected) {
              optionStyle = 'border-amber-600 bg-amber-50/70 text-slate-950 ring-2 ring-amber-600/30 font-medium';
              badgeStyle = 'bg-amber-600 text-white border-amber-600';
            }

            return (
              <button
                key={option.id}
                onClick={() => !isExamFinished && onSelectOption(option.id)}
                disabled={isExamFinished}
                className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-150 flex items-start gap-3.5 group cursor-pointer ${optionStyle}`}
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg border flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 transition-colors ${badgeStyle}`}
                >
                  {option.id}
                </div>
                <div className={`flex-1 pt-0.5 ${fontSizes.option}`}>
                  {option.text}
                </div>
                {isEvaluating && isCorrectOption && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                )}
                {isEvaluating && isSelected && !isCorrectOption && (
                  <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate feedback pill in Study Mode */}
        {mode === 'study' && selectedOption && (
          <div
            className={`p-4 rounded-xl mb-6 flex items-center justify-between gap-3 border ${
              isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-red-50 border-red-200 text-red-900'
            }`}
          >
            <div className="flex items-center gap-2 text-sm font-bold">
              {isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
              <span>{isCorrect ? 'Parabéns! Resposta Correta.' : `Incorreto. A alternativa correta é a letra (${question.correctOption}).`}</span>
            </div>
            <button
              onClick={() => setShowCommentary(!showCommentary)}
              className="text-xs font-extrabold underline hover:opacity-80 transition-opacity"
            >
              {showCommentary ? 'Ocultar Justificativa' : 'Ver Base Legal'}
            </button>
          </div>
        )}

        {/* Gabarito Comentado e Base Legal Accordion */}
        {(isExamFinished || (mode === 'study' && (showCommentary || selectedOption))) && (
          <div className="mt-6 border border-amber-200/80 bg-amber-50/40 rounded-xl p-5 sm:p-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setShowCommentary(!showCommentary)}
            >
              <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm sm:text-base">
                <BookOpen className="w-5 h-5 text-amber-700" />
                <span>Gabarito Comentado & Fundamentação Jurídica</span>
                <span className="text-xs px-2 py-0.5 bg-amber-200/80 text-amber-950 font-bold rounded-md ml-1">
                  Letra ({question.correctOption})
                </span>
              </div>
              <button className="text-amber-800 p-1 hover:bg-amber-100 rounded-lg">
                {showCommentary ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {(showCommentary || isExamFinished) && (
              <div className="mt-4 pt-4 border-t border-amber-200/70 text-slate-800 text-sm sm:text-base leading-relaxed space-y-3.5">
                {/* Legal basis highlight */}
                <div className="p-3.5 bg-white rounded-xl border border-amber-300 shadow-2xs flex items-start gap-2.5">
                  <Award className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block mb-0.5">
                      Base Legal / Jurisprudência Aplicada:
                    </span>
                    <span className="font-semibold text-slate-900 text-xs sm:text-sm">{baseLegal}</span>
                  </div>
                </div>

                {/* Detailed commentary / Análise do Gabarito */}
                <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Análise do Gabarito (Comentário Pedagógico):
                  </span>
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">{analiseGabarito}</p>
                </div>

                {/* Pegadinha da FGV Callout Box */}
                {pegadinha && (
                  <div className="p-4 bg-linear-to-r from-amber-50 to-orange-50/90 rounded-xl border border-amber-300/80 shadow-2xs">
                    <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>Alerta de Pegadinha da FGV / Análise dos Distratores:</span>
                    </div>
                    <p className="text-amber-950 text-xs sm:text-sm font-medium leading-relaxed">
                      {pegadinha}
                    </p>
                  </div>
                )}

                {/* Footer JSON inspector link */}
                <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-mono text-[11px]">ID: {question.id_questao || `oab_fgv_${question.id}`}</span>
                  <button
                    onClick={() => setShowJsonModal(true)}
                    className="flex items-center gap-1.5 font-bold text-amber-800 hover:text-amber-950 underline hover:no-underline cursor-pointer"
                  >
                    <Code className="w-3.5 h-3.5" />
                    <span>Ver ou exportar esquema JSON desta questão</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* JSON Official Schema Modal */}
      <QuestionJsonModal
        isOpen={showJsonModal}
        onClose={() => setShowJsonModal(false)}
        question={question}
        onImportQuestion={onUpdateQuestion}
      />
    </div>
  );
}
