import { Question } from '../types/oab';

export const questions_1_20: Question[] = [
  // 1-8: Ética Profissional
  {
    id: 1,
    id_questao: 'oab_fgv_41_et_01',
    number: 1,
    discipline: 'Ética Profissional',
    topic: 'Incompatibilidades e Impedimentos',
    statement: 'Lucas, advogado devidamente inscrito nos quadros da OAB, é nomeado para exercer cargo em comissão de Diretor-Geral da Secretaria Municipal de Saúde. Diante dessa nomeação, Lucas indaga você sobre a possibilidade de continuar advogando privativamente em causas cíveis contra particulares.',
    options: [
      { id: 'A', text: 'Poderá continuar advogando, pois o cargo não integra o Poder Judiciário nem a Segurança Pública.' },
      { id: 'B', text: 'Estará sujeito à incompatibilidade total com a advocacia, mesmo em causa própria, enquanto durar o exercício da função comissionada de chefia.' },
      { id: 'C', text: 'Estará apenas impedido de advogar contra a Fazenda Pública que o remunera, liberado para causas cíveis comuns.' },
      { id: 'D', text: 'Deverá apenas pedir licença temporária para causas perante os Juizados Especiais da Fazenda Pública.' }
    ],
    correctOption: 'B',
    legalBasis: 'Art. 28, inciso III e Art. 27 da Lei nº 8.906/94 (Estatuto da OAB - EAOAB).',
    commentary: 'O exercício de cargos de direção, chefia ou gerência em órgãos da administração pública direta ou indireta acarreta incompatibilidade absoluta com a advocacia, nos termos do art. 28, III, do EAOAB.',
    comentario_educativo: {
      analise_gabarito: 'A alternativa B é a correta. Funções comissionadas de Direção-Geral ou Chefia no âmbito da administração pública direta ou indireta impõem proibição total do exercício da advocacia (incompatibilidade absoluta), vedando inclusive a advocacia em causa própria ou contra particulares durante todo o exercício do cargo.',
      base_legal: 'Art. 28, inciso III e Art. 27 da Lei Federal nº 8.906/94 (Estatuto da Advocacia e da OAB).',
      pegadinha_da_fgv: 'A banca FGV tentou induzir o candidato ao erro propondo a Alternativa C, simulando a regra de mero impedimento (Art. 30, I do EAOAB - advogar contra a Fazenda que remunera). Todavia, ao especificar que o cargo comissionado é de Diretor-Geral (função de chefia/direção), incide taxativamente a incompatibilidade total do Art. 28, III.'
    },
    difficulty: 'Média',
    examOrigin: '41º Exame de Ordem Unificado (Banca FGV)'
  },
  {
    id: 2,
    number: 2,
    discipline: 'Ética Profissional',
    topic: 'Sociedade de Advogados',
    statement: 'Mariana e Sofia desejam constituir uma Sociedade Unipessoal de Advocacia cada uma e, concomitantemente, serem sócias fundadoras de uma Sociedade Pluripessoal de Advogados sediada no mesmo conselho seccional.',
    options: [
      { id: 'A', text: 'Nenhum advogado pode integrar mais de uma sociedade de advogados ou constituir mais de uma sociedade unipessoal com sede na mesma área territorial do respectivo Conselho Seccional.' },
      { id: 'B', text: 'É plenamente admitido, desde que as áreas de atuação profissional sejam distintas e não haja conflito de clientes.' },
      { id: 'C', text: 'Apenas a sociedade unipessoal é permitida no mesmo conselho seccional, vedando-se a pluripessoal simultânea.' },
      { id: 'D', text: 'É permitido desde que com prévia autorização unânime do Tribunal de Ética e Disciplina da OAB.' }
    ],
    correctOption: 'A',
    legalBasis: 'Art. 15, § 4º da Lei nº 8.906/94 (EAOAB).',
    commentary: 'Conforme art. 15, § 4º da Lei 8.906/94, nenhum advogado pode integrar mais de uma sociedade de advogados, constituir mais de uma sociedade unipessoal de advocacia, ou integrar, simultaneamente, uma sociedade de advogados e uma sociedade unipessoal de advocacia, com sede ou filial na mesma área territorial do respectivo Conselho Seccional.',
    difficulty: 'Fácil',
    examOrigin: '40º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 3,
    number: 3,
    discipline: 'Ética Profissional',
    topic: 'Honorários Advocatícios',
    statement: 'Cláudio foi contratado por Beatriz para ajuizar ação indenizatória com cláusula quota litis. No contrato, estipulou-se que os honorários de Cláudio corresponderiam a 60% do benefício econômico auferido por Beatriz na causa.',
    options: [
      { id: 'A', text: 'A cláusula é válida com base no princípio da autonomia privada das partes contratantes.' },
      { id: 'B', text: 'A cláusula é nula de pleno direito, devendo os honorários serem reduzidos a 20% independentemente da via judicial.' },
      { id: 'C', text: 'A cláusula quota litis é admitida excepcionalmente, porém os honorários contratuais somados aos de sucumbência não podem ser superiores às vantagens auferidas pelo cliente.' },
      { id: 'D', text: 'É vedada em qualquer hipótese a estipulação de honorários quota litis no ordenamento jurídico brasileiro.' }
    ],
    correctOption: 'C',
    legalBasis: 'Art. 50 do Código de Ética e Disciplina da OAB (CED).',
    commentary: 'O art. 50 do Código de Ética e Disciplina da OAB prevê que, na cláusula quota litis, os honorários devem ser necessariamente representados por pecúnia e, quando acrescidos dos honorários de sucumbência, não podem ultrapassar os benefícios econômicos auferidos pelo constituinte.',
    difficulty: 'Média',
    examOrigin: '39º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 4,
    number: 4,
    discipline: 'Ética Profissional',
    topic: 'Sigilo Profissional',
    statement: 'Em um processo penal, a advogada Patrícia é intimada pelo magistrado como testemunha em relação a fatos confidenciados por seu cliente no exercício de mandato já revogado.',
    options: [
      { id: 'A', text: 'Patrícia deve recusar-se a depor, pois o dever de sigilo profissional permanece mesmo após a extinção do mandato.' },
      { id: 'B', text: 'Patrícia é obrigada a depor, haja vista que a renúncia ou revogação extingue o dever de sigilo.' },
      { id: 'C', text: 'Patrícia poderá depor livremente caso o magistrado determine a quebra do segredo de justiça.' },
      { id: 'D', text: 'Patrícia só pode se recusar a depor se tiver prévia autorização da diretoria da Subseção da OAB.' }
    ],
    correctOption: 'A',
    legalBasis: 'Art. 7º, XIX do EAOAB e Arts. 35 a 38 do Código de Ética e Disciplina.',
    commentary: 'O sigilo profissional do advogado tem natureza de ordem pública e subsiste mesmo após a cessação do mandato, cumprindo-lhe recusar-se a depor como testemunha sobre fatos de que teve conhecimento em razão do exercício da profissão.',
    difficulty: 'Fácil',
    examOrigin: '41º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 5,
    number: 5,
    discipline: 'Ética Profissional',
    topic: 'Prerrogativas da Advocacia',
    statement: 'O advogado Roberto ingressa em uma repartição pública municipal e tem seu acesso negado à sala de atendimento ao público pelo vigilante, sob alegação de que Roberto não trajava terno e gravata.',
    options: [
      { id: 'A', text: 'O vigilante agiu corretamente, pois o uso de paletó é obrigatório em repartições públicas civis.' },
      { id: 'B', text: 'Constitui prerrogativa do advogado ingressar livremente em qualquer edifício ou recinto em que funcione repartição judicial ou serviço público onde deva praticar ato funcional.' },
      { id: 'C', text: 'O advogado só tem livre acesso aos prédios do Poder Judiciário, mas não do Poder Executivo.' },
      { id: 'D', text: 'A prerrogativa só subsiste quando o advogado estiver acompanhado de oficial de justiça.' }
    ],
    correctOption: 'B',
    legalBasis: 'Art. 7º, inciso VI, alínea c do Estatuto da OAB (Lei 8.906/94).',
    commentary: 'O art. 7º, VI, "c" da Lei 8.906/94 garante ao advogado ingressar livremente em qualquer edifício ou recinto em que funcione repartição judicial ou outro serviço público onde o advogado deva praticar ato ou colher informações úteis ao exercício da atividade profissional.',
    difficulty: 'Fácil',
    examOrigin: '38º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 6,
    number: 6,
    discipline: 'Ética Profissional',
    topic: 'Infrações Disciplinares',
    statement: 'O advogado Marcos reteve abusivamente autos de processo que retirou em carga por mais de 60 dias após a notificação formal para devolução pelo cartório judicial.',
    options: [
      { id: 'A', text: 'Comete mera infração administrativa perante o tribunal, não sujeita à sanção disciplinar pela OAB.' },
      { id: 'B', text: 'Pratica infração disciplinar punível originariamente com a sanção de suspensão do exercício profissional.' },
      { id: 'C', text: 'Pratica infração punível originariamente apenas com advertência reservada.' },
      { id: 'D', text: 'Aplica-se a exclusão automática dos quadros da OAB sem direito a contraditório.' }
    ],
    correctOption: 'B',
    legalBasis: 'Art. 34, XXII c/c Art. 37, I da Lei nº 8.906/94.',
    commentary: 'Reter, abusivamente, ou extraviar autos recebidos com vista ou em confiança constitui infração disciplinar prevista no art. 34, XXII da Lei 8.906/94, sancionada com a penalidade de suspensão nos moldes do art. 37, inciso I.',
    difficulty: 'Média',
    examOrigin: '40º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 7,
    number: 7,
    discipline: 'Ética Profissional',
    topic: 'Publicidade Profissional',
    statement: 'Um escritório de advocacia decide veicular anúncios patrocinados nas redes sociais utilizando linguagem persuasiva com fotos de maços de dinheiro e o slogan: "Garantimos o ganho da sua causa ou devolvemos seu dinheiro".',
    options: [
      { id: 'A', text: 'A conduta é regular, pois a publicidade na internet segue o princípio da livre iniciativa e marketing digital.' },
      { id: 'B', text: 'A publicidade profissional do advogado tem caráter meramente informativo e deve primar pela discrição e sobriedade, não podendo mercantilizar a profissão nem prometer resultados.' },
      { id: 'C', text: 'A promessa de resultado é permitida apenas em causas consumeristas.' },
      { id: 'D', text: 'A divulgação é legal desde que o escritório possua selo de qualidade emitido pelo Conselho Federal.' }
    ],
    correctOption: 'B',
    legalBasis: 'Art. 39 do CED e Provimento nº 205/2021 do Conselho Federal da OAB.',
    commentary: 'A publicidade profissional deve ter caráter meramente informativo e primar pela discrição e sobriedade, não podendo configurar captação de clientela ou mercantilização da profissão, sendo vedada a promessa de resultados expressos ou o uso de símbolos monetários.',
    difficulty: 'Fácil',
    examOrigin: '39º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 8,
    number: 8,
    discipline: 'Ética Profissional',
    topic: 'Renúncia ao Mandato',
    statement: 'A advogada Fernanda decide renunciar aos poderes que lhe foram outorgados por seu cliente Bruno em processo cível. Realizada a devida notificação comprobatória, indaga-se por quanto tempo Fernanda ainda deverá representar Bruno nos autos.',
    options: [
      { id: 'A', text: 'Durante os 10 (dez) dias seguintes à notificação da renúncia, salvo se for substituída antes desse prazo.' },
      { id: 'B', text: 'Cessa imediatamente qualquer responsabilidade no instante da juntada do aviso aos autos.' },
      { id: 'C', text: 'Durante 15 (quinze) dias úteis de acordo com os prazos gerais do CPC.' },
      { id: 'D', text: 'Até que o cliente constitua novo procurador, independentemente do tempo decorrido.' }
    ],
    correctOption: 'A',
    legalBasis: 'Art. 5º, § 3º da Lei nº 8.906/94 e Art. 112 do CPC.',
    commentary: 'O advogado que renunciar ao mandato continuará, durante os 10 (dez) dias seguintes à notificação da renúncia, a representar o mandante, salvo se for substituído antes do término desse prazo.',
    difficulty: 'Fácil',
    examOrigin: '41º Exame de Ordem Unificado (FGV)'
  },

  // 9-10: Filosofia do Direito
  {
    id: 9,
    number: 9,
    discipline: 'Filosofia do Direito',
    topic: 'Positivismo Jurídico e Hans Kelsen',
    statement: 'Na obra Teoria Pura do Direito, Hans Kelsen busca conferir rigor científico à ciência jurídica, isolando o Direito de elementos morais, políticos ou sociológicos. Segundo o autor, o fundamento último de validade da ordem jurídica repousa na:',
    options: [
      { id: 'A', text: 'Ideia metafísica de Justiça Universal e Direito Natural inscrita na consciência humana.' },
      { id: 'B', text: 'Norma Fundamental (Grundnorm), de natureza hipotética e pressuposta.' },
      { id: 'C', text: 'Vontade soberana do legislador concretizada pela força coercitiva policial.' },
      { id: 'D', text: 'Decisão judicial dotada de eficácia persuasiva consolidada pelos tribunais.' }
    ],
    correctOption: 'B',
    legalBasis: 'Hans Kelsen, Teoria Pura do Direito (Reine Rechtslehre).',
    commentary: 'Para Kelsen, a validade de uma norma apoia-se em outra norma superior, remontando à Constituição e, no ápice lógico-formal, à Norma Hipotética Fundamental (Grundnorm), que fecha o sistema piramidal positivista.',
    difficulty: 'Média',
    examOrigin: '41º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 10,
    number: 10,
    discipline: 'Filosofia do Direito',
    topic: 'Fórmula de Radbruch',
    statement: 'Após a Segunda Guerra Mundial, o jurista Gustav Radbruch propôs uma célebre formulação filosófica para resolver a tensão entre a segurança jurídica e a justiça material diante de leis manifestamente iníquas. Segundo a "Fórmula de Radbruch":',
    options: [
      { id: 'A', text: 'A lei formal emanada do Estado soberano sempre prevalece sobre juízos de valor morais, sob pena de anarquia.' },
      { id: 'B', text: 'A extrema injustiça não é Direito (lex injusta non est lex), cedendo a segurança jurídica perante a injustiça intolerável.' },
      { id: 'C', text: 'O Direito existe apenas quando reconhecido pelo costume reiterado da sociedade.' },
      { id: 'D', text: 'Nenhuma lei pode ser revogada sem prévio plebiscito popular universal.' }
    ],
    correctOption: 'B',
    legalBasis: 'Gustav Radbruch, Injustiça Legal e Direito Supralegal (1946).',
    commentary: 'A Fórmula de Radbruch estabelece que a segurança jurídica deve prevalecer sobre a justiça, a menos que a discrepância entre a lei positiva e a justiça alcance um nível tão insuportável que a lei, como "direito incorreto", deva ceder diante da justiça ("a injustiça extrema não é direito").',
    difficulty: 'Difícil',
    examOrigin: '39º Exame de Ordem Unificado (FGV)'
  },

  // 11-16: Direito Constitucional
  {
    id: 11,
    number: 11,
    discipline: 'Direito Constitucional',
    topic: 'Ação Direta de Inconstitucionalidade (ADI)',
    statement: 'A Mesa de uma Assembleia Legislativa estadual pretende ajuizar Ação Direta de Inconstitucionalidade (ADI) perante o Supremo Tribunal Federal para questionar lei federal que versa sobre normas gerais de licitação. À luz da jurisprudência do STF, a Mesa:',
    options: [
      { id: 'A', text: 'Possui legitimidade ativa universal, não necessitando demonstrar pertinência temática.' },
      { id: 'B', text: 'Possui legitimidade ativa especial, exigindo-se a demonstração de pertinência temática com as atribuições do Estado-membro.' },
      { id: 'C', text: 'Não possui legitimidade para ajuizar ADI perante o Supremo Tribunal Federal.' },
      { id: 'D', text: 'Só pode ajuizar a ADI em litisconsórcio ativo necessário com o Governador do Estado.' }
    ],
    correctOption: 'B',
    legalBasis: 'Art. 103, inciso IV da CF/88 e Jurisprudência pacífica do STF.',
    commentary: 'A Mesa da Assembleia Legislativa estadual é legitimada especial (art. 103, IV, CF/88), de modo que o STF condiciona a admissibilidade da ADI à demonstração de pertinência temática entre a norma impugnada e os interesses ou atribuições do respectivo ente federativo.',
    difficulty: 'Média',
    examOrigin: '41º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 12,
    number: 12,
    discipline: 'Direito Constitucional',
    topic: 'Processo Legislativo e Medidas Provisórias',
    statement: 'O Presidente da República editou Medida Provisória dispondo sobre a instituição e majoração de imposto sobre a renda e proventos de qualquer natureza. Sobre a vigência e eficácia dessa Medida Provisória:',
    options: [
      { id: 'A', text: 'É inconstitucional, pois Medida Provisória não pode dispor sobre matéria tributária de qualquer espécie.' },
      { id: 'B', text: 'É admitida, mas só produzirá efeitos no exercício financeiro seguinte se for convertida em lei até o último dia do exercício em que foi editada.' },
      { id: 'C', text: 'Produz efeitos imediatos a partir da data de sua publicação sem qualquer restrição orçamentária.' },
      { id: 'D', text: 'Exige quórum qualificado de três quintos no Congresso Nacional no prazo improrrogável de 30 dias.' }
    ],
    correctOption: 'B',
    legalBasis: 'Art. 62, § 2º da CRFB/88.',
    commentary: 'Nos termos do art. 62, § 2º da CF/88, medida provisória que implique instituição ou majoração de impostos só produzirá efeitos no exercício financeiro seguinte se houver sido convertida em lei até o último dia daquele em que foi editada, com as ressalvas previstas no art. 153 e 154.',
    difficulty: 'Média',
    examOrigin: '40º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 13,
    number: 13,
    discipline: 'Direito Constitucional',
    topic: 'Direitos e Garantias Fundamentais',
    statement: 'Durante a noite, agentes policiais ingressam sem autorização judicial e sem consentimento do morador na residência de Carlos, após constatarem que uma vítima de sequestro relâmpago pedia socorro desesperadamente no interior do imóvel.',
    options: [
      { id: 'A', text: 'A entrada foi ilícita, pois o domicílio é asilo inviolável da pessoa, exigindo-se sempre ordem judicial durante a noite.' },
      { id: 'B', text: 'A entrada foi lícita, pois a Constituição excepciona a inviolabilidade do domicílio em caso de flagrante delito, desastre ou para prestar socorro, a qualquer hora do dia ou da noite.' },
      { id: 'C', text: 'A entrada foi ilícita, porque flagrante delito noturno só autoriza ingresso se houver presença de autoridade policial com título de delegado.' },
      { id: 'D', text: 'Apenas a autoridade judicial pode determinar buscas no período entre 18h e 06h da manhã.' }
    ],
    correctOption: 'B',
    legalBasis: 'Art. 5º, inciso XI da Constituição da República de 1988.',
    commentary: 'A casa é asilo inviolável do indivíduo, ninguém nela podendo penetrar sem consentimento do morador, salvo em caso de flagrante delito ou desastre, ou para prestar socorro, ou, durante o dia, por determinação judicial (Art. 5º, XI, CF/88). Havendo pedido de socorro, o ingresso noturno é perfeitamente legítimo.',
    difficulty: 'Fácil',
    examOrigin: '38º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 14,
    number: 14,
    discipline: 'Direito Constitucional',
    topic: 'Controle Difuso de Constitucionalidade',
    statement: 'Um juiz de primeiro grau, ao apreciar uma causa cível ordinária, afasta a aplicação de uma lei estadual por considerá-la incompatível com o texto da Constituição Federal de 1988. Diante disso, pode-se afirmar que o magistrado operou:',
    options: [
      { id: 'A', text: 'Controle abstrato de constitucionalidade, com eficácia erga omnes e efeito vinculante.' },
      { id: 'B', text: 'Controle difuso de constitucionalidade incidental, com eficácia inter partes e efeito ex tunc como regra.' },
      { id: 'C', text: 'Usurpação de competência exclusiva do Tribunal de Justiça estadual sob a cláusula de reserva de plenário.' },
      { id: 'D', text: 'Controle concentrado prévio preventivo.' }
    ],
    correctOption: 'B',
    legalBasis: 'Art. 97 da CF/88 e doutrina constitucional sobre o controle difuso.',
    commentary: 'Qualquer juiz ou tribunal pode exercer o controle difuso incidental de constitucionalidade no caso concreto, gerando efeitos inter partes e via de regra retroativos (ex tunc). Como é órgão monocrático (juiz singular), não se aplica o art. 97 (reserva de plenário, exclusiva de órgãos fracionários de tribunais).',
    difficulty: 'Fácil',
    examOrigin: '37º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 15,
    number: 15,
    discipline: 'Direito Constitucional',
    topic: 'Repartição de Competências Federativas',
    statement: 'Determinado Município editou lei municipal estabelecendo que as agências bancárias situadas em seu território devem instalar banheiros públicos, bebedouros e tempo máximo de espera em filas para atendimento.',
    options: [
      { id: 'A', text: 'A lei é inconstitucional, pois a competência sobre o sistema financeiro e instituições bancárias é privativa da União.' },
      { id: 'B', text: 'A lei é constitucional, pois trata de matéria de interesse local e proteção ao consumidor, não interferindo no sistema financeiro nacional.' },
      { id: 'C', text: 'A lei é inconstitucional, cabendo unicamente aos Estados legislar sobre filas em cartórios e bancos.' },
      { id: 'D', text: 'A lei só teria validade se precedida de lei complementar autorizativa federal.' }
    ],
    correctOption: 'B',
    legalBasis: 'Súmula Vinculante nº 38 do STF e Art. 30, I da CF/88.',
    commentary: 'Segundo a Súmula Vinculante 38 do STF: "É competente o Município para fixar o horário de funcionamento de estabelecimento comercial" e pacífica jurisprudência reconhece competência municipal para disciplinar atendimento em agências bancárias (tempo de fila, banheiros, bebedouros) por versar sobre interesse local (art. 30, I, CF/88).',
    difficulty: 'Média',
    examOrigin: '39º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 16,
    number: 16,
    discipline: 'Direito Constitucional',
    topic: 'Remédios Constitucionais - Habeas Data',
    statement: 'Felipe formulou requerimento administrativo a órgão público federal para obter vista e cópia de anotações sobre sua pessoa constantes de banco de dados de caráter público, tendo o pedido sido expressamente indeferido pelo gestor da repartição. A ação constitucional cabível para tutelar a pretensão de Felipe é:',
    options: [
      { id: 'A', text: 'Mandado de Segurança, haja vista a recusa de autoridade pública caracterizar ilegalidade manifesta.' },
      { id: 'B', text: 'Habeas Data, pois visa assegurar o conhecimento de informações relativas à pessoa do impetrante constantes de registros ou bancos de dados de entidades governamentais.' },
      { id: 'C', text: 'Ação Popular, por ferir a moralidade da administração pública.' },
      { id: 'D', text: 'Arguição de Descumprimento de Preceito Fundamental.' }
    ],
    correctOption: 'B',
    legalBasis: 'Art. 5º, inciso LXXII, alínea a da CF/88 e Súmula 2 do STJ.',
    commentary: 'O Habeas Data (art. 5º, LXXII, "a", CF/88) serve expressamente para assegurar o conhecimento de registros relativos à pessoa do impetrante. Nos termos da Súmula 2 do STJ, não cabe habeas data se não houver recusa de informações por parte da autoridade administrativa (o que ocorreu na hipótese).',
    difficulty: 'Fácil',
    examOrigin: '40º Exame de Ordem Unificado (FGV)'
  },

  // 17-18: Direitos Humanos
  {
    id: 17,
    number: 17,
    discipline: 'Direitos Humanos',
    topic: 'Pacto de San José da Costa Rica',
    statement: 'O Supremo Tribunal Federal, ao julgar a prisão civil do depositário infiel, considerou que os tratados internacionais de direitos humanos ratificados pelo Brasil sem o rito do Art. 5º, § 3º da CF/88 possuem status normativo:',
    options: [
      { id: 'A', text: 'De lei ordinária comum.' },
      { id: 'B', text: 'Supralegal, situando-se abaixo da Constituição, mas acima de toda a legislação infraconstitucional.' },
      { id: 'C', text: 'De emenda constitucional automática em virtude da dignidade humana.' },
      { id: 'D', text: 'Meramente programático e sem aplicabilidade imediata no ordenamento nacional.' }
    ],
    correctOption: 'B',
    legalBasis: 'Súmula Vinculante nº 25 do STF e RE 466.343/SP.',
    commentary: 'Conforme tese fixada pelo STF no RE 466.343 e consolidada na Súmula Vinculante 25, os tratados internacionais de direitos humanos celebrados sem o rito especial do art. 5º, § 3º possuem natureza supralegal, paralisando a eficácia de leis ordinárias contrárias (como a prisão do depositário infiel).',
    difficulty: 'Fácil',
    examOrigin: '41º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 18,
    number: 18,
    discipline: 'Direitos Humanos',
    topic: 'Corte Interamericana de Direitos Humanos',
    statement: 'Em caso submetido ao Sistema Interamericano de Proteção aos Direitos Humanos, o Estado Brasileiro foi condenado pela Corte Interamericana de Direitos Humanos (Corte IDH) a indenizar vítimas e promover alterações legislativas internas. A sentença proferida pela Corte IDH:',
    options: [
      { id: 'A', text: 'Possui caráter meramente opinativo e desprovido de força vinculante para o Judiciário brasileiro.' },
      { id: 'B', text: 'Tem força vinculante e obrigatória para o Estado brasileiro, dispensando prévia homologação pelo STJ para a execução da parte pecuniária.' },
      { id: 'C', text: 'Exige referendo do Congresso Nacional com aprovação de dois terços das Casas para gerar qualquer dever de indenizar.' },
      { id: 'D', text: 'Pode ser desconsiderada pelo Poder Executivo mediante invocação da soberania absoluta.' }
    ],
    correctOption: 'B',
    legalBasis: 'Art. 68, itens 1 e 2 da Convenção Americana sobre Direitos Humanos (Pacto de San José).',
    commentary: 'O Brasil reconheceu expressamente a jurisdição contenciosa da Corte IDH (Decreto 4.463/2002). Nos termos do art. 68 da CADH, as sentenças da Corte têm força vinculante para os Estados partes, podendo a parte condenatória em indenização ser executada no país nos mesmos moldes das sentenças nacionais.',
    difficulty: 'Média',
    examOrigin: '39º Exame de Ordem Unificado (FGV)'
  },

  // 19-20: Direito Internacional
  {
    id: 19,
    number: 19,
    discipline: 'Direito Internacional',
    topic: 'Homologação de Sentença Estrangeira',
    statement: 'Um tribunal estrangeiro no Canadá proferiu sentença transitada em julgado decretando o divórcio consensual puro de um casal de brasileiros que residia naquele país. A sentença estrangeira de divórcio consensual puro:',
    options: [
      { id: 'A', text: 'Produz efeitos no Brasil de forma independente de homologação pelo Superior Tribunal de Justiça.' },
      { id: 'B', text: 'Exige indispensável e prévia homologação pelo Supremo Tribunal Federal.' },
      { id: 'C', text: 'Só produzirá efeitos após nova ação de divórcio ser ajuizada perante a Justiça Federal de primeiro grau.' },
      { id: 'D', text: 'Necessita obrigatoriamente de processo de exequatur no Superior Tribunal de Justiça.' }
    ],
    correctOption: 'A',
    legalBasis: 'Art. 961, § 5º do Código de Processo Civil (CPC/2015).',
    commentary: 'O art. 961, § 5º do CPC prevê expressamente que a sentença estrangeira de divórcio consensual simples ou puro produz efeitos no Brasil independentemente de homologação pelo Superior Tribunal de Justiça.',
    difficulty: 'Média',
    examOrigin: '40º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 20,
    number: 20,
    discipline: 'Direito Internacional',
    topic: 'Extradição e Nacionalidade',
    statement: 'Pierre, cidadão francês naturalizado brasileiro há 8 anos, cometeu crime comum de homicídio doloso em Paris antes de adquirir a nacionalidade brasileira, tendo em seguida fixado residência no Brasil. O governo da França formula pedido de extradição ao Brasil. De acordo com a Constituição Federal:',
    options: [
      { id: 'A', text: 'A extradição de Pierre não poderá ser concedida, pois nenhum brasileiro, nato ou naturalizado, pode ser extraditado.' },
      { id: 'B', text: 'A extradição poderá ser concedida, pois a vedação absoluta alcança apenas o brasileiro nato; o naturalizado pode ser extraditado em caso de crime comum praticado antes da naturalização.' },
      { id: 'C', text: 'A extradição só seria permitida se envolvesse tráfico ilícito de entorpecentes cometido após a naturalização.' },
      { id: 'D', text: 'Pierre só poderá ser extraditado se renunciar expressamente à sua nacionalidade brasileira perante o Ministério da Justiça.' }
    ],
    correctOption: 'B',
    legalBasis: 'Art. 5º, inciso LI da Constituição Federal de 1988.',
    commentary: 'Nenhum brasileiro será extraditado, salvo o naturalizado, em caso de crime comum, praticado antes da naturalização, ou de comprovado envolvimento em tráfico ilícito de entorpecentes e drogas afins, na forma da lei (Art. 5º, LI, CF/88).',
    difficulty: 'Fácil',
    examOrigin: '38º Exame de Ordem Unificado (FGV)'
  }
];
