import { Question } from '../../types/oab';

export const exam45_questions_1_20: Question[] = [
  // --- ÉTICA PROFISSIONAL (Q1 a Q8) ---
  {
    id: 4501,
    id_questao: 'oab_fgv_45_et_01',
    number: 1,
    discipline: 'Ética Profissional',
    topic: 'Atividade Privativa e Publicidade da Advocacia',
    statement:
      'Os irmãos, Matilde, advogada, e Frederico, consultor de empresas, decidiram firmar sociedade para prestar serviços jurídicos e de consultoria empresarial na capital mineira. Para isso, montaram um escritório em conjunto na cidade de Belo Horizonte, MG, divulgando seus serviços por meio de panfletos e redes sociais (Instagram e LinkedIn), ressaltando a natureza jurídica e empresarial das atividades como um ponto de destaque do escritório.\n\nEm relação às regras sobre a atividade privativa de advocacia e à publicidade de serviços advocatícios, conforme o Estatuto da Advocacia e da Ordem dos Advogados do Brasil, assinale a afirmativa correta.',
    options: [
      {
        id: 'A',
        text: 'É vedada a divulgação dos serviços advocatícios em conjunto com qualquer outra atividade, inclusive a de consultoria empresarial.',
      },
      {
        id: 'B',
        text: 'A publicidade conjunta dos serviços advocatícios e empresariais é permitida apenas quando realizada por meio de plataformas digitais, como redes sociais.',
      },
      {
        id: 'C',
        text: 'Matilde e Frederico podem atuar conjuntamente, já que as atividades jurídicas e de consultoria empresarial possuem afinidade e se complementam.',
      },
      {
        id: 'D',
        text: 'A divulgação dos serviços advocatícios juntamente com atividades de consultoria empresarial é permitida, desde que os materiais de publicidade sejam sóbrios e não induzam ao erro.',
      },
    ],
    correctOption: 'A',
    legalBasis: 'Art. 1º, § 3º e Art. 16, § 3º da Lei nº 8.906/1994 (EAOAB); Art. 40, VI do CED',
    commentary:
      'É expressamente proibida a divulgação da advocacia em conjunto com outra atividade, bem como a constituição de sociedade que inclua sócio não inscrito como advogado ou que tenha por objeto atividade estranha à advocacia (Art. 1º, § 3º e Art. 16, § 3º do EAOAB; Art. 40, VI do CED).',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa A está correta porque o Estatuto da Advocacia proíbe taxativamente a divulgação conjunta dos serviços de advocacia com qualquer outra atividade econômica ou profissional, independentemente de afinidade, bem como a formação de sociedade mista entre advogado e profissional de outra área.',
      base_legal: 'Art. 1º, § 3º e Art. 16, § 3º da Lei nº 8.906/1994 (EAOAB); Art. 40, VI do Código de Ética e Disciplina da OAB',
      pegadinha_da_fgv:
        'A banca tentou induzir o examinando ao erro na alternativa C ao usar o argumento de que as áreas "se complementam e possuem afinidade", o que é expressamente refutado pelas vedações deontológicas de mercantilização da profissão.',
    },
  },
  {
    id: 4502,
    id_questao: 'oab_fgv_45_et_02',
    number: 2,
    discipline: 'Ética Profissional',
    topic: 'Nulidade dos Atos Praticados por Não Inscrito ou Suspenso',
    statement:
      'Helena concluiu seu mestrado em Administração Pública e acumulou significativo conhecimento jurídico, mas não possui formação em Direito nem inscrição nos quadros da OAB. Apesar disso, ela passou a oferecer consultoria jurídica e a atuar em audiências representando clientes.\n\nAndré, por sua vez, era advogado regularmente inscrito na OAB, porém foi suspenso do exercício profissional por prática de infração disciplinar. Mesmo suspenso, ele continuou a realizar atos privativos da advocacia, tais como peticionar e participar de audiências.\n\nCom base nessas situações hipotéticas, assinale a afirmativa correta.',
    options: [
      {
        id: 'A',
        text: 'Os atos praticados por André, após a sua suspensão da OAB, são nulos, pois ele está impedido de exercer a advocacia enquanto durar a suspensão.',
      },
      {
        id: 'B',
        text: 'Os atos privativos da advocacia praticados por Helena, que não possui inscrição na OAB, são válidos, desde que seus clientes a autorizem expressamente, ratificando os atos por ela praticados.',
      },
      {
        id: 'C',
        text: 'Os atos praticados por Helena são válidos, desde que restritos à consultoria extrajudicial e relacionados à administração pública, uma vez que ela não representa clientes em processos judiciais.',
      },
      {
        id: 'D',
        text: 'Tanto os atos praticados por Helena quanto os atos praticados por André são anuláveis, porém sujeitos à convalidação, pois a atuação em audiências e a prática de consultoria jurídica, embora preferencialmente exercidas por advogados, podem, excepcionalmente, ser exercidas por pessoa com conhecimento jurídico.',
      },
    ],
    correctOption: 'A',
    legalBasis: 'Art. 4º, caput e parágrafo único, da Lei nº 8.906/1994 (EAOAB)',
    commentary:
      'Nos termos do Art. 4º do Estatuto da OAB, são nulos os atos privativos de advogado praticados por pessoa não inscrita na OAB. O parágrafo único estabelece expressamente que também são nulos os atos praticados por advogado impedido - no âmbito do impedimento - ou suspenso e os que praticarem atos com infração a este Estatuto.',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa A é a correta: o parágrafo único do art. 4º do EAOAB comina a sanção de nulidade absoluta aos atos praticados por advogado enquanto perdurar a suspensão disciplinar aplicada pela OAB.',
      base_legal: 'Art. 4º, caput e parágrafo único da Lei nº 8.906/1994',
      pegadinha_da_fgv:
        'A FGV tenta confundir nulidade com anulabilidade (alternativa D) e alega que a autorização do cliente convalidaria atos privativos (alternativa B), o que é juridicamente inadmissível ante a ordem pública da profissão.',
    },
  },
  {
    id: 4503,
    id_questao: 'oab_fgv_45_et_03',
    number: 3,
    discipline: 'Ética Profissional',
    topic: 'Incompatibilidades e Impedimentos - Serventias Notariais e Registrais',
    statement:
      'Tarcísio, advogado trabalhista com mais de 20 anos de experiência, prestou concurso público para a Outorga de Delegações de Serventias Notariais e Registrais e, após aprovação, assumiu um Tabelionato de Notas e Ofício de Registro Civil em uma comarca do mesmo Estado. Ele deseja saber se poderá continuar exercendo a advocacia em causa própria e, além disso, pretende patrocinar uma ação contra a empresa pública estadual responsável pelo fornecimento de água.\n\nSobre incompatibilidades e impedimentos, com base nas disposições do Estatuto da OAB, assinale a afirmativa correta.',
    options: [
      {
        id: 'A',
        text: 'Tarcísio poderá exercer a advocacia apenas em causa própria, conforme prevê o Estatuto da OAB, mas estará impedido de advogar contra a empresa pública estadual de fornecimento de água.',
      },
      {
        id: 'B',
        text: 'Tarcísio poderá advogar livremente, inclusive contra a empresa pública estadual de fornecimento de água, uma vez que o exercício da atividade notarial não gera impedimento para o exercício da advocacia.',
      },
      {
        id: 'C',
        text: 'Tarcísio está em situação de incompatibilidade total com o exercício da advocacia, sendo vedada a atuação em qualquer causa, inclusive em causa própria, em razão de seu cargo como titular de serventia notarial e registral.',
      },
      {
        id: 'D',
        text: 'Tarcísio poderá continuar exercendo a advocacia, desde que em causas particulares que não envolvam empresas públicas ou concessionárias de serviço público, estando livre de impedimentos em ações de interesse pessoal.',
      },
    ],
    correctOption: 'C',
    legalBasis: 'Art. 28, IV da Lei nº 8.906/1994 (EAOAB)',
    commentary:
      'Conforme o Art. 28, IV do Estatuto da OAB, o exercício de cargos ou funções vinculados direta ou indiretamente a serviços notariais e de registro gera incompatibilidade total com a advocacia, proibindo a atuação profissional em qualquer causa, mesmo em causa própria.',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa C está correta. A titularidade de serventia notarial e registral acarreta incompatibilidade absoluta (e não mero impedimento), o que obsta a advocacia inclusive em causa própria, consoante o caput e inciso IV do art. 28 do EAOAB.',
      base_legal: 'Art. 28, caput e inciso IV da Lei nº 8.906/1994 (EAOAB)',
      pegadinha_da_fgv:
        'A FGV frequentemente testa a distinção entre impedimento (proibição parcial) e incompatibilidade (proibição total, mesmo em causa própria). O titular de cartório é caso clássico de incompatibilidade definitiva.',
    },
  },
  {
    id: 4504,
    id_questao: 'oab_fgv_45_et_04',
    number: 4,
    discipline: 'Ética Profissional',
    topic: 'Advogado Empregado - Jornada de Trabalho e Horas Extras',
    statement:
      'A advogada Jéssica foi contratada pela sociedade empresária de telefonia Alfa para trabalhar 10 horas contínuas por dia, de segunda a quinta-feira, totalizando 40 horas semanais. Além disso, o contrato escrito firmado entre Jéssica e a sociedade empresária prevê que, em situações excepcionais, ela deverá trabalhar horas extras, sendo remunerada com um adicional de 50% sobre o valor da hora normal.\n\nJéssica questiona a validade dessas condições contratuais, especialmente em relação à duração da jornada de trabalho e à remuneração das horas extras.\n\nCom base no Art. 20 do Estatuto da Advocacia e da OAB, assinale a afirmativa correta.',
    options: [
      {
        id: 'A',
        text: 'O contrato de Jéssica é válido, pois a jornada semanal não ultrapassa 40 horas, e as horas extras podem ser remuneradas com um adicional de 50% conforme estipulado no contrato.',
      },
      {
        id: 'B',
        text: 'A sociedade empresária está correta ao fixar 10 horas de trabalho por dia, desde que Jéssica cumpra apenas quatro dias de trabalho por semana, sem a necessidade de pagamento de horas extras.',
      },
      {
        id: 'C',
        text: 'O contrato de Jéssica é inválido, pois a jornada diária não pode exceder 8 horas contínuas, e as horas extras devem ser remuneradas com um adicional de 100%, conforme previsto no Estatuto da OAB, independentemente do contrato firmado.',
      },
      {
        id: 'D',
        text: 'A sociedade empresária está agindo corretamente, pois Jéssica pode trabalhar até 10 horas por dia desde que sua jornada semanal não ultrapasse 40 horas, mas a remuneração das horas extras deveria ser de 100% sobre o valor da hora normal, independentemente do contrato escrito.',
      },
    ],
    correctOption: 'C',
    legalBasis: 'Art. 20, caput e § 2º da Lei nº 8.906/1994 (EAOAB)',
    commentary:
      'O Art. 20 do EAOAB estabelece que a jornada do advogado empregado, mesmo em regime de dedicação exclusiva, não pode ultrapassar 8 horas diárias e 40 horas semanais. Ademais, o § 2º fixa expressamente que as horas extraordinárias serão remuneradas com adicional não inferior a 100% sobre o valor da hora normal.',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa C está correta. A fixação de 10 horas diárias viola o limite máximo diário de 8 horas e o percentual de hora extra do advogado empregado é no mínimo 100% (e não 50% da CLT comum), normas de ordem pública irrenunciáveis por contrato individual.',
      base_legal: 'Art. 20, caput e § 2º da Lei nº 8.906/1994',
      pegadinha_da_fgv:
        'A banca tenta atrair o candidato com as regras gerais da CLT (adicional de 50% de horas extras e compensação de jornada até 10 horas diárias), mas o advogado empregado possui regime especial e mais protetivo fixado pelo EAOAB.',
    },
  },
  {
    id: 4505,
    id_questao: 'oab_fgv_45_et_05',
    number: 5,
    discipline: 'Ética Profissional',
    topic: 'Infrações Disciplinares - Inscrição com Documento Falso e Quórum de Exclusão',
    statement:
      'O jovem Marcos foi contratado como auxiliar de escritório por renomada banca de advocacia. Autodidata e talentoso, Marcos aproveitava os momentos de folga para estudar os processos judiciais patrocinados pelo escritório e, apesar de nunca ter frequentado o curso de graduação em Direito, tornou-se relativamente conhecedor prático de muitos temas jurídicos. Com esse conhecimento, Marcos resolveu se inscrever no Exame da Ordem dos Advogados do Brasil, apresentando, para tanto, diploma falsificado de bacharel em Direito.\n\nApós a aprovação, Marcos se inscreveu como advogado na OAB, novamente fazendo uso do referido documento falso. Seis anos após esses fatos, uma denúncia anônima a respeito do ilícito ensejou a instauração do competente processo administrativo disciplinar.\n\nConsiderando o enunciado e o Estatuto da Advocacia e da Ordem dos Advogados do Brasil, assinale a afirmativa correta.',
    options: [
      {
        id: 'A',
        text: 'A gravidade da conduta atribuída a Marcos atrai a competência do Conselho Federal da Ordem dos Advogados do Brasil para apurar e punir a infração disciplinar.',
      },
      {
        id: 'B',
        text: 'Para a aplicação da sanção correspondente prevista em lei é necessária a manifestação de dois terços dos membros do Conselho Seccional competente.',
      },
      {
        id: 'C',
        text: 'A sanção disciplinar prevista para a conduta de Marcos é a de suspensão, que deve perdurar até que seja apresentado documento idôneo, cumulada com a aplicação de multa.',
      },
      {
        id: 'D',
        text: 'A pretensão à punibilidade da infração disciplinar encontra-se prescrita, uma vez que foi ultrapassado o prazo legal de cinco anos, contado da última data em que Marcos fez uso do documento falso.',
      },
    ],
    correctOption: 'B',
    legalBasis: 'Art. 34, XXVII e Art. 38, II c/c parágrafo único do Art. 38 da Lei nº 8.906/1994 (EAOAB)',
    commentary:
      'A utilização de falsa prova de qualquer dos requisitos para inscrição na OAB constitui infração punível com exclusão (Art. 34, XXVII e Art. 38, II do EAOAB). Consoante o parágrafo único do Art. 38, para a aplicação da sanção de exclusão é exigida a manifestação de dois terços dos membros do Conselho Seccional competente.',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa B está correta. A falsidade documental para obter inscrição nos quadros da OAB sujeita o infrator à sanção mais grave da advocacia: a exclusão. Para a imposição da exclusão, o Estatuto exige quórum qualificado de 2/3 dos membros do Conselho Seccional competente.',
      base_legal: 'Art. 34, XXVII e Art. 38, parágrafo único da Lei nº 8.906/1994',
      pegadinha_da_fgv:
        'O candidato pode cogitar que a pretensão punitiva prescreveu em 5 anos (alternativa D), mas o uso de documento falso para manter-se inscrito configura estado ilícito continuado e fraude contra os requisitos essenciais de inscrição nula de pleno direito.',
    },
  },
  {
    id: 4506,
    id_questao: 'oab_fgv_45_et_06',
    number: 6,
    discipline: 'Ética Profissional',
    topic: 'Prerrogativas do Advogado - Sigilo Profissional e Depoimento como Testemunha',
    statement:
      'Durante muitos anos, João representou Pedro, na condição de seu advogado, em diversas causas. Recentemente, após encerrados todos os vínculos contratuais existentes entre si, Pedro passou a ser investigado pelo suposto cometimento de ilícitos tributários.\n\nSobre esse contexto, de acordo com o Estatuto da Ordem e com o Código de Ética e Disciplina da Ordem dos Advogados do Brasil, assinale a afirmativa correta.',
    options: [
      {
        id: 'A',
        text: 'João não poderá ser obrigado a depor como testemunha no curso de eventual processo judicial em face de Pedro, ainda que este expressamente o autorize ou solicite o depoimento do ex-advogado.',
      },
      {
        id: 'B',
        text: 'João não poderá ser obrigado a depor como testemunha no curso de eventual processo judicial em face de Pedro, exceto se este expressamente o autorizar, ou no caso de solicitação do próprio ex-constituinte.',
      },
      {
        id: 'C',
        text: 'João poderá ser obrigado a depor sobre fatos que constituam sigilo profissional caso seu depoimento seja considerado imprescindível para a instrução em processos criminais que apurem a prática de crimes dolosos contra a vida.',
      },
      {
        id: 'D',
        text: 'Considerando que a investigação se iniciou após a extinção da relação profissional existente entre João e Pedro, não há qualquer prerrogativa em favor de João que o escuse da obrigação de depor como testemunha no curso de processo judicial sobre fato relacionado com pessoa de quem já foi advogado.',
      },
    ],
    correctOption: 'A',
    legalBasis: 'Art. 7º, XIX da Lei nº 8.906/1994 (EAOAB); Arts. 36 e 38 do CED',
    commentary:
      'É prerrogativa do advogado recusar-se a depor como testemunha em processo no qual funcionou ou deva funcionar, ou sobre fato a cujo respeito deva guardar sigilo profissional, ainda que desobrigado pelo cliente (Art. 7º, XIX do EAOAB e Art. 38 do CED). O sigilo profissional é de ordem pública e subsiste mesmo após a extinção do mandato.',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa A está correta. A prerrogativa e o dever de sigilo persistem perenemente mesmo após encerrada a relação com o cliente. O advogado não pode ser obrigado a depor nem mesmo quando o próprio cliente expressamente o autoriza ou requer.',
      base_legal: 'Art. 7º, XIX da Lei nº 8.906/1994 e Art. 38 do CED',
      pegadinha_da_fgv:
        'A FGV explora a ideia intuitiva de que a autorização do cliente liberaria o advogado para depor (alternativa B), o que é falso: a prerrogativa pertence ao advogado e à dignidade da profissão, não ao cliente.',
    },
  },
  {
    id: 4507,
    id_questao: 'oab_fgv_45_et_07',
    number: 7,
    discipline: 'Ética Profissional',
    topic: 'Direitos da Advogada Lactante',
    statement:
      'Ana é advogada e acaba de dar à luz seu primeiro filho, a quem ainda amamenta. Ela foi cientificada de que a Sexta Câmara Cível deverá julgar um caso em que é uma das advogadas constituídas pelo recorrente.\n\nSobre a hipótese, assinale a opção que indica o direito que Ana tem assegurado.',
    options: [
      {
        id: 'A',
        text: 'Vaga reservada na garagem do Fórum.',
      },
      {
        id: 'B',
        text: 'Suspensão de prazos processuais, desde que haja notificação por escrito ao cliente.',
      },
      {
        id: 'C',
        text: 'Entrada em tribunais sem ser submetida a detectores de metais e aparelhos de raios X.',
      },
      {
        id: 'D',
        text: 'Acesso a creche, onde houver, ou a local adequado para o atendimento das necessidades do bebê.',
      },
    ],
    correctOption: 'D',
    legalBasis: 'Art. 7º-A, III da Lei nº 8.906/1994 (EAOAB)',
    commentary:
      'Nos termos do Art. 7º-A, III do EAOAB, são direitos da advogada lactante, adotante ou que der à luz: acesso a creche, onde houver, ou a local adequado ao atendimento das necessidades do bebê. A vaga de garagem e a dispensa de detectores de raio-X são direitos específicos da advogada gestante (incisos I e II). A suspensão de prazos depende de ela ser a única patrona da causa.',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa D está correta. O art. 7º-A, III do EAOAB garante expressamente à advogada lactante o acesso a creche ou local adequado ao bebê. Vaga de garagem e dispensa de raio-X beneficiam a gestante, e a suspensão de prazos exige que ela seja a única advogada constituída nos autos (o enunciado frisou que ela é "uma das advogadas").',
      base_legal: 'Art. 7º-A, III e IV da Lei nº 8.906/1994',
      pegadinha_da_fgv:
        'A banca inseriu a sutileza de que Ana é "uma das advogadas constituídas", afastando a suspensão de prazos (que exige ser a única patrona, art. 7º-A, IV), além de misturar prerrogativas da gestante com as da lactante.',
    },
  },
  {
    id: 4508,
    id_questao: 'oab_fgv_45_et_08',
    number: 8,
    discipline: 'Ética Profissional',
    topic: 'Sociedade de Advogados e Sociedade Unipessoal - Vedação de Pluralidade Territorial',
    statement:
      'Pedro é advogado regularmente inscrito no Conselho Seccional da OAB do Estado Alfa e constituiu uma Sociedade Unipessoal de Advocacia registrada e ativa na mesma unidade federativa. Recentemente, ele foi convidado pelo renomado advogado Abraão para integrar uma Sociedade de Advogados, também com sede no Estado Alfa, na qualidade de sócio.\n\nPedro considerou a proposta promissora e cogita aceitá-la, acreditando que pode participar de ambas as sociedades, desde que evite atuar nos mesmos processos ou contra os interesses de clientes de uma delas.\n\nSobre a decisão de Pedro, com base no Estatuto da Advocacia e da OAB, assinale a afirmativa correta.',
    options: [
      {
        id: 'A',
        text: 'Pedro poderá integrar ambas as sociedades, desde que atue em processos distintos e jamais represente partes com interesses opostos.',
      },
      {
        id: 'B',
        text: 'Pedro poderá aceitar o convite de Abraão apenas se encerrar formalmente a Sociedade Unipessoal de Advocacia que já possui no Estado Alfa.',
      },
      {
        id: 'C',
        text: 'Pedro poderá participar das duas sociedades se firmar declaração formal de que manterá independência profissional e não haverá conflito de interesses.',
      },
      {
        id: 'D',
        text: 'Pedro poderá manter a sua sociedade unipessoal e, ao mesmo tempo, integrar a sociedade de Abraão desde que a nova sociedade registre filial em outra área territorial, ainda que continue atuando no Estado Alfa.',
      },
    ],
    correctOption: 'B',
    legalBasis: 'Art. 15, § 4º da Lei nº 8.906/1994 (EAOAB)',
    commentary:
      'O Art. 15, § 4º do EAOAB veda expressamente que o advogado integre mais de uma sociedade de advogados, constitua mais de uma sociedade unipessoal de advocacia, ou integre, simultaneamente, uma sociedade de advogados e uma sociedade unipessoal de advocacia, com sede ou filial na mesma área territorial do respectivo Conselho Seccional.',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa B está correta. Para que Pedro possa ingressar como sócio na sociedade pluripessoal com sede no Estado Alfa, ele deve previamente encerrar ou retirar-se de sua sociedade unipessoal constituída na mesma base territorial.',
      base_legal: 'Art. 15, § 4º da Lei nº 8.906/1994',
      pegadinha_da_fgv:
        'O candidato desatento costuma acreditar que compromissos éticos de "não atuar nos mesmos processos" ou "ausência de conflito" supririam a expressa proibição legal de duplo vínculo societário na mesma seccional.',
    },
  },

  // --- FILOSOFIA DO DIREITO (Q9 a Q10) ---
  {
    id: 4509,
    id_questao: 'oab_fgv_45_fd_09',
    number: 9,
    discipline: 'Filosofia do Direito',
    topic: 'Contratualismo - Jean-Jacques Rousseau e o Contrato Social',
    statement:
      'Leia o fragmento a seguir:\n\n"Encontrar uma forma de associação que defenda e proteja as pessoas e os bens de cada associado com toda a força comum, e pela qual cada um, unindo-se a todos, só obedece a si mesmo, permanecendo, assim, tão livre quanto antes."\n(Jean-Jacques Rousseau)\n\nAssinale a opção que indica a forma de associação que, segundo Rousseau, responde a esse problema.',
    options: [
      { id: 'A', text: 'Luta de Classes.' },
      { id: 'B', text: 'Contrato Social.' },
      { id: 'C', text: 'União das Nações.' },
      { id: 'D', text: 'Utilitarismo de Regras.' },
    ],
    correctOption: 'B',
    legalBasis: 'Jean-Jacques Rousseau, "Do Contrato Social", Livro I, Capítulo VI',
    commentary:
      'A célebre citação inaugura o Livro I, Capítulo VI de "Do Contrato Social", em que Rousseau define o problema fundamental cuja solução é o Contrato Social: conciliar a associação protetiva da coletividade com a preservação integral da liberdade civil e da soberania da vontade geral.',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa B está correta. Trata-se do problema central formulado por Jean-Jacques Rousseau em sua obra-prima política: o estabelecimento do Contrato Social como pacto legítimo que institui o corpo político sem sacrificar a autonomia e a liberdade do indivíduo.',
      base_legal: 'Rousseau, J.-J. Do Contrato Social, 1762',
      pegadinha_da_fgv:
        'As demais alternativas trazem correntes filosóficas ou sociológicas completamente distintas: Marx (Luta de Classes), Kant/Direito Internacional (União das Nações) e Bentham/Mill (Utilitarismo).',
    },
  },
  {
    id: 4510,
    id_questao: 'oab_fgv_45_fd_10',
    number: 10,
    discipline: 'Filosofia do Direito',
    topic: 'Hermenêutica Jurídica - Classificação da Interpretação quanto ao Resultado',
    statement:
      'Considere hipoteticamente que determinado Tribunal, no julgamento de três casos diversos, profere as seguintes decisões:\n\nI. Ao analisar determinada lei que diz ser "proibida a entrada de animais em estabelecimentos comerciais", o Tribunal decide que cães-guias de pessoas com deficiência visual não estão abrangidos pela norma.\nII. Interpretando lei segundo a qual "é proibido fumar em ambientes fechados", o Tribunal considera que a proibição deve se limitar ao que está textualmente contido na norma.\nIII. Com base em lei que prevê o "benefício da licença-maternidade à mãe biológica", o Tribunal defere esse benefício a uma mãe adotiva.\n\nAssinale a opção que indica corretamente os tipos de interpretação adotados pelo Tribunal nos casos I, II e III, respectivamente.',
    options: [
      { id: 'A', text: 'Extensiva, teleológica e axiológica.' },
      { id: 'B', text: 'Axiológica, restritiva e especificadora.' },
      { id: 'C', text: 'Restritiva, especificadora e extensiva.' },
      { id: 'D', text: 'Especificadora, restritiva e teleológica.' },
    ],
    correctOption: 'C',
    legalBasis: 'Teoria Geral do Direito e Hermenêutica Jurídica (Carlos Maximiliano / Norberto Bobbio)',
    commentary:
      'Quanto aos resultados:\nI. Restritiva: a norma disse mais do que pretendia (minus voluit quam dixit), restringindo seu alcance para excluir os cães-guias.\nII. Especificadora (ou declarativa): a autoridade limita o alcance da norma exatamente aos termos estritos da letra da lei.\nIII. Extensiva: amplia o alcance literal do preceito legal para abranger hipótese congênere não contemplada na dicção originária (mãe adotiva).',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa C está correta. A tripartição clássica dos efeitos da interpretação divide-se em: restritiva (restringe o sentido literal da regra ampla), especificadora/declarativa (mantém a estrita correspondência da dicção legal) e extensiva (alarga a regra para abarcar situação análoga condizente com a ratio legis).',
      base_legal: 'Hermenêutica Tradicional - Interpretação quanto aos efeitos/resultados',
      pegadinha_da_fgv:
        'O examinador usou o termo técnico "especificadora" (sinônimo de interpretação declarativa estrita) ao lado de restritiva e extensiva, exigindo conhecimento preciso das nomenclaturas de hermenêutica clássica.',
    },
  },

  // --- DIREITO CONSTITUCIONAL (Q11 a Q16) ---
  {
    id: 4511,
    id_questao: 'oab_fgv_45_dc_11',
    number: 11,
    discipline: 'Direito Constitucional',
    topic: 'Princípio da Igualdade Material e Ações Afirmativas na Pós-Graduação',
    statement:
      'A Faculdade de Direito da Universidade do Estado Beta, pela primeira vez, publicou edital para o ingresso nos cursos de mestrado e doutorado, contendo sistema de cotas para graduados negros, indígenas, quilombolas e pessoas com deficiência. O edital baseia-se em lei estadual, promulgada no ano passado, que garante, pelo prazo de cinco anos, o acesso diferenciado aos programas de mestrado e doutorado.\n\nIndignado com essa regra, um graduado apresentou pedido administrativo visando à modificação do edital, com a exclusão do sistema de cotas. Para tanto, argumentou que ele viola o princípio da isonomia. Diante da polêmica, a Diretora da Faculdade consultou o corpo de advogados da Universidade.\n\nSobre a hipótese apresentada, segundo o sistema jurídico-constitucional brasileiro, assinale a opção que indica o parecer correto que deve ser apresentado.',
    options: [
      {
        id: 'A',
        text: 'O acesso diferenciado, como apresentado no edital, só pode ser admitido para as educações básica e superior, sendo expressamente vedada a sua utilização em cursos de pós-graduação.',
      },
      {
        id: 'B',
        text: 'A diretoria da Faculdade de Direito tem discricionariedade para, livremente, estabelecer critérios para o acesso aos cursos de graduação e pós-graduação para quaisquer grupos sociais, com base na autonomia didático-científica e administrativa de que gozam as universidades públicas.',
      },
      {
        id: 'C',
        text: 'A realização da dimensão material do princípio da igualdade coaduna-se com a adoção de ações afirmativas que atinja grupos sociais determinados, atribuindo-lhes certas vantagens, normalmente por tempo definido, com vistas à superação de desigualdades decorrentes de situações históricas.',
      },
      {
        id: 'D',
        text: 'O edital elaborado pela Faculdade de Direito viola o princípio da isonomia formal, princípio constitucional elementar, que tem por função garantir idênticas condições de acesso ao ensino de pós-graduação a todos, relativizando possíveis diferenças culturais, de raça ou mesmo por deficiência.',
      },
    ],
    correctOption: 'C',
    legalBasis: 'Art. 5º, caput e Art. 3º, III da CF/88; ADPF 186 e ADC 41 do STF',
    commentary:
      'O Supremo Tribunal Federal, ao julgar a ADPF 186 e a ADC 41, fixou a plena constitucionalidade das políticas de ações afirmativas para o ingresso em instituições públicas de ensino, inclusive na pós-graduação, como mecanismo de concretização da igualdade material voltada à superação de déficits e desigualdades históricas.',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa C está correta. As ações afirmativas são mecanismos de igualdade material (substancial) respaldados pelo STF, desenhados para grupos desfavorecidos historicamente, com prazo e metas determinadas, sendo perfeitamente cabíveis em cursos de pós-graduação.',
      base_legal: 'Art. 5º, caput e Art. 3º, III da CF/88; Teses do STF (ADPF 186 e ADC 41)',
      pegadinha_da_fgv:
        'Apegando-se à mera "isonomia formal" (alternativa D), o candidato desconsidera a consagração pacífica da igualdade substancial distributiva no ordenamento constitucional brasileiro.',
    },
  },
  {
    id: 4512,
    id_questao: 'oab_fgv_45_dc_12',
    number: 12,
    discipline: 'Direito Constitucional',
    topic: 'Princípio da Livre Concorrência e Súmula Vinculante 49 do STF',
    statement:
      'Romualdo, empresário do ramo de supermercados, dirige-se à Prefeitura do Município Alfa e solicita licença para instalar uma loja da sua rede em um bairro específico da cidade. O pedido é negado sob a justificativa de que já existia outro estabelecimento do mesmo ramo na região. Segundo a Prefeitura de Alfa, a concessão de licença afrontaria a Lei Complementar Municipal nº X (LC X/2024), que exige distância mínima de mil metros entre estabelecimentos que comercializem produtos semelhantes.\n\nRomualdo, então, procura você, como advogado(a), para analisar a situação com base na ordem jurídico-constitucional brasileira.\n\nAssinale a opção que apresenta, corretamente, sua análise sobre a hipótese narrada.',
    options: [
      {
        id: 'A',
        text: 'A norma municipal deve ser observada, em respeito à autonomia municipal garantida pela ordem jurídica brasileira.',
      },
      {
        id: 'B',
        text: 'A LC X é inconstitucional, já que Alfa, por não ser ente federativo, não possui competência legislativa para produzir leis complementares.',
      },
      {
        id: 'C',
        text: 'A existência de norma legal federal sobre a questão deve ser avaliada, porque, pelo critério hierárquico, esta última prevaleceria sobre a norma municipal.',
      },
      {
        id: 'D',
        text: 'A abertura do negócio em questão não deve ser restringida, porque a LC X, ao adotar o referido critério geográfico, viola o princípio constitucional da livre concorrência.',
      },
    ],
    correctOption: 'D',
    legalBasis: 'Art. 170, IV da CF/88; Súmula Vinculante nº 49 do STF',
    commentary:
      'Dispõe expressamente a Súmula Vinculante nº 49 do STF: "Ofende o princípio da livre concorrência lei municipal que impede a instalação de estabelecimentos comerciais do mesmo ramo em determinada área". A exigência de distância mínima de 1.000 metros é, portanto, inconstitucional.',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa D está correta. A matéria é pacificada pelo STF em sede de Súmula Vinculante (SV 49): municípios não podem criar reservas de mercado geográficas entre estabelecimentos do mesmo ramo sob pretexto de zoneamento urbano, pois isso viola a livre concorrência.',
      base_legal: 'Súmula Vinculante nº 49 do STF e Art. 170, IV da CF/88',
      pegadinha_da_fgv:
        'A FGV tenta seduzir o examinando com o poder de ordenamento urbano local do Município (Art. 30, VIII da CF), mas a jurisprudência sumulada do Pretório Excelso estabelece com clareza a inconstitucionalidade do distanciamento compulsório com finalidade anticoncorrencial.',
    },
  },
  {
    id: 4513,
    id_questao: 'oab_fgv_45_dc_13',
    number: 13,
    discipline: 'Direito Constitucional',
    topic: 'Regime Constitucional de Precatórios - Ordem Cronológica e Prioridade Etária',
    statement:
      'Marcos, que tem 56 anos de idade, é amigo de Joana, que já completou 58 anos de idade. Ambos, em disputas judiciais contra o Estado Alfa, tiveram reconhecidos seus respectivos direitos ao recebimento de valores em face do mencionado ente. Após os trâmites executórios, foi autorizada pelo Presidente do Tribunal de Justiça de Alfa a expedição do precatório de Marcos e, dois meses depois, pela mesma autoridade, autorizada a expedição do precatório de Joana. Ciente de que nenhum dos dois casos caracteriza débito de natureza alimentícia, Joana consultou você, como advogado(a), para saber se ela tem prioridade de recebimento por ser mais velha que Marcos.\n\nAssinale a opção que indica, corretamente, sua resposta.',
    options: [
      {
        id: 'A',
        text: 'A CRFB/88 não estabelece critérios de prioridade cronológica para o recebimento dos precatórios, quando os créditos não têm natureza alimentícia.',
      },
      {
        id: 'B',
        text: 'Tanto Joana quanto Marcos, por terem menos de 60 anos, devem receber seus créditos na ordem cronológica de apresentação dos precatórios.',
      },
      {
        id: 'C',
        text: 'Ambos, em razão da idade, terão direito ao recebimento imediato, sem se submeter à ordem cronológica estabelecida para a sistemática de precatórios pela CRFB/88.',
      },
      {
        id: 'D',
        text: 'Joana, por ter idade superior à de Marcos, possui prioridade etária sobre ele e, por isso, receberá seus créditos em data anterior à realização do pagamento a Marcos.',
      },
    ],
    correctOption: 'B',
    legalBasis: 'Art. 100, caput e § 2º da CF/88',
    commentary:
      'Nos termos do Art. 100 da CF/88, os precatórios judiciários devem ser pagos estritamente na ordem cronológica de sua apresentação. A preferência por critério etário prevista no § 2º exige idade igual ou superior a 60 anos (além de créditos de natureza alimentícia). Como Joana tem 58 e Marcos 56 anos, nenhum possui prioridade etária, devendo respeitar a ordem cronológica.',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa B está correta. A regra geral constitucional para o pagamento de precatórios é a rigorosa ordem cronológica de apresentação. O benefício da prioridade etária só contempla credores com 60 anos ou mais. Tendo Joana 58 anos, ela não preenche o requisito legal para ultrapassar o precatório de Marcos expedido anteriormente.',
      base_legal: 'Art. 100, caput e § 2º da Constituição Federal de 1988',
      pegadinha_da_fgv:
        'A simples diferença de idade entre dois credores comuns não gera preferência cronológica se nenhum deles atingiu o marco constitucional de 60 anos previsto no art. 100, § 2º da CF.',
    },
  },
  {
    id: 4514,
    id_questao: 'oab_fgv_45_dc_14',
    number: 14,
    discipline: 'Direito Constitucional',
    topic: 'Repartição de Competências Legislativas - Competência Residual dos Estados',
    statement:
      'Carlos Frederico, Deputado Estadual no Estado Alfa, apresentou projeto de lei que versa sobre tema que, embora considerado de grande relevância, não se enquadra no rol de matérias de competência legislativa expressa de qualquer dos entes federativos (União, Estados, Distrito Federal e Municípios).\n\nPor essa razão, alguns dos seus colegas deputados suscitaram a possível incompetência da Assembleia Legislativa de Alfa para legislar sobre o tema. Para esclarecer a dúvida, o Procurador-Geral da Assembleia Legislativa foi chamado a se manifestar.\n\nAssinale a opção que apresenta, segundo o sistema jurídico-constitucional brasileiro, o esclarecimento prestado.',
    options: [
      {
        id: 'A',
        text: 'A Assembleia Legislativa do Estado Alfa pode legislar sobre a matéria.',
      },
      {
        id: 'B',
        text: 'O projeto de lei é inconstitucional, porque a competência legislativa sobre a matéria é exclusiva da União.',
      },
      {
        id: 'C',
        text: 'A omissão constitucional permite concluir que se está diante de matéria de interesse local, de competência municipal.',
      },
      {
        id: 'D',
        text: 'A constitucionalidade do projeto de lei somente será reconhecida se, aprioristicamente, a Assembleia Legislativa de Alfa solicitar autorização ao Congresso Nacional para a respectiva tramitação.',
      },
    ],
    correctOption: 'A',
    legalBasis: 'Art. 25, § 1º da CF/88',
    commentary:
      'A Constituição Federal de 1988 adotou o princípio dos poderes reservados/remanescentes para os Estados-membros em seu Art. 25, § 1º: "São reservadas aos Estados as competências que não lhes sejam vedadas por esta Constituição". Portanto, as matérias que não foram atribuídas expressamente à União ou aos Municípios pertencem à competência residual dos Estados.',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa A está correta. A competência legislativa dos Estados federados é remanescente/residual por expressa dicção do art. 25, § 1º da Carta Magna. Não constando a matéria no rol enumerado da União ou de interesse local municipal, cabe ao Estado legislar.',
      base_legal: 'Art. 25, § 1º da Constituição Federal de 1988',
      pegadinha_da_fgv:
        'Muitos candidatos presumem que matérias omitidas ou não expressas na CF pertencem à União. Porém, a competência residual no federalismo brasileiro é atribuída aos Estados (competência legislativa residual), cabendo à União competência residual apenas em matéria tributária (impostos residuais via LC).',
    },
  },
  {
    id: 4515,
    id_questao: 'oab_fgv_45_dc_15',
    number: 15,
    discipline: 'Direito Constitucional',
    topic: 'Controle de Constitucionalidade - Lei Pré-Constitucional e Inadequação da ADI',
    statement:
      'A Lei Federal nº 1.079/1950 define os crimes de responsabilidade praticados pelo Presidente da República e traz normas regulando o respectivo processo.\n\nHá poucos meses, o Diretório Nacional do Partido Político Alfa consultou você, como advogado(a), sobre a possibilidade de ingressar com Ação Direta de Inconstitucionalidade (ADI) para impugnar alguns dispositivos da Lei nº 1.079/1950 que considerava incompatíveis com a ordem constitucional.\n\nSobre a hipótese apresentada, assinale a afirmativa correta.',
    options: [
      {
        id: 'A',
        text: 'Como a Lei nº 1.079/1950 foi recepcionada pela ordem constitucional vigente, continuando a produzir efeitos nas últimas décadas, a Ação Direta de Inconstitucionalidade é a via de controle objetivo adequada para impugná-la.',
      },
      {
        id: 'B',
        text: 'Diante da fungibilidade reconhecida pelo Supremo Tribunal Federal entre a Ação Direta de Inconstitucionalidade e a Arguição de Descumprimento de Preceito Fundamental, admite-se, em qualquer caso, a conversão de uma via impugnativa em outra.',
      },
      {
        id: 'C',
        text: 'Embora seja cabível o ajuizamento de Ação Declaratória de Constitucionalidade em face da Lei nº 1.079/1950, para reconhecer a compatibilidade de seus dispositivos com a CRFB/88, a Ação Direta de Inconstitucionalidade não se presta a impugnar dispositivos de lei pré-constitucional.',
      },
      {
        id: 'D',
        text: 'A Ação Direta de Inconstitucionalidade não é a via de controle objetivo adequada para impugnar os dispositivos da Lei nº 1.079/1950, e, por se tratar de erro grosseiro, o Supremo Tribunal Federal não admite sua fungibilidade com a Arguição de Descumprimento de Preceito Fundamental.',
      },
    ],
    correctOption: 'D',
    legalBasis: 'Art. 102, I, "a" da CF/88; Lei nº 9.882/1999; Jurisprudência do STF (ADI 438, ADPF 33)',
    commentary:
      'O STF possui jurisprudência firmada no sentido de que normas pré-constitucionais (editadas antes de 05/10/1988) não são passíveis de controle concentrado via ADI, pois o confronto entre lei anterior e nova Constituição resolve-se pelo fenômeno da revogação/não recepção. A via abstrata cabível é a ADPF. O ajuizamento de ADI contra lei pré-constitucional é classificado pelo STF como erro grosseiro, inadmitindo a aplicação do princípio da fungibilidade.',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa D está correta. A Lei nº 1.079/1950 é anterior à Constituição de 1988. Segundo o STF, a ADI só cabe contra atos normativos federais ou estaduais pós-constitucionais. A propositura de ADI contra direito pré-constitucional constitui erro inescusável/grosseiro, impedindo a conversão oficiosa em ADPF.',
      base_legal: 'Art. 102, I, "a" da CF/88; Jurisprudência consolidada do STF (Plenário)',
      pegadinha_da_fgv:
        'O candidato é tentado a marcar a fungibilidade ampla (alternativa B), contudo o STF exige ausência de erro grosseiro e dúvida objetiva razoável para aplicar a fungibilidade entre ações de controle concentrado.',
    },
  },
  {
    id: 4516,
    id_questao: 'oab_fgv_45_dc_16',
    number: 16,
    discipline: 'Direito Constitucional',
    topic: 'Nacionalidade - Perda da Nacionalidade e Emenda Constitucional nº 131/2023',
    statement:
      'Mariana, que nasceu no Brasil, decidiu adquirir a nacionalidade de um país asiático. Embora este país não tivesse imposto condições para sua permanência no respectivo território ou para o exercício dos direitos civis, ela acreditava que essa decisão facilitaria sua circulação pelo continente asiático, já que tinha o propósito de explorar vários sítios montanhosos.\n\nNo entanto, ao retornar ao Brasil neste mês, Mariana foi informada de que essa escolha pode resultar na perda de sua nacionalidade brasileira. Preocupada, ela consultou você, como advogado(a), para esclarecer a sua situação, explicando que nunca realizou qualquer pedido expresso para abdicar da nacionalidade brasileira.\n\nSobre a situação de Mariana, de acordo com o sistema jurídico-constitucional brasileiro, assinale a afirmativa correta.',
    options: [
      {
        id: 'A',
        text: 'Ela mantém a nacionalidade brasileira, pois, no caso em análise, apenas o pedido expresso de perda da nacionalidade pode gerar tal consequência.',
      },
      {
        id: 'B',
        text: 'Ela não perde a nacionalidade brasileira, desde que comunique previamente ao governo brasileiro que não deseja renunciar a ela ao adquirir a nova nacionalidade.',
      },
      {
        id: 'C',
        text: 'Ela perde a nacionalidade brasileira apenas se deixar de exercer direitos políticos e civis no Brasil, como o voto ou a manutenção de propriedades, após adquirir a nova nacionalidade.',
      },
      {
        id: 'D',
        text: 'Ela perde a nacionalidade brasileira, pois ao adquirir voluntariamente outra nacionalidade, sem imposição do Estado estrangeiro, ela perde automaticamente a nacionalidade originária.',
      },
    ],
    correctOption: 'A',
    legalBasis: 'Art. 12, § 4º da CF/88, com a redação dada pela Emenda Constitucional nº 131/2023',
    commentary:
      'Com a promulgação da Emenda Constitucional nº 131/2023, o Art. 12, § 4º da CF/88 foi substancialmente reformado: a aquisição voluntária de outra nacionalidade não acarreta mais a perda automática da nacionalidade brasileira! A perda agora só ocorre se o brasileiro tiver cancelada sua naturalização por sentença judicial (inciso I) ou se fizer pedido expresso de perda da nacionalidade brasileira perante autoridade competente (inciso II).',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa A está correta. A EC 131/2023 eliminou a perda automática da nacionalidade brasileira por naturalização voluntária estrangeira. Agora, vigora o princípio da voluntariedade expressa: apenas se o indivíduo expressamente formalizar o pedido de renúncia perante autoridade brasileira é que perderá o vínculo.',
      base_legal: 'Art. 12, § 4º, II da Constituição Federal (redação da EC 131/2023)',
      pegadinha_da_fgv:
        'A alternativa D reproduz a regra antiga anterior à EC 131/2023. Esta questão é o exemplo perfeito de cobrança imediata de recente alteração constitucional pela banca FGV.',
    },
  },

  // --- DIREITOS HUMANOS (Q17 a Q18) ---
  {
    id: 4517,
    id_questao: 'oab_fgv_45_dh_17',
    number: 17,
    discipline: 'Direitos Humanos',
    topic: 'Terras Indígenas e Convenção nº 169 da OIT',
    statement:
      'Na condição de advogado(a) especializado(a) na defesa de Direitos Humanos, você é procurado(a) por membros de uma comunidade de povos originários, interessados em regularizar a situação das terras por eles tradicionalmente ocupadas.\n\nA referida comunidade pretende obter esclarecimentos acerca do seu eventual direito de propriedade, bem como quanto à forma de sua utilização.\n\nEm relação ao tema, de acordo com o sistema regional americano e o ordenamento jurídico nacional, assinale a opção que apresenta, corretamente, o seu esclarecimento.',
    options: [
      {
        id: 'A',
        text: 'De acordo com o ordenamento jurídico interno, aos povos originários é assegurado o usufruto exclusivo das riquezas do solo por eles tradicionalmente ocupado. Nesse sentido, pode a comunidade, exercendo o seu direito à autodeterminação, cultivar organismos geneticamente modificados em suas terras.',
      },
      {
        id: 'B',
        text: 'A Convenção nº 169, da Organização Internacional do Trabalho, reconhece expressamente o direito de propriedade dos povos originários em relação às terras que tradicionalmente ocupam.',
      },
      {
        id: 'C',
        text: 'Ao reconhecer, em favor das comunidades de povos originários, os direitos originários sobre as terras que tradicionalmente ocupam, o ordenamento jurídico nacional admite que tais áreas possam ser objeto de contrato de arrendamento, desde que celebrado pelos próprios, adequadamente representados e informados.',
      },
      {
        id: 'D',
        text: 'Embora a Corte Interamericana de Direitos Humanos não reconheça o direito de propriedade coletiva em favor das comunidades de povos originários quanto às terras que tradicionalmente ocupam, a Constituição Federal de 1988 expressamente determinou a outorga do título de propriedade aos povos originários, desde que demonstrada a tradicionalidade da sua ocupação.',
      },
    ],
    correctOption: 'B',
    legalBasis: 'Artigo 14 da Convenção nº 169 da OIT; Art. 231, § 2º da CF/88',
    commentary:
      'O Artigo 14, item 1 da Convenção nº 169 da OIT dispõe expressamente que deverão ser reconhecidos aos povos interessados os direitos de propriedade e de posse sobre as terras que tradicionalmente ocupam. No ordenamento constitucional interno (CF/88, art. 20, XI e art. 231), as terras são bens da União com posse permanente e usufruto exclusivo dos indígenas, vedado arrendamento.',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa B está correta. A Convenção 169 da OIT, incorporada ao direito brasileiro pelo Decreto 5.051/2004 e ratificada pelo Decreto 10.088/2019, consigna expressamente em seu art. 14 o direito de propriedade e posse dos povos originários sobre as terras tradicionalmente ocupadas.',
      base_legal: 'Artigo 14, 1 da Convenção nº 169 da Organização Internacional do Trabalho (OIT)',
      pegadinha_da_fgv:
        'O candidato costuma confundir a regra da CF/88 (na qual as terras são dominialmente bens da União e inalienáveis, art. 231) com os tratados internacionais de direitos humanos, que empregam a categoria do "direito de propriedade comunal/coletiva".',
    },
  },
  {
    id: 4518,
    id_questao: 'oab_fgv_45_dh_18',
    number: 18,
    discipline: 'Direitos Humanos',
    topic: 'Corte IDH - Direito à Proteção Judicial e Efetividade da Execução',
    statement:
      'De acordo com a jurisprudência da Corte Interamericana de Direitos Humanos, em relação ao Direito à Proteção Judicial, previsto no Art. 25 do Pacto de São José da Costa Rica, assinale a afirmativa correta.',
    options: [
      {
        id: 'A',
        text: 'O direito à proteção judicial não se exaure na prestação da tutela judicial cognitiva, sendo imprescindível que o Estado garanta os meios para executar, de maneira efetiva, as suas decisões definitivas.',
      },
      {
        id: 'B',
        text: 'Trata-se de direito que impõe obrigação meramente instrumental aos Estados-parte. Nesse sentido, é suficiente a previsão de recursos no plano formal para que a garantia seja considerada efetivamente observada.',
      },
      {
        id: 'C',
        text: 'Com vistas à preservação da soberania dos Estados-parte, caso sejam necessários esclarecimentos quanto à violação ou não por determinado Estado, de suas obrigações internacionais em virtude das atuações de seus órgãos judiciais, não poderá a Corte IDH examinar os processos judiciais internos, devendo se valer de outros elementos de análise.',
      },
      {
        id: 'D',
        text: 'Nos casos em que se verificou uma situação de graves violações a Direitos Humanos, é obrigação do Estado-parte promover a devida apuração e responsabilização de todos os envolvidos, sejam autoridades oficiais ou particulares. Admite-se, como única justificativa legítima ao não sancionamento dos responsáveis, a concessão de anistia, quando prevista em lei, devidamente aprovada pelo Poder Legislativo competente.',
      },
    ],
    correctOption: 'A',
    legalBasis: 'Artigo 25 da Convenção Americana sobre Direitos Humanos (CADH); Jurisprudência da Corte IDH (Caso Furlan e Familiares vs. Argentina)',
    commentary:
      'A jurisprudência vinculante da Corte IDH preconiza que a proteção judicial assegurada pelo Art. 25 da CADH abrange não apenas o acesso formal ao tribunal e o julgamento cognitivo, mas a execução tempestiva e eficaz do julgado, pois uma decisão inexecutável converte a proteção judicial em mera ilusão formal.',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa A está correta. A Corte Interamericana de Direitos Humanos assenta que a garantia de proteção judicial encerra a efetividade executória da sentença proferida. Leis de anistia para graves violações (alternativa D) são manifestamente repudiadas pela Corte IDH (ex: Casos Barrios Altos e Gomes Lund).',
      base_legal: 'Artigo 25 do Pacto de São José da Costa Rica e Jurisprudência Consolidada da Corte IDH',
      pegadinha_da_fgv:
        'A assertiva D tenta validar leis de anistia nacional, o que afronta a histórica jurisprudência da Corte IDH que considera normas de autoanistia incompatíveis com a CADH.',
    },
  },

  // --- DIREITO ELEITORAL (Q19 a Q20) ---
  {
    id: 4519,
    id_questao: 'oab_fgv_45_el_19',
    number: 19,
    discipline: 'Direito Eleitoral',
    topic: 'Condutas Vedadas aos Agentes Públicos - Cessão de Prédio Público para Convenções',
    statement:
      'João, prefeito do Município Alfa, no ano em que seriam realizadas eleições municipais, cedeu, de maneira gratuita, o uso de um prédio público, mais especificamente de uma escola pública, fora do horário de aulas, para que os partidos políticos pudessem promover as convenções partidárias nas quais seriam escolhidos os candidatos ao pleito.\n\nAna, cidadã com elevado senso cívico, consultou você, como advogado(a), sobre a compatibilidade dessa medida com a legislação eleitoral.\n\nEm relação à atitude de João, assinale a afirmativa correta.',
    options: [
      {
        id: 'A',
        text: 'A decisão proferida gera prejuízo ao erário, pois, embora o prédio público possa ser utilizado pelos partidos políticos para a finalidade indicada, deveria ser pago aluguel.',
      },
      {
        id: 'B',
        text: 'João decidiu de maneira harmônica com a legislação eleitoral, pois o prédio público não pode ser utilizado para finalidades privadas, estando configurada uma conduta vedada aos agentes públicos em campanhas eleitorais.',
      },
      {
        id: 'C',
        text: 'A decisão de João mostra-se correta, pois, embora exista a regra geral de que os agentes públicos não podem ceder imóveis públicos em benefício dos partidos políticos, é ressalvada a realização de convenção partidária.',
      },
      {
        id: 'D',
        text: 'A decisão de João está ajustada à sistemática legal, pois, em prol do princípio democrático, os imóveis públicos devem ser cedidos, para fins exclusivamente eleitorais, aos candidatos, aos partidos e às coligações que os solicitem.',
      },
    ],
    correctOption: 'C',
    legalBasis: 'Art. 73, I da Lei nº 9.504/1997 (Lei das Eleições)',
    commentary:
      'O Art. 73, I da Lei nº 9.504/1997 proíbe aos agentes públicos ceder ou usar, em benefício de candidato, partido político ou coligação, bens móveis ou imóveis pertencentes à administração pública, ressalvada a realização de convenção partidária.',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa C está correta. A cessão gratuita de prédios públicos a partidos para convenções partidárias prévias é a exceção expressa à vedação geral do art. 73, inciso I, da Lei 9.504/97.',
      base_legal: 'Art. 73, inciso I, da Lei nº 9.504/1997',
      pegadinha_da_fgv:
        'O candidato que memoriza apenas a proibição genérica de uso de bens públicos por campanhas esquece da ressalva textual trazida pela própria lei eleitoral autorizando convenções partidárias.',
    },
  },
  {
    id: 4520,
    id_questao: 'oab_fgv_45_el_20',
    number: 20,
    discipline: 'Direito Eleitoral',
    topic: 'Fundo Partidário - Aplicação e Prestação de Contas à Justiça Eleitoral',
    statement:
      'João, que acabara de assumir a função de tesoureiro do partido político Alfa, solicitou explicações ao(à) advogado(a) do partido a respeito dos cuidados que deveria ter na aplicação dos recursos oriundos do Fundo Especial de Assistência Financeira aos Partidos Políticos (Fundo Partidário), mais especificamente em relação à existência de plena liberdade valorativa do partido político na aplicação desses recursos e à necessidade, ou não, de prestação de contas.\n\nSobre a hipótese formulada, assinale a afirmativa correta.',
    options: [
      {
        id: 'A',
        text: 'Os recursos devem ser aplicados por Alfa, nas finalidades autorizadas em lei, sendo objeto de prestação de contas à Justiça Eleitoral, embora o referido Fundo receba tanto valores de origem pública como privada.',
      },
      {
        id: 'B',
        text: 'Os recursos recebidos por Alfa devem ser aplicados nas finalidades autorizadas em lei, sendo objeto de prestação de contas apenas ao seu órgão de direção nacional, embora o referido Fundo seja formado a partir das sobras da arrecadação da União.',
      },
      {
        id: 'C',
        text: 'Como Alfa tem personalidade jurídica de direito privado, pode aplicar livremente os recursos recebidos nas finalidades previstas em seu estatuto e deve prestar contas à Justiça Eleitoral, quando se comprometer a realizar um projeto de interesse público.',
      },
      {
        id: 'D',
        text: 'Os recursos devem ser aplicados por Alfa nas finalidades livremente autorizadas em seu estatuto, mas, como os valores remetidos ao referido Fundo são captados pela Justiça Eleitoral com as multas eleitorais e as dotações da União, deve haver prestação de contas ao Tribunal de Contas da União.',
      },
    ],
    correctOption: 'A',
    legalBasis: 'Arts. 32, 38 e 44 da Lei nº 9.096/1995 (Lei dos Partidos Políticos)',
    commentary:
      'Consoante a Lei dos Partidos Políticos (Lei 9.096/95), o Fundo Partidário é composto por recursos públicos (dotações orçamentárias) e privados (multas, doações). Sua destinação é vinculada às finalidades estritas previstas no Art. 44 da lei, e os partidos são obrigados a prestar contas anualmente perante a Justiça Eleitoral (Art. 32).',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa A está correta. O Fundo Partidário possui recursos vinculados por lei e sua prestação de contas é submetida exclusivamente ao escrutínio jurisdicional da Justiça Eleitoral, sendo constituído tanto de dotações orçamentárias como de penalidades e doações.',
      base_legal: 'Arts. 32, 38 e 44 da Lei nº 9.096/1995',
      pegadinha_da_fgv:
        'Apesar do TCU poder auditar repasses públicos aos fundos em nível macro, a prestação de contas dos partidos sobre o Fundo Partidário é privativa perante a Justiça Eleitoral, afastando o TCU (alternativa D) e a autonomia irrestrita estatutária (alternativa C).',
    },
  },
];
