import {
  UserProfile,
  QuestionComment,
  FeedPost,
  CommunityNotification,
} from '../types/community';

export const CURRENT_USER_ID = 'user-roberto';

const now = Date.now();
const minsAgo = (m: number) => new Date(now - m * 60_000).toISOString();
const hoursAgo = (h: number) => new Date(now - h * 3_600_000).toISOString();
const daysAgo = (d: number) => new Date(now - d * 86_400_000).toISOString();

export const INITIAL_PROFILES: UserProfile[] = [
  {
    id: CURRENT_USER_ID,
    name: 'Roberto Almeida',
    handle: 'roberto.almeida',
    coverTheme: 'navy',
    roleTitle: 'Bacharel em Direito · Examinando 47º Exame',
    bio: 'Bacharel em Direito focado na aprovação no 47º Exame de Ordem Unificado (1ª Fase FGV). Organizando resumos de Ética Profissional, Constitucional e Tributário com jurisprudência recente.',
    category: 'examinando',
    institution: 'UERJ — Faculdade de Direito',
    targetExam: '47º Exame da OAB',
    isVerified: false,
    specialties: ['Ética Profissional', 'Direito Constitucional', 'Direito Tributário'],
    followersIds: ['prof-marcelo', 'exam-lucas'],
    followingIds: ['prof-marcelo', 'adv-helena'],
    reputationPoints: 185,
    completedSimulados: 3,
    achievements: ['Maratonista 80Q', 'Membro Fundador Juris Tantum'],
    showPerformanceShowcase: true,
    performanceByDiscipline: [
      { discipline: 'Ética Profissional', accuracy: 88, answered: 24 },
      { discipline: 'Direito Constitucional', accuracy: 76, answered: 21 },
      { discipline: 'Direito Tributário', accuracy: 70, answered: 15 },
      { discipline: 'Direito Civil', accuracy: 64, answered: 22 },
      { discipline: 'Direito Penal', accuracy: 72, answered: 18 },
    ],
    sharedLists: [
      {
        id: 'list-roberto-1',
        title: 'Revisão Final — Artigos-Chave do EAOAB',
        discipline: 'Ética Profissional',
        description: 'Seleção pessoal das questões mais cobradas sobre sociedade de advogados, honorários e incompatibilidades.',
        questionIds: [4701, 4702, 4704, 4708],
        savedCount: 14,
      },
    ],
    joinedAt: daysAgo(45),
  },
  {
    id: 'adv-helena',
    name: 'Dra. Helena Vasconcelos',
    handle: 'helena.tributario',
    coverTheme: 'slate',
    roleTitle: 'Advogada Tributarista · OAB/SP 384.219',
    bio: 'Advogada militante em Contencioso Tributário e Planejamento Patrimonial. Mentora voluntária para candidatos da 1ª e 2ª Fases da OAB com foco na jurisprudência do STF e STJ.',
    category: 'advogado',
    oabNumber: '384.219',
    oabUf: 'SP',
    isVerified: true,
    specialties: ['Direito Tributário', 'Direito Constitucional', 'Direito Empresarial'],
    followersIds: [CURRENT_USER_ID, 'exam-lucas', 'est-camila', 'prof-marcelo'],
    followingIds: ['prof-marcelo'],
    reputationPoints: 1420,
    completedSimulados: 9,
    achievements: ['Top Comentadora em Tributário', 'Advogada Verificada OAB/SP', 'Autora Destaque'],
    showPerformanceShowcase: true,
    performanceByDiscipline: [
      { discipline: 'Direito Tributário', accuracy: 96, answered: 75 },
      { discipline: 'Direito Constitucional', accuracy: 91, answered: 68 },
      { discipline: 'Direito Empresarial', accuracy: 86, answered: 52 },
      { discipline: 'Ética Profissional', accuracy: 89, answered: 64 },
    ],
    sharedLists: [
      {
        id: 'list-helena-1',
        title: 'Limitações Constitucionais ao Poder de Tributar',
        discipline: 'Direito Tributário',
        description: 'Questões FGV sobre anterioridade anual, noventena e imunidades tributárias recíprocas.',
        questionIds: [4722, 4723, 4724, 3326],
        savedCount: 89,
      },
    ],
    joinedAt: daysAgo(180),
  },
  {
    id: 'exam-lucas',
    name: 'Lucas Nogueira',
    handle: 'lucas.oab47',
    coverTheme: 'amber',
    roleTitle: 'Bacharel em Direito · Foco 47º Exame',
    bio: 'Bacharel pela PUC-MG em reta final de preparação para o 47º Exame da OAB. Compartilho cadernos de erros, estatísticas de simulados e mapas de Processo Penal.',
    category: 'examinando',
    institution: 'PUC Minas — Direito',
    targetExam: '47º Exame da OAB',
    isVerified: false,
    specialties: ['Direito Penal', 'Direito Processual Penal', 'Ética Profissional'],
    followersIds: ['est-camila'],
    followingIds: [CURRENT_USER_ID, 'prof-marcelo', 'adv-helena'],
    reputationPoints: 640,
    completedSimulados: 12,
    achievements: ['Aprovado no Simulado 47º Exame', 'Sequência de 12 Simulados'],
    showPerformanceShowcase: true,
    performanceByDiscipline: [
      { discipline: 'Direito Penal', accuracy: 84, answered: 90 },
      { discipline: 'Direito Processual Penal', accuracy: 80, answered: 85 },
      { discipline: 'Ética Profissional', accuracy: 88, answered: 112 },
      { discipline: 'Direito Processual Civil', accuracy: 62, answered: 70 },
    ],
    sharedLists: [
      {
        id: 'list-lucas-1',
        title: 'Nulidades no Júri e ANPP na Banca FGV',
        discipline: 'Direito Processual Penal',
        description: 'Bateria focada em tribunal do júri, acordo de não persecução penal e recursos criminais.',
        questionIds: [3365, 3369, 4764],
        savedCount: 37,
      },
    ],
    joinedAt: daysAgo(92),
  },
  {
    id: 'est-camila',
    name: 'Camila Ferreira',
    handle: 'camila.direito9',
    coverTheme: 'emerald',
    roleTitle: 'Estudante de Direito · 9º Período (UFRJ)',
    bio: 'Graduanda do 9º período na Faculdade Nacional de Direito (UFRJ) e estagiária em Direito Civil e Contratos. Antecipando a preparação para o Exame de Ordem com simulados semanais.',
    category: 'estudante',
    institution: 'UFRJ — Faculdade Nacional de Direito',
    semester: '9º Período',
    targetExam: '48º Exame da OAB',
    isVerified: false,
    specialties: ['Direito Civil', 'Direito Processual Civil', 'Direito do Consumidor'],
    followersIds: ['prof-marcelo'],
    followingIds: ['adv-helena', 'exam-lucas', 'prof-marcelo'],
    reputationPoints: 495,
    completedSimulados: 6,
    achievements: ['Caderno de Revisão Ouro', 'Colaboradora de Civil'],
    showPerformanceShowcase: true,
    performanceByDiscipline: [
      { discipline: 'Direito Civil', accuracy: 85, answered: 84 },
      { discipline: 'Direito do Consumidor', accuracy: 90, answered: 30 },
      { discipline: 'Direito Processual Civil', accuracy: 77, answered: 70 },
    ],
    sharedLists: [
      {
        id: 'list-camila-1',
        title: 'Responsabilidade Civil, Comodato e Arras',
        discipline: 'Direito Civil',
        description: 'Casos práticos clássicos da FGV envolvendo contratos em espécie e responsabilidade objetiva.',
        questionIds: [3336, 3337, 3340, 3341],
        savedCount: 51,
      },
    ],
    joinedAt: daysAgo(120),
  },
  {
    id: 'prof-marcelo',
    name: 'Prof. Marcelo Duarte',
    handle: 'prof.marceloduarte',
    coverTheme: 'navy',
    roleTitle: 'Advogado & Professor de Ética Profissional · OAB/RJ 142.508',
    bio: 'Professor de Ética Profissional e Deontologia Jurídica há 14 anos. Advogado inscrito na OAB/RJ. Especialista em mapear pegadinhas recorrentes da banca FGV nos artigos do EAOAB e CED.',
    category: 'advogado',
    oabNumber: '142.508',
    oabUf: 'RJ',
    isVerified: true,
    specialties: ['Ética Profissional', 'Direito Administrativo', 'Filosofia do Direito'],
    followersIds: [CURRENT_USER_ID, 'adv-helena', 'exam-lucas', 'est-camila'],
    followingIds: ['adv-helena', 'est-camila', CURRENT_USER_ID],
    reputationPoints: 2380,
    completedSimulados: 15,
    achievements: ['Top Comentador em Ética', 'Mentor OAB 1ª Fase', 'Advogado Verificado OAB/RJ'],
    showPerformanceShowcase: true,
    performanceByDiscipline: [
      { discipline: 'Ética Profissional', accuracy: 100, answered: 120 },
      { discipline: 'Filosofia do Direito', accuracy: 95, answered: 30 },
      { discipline: 'Direito Administrativo', accuracy: 92, answered: 90 },
    ],
    sharedLists: [
      {
        id: 'list-marcelo-1',
        title: 'Os 8 Pontos Garantidos em Ética Profissional',
        discipline: 'Ética Profissional',
        description: 'Questões essenciais de publicidade, prerrogativas, honorários, sociedade de advogados e infrações.',
        questionIds: [4701, 4703, 3301, 3303, 3305],
        savedCount: 164,
      },
    ],
    joinedAt: daysAgo(310),
  },
];

