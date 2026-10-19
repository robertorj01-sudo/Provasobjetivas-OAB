import { Question } from '../types/oab';

export const questions_21_40: Question[] = [
  // 21-25: Direito Tributário
  {
    id: 21,
    number: 21,
    discipline: 'Direito Tributário',
    topic: 'Princípio da Anterioridade e Noventena',
    statement: 'Em 20 de dezembro de determinado ano, o Presidente da República publica lei ordinária majorando a alíquota da Contribuição Social sobre o Lucro Líquido (CSLL). O Fisco federal pretende cobrar a nova alíquota já a partir do dia 1º de janeiro subsequente.',
    options: [
      { id: 'A', text: 'A cobrança é lícita, pois as contribuições sociais submetem-se exclusivamente ao princípio da anterioridade anual.' },
      { id: 'B', text: 'A cobrança é inconstitucional, pois as contribuições sociais para a seguridade social sujeitam-se à anterioridade nonagesimal (noventena), não se aplicando a anterioridade anual ordinária.' },
      { id: 'C', text: 'A cobrança é inconstitucional porque as contribuições devem observar tanto a anterioridade anual quanto a noventena cumulativamente.' },
      { id: 'D', text: 'A CSLL pode ser cobrada no dia seguinte à publicação por ser tributo extrafiscal regulador de mercado.' }
    ],
    correctOption: 'B',
    legalBasis: 'Art. 195, § 6º da Constituição Federal de 1988.',
    commentary: 'As contribuições sociais destinadas à seguridade social (como a CSLL) submetem-se ao princípio da anterioridade nonagesimal (art. 195, § 6º da CF/88 - 90 dias a contar da publicação), sendo expressamente excepcionadas da anterioridade de exercício anual (art. 150, III, "b"). Logo, não podem ser cobradas antes de decorridos 90 dias.',
    difficulty: 'Média',
    examOrigin: '41º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 22,
    number: 22,
    discipline: 'Direito Tributário',
    topic: 'Imunidade Tributária Religiosa e Templos',
    statement: 'Determinada entidade religiosa é proprietária de um imóvel urbano alugado a terceiro particular para fins comerciais. Todo o valor arrecadado com os aluguéis é integralmente revertido e escriturado para as atividades essenciais e manutenção do templo.',
    options: [
      { id: 'A', text: 'O imóvel perde a imunidade do IPTU pelo simples fato de estar locado a pessoa jurídica com fins lucrativos.' },
      { id: 'B', text: 'A imunidade tributária relativa ao IPTU subsiste sobre o imóvel, desde que o valor dos aluguéis seja aplicado nas atividades essenciais da entidade.' },
      { id: 'C', text: 'Apenas templos com cemitério anexo desfrutam de imunidade predial quando locados.' },
      { id: 'D', text: 'A imunidade aplica-se apenas a impostos federais, inexistindo imunidade para tributos municipais.' }
    ],
    correctOption: 'B',
    legalBasis: 'Súmula Vinculante nº 52 do STF e Art. 150, VI, b da CF/88.',
    commentary: 'Conforme a Súmula Vinculante 52 do STF: "Ainda quando alugado a terceiros, permanece imune ao IPTU o imóvel pertencente a qualquer das entidades referidas pelo art. 150, VI, c, da CF/88, desde que o valor dos aluguéis seja aplicado nas atividades para as quais tais entidades foram constituídas". Tal raciocínio também se aplica aos templos de qualquer culto.',
    difficulty: 'Fácil',
    examOrigin: '40º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 23,
    number: 23,
    discipline: 'Direito Tributário',
    topic: 'Suspensão da Exigibilidade do Crédito Tributário',
    statement: 'Um contribuinte foi autuado e ingressou com impugnação administrativa tempestiva contra o lançamento do tributo. Enquanto pendente o julgamento da impugnação no tribunal administrativo, o Fisco ajuíza Execução Fiscal.',
    options: [
      { id: 'A', text: 'A execução fiscal é válida, pois apenas o depósito em dinheiro suspende a cobrança.' },
      { id: 'B', text: 'A execução fiscal é indevida, pois as reclamações e recursos nos processos administrativos fiscais suspendem a exigibilidade do crédito tributário.' },
      { id: 'C', text: 'O crédito tributário extinguiu-se com a simples apresentação da defesa administrativa.' },
      { id: 'D', text: 'A impugnação administrativa interrompe a prescrição, mas não impede a propositura de execução fiscal.' }
    ],
    correctOption: 'B',
    legalBasis: 'Art. 151, inciso III do Código Tributário Nacional (CTN).',
    commentary: 'O art. 151, III, do CTN estatui que suspendem a exigibilidade do crédito tributário as reclamações e os recursos, nos termos das leis reguladoras do processo tributário administrativo. Portanto, pendente julgamento administrativo tempestivo, o crédito está suspenso e não autoriza execução.',
    difficulty: 'Fácil',
    examOrigin: '39º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 24,
    number: 24,
    discipline: 'Direito Tributário',
    topic: 'Responsabilidade Tributária dos Sócios',
    statement: 'Uma sociedade empresária limitada foi dissolvida irregularmente, encerrando suas atividades sem dar baixa nos órgãos competentes e deixando débitos tributários de ICMS. O Fisco pretende redirecionar a execução fiscal para o sócio-gerente à época da dissolução.',
    options: [
      { id: 'A', text: 'O redirecionamento é incabível, pois a responsabilidade dos sócios em sociedades limitadas é sempre restrita ao capital social.' },
      { id: 'B', text: 'Presume-se dissolvida irregularmente a empresa que deixar de funcionar no seu domicílio fiscal sem comunicação aos órgãos competentes, legitimando o redirecionamento da execução fiscal para o sócio-gerente.' },
      { id: 'C', text: 'O redirecionamento só é admitido se houver prévia condenação criminal transitada em julgado por sonegação.' },
      { id: 'D', text: 'A responsabilidade por dissolução irregular recai apenas sobre o contador da empresa.' }
    ],
    correctOption: 'B',
    legalBasis: 'Súmula 435 do STJ e Art. 135, III do CTN.',
    commentary: 'Dispõe a Súmula 435 do STJ: "Presume-se dissolvida irregularmente a empresa que deixar de funcionar no seu domicílio fiscal, sem comunicação aos órgãos competentes, legitimando o redirecionamento da execução fiscal para o sócio-gerente".',
    difficulty: 'Média',
    examOrigin: '38º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 25,
    number: 25,
    discipline: 'Direito Tributário',
    topic: 'Decadência e Prescrição Tributária',
    statement: 'Em relação aos tributos sujeitos a lançamento por homologação, quando o contribuinte declara o débito tributário por meio de DCTF/Guia de Recolhimento, mas não efetua o respectivo pagamento:',
    options: [
      { id: 'A', text: 'O Fisco dispõe de prazo decadencial de 5 anos para proceder ao lançamento de ofício.' },
      { id: 'B', text: 'A entrega de declaração pelo contribuinte reconhecendo débito fiscal constitui o crédito tributário, dispensada qualquer outra providência, passando a correr de imediato o prazo prescricional de 5 anos.' },
      { id: 'C', text: 'O prazo prescricional é de 10 anos contados do primeiro dia do exercício seguinte.' },
      { id: 'D', text: 'A falta de recolhimento torna a declaração nula, exigindo fiscalização presencial.' }
    ],
    correctOption: 'B',
    legalBasis: 'Súmula 436 do STJ e Art. 174 do CTN.',
    commentary: 'Súmula 436 do Superior Tribunal de Justiça: "A entrega de declaração pelo contribuinte reconhecendo débito fiscal constitui o crédito tributário, dispensada qualquer outra providência por parte do fisco". Desse modo, o crédito já está constituído, inaugurando o prazo prescricional quinquenal para cobrança.',
    difficulty: 'Média',
    examOrigin: '41º Exame de Ordem Unificado (FGV)'
  },

  // 26-27: Direito Financeiro
  {
    id: 26,
    number: 26,
    discipline: 'Direito Financeiro',
    topic: 'Lei Orçamentária Anual e Princípio da Exclusividade',
    statement: 'O Governador do Estado encaminhou à Assembleia Legislativa o projeto da Lei Orçamentária Anual (LOA). No bojo do projeto, inseriu-se um dispositivo disciplinando a criação de novos cargos públicos no Poder Executivo e outro autorizando a abertura de créditos suplementares.',
    options: [
      { id: 'A', text: 'Ambos os dispositivos violam o princípio orçamentário da exclusividade.' },
      { id: 'B', text: 'A criação de cargos viola o princípio da exclusividade; porém, a autorização para abertura de créditos suplementares e contratação de operações de crédito é exceção constitucionalmente admitida.' },
      { id: 'C', text: 'Ambos os dispositivos são constitucionais, pois a LOA pode albergar qualquer norma de interesse da administração estadual.' },
      { id: 'D', text: 'A LOA não pode conter qualquer autorização para créditos suplementares, exigindo-se sempre lei autônoma específica.' }
    ],
    correctOption: 'B',
    legalBasis: 'Art. 165, § 8º da Constituição Federal de 1988.',
    commentary: 'O princípio da exclusividade (art. 165, § 8º, CF) dispõe que a lei orçamentária anual não conterá dispositivo estranho à previsão da receita e à fixação da despesa, não se incluindo na proibição a autorização para abertura de créditos suplementares e contratação de operações de crédito, ainda que por antecipação de receita. Criação de cargos é matéria estranha e inconstitucional na LOA.',
    difficulty: 'Média',
    examOrigin: '41º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 27,
    number: 27,
    discipline: 'Direito Financeiro',
    topic: 'Créditos Adicionais',
    statement: 'Em razão de fortes tempestades e calamidade pública imprevista que destruiu pontes e rodovias no interior de um Estado, o Governador necessita realizar despesas urgentes e imprevisíveis não computadas no orçamento anual. O instrumento orçamentário adequado para essa finalidade é o crédito adicional:',
    options: [
      { id: 'A', text: 'Suplementar, destinado a reforçar dotação orçamentária existente.' },
      { id: 'B', text: 'Especial, destinado a despesas para as quais não haja dotação orçamentária específica.' },
      { id: 'C', text: 'Extraordinário, destinado a despesas urgentes e imprevistas, em caso de guerra, comoção intestina ou calamidade pública.' },
      { id: 'D', text: 'Vinculado, privativo de operações de câmbio internacional.' }
    ],
    correctOption: 'C',
    legalBasis: 'Art. 167, § 3º da CF/88 e Art. 41, III da Lei nº 4.320/64.',
    commentary: 'Os créditos extraordinários destinam-se a despesas imprevisíveis e urgentes, como as decorrentes de guerra, comoção interna ou calamidade pública (art. 167, § 3º, CF/88 e art. 41, III, da Lei 4.320/64), podendo inclusive ser abertos por medida provisória na esfera federal ou decreto onde couber.',
    difficulty: 'Fácil',
    examOrigin: '40º Exame de Ordem Unificado (FGV)'
  },

  // 28-32: Direito Administrativo
  {
    id: 28,
    number: 28,
    discipline: 'Direito Administrativo',
    topic: 'Nova Lei de Licitações (Lei 14.133/2021)',
    statement: 'A Administração Pública pretende contratar obras e serviços de engenharia de valor estimado em R$ 80.000,00 (oitenta mil reais) para reforma de uma escola pública municipal. À luz da Nova Lei de Licitações e Contratos Administrativos (Lei nº 14.133/2021), essa contratação:',
    options: [
      { id: 'A', text: 'Exige obrigatoriamente a modalidade concorrência pública com ampla publicidade.' },
      { id: 'B', text: 'Pode ser realizada mediante dispensa de licitação em razão do valor, respeitados os limites legais e a preferência por processo eletrônico.' },
      { id: 'C', text: 'Configura caso de inexigibilidade de licitação pela notoriedade do objeto.' },
      { id: 'D', text: 'Deve seguir a modalidade convite, extinta apenas para a União.' }
    ],
    correctOption: 'B',
    legalBasis: 'Art. 75, inciso I da Lei nº 14.133/2021.',
    commentary: 'Conforme art. 75, I da Lei 14.133/2021, é dispensável a licitação para contratação que envolva valores inferiores a R$ 100.000,00 (atualmente atualizados periodicamente por decreto federal para valores acima de R$ 119 mil) no caso de obras e serviços de engenharia ou de serviços de manutenção de veículos automotores.',
    difficulty: 'Fácil',
    examOrigin: '41º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 29,
    number: 29,
    discipline: 'Direito Administrativo',
    topic: 'Responsabilidade Civil do Estado',
    statement: 'Um veículo pertencente a uma concessionária privada de transporte coletivo de passageiros atropelou um pedestre que atravessava regularmente a faixa de pedestres, causando-lhe fraturas graves. O pedestre não era usuário do serviço de transporte. De acordo com o STF e a Constituição:',
    options: [
      { id: 'A', text: 'A concessionária só responderá se o pedestre comprovar dolo ou culpa do motorista.' },
      { id: 'B', text: 'Aplica-se a responsabilidade civil objetiva da concessionária prestadora de serviço público, tanto em relação a usuários quanto a terceiros não usuários.' },
      { id: 'C', text: 'A responsabilidade recai exclusivamente sobre o Poder Concedente (Município).' },
      { id: 'D', text: 'Apenas a responsabilidade subjetiva incide sobre pessoas jurídicas de direito privado concessionárias.' }
    ],
    correctOption: 'B',
    legalBasis: 'Art. 37, § 6º da CF/88 e Tema 130 de Repercussão Geral do STF (RE 580.252).',
    commentary: 'O STF fixou que a responsabilidade civil das pessoas jurídicas de direito privado prestadoras de serviço público é objetiva relativamente a terceiros usuários e não usuários do serviço, com base no art. 37, § 6º da Constituição da República.',
    difficulty: 'Fácil',
    examOrigin: '40º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 30,
    number: 30,
    discipline: 'Direito Administrativo',
    topic: 'Atos Administrativos - Anulação e Revogação',
    statement: 'A autoridade administrativa competente constatou que um ato administrativo concessivo de licença para construir foi praticado com vício insanável de legalidade (fraude em certidão ambiental). Diante dessa situação, a Administração Pública:',
    options: [
      { id: 'A', text: 'Deve revogar o ato por razões de conveniência e oportunidade, com efeitos ex nunc.' },
      { id: 'B', text: 'Deve anular o ato por motivo de ilegalidade, produzindo a anulação efeitos retroativos (ex tunc), ressalvados os direitos de terceiros de boa-fé.' },
      { id: 'C', text: 'Não pode anular o ato se decorridos mais de 30 dias de sua publicação.' },
      { id: 'D', text: 'Depende impreterivelmente de ação judicial para desconstituir o ato com vício de legalidade.' }
    ],
    correctOption: 'B',
    legalBasis: 'Súmula 473 do STF e Art. 53 da Lei nº 9.784/99.',
    commentary: 'Súmula 473 do STF: "A administração pode anular seus próprios atos, quando eivados de vícios que os tornam ilegais, porque deles não se originam direitos; ou revogá-los, por motivo de conveniência ou oportunidade, respeitados os direitos adquiridos...". A anulação gera efeitos ex tunc.',
    difficulty: 'Fácil',
    examOrigin: '39º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 31,
    number: 31,
    discipline: 'Direito Administrativo',
    topic: 'Improbidade Administrativa (Lei 8.429/92 alterada pela Lei 14.230/2021)',
    statement: 'Um servidor público municipal, por manifesta negligência e inexperiência funcional, equivocou-se na conferência de notas fiscais, acarretando pagamento indevido de pequeno valor pelo erário municipal. Não houve qualquer intenção fraudulenta ou benefício próprio. Consoante a Lei nº 14.230/2021:',
    options: [
      { id: 'A', text: 'O servidor responderá por ato de improbidade administrativa culposa que causou lesão ao erário.' },
      { id: 'B', text: 'Não se configura ato de improbidade administrativa, pois a lei passou a exigir expressamente a comprovação de dolo específico para todas as modalidades de improbidade.' },
      { id: 'C', text: 'Aplica-se a perda automática do cargo público independentemente de processo judicial.' },
      { id: 'D', text: 'A improbidade administrativa independe do elemento subjetivo do agente.' }
    ],
    correctOption: 'B',
    legalBasis: 'Art. 1º, §§ 1º, 2º e 3º da Lei nº 8.429/92, com redação da Lei nº 14.230/2021.',
    commentary: 'A Lei nº 14.230/2021 revogou expressamente a modalidade culposa de improbidade administrativa. O art. 1º, § 1º agora prevê que consideram-se atos de improbidade apenas as condutas dolosas tipificadas em lei, exigindo o dolo específico de obter proveito ou benefício indevido.',
    difficulty: 'Média',
    examOrigin: '41º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 32,
    number: 32,
    discipline: 'Direito Administrativo',
    topic: 'Desapropriação por Utilidade Pública',
    statement: 'O Município Alfa publicou decreto expropriatório declarando de utilidade pública o imóvel de Juliana para a construção de um hospital. Juliana discorda do valor da indenização ofertada administrativamente pelo Poder Executivo.',
    options: [
      { id: 'A', text: 'Juliana é obrigada a aceitar o valor fixado, sob pena de confisco administrativo imediato.' },
      { id: 'B', text: 'A indenização na desapropriação comum por necessidade ou utilidade pública deve ser justa, prévia e em dinheiro, ressalvadas as hipóteses constitucionais específicas.' },
      { id: 'C', text: 'A indenização será sempre paga em títulos da dívida agrária resgatáveis em 20 anos.' },
      { id: 'D', text: 'O Município tem direito à imissão provisória na posse independentemente de depósito prévio de qualquer valor.' }
    ],
    correctOption: 'B',
    legalBasis: 'Art. 5º, inciso XXIV da Constituição Federal de 1988 e Decreto-Lei nº 3.365/41.',
    commentary: 'O art. 5º, XXIV da CF/88 consagra a regra geral de que a desapropriação por necessidade ou utilidade pública, ou por interesse social, exige justa e prévia indenização em dinheiro, cabendo ao Judiciário fixar o quantum se não houver acordo.',
    difficulty: 'Fácil',
    examOrigin: '38º Exame de Ordem Unificado (FGV)'
  },

  // 33-34: Direito Ambiental
  {
    id: 33,
    number: 33,
    discipline: 'Direito Ambiental',
    topic: 'Responsabilidade por Dano Ambiental',
    statement: 'Um vazamento de óleo provocado pelo naufrágio de um navio petroleiro causou graves danos à fauna marinha e à subsistência de pescadores locais. Em tema de responsabilidade civil por dano ambiental no direito brasileiro:',
    options: [
      { id: 'A', text: 'A responsabilidade é subjetiva, exigindo comprovação de culpa grave dos tripulantes.' },
      { id: 'B', text: 'A responsabilidade é objetiva, informada pela teoria do risco integral, não admitindo a invocação de caso fortuito ou força maior como excludentes.' },
      { id: 'C', text: 'A obrigação de reparar o dano prescreve no prazo comum de três anos do Código Civil.' },
      { id: 'D', text: 'A responsabilidade ambiental limita-se à sanção de multa administrativa aplicada pelo Ibama.' }
    ],
    correctOption: 'B',
    legalBasis: 'Art. 225, § 3º da CF/88, Art. 14, § 1º da Lei 6.938/81 e Tema 999 do STF.',
    commentary: 'A responsabilidade civil ambiental é objetiva fundada na teoria do risco integral (jurisprudência consolidada do STJ e STF), repelindo excludentes como caso fortuito ou força maior. Ademais, a pretensão de reparação civil por dano ambiental é imprescritível (Tema 999/STF).',
    difficulty: 'Média',
    examOrigin: '41º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 34,
    number: 34,
    discipline: 'Direito Ambiental',
    topic: 'Princípios da Prevenção e Precaução',
    statement: 'Diante de projeto de introdução de uma tecnologia com efeitos desconhecidos para os ecossistemas, não havendo certeza científica absoluta sobre o potencial de danos graves ou irreversíveis, o órgão ambiental determina medidas impeditivas. O princípio aplicado é:',
    options: [
      { id: 'A', text: 'Princípio do Poluidor-Pagador.' },
      { id: 'B', text: 'Princípio da Precaução, segundo o qual a incerteza científica não deve servir de razão para adiar a adoção de medidas eficazes para evitar a degradação ambiental.' },
      { id: 'C', text: 'Princípio da Prevenção, aplicável apenas a perigos certos e mensuráveis cientificamente.' },
      { id: 'D', text: 'Princípio da Livre Iniciativa Produtiva.' }
    ],
    correctOption: 'B',
    legalBasis: 'Princípio 15 da Declaração do Rio sobre Meio Ambiente e Desenvolvimento (Rio/92).',
    commentary: 'A distinção clássica aponta que o princípio da prevenção atua diante do risco certo e conhecido da atividade humana; já o princípio da precaução aplica-se exatamente na incerteza científica quanto a danos graves ou irreversíveis, invertendo o ônus da prova e impondo cautela preventiva.',
    difficulty: 'Fácil',
    examOrigin: '40º Exame de Ordem Unificado (FGV)'
  },

  // 35-40: Direito Civil
  {
    id: 35,
    number: 35,
    discipline: 'Direito Civil',
    topic: 'Prescrição e Decadência',
    statement: 'Gustavo sofreu lesões corporais em um acidente de trânsito causado por imprudência comprovada do motorista Vinícius. Para pleitear a reparação civil por danos materiais e estéticos, Gustavo submete-se a prazo:',
    options: [
      { id: 'A', text: 'Decadencial de 1 ano contado da alta hospitalar.' },
      { id: 'B', text: 'Prescricional de 3 (três) anos, nos termos da pretensão de reparação civil prevista no Código Civil.' },
      { id: 'C', text: 'Prescricional de 5 (cinco) anos com base na regra geral residual.' },
      { id: 'D', text: 'Imprescritível por envolver integridade física.' }
    ],
    correctOption: 'B',
    legalBasis: 'Art. 206, § 3º, inciso V do Código Civil de 2002.',
    commentary: 'O art. 206, § 3º, V do CC/2002 estabelece que prescreve em 3 (três) anos a pretensão de reparação civil em responsabilidade extracontratual aquiliana.',
    difficulty: 'Fácil',
    examOrigin: '41º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 36,
    number: 36,
    discipline: 'Direito Civil',
    topic: 'Direito de Família - Alimentos Avoengos',
    statement: 'O pai de um menor de idade foi preso e não possui bens nem rendimentos para prestar os alimentos devidos ao filho. A mãe da criança pretende acionar os avós paternos para o pagamento de pensão alimentícia.',
    options: [
      { id: 'A', text: 'Os avós não respondem sob nenhuma hipótese por débitos de filhos maiores de idade.' },
      { id: 'B', text: 'A obrigação alimentar dos avós tem natureza subsidiária e complementar, exigindo-se a demonstração da impossibilidade total ou parcial de prestação pelo genitor.' },
      { id: 'C', text: 'Os avós paternos e maternos respondem solidariamente desde o nascimento da criança.' },
      { id: 'D', text: 'A ação contra os avós só pode ser proposta após o término de execução penal do genitor.' }
    ],
    correctOption: 'B',
    legalBasis: 'Súmula 596 do STJ e Art. 1.696 c/c 1.698 do Código Civil.',
    commentary: 'Súmula 596 do STJ: "A obrigação alimentar dos avós tem natureza subsidiária e complementar, somente se configurando no caso de impossibilidade total ou parcial de seu cumprimento pelos pais".',
    difficulty: 'Fácil',
    examOrigin: '40º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 37,
    number: 37,
    discipline: 'Direito Civil',
    topic: 'Direito das Sucessões - Herdeiros Necessários',
    statement: 'Eduardo faleceu viúvo, deixando patrimônio líquido no valor de R$ 1.000.000,00, dois filhos vivos e um testamento público no qual destinou R$ 700.000,00 a um amigo de infância. O testamento de Eduardo:',
    options: [
      { id: 'A', text: 'É plenamente válido, pois vigora a ampla liberdade de testar sem limites patrimoniais.' },
      { id: 'B', text: 'Padece de ineficácia/redução testamentária no excesso, pois tendo o testador herdeiros necessários (filhos), a parte disponível é limitada a 50% da herança.' },
      { id: 'C', text: 'É integralmente nulo, voltando todo o patrimônio para sucessão legítima dos filhos.' },
      { id: 'D', text: 'Gera a perda do direito sucessório do amigo e dos filhos em benefício do Município.' }
    ],
    correctOption: 'B',
    legalBasis: 'Art. 1.789 e Art. 1.967 do Código Civil.',
    commentary: 'Havendo herdeiros necessários (descendentes, ascendentes e cônjuge - art. 1.845, CC), o testador só pode dispor da metade da herança (art. 1.789, CC). A disposição que ultrapassar a parte disponível será reduzida aos limites dela (art. 1.967, CC).',
    difficulty: 'Média',
    examOrigin: '39º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 38,
    number: 38,
    discipline: 'Direito Civil',
    topic: 'Direitos Reais - Usucapião Extraordinária',
    statement: 'Helena exerce posse mansa, pacífica, contínua e sem oposição de um imóvel residencial urbano há 16 anos ininterruptos, com animus domini. Helena não possui justo título nem boa-fé subjetiva.',
    options: [
      { id: 'A', text: 'Helena não pode adquirir o imóvel por usucapião devido à ausência de justo título.' },
      { id: 'B', text: 'Helena faz jus à declaração de usucapião extraordinária, cujo prazo é de 15 anos, independentemente de justo título e boa-fé.' },
      { id: 'C', text: 'A usucapião exige sempre comprovação de pagamento de IPTU pelo proprietário registral.' },
      { id: 'D', text: 'A usucapião urbana não pode ultrapassar a metragem de 100 metros quadrados em qualquer hipótese.' }
    ],
    correctOption: 'B',
    legalBasis: 'Art. 1.238, caput, do Código Civil de 2002.',
    commentary: 'A usucapião extraordinária (art. 1.238 do CC) exige posse mansa, pacífica e ininterrupta por 15 anos com animus domini, operando-se a aquisição originária da propriedade independentemente de título e boa-fé.',
    difficulty: 'Fácil',
    examOrigin: '40º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 39,
    number: 39,
    discipline: 'Direito Civil',
    topic: 'Teoria Geral dos Contratos - Vícios Redibitórios',
    statement: 'Renato comprou um veículo usado de Bruno. Duas semanas após a aquisição, o motor fundiu em razão de uma trinca interna preexistente à alienação e oculta aos olhos de um homem médio. Diante do vício redibitório, Renato pode:',
    options: [
      { id: 'A', text: 'Apenas pleitear perdas e danos na esfera criminal.' },
      { id: 'B', text: 'Rejeitar a coisa, redibindo o contrato, ou reclamar abatimento proporcional do preço através das ações edilícias.' },
      { id: 'C', text: 'Exigir novo veículo zero quilômetro da montadora com base na responsabilidade pelo fato do produto.' },
      { id: 'D', text: 'Aguardar o prazo prescricional de 10 anos para qualquer medida reparatória.' }
    ],
    correctOption: 'B',
    legalBasis: 'Arts. 441 e 442 do Código Civil.',
    commentary: 'A coisa recebida em virtude de contrato comutativo pode ser enjeitada por vícios ou defeitos ocultos que a tornem imprópria ao uso a que é destinada, ou lhe diminuam o valor (art. 441, CC). Em vez de rescindir o contrato (ação redibitória), pode o adquirente reclamar abatimento no preço (ação estimatória/quanti minoris - art. 442, CC).',
    difficulty: 'Fácil',
    examOrigin: '38º Exame de Ordem Unificado (FGV)'
  },
  {
    id: 40,
    number: 40,
    discipline: 'Direito Civil',
    topic: 'Negócio Jurídico - Defeitos do Negócio Jurídico',
    statement: 'Sob ameaça grave e iminente de morte à sua filha exercida por um grupo armado, Leonardo transfere seu apartamento pelo valor simbólico de R$ 1.000,00 ao líder do bando criminoso. Esse negócio jurídico padece de vício de consentimento por:',
    options: [
      { id: 'A', text: 'Erro substancial.' },
      { id: 'B', text: 'Coação moral, caracterizada pela ameaça capaz de incutir na vítima fundado receio de dano iminente e considerável à sua pessoa ou família.' },
      { id: 'C', text: 'Fraude contra credores, dispensando anulação judicial.' },
      { id: 'D', text: 'Lesão simples por inexperiência de mercado.' }
    ],
    correctOption: 'B',
    legalBasis: 'Arts. 151 e 171, II do Código Civil.',
    commentary: 'A coação (art. 151 do Código Civil) vicia o consentimento quando incute no paciente fundado receio de dano iminente e considerável à sua pessoa, à sua família, ou aos seus bens, tornando o negócio jurídico anulável nos moldes do art. 171, II, do CC.',
    difficulty: 'Fácil',
    examOrigin: '41º Exame de Ordem Unificado (FGV)'
  }
];
