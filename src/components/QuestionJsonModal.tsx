import { useState } from 'react';
import { X, Copy, Check, Code, ArrowDownToLine, AlertTriangle, Sparkles } from 'lucide-react';
import { Question, RawJsonQuestion } from '../types/oab';
import { questionToRawJson, rawJsonToQuestion } from '../utils/questionSchemaConverter';

interface QuestionJsonModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: Question;
  onImportQuestion?: (newQuestion: Question) => void;
}

export function QuestionJsonModal({
  isOpen,
  onClose,
  question,
  onImportQuestion,
}: QuestionJsonModalProps) {
  const [activeTab, setActiveTab] = useState<'view' | 'import'>('view');
  const [copied, setCopied] = useState(false);
  const [importInput, setImportInput] = useState('');
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);

  if (!isOpen) return null;

  const currentJson = JSON.stringify(questionToRawJson(question), null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImport = () => {
    setImportError(null);
    try {
      const parsed: RawJsonQuestion = JSON.parse(importInput);

      if (!parsed.enunciado || !parsed.alternativas || !parsed.gabarito_correto) {
        throw new Error('O JSON deve conter "enunciado", "alternativas" (com chaves A, B, C, D) e "gabarito_correto".');
      }

      if (!['A', 'B', 'C', 'D'].includes(parsed.gabarito_correto.toUpperCase())) {
        throw new Error('O campo "gabarito_correto" deve ser "A", "B", "C" ou "D".');
      }

      const converted = rawJsonToQuestion(
        parsed,
        question.number,
        parsed.exame || question.examOrigin
      );

      if (onImportQuestion) {
        onImportQuestion(converted);
      }

      setImportSuccess(true);
      setTimeout(() => {
        setImportSuccess(false);
        onClose();
      }, 1200);
    } catch (err: any) {
      setImportError(err?.message || 'Erro ao processar o formato JSON.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Estrutura JSON Oficial da Questão (Padrão FGV)
              </h3>
              <p className="text-xs text-slate-500">
                Esquema pedagógico com análise do gabarito, base legal e pegadinha da FGV
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex items-center px-6 pt-3 border-b border-slate-100 gap-3">
          <button
            onClick={() => setActiveTab('view')}
            className={`pb-2.5 text-xs font-bold transition-all border-b-2 ${
              activeTab === 'view'
                ? 'border-amber-600 text-amber-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Visualizar / Copiar JSON
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`pb-2.5 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'import'
                ? 'border-amber-600 text-amber-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <ArrowDownToLine className="w-3.5 h-3.5" />
            <span>Importar / Carregar JSON Personalizado</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 font-sans">
          {activeTab === 'view' ? (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500">
                  Formato compatível com importação/exportação e APIs:
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-all shadow-2xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copiado para Área de Transferência!' : 'Copiar JSON'}</span>
                </button>
              </div>

              <pre className="p-4 bg-slate-950 text-emerald-400 font-mono text-xs rounded-2xl overflow-x-auto leading-relaxed border border-slate-800 select-all max-h-96">
                {currentJson}
              </pre>

              <div className="mt-4 p-3.5 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  Este formato encapsula <strong>id_questao</strong>, <strong>alternativas (A, B, C, D)</strong>, <strong>gabarito_correto</strong> e o objeto <strong>comentario_educativo</strong> com a fundamentação de artigos e o alerta contra a <strong>pegadinha_da_fgv</strong>.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Cole abaixo qualquer objeto JSON no esquema oficial para carregar diretamente nesta questão do simulado:
              </p>

              <textarea
                value={importInput}
                onChange={(e) => {
                  setImportInput(e.target.value);
                  setImportError(null);
                }}
                placeholder={`{\n  "id_questao": "oab_fgv_41_et_01",\n  "exame": "41º Exame de Ordem Unificado",\n  "disciplina": "Ética Profissional",\n  "enunciado": "...",\n  "alternativas": {\n    "A": "...",\n    "B": "...",\n    "C": "...",\n    "D": "..."\n  },\n  "gabarito_correto": "C",\n  "comentario_educativo": {\n    "analise_gabarito": "...",\n    "base_legal": "...",\n    "pegadinha_da_fgv": "..."\n  }\n}`}
                className="w-full h-64 p-3.5 bg-slate-900 text-emerald-400 font-mono text-xs rounded-2xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />

              {importError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{importError}</span>
                </div>
              )}

              {importSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Questão importada com sucesso no simulado!</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleImport}
                  disabled={!importInput.trim()}
                  className="px-5 py-2 text-xs font-bold bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white rounded-xl shadow-xs transition-colors"
                >
                  Processar e Aplicar Questão
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
