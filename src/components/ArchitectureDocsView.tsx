import { useState } from 'react';
import { Database, Server, Layers, Terminal, CheckCircle2, Copy, Check, FileText } from 'lucide-react';

export function ArchitectureDocsView() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const sqlSchema = `-- ==========================================================
-- SCHEMA RELACIONAL POSTGRESQL - PLATAFORMA DE SIMULADOS OAB FGV
-- ==========================================================

-- 1. Tabela de Disciplinas Oficiais da 1ª Fase OAB
CREATE TABLE IF NOT EXISTS disciplinas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT,
    quantidade_padrao INT NOT NULL DEFAULT 2,
    ordem_padrao INT NOT NULL,
    cor_identificadora VARCHAR(20) DEFAULT 'blue',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabela de Provas e Edições Históricas da FGV
CREATE TABLE IF NOT EXISTS provas_fgv (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    edicao INT NOT NULL UNIQUE,
    nome VARCHAR(150) NOT NULL,
    ano INT NOT NULL,
    fase INT NOT NULL DEFAULT 1 CHECK (fase IN (1, 2)),
    data_aplicacao DATE,
    taxa_aprovacao NUMERIC(5,2),
    total_questoes INT NOT NULL DEFAULT 80,
    nota_corte INT NOT NULL DEFAULT 40,
    status VARCHAR(30) DEFAULT 'Gabarito Oficial',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabela de Questões com Justificativa e Base Legal
CREATE TABLE IF NOT EXISTS questoes (
    id SERIAL PRIMARY KEY,
    prova_id UUID REFERENCES provas_fgv(id) ON DELETE SET NULL,
    disciplina_id INT NOT NULL REFERENCES disciplinas(id),
    numero_caderno INT NOT NULL CHECK (numero_caderno BETWEEN 1 AND 80),
    tema VARCHAR(150) NOT NULL,
    enunciado TEXT NOT NULL,
    gabarito_correto CHAR(1) NOT NULL CHECK (gabarito_correto IN ('A', 'B', 'C', 'D')),
    base_legal TEXT NOT NULL,
    comentario_pedagogico TEXT NOT NULL,
    nivel_dificuldade VARCHAR(20) DEFAULT 'Média' CHECK (nivel_dificuldade IN ('Fácil', 'Média', 'Difícil')),
    anulada BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabela de Alternativas de cada Questão (A, B, C, D)
CREATE TABLE IF NOT EXISTS alternativas (
    id SERIAL PRIMARY KEY,
    questao_id INT NOT NULL REFERENCES questoes(id) ON DELETE CASCADE,
    letra CHAR(1) NOT NULL CHECK (letra IN ('A', 'B', 'C', 'D')),
    texto TEXT NOT NULL,
    CONSTRAINT uq_questao_letra UNIQUE (questao_id, letra)
);

-- 5. Tabela de Sessões de Simulado do Aluno
CREATE TABLE IF NOT EXISTS simulados_usuario (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL, -- Referência à tabela de auth de usuários
    prova_id UUID REFERENCES provas_fgv(id),
    modo VARCHAR(20) NOT NULL CHECK (modo IN ('real', 'study', 'custom')),
    tempo_gasto_segundos INT NOT NULL DEFAULT 0,
    total_acertos INT DEFAULT 0,
    total_erros INT DEFAULT 0,
    total_nao_respondidas INT DEFAULT 0,
    percentual_acerto NUMERIC(5,2) DEFAULT 0,
    aprovado BOOLEAN DEFAULT FALSE,
    iniciado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    finalizado_em TIMESTAMP WITH TIME ZONE
);

-- 6. Tabela de Respostas do Usuário por Questão
CREATE TABLE IF NOT EXISTS respostas_usuario (
    id BIGSERIAL PRIMARY KEY,
    simulado_id UUID NOT NULL REFERENCES simulados_usuario(id) ON DELETE CASCADE,
    questao_id INT NOT NULL REFERENCES questoes(id),
    opcao_selecionada CHAR(1) CHECK (opcao_selecionada IN ('A', 'B', 'C', 'D')),
    marcada_para_revisao BOOLEAN DEFAULT FALSE,
    acertou BOOLEAN NOT NULL,
    tempo_resposta_segundos INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices de Alta Performance
CREATE INDEX idx_questoes_disciplina ON questoes(disciplina_id);
CREATE INDEX idx_questoes_prova ON questoes(prova_id);
CREATE INDEX idx_respostas_simulado ON respostas_usuario(simulado_id);
`;

  const installInstructions = `# ==========================================================
# GUIA DE INSTALAÇÃO E EXECUÇÃO LOCAL (PASSO A PASSO)
# ==========================================================

# 1. Clonar ou Baixar o Projeto
git clone https://github.com/seu-usuario/simulado-oab-fgv.git
cd simulado-oab-fgv

# 2. Instalar as Dependências (Node.js 18+ ou 20+)
npm install

# 3. Configurar as Variáveis de Ambiente
cp .env.example .env

# Conteúdo básico do arquivo .env:
# PORT=3000
# DATABASE_URL=postgresql://usuario:senha@localhost:5432/oab_db
# NODE_ENV=development

# 4. Executar em Modo Desenvolvimento (Full-Stack Express + Vite)
npm run dev
# O servidor iniciará em http://localhost:3000

# 5. Build de Produção
npm run build

# 6. Inicializar em Produção
npm start
`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
        <div className="flex items-center gap-3 text-amber-700 mb-2">
          <Layers className="w-6 h-6" />
          <span className="text-xs font-bold tracking-wider uppercase">Arquitetura de Aplicações Educacionais</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Documentação Técnica, Estrutura e Entregáveis
        </h1>
        <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
          Esta plataforma foi concebida sob rigorosos padrões de engenharia de software para certames jurídicos,
          atendendo integralmente aos requisitos da 1ª Fase da OAB sob a banca FGV com arquitetura desacoplada,
          armazenamento otimizado de questões e fundamentação legal estrita.
        </p>
      </div>

      {/* Grid de Blocos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Bloco 1: Estrutura de Pastas */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Server className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-900">1. Estrutura de Pastas e Arquivos</h2>
            </div>
            <span className="text-xs px-2.5 py-1 bg-indigo-50 text-indigo-700 font-semibold rounded-full">
              Full-Stack Modular
            </span>
          </div>
          <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto flex-1 leading-relaxed">
            <pre>{`├── server.ts                  # Servidor Express com rotas de API REST
├── index.html                 # Ponto de entrada com fontes e metadados
├── metadata.json              # Configurações do ecossistema AI Studio
├── package.json               # Dependências do projeto e scripts
├── vite.config.ts             # Configuração do Vite e Tailwind v4
└── src/
    ├── main.tsx               # Montagem do React 19
    ├── App.tsx                # Gerenciador de estado global do simulado
    ├── index.css              # Estilização global via Tailwind
    ├── types/
    │   └── oab.ts             # Tipos TypeScript estritos da OAB
    ├── data/
    │   ├── fgvExamsCatalog.ts # Histórico de todas as provas FGV
    │   ├── oabOfficialDistributions.ts # Distribuição das 80 questões
    │   ├── questions_1_20.ts  # Ética, Filosofia, Constitucional, DH
    │   ├── questions_21_40.ts # Tributário, Financeiro, Adm, Amb, Civil
    │   ├── questions_41_60.ts # ECA, Consumidor, Empresarial, CPC, Penal
    │   ├── questions_61_80.ts # CPP, Previdenciário, Trabalho, Proc Trab
    │   └── mockExam80.ts      # Prova completa oficial 80 questões
    ├── services/
    │   └── api.ts             # Camada de comunicação com endpoints
    └── components/
        ├── Navbar.tsx         # Cabeçalho com status, cronômetro e modos
        ├── QuestionCard.tsx   # Enunciado, alternativas e base legal
        ├── SimuladoControls.tsx # Barra de controles, cronômetro e ações
        ├── AnswerMatrixDrawer.tsx # Cartão de respostas (1 a 80)
        ├── ResultDashboard.tsx # Diagnóstico completo de aprovação
        ├── ExamCatalogView.tsx # Catálogo histórico da banca FGV
        ├── ErrorNotebookView.tsx # Caderno de erros e revisões
        └── ArchitectureDocsView.tsx # Este painel de documentação`}</pre>
          </div>
        </div>

        {/* Bloco 2: Requisitos de Instalação */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-slate-900">2. Guia de Instalação Local</h2>
            </div>
            <button
              onClick={() => copyToClipboard(installInstructions, 'install')}
              className="flex items-center gap-1 text-xs px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors"
            >
              {copiedSection === 'install' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSection === 'install' ? 'Copiado!' : 'Copiar'}</span>
            </button>
          </div>
          <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto flex-1 leading-relaxed">
            <pre>{installInstructions}</pre>
          </div>
        </div>
      </div>

      {/* Bloco 3: Modelagem de Dados PostgreSQL */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-amber-600" />
            <div>
              <h2 className="text-lg font-bold text-slate-900">3. Modelo de Banco de Dados Relacional (PostgreSQL DDL)</h2>
              <p className="text-xs text-slate-500">
                Estrutura relacional normalizada com integridade referencial para suportar histórico de exames, gabarito e respostas.
              </p>
            </div>
          </div>
          <button
            onClick={() => copyToClipboard(sqlSchema, 'sql')}
            className="flex items-center gap-1 text-xs px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 font-medium rounded-lg transition-colors border border-amber-200"
          >
            {copiedSection === 'sql' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSection === 'sql' ? 'DDL Copiado!' : 'Copiar SQL'}</span>
          </button>
        </div>
        <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto max-h-[380px] leading-relaxed">
          <pre>{sqlSchema}</pre>
        </div>
      </div>

      {/* Bloco 4: Matriz Oficial de Disciplinas OAB/FGV */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900">4. Distribuição Oficial das 80 Questões (Banca FGV)</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="font-bold text-amber-950 text-sm">Ética Profissional</span>
              <p className="text-xs text-amber-700">Estatuto da OAB e Código de Ética</p>
            </div>
            <span className="px-2.5 py-1 bg-amber-600 text-white font-extrabold text-xs rounded-lg">8 q.</span>
          </div>
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="font-bold text-blue-950 text-sm">Direito Constitucional</span>
              <p className="text-xs text-blue-700">Controle de Const., Direitos Fund.</p>
            </div>
            <span className="px-2.5 py-1 bg-blue-600 text-white font-extrabold text-xs rounded-lg">6 q.</span>
          </div>
          <div className="p-3 bg-violet-50 border border-violet-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="font-bold text-violet-950 text-sm">Direito Civil</span>
              <p className="text-xs text-violet-700">Contratos, Reais, Família, Sucessões</p>
            </div>
            <span className="px-2.5 py-1 bg-violet-600 text-white font-extrabold text-xs rounded-lg">6 q.</span>
          </div>
          <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="font-bold text-purple-950 text-sm">Processo Civil</span>
              <p className="text-xs text-purple-700">Recursos, Execução, Tutelas CPC/15</p>
            </div>
            <span className="px-2.5 py-1 bg-purple-600 text-white font-extrabold text-xs rounded-lg">6 q.</span>
          </div>
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="font-bold text-red-950 text-sm">Direito Penal</span>
              <p className="text-xs text-red-700">Parte Geral, Crimes Especiais</p>
            </div>
            <span className="px-2.5 py-1 bg-red-600 text-white font-extrabold text-xs rounded-lg">6 q.</span>
          </div>
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="font-bold text-rose-950 text-sm">Processo Penal</span>
              <p className="text-xs text-rose-700">Inquérito, Prisões, ANPP, Recursos</p>
            </div>
            <span className="px-2.5 py-1 bg-rose-600 text-white font-extrabold text-xs rounded-lg">6 q.</span>
          </div>
          <div className="p-3 bg-cyan-50 border border-cyan-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="font-bold text-cyan-950 text-sm">Direito Administrativo</span>
              <p className="text-xs text-cyan-700">Nova Lei Licitações, Atos, Improbidade</p>
            </div>
            <span className="px-2.5 py-1 bg-cyan-600 text-white font-extrabold text-xs rounded-lg">5 q.</span>
          </div>
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="font-bold text-rose-950 text-sm">Direito Tributário</span>
              <p className="text-xs text-rose-700">CTN, Imunidades, Anterioridade</p>
            </div>
            <span className="px-2.5 py-1 bg-rose-600 text-white font-extrabold text-xs rounded-lg">5 q.</span>
          </div>
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="font-bold text-amber-950 text-sm">Direito do Trabalho</span>
              <p className="text-xs text-amber-700">CLT, Jornada, Rescisão, Teletrabalho</p>
            </div>
            <span className="px-2.5 py-1 bg-amber-600 text-white font-extrabold text-xs rounded-lg">5 q.</span>
          </div>
          <div className="p-3 bg-lime-50 border border-lime-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="font-bold text-lime-950 text-sm">Processo do Trabalho</span>
              <p className="text-xs text-lime-700">Recurso Ordinário, Agravo Petição</p>
            </div>
            <span className="px-2.5 py-1 bg-lime-700 text-white font-extrabold text-xs rounded-lg">5 q.</span>
          </div>
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="font-bold text-yellow-950 text-sm">Direito Empresarial</span>
              <p className="text-xs text-yellow-700">Recuperação Judicial, Títulos, LTDA</p>
            </div>
            <span className="px-2.5 py-1 bg-yellow-600 text-white font-extrabold text-xs rounded-lg">5 q.</span>
          </div>
          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="font-bold text-indigo-950 text-sm">Demais Disciplinas (2 cada)</span>
              <p className="text-xs text-indigo-700">Filosofia, DH, Inter, Fin, Amb, ECA, Cons, Prev</p>
            </div>
            <span className="px-2.5 py-1 bg-indigo-600 text-white font-extrabold text-xs rounded-lg">16 q.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
