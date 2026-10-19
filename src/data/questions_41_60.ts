import { Question } from '../types/oab';

export const questions_41_60: Question[] = [
  // 41-42: ECA
  {
    id: 41,
    number: 41,
    discipline: 'Estatuto da Criança e do Adolescente (ECA)',
    topic: 'Medidas Socioeducativas e Internação',
    statement: 'Matheus, adolescente de 16 anos, cometeu ato infracional análogo ao crime de roubo circunstanciado pelo emprego de arma de fogo e concurso de pessoas. Sobre a medida socioeducativa de internação prevista no ECA:',
    options: [
      { id: 'A', text: 'Não pode ser aplicada a atos infracionais análogos ao roubo por ausência de morte da vítima.' },
      { id: 'B', text: 'Pode ser aplicada, pois o ato infracional foi praticado mediante grave ameaça ou violência à pessoa, submetendo-se a prazo indeterminado, com reavaliação periódica no máximo a cada 6 meses e limite improrrogável de 3 anos.' },
      { id: 'C', text: 'Tem prazo fixo mínimo de 5 anos improrrogáveis.' },
      { id: 'D', text: 'Pode se estender até que o infrator complete 25 anos de idade.' }
    ],
    correctOption: 'B',
    legalBasis: 'Art. 121, §§ 2º e 3º c/c Art. 122, inciso I do Estatuto da Criança e do Adolescente (Lei 8.069/90).',
    commentary: 'A internação é medida extrema e só pode ser aplicada nas hipóteses taxativas do art. 122 do ECA, dentre as quais o ato praticado mediante grave ameaça ou violência a pessoa (inciso I). Seu período máximo é de 3 anos, com manutenção obrigatória de reavaliação a cada 6 meses (art. 121, § 2º e § 3º). Aos 21 anos opera-se a liberação compulsória.',
    difficulty: 'Média',
    examOrigin: '41º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 42,
    number: 42,
    discipline: 'Estatuto da Criança e do Adolescente (ECA)',
    topic: 'Adoção e Requisitos',
    statement: 'Guilherme, solteiro, de 28 anos de idade, pretende adotar legalmente Lucas, criança de 10 anos de idade acolhida institucionalmente. Guilherme indaga sobre os requisitos de idade estabelecidos pelo ECA.',
    options: [
      { id: 'A', text: 'A adoção só é permitida a casais unidos por matrimônio ou união estável.' },
      { id: 'B', text: 'Guilherme atende aos requisitos legais, pois a pessoa maior de 18 anos pode adotar, independentemente do estado civil, desde que seja pelo menos 16 anos mais velha do que o adotando.' },
      { id: 'C', text: 'Exige-se diferença de idade mínima de 20 anos entre adotante e adotando.' },
      { id: 'D', text: 'A idade mínima do adotante é de 35 anos em qualquer circunstância.' }
    ],
    correctOption: 'B',
    legalBasis: 'Art. 42, caput e § 3º da Lei nº 8.069/90 (ECA).',
    commentary: 'Podem adotar os maiores de 18 anos, independentemente do estado civil (art. 42, caput, ECA), sendo que o adotante há de ser, pelo menos, 16 anos mais velho do que o adotando (art. 42, § 3º, ECA). Guilherme tem 28 anos e Lucas tem 10 anos (diferença de 18 anos, superando os 16 exigidos).',
    difficulty: 'Fácil',
    examOrigin: '40º Exame de Ordem Unificado (FGV)'
  },

  // 43-44: Direito do Consumidor
  {
    id: 43,
    number: 43,
    discipline: 'Direito do Consumidor',
    topic: 'Direito de Arrependimento no Comércio Eletrônico',
    statement: 'Carla adquiriu pela internet um aparelho celular no site oficial de uma loja de departamentos. Ao receber o produto em sua residência, não gostou da cor e decidiu desistir da compra 4 dias após a entrega, sem que o aparelho apresentasse qualquer defeito.',
    options: [
      { id: 'A', text: 'Carla não pode desistir da compra, pois o aparelho não apresenta vício de fabricação.' },
      { id: 'B', text: 'Carla tem direito potestativo de desistir da compra no prazo de 7 (sete) dias a contar do recebimento do produto, com devolução integral e imediata dos valores pagos, inclusive frete.' },
      { id: 'C', text: 'A desistência em compras online sujeita-se à retenção de multa de 20% pela loja virtual.' },
      { id: 'D', text: 'O direito de arrependimento só existe para produtos alimentícios perecíveis.' }
    ],
    correctOption: 'B',
    legalBasis: 'Art. 49 e parágrafo único do Código de Defesa do Consumidor (Lei nº 8.078/90).',
    commentary: 'O consumidor pode desistir do contrato, no prazo de 7 dias a contar de sua assinatura ou do ato de recebimento do produto ou serviço, sempre que a contratação de fornecimento de produtos e serviços ocorrer fora do estabelecimento comercial, especialmente por telefone ou a domicílio/internet (art. 49, CDC). Os valores devolvidos incluem eventuais despesas postais.',
    difficulty: 'Fácil',
    examOrigin: '41º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 44,
    number: 44,
    discipline: 'Direito do Consumidor',
    topic: 'Responsabilidade pelo Fato do Produto (Acidente de Consumo)',
    statement: 'Durante o almoço de domingo, a panela de pressão de Marcelo, recém-comprada e utilizada estritamente de acordo com o manual, explodiu repentinamente devido a defeito estrutural na válvula de segurança, ferindo o braço do consumidor. O prazo para Marcelo pleitear a reparação de seus danos físicos é de:',
    options: [
      { id: 'A', text: '30 dias contados da explosão.' },
      { id: 'B', text: '90 dias em se tratando de produto durável.' },
      { id: 'C', text: '5 (cinco) anos, por tratar-se de pretensão à reparação pelos danos causados por fato do produto (acidente de consumo).' },
      { id: 'D', text: '3 anos com base no prazo geral do Código Civil.' }
    ],
    correctOption: 'C',
    legalBasis: 'Art. 27 do Código de Defesa do Consumidor.',
    commentary: 'Prescreve em 5 (cinco) anos a pretensão à reparação pelos danos causados por fato do produto ou do serviço prevista na Seção II do CDC, iniciando-se a contagem do prazo a partir do conhecimento do dano e de sua autoria (art. 27 do CDC). Acidentes que ferem a integridade física ou patrimonial do consumidor configuram fato do produto.',
    difficulty: 'Fácil',
    examOrigin: '39º Exame de Ordem Unificado (FGV)'
  },

  // 45-49: Direito Empresarial
  {
    id: 45,
    number: 45,
    discipline: 'Direito Empresarial',
    topic: 'Títulos de Crédito - Aval e Fiança',
    statement: 'Em uma Nota Promissória de valor líquido e certo, Tiago assina no anverso do título apondo apenas sua assinatura sem nenhuma outra expressão. Posteriormente, o emitente deixa de pagar o valor ao beneficiário na data aprazada. A aposição da assinatura de Tiago configura:',
    options: [
      { id: 'A', text: 'Fiança civil, com benefício de ordem obrigatório.' },
      { id: 'B', text: 'Aval em branco, obrigação cambial autônoma e solidária de garantia do pagamento do título.' },
      { id: 'C', text: 'Endosso translativo, transferindo a titularidade do título para terceiro.' },
      { id: 'D', text: 'Ato nulo desprovido de qualquer eficácia cambial.' }
    ],
    correctOption: 'B',
    legalBasis: 'Arts. 897 e 898 do Código Civil c/c Arts. 31 e 32 da Lei Uniforme de Genebra (Dec. 57.663/66).',
    commentary: 'A simples assinatura do próprio punho do avalista no anverso do título de crédito, sem qualquer menção expressa, constitui o chamado aval em branco (art. 31 da LUG e art. 898 do CC). O aval é autônomo, não outorgando benefício de ordem ao garantidor.',
    difficulty: 'Média',
    examOrigin: '41º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 46,
    number: 46,
    discipline: 'Direito Empresarial',
    topic: 'Sociedade Limitada - Cessão de Quotas',
    statement: 'Em uma sociedade limitada cujo contrato social é silente quanto à cessão de quotas entre terceiros, o sócio Rogério pretende ceder a totalidade de suas quotas sociais a um estranho ao quadro societário. Para tanto, é necessário:',
    options: [
      { id: 'A', text: 'A concordância unânime de todos os demais sócios.' },
      { id: 'B', text: 'A anuência de sócios que representem mais de um quarto do capital social.' },
      { id: 'C', text: 'A não oposição de titulares de mais de um quarto do capital social.' },
      { id: 'D', text: 'Apenas a publicação de edital em diário oficial sem oposição de credores.' }
    ],
    correctOption: 'C',
    legalBasis: 'Art. 1.057, caput, do Código Civil de 2002.',
    commentary: 'Na omissão do contrato, o sócio pode ceder sua quota, total ou parcialmente, a quem seja sócio, independentemente de audiência dos outros, ou a estranho, se não houver oposição de titulares de mais de um quarto do capital social (art. 1.057, CC).',
    difficulty: 'Média',
    examOrigin: '40º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 47,
    number: 47,
    discipline: 'Direito Empresarial',
    topic: 'Recuperação Judicial (Lei 11.101/2005)',
    statement: 'Uma sociedade empresária em crise financeira pretende ingressar com pedido de recuperação judicial. Dentre os créditos existentes, figuram créditos trabalhistas, créditos com garantia real e créditos de credor titular da posição de proprietário fiduciário de bem móvel (alienação fiduciária). Não se submete aos efeitos da recuperação judicial:',
    options: [
      { id: 'A', text: 'O crédito com garantia real de hipoteca.' },
      { id: 'B', text: 'O crédito derivado da legislação do trabalho vencido até a data do pedido.' },
      { id: 'C', text: 'O credor titular da posição de proprietário fiduciário de bem móvel ou imóvel (trava bancária/alienação fiduciária).' },
      { id: 'D', text: 'Os créditos quirografários fornecedores de insumos.' }
    ],
    correctOption: 'C',
    legalBasis: 'Art. 49, § 3º da Lei nº 11.101/2005 (Lei de Falências e Recuperação de Empresas).',
    commentary: 'Tratando-se de credor titular da posição de proprietário fiduciário de bem móvel ou imóvel, de arrendador mercantil, de proprietário ou promitente vendedor de imóvel cujos contratos decorram com pacto adjetivo de irrevogabilidade, seu crédito não se submeterá aos efeitos da recuperação judicial (art. 49, § 3º, Lei 11.101/2005).',
    difficulty: 'Média',
    examOrigin: '39º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 48,
    number: 48,
    discipline: 'Direito Empresarial',
    topic: 'Propriedade Industrial - Marcas e Patentes',
    statement: 'Um inventor desenvolveu um novo dispositivo de segurança veicular dotado de novidade, atividade inventiva e aplicação industrial. De acordo com a Lei de Propriedade Industrial (Lei 9.279/96), o prazo de vigência da patente de invenção é de:',
    options: [
      { id: 'A', text: '10 anos contados da data da concessão.' },
      { id: 'B', text: '15 anos contados da data do primeiro uso comercial.' },
      { id: 'C', text: '20 (vinte) anos contados a partir da data de depósito do pedido perante o INPI.' },
      { id: 'D', text: 'Imprescritível enquanto mantido o pagamento da anuidade.' }
    ],
    correctOption: 'C',
    legalBasis: 'Art. 40 da Lei nº 9.279/96 (LPI) e ADI 5.529/STF.',
    commentary: 'A patente de invenção vigorará pelo prazo de 20 (vinte) anos a contar da data de depósito (art. 40 da Lei 9.279/96). O STF declarou inconstitucional o antigo parágrafo único que previa prazo residual contado da concessão na ADI 5.529.',
    difficulty: 'Fácil',
    examOrigin: '40º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 49,
    number: 49,
    discipline: 'Direito Empresarial',
    topic: 'Estabelecimento Empresarial e Trespasse',
    statement: 'Fábio alienou seu estabelecimento empresarial (trespasse) para Gabriel. O contrato não continha cláusula dispondo sobre concorrência no mesmo ramo comercial e geográfica. Segundo o Código Civil:',
    options: [
      { id: 'A', text: 'Fábio pode concorrer imediatamente e no mesmo quarteirão com base na livre concorrência irrestrita.' },
      { id: 'B', text: 'Não havendo autorização expressa, o alienante não pode fazer concorrência ao adquirente nos 5 (cinco) anos subsequentes à transferência.' },
      { id: 'C', text: 'A proibição de concorrência é perpétua e inegociável.' },
      { id: 'D', text: 'A concorrência só é vedada pelo prazo de 1 ano contados do registro na Junta Comercial.' }
    ],
    correctOption: 'B',
    legalBasis: 'Art. 1.147 do Código Civil de 2002.',
    commentary: 'O art. 1.147 do CC estipula que, não havendo autorização expressa, o alienante do estabelecimento não pode fazer concorrência ao adquirente nos cinco anos subsequentes à transferência.',
    difficulty: 'Fácil',
    examOrigin: '38º Exame de Ordem Unificado (FGV)'
  },

  // 50-55: Direito Processual Civil
  {
    id: 50,
    number: 50,
    discipline: 'Direito Processual Civil',
    topic: 'Agravo de Instrumento e Rol do Art. 1.015 do CPC',
    statement: 'Em sede de ação de cobrança, o magistrado de primeiro grau profere decisão interlocutória rejeitando a alegação de incompetência absoluta formulada pelo réu em preliminar de contestação. O réu deseja impugnar essa decisão imediatamente.',
    options: [
      { id: 'A', text: 'Cabe apelação imediata com efeito suspensivo automático.' },
      { id: 'B', text: 'O rol do art. 1.015 do CPC é de taxatividade mitigada, admitindo a interposição de agravo de instrumento quando verificada a urgência decorrente da inutilidade do julgamento da questão em apelação (Tema 988 do STJ).' },
      { id: 'C', text: 'Não cabe nenhum recurso em hipótese alguma no processo brasileiro contemporâneo.' },
      { id: 'D', text: 'A matéria só pode ser levada ao tribunal por meio de Reclamação Constitucional perante o STF.' }
    ],
    correctOption: 'B',
    legalBasis: 'Tema Repetitivo 988 do STJ e Art. 1.015 do CPC.',
    commentary: 'A Corte Especial do STJ fixou a tese da "taxatividade mitigada" do art. 1.015 do CPC (Tema 988): é cabível agravo de instrumento fora das hipóteses expressas quando comprovada a urgência decorrente da inutilidade do julgamento em sede de preliminar de apelação, admitindo-se especificamente para decisões de incompetência para evitar atos processuais inúteis perante juízo incompetente.',
    difficulty: 'Média',
    examOrigin: '41º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 51,
    number: 51,
    discipline: 'Direito Processual Civil',
    topic: 'Tutela Provisória de Urgência',
    statement: 'A requerente ajuíza pedido de tutela de urgência antecipada requerida em caráter antecedente, com receio de perecimento de direito à saúde. Concedida a tutela pelo juiz, a parte ré não interpôs o respectivo agravo de instrumento nem qualquer recurso no prazo legal. Diante da inércia do réu:',
    options: [
      { id: 'A', text: 'O processo é extinto com resolução do mérito e formação de coisa julgada material plena.' },
      { id: 'B', text: 'A tutela antecipada torna-se estável e o processo é extinto sem resolução do mérito, cabendo a qualquer das partes pleitear sua revisão ou invalidação por ação autônoma em até 2 anos.' },
      { id: 'C', text: 'A tutela é revogada de pleno direito por falta de contraditório regular.' },
      { id: 'D', text: 'O autor deve ajuizar ação rescisória para manter os efeitos da decisão.' }
    ],
    correctOption: 'B',
    legalBasis: 'Art. 304, §§ 1º, 2º e 5º do Código de Processo Civil.',
    commentary: 'O art. 304 do CPC estabelece a estabilização da tutela antecedente quando não interposto o respectivo recurso. O processo é extinto sem formar coisa julgada material (§ 6º), podendo a tutela ser revista ou reformada por ação própria ajuizada no prazo decadencial de 2 anos (§ 5º).',
    difficulty: 'Média',
    examOrigin: '40º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 52,
    number: 52,
    discipline: 'Direito Processual Civil',
    topic: 'Contestação e Reconvenção',
    statement: 'Em ação de indenização cível, o réu, além de rebater os pedidos autorais, deseja formular pedido contra o autor visando à condenação deste em perdas e danos conexos com os fundamentos da defesa. Segundo o CPC/2015, a reconvenção:',
    options: [
      { id: 'A', text: 'Deve ser proposta em peça autônoma e apensa aos autos principais, sob pena de preclusão.' },
      { id: 'B', text: 'Pode ser proposta na própria peça da contestação, sendo lícito ao réu propô-la mesmo que não conteste a ação principal.' },
      { id: 'C', text: 'Exige prévia caução em dinheiro depositada em juízo.' },
      { id: 'D', text: 'Só é admitida se o valor do pedido reconvencional for inferior ao valor da causa principal.' }
    ],
    correctOption: 'B',
    legalBasis: 'Art. 343, caput e § 6º do Código de Processo Civil.',
    commentary: 'O CPC/2015 unificou os atos em prol da celeridade processual: é lícito ao réu propor reconvenção na própria contestação (art. 343). O § 6º do mesmo dispositivo prevê expressamente que o réu pode propor reconvenção independentemente de oferecer contestação.',
    difficulty: 'Fácil',
    examOrigin: '39º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 53,
    number: 53,
    discipline: 'Direito Processual Civil',
    topic: 'Cumprimento de Sentença e Impugnação',
    statement: 'Intimado na fase de cumprimento de sentença condenatória de quantia certa para pagar o débito em 15 (quinze) dias úteis, o devedor não realiza o pagamento voluntário nem deposita o valor. Consequentemente:',
    options: [
      { id: 'A', text: 'O débito é acrescido de multa de 10% (dez por cento) e, também, de honorários de advogado de 10% (dez por cento).' },
      { id: 'B', text: 'O juiz determinará a prisão civil do executado pelo prazo de 3 meses.' },
      { id: 'C', text: 'Aplica-se apenas a cobrança de juros de mora legais sem qualquer acréscimo de honorários.' },
      { id: 'D', text: 'O exequente deve ajuizar nova ação executiva autônoma com petição inicial completa.' }
    ],
    correctOption: 'A',
    legalBasis: 'Art. 523, § 1º do Código de Processo Civil.',
    commentary: 'Não ocorrendo pagamento voluntário no prazo do caput (15 dias), o débito será acrescido de multa de dez por cento e, também, de honorários de advogado de dez por cento (art. 523, § 1º do CPC).',
    difficulty: 'Fácil',
    examOrigin: '41º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 54,
    number: 54,
    discipline: 'Direito Processual Civil',
    topic: 'Julgamento Conforme o Estado do Processo e Julgamento Parcial do Mérito',
    statement: 'Em ação que veicula dois pedidos cumulados (restituição de valores pagos e indenização por dano moral), o juiz constata que o primeiro pedido já se encontra maduro para julgamento inconteste documentalmente, ao passo que o dano moral depende de perícia e depoimento testemunhal. O juiz poderá:',
    options: [
      { id: 'A', text: 'Decidir parcialmente o mérito acolhendo o primeiro pedido por decisão interlocutória impugnável por agravo de instrumento.' },
      { id: 'B', text: 'Apenas julgar a causa conjuntamente ao final de toda a instrução, sendo vedado o fracionamento do julgamento de mérito.' },
      { id: 'C', text: 'Extinguir o processo sem julgamento de mérito para que o autor divida em duas ações distintas.' },
      { id: 'D', text: 'Proferir sentença definitiva e encaminhar os autos ao tribunal de justiça imediatamente.' }
    ],
    correctOption: 'A',
    legalBasis: 'Art. 356, inciso II e § 5º do Código de Processo Civil.',
    commentary: 'O art. 356 do CPC autoriza o Julgamento Antecipado Parcial do Mérito quando um ou mais pedidos mostrarem-se incontroversos ou estiverem em condições de imediato julgamento. Essa decisão tem natureza interlocutória e é atacável via agravo de instrumento (§ 5º).',
    difficulty: 'Média',
    examOrigin: '38º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 55,
    number: 55,
    discipline: 'Direito Processual Civil',
    topic: 'Recurso Especial e Recurso Extraordinário',
    statement: 'Contra acórdão unânime proferido por Tribunal de Justiça estadual que contrariou expressamente texto de tratado internacional e de lei federal, a parte interessada que prequestionou a matéria em sede recursal ordinária deve interpor:',
    options: [
      { id: 'A', text: 'Recurso Extraordinário ao Supremo Tribunal Federal.' },
      { id: 'B', text: 'Recurso Especial endereçado ao Presidente ou Vice-Presidente do tribunal recorrido, para julgamento pelo Superior Tribunal de Justiça.' },
      { id: 'C', text: 'Embargos Infringentes perante a Câmara julgadora.' },
      { id: 'D', text: 'Mandado de Segurança originário no STJ.' }
    ],
    correctOption: 'B',
    legalBasis: 'Art. 105, inciso III, alínea a da Constituição Federal de 1988.',
    commentary: 'Compete ao Superior Tribunal de Justiça julgar, em Recurso Especial, as causas decididas em única ou última instância pelos Tribunais Regionais Federais ou pelos Tribunais dos Estados, quando a decisão recorrida contrariar tratado ou lei federal, ou negar-lhes vigência (Art. 105, III, a, CF/88).',
    difficulty: 'Fácil',
    examOrigin: '40º Exame de Ordem Unificado (FGV)'
  },

  // 56-60: Direito Penal
  {
    id: 56,
    number: 56,
    discipline: 'Direito Penal',
    topic: 'Aplicação da Lei Penal no Tempo - Abolitio Criminis e Novatio Legis in Melius',
    statement: 'Durante a execução penal da pena privativa de liberdade imposta a Ricardo por determinado fato tipificado em lei, entra em vigor nova legislação que deixa de considerar o fato como infração penal. Diante disso:',
    options: [
      { id: 'A', text: 'A pena deve continuar sendo cumprida por força da coisa julgada material e segurança jurídica.' },
      { id: 'B', text: 'Ocorre a abolitio criminis, cessando imediatamente a execução e os efeitos penais da sentença condenatória.' },
      { id: 'C', text: 'A pena privativa de liberdade é convertida obrigatoriamente em pena de multa de valor duplicado.' },
      { id: 'D', text: 'O apenado só será solto se o Ministério Público anuir com o indulto presidencial.' }
    ],
    correctOption: 'B',
    legalBasis: 'Art. 2º, caput do Código Penal e Art. 5º, XL da Constituição Federal.',
    commentary: 'Ninguém pode ser punido por fato que lei posterior deixa de considerar crime, cessando em virtude dela a execução e os efeitos penais da sentença condenatória (art. 2º, caput, CP). A lei penal não retroagirá, salvo para beneficiar o réu (art. 5º, XL, CF).',
    difficulty: 'Fácil',
    examOrigin: '41º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 57,
    number: 57,
    discipline: 'Direito Penal',
    topic: 'Teoria do Crime - Legítima Defesa',
    statement: 'Wagner é surpreendido em sua residência durante a madrugada por um assaltante que aponta contra ele uma arma de fogo e anuncia que irá matá-lo. Para proteger sua própria vida, Wagner utiliza um revólver devidamente registrado e efetua um único disparo certeiro no agressor, neutralizando o ataque.',
    options: [
      { id: 'A', text: 'Wagner responderá por homicídio culposo com perdão judicial obrigatório.' },
      { id: 'B', text: 'Wagner agiu acobertado pela excludente de ilicitude da legítima defesa real, repelindo injusta agressão, atual, a direito próprio, com o uso moderado dos meios necessários.' },
      { id: 'C', text: 'A conduta configura estrito cumprimento do dever legal.' },
      { id: 'D', text: 'Há excesso punível doloso pelo fato de a vítima ter falecido no local.' }
    ],
    correctOption: 'B',
    legalBasis: 'Arts. 23, II e 25 do Código Penal.',
    commentary: 'Entende-se em legítima defesa quem, usando moderadamente dos meios necessários, repele injusta agressão, atual ou iminente, a direito seu ou de outrem (art. 25, CP). Exclui a ilicitude da conduta conforme o art. 23, II.',
    difficulty: 'Fácil',
    examOrigin: '40º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 58,
    number: 58,
    discipline: 'Direito Penal',
    topic: 'Crimes Contra o Patrimônio - Furto Qualificado vs. Estelionato',
    statement: 'Felipe, passando-se por técnico de informática credenciado e trajando crachá falso, engana uma idosa na porta de uma agência bancária e a convence a entregar voluntariamente seu cartão magnético com a senha digitada em um papel, subtraindo todo o saldo bancário. A conduta de Felipe tipifica crime de:',
    options: [
      { id: 'A', text: 'Apropriação indébita com causa de aumento.' },
      { id: 'B', text: 'Estelionato, pois obteve para si vantagem ilícita, em prejuízo alheio, induzindo ou mantendo a vítima em erro mediante artifício ou ardil.' },
      { id: 'C', text: 'Furto qualificado mediante fraude apenas.' },
      { id: 'D', text: 'Extorsão mediante sequestro virtual.' }
    ],
    correctOption: 'B',
    legalBasis: 'Art. 171, caput do Código Penal.',
    commentary: 'No estelionato (art. 171, CP), a fraude é empregada como meio para que a própria vítima, iludida pelo ardil, entregue voluntariamente o bem ou vantagem ao infrator. No furto mediante fraude, a fraude serve apenas para diminuir a vigilância da vítima e subtrair o bem às escondidas.',
    difficulty: 'Média',
    examOrigin: '39º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 59,
    number: 59,
    discipline: 'Direito Penal',
    topic: 'Concurso de Pessoas e Cooperação Dolosamente Distinta',
    statement: 'André combinou com Bruno a prática de um crime de furto simples em uma residência durante a ausência dos moradores. Durante a execução do plano, André permaneceu na calçada vigiando, quando Bruno, dentro do imóvel, percebeu que a dona da casa havia retornado, e, sem consentimento ou prévia combinação com André, resolveu estuprá-la. De acordo com o Código Penal:',
    options: [
      { id: 'A', text: 'André responde solidariamente pelo estupro consumado em razão da unidade do crime no concurso de pessoas.' },
      { id: 'B', text: 'Se a participação foi dolosamente distinta, aplica-se a André a pena do crime que quis participar (furto), aumentada até a metade se o resultado mais grave era previsível.' },
      { id: 'C', text: 'Ambos respondem apenas por invasão de domicílio qualificada.' },
      { id: 'D', text: 'André fica isento de qualquer sanção criminal por ausência de dolo.' }
    ],
    correctOption: 'B',
    legalBasis: 'Art. 29, § 2º do Código Penal (Cooperação Dolosamente Distinta).',
    commentary: 'O art. 29, § 2º do Código Penal preceitua que: "Se algum dos concorrentes quis participar de crime menos grave, ser-lhe-á aplicada a pena deste; essa pena será aumentada até metade, na hipótese de ter sido previsível o resultado mais grave". Trata-se do instituto da cooperação dolosamente distinta ou desvio subjetivo de conduta.',
    difficulty: 'Média',
    examOrigin: '38º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 60,
    number: 60,
    discipline: 'Direito Penal',
    topic: 'Crimes Contra a Administração Pública - Peculato',
    statement: 'Um servidor público estadual, em razão do cargo de escrivão que ocupa em delegacia de polícia, apropria-se indevidamente de um notebook apreendido em inquérito que estava sob sua guarda funcional para utilizá-lo em sua residência particular. O crime praticado é:',
    options: [
      { id: 'A', text: 'Concussão.' },
      { id: 'B', text: 'Prevaricação imprópria.' },
      { id: 'C', text: 'Peculato-apropriação (Art. 312, caput, primeira parte, do Código Penal).' },
      { id: 'D', text: 'Corrupção passiva privilegiada.' }
    ],
    correctOption: 'C',
    legalBasis: 'Art. 312, caput do Código Penal.',
    commentary: 'O art. 312, caput, do CP tipifica o peculato: "Apropriar-se o funcionário público de dinheiro, valor ou qualquer outro bem móvel, público ou particular, de que tem a posse em razão do cargo, ou desviá-lo, em proveito próprio ou alheio".',
    difficulty: 'Fácil',
    examOrigin: '41º Exame de Ordem Unificado (FGV)'
  }
];