export const INITIAL_QUESTION_COMMENTS: Record<number, QuestionComment[]> = {
  // Questão 1 do 47º Exame (default): Sociedade de Advogados e Responsabilidade Civil
  4701: [
    {
      id: 'qcomm-4701-1',
      questionId: 4701,
      authorId: 'prof-marcelo',
      content:
        'Excelente questão clássica da FGV sobre a responsabilidade civil do advogado na sociedade! Conforme dispõe o **Art. 17 da Lei nº 8.906/1994 (EAOAB)**:\n> Além da sociedade, o sócio e o titular da sociedade individual de advocacia respondem subsidiária e ilimitadamente pelos danos causados aos clientes por ação ou omissão no exercício da advocacia, sem prejuízo da responsabilidade disciplinar em que possam incorrer.\n\n**Resumo para não cair na pegadinha:**\n1. Primeiro responde o patrimônio da pessoa jurídica (sociedade pluripessoal ou unipessoal).\n2. Esgotados os bens sociais, o advogado responde de forma **subsidiária** (e nunca solidária, como afirma a letra B) e **ilimitada** com seu patrimônio pessoal (invalidando C e D).\n3. Tudo isso sem prejuízo de processo ético-disciplinar por inépcia ou erro grosseiro reiterado.',
      upvotedBy: [CURRENT_USER_ID, 'adv-helena', 'exam-lucas', 'est-camila'],
      createdAt: hoursAgo(18),
      replies: [
        {
          id: 'qreply-4701-1a',
          authorId: 'exam-lucas',
          content:
            'Professor, excelente explicação! Quando que a responsabilidade do advogado passa a ser **solidária** no Estatuto? Lembro que existe um caso específico no EAOAB.',
          createdAt: hoursAgo(14),
        },
        {
          id: 'qreply-4701-1b',
          authorId: 'prof-marcelo',
          content:
            'Ótima lembrança, Lucas! A responsabilidade é **solidária** na hipótese de **lide temerária** prevista no **Art. 32, parágrafo único, do EAOAB**, quando o advogado age em coligação com o cliente para lesar a parte contrária (apurado em ação própria). Já nos danos ao próprio cliente por atuação profissional (Art. 17), é **subsidiária e ilimitada**.',
          createdAt: hoursAgo(12),
        },
      ],
    },
    {
      id: 'qcomm-4701-2',
      questionId: 4701,
      authorId: 'adv-helena',
      content:
        'Na prática dos escritórios, vale destacar que a **sociedade unipessoal de advocacia** (incluída pela Lei nº 13.247/2016 no **Art. 15, § 4º, EAOAB**) segue exatamente a mesma regra do **Art. 17**. Muitos examinados confundem a limitação patrimonial de uma LTDA empresarial no Código Civil com a advocacia — na OAB, **não existe responsabilidade limitada** perante o cliente lesado.',
      upvotedBy: ['prof-marcelo', 'est-camila'],
      createdAt: hoursAgo(10),
      replies: [],
    },
    {
      id: 'qcomm-4701-3',
      questionId: 4701,
      authorId: 'est-camila',
      content:
        '**Macete de memorização para a prova:**\nDano ao **cliente** (Art. 17 EAOAB) = **SI** (**S**ubsidiária + **I**limitada).\nDano à **parte contrária** em lide temerária (Art. 32, parágrafo único) = **Solidária** (em ação própria). Anotei no meu Caderno de Revisão e nunca mais errei!',
      upvotedBy: ['exam-lucas'],
      createdAt: hoursAgo(5),
      replies: [],
    },
  ],
  // Also populate Q1 of 33º Exame & 41º Exame just in case user visits them immediately
  3301: [
    {
      id: 'qcomm-3301-1',
      questionId: 3301,
      authorId: 'prof-marcelo',
      content:
        'Aqui a FGV cobrou o **Art. 32, parágrafo único, da Lei nº 8.906/94 (EAOAB)**: em caso de lide temerária, o advogado coligado com o cliente para lesar a parte contrária responde **solidariamente**, devendo tal responsabilidade ser apurada em **ação própria** (e não nos mesmos autos da ação originária).',
      upvotedBy: ['adv-helena', 'exam-lucas'],
      createdAt: daysAgo(2),
      replies: [],
    },
  ],
};

