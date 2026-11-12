import { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Cell,
  LabelList,
} from 'recharts';
import {
  Award,
  AlertCircle,
  Clock,
  RotateCcw,
  ChevronRight,
  BarChart2,
  TrendingUp,
  TrendingDown,
  Filter,
  X,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { SimuladoResult, Question, OptionLetter, DisciplineScore } from '../types/oab';
import { QuestionCard } from './QuestionCard';

interface ResultDashboardProps {
  result: SimuladoResult;
  questions: Question[];
  userAnswers: Record<number, OptionLetter>;
  flaggedQuestions: Record<number, boolean>;
  onRetake: () => void;
  onBookmarkQuestion: (id: number) => void;
  bookmarkedQuestions: Record<number, boolean>;
}

type ChartMetricMode = 'percentage' | 'counts';
type ChartSortMode = 'lowest' | 'highest' | 'exam';

interface ChartDisciplineDatum extends DisciplineScore {
  shortLabel: string;
  tierLabel: 'Ponto Forte' | 'Zona de Atenção' | 'Reforço Crítico';
  barColor: string;
}

const SHORT_DISCIPLINE_LABELS: Record<string, string> = {
  'Ética Profissional': 'Ética Profissional',
  'Filosofia do Direito': 'Filosofia do Direito',
  'Direito Constitucional': 'Constitucional',
  'Direitos Humanos': 'Direitos Humanos',
  'Direito Eleitoral': 'Eleitoral',
  'Direito Internacional': 'Internacional',
  'Direito Tributário': 'Tributário',
  'Direito Financeiro': 'Financeiro',
  'Direito Administrativo': 'Administrativo',
  'Direito Ambiental': 'Ambiental',
  'Direito Civil': 'Direito Civil',
  'Estatuto da Criança e do Adolescente (ECA)': 'ECA',
  'Estatuto da Criança e do Adolescente': 'ECA',
  'Direito do Consumidor': 'Consumidor',
  'Direito Empresarial': 'Empresarial',
  'Direito Processual Civil': 'Processo Civil',
  'Direito Penal': 'Direito Penal',
  'Direito Processual Penal': 'Processo Penal',
  'Direito Previdenciário': 'Previdenciário',
  'Direito do Trabalho': 'Trabalho',
  'Direito Processual do Trabalho': 'Proc. do Trabalho',
};

function getTierInfo(percentage: number): {
  tierLabel: ChartDisciplineDatum['tierLabel'];
  barColor: string;
} {
  if (percentage >= 60) {
    return { tierLabel: 'Ponto Forte', barColor: '#059669' };
  }
  if (percentage >= 40) {
    return { tierLabel: 'Zona de Atenção', barColor: '#d97706' };
  }
  return { tierLabel: 'Reforço Crítico', barColor: '#e11d48' };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: ChartDisciplineDatum }>;
}

function DisciplineChartTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  const item = payload[0]?.payload;
  if (!item) return null;

  const statusTextColor =
    item.percentage >= 60
      ? 'text-emerald-700'
      : item.percentage >= 40
      ? 'text-amber-700'
      : 'text-rose-700';

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-3.5 min-w-[230px] text-xs">
      <div className="font-bold text-slate-900 text-sm leading-snug mb-1">
        {item.discipline}
      </div>
      <div className={`font-semibold mb-2.5 ${statusTextColor}`}>
        {item.tierLabel} · <span className="font-mono tabular-nums">{item.percentage}%</span> de aproveitamento
      </div>
      <div className="space-y-1 border-t border-slate-100 pt-2 text-slate-600 tabular-nums font-mono">
        <div className="flex items-center justify-between gap-4">
          <span className="font-sans text-slate-500">Acertos:</span>
          <span className="font-bold text-emerald-700">
            {item.correct} / {item.total}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="font-sans text-slate-500">Erros:</span>
          <span className="font-bold text-rose-600">{item.wrong}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="font-sans text-slate-500">Em branco:</span>
          <span className="font-bold text-slate-500">{item.unanswered}</span>
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-400">
        Clique na barra para filtrar as questões abaixo
      </div>
    </div>
  );
}

