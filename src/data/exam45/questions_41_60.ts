import { Question } from '../../types/oab';

export const exam45_questions_41_60: Question[] = [
  // --- DIREITO CIVIL - Continuação / LGPD (Q41 a Q42) ---
  {
    id: 4541,
    id_questao: 'oab_fgv_45_cv_41',
    number: 41,
    discipline: 'Direito Civil',
    topic: 'Proteção de Dados Pessoais - LGPD e Dados Sensíveis de Saúde',
    statement:
      'A Farmácia Vida+, participante de um programa de descontos vinculado à operadora de planos de saúde MedSaúde S.A., compartilhou com a operadora informações detalhadas sobre as compras de seus clientes, incluindo medicamentos adquiridos, frequência das compras e histórico de uso de fármacos. Esse compartilhamento foi realizado sem o consentimento explícito dos clientes, sob a justificativa de que a MedSaúde S.A. poderia utilizar os dados para oferecer benefícios personalizados e otimizar seus serviços de saúde.\n\nAo tomar conhecimento da prática, Cristina, uma das clientes da farmácia, procurou você, como advogado(a) para emitir parecer sobre o caso, especialmente sobre a configuração da violação de algum direito.\n\nDiante dessa situação e com base na Lei Geral de Proteção de Dados (LGPD), assinale a opção que apresenta, corretamente, o parecer emitido.',
    options: [
      {
        id: 'A',
        text: 'O compartilhamento de dados foi legal, pois tanto a farmácia como a operadora de saúde são autorizadas a tratar os dados pessoais de saúde para a execução dos seus contratos.',
      },
      {
        id: 'B',
        text: 'A Farmácia Vida+ violou a LGPD ao compartilhar dados pessoais sensíveis sem o consentimento dos titulares, estando sujeita a sanções e obrigada a eliminar os dados compartilhados.',
      },
      {
        id: 'C',
        text: 'O compartilhamento de dados foi lícito, pois a operadora de saúde tem interesse legítimo na obtenção dessas informações para aprimorar os seus serviços e oferecer benefícios aos clientes.',
      },
      {
        id: 'D',
        text: 'O compartilhamento de dados foi ilegal, mas a Farmácia Vida+ não pode ser responsabilizada, pois a operadora de planos de saúde é a responsável final pelo tratamento das informações, mas ambas são obrigadas a eliminar os dados.',
      },
    ],
    correctOption: 'B',
    legalBasis: 'Art. 5º, II e Art. 11, § 4º da Lei nº 13.709/2018 (LGPD)',
    commentary:
      'Dados referentes à saúde e uso de fármacos são classificados como dados pessoais sensíveis (Art. 5º, II da LGPD). O Art. 11, § 4º da LGPD veda expressamente a comunicação ou o compartilhamento de dados sensíveis de saúde com objetivo de obter vantagem econômica por operadoras e prestadores, exigindo consentimento específico dos titulares.',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa B está correta. A cessão e o compartilhamento de dados de medicamentos e saúde entre farmácias e operadoras de saúde sem consentimento expresso viola a LGPD, acarretando sanções administrativas e a obrigação de eliminação dos dados.',
      base_legal: 'Art. 11, § 4º e Art. 52 da Lei nº 13.709/2018',
      pegadinha_da_fgv:
        'A base do "legítimo interesse" (art. 10 da LGPD) aplica-se exclusivamente a dados pessoais comuns, sendo vedada como base legal genérica para o tratamento de dados pessoais sensíveis (art. 11).',
    },
  },
  {
    id: 4542,
    id_questao: 'oab_fgv_45_cv_42',
    number: 42,
    discipline: 'Direito Civil',
    topic: 'Direitos Reais sobre Coisas Alheias - Servidão Não Aparente e Inadmissibilidade de Usucapião',
    statement:
      'Ruth é proprietária do Sítio Felicidade, localizado na zona rural do município de Ribeirão Corrente (SP). Há 15 anos, ela mantém canos subterrâneos de irrigação que atravessam o Sítio da Lua, de propriedade de Demétrio, para captar água de uma nascente situada dentro desse último. O uso sempre foi contínuo e sem oposição, mas invisível a olho nu, já que o sistema está instalado sob o solo. Nunca houve registro da servidão no Cartório de Registro de Imóveis, tampouco um contrato formal entre os antigos proprietários.\n\nEm novembro de 2025, Pedro, novo dono do Sítio da Lua, ao descobrir as tubulações, notificou Ruth para interromper o uso da água, alegando que a servidão não se constituiu validamente por ausência de registro.\n\nConsiderando o caso concreto e as normas do Código Civil sobre a constituição e aquisição de servidões, assinale a afirmativa correta.',
    options: [
      {
        id: 'A',
        text: 'A usucapião da servidão poderia ser reconhecida após cinco anos de uso contínuo, dada a boa-fé e a posse qualificada de Ruth.',
      },
      {
        id: 'B',
        text: 'Ruth adquiriu a servidão por usucapião, pois o uso foi contínuo e incontestado por mais de dez anos, ainda que não fosse visível.',
      },
      {
        id: 'C',
        text: 'O direito de Ruth configura mera detenção tolerada, mas poderia ser convertido em servidão após 20 anos de utilização contínua.',
      },
      {
        id: 'D',
        text: 'Ruth não adquiriu a servidão, pois, não sendo aparente, exige registro no Cartório de Imóveis para a sua constituição válida, não admitindo usucapião.',
      },
    ],
    correctOption: 'D',
    legalBasis: 'Arts. 1.213 e 1.379 do Código Civil; Súmula nº 415 do STF',
    commentary:
      'Nos termos do Art. 1.213 do Código Civil, o desfrute não aparente das servidões não induz posse hábil para a usucapião. O Art. 1.379 do CC restringe expressamente a usucapião às servidões aparentes. Como as tubulações são subterrâneas e não visíveis (servidão não aparente), somente poderiam ser constituídas mediante registro no Cartório de Imóveis.',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa D está correta. Servidões não aparentes jamais são passíveis de aquisição por usucapião pelo ordenamento brasileiro. A sua constituição jurídica exige necessariamente declaração de vontade expressa com transcrição no Cartório de Registro de Imóveis competente.',
      base_legal: 'Arts. 1.213 e 1.379 do Código Civil',
      pegadinha_da_fgv:
        'O candidato é levado a pensar que o decurso de 15 anos sem oposição ensejaria a usucapião extraordinária do art. 1.379, esquecendo que o pressuposto elementar e inarredável da usucapião de servidão é a aparente visibilidade externa da obra.',
    },
  },

  // --- ESTATUTO DA CRIANÇA E DO ADOLESCENTE - ECA (Q43 a Q44) ---
  {
    id: 4543,
    id_questao: 'oab_fgv_45_eca_43',
    number: 43,
    discipline: 'Estatuto da Criança e do Adolescente (ECA)',
    topic: 'Autorização para Viagem Nacional de Adolescente',
    statement:
      'Maria e José, ambos com 45 anos, possuem um filho em comum, Paulo, que, hoje, tem 17 anos. Quando Paulo tinha 12 anos, Maria e José se divorciaram e foi estipulada judicialmente a guarda unilateral para Maria, sendo certo que José sempre usou o seu direito de convivência com o adolescente em finais de semanas alternados.\n\nApós muito esforço, Maria conseguiu angariar recursos para fazer uma viagem dentro do território nacional com Paulo. A viagem será de uma semana e não afetará o direito de visitação de José. Ocorre que o genitor se opõe à viagem, mesmo sem apresentar qualquer justificativa para isso.\n\nPreocupada, Maria procura você, como advogado(a), para que lhe preste a solução jurídica adequada.\n\nDe acordo com o ECA, assinale a opção que, corretamente, indica a sua orientação.',
    options: [
      {
        id: 'A',
        text: 'Maria deverá buscar o Juízo da Infância e Juventude e obter alvará para a autorização de viagem.',
      },
      {
        id: 'B',
        text: 'José só pode se opor à viagem se tivesse sido estipulada a guarda compartilhada, o que não é a hipótese apresentada.',
      },
      {
        id: 'C',
        text: 'Maria só pode fazer essa viagem com expressa autorização de José, já que ambos são detentores do poder familiar.',
      },
      {
        id: 'D',
        text: 'Maria não precisa da anuência do genitor, nem de autorização judicial, uma vez que a viagem é dentro do território nacional.',
      },
    ],
    correctOption: 'D',
    legalBasis: 'Art. 83, caput e § 1º, "b", 1 do ECA (Lei nº 8.069/1990)',
    commentary:
      'O Art. 83 do ECA prevê que nenhuma criança ou adolescente menor de 16 anos poderá viajar para fora da comarca desacompanhado dos pais ou sem autorização judicial. Como Paulo já tem 17 anos (adolescente maior de 16 anos), sequer precisa de autorização para viajar sozinho em território nacional, e, além disso, está viajando acompanhado de sua mãe.',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa D está correta. A exigência legal de autorização para viagens domésticas destina-se apenas aos menores de 16 anos desacompanhados. Aos 17 anos e na companhia de um dos genitores, a viagem dentro do território nacional é livre de qualquer exigência judicial ou anuência do outro genitor.',
      base_legal: 'Art. 83 da Lei nº 8.069/1990 (ECA)',
      pegadinha_da_fgv:
        'O examinador tenta confundir as regras rígidas de viagem para o exterior (que exigem consentimento de ambos os genitores, art. 84 do ECA) com a viagem nacional comum acompanhada da mãe.',
    },
  },
  {
    id: 4544,
    id_questao: 'oab_fgv_45_eca_44',
    number: 44,
    discipline: 'Estatuto da Criança e do Adolescente (ECA)',
    topic: 'Apuração de Ato Infracional - Defesa Técnica e Dispensa de Procuração em Audiência',
    statement:
      'Marcos, 17 anos, responde a processo de apuração de ato infracional. Segundo a representação, o adolescente foi apreendido quando estava subtraindo bens de um estabelecimento comercial. Assim, foi-lhe imputada a conduta análoga ao Art. 155 do Código Penal (furto).\n\nMariana, 40 anos, mãe de Marcos, o(a) procura, na condição de advogado(a), para fazer a defesa.\n\nDesignada audiência de apresentação, estavam presentes Marcos, Mariana e as testemunhas de acusação. Tanto Marcos quanto Mariana confirmaram, perante a autoridade judiciária, que você fará a defesa técnica naquele processo.\n\nEntretanto, o Juízo verificou que não há procuração juntada aos autos. Por isso, o excluiu do feito e nomeou a Defensoria Pública para patrocinar os interesses do adolescente, contra a vontade deste e de sua genitora.\n\nConsiderando o caso acima narrado, assinale a afirmativa correta.',
    options: [
      {
        id: 'A',
        text: 'O Magistrado errou ao nomear a Defensoria Pública, pois deveria ter adiado a audiência e dado um prazo razoável para a juntada da procuração.',
      },
      {
        id: 'B',
        text: 'Considerando a ausência de procuração, o adolescente estava indefeso, de modo que o Juízo agiu corretamente ao nomear a Defensoria Pública.',
      },
      {
        id: 'C',
        text: 'O Magistrado errou, uma vez que é dispensada a outorga de mandato quando o advogado(a) constituído(a) tiver sido indicado(a) por ocasião de ato formal com a presença da autoridade judiciária.',
      },
      {
        id: 'D',
        text: 'O Juízo errou, pois deveria adiar o ato e oficiar à OAB para a apuração de eventual infração disciplinar, já que o advogado(a) não poderia se apresentar na audiência sem a juntada da respectiva procuração.',
      },
    ],
    correctOption: 'C',
    legalBasis: 'Art. 207, § 2º do ECA (Lei nº 8.069/1990)',
    commentary:
      'O Art. 207, § 2º do ECA preconiza expressamente: "É dispensada a outorga de mandato quando o defensor for constituído pelo adolescente ou por seus pais ou responsável por ocasião de ato formal com a presença da autoridade judiciária". O ato do magistrado violou a prerrogativa do defensor e o direito de escolha do adolescente.',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa C está correta. O ECA confere formalidade simplificada e protetiva ao adolescente: a indicação verbal do advogado perante a autoridade judicial na audiência de apresentação dispensa instrumento formal de mandato.',
      base_legal: 'Art. 207, § 2º da Lei nº 8.069/1990',
      pegadinha_da_fgv:
        'No processo civil comum a procuração escrita é exigida (art. 104 CPC), mas no rito de apuração de ato infracional do ECA existe norma especial autorizando a constituição apud acta diretamente na audiência.',
    },
  },

  // --- DIREITO DO CONSUMIDOR (Q45 a Q46) ---
  {
    id: 4545,
    id_questao: 'oab_fgv_45_con_45',
    number: 45,
    discipline: 'Direito do Consumidor',
    topic: 'Contrato de Adesão - Interpretação Favorável e Cobrança Retroativa em Serviços Públicos',
    statement:
      'Augusto assinou um contrato de adesão com a sociedade empresária AquaLimpa, fornecedora de água e esgoto em sua cidade, para o fornecimento de água em sua residência. Após meses de uso regular, Augusto foi surpreendido por uma cobrança inesperada no valor de R$ 2.500,00 (dois mil e quinhentos reais), sendo alegado um "ajuste de consumo retroativo".\n\nA sociedade empresária AquaLimpa informou que o valor deveria ser pago imediatamente para evitar o corte no fornecimento de água. No entanto, Augusto verificou que o contrato não mencionava essa possibilidade de ajuste retroativo, nem qualquer explicação prévia sobre o cálculo desse valor.\n\nDiante da situação hipotética narrada e com base no Código de Defesa do Consumidor, assinale a afirmativa correta.',
    options: [
      {
        id: 'A',
        text: 'Por ser um contrato escrito, Augusto não tem direito de contestar a cobrança, já que os termos do contrato foram previamente estipulados pela sociedade empresária e aceitos por ele.',
      },
      {
        id: 'B',
        text: 'Augusto deve questionar judicialmente a cobrança, uma vez que o contrato de adesão deve ser interpretado da forma mais favorável ao consumidor quando houver cláusulas ambíguas, contraditórias ou omissas.',
      },
      {
        id: 'C',
        text: 'Como o fornecimento de água é um serviço essencial, a sociedade empresária AquaLimpa não pode cortar o fornecimento de água, embora possa realizar a cobrança dos valores retroativos nos termos pactuados.',
      },
      {
        id: 'D',
        text: 'A sociedade empresária AquaLimpa pode cortar o fornecimento de água imediatamente se Augusto não pagar a dívida, pois a imediata interrupção no fornecimento de serviços em razão de inadimplência, independentemente de notificação, é lícita.',
      },
    ],
    correctOption: 'B',
    legalBasis: 'Art. 47 do CDC; Súmula nº 407 do STJ; Jurisprudência do STJ sobre débitos pretéritos',
    commentary:
      'O Art. 47 do Código de Defesa do Consumidor prevê que as cláusulas contratuais serão interpretadas de maneira mais favorável ao consumidor. Ademais, o STJ pacificou que a cobrança de dívidas pretéritas/retroativas não autoriza o corte do fornecimento de água (serviço essencial), devendo ser discutida e cobrada pelas vias ordinárias.',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa B está correta. A omissão ou falta de clareza contratual em contratos de adesão opera estritamente em benefício da parte hipossuficiente (princípio da interpretação mais favorável, art. 47 do CDC).',
      base_legal: 'Art. 47 da Lei nº 8.078/1990 (CDC)',
      pegadinha_da_fgv:
        'Concessionárias não podem interromper serviços públicos essenciais por dívidas pretéritas consolidadas sem prévio aviso, e a adesão do consumidor não chancela cláusulas abusivas ou surpresas financeiras desprovidas de base contratual.',
    },
  },
  {
    id: 4546,
    id_questao: 'oab_fgv_45_con_46',
    number: 46,
    discipline: 'Direito do Consumidor',
    topic: 'Responsabilidade pelo Fato do Produto - Acidente de Consumo e Responsabilidade Objetiva',
    statement:
      'Maria adquiriu um aquecedor elétrico de uma marca renomada. Após uma semana de uso, o aquecedor apresentou um curto-circuito, causando um incêndio que danificou parte de sua residência. Após investigações, constatou-se que o defeito era decorrente de uma falha de fabricação, já relatada por outros consumidores. Ao buscar uma solução com o fabricante, este alegou que o acidente foi causado pelo uso inadequado do produto e negou responsabilidade.\n\nSobre o fato narrado, com base no Código de Defesa do Consumidor, assinale a afirmativa correta.',
    options: [
      {
        id: 'A',
        text: 'No caso, não há que se falar em responsabilidade do fornecedor, pois o risco de curto-circuito é inerente a todos os produtos elétricos.',
      },
      {
        id: 'B',
        text: 'O fabricante só será responsabilizado se Maria provar que o acidente não decorreu de uso inadequado, independentemente da constatação do defeito do produto.',
      },
      {
        id: 'C',
        text: 'O fabricante poderá ser responsabilizado se Maria provar que utilizou o aquecedor conforme as instruções do manual de uso, bem como demonstrar a adequação de suas instalações elétricas.',
      },
      {
        id: 'D',
        text: 'O fabricante é responsável pelos danos causados pelo aquecedor defeituoso, independentemente de culpa e, comprovado o nexo causal entre o defeito e os danos, responderá de forma objetiva.',
      },
    ],
    correctOption: 'D',
    legalBasis: 'Art. 12 do Código de Defesa do Consumidor (Lei nº 8.078/1990)',
    commentary:
      'Trata-se de acidente de consumo (fato do produto), regido pelo Art. 12 do CDC: o fabricante responde, independentemente da existência de culpa, pela reparação dos danos causados aos consumidores por defeitos decorrentes de projeto e fabricação. O ônus de provar eventual culpa exclusiva do consumidor é do próprio fornecedor (Art. 12, § 3º, III do CDC).',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa D está correta. A responsabilidade do fabricante pelo fato do produto é objetiva (independe de culpa). Havendo defeito e dano vinculado por nexo de causalidade, impõe-se a reparação integral dos prejuízos materiais sofridos por Maria.',
      base_legal: 'Art. 12, caput da Lei nº 8.078/1990',
      pegadinha_da_fgv:
        'As alternativas B e C tentam inverter indevidamente o ônus da prova contra a consumidora, exigindo que ela prove que não utilizou de forma inadequada o produto defeituoso.',
    },
  },

  // --- DIREITO EMPRESARIAL (Q47 a Q50) ---
  {
    id: 4547,
    id_questao: 'oab_fgv_45_emp_47',
    number: 47,
    discipline: 'Direito Empresarial',
    topic: 'Recuperação Judicial - Direito de Voto na Assembleia-Geral de Credores',
    statement:
      'À Assembleia de Credores, convocada para deliberação sobre o plano de recuperação judicial apresentado por Atacado Têxtil Itapemirim Ltda., compareceram os credores Afonso Fundão e Viana & Cia. Ltda.\n\nO primeiro é sócio da recuperanda e credor por empréstimo fornecido a ela; o segundo é credor por duplicatas, cujo valor e condições de pagamento não serão alterados pelo plano.\n\nCom base nessas informações e nas disposições sobre a participação e o voto nas Assembleias de Credores (Lei nº 11.101/2005), assinale a afirmativa correta.',
    options: [
      {
        id: 'A',
        text: 'Apenas Afonso Fundão poderá votar, já que se trata de credor subordinado, integrante da classe III; Viana & Cia. Ltda. não poderá votar, porque o plano não alterou o valor ou as condições originais de pagamento.',
      },
      {
        id: 'B',
        text: 'Nenhum dos credores poderá votar na Assembleia, em razão de o primeiro ser sócio da devedora, e o segundo não ter alterado o valor ou as condições originais de pagamento.',
      },
      {
        id: 'C',
        text: 'Ambos poderão votar, em razão de o primeiro ser credor subordinado e o segundo credor quirografário, integrando a classe III na composição da Assembleia.',
      },
      {
        id: 'D',
        text: 'Apenas Viana & Cia. Ltda. poderá votar na Assembleia por ser credor quirografário, integrando a classe III; Afonso Fundão não poderá votar, em razão de ser sócio da devedora.',
      },
    ],
    correctOption: 'B',
    legalBasis: 'Art. 43 e Art. 45-A da Lei nº 11.101/2005 (Lei de Recuperação e Falência)',
    commentary:
      'Conforme o Art. 43 da Lei nº 11.101/2005, os sócios do devedor e as partes relacionadas não têm direito a voto nas deliberações da Assembleia Geral de Credores. Por sua vez, a nova redação da Lei 11.101/2005 (Art. 45-A, § 2º) estabelece que não terão direito a voto os credores cujos créditos não sofram qualquer modificação no plano.',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa B está correta. Afonso Fundão não vota por ser sócio da recuperanda (impedimento legal expresso por conflito de interesses) e a Viana & Cia. Ltda. não vota porque seu crédito não sofrerá deságio ou prorrogação de prazo pelo plano.',
      base_legal: 'Art. 43 e Art. 45-A, § 2º da Lei nº 11.101/2005',
      pegadinha_da_fgv:
        'Credores sem alteração de crédito não deliberam sobre o plano que não lhes impõe sacrifício, assim como sócios não votam como credores na aprovação do plano de sua própria empresa.',
    },
  },
  {
    id: 4548,
    id_questao: 'oab_fgv_45_emp_48',
    number: 48,
    discipline: 'Direito Empresarial',
    topic: 'Sociedade entre Cônjuges - Regime de Bens e Artigo 977 do Código Civil',
    statement:
      'Pedro e Vitória são casados desde 2005 no regime de comunhão parcial de bens e pretendem constituir sociedade simples com seus filhos Carlos e Conceição.\n\nDe acordo com as regras do Código Civil para a participação de pessoas casadas em sociedade, assinale a afirmativa correta.',
    options: [
      {
        id: 'A',
        text: 'É possível a constituição de sociedade simples simultaneamente entre os cônjuges e seus filhos, tendo em vista não ser a sociedade empresária.',
      },
      {
        id: 'B',
        text: 'É defeso a constituição de sociedade simples simultaneamente entre os cônjuges e seus filhos, qualquer que seja o regime de bens do casamento.',
      },
      {
        id: 'C',
        text: 'É possível a constituição de sociedade simples entre os cônjuges e seus filhos simultaneamente, tendo em vista ser o regime de bens do casamento de comunhão parcial.',
      },
      {
        id: 'D',
        text: 'É defeso a constituição de sociedade simples simultaneamente entre os cônjuges e seus filhos, pois o casamento foi celebrado em regime de bens diferente do da separação absoluta.',
      },
    ],
    correctOption: 'C',
    legalBasis: 'Art. 977 do Código Civil',
    commentary:
      'Dispõe o Art. 977 do Código Civil: "Faculta-se aos cônjuges contratar sociedade, entre si ou com terceiros, desde que não tenham casado no regime da comunhão universal de bens, ou no da separação obrigatória". Casados no regime de comunhão parcial de bens, Pedro e Vitória podem livremente contratar sociedade entre si e com terceiros (seus filhos).',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa C está correta. A restrição societária entre cônjuges atinge exclusivamente dois regimes: comunhão universal de bens e separação obrigatória (legal) de bens. No regime da comunhão parcial, a formação de sociedade é perfeitamente autorizada.',
      base_legal: 'Art. 977 do Código Civil',
      pegadinha_da_fgv:
        'A vedação do art. 977 aplica-se indistintamente a sociedades simples ou empresárias (o que torna a justificativa da alternativa A imperfeita frente à dicção precisa da alternativa C, que cita o regime de comunhão parcial).',
    },
  },
  {
    id: 4549,
    id_questao: 'oab_fgv_45_emp_49',
    number: 49,
    discipline: 'Direito Empresarial',
    topic: 'Alienação Fiduciária em Garantia de Veículos - Prerrogativas do Credor na Mora',
    statement:
      'A sociedade empresária Brasilândia Materiais de Construção contraiu empréstimo junto ao Banco Figueirão S.A. garantido pela alienação fiduciária de seis veículos automotores.\n\nO contrato tem prazo de vigência de 36 meses e, após o decurso de 17 meses, a devedora fiduciante deixou de pagar as prestações do empréstimo, sendo a mora comprovada por carta registrada com aviso de recebimento devidamente entregue.\n\nDiante da mora no adimplemento das obrigações contratuais, assinale a opção que indica a prerrogativa que o Banco Figueirão tem, na condição de proprietário fiduciário dos veículos automotores.',
    options: [
      {
        id: 'A',
        text: 'Poderá vendê-los a terceiros, independentemente de leilão, hasta pública, avaliação prévia ou qualquer outra medida judicial ou extrajudicial, salvo disposição expressa em contrário prevista no contrato.',
      },
      {
        id: 'B',
        text: 'Deverá ajuizar ação declaratória para positivar a mora da fiduciante e, após a avaliação dos bens e alvará judicial, poderá vendê-los a terceiros, devendo aplicar o preço da venda no pagamento de seu crédito e das despesas decorrentes.',
      },
      {
        id: 'C',
        text: 'Poderá vendê-los a terceiros desde que interpele previamente a devedora fiduciante para que realize o pagamento no prazo improrrogável de 15 dias, findo o qual a propriedade estará consolidada se não for realizado o pagamento integral do saldo devedor.',
      },
      {
        id: 'D',
        text: 'Deverá ajuizar ação de execução por quantia certa em face da fiduciante para cobrar o crédito, que abrange o principal, a correção monetária, os juros, as comissões, as taxas e a cláusula penal, podendo requerer, liminarmente, uma autorização judicial para a venda do bem em sede de tutela de evidência.',
      },
    ],
    correctOption: 'A',
    legalBasis: 'Art. 2º do Decreto-Lei nº 911/1969',
    commentary:
      'Conforme o Art. 2º do Decreto-Lei nº 911/1969: "No caso de inadimplemento ou mora da obrigação garantida, o proprietário fiduciário ou credor poderá vender a coisa a terceiros, independentemente de leilão, hasta pública, avaliação prévia ou qualquer outra medida judicial ou extrajudicial, salvo disposição expressa em contrário prevista no contrato, devendo aplicar o preço da venda no pagamento de seu crédito e das despesas decorrentes e entregar ao devedor o saldo apurado, se houver".',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa A está correta. Reproduz textualmente o poder legal concedido ao credor fiduciário de bens móveis (veículos) pelo art. 2º do Dec-Lei 911/69 de realizar a alienação direta extrajudicial.',
      base_legal: 'Art. 2º do Decreto-Lei nº 911/1969',
      pegadinha_da_fgv:
        'A alternativa C descreve o procedimento de consolidação de propriedade fiduciária de imóveis regido pela Lei 9.514/97 (com prazo de purga de mora em 15 dias no Registro de Imóveis), diferente do regime de veículos do DL 911/69.',
    },
  },
  {
    id: 4550,
    id_questao: 'oab_fgv_45_emp_50',
    number: 50,
    discipline: 'Direito Empresarial',
    topic: 'Locação Comercial - Ação Renovatória e Proposta de Terceiro em Réplica',
    statement:
      'A sociedade empresária Elétrica Passa Sete Ltda., por meio de seu administrador, ajuizou tempestivamente ação renovatória de locação não residencial referente ao imóvel onde está localizada a filial na cidade de Varginha, MG.\n\nNa petição inicial, a autora indicou as condições oferecidas para a renovação da locação, especialmente o novo valor do aluguel proposto.\n\nApresentada a contestação, o locador informou que recebeu proposta de terceiro para a nova locação em condições melhores do que aquelas propostas pela locatária na petição inicial, sendo o valor locativo do imóvel 12% maior do que o oferecido pela locatária.\n\nConsiderados os fatos narrados, assinale a afirmativa correta.',
    options: [
      {
        id: 'A',
        text: 'O locador não pode apresentar na contestação proposta de terceiro para a locação, ainda que em condições melhores, diante do direito potestativo do locatário à renovação compulsória.',
      },
      {
        id: 'B',
        text: 'A proposta de terceiro pode ser apresentada em documento público ou particular. Caso o documento seja particular e esteja com assinatura autenticada, é dispensável a intervenção de testemunhas.',
      },
      {
        id: 'C',
        text: 'O locatário poderá, em réplica, manifestar ao locador que aceita as condições apresentadas por terceiro para obter a renovação pretendida.',
      },
      {
        id: 'D',
        text: 'O ramo de negócio a ser explorado pelo terceiro proponente pode ou não ser o mesmo do locatário, desde que seja explorado continuadamente nos últimos três anos.',
      },
    ],
    correctOption: 'C',
    legalBasis: 'Art. 72, II e § 1º c/c Art. 73 da Lei nº 8.245/1991 (Lei do Inquilinato)',
    commentary:
      'Conforme o Art. 73 da Lei do Inquilinato (Lei nº 8.245/91), contestada a ação renovatória com fundamento em melhor proposta de terceiro (Art. 72, II), o locatário tem a faculdade de, em réplica, aceitar em idênticas condições a proposta do terceiro, caso em que o contrato será renovado.',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa C está correta. A lei garante ao locatário o direito de preferência para igualar a oferta do terceiro em sede de réplica, assegurando a renovação compulsória do ponto comercial.',
      base_legal: 'Art. 73 da Lei nº 8.245/1991',
      pegadinha_da_fgv:
        'A proposta de terceiro deve ser assinada por 2 testemunhas (art. 72, § 2º), e o terceiro proponente não pode exercer o mesmo ramo de atividade do locatário (art. 72, § 1º), o que invalida as opções B e D.',
    },
  },

  // --- DIREITO PROCESSUAL CIVIL (Q51 a Q56) ---
  {
    id: 4551,
    id_questao: 'oab_fgv_45_dpc_51',
    number: 51,
    discipline: 'Direito Processual Civil',
    topic: 'Tutela Provisória de Urgência e Recurso Cabível (Agravo de Instrumento)',
    statement:
      'José ajuizou ação de indenização por danos materiais e morais contra Ana.\n\nNa petição inicial, José formulou requerimento de tutela provisória de urgência para que fosse determinado o bloqueio imediato de bens detidos por Ana, até o valor pleiteado por José no processo judicial, como forma de resguardar uma futura indenização para José, se forem julgados procedentes os seus pedidos de danos materiais e morais.\n\nApós realizar a admissibilidade da petição inicial, o magistrado concedeu a tutela provisória de urgência em favor de José.\n\nNessa situação hipotética, assinale a opção que indica o recurso a ser interposto por Ana.',
    options: [
      { id: 'A', text: 'Não cabe recurso imediato contra a decisão que defere a tutela provisória de urgência.' },
      {
        id: 'B',
        text: 'Agravo de instrumento, uma vez que a decisão que defere a tutela provisória de urgência é decisão interlocutória impugnável por tal recurso.',
      },
      {
        id: 'C',
        text: 'Apelação, tendo em vista que a decisão que defere a tutela provisória de urgência tem natureza de sentença, passível de impugnação por tal recurso.',
      },
      {
        id: 'D',
        text: 'Apelação, tendo em vista que a decisão que defere a tutela provisória de urgência é decisão interlocutória passível de impugnação por tal recurso.',
      },
    ],
    correctOption: 'B',
    legalBasis: 'Art. 1.015, I do CPC/2015',
    commentary:
      'Dispõe o Art. 1.015, inciso I, do CPC que cabe agravo de instrumento contra as decisões interlocutórias que versarem sobre tutelas provisórias (sejam elas de urgência ou de evidência, deferidas ou indeferidas).',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa B está correta. A decisão que defere tutela provisória de urgência possui natureza interlocutória e está expressamente contemplada no rol de cabimento do agravo de instrumento no art. 1.015, I do CPC.',
      base_legal: 'Art. 1.015, inciso I do Código de Processo Civil',
      pegadinha_da_fgv:
        'A FGV testa o cabimento estrito da taxatividade mitigada do art. 1.015; decisões sobre tutela provisória são a hipótese clássica do inciso I.',
    },
  },
  {
    id: 4552,
    id_questao: 'oab_fgv_45_dpc_52',
    number: 52,
    discipline: 'Direito Processual Civil',
    topic: 'Reconvenção e Inclusão de Terceiro Corresponsável (Fiador)',
    statement:
      'Joana ajuizou ação declaratória de nulidade de negócio jurídico em face de João e Regina, alegando ter sido vítima de dolo de ambos na celebração de contrato de compra e venda de imóvel.\n\nEm sede de contestação, além de negarem os fatos alegados por Joana, João e Regina procuram você, como advogado(a), para propor reconvenção contra Joana e Marcelo, seu fiador, para cobrar valores alegadamente em atraso, referentes às parcelas do contrato de compra e venda firmado pelas partes.\n\nSobre o caso acima, assinale a opção que apresenta, corretamente, a orientação jurídica prestada.',
    options: [
      {
        id: 'A',
        text: 'Joana poderá desistir da ação para impedir o prosseguimento da reconvenção.',
      },
      {
        id: 'B',
        text: 'Joana, com a propositura da reconvenção, será citada pessoalmente e deverá apresentar resposta no prazo de 15 dias.',
      },
      {
        id: 'C',
        text: 'Não há óbice à propositura da reconvenção em face de Joana e de Marcelo, ainda que este não tenha sido o autor do processo originário.',
      },
      {
        id: 'D',
        text: 'A reconvenção somente poderá ser admitida porque João e Regina contestaram o pedido, não sendo lícita a propositura de reconvenção sem que o réu ofereça contestação.',
      },
    ],
    correctOption: 'C',
    legalBasis: 'Art. 343, § 3º do CPC/2015',
    commentary:
      'O Art. 343, § 3º do CPC autoriza expressamente a ampliação subjetiva na reconvenção: "A reconvenção pode ser proposta contra o autor e terceiro". A desistência da ação principal não obsta a reconvenção (§ 2º), a intimação do autor é na pessoa do advogado (§ 1º) e o réu pode propor reconvenção independentemente de contestar (§ 6º).',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa C está correta. O CPC inovou ao permitir expressamente o litisconsórcio passivo na reconvenção com a inclusão de terceiro (in casu, o fiador Marcelo), promovendo a economia processual.',
      base_legal: 'Art. 343, § 3º do CPC',
      pegadinha_da_fgv:
        'O candidato é tentado a achar que a reconvenção só pode se dar estritamente entre as partes originárias do processo, desconhecendo a regra do § 3º do art. 343.',
    },
  },
  {
    id: 4553,
    id_questao: 'oab_fgv_45_dpc_53',
    number: 53,
    discipline: 'Direito Processual Civil',
    topic: 'Execução de Alimentos - Desconto em Folha de Pagamento até 50% dos Rendimentos Líquidos',
    statement:
      'Lucas requereu o cumprimento de sentença de obrigação de pagar alimentos, decorrente de sentença condenatória proferida em desfavor de Leonardo, seu pai, que é servidor público, condenado ao pagamento de alimentos, no percentual de 20% de seus rendimentos líquidos.\n\nRegularmente intimado, Leonardo não pagou o débito cobrado, porém apresentou petição alegando que enfrenta dificuldades financeiras que impossibilitam o cumprimento da obrigação, requerendo ao Juízo a concessão de maior prazo para pagar a dívida.\n\nSobre o caso apresentado, assinale a afirmativa correta.',
    options: [
      {
        id: 'A',
        text: 'A comprovação de que Leonardo poderá cumprir parcialmente a obrigação alimentar justificará o inadimplemento em absoluto.',
      },
      {
        id: 'B',
        text: 'Não acolhida a defesa de Leonardo, o Juiz decretará a sua prisão pelo prazo de dois a seis meses, que, se cumprida, o eximirá do pagamento das prestações vencidas.',
      },
      {
        id: 'C',
        text: 'O Juiz poderá ordenar a prisão civil de Leonardo em razão do inadimplemento das obrigações referentes às cinco prestações anteriores ao ajuizamento da execução e as que vencerem no curso do processo.',
      },
      {
        id: 'D',
        text: 'Lucas poderá requerer o desconto em folha de pagamento da importância da prestação alimentícia, buscando o pagamento dos alimentos vencidos e vincendos devidos por Leonardo, até o limite de 50% dos ganhos líquidos do executado.',
      },
    ],
    correctOption: 'D',
    legalBasis: 'Art. 529, § 3º do CPC/2015',
    commentary:
      'O Art. 529, § 3º do CPC prescreve que o débito alimentar pode ser descontado dos rendimentos ou salários do executado de forma parcelada, contanto que, somado à parcela devida, não ultrapasse cinquenta por cento (50%) de seus ganhos líquidos. A prisão civil é pelo prazo de 1 a 3 meses (e não 2 a 6 meses, art. 528, § 3º) e o cumprimento da prisão não exime do débito.',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa D está correta. O desconto em folha para cobrança de débitos alimentares pretéritos acumulados é plenamente admitido até o limite teto de 50% dos vencimentos líquidos do devedor alimentante.',
      base_legal: 'Art. 529, § 3º do Código de Processo Civil',
      pegadinha_da_fgv:
        'A prisão civil alcança apenas até as 3 prestações anteriores ao ajuizamento (e não 5, erro na C; Súmula 309 do STJ) e o prazo de prisão é de 1 a 3 meses (erro na B).',
    },
  },
  {
    id: 4554,
    id_questao: 'oab_fgv_45_dpc_54',
    number: 54,
    discipline: 'Direito Processual Civil',
    topic: 'Inventário e Partilha Extrajudicial - Requisitos e Assistência Obrigatória de Advogado',
    statement:
      'Marta faleceu, deixando três filhos, cônjuge e bens a inventariar. Nenhum dos herdeiros é incapaz, há consenso sobre a partilha, e eles desejam realizar o inventário da forma mais rápida possível.\n\nConsiderando os procedimentos judiciais e extrajudiciais que regem o inventário e a partilha, assinale a afirmativa que apresenta a providência a ser adotada pelos herdeiros.',
    options: [
      {
        id: 'A',
        text: 'Realizar o inventário extrajudicial por meio de escritura pública, sendo necessária a assistência de um(a) advogado(a).',
      },
      {
        id: 'B',
        text: 'Realizar o inventário extrajudicial por meio de escritura pública, exigindo-se assistência de um(a) advogado(a) e a intervenção do Ministério Público a fim de controlar a legalidade da partilha.',
      },
      {
        id: 'C',
        text: 'Ajuizar ação pelo procedimento comum de inventário e partilha, os quais necessariamente devem ocorrer pela via judicial, independentemente da existência de consenso entre os herdeiros.',
      },
      {
        id: 'D',
        text: 'Comparecer perante o Tabelionato e realizar o inventário e a partilha mediante escritura pública, dispensada a assistência de um(a) advogado(a) por haver acordo sobre a partilha.',
      },
    ],
    correctOption: 'A',
    legalBasis: 'Art. 610, § 1º e § 2º do CPC/2015',
    commentary:
      'Dispõe o Art. 610, § 1º do CPC que, se todos os herdeiros forem capazes e concordes, o inventário e a partilha poderão ser feitos por escritura pública, a qual constituirá documento hábil para qualquer registro. O § 2º ressalta expressamente que o tabelião somente lavrará a escritura pública se todas as partes estiverem assistidas por advogado ou defensor público.',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa A está correta. Presentes a capacidade civil de todos os herdeiros e o consenso na partilha, a via extrajudicial perante tabelionato de notas é a mais célere, exigindo a lei a indispensável presença/assistência de advogado.',
      base_legal: 'Art. 610, § 1º e § 2º do CPC',
      pegadinha_da_fgv:
        'A FGV frequentemente induz candidatos ao engano dizendo que a concordância dispensaria o advogado (alternativa D), o que é vedado pelo § 2º do art. 610 do CPC.',
    },
  },
  {
    id: 4555,
    id_questao: 'oab_fgv_45_dpc_55',
    number: 55,
    discipline: 'Direito Processual Civil',
    topic: 'Cumprimento de Sentença - Termo Inicial do Prazo de Impugnação',
    statement:
      'Glauco ingressou com uma ação contra Alex que, após o trânsito em julgado da sentença condenatória, deu início ao cumprimento de sentença.\n\nAlex foi devidamente intimado para pagar o débito no prazo legal, mas não realizou o pagamento. Seis dias após o término do prazo para o pagamento, ao ser questionado sobre a apresentação da impugnação ao cumprimento de sentença, Alex afirmou que ainda aguardava uma intimação específica para impugnar, pois acreditava que o prazo para se manifestar só começaria a contar após essa nova intimação.\n\nDiante dessa situação, assinale a afirmativa correta.',
    options: [
      {
        id: 'A',
        text: 'Alex está correto, pois o prazo para impugnação ao cumprimento de sentença só se inicia após uma nova intimação específica para esse fim.',
      },
      {
        id: 'B',
        text: 'O prazo para impugnação ao cumprimento de sentença tem início após o transcurso do prazo para o pagamento voluntário, independentemente de nova intimação.',
      },
      {
        id: 'C',
        text: 'Alex pode apresentar a impugnação a qualquer momento durante a execução, pois não há prazo específico para essa manifestação, em razão do princípio da ampla defesa, devendo ser apresentada em autos apartados.',
      },
      {
        id: 'D',
        text: 'O prazo para a impugnação ao cumprimento de sentença tem início antes do prazo para o pagamento voluntário, isto é, primeiro Alex é intimado para impugnar e, caso a impugnação não seja acolhida, ele é intimado para efetuar o pagamento do débito.',
      },
    ],
    correctOption: 'B',
    legalBasis: 'Art. 525, caput do CPC/2015',
    commentary:
      'Conforme o Art. 525, caput do CPC: "Transcorrido o prazo previsto no art. 523 sem o pagamento voluntário, inicia-se o prazo de 15 (quinze) dias para que o executado, independentemente de penhora ou nova intimação, apresente, nos próprios autos, sua impugnação". O prazo é consecutivo e automático.',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa B está correta. No regime processual civil em vigor, o prazo de 15 dias da impugnação corre automaticamente na sequência dos 15 dias do pagamento voluntário, dispensando qualquer penhora ou nova intimação.',
      base_legal: 'Art. 525, caput do Código de Processo Civil',
      pegadinha_da_fgv:
        'A crença equivocada de que seria necessária uma intimação posterior à garantia do juízo pertencia ao antigo CPC de 1973; no CPC/2015, o prazo é sucessivo e automático.',
    },
  },
  {
    id: 4556,
    id_questao: 'oab_fgv_45_dpc_56',
    number: 56,
    discipline: 'Direito Processual Civil',
    topic: 'Elementos da Ação e Coisa Julgada Material',
    statement:
      'Joana ajuizou ação em face de Pietra, cirurgiã plástica, requerendo a sua condenação ao pagamento de danos morais e estéticos, resultantes de procedimento estético malsucedido.\n\nOcorre que, anteriormente, em decisão transitada em julgado, fundada na mesma causa de pedir e contra a mesma profissional, um pedido idêntico de Joana foi julgado improcedente em face de Pietra, sob o fundamento de que não restou comprovada conduta negligente de Pietra, a ensejar a sua condenação.\n\nEm tal hipótese, assinale a opção que indica o fenômeno processual cabível para extinguir a ação proposta por Joana.',
    options: [
      { id: 'A', text: 'Conexão, por ser comum o pedido e a causa de pedir.' },
      { id: 'B', text: 'Litispendência, por se repetir ação já proposta e em curso.' },
      { id: 'C', text: 'Perempção, por ter havido extinção de ação anteriormente proposta por Joana.' },
      { id: 'D', text: 'Coisa julgada, por haver decisão de mérito transitada em julgado com as mesmas partes, causa de pedir e pedido.' },
    ],
    correctOption: 'D',
    legalBasis: 'Art. 337, §§ 1º e 4º, e Art. 502 do CPC/2015; Art. 485, V do CPC',
    commentary:
      'Nos termos do Art. 337, § 1º do CPC, verifica-se a coisa julgada quando se reproduz ação anteriormente ajuizada com mesmas partes, causa de pedir e pedido (tríplice identidade) cuja decisão de mérito já transitou em julgado (§ 4º). Tal matéria extingue o processo sem resolução do mérito (Art. 485, V do CPC).',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa D está correta. A identidade integral de partes, causa de pedir e pedidos decididos em definitivo por mérito transitado em julgado opera a autoridade de coisa julgada material, obstando a repropositura.',
      base_legal: 'Arts. 337, § 4º e 502 do CPC',
      pegadinha_da_fgv:
        'Litispendência pressupõe ação em curso; perempção exige 3 extinções por abandono da causa pelo autor (art. 486, § 3º). Havendo sentença de mérito passada em julgado, o fenômeno técnico é a coisa julgada.',
    },
  },

  // --- DIREITO PENAL (Q57 a Q60) ---
  {
    id: 4557,
    id_questao: 'oab_fgv_45_dp_57',
    number: 57,
    discipline: 'Direito Penal',
    topic: 'Aplicação da Lei Penal no Espaço - Princípio da Bandeira ou Pavilhão em Aeronaves Privadas',
    statement:
      'Waldir, cidadão brasileiro, depois de anos de poupança, conseguiu realizar o sonho de infância e comprou um pacote de viagem para conhecer a cidade de Orlando, nos EUA.\n\nComo nunca havia viajado em avião, Waldir irritou-se com as condições precárias disponibilizadas na classe econômica da aeronave privada registrada sob bandeira brasileira e desistiu da viagem durante o voo, exigindo, aos gritos, o imediato retorno ao aeroporto de origem.\n\nAo ser advertido pela tripulação, Waldir agrediu fisicamente o comissário de bordo, de nacionalidade brasileira, causando-lhe lesão corporal grave, quando o avião já sobrevoava território estrangeiro.\n\nSobre essa situação hipotética, assinale a afirmativa correta.',
    options: [
      {
        id: 'A',
        text: 'O fato está incondicionalmente sujeito à legislação brasileira, tendo em vista a nacionalidade do autor e da vítima do delito.',
      },
      {
        id: 'B',
        text: 'O fato está sujeito, simultaneamente, à legislação brasileira e à legislação estrangeira, sendo aplicável a teoria da ubiquidade quanto ao tempo do delito.',
      },
      {
        id: 'C',
        text: 'O fato está sujeito exclusivamente à legislação estrangeira, haja vista que a aeronave privada estava em território estrangeiro quando ocorreu a prática do delito.',
      },
      {
        id: 'D',
        text: 'O fato estará sujeito à legislação brasileira, caso não seja julgado no país estrangeiro em cujo território se encontrava a aeronave no momento da prática do delito.',
      },
    ],
    correctOption: 'D',
    legalBasis: 'Art. 5º, § 2º do Código Penal',
    commentary:
      'O Art. 5º, § 2º do Código Penal preceitua que: "É também aplicável a lei brasileira aos crimes praticados a bordo de aeronaves ou embarcações estrangeiras da propriedade privada, achando-se aquelas em pouso no território nacional ou em vôo no espaço aéreo correspondente, e estas em porto ou mar territorial do Brasil", conjugado com o § 1º que estende a lei brasileira às aeronaves brasileiras mercantes ou de propriedade privada onde quer que se encontrem, aplicando-se a lei brasileira subsidiariamente caso o crime não seja julgado na justiça estrangeira local.',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa D está correta. A bordo de aeronaves privadas brasileiras que sobrevoam espaço aéreo estrangeiro, incide a territorialidade por extensão condicionada: aplica-se a lei penal brasileira caso o crime não seja julgado no país estrangeiro onde sobrevoava.',
      base_legal: 'Art. 5º, § 1º e § 2º c/c Art. 7º, II, "c" do Código Penal',
      pegadinha_da_fgv:
        'O candidato pode confundir com extraterritorialidade incondicionada (art. 7º, I do CP), que é restrita a crimes contra a vida do Presidente, patrimônio público da União, etc.',
    },
  },
  {
    id: 4558,
    id_questao: 'oab_fgv_45_dp_58',
    number: 58,
    discipline: 'Direito Penal',
    topic: 'Conflito Aparente de Normas - Princípio da Especialidade (CTB vs. Código Penal)',
    statement:
      'Na noite em que completou 19 anos de idade, Júnior, morador do bairro Leblon, RJ, resolveu testar o Bugatti Chiron de seu pai, que é o carro mais caro do Brasil, avaliado em cerca de 10 milhões de reais.\n\nJúnior esqueceu a sua carteira de habilitação em casa e saiu com o veículo, mas, por desconhecer a extraordinária potência do motor, perdeu o controle da direção e abalroou José, morador de rua, que foi socorrido, mas teve as pernas amputadas.\n\nDiante de tal situação hipotética, com base nos princípios aplicáveis ao conflito aparente de normas penais, assinale a afirmativa correta.',
    options: [
      {
        id: 'A',
        text: 'Por força do princípio da consunção, Júnior deverá responder pelo delito de tentativa de homicídio culposo.',
      },
      {
        id: 'B',
        text: 'Por força do princípio da subsidiariedade, Júnior deverá responder pelo delito de lesão corporal de natureza grave.',
      },
      {
        id: 'C',
        text: 'Por força do princípio da especialidade, Júnior deverá responder pelo delito de lesão corporal culposa na direção de veículo automotor.',
      },
      {
        id: 'D',
        text: 'Por força do princípio da alternatividade, Júnior deverá responder pelo delito de dirigir veículo automotor, em via pública, sem a devida habilitação, ou pelo delito de lesão corporal culposa.',
      },
    ],
    correctOption: 'C',
    legalBasis: 'Art. 303 da Lei nº 9.503/1997 (CTB); Princípio da Especialidade (lex specialis derogat legi generali)',
    commentary:
      'A conduta culposa ao volante causadora de lesão corporal amolda-se à norma especial do Art. 303 do Código de Trânsito Brasileiro (lesão corporal culposa na direção de veículo automotor), afastando o tipo geral de lesão corporal culposa do Art. 129, § 6º do CP pelo princípio da especialidade. A ausência de habilitação funciona como causa de aumento de pena (§ 1º). Não existe tentativa de crime culposo.',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa C está correta. O princípio da especialidade resolve o conflito entre o art. 129 do CP e o art. 303 do CTB, aplicando-se o tipo penal específico de trânsito.',
      base_legal: 'Art. 303 da Lei nº 9.503/1997 e Teoria Geral do Crime',
      pegadinha_da_fgv:
        'A alternativa A fala em "tentativa de homicídio culposo", figura dogmaticamente inexistente, pois não se admite tentativa em crimes culposos.',
    },
  },
  {
    id: 4559,
    id_questao: 'oab_fgv_45_dp_59',
    number: 59,
    discipline: 'Direito Penal',
    topic: 'Tentativa Abandonada - Desistência Voluntária (Art. 15 do Código Penal)',
    statement:
      'João é missionário, e Pedro é pastor, ambos da mesma igreja. O primeiro planejou apropriar-se do dinheiro dos dízimos que Pedro costumava guardar em uma urna em seu quarto, localizado nos fundos da igreja.\n\nQuando Pedro se ausentou durante a noite, João pulou o muro e arrombou a fechadura, mas, ao se aproximar da urna, foi tomado por um sentimento sobrenatural, orou para livrar-se dos maus pensamentos e foi embora.\n\nSobre a ação praticada por João, assinale a afirmativa correta.',
    options: [
      {
        id: 'A',
        text: 'João percorreu as fases da cogitação, preparação e execução, que integram o iter criminis, mas não exauriu a conduta, o que era imprescindível para a caracterização da tentativa.',
      },
      {
        id: 'B',
        text: 'João praticou tentativa de furto e ser-lhe-á aplicada a pena do crime consumado a ser reduzida, dentro das margens legais, segundo o trecho do iter criminis que foi percorrido.',
      },
      {
        id: 'C',
        text: 'João praticou tentativa imperfeita de furto, pois, apesar de ter praticado todos os atos executórios, o resultado não foi atingido por circunstâncias sobrenaturais avessas à vontade do agente.',
      },
      {
        id: 'D',
        text: 'João consumou o crime de violação de domicílio, pois, de maneira livre e consciente, ingressou na casa alheia contra a vontade de quem de direito.',
      },
    ],
    correctOption: 'D',
    legalBasis: 'Art. 15 do Código Penal (Desistência Voluntária); Art. 150 do Código Penal',
    commentary:
      'Conforme o Art. 15 do Código Penal, o agente que, voluntariamente, desiste de prosseguir na execução só responde pelos atos já praticados (ponte de ouro). Tendo João desistido voluntariamente de furtar quando ainda podia prosseguir ("posso ir até o fim, mas não quero" - fórmula de Frank), resta descaracterizada a tentativa de furto, respondendo apenas pelos atos já consumados: violação de domicílio / dano.',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa D está correta. A desistência voluntária afasta a punição pela tentativa do crime-fim planejado (furto), remanescendo a responsabilidade penal pelos atos autônomos já consumados até a desistência (violação de domicílio qualificada).',
      base_legal: 'Art. 15 e Art. 150 do Código Penal',
      pegadinha_da_fgv:
        'A FGV tenta classificar como tentativa imperfeita decorrente de causa alheia (alternativa C), mas o sentimento religioso interior e a oração constituem motivação psicológica voluntária do agente que interrompeu o ato por vontade própria.',
    },
  },
  {
    id: 4560,
    id_questao: 'oab_fgv_45_dp_60',
    number: 60,
    discipline: 'Direito Penal',
    topic: 'Aplicação da Lei Penal no Tempo - Crime Permanente e Súmula 711 do STF',
    statement:
      'Abelardo pegou a filha de Geraldo na saída do colégio e a manteve sob seu poder durante cinco dias, liberando-a após ter sido cumprida a exigência de pagamento da quantia de R$ 100.000,00 (cem mil reais).\n\nNo terceiro dia do encarceramento, entrou em vigor uma nova lei que dobrou a pena aplicável ao crime de extorsão mediante sequestro.\n\nSobre a aplicabilidade da nova lei ao caso narrado, assinale a afirmativa correta.',
    options: [
      { id: 'A', text: 'É inaplicável, por força do princípio da retroatividade da lei penal.' },
      { id: 'B', text: 'É aplicável, por força do princípio da alternatividade da lei penal.' },
      { id: 'C', text: 'É aplicável, por força do princípio da continuidade das leis.' },
      { id: 'D', text: 'É inaplicável, por força do princípio da ubiquidade da lei penal.' },
    ],
    correctOption: 'C',
    legalBasis: 'Súmula nº 711 do Supremo Tribunal Federal (STF); Art. 148 e 159 do CP',
    commentary:
      'A extorsão mediante sequestro é crime de natureza permanente, cuja consumação se protrai no tempo enquanto a vítima estiver sob cárcere. Aplica-se a Súmula nº 711 do STF: "A lei penal mais grave aplica-se ao crime continuado ou ao crime permanente, se a sua vigência é anterior à cessação da continuidade ou da permanência". A vigência da lei no 3º dia ocorreu durante a permanência ininterrupta do delito.',
    comentario_educativo: {
      analise_gabarito:
        'A alternativa C está correta. Como a permanência delitiva continuava ativa no momento da entrada em vigor da nova lei, esta incide plenamente sobre a conduta, consoante fixado pela Súmula 711 do STF (princípio da continuidade/permanência).',
      base_legal: 'Súmula nº 711 do Supremo Tribunal Federal (STF)',
      pegadinha_da_fgv:
        'A pegadinha clássica consiste em achar que a lei mais grave é inaplicável por força da irretroatividade in pejus. No crime permanente, a lei nova não retroage: ela incide sobre a conduta que continuou a ser praticada sob sua vigência!',
    },
  },
];