export const INITIAL_FEED_POSTS: FeedPost[] = [
  {
    id: 'post-1',
    type: 'artigo',
    authorId: 'prof-marcelo',
    title: 'Guia Estratégico do Estatuto da OAB: Sociedade de Advogados, Responsabilidade e Lide Temerária',
    content:
      'Ética Profissional representa **10% de toda a 1ª Fase (8 questões)** e costuma ser o diferencial decisivo entre os 38 e os 42 pontos. Um dos campeões de incidência na FGV é a distinção entre a responsabilidade civil no exercício da advocacia.\n\n**1. Danos causados ao cliente (Art. 17 da Lei nº 8.906/94):**\nTanto nas sociedades pluripessoais quanto na sociedade individual de advocacia, o sócio ou titular responde de forma **subsidiária e ilimitada**, sem prejuízo das sanções disciplinares.\n\n**2. Lide temerária contra a parte adversa (Art. 32, parágrafo único, EAOAB):**\nQuando comprovada a coligação dolosa entre advogado e cliente para lesar o adversário processual, a responsabilidade torna-se **solidária**, porém obrigatoriamente apurada em **ação autônoma** (conforme consolidado pelo STF na ADI 2652).\n\nSalve este roteiro no seu caderno de revisão e confira os comentários detalhados na Questão 1 do 47º Exame!',
    tags: ['Ética Profissional'],
    sharedQuestion: {
      questionId: 4701,
      number: 1,
      discipline: 'Ética Profissional',
      topic: 'Sociedade de Advogados e Responsabilidade Civil',
      examOrigin: '47º Exame de Ordem Unificado (Banca FGV - Tipo 1 Branca)',
      statementSnippet:
        'O advogado Fabrício foi contratado pelo Banco Alfa, por meio de sua sociedade individual de advocacia, para representá-lo em todas as ações de responsabilidade civil...',
    },
    likedBy: [CURRENT_USER_ID, 'adv-helena', 'exam-lucas', 'est-camila'],
    savedBy: [CURRENT_USER_ID, 'est-camila'],
    createdAt: hoursAgo(20),
    comments: [
      {
        id: 'fcomm-1a',
        authorId: 'adv-helena',
        content: 'Artigo cirúrgico, Marcelo! A distinção entre Art. 17 e Art. 32 do EAOAB derruba muitos candidatos por pura leitura rápida.',
        createdAt: hoursAgo(16),
      },
      {
        id: 'fcomm-1b',
        authorId: 'est-camila',
        content: 'Já deixei salvo para revisar na véspera do simulado. Obrigada pelo resumo!',
        createdAt: hoursAgo(11),
      },
    ],
  },
  {
    id: 'post-2',
    type: 'post',
    authorId: 'adv-helena',
    title: 'Macete FGV de Tributário: Anterioridade Anual vs. Nonagesimal (Noventena)',
    content:
      'Pessoal que vai prestar o **47º Exame**: sempre que a questão trouxer data de publicação de lei aumentando tributo (ex.: novembro ou dezembro), façam a dupla checagem do **Art. 150, III, "b" e "c", da CF/88**:\n\n- **Só Anterioridade Anual** (não espera 90 dias): Imposto de Renda (**IR**) e alteração na **base de cálculo do IPTU e IPVA**.\n- **Só Noventena / Nonagesimal** (não espera o ano seguinte): **IPI**, **Contribuições Sociais / Previdenciárias** (Art. 195, § 6º, CF/88), CIDE-Combustíveis e ICMS-Monofásico (combustíveis).\n- **Imediatos** (nem anual, nem noventena): **II, IE, IOF**, Imposto Extraordinário de Guerra e Empréstimo Compulsório de calamidade/guerra.\n\n**Regra de ouro:** Todo o resto (ICMS regra geral, ISS, ITCMD, ITBI, taxas, alíquota de IPTU/IPVA) cumpre **AS DUAS** anterioridades cumulativamente!',
    tags: ['Direito Tributário', 'Direito Constitucional'],
    likedBy: [CURRENT_USER_ID, 'prof-marcelo', 'exam-lucas'],
    savedBy: ['exam-lucas'],
    createdAt: hoursAgo(9),
    comments: [
      {
        id: 'fcomm-2a',
        authorId: CURRENT_USER_ID,
        content: 'Esse quadro resolveu exatamente uma questão do 33º Exame sobre contribuição previdenciária publicada em novembro!',
        createdAt: hoursAgo(6),
      },
    ],
  },
  {
    id: 'post-3',
    type: 'post',
    authorId: 'exam-lucas',
    content:
      'Acabei de finalizar o simulado oficial do **47º Exame** no modo cronometrado (5h) e fechei com **52/80 acertos**! Pelo gráfico de desempenho do Juris Tantum vi que estou com 88% em Ética e 84% em Penal, mas caí para 57% em Processo Civil.\n\nAlguém recomenda alguma lista focada em **Recursos Cíveis e Tutela Provisória (CPC)** para subir esses 3 pontinhos essenciais nas próximas duas semanas?',
    tags: ['Direito Processual Civil', 'Ética Profissional'],
    likedBy: ['est-camila', 'prof-marcelo'],
    savedBy: [],
    createdAt: hoursAgo(3),
    comments: [
      {
        id: 'fcomm-3a',
        authorId: 'est-camila',
        content: 'Lucas, dá uma olhada no Art. 1.012, § 1º (exceções ao efeito suspensivo da apelação) e no rol do Art. 1.015 do CPC com a taxatividade mitigada do STJ. Cai em quase toda prova!',
        createdAt: minsAgo(95),
      },
    ],
  },
];

export const INITIAL_NOTIFICATIONS: CommunityNotification[] = [
  {
    id: 'notif-1',
    type: 'upvote',
    actorId: 'prof-marcelo',
    text: 'marcou como útil sua participação na comunidade e começou a seguir você.',
    createdAt: hoursAgo(4),
    read: false,
  },
  {
    id: 'notif-2',
    type: 'like',
    actorId: 'adv-helena',
    text: 'recomendou seu comentário no post sobre Anterioridade Tributária.',
    targetPostId: 'post-2',
    createdAt: hoursAgo(5),
    read: false,
  },
  {
    id: 'notif-3',
    type: 'reply',
    actorId: 'prof-marcelo',
    text: 'publicou um gabarito comentado detalhado na Questão 1 de Ética Profissional.',
    targetQuestionId: 4701,
    createdAt: hoursAgo(12),
    read: true,
  },
];