export function ResultDashboard({
  result,
  questions,
  userAnswers,
  flaggedQuestions,
  onRetake,
  onBookmarkQuestion,
  bookmarkedQuestions,
}: ResultDashboardProps) {
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong' | 'correct' | 'flagged'>('wrong');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>(null);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number | null>(null);
  const [chartMetric, setChartMetric] = useState<ChartMetricMode>('percentage');
  const [chartSort, setChartSort] = useState<ChartSortMode>('lowest');
  const [showDetailedTable, setShowDetailedTable] = useState(false);

  // Trigger celebratory confetti on pass (>= 40 acertos)
  useEffect(() => {
    if (result.isApproved) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Safe fallback if canvas is restricted
      }
    }
  }, [result.isApproved]);

  const formatSeconds = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (h > 0) return `${h}h ${m}m ${s}s`;
    return `${m}m ${s}s`;
  };

  // Active disciplines present in this exam/session (total > 0)
  const activeScores = useMemo(
    () => result.disciplineScores.filter((d) => d.total > 0),
    [result.disciplineScores]
  );

  // Enrich & sort chart data according to user-selected sort mode
  const chartData: ChartDisciplineDatum[] = useMemo(() => {
    const enriched = activeScores.map((d) => {
      const { tierLabel, barColor } = getTierInfo(d.percentage);
      return {
        ...d,
        shortLabel: SHORT_DISCIPLINE_LABELS[d.discipline] || d.discipline,
        tierLabel,
        barColor,
      };
    });

    if (chartSort === 'highest') {
      return [...enriched].sort((a, b) =>
        b.percentage !== a.percentage ? b.percentage - a.percentage : b.correct - a.correct
      );
    }
    if (chartSort === 'lowest') {
      return [...enriched].sort((a, b) =>
        a.percentage !== b.percentage
          ? a.percentage - b.percentage
          : b.wrong + b.unanswered - (a.wrong + a.unanswered)
      );
    }
    return enriched;
  }, [activeScores, chartSort]);

  // Compute ranked strengths and weaknesses cleanly from activeScores
  const topStrengths = useMemo(
    () =>
      [...activeScores]
        .sort((a, b) => (b.percentage !== a.percentage ? b.percentage - a.percentage : b.correct - a.correct))
        .slice(0, 4),
    [activeScores]
  );

  const topWeaknesses = useMemo(
    () =>
      [...activeScores]
        .sort((a, b) =>
          a.percentage !== b.percentage
            ? a.percentage - b.percentage
            : b.wrong + b.unanswered - (a.wrong + a.unanswered)
        )
        .slice(0, 4),
    [activeScores]
  );

  const tierCounts = useMemo(() => {
    let strong = 0;
    let medium = 0;
    let critical = 0;
    for (const d of activeScores) {
      if (d.percentage >= 60) strong++;
      else if (d.percentage >= 40) medium++;
      else critical++;
    }
    return { strong, medium, critical };
  }, [activeScores]);

  const handleToggleDisciplineFilter = (discipline: string) => {
    setSelectedQuestionIndex(null);
    setSelectedDiscipline((prev) => (prev === discipline ? null : discipline));
  };

  const flaggedTotal = useMemo(
    () => questions.filter((q) => Boolean(flaggedQuestions[q.id])).length,
    [questions, flaggedQuestions]
  );

  // Filter questions for the review list
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (selectedDiscipline && q.discipline !== selectedDiscipline) return false;
      const ans = userAnswers[q.id];
      const isCorrect = ans === q.correctOption;
      const isFlag = Boolean(flaggedQuestions[q.id]);

      if (reviewFilter === 'wrong') return !ans || !isCorrect;
      if (reviewFilter === 'correct') return isCorrect;
      if (reviewFilter === 'flagged') return isFlag;
      return true;
    });
  }, [questions, userAnswers, flaggedQuestions, reviewFilter, selectedDiscipline]);

  const chartHeight = Math.max(360, chartData.length * 32 + 48);
  const totalExamQuestions = result.totalQuestions || questions.length || 80;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* 1. Approval / Result Hero Banner */}
      <div
        className={`rounded-3xl p-6 sm:p-10 border shadow-sm mb-8 text-center transition-all ${
          result.isApproved
            ? 'bg-gradient-to-b from-emerald-50 via-white to-emerald-50/30 border-emerald-300'
            : 'bg-gradient-to-b from-amber-50 via-white to-amber-50/30 border-amber-300'
        }`}
      >
        <div className="inline-flex p-4 rounded-2xl mb-4 shadow-sm bg-white border border-slate-100">
          {result.isApproved ? (
            <Award className="w-12 h-12 text-emerald-600 animate-bounce" />
          ) : (
            <AlertCircle className="w-12 h-12 text-amber-600" />
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight text-balance">
          {result.isApproved ? 'Aprovado na 1ª Fase da OAB!' : 'Continue treinando para os 40 pontos'}
        </h1>

        <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          {result.isApproved
            ? `Excelente resultado! Você atingiu ${result.correctCount} acertos, superando a nota de corte oficial da banca FGV (40 acertos de ${totalExamQuestions} questões). Você estaria apto para a 2ª Fase!`
            : `Você atingiu ${result.correctCount} de ${totalExamQuestions} pontos (${result.scorePercentage}%). Para a aprovação oficial da OAB/FGV são necessários 40 acertos (50%). Faltaram ${Math.max(
                0,
                40 - result.correctCount
              )} acerto(s). Use o painel de estatísticas abaixo para identificar onde ganhar pontos rapidamente.`}
        </p>

        {/* Big Numbers Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 max-w-3xl mx-auto">
          <div className="bg-white p-4 rounded-2xl border border-slate-200">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {result.correctCount} <span className="text-sm font-medium text-slate-400">/ {totalExamQuestions}</span>
            </div>
            <div className="text-xs font-semibold text-emerald-700 mt-1 tabular-nums">
              Acertos ({result.scorePercentage}%)
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {result.wrongCount}
            </div>
            <div className="text-xs font-semibold text-rose-600 mt-1">Erros</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {result.unansweredCount}
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Em branco</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center justify-center gap-1.5">
              <Clock className="w-5 h-5 text-amber-600 shrink-0" />
              <span className="text-lg sm:text-xl font-mono tabular-nums">
                {formatSeconds(result.timeSpentSeconds)}
              </span>
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Tempo Gasto</div>
          </div>
        </div>

        {/* Retake Simulado Button */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={onRetake}
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-sm transition-all whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Refazer este Simulado</span>
          </button>
        </div>
      </div>

      {/* 2. Painel de Estatísticas por Disciplina (Recharts) */}
      <section
        aria-label="Painel de estatísticas por disciplina"
        className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8"
      >
        {/* Header + Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-amber-600 shrink-0" />
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Painel de Estatísticas por Disciplina
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              <span>{activeScores.length} disciplinas avaliadas</span>
              <span aria-hidden="true" className="mx-1.5">·</span>
              <span>Referência de aprovação OAB: 50%</span>
              <span aria-hidden="true" className="mx-1.5">·</span>
              <span>Clique em uma disciplina para filtrar a revisão</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Metric Toggle */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setChartMetric('percentage')}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  chartMetric === 'percentage'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                % Aproveitamento
              </button>
              <button
                type="button"
                onClick={() => setChartMetric('counts')}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  chartMetric === 'counts'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Acertos vs. Erros
              </button>
            </div>

            {/* Sort Toggle */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setChartSort('lowest')}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  chartSort === 'lowest'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Menor %
              </button>
              <button
                type="button"
                onClick={() => setChartSort('highest')}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  chartSort === 'highest'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Maior %
              </button>
              <button
                type="button"
                onClick={() => setChartSort('exam')}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  chartSort === 'exam'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Ordem da Prova
              </button>
            </div>
          </div>
        </div>

        {/* Performance Distribution Summary Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 border border-slate-200 rounded-2xl my-6 bg-slate-50/50">
          <div className="px-4 py-3.5 flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Pontos Fortes (≥ 60%)</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Desempenho sólido de aprovação</div>
            </div>
            <div className="text-2xl font-extrabold text-emerald-700 font-mono tabular-nums">
              {tierCounts.strong}
            </div>
          </div>

          <div className="px-4 py-3.5 flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Zona de Atenção (40%–59%)</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Perto da linha de corte OAB</div>
            </div>
            <div className="text-2xl font-extrabold text-amber-700 font-mono tabular-nums">
              {tierCounts.medium}
            </div>
          </div>

          <div className="px-4 py-3.5 flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>Reforço Crítico (&lt; 40%)</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Prioridade imediata de estudo</div>
            </div>
            <div className="text-2xl font-extrabold text-rose-700 font-mono tabular-nums">
              {tierCounts.critical}
            </div>
          </div>
        </div>

        {/* Recharts Horizontal Bar Chart */}
        {chartData.length > 0 ? (
          <div className="w-full">
            <div style={{ height: chartHeight }} className="w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ top: 18, right: 44, left: 8, bottom: 8 }}
                  barCategoryGap={6}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  {chartMetric === 'percentage' ? (
                    <XAxis
                      type="number"
                      domain={[0, 100]}
                      ticks={[0, 25, 50, 75, 100]}
                      tickFormatter={(v) => `${v}%`}
                      tick={{ fontSize: 11, fill: '#64748b' }}
                      axisLine={{ stroke: '#cbd5e1' }}
                      tickLine={false}
                    />
                  ) : (
                    <XAxis
                      type="number"
                      allowDecimals={false}
                      tick={{ fontSize: 11, fill: '#64748b' }}
                      axisLine={{ stroke: '#cbd5e1' }}
                      tickLine={false}
                    />
                  )}
                  <YAxis
                    type="category"
                    dataKey="shortLabel"
                    width={142}
                    tick={{ fontSize: 12, fill: '#1e293b', fontWeight: 600 }}
                    axisLine={false}
                    tickLine={false}
                    interval={0}
                  />
                  <Tooltip
                    cursor={{ fill: '#f1f5f9' }}
                    content={<DisciplineChartTooltip />}
                  />
                  {chartMetric === 'percentage' && (
                    <ReferenceLine
                      x={50}
                      stroke="#475569"
                      strokeDasharray="4 4"
                      strokeWidth={1.5}
                      label={{
                        value: 'Corte 50%',
                        position: 'top',
                        fill: '#475569',
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    />
                  )}

                  {chartMetric === 'percentage' ? (
                    <Bar
                      dataKey="percentage"
                      radius={[0, 6, 6, 0]}
                      barSize={20}
                      className="cursor-pointer"
                      onClick={(_data, index) => {
                        const row = chartData[index];
                        if (row) handleToggleDisciplineFilter(row.discipline);
                      }}
                    >
                      {chartData.map((entry) => {
                        const isDimmed =
                          selectedDiscipline !== null && selectedDiscipline !== entry.discipline;
                        return (
                          <Cell
                            key={entry.discipline}
                            fill={entry.barColor}
                            fillOpacity={isDimmed ? 0.28 : 1}
                            stroke={selectedDiscipline === entry.discipline ? '#0f172a' : 'none'}
                            strokeWidth={selectedDiscipline === entry.discipline ? 1.5 : 0}
                          />
                        );
                      })}
                      <LabelList
                        dataKey="percentage"
                        position="right"
                        formatter={(val) => `${val ?? 0}%`}
                        style={{
                          fill: '#334155',
                          fontSize: 11,
                          fontWeight: 700,
                          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                        }}
                      />
                    </Bar>
                  ) : (
                    <>
                      <Bar
                        dataKey="correct"
                        name="Acertos"
                        stackId="q"
                        fill="#059669"
                        barSize={20}
                        className="cursor-pointer"
                        onClick={(_data, index) => {
                          const row = chartData[index];
                          if (row) handleToggleDisciplineFilter(row.discipline);
                        }}
                      >
                        {chartData.map((entry) => (
                          <Cell
                            key={`c-${entry.discipline}`}
                            fill="#059669"
                            fillOpacity={
                              selectedDiscipline !== null && selectedDiscipline !== entry.discipline
                                ? 0.3
                                : 1
                            }
                          />
                        ))}
                      </Bar>
                      <Bar
                        dataKey="wrong"
                        name="Erros"
                        stackId="q"
                        fill="#e11d48"
                        barSize={20}
                        className="cursor-pointer"
                        onClick={(_data, index) => {
                          const row = chartData[index];
                          if (row) handleToggleDisciplineFilter(row.discipline);
                        }}
                      >
                        {chartData.map((entry) => (
                          <Cell
                            key={`w-${entry.discipline}`}
                            fill="#e11d48"
                            fillOpacity={
                              selectedDiscipline !== null && selectedDiscipline !== entry.discipline
                                ? 0.3
                                : 1
                            }
                          />
                        ))}
                      </Bar>
                      <Bar
                        dataKey="unanswered"
                        name="Em branco"
                        stackId="q"
                        fill="#cbd5e1"
                        radius={[0, 6, 6, 0]}
                        barSize={20}
                        className="cursor-pointer"
                        onClick={(_data, index) => {
                          const row = chartData[index];
                          if (row) handleToggleDisciplineFilter(row.discipline);
                        }}
                      >
                        {chartData.map((entry) => (
                          <Cell
                            key={`u-${entry.discipline}`}
                            fill="#cbd5e1"
                            fillOpacity={
                              selectedDiscipline !== null && selectedDiscipline !== entry.discipline
                                ? 0.3
                                : 1
                            }
                          />
                        ))}
                      </Bar>
                    </>
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Chart Semantic Legend */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-2 border-t border-slate-100 text-xs text-slate-600">
              {chartMetric === 'percentage' ? (
                <div className="flex flex-wrap items-center gap-4">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-emerald-600 inline-block" aria-hidden="true" />
                    <span>Ponto Forte (≥ 60%)</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-amber-600 inline-block" aria-hidden="true" />
                    <span>Zona de Atenção (40%–59%)</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-rose-600 inline-block" aria-hidden="true" />
                    <span>Reforço Crítico (&lt; 40%)</span>
                  </span>
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-4">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-emerald-600 inline-block" aria-hidden="true" />
                    <span>Acertos</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-rose-600 inline-block" aria-hidden="true" />
                    <span>Erros</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-slate-300 inline-block" aria-hidden="true" />
                    <span>Em branco</span>
                  </span>
                </div>
              )}

              {selectedDiscipline && (
                <button
                  type="button"
                  onClick={() => setSelectedDiscipline(null)}
                  className="inline-flex items-center gap-1.5 text-amber-800 font-semibold hover:text-amber-950"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Limpar seleção: {selectedDiscipline}</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="py-12 text-center text-sm text-slate-500 border border-dashed border-slate-200 rounded-2xl">
            Nenhum dado de disciplina disponível para este simulado.
          </div>
        )}

        {/* Strengths & Weaknesses Actionable Lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-6 border-t border-slate-100">
          {/* Pontos Fortes */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <div className="px-4 py-3 bg-emerald-50/70 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-700" />
                <h3 className="text-sm font-bold text-slate-900">Pontos Fortes (Maiores Índices)</h3>
              </div>
              <span className="text-xs font-medium text-emerald-800">Top {topStrengths.length}</span>
            </div>
            <div className="divide-y divide-slate-100">
              {topStrengths.map((item) => {
                const isSelected = selectedDiscipline === item.discipline;
                return (
                  <button
                    key={item.discipline}
                    type="button"
                    onClick={() => handleToggleDisciplineFilter(item.discipline)}
                    className={`w-full px-4 py-3 flex items-center justify-between gap-3 text-left transition-colors ${
                      isSelected ? 'bg-amber-50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-900 truncate">
                        {item.discipline}
                      </div>
                      <div className="text-xs text-slate-500 tabular-nums">
                        {item.correct} acerto(s) de {item.total} questões
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono tabular-nums text-sm font-bold text-emerald-700">
                        {item.percentage}%
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pontos Fracos */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <div className="px-4 py-3 bg-rose-50/70 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-rose-700" />
                <h3 className="text-sm font-bold text-slate-900">Pontos Fracos (Prioridade de Reforço)</h3>
              </div>
              <span className="text-xs font-medium text-rose-800">Top {topWeaknesses.length}</span>
            </div>
            <div className="divide-y divide-slate-100">
              {topWeaknesses.map((item) => {
                const isSelected = selectedDiscipline === item.discipline;
                return (
                  <button
                    key={item.discipline}
                    type="button"
                    onClick={() => handleToggleDisciplineFilter(item.discipline)}
                    className={`w-full px-4 py-3 flex items-center justify-between gap-3 text-left transition-colors ${
                      isSelected ? 'bg-amber-50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-900 truncate">
                        {item.discipline}
                      </div>
                      <div className="text-xs text-slate-500 tabular-nums">
                        {item.wrong + item.unanswered} erro(s)/em branco de {item.total} questões
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`font-mono tabular-nums text-sm font-bold ${
                          item.percentage < 40
                            ? 'text-rose-700'
                            : item.percentage < 60
                            ? 'text-amber-700'
                            : 'text-emerald-700'
                        }`}
                      >
                        {item.percentage}%
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Toggleable Complete Numeric Breakdown Table */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setShowDetailedTable((prev) => !prev)}
            className="text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1.5"
          >
            <span>
              {showDetailedTable
                ? 'Ocultar tabela numérica completa'
                : `Ver tabela numérica completa (${activeScores.length} disciplinas)`}
            </span>
          </button>

          {showDetailedTable && (
            <div className="mt-4 overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-4 font-bold">Disciplina</th>
                    <th className="py-2.5 px-3 font-bold text-right">Questões</th>
                    <th className="py-2.5 px-3 font-bold text-right">Acertos</th>
                    <th className="py-2.5 px-3 font-bold text-right">Erros</th>
                    <th className="py-2.5 px-3 font-bold text-right">Em branco</th>
                    <th className="py-2.5 px-4 font-bold text-right">Aproveitamento</th>
                    <th className="py-2.5 px-4 font-bold">Classificação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {chartData.map((row) => (
                    <tr
                      key={row.discipline}
                      onClick={() => handleToggleDisciplineFilter(row.discipline)}
                      className={`cursor-pointer transition-colors ${
                        selectedDiscipline === row.discipline ? 'bg-amber-50' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-2.5 px-4 font-semibold text-slate-900">{row.discipline}</td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-600">
                        {row.total}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold text-emerald-700">
                        {row.correct}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-rose-600">
                        {row.wrong}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-500">
                        {row.unanswered}
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono tabular-nums font-bold text-slate-900">
                        {row.percentage}%
                      </td>
                      <td className="py-2.5 px-4 font-semibold">
                        <span
                          className={
                            row.percentage >= 60
                              ? 'text-emerald-700'
                              : row.percentage >= 40
                              ? 'text-amber-700'
                              : 'text-rose-700'
                          }
                        >
                          {row.tierLabel}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* 3. Caderno de Questões / Revisão do Gabarito */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Revisão de Questões e Gabarito Comentado
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Clique em qualquer questão para abrir o gabarito completo fundamentado com base legal.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setReviewFilter('wrong')}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap shrink-0 ${
                reviewFilter === 'wrong'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Erros ({result.wrongCount + result.unansweredCount})
            </button>
            <button
              type="button"
              onClick={() => setReviewFilter('correct')}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap shrink-0 ${
                reviewFilter === 'correct'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Acertos ({result.correctCount})
            </button>
            {flaggedTotal > 0 && (
              <button
                type="button"
                onClick={() => setReviewFilter('flagged')}
                className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  reviewFilter === 'flagged'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Marcadas ({flaggedTotal})
              </button>
            )}
            <button
              type="button"
              onClick={() => setReviewFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap shrink-0 ${
                reviewFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todas ({totalExamQuestions})
            </button>
          </div>
        </div>

        {/* Active Discipline Filter Banner */}
        {selectedDiscipline && (
          <div className="mb-4 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-amber-900 font-semibold">
              <Filter className="w-3.5 h-3.5 shrink-0" />
              <span>
                Filtrando por disciplina: <strong>{selectedDiscipline}</strong> ({filteredQuestions.length}{' '}
                {filteredQuestions.length === 1 ? 'questão exibida' : 'questões exibidas'})
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSelectedDiscipline(null)}
              className="text-amber-900 font-bold hover:underline inline-flex items-center gap-1 whitespace-nowrap shrink-0"
            >
              <X className="w-3.5 h-3.5" />
              <span>Mostrar todas</span>
            </button>
          </div>
        )}

        {/* Selected single question inspection card if chosen */}
        {selectedQuestionIndex !== null && questions[selectedQuestionIndex] && (
          <div className="mb-8 p-1 bg-amber-50 rounded-2xl border border-amber-300">
            <div className="p-3 flex items-center justify-between">
              <span className="text-xs font-extrabold text-amber-900 uppercase tracking-wider">
                Inspecionando Questão {questions[selectedQuestionIndex].number}
              </span>
              <button
                type="button"
                onClick={() => setSelectedQuestionIndex(null)}
                className="text-xs font-bold text-amber-800 hover:underline"
              >
                Voltar para Lista
              </button>
            </div>
            <QuestionCard
              question={questions[selectedQuestionIndex]}
              selectedOption={userAnswers[questions[selectedQuestionIndex].id]}
              onSelectOption={() => {}}
              isFlagged={Boolean(flaggedQuestions[questions[selectedQuestionIndex].id])}
              onToggleFlag={() => {}}
              isBookmarked={Boolean(bookmarkedQuestions[questions[selectedQuestionIndex].id])}
              onToggleBookmark={() => onBookmarkQuestion(questions[selectedQuestionIndex].id)}
              mode="real"
              isExamFinished={true}
              fontSize="base"
            />
          </div>
        )}

        {/* List of questions to review */}
        {filteredQuestions.length > 0 ? (
          <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
            {filteredQuestions.map((q) => {
              const originalIndex = questions.findIndex((item) => item.id === q.id);
              const userChoice = userAnswers[q.id];
              const isCorrect = userChoice === q.correctOption;

              return (
                <div
                  key={q.id}
                  onClick={() => setSelectedQuestionIndex(originalIndex)}
                  className="py-3.5 px-2 sm:px-4 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-extrabold text-xs font-mono tabular-nums shrink-0 ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : userChoice
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {q.number}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-slate-900 whitespace-nowrap">{q.discipline}</span>
                        <span aria-hidden="true" className="text-slate-300 hidden sm:inline">·</span>
                        <span className="text-[11px] text-slate-500 truncate hidden sm:inline">
                          {q.topic}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{q.statement}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right text-xs font-mono tabular-nums">
                      <span className="font-sans font-semibold text-slate-400">Sua: </span>
                      <strong className={isCorrect ? 'text-emerald-700' : 'text-rose-600'}>
                        {userChoice || 'Branco'}
                      </strong>
                      <span className="text-slate-300 mx-1.5">|</span>
                      <span className="font-sans font-semibold text-slate-400">Gabarito: </span>
                      <strong className="text-slate-900">{q.correctOption}</strong>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-10 text-center text-sm text-slate-500 border border-dashed border-slate-200 rounded-2xl">
            Nenhuma questão encontrada para os filtros selecionados.
            {selectedDiscipline && (
              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setReviewFilter('all');
                  }}
                  className="text-xs font-bold text-amber-700 hover:underline"
                >
                  Exibir todas as questões de {selectedDiscipline}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
