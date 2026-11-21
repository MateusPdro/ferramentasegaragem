export const SEED_CATEGORIES = [
  {
    id: 'cat-eletricas',
    slug: 'ferramentas-eletricas',
    name: 'Ferramentas elétricas',
    shortName: 'Elétricas',
    description:
      'Análises técnicas de furadeiras, parafusadeiras a bateria, esmerilhadeiras angulares, marteletes, serras e chaves de impacto.',
    imageUrl: '/src/assets/images/cat_power_tools_1795185272335.jpg',
    subtopics: [
      'Furadeiras',
      'Parafusadeiras',
      'Esmerilhadeiras',
      'Serras circulares',
      'Serras tico-tico',
      'Lixadeiras',
      'Marteletes',
      'Chaves de impacto',
      'Ferramentas a bateria',
    ],
    displayOrder: 1,
  },
  {
    id: 'cat-manuais',
    slug: 'ferramentas-manuais',
    name: 'Ferramentas manuais',
    shortName: 'Manuais',
    description:
      'Jogos de soquetes, chaves combinadas, catracas, torquímetros, alicates e maletas organizadas para oficina e manutenção.',
    imageUrl: '/src/assets/images/cat_hand_tools_1795185271926.jpg',
    subtopics: [
      'Jogos de ferramentas',
      'Kits de soquetes',
      'Chaves combinadas',
      'Chaves de fenda e Philips',
      'Alicates',
      'Catracas',
      'Torquímetros',
      'Maletas de ferramentas',
    ],
    displayOrder: 2,
  },
  {
    id: 'cat-automotivo',
    slug: 'equipamentos-automotivos',
    name: 'Equipamentos automotivos',
    shortName: 'Automotivo',
    description:
      'Scanners OBD2, carregadores inteligentes de bateria 12V, auxiliares de partida, macacos hidráulicos e compressores.',
    imageUrl: '/src/assets/images/cat_automotive_gear_1795185272682.jpg',
    subtopics: [
      'Scanners automotivos',
      'Leitores OBD2',
      'Carregadores de bateria',
      'Auxiliares de partida',
      'Macacos hidráulicos',
      'Compressores de ar',
      'Equipamentos de diagnóstico',
    ],
    displayOrder: 3,
  },
  {
    id: 'cat-limpeza',
    slug: 'limpeza-e-acessorios',
    name: 'Limpeza e acessórios',
    shortName: 'Limpeza',
    description:
      'Lavadoras de alta pressão residenciais e semiprofissionais, aspiradores, extratoras e acessórios para detalhamento automotivo.',
    imageUrl: '/src/assets/images/cat_pressure_washers_1795185272064.jpg',
    subtopics: [
      'Lavadoras de alta pressão',
      'Aspiradores',
      'Extratoras',
      'Limpeza automotiva',
      'Detalhamento',
      'Acessórios de manutenção',
    ],
    displayOrder: 4,
  },
];

export const SEED_PRODUCTS = [
  {
    id: 'prod-tb-21px',
    slug: 'parafusadeira-the-black-tools-tb-21px',
    title: 'Análise da Parafusadeira The Black Tools TB-21PX',
    name: 'Parafusadeira e Furadeira de Impacto The Black Tools TB-21PX',
    brand: 'The Black Tools',
    model: 'TB-21PX',
    categorySlug: 'ferramentas-eletricas',
    toolType: 'Parafusadeira e Furadeira a Bateria',
    application: 'Montagem, madeira, metal leve e alvenaria ocasional',
    shortDescription:
      'Kit sem fio de 21V com duas baterias de lítio 2.0 Ah, torque máximo de 35 Nm, função impacto e maleta com acessórios.',
    introduction:
      'A The Black Tools TB-21PX é uma parafusadeira e furadeira de impacto a bateria projetada para atender manutenções residenciais, montagem de móveis e pequenos reparos em oficina. Seu grande atrativo é entregar duas baterias de 21V na maleta padrão, evitando interrupções durante o trabalho.',
    imageUrl: '/src/assets/images/cat_power_tools_1795185272335.jpg',
    specs: {
      marca: 'The Black Tools',
      modelo: 'TB-21PX',
      categoria: 'Ferramentas elétricas',
      potencia: 'Não informado (alimentação 21V DC)',
      voltagem: 'Bateria 21V Íon-Lítio 2.000 mAh (carregador bivolt)',
      torque: '35 Nm (18 + 3 posições de ajuste)',
      rotacao: '0–400 RPM (1ª marcha) / 0–1.400 RPM (2ª marcha)',
      capacidade: 'Mandril 3/8" (10 mm) de aperto rápido; impacto aprox. 17.000 IPM',
      peso: 'Aprox. 1,5 kg (ferramenta com bateria)',
      dimensoes: 'Não informado',
      acessoriosInclusos: 'Maleta, 2 baterias 21V, carregador bivolt, kit sortido de brocas, bits, soquetes e extensor flexível',
      garantia: 'Conforme política do fabricante / importador',
    },
    highlights: ['Torque máximo de 35 Nm', '2 baterias 21V de 2.0 Ah', 'Mandril 3/8" de aperto rápido', 'Função martelete para alvenaria leve'],
    featuresText:
      'O conjunto conta com caixa de engrenagens de duas velocidades mecânicas: a primeira faixa (até 400 RPM) prioriza controle e força no aperto de parafusos, enquanto a segunda (até 1.400 RPM) acelera perfurações em madeira e chapas metálicas. O anel seletor oferece 18 estágios de embreagem para evitar espanar cabeças de parafusos, além de posições dedicadas para perfuração simples e com impacto. Inclui iluminação LED frontal e empunhadura emborrachada.',
    pros: [
      'Acompanha duas baterias de 2.0 Ah no kit padrão, permitindo revezamento contínuo.',
      'Carregador bivolt automático compatível com redes 127V e 220V.',
      'Função impacto auxilia em furos leves em tijolo e reboco com broca adequada.',
      'Kit completo com maleta rígida e acessórios iniciais de uso imediato.',
    ],
    cons: [
      'Torque de 35 Nm é adequado para uso leve a médio, não substituindo marteletes SDS em concreto estrutural.',
      'Mandril de 3/8" (10 mm) limita o uso de brocas de haste mais grossa que equipamentos de 1/2".',
      'Tempo médio de recarga em torno de 2 horas exige planejamento em serviços intensos.',
    ],
    targetAudience:
      'Indicada para uso doméstico exigente, montadores de móveis, instaladores leves e entusiastas de garagem que precisam de mobilidade sem fio e duas baterias na mesma maleta.',
    comparisonNotes:
      'Frente a modelos de entrada 12V (como a WAP WF 12K3.2 de 25 Nm), a TB-21PX entrega maior reserva de torque (35 Nm), função impacto para alvenaria leve e uma segunda bateria inclusa de fábrica.',
    faq: [
      {
        question: 'A The Black Tools TB-21PX fura parede de concreto?',
        answer:
          'Ela possui função impacto para perfurações leves em tijolo e alvenaria comum com brocas de vídea até 8–10 mm. Para concreto estrutural maciço ou vigas, recomenda-se um martelete SDS Plus.',
      },
      {
        question: 'O carregador que acompanha a maleta é bivolt?',
        answer:
          'Sim, a versão padrão da TB-21PX acompanha carregador bivolt (110V/220V).',
      },
      {
        question: 'As duas baterias já vêm no kit?',
        answer:
          'Na configuração padrão comercializada como TB-21PX, o kit inclui 2 baterias de íons de lítio de 21V (2.000 mAh), embora seja sempre recomendável conferir a descrição do anúncio antes da compra.',
      },
    ],
    featured: true,
    status: 'published',
  },
  {
    id: 'prod-karcher-k2',
    slug: 'lavadora-karcher-k2-compacta',
    title: 'Análise da Lavadora de Alta Pressão Kärcher K2 Compacta',
    name: 'Lavadora de Alta Pressão Kärcher Linha K2 Compacta',
    brand: 'Kärcher',
    model: 'K2 Compacta / K2 Plus',
    categorySlug: 'limpeza-e-acessorios',
    toolType: 'Lavadora de alta pressão',
    application: 'Limpeza de veículos, quintais, calçadas e garagens',
    shortDescription:
      'Lavadora compacta de 1.400W e vazão de 300 L/h projetada para lavagens residenciais rápidas com baixo consumo de água.',
    introduction:
      'A linha Kärcher K2 Compacta (e sua variante K2 Plus) é uma das portas de entrada mais conhecidas para limpeza residencial e lavagem ocasional de carros, motos e bicicletas. O foco do projeto é portabilidade, facilidade de armazenamento e economia de água em comparação à mangueira comum.',
    imageUrl: '/src/assets/images/cat_pressure_washers_1795185272064.jpg',
    specs: {
      marca: 'Kärcher',
      modelo: 'Linha K2 Compacta / K2 Plus',
      categoria: 'Limpeza e acessórios',
      potencia: '1.400 W',
      voltagem: '127V ou 220V (escolher conforme rede elétrica)',
      pressao: '103 bar / 1.500 PSI (K2 Compacta) até 120 bar / 1.740 PSI (K2 Plus)',
      vazao: '300 L/h (máxima)',
      peso: '4,3 kg a 5,5 kg (conforme versão e tensão)',
      dimensoes: 'Não informado',
      acessoriosInclusos: 'Pistola, lança com jato reto/leque e mangueira de alta pressão de 3 m (varia conforme kit)',
      garantia: '12 meses (padrão fabricante Brasil)',
    },
    highlights: ['Motor de 1.400 W', 'Vazão de 300 L/h', 'Estrutura compacta de ~4,3 a 5,5 kg', 'Economia de água frente à mangueira comum'],
    featuresText:
      'Equipada com motor universal e bomba axial, a linha K2 entrega jato de alta pressão suficiente para soltar barro de caixas de roda, limpar pisos externos sem crostas pesadas e lavar motos ou automóveis em uso residencial. O peso reduzido e a alça superior facilitam o transporte por escadas ou pequenos quintais.',
    pros: [
      'Corpo leve e muito compacto, fácil de guardar em apartamentos ou garagens pequenas.',
      'Ampla disponibilidade de peças de reposição e acessórios compatíveis no mercado brasileiro.',
      'Pressão equilibrada para pintura automotiva quando usada à distância segura.',
    ],
    cons: [
      'Mangueira de 3 metros e cabo elétrico curto exigem reposicionamento frequente ao redor do carro.',
      'Motor universal com escovas não é dimensionado para uso contínuo comercial ou lava-rápidos.',
      'Atenção à voltagem no ato da compra, pois o equipamento não é bivolt.',
    ],
    targetAudience:
      'Proprietários de residências, motociclistas e entusiastas que lavam o próprio carro nos finais de semana e priorizam pouco espaço de armazenamento.',
    comparisonNotes:
      'Comparada à WAP WL 1800 (1.400W, 1.500 PSI e 360 L/h), a Kärcher K2 apresenta vazão ligeiramente menor (300 L/h), mas destaca-se pela rede de assistência e linha ampla de acessórios originais.',
    faq: [
      {
        question: 'A Kärcher K2 pode ser usada para lavar carros sem danificar a pintura?',
        answer:
          'Sim, desde que utilizada com o bico regulado em leque aberto e mantendo distância segura da lataria, especialmente em áreas com verniz sensível ou adesivos.',
      },
      {
        question: 'Qual a diferença entre K2 Compacta e K2 Plus?',
        answer:
          'A K2 Compacta tradicional trabalha na faixa de 1.500 PSI (103 bar), enquanto versões K2 Plus / Exclusive atingem até 1.740 PSI (120 bar) mantendo 1.400 W de potência.',
      },
    ],
    featured: true,
    status: 'published',
  },
  {
    id: 'prod-wap-wl-1800',
    slug: 'lavadora-wap-wl-1800',
    title: 'Análise da Lavadora de Alta Pressão WAP WL 1800',
    name: 'Lavadora de Alta Pressão WAP WL 1800',
    brand: 'WAP',
    model: 'WL 1800',
    categorySlug: 'limpeza-e-acessorios',
    toolType: 'Lavadora de alta pressão',
    application: 'Lavagem de calçadas, paredes, veículos e áreas externas',
    shortDescription:
      'Lavadora leve de 3 kg com 1.400W de potência, pressão máxima de 1.500 PSI, vazão de até 360 L/h e sistema Stop Total.',
    introduction:
      'A WAP WL 1800 ocupa a faixa de entrada leve da marca brasileira, oferecendo um conjunto direto para quem busca agilidade em limpezas domésticas. Com apenas 3 kg de peso líquido, combina 1.400W de potência e sistema Stop Total para evitar desperdício de energia.',
    imageUrl: '/src/assets/images/cat_pressure_washers_1795185272064.jpg',
    specs: {
      marca: 'WAP',
      modelo: 'WL 1800',
      categoria: 'Limpeza e acessórios',
      potencia: '1.400 W',
      voltagem: '127V ou 220V (modelo específico por tensão)',
      pressao: '1.500 PSI máxima (1.015 PSI / 7 MPa nominal)',
      vazao: '360 L/h máxima (270 L/h nominal)',
      peso: '3,0 kg (peso líquido)',
      dimensoes: 'Não informado',
      acessoriosInclusos: 'Pistola com engate rápido, baioneta, lança com bico regulável (leque e concentrado) e mangueira de 3 m',
      garantia: '12 meses (conforme certificado WAP)',
    },
    highlights: ['Peso líquido de apenas 3,0 kg', 'Vazão máxima de 360 L/h', 'Sistema Stop Total automático', 'Engate rápido na pistola'],
    featuresText:
      'O sistema Stop Total interrompe automaticamente o fluxo de água e desliga o motor quando o operador solta o gatilho, preservando a bomba e reduzindo consumo elétrico. O bico regulável permite alternar rapidamente entre o jato leque (para enxágue automotivo) e o jato concentrado (para sujeira incrustada em rejuntes).',
    pros: [
      'Extremamente leve (3 kg), facilitando transporte com uma mão.',
      'Vazão máxima de 360 L/h entrega bom volume de enxágue na categoria de 1.400W.',
      'Sistema Stop Total protege o motor durante pausas rápidas.',
    ],
    cons: [
      'Mangueira de alta pressão de 3 metros limita o raio de ação sem mover o equipamento.',
      'Motor universal indicado para uso ocasional/residencial, com pausas recomendadas em jornadas longas.',
    ],
    targetAudience:
      'Consumidores residenciais que buscam uma lavadora muito leve para quintais, garagens, bicicletas e carros de passeio.',
    comparisonNotes:
      'Em relação à Kärcher K2 Compacta, a WAP WL 1800 pesa menos (3,0 kg) e oferece maior vazão máxima declarada (360 L/h contra 300 L/h).',
    faq: [
      {
        question: 'O que faz o sistema Stop Total na WAP WL 1800?',
        answer:
          'Ele desliga o motor instantaneamente ao soltar o gatilho da pistola, economizando energia elétrica e evitando sobrepressão interna na bomba.',
      },
      {
        question: 'A mangueira de 3 metros dá a volta em um carro inteiro?',
        answer:
          'Normalmente é necessário deslocar a lavadora pelo menos uma vez ao redor do veículo ou utilizar mangueira compatível mais longa adquirida separadamente.',
      },
    ],
    featured: false,
    status: 'published',
  },
  {
    id: 'prod-kit-46-pecas',
    slug: 'kit-ferramentas-46-pecas-soquetes',
    title: 'Análise do Jogo de Ferramentas e Soquetes 46 Peças (Encaixe 1/4")',
    name: 'Kit de Ferramentas e Soquetes 46 Peças 1/4" Cromo-Vanádio',
    brand: 'Referência Multimarca (Cr-V)',
    model: 'Jogo 46 Peças 1/4"',
    categorySlug: 'ferramentas-manuais',
    toolType: 'Kit de soquetes e catraca',
    application: 'Manutenção automotiva leve, motos, bicicletas e reparos domésticos',
    shortDescription:
      'Maleta compacta com catraca reversível de 1/4", soquetes métricos de 4 a 14 mm, bits Torx/Allen/Phillips, extensões e junta universal.',
    introduction:
      'O jogo de ferramentas de 46 peças com encaixe de 1/4 de polegada é um dos conjuntos mais versáteis para manter no porta-malas ou na bancada de garagem. Padronizado em diversas marcas no Brasil, reúne soquetes métricos curtos, pontas de parafusamento e acessórios de articulação para áreas apertadas.',
    imageUrl: '/src/assets/images/cat_hand_tools_1795185271926.jpg',
    specs: {
      marca: 'Disponível em diversas marcas (preferir aço Cr-V)',
      modelo: 'Conjunto 46 Peças Encaixe 1/4"',
      categoria: 'Ferramentas manuais',
      capacidade: 'Soquetes métricos 4 mm a 14 mm (encaixe quadrado 1/4")',
      peso: 'Aprox. 1,1 kg a 1,4 kg (conforme fabricante)',
      dimensoes: 'Maleta compacta (varia por fabricante)',
      acessoriosInclusos: 'Catraca reversível 1/4", 13 soquetes (4–14 mm), 21 bits soquete (Fenda, Phillips, Pozidriv, Torx, Allen), 2 extensões, junta universal, cabo T, chave manual e 3 chaves L',
      garantia: 'Conforme fabricante selecionado na oferta',
    },
    highlights: ['Encaixe padrão 1/4" para locais estreitos', 'Soquetes de 4 mm a 14 mm', 'Junta universal e extensões inclusas', 'Maleta rígida com encaixe individual'],
    featuresText:
      'Por utilizar encaixe de 1/4", este kit foi concebido para parafusos de pequeno e médio porte — exatamente os mais comuns em painéis internos de carros, carenagens de motos, suportes de bateria, eletrodomésticos e bicicletas. A junta universal permite trabalhar em ângulos inclinados onde chaves fixas não alcançam.',
    pros: [
      'Excelente variedade de pontas Torx, Allen, Phillips e Fenda em uma única maleta compacta.',
      'Junta universal e extensões rígida/flexível facilitam acesso em cofres de motor apertados.',
      'Ótimo custo por peça para ter sempre no carro ou apartamento.',
    ],
    cons: [
      'Encaixe de 1/4" não é indicado para parafusos de roda ou suspensão com alto torque de aperto.',
      'A qualidade do aço (Cromo-Vanádio vs. aço carbono simples) varia bastante conforme a marca escolhida.',
    ],
    targetAudience:
      'Motoristas, motociclistas, ciclistas e entusiastas que precisam de um kit portátil para manutenções leves sem carregar caixas pesadas.',
    comparisonNotes:
      'Não substitui jogos de 1/2" para mecânica pesada de suspensão, mas complementa perfeitamente um jogo maior para acabamento interno e cofre superior.',
    faq: [
      {
        question: 'Esse kit de 46 peças serve para soltar parafuso de roda de carro?',
        answer:
          'Não. Parafusos de roda utilizam geralmente soquetes de 17 mm a 21 mm em encaixe de 1/2" e exigem torque elevado. O kit de 46 peças 1/4" vai até 14 mm e destina-se a torques leves e médios.',
      },
      {
        question: 'O que verificar antes de escolher a marca do kit de 46 peças?',
        answer:
          'Dê preferência a modelos fabricados em aço Cromo-Vanádio (Cr-V) com catraca de liberação rápida (botão central) e travas metálicas na maleta.',
      },
    ],
    featured: true,
    status: 'published',
  },
  {
    id: 'prod-bosch-gws-700',
    slug: 'esmerilhadeira-bosch-gws-700',
    title: 'Análise da Esmerilhadeira Angular Bosch GWS 700',
    name: 'Esmerilhadeira Angular Bosch GWS 700 Professional',
    brand: 'Bosch',
    model: 'GWS 700',
    categorySlug: 'ferramentas-eletricas',
    toolType: 'Esmerilhadeira angular 4.1/2"',
    application: 'Corte, desbaste e limpeza de metais e aço',
    shortDescription:
      'Esmerilhadeira compacta de 710W com rotação de 12.000 RPM para discos de 115 mm (4.1/2"), pesando apenas 1,7 kg.',
    introduction:
      'A Bosch GWS 700 faz parte da linha profissional da marca voltada a trabalhos contínuos de corte, desbaste e lixamento em metalurgia, serralheria e instalação. Seu corpo fino e o peso contido de 1,7 kg proporcionam ótimo controle em cortes prolongados ou acima da linha do ombro.',
    imageUrl: '/src/assets/images/cat_power_tools_1795185272335.jpg',
    specs: {
      marca: 'Bosch',
      modelo: 'GWS 700',
      categoria: 'Ferramentas elétricas',
      potencia: '710 W',
      voltagem: '127V ou 220V (versões dedicadas, não bivolt)',
      rotacao: '12.000 RPM (em vazio)',
      capacidade: 'Disco de 4.1/2" (115 mm); rosca do eixo M14',
      peso: '1,7 kg',
      dimensoes: 'Cabo de alimentação de 2 m',
      acessoriosInclusos: 'Capa de proteção, empunhadura auxiliar, flange, porca de aperto e chave de dois pinos (pode variar conforme kit)',
      garantia: '24 meses (linha Bosch Professional no Brasil)',
    },
    highlights: ['Motor de 710 W robusto', '12.000 RPM em vazio', 'Peso leve de 1,7 kg', 'Garantia de 24 meses na linha azul'],
    featuresText:
      'Desenvolvida com entradas de ar otimizadas para resfriamento direto do motor, a GWS 700 suporta rotinas de corte em perfis metálicos, tubos e chapas sem aquecimento prematuro. O cabeçote metálico compacto facilita alcançar cantos em grades, portões e estruturas tubulares.',
    pros: [
      'Excelente ergonomia: corpo estreito e 1,7 kg reduzem fadiga nos pulsos.',
      'Resfriamento eficiente do motor em cortes contínuos de metal.',
      '2 anos de garantia oficial para a linha profissional Bosch.',
    ],
    cons: [
      'Não possui controle eletrônico variável de velocidade (rotações fixas em 12.000 RPM).',
      'Não é recomendada para polimento automotivo devido à rotação elevada.',
    ],
    targetAudience:
      'Serralheiros, instaladores, pedreiros, mecânicos de funilaria e usuários avançados que precisam de uma esmerilhadeira 4.1/2" confiável e durável.',
    comparisonNotes:
      'Para corte e desbaste em metal, a GWS 700 destaca-se pela durabilidade do conjunto mecânico frente a modelos hobby de 600–650W.',
    faq: [
      {
        question: 'Posso usar a Bosch GWS 700 para polir carro?',
        answer:
          'Não é recomendado. Esmerilhadeiras operam a 12.000 RPM, rotação muito alta que pode queimar o verniz automotivo. Para polimento, utilize uma politriz com faixa entre 600 e 3.000 RPM.',
      },
      {
        question: 'Qual o tamanho do disco compatível?',
        answer:
          'Discos de corte, desbaste ou flap de 4.1/2 polegadas (115 mm) com furo padrão de 22,23 mm e rosca de eixo M14.',
      },
    ],
    featured: true,
    status: 'published',
  },
  {
    id: 'prod-wap-wf-12k32',
    slug: 'parafusadeira-wap-wf-12k3-2',
    title: 'Análise da Parafusadeira e Furadeira WAP WF 12K3.2',
    name: 'Parafusadeira e Furadeira a Bateria WAP WF 12K3.2 (12V)',
    brand: 'WAP',
    model: 'WF 12K3.2',
    categorySlug: 'ferramentas-eletricas',
    toolType: 'Parafusadeira e Furadeira a Bateria 12V',
    application: 'Montagem de móveis, madeira até 20 mm e aço até 10 mm',
    shortDescription:
      'Identificação técnica confirmada: o modelo WAP WF 12K3.2 é uma parafusadeira/furadeira a bateria 12V com 25 Nm de torque e maleta com acessórios.',
    introduction:
      'Nota técnica de identificação: embora frequentemente buscada junto a equipamentos de limpeza da marca WAP, a referência oficial WF 12K3.2 pertence à linha de parafusadeiras e furadeiras a bateria de 12V. Trata-se de uma ferramenta compacta para montagem, marcenaria leve e reparos cotidianos.',
    imageUrl: '/src/assets/images/editorial_tool_review_1795185271655.jpg',
    specs: {
      marca: 'WAP',
      modelo: 'WF 12K3.2',
      categoria: 'Ferramentas elétricas',
      voltagem: 'Bateria 12V Li-Ion 1.500 mAh (carregador bivolt 127V/220V)',
      torque: '25 Nm (18 níveis de torque + 1 de perfuração)',
      rotacao: '0–350 RPM (1ª velocidade) / 0–1.400 RPM (2ª velocidade)',
      capacidade: 'Mandril 3/8" (10 mm) aperto rápido; perfuração máx. 20 mm madeira / 10 mm aço',
      peso: 'Não informado',
      dimensoes: 'Não informado',
      acessoriosInclusos: 'Maleta plástica, 1 bateria 12V com indicador LED de carga, carregador bivolt, brocas, bits e extensor magnético',
      garantia: '12 meses (conforme política WAP)',
    },
    highlights: ['Bateria 12V Li-Ion com indicador LED', 'Torque de 25 Nm (18+1 estágios)', 'Duas velocidades mecânicas', 'Mandril 3/8" sem chave'],
    featuresText:
      'A WF 12K3.2 oferece seletor mecânico de duas marchas (0–350 RPM para parafusar sem espanar e 0–1.400 RPM para furar), luz LED de trabalho, gatilho reversível e empunhadura emborrachada. Sua bateria de íons de lítio de 1.500 mAh possui indicador visual de carga em LED.',
    pros: [
      'Corpo leve e compacto para trabalhar dentro de armários, gavetas e painéis automotivos.',
      'Indicador de carga diretamente na bateria facilita saber o nível restante.',
      'Carregador bivolt e maleta organizada inclusos no kit.',
    ],
    cons: [
      'Não possui função impacto, não sendo indicada para perfurar alvenaria ou concreto.',
      'Tempo de carregamento entre 3 e 5 horas exige pausa quando acompanha apenas 1 bateria.',
    ],
    targetAudience:
      'Usuários domésticos, montadores de móveis planejados e hobbistas que valorizam leveza e controle de torque em madeira e metal fino.',
    comparisonNotes:
      'Frente à The Black Tools TB-21PX (21V / 35 Nm / com impacto), a WAP WF 12K3.2 é mais compacta e voltada exclusivamente a madeira, plástico, metal fino e parafusamento em geral.',
    faq: [
      {
        question: 'A WAP WF 12K3.2 é uma lavadora ou uma parafusadeira?',
        answer:
          'Confirmamos junto ao catálogo oficial do fabricante: a WAP WF 12K3.2 é uma parafusadeira e furadeira a bateria de 12V.',
      },
      {
        question: 'Ela fura parede de tijolo ou concreto?',
        answer:
          'Não é indicada para alvenaria ou concreto porque não possui função martelete/impacto. Sua aplicação ideal é madeira (até 20 mm), aço fino (até 10 mm) e aperto de parafusos.',
      },
    ],
    featured: false,
    status: 'published',
  },
  {
    id: 'prod-auxiliar-partida-compressor',
    slug: 'auxiliar-de-partida-automotivo-com-compressor',
    title: 'Análise Técnica: Auxiliar de Partida Automotivo 12V com Compressor Integrado',
    name: 'Auxiliar de Partida Automotivo 12V com Compressor de Ar Integrado',
    brand: 'Categoria Multimarca (12V + Compressor)',
    model: 'Unidade Portátil 2 em 1 (Jump Starter + Calibrador)',
    categorySlug: 'equipamentos-automotivos',
    toolType: 'Auxiliar de partida e compressor portátil',
    application: 'Emergências automotivas, partida 12V e calibragem de pneus',
    shortDescription:
      'Equipamento 2 em 1 portátil que combina bateria auxiliar para dar partida em carros com bateria descarregada e compressor digital para pneus.',
    introduction:
      'Os auxiliares de partida automotivos com compressor integrado reúnem duas ferramentas críticas de emergência veicular em um único bloco portátil: um jump starter de lítio para sistemas 12V e um mini compressor de ar com manômetro digital. Como existem diversas marcas no mercado, esta análise detalha os critérios técnicos reais que você deve conferir antes da compra.',
    imageUrl: '/src/assets/images/cat_automotive_gear_1795185272682.jpg',
    specs: {
      marca: 'Diversos fabricantes (ex.: Baseus, Noco, Vonder, Xiaomi, marcas 2 em 1)',
      modelo: 'Auxiliar 12V com Compressor Integrado',
      categoria: 'Equipamentos automotivos',
      voltagem: 'Saída auxiliar 12V DC para partida veicular; recarga via USB-C ou 12V',
      pressao: 'Até ~150 PSI no compressor (varia conforme modelo selecionado)',
      capacidade: 'Recomendado conferir corrente de pico (A) compatível com a cilindrada do motor',
      peso: 'Não informado (varia conforme capacidade da bateria interna)',
      dimensoes: 'Portátil para porta-luvas ou porta-malas',
      acessoriosInclusos: 'Garras jacaré inteligentes (positivo/negativo), mangueira de ar com bicos, cabo de carregamento e estojo',
      garantia: 'Conforme fabricante selecionado na oferta',
    },
    highlights: ['Independência de outro carro para chupeta', 'Calibragem emergencial de pneus', 'Garras com proteção anti-inversão', 'Lanterna de emergência e saída USB'],
    featuresText:
      'Na função de partida auxiliar, as garras inteligentes monitoram polaridade, curto-circuito e sobrecarga antes de liberar corrente para os polos da bateria 12V do veículo. Já o compressor integrado permite configurar a pressão alvo em PSI ou BAR e desliga automaticamente ao atingir a calibragem desejada.',
    pros: [
      'Dispensa cabos de chupeta e um segundo veículo em situações de pane elétrica.',
      'Economiza espaço no porta-malas ao unir calibrador de pneu e powerbank de partida.',
      'Garras inteligentes modernas reduzem risco de inversão de polaridade na central eletrônica do carro.',
    ],
    cons: [
      'Modelos compactos não substituem compressores de reservatório para uso contínuo ou ferramentas pneumáticas.',
      'A bateria interna perde eficiência se armazenada totalmente descarregada por vários meses no calor do carro.',
    ],
    targetAudience:
      'Motoristas viajantes, frotistas leves, motociclistas e proprietários que desejam autonomia contra bateria descarregada e pneus murchos.',
    comparisonNotes:
      'Se você realiza manutenção apenas na garagem com tomada próxima, um carregador inteligente 12V dedicado entrega mais vida útil para recuperar baterias do que um jump starter.',
    faq: [
      {
        question: 'Um auxiliar de partida portátil dá partida em motores a diesel?',
        answer:
          'Apenas modelos com alta corrente de pico específica para motores diesel (geralmente acima de 1000A–2000A de pico). Sempre confira a cilindrada suportada na ficha oficial do modelo escolhido.',
      },
      {
        question: 'De quanto em quanto tempo devo recarregar o auxiliar no porta-malas?',
        answer:
          'Recomenda-se verificar o nível de carga a cada 2 ou 3 meses para manter a bateria interna entre 60% e 100% pronta para emergências.',
      },
    ],
    featured: false,
    status: 'published',
  },
  {
    id: 'prod-macaco-sparta-2t',
    slug: 'macaco-hidraulico-sparta-2-toneladas',
    title: 'Análise do Macaco Hidráulico Sparta 2 Toneladas',
    name: 'Macaco Hidráulico Sparta 2 Toneladas (Jacaré / Garrafa)',
    brand: 'Sparta',
    model: 'Ref. 5100855 (Jacaré) / Ref. 5032155 (Garrafa)',
    categorySlug: 'equipamentos-automotivos',
    toolType: 'Macaco hidráulico 2T',
    application: 'Elevação de veículos de passeio para troca de pneus e inspeções',
    shortDescription:
      'Linha de macacos hidráulicos em aço carbono da Sparta com capacidade de 2 toneladas (2.000 kg) e válvula de segurança contra sobrecarga.',
    introduction:
      'A Sparta comercializa duas configurações distintas de macaco hidráulico de 2 toneladas no mercado brasileiro: o modelo tipo Jacaré portátil com maleta (Ref. 5100855), ideal para carros de passeio baixos, e o modelo tipo Garrafa vertical (Ref. 5032155), mais compacto para utilitários leves com maior vão livre.',
    imageUrl: '/src/assets/images/cat_automotive_gear_1795185272682.jpg',
    specs: {
      marca: 'Sparta',
      modelo: '5100855 (Jacaré) / 5032155 (Garrafa)',
      categoria: 'Equipamentos automotivos',
      capacidade: '2 toneladas (2.000 kg) de carga nominal',
      dimensoes: 'Altura Jacaré: 135 mm a 300 mm | Altura Garrafa: 148 mm a 278 mm',
      peso: 'Aprox. 6,9–7,5 kg (Jacaré com maleta) / 1,9–2,1 kg (Garrafa)',
      acessoriosInclusos: 'Alavanca de acionamento manual; maleta plástica inclusa na versão Jacaré 5100855',
      garantia: 'Conforme política do fabricante / importador',
    },
    highlights: ['Capacidade para até 2.000 kg', 'Válvula de segurança contra sobrecarga', 'Estrutura em aço carbono', 'Versão Jacaré acompanha maleta'],
    featuresText:
      'O macaco jacaré Sparta 5100855 possui quatro rodas em ferro (sendo duas traseiras giratórias) que facilitam posicionar o prato sob o ponto de apoio do chassi com altura mínima de 13,5 cm e elevação máxima de 30 cm. Já a versão garrafa 5032155 conta com fuso regulável na ponta do pistão para compensar folgas antes de iniciar o bombeamento.',
    pros: [
      'Elevação hidráulica exige muito menos esforço físico que o macaco sanfona original do veículo.',
      'Válvula de segurança integrada impede elevação além da capacidade nominal.',
      'Maleta plástica no modelo jacaré mantém o porta-malas limpo e organizado.',
    ],
    cons: [
      'Elevação máxima de 300 mm no jacaré compacto pode exigir calço ou cavalete alto em SUVs elevados.',
      'Nunca deve ser usado como único apoio para entrar embaixo do carro — cavaletes mecânicos são obrigatórios.',
    ],
    targetAudience:
      'Proprietários de carros de passeio que fazem rodízio de pneus, troca de pastilhas ou pequenas manutenções na própria garagem.',
    comparisonNotes:
      'Escolha o modelo Jacaré (5100855) para sedãs, hatches e carros baixos pela base mais estável; opte pelo Garrafa (5032155) apenas se precisar de peso mínimo ou veículo com maior vão livre.',
    faq: [
      {
        question: 'Posso entrar embaixo do carro sustentado apenas pelo macaco hidráulico?',
        answer:
          'Não. Por norma básica de segurança em oficina, o macaco hidráulico serve apenas para elevar o veículo; antes de acessar a parte inferior, apoie o carro em cavaletes mecânicos de capacidade compatível.',
      },
      {
        question: 'Qual a altura mínima do modelo Jacaré Sparta 2T?',
        answer:
          'A altura mínima de encaixe do modelo Jacaré Ref. 5100855 é de 135 mm (13,5 cm) e a máxima é de 300 mm (30 cm).',
      },
    ],
    featured: true,
    status: 'published',
  },
  {
    id: 'prod-scanner-obd2-elm327',
    slug: 'scanner-automotivo-obd2-elm327',
    title: 'Análise do Scanner Automotivo OBD2 ELM327',
    name: 'Scanner Automotivo OBD2 ELM327 (Bluetooth / Wi-Fi)',
    brand: 'Padrão ELM327 (Multimarca)',
    model: 'ELM327 OBD-II V1.5 / V2.1',
    categorySlug: 'equipamentos-automotivos',
    toolType: 'Leitor de diagnóstico OBD2',
    application: 'Leitura de códigos de falha (DTC) e telemetria básica do motor',
    shortDescription:
      'Interface compacta de 16 pinos para conectar o smartphone à porta OBD2 do veículo, ler códigos de erro de injeção e monitorar sensores em tempo real.',
    introduction:
      'O scanner OBD2 baseado na arquitetura ELM327 é o dispositivo mais acessível para quem deseja entender o motivo da luz de injeção acesa no painel antes de levar o carro à oficina. Conectado à tomada padrão OBD-II de 16 pinos, transmite dados de sensores e códigos de falha para aplicativos no celular.',
    imageUrl: '/src/assets/images/cat_automotive_gear_1795185272682.jpg',
    specs: {
      marca: 'Multimarca (chipset / firmware ELM327)',
      modelo: 'OBD2 ELM327 Bluetooth ou Wi-Fi',
      categoria: 'Equipamentos automotivos',
      voltagem: 'Alimentado diretamente pela porta OBD2 do veículo (12V DC)',
      capacidade: 'Protocolos OBD-II: ISO 9141-2, KWP2000, SAE J1850 e CAN-BUS (ISO 15765-4)',
      peso: 'Aprox. 35 g a 60 g (interface compacta)',
      dimensoes: 'Conector padrão SAE J1962 de 16 pinos',
      acessoriosInclusos: 'Módulo leitor OBD2 (aplicativo adquirido/baixado separadamente no smartphone)',
      garantia: 'Conforme vendedor / importador',
    },
    highlights: ['Leitura e limpeza de códigos DTC genéricos', 'Monitoramento de temperatura e rotação', 'Compatível com carros padrão OBD2', 'Conexão sem fio com smartphone'],
    featuresText:
      'Quando pareado com aplicativos compatíveis (como Torque, Car Scanner ou similares), o leitor permite ler códigos genéricos P0xxx do módulo de injeção, acompanhar temperatura real do líquido de arrefecimento (útil em carros sem ponteiro no painel), tensão da bateria, carga do motor e leitura de sonda lambda.',
    pros: [
      'Custo muito baixo para identificar falhas básicas de injeção e sensores em casa.',
      'Mostra temperatura real do motor e tensão do alternador em tempo real no painel do celular.',
      'Instalação imediata sem ferramentas na porta de diagnóstico abaixo do volante.',
    ],
    cons: [
      'Não acessa módulos avançados na maioria dos veículos (ABS, Airbag, câmbio automático ou programação de chaves).',
      'Versões rotuladas como "V2.1" de baixo custo frequentemente têm compatibilidade inferior às versões V1.5 com suporte completo a protocolos.',
      'Carros nacionais anteriores a 2010 podem não seguir o padrão OBD-II completo.',
    ],
    targetAudience:
      'Motoristas curiosos, compradores de carros usados que querem checar códigos gravados e entusiastas de manutenção preventiva.',
    comparisonNotes:
      'Enquanto scanners profissionais com tela cobrem ABS, Airbag e atuadores bidirecionais, o ELM327 atua como leitor de entrada focado em motor (OBD-II genérico).',
    faq: [
      {
        question: 'O ELM327 apaga a luz da injeção eletrônica?',
        answer:
          'Sim, ele permite limpar códigos de falha armazenados na ECU do motor. Porém, se o defeito físico no sensor ou peça não for corrigido, a luz voltará a acender.',
      },
      {
        question: 'Qual versão escolher: Bluetooth ou Wi-Fi, V1.5 ou V2.1?',
        answer:
          'Para Android, o Bluetooth funciona bem; para iPhone (iOS), versões Wi-Fi ou Bluetooth Low Energy (BLE) são geralmente necessárias. Em termos de compatibilidade de protocolos no Brasil, versões V1.5 costumam aceitar mais veículos que réplicas V2.1 genéricas.',
      },
    ],
    featured: false,
    status: 'published',
  },
  {
    id: 'prod-carregador-bateria-12v',
    slug: 'carregador-inteligente-bateria-12v',
    title: 'Análise Técnica: Carregador Inteligente de Bateria Automotiva 12V',
    name: 'Carregador Inteligente e Flutuador de Bateria 12V Microprocessado',
    brand: 'Categoria Microprocessada (12V)',
    model: 'Carregador Inteligente Multiestágios 12V',
    categorySlug: 'equipamentos-automotivos',
    toolType: 'Carregador inteligente de bateria',
    application: 'Recarga, manutenção e preservação de baterias de carros e motos 12V',
    shortDescription:
      'Equipamento microprocessado bivolt com controle automático de corrente, modo flutuador e proteções eletrônicas para manter baterias 12V saudáveis.',
    introduction:
      'Diferente dos antigos carregadores pesados de transformador simples — que podiam ferver o eletrólito da bateria se esquecidos na tomada —, o carregador inteligente microprocessado de 12V ajusta tensão e corrente automaticamente em múltiplas etapas. É indispensável para carros pouco usados, motos e oficinas.',
    imageUrl: '/src/assets/images/cat_automotive_gear_1795185272682.jpg',
    specs: {
      marca: 'Diversos fabricantes (ex.: Bosch, Vonder, Noco, Black+Decker, modelos digitais)',
      modelo: 'Carregador Inteligente 12V Multiestágios',
      categoria: 'Equipamentos automotivos',
      voltagem: 'Entrada Bivolt automática (110V–220V) / Saída 12V DC controlada',
      capacidade: 'Compatível com baterias chumbo-ácido (SLI), AGM, Gel e EFB (verificar amperagem Ah suportada)',
      peso: 'Não informado (varia entre ~400 g e 1,2 kg conforme corrente de saída)',
      dimensoes: 'Não informado',
      acessoriosInclusos: 'Garras jacaré isoladas e visor LCD/LED de tensão e estágio de carga',
      garantia: 'Conforme fabricante selecionado na oferta',
    },
    highlights: ['Carregamento automático em multiestágios', 'Modo flutuador seguro sem sobrecarga', 'Proteção contra inversão e curto', 'Visor digital de tensão'],
    featuresText:
      'Ao conectar as garras à bateria 12V, o microprocessador identifica o estado de carga e percorre fases como pré-carga/dessulfatação por pulso, carga constante, absorção e modo flutuação. Quando a bateria atinge 100%, o carregador reduz a corrente apenas para manter a tensão estável, permitindo deixá-lo conectado em veículos guardados.',
    pros: [
      'Não danifica a bateria nem os módulos eletrônicos do carro por sobrecarga.',
      'Prolonga a vida útil de baterias de veículos que ficam parados por semanas.',
      'Proteção automática caso as garras positivo e negativo sejam invertidas por acidente.',
    ],
    cons: [
      'Não dá partida instantânea no motor (não substitui um auxiliar de partida / jump starter em emergência imediata).',
      'Modelos de baixa corrente (1A a 2A) levam várias horas para recarregar baterias automotivas acima de 60 Ah.',
    ],
    targetAudience:
      'Proprietários de carros antigos, motos de fim de semana, frotistas e oficinas que realizam diagnósticos longos com chave ligada.',
    comparisonNotes:
      'Para carros de passeio (baterias de 45 Ah a 75 Ah), prefira carregadores inteligentes com corrente entre 4A e 8A para recargas completas em tempo razoável.',
    faq: [
      {
        question: 'Preciso desconectar a bateria do carro para usar um carregador inteligente?',
        answer:
          'Na maioria dos carregadores inteligentes modernos com proteção de picos de tensão e carga controlada até ~14,7V, não é obrigatório desconectar, mas sempre consulte o manual do veículo e do carregador.',
      },
      {
        question: 'Carregador inteligente recupera bateria totalmente morta com 0 volts?',
        answer:
          'Muitos modelos inteligentes exigem uma tensão residual mínima (ex.: acima de 2V–3V) para reconhecer a bateria por segurança. Baterias com placas em curto interno não são recuperáveis por nenhum carregador.',
      },
    ],
    featured: false,
    status: 'published',
  },
];

export const SEED_ARTICLES = [
  {
    id: 'art-escolher-parafusadeira',
    slug: 'como-escolher-uma-parafusadeira',
    title: 'Como escolher uma parafusadeira? Torque, voltagem e mandril explicados',
    categorySlug: 'ferramentas-eletricas',
    articleType: 'guia',
    summary:
      'Entenda o que realmente importa na hora de comprar uma parafusadeira: torque em Nm, baterias de 12V vs. 21V, controle de embreagem e função impacto.',
    imageUrl: '/src/assets/images/editorial_tool_review_1795185271655.jpg',
    keywords: ['como escolher parafusadeira', 'torque Nm', '12v ou 21v', 'mandril aperto rapido'],
    readMinutes: 6,
    relatedProductSlugs: ['parafusadeira-the-black-tools-tb-21px', 'parafusadeira-wap-wf-12k3-2'],
    featured: true,
    status: 'published',
    content: `## 1. Voltagem não é tudo: olhe o torque em Nm

Um erro comum ao comprar a primeira parafusadeira é escolher apenas pelo número de volts estampado na bateria (12V, 18V ou 21V). Embora sistemas de maior tensão costumem comportar motores mais fortes, o indicador real de força de giro é o **torque máximo medido em Newton-metro (Nm)**.

- **Até 25 Nm (ex.: 12V compactas):** ideais para montagem de móveis, dobradiças, MDF, eletrônica e pequenos reparos internos.
- **De 30 Nm a 45 Nm:** faixa versátil para casa, oficina doméstica, madeira maciça e perfurações ocasionais com brocas médias.
- **Acima de 50 Nm (motores brushless):** recomendadas para carpintaria pesada, parafusos estruturais longos e uso profissional diário.

## 2. Controle de torque (embreagem) e duas marchas

Verifique se a máquina possui anel de regulagem numérica (geralmente de 15 a 20 posições) mais seletor de duas velocidades mecânicas:
- **1ª marcha (0–400 RPM):** mais força e menor velocidade para parafusar sem estragar a cabeça do parafuso.
- **2ª marcha (0–1.400 RPM):** maior rotação para furar madeira e chapas metálicas com precisão.

## 3. Preciso de função impacto?

Se você pretende instalar cortinas, prateleiras ou suportes em parede de tijolo ou bloco, a **função impacto** ajuda bastante. Caso trabalhe apenas com móveis, madeira e metal fino, uma máquina sem impacto (como modelos 12V dedicados) costuma ser mais leve e curta para entrar dentro de armários.

## 4. Número de baterias no kit

Ficar sem carga no meio de uma montagem atrasa todo o trabalho. Sempre que possível, compare se o kit traz **2 baterias** e carregador bivolt, como ocorre em pacotes como a The Black Tools TB-21PX.`,
  },
  {
    id: 'art-furadeira-vs-parafusadeira',
    slug: 'furadeira-de-impacto-ou-parafusadeira-diferenca',
    title: 'Furadeira de impacto ou parafusadeira: qual comprar primeiro?',
    categorySlug: 'ferramentas-eletricas',
    articleType: 'comparativo',
    summary:
      'Compare rotação, controle de torque, capacidade em alvenaria e praticidade para decidir entre uma furadeira elétrica de tomada e uma parafusadeira a bateria.',
    imageUrl: '/src/assets/images/cat_power_tools_1795185272335.jpg',
    keywords: ['furadeira ou parafusadeira', 'comparativo ferramentas', 'furadeira de impacto'],
    readMinutes: 5,
    relatedProductSlugs: ['parafusadeira-the-black-tools-tb-21px', 'parafusadeira-wap-wf-12k3-2'],
    featured: true,
    status: 'published',
    content: `## A diferença mecânica entre as duas ferramentas

Muita gente confunde as duas máquinas porque ambas usam mandril giratório, mas seus projetos internos têm prioridades opostas.

### Furadeira de impacto (com fio)
- **Rotação alta:** trabalha geralmente entre 2.500 e 3.000 RPM.
- **Sem embreagem de torque:** se você tentar parafusar madeira fina, ela gira rápido demais e pode espanar o parafuso ou atravessar a peça.
- **Força contínua na tomada:** excelente para perfurar paredes de concreto, reboco duro e metais usando brocas maiores sem depender de bateria.

### Parafusadeira / Furadeira a bateria
- **Rotação controlada e alto controle:** começa bem devagar no gatilho e conta com anel limitador de torque.
- **Freio elétrico imediato:** ao soltar o dedo do gatilho, o mandril para instantaneamente.
- **Mobilidade:** trabalha em escadas, tetos, porta-malas e locais sem energia elétrica.

## Veredito prático

- Se sua rotina é **montar móveis, apertar dobradiças, trabalhar em madeira e fazer reparos gerais**, comece por uma **parafusadeira/furadeira a bateria** (de preferência com função impacto leve se houver furos ocasionais em tijolo).
- Se o objetivo principal é **instalar prateleiras pesadas em paredes de concreto maciço**, uma **furadeira de impacto com fio** (ou martelete) ainda é mais eficiente por real.`,
  },
  {
    id: 'art-escolher-lavadora-alta-pressao',
    slug: 'o-que-observar-lavadora-de-alta-pressao',
    title: 'Qual lavadora de alta pressão vale a pena? Pressão (PSI), vazão (L/h) e motor',
    categorySlug: 'limpeza-e-acessorios',
    articleType: 'comparativo',
    summary:
      'Não olhe apenas o PSI da embalagem. Entenda por que a vazão em litros por hora e o tipo de motor definem o poder real de limpeza na garagem.',
    imageUrl: '/src/assets/images/cat_pressure_washers_1795185272064.jpg',
    keywords: ['lavadora de alta pressao', 'karcher k2', 'wap wl 1800', 'psi e vazao'],
    readMinutes: 7,
    relatedProductSlugs: ['lavadora-karcher-k2-compacta', 'lavadora-wap-wl-1800'],
    featured: true,
    status: 'published',
    content: `## 1. Pressão (PSI/bar) vs. Vazão (L/h)

A pressão determina a força com que o jato desprende a sujeira da superfície, enquanto a **vazão em litros por hora (L/h)** define o volume de água disponível para carregar essa sujeira embora.

Uma lavadora com 1.500 PSI e vazão de 360 L/h (como a WAP WL 1800) enxágua espuma e lama de pisos mais rápido do que um equipamento que tenha apenas pressão alta com pouca água.

## 2. Motor universal vs. Motor por indução

- **Motor universal (com escovas):** presente nos modelos compactos de entrada como a Kärcher K2 e WAP WL 1800. São leves (3 a 5 kg), mais acessíveis e ideais para uso ocasional doméstico (lavar o carro, moto ou calçada nos fins de semana).
- **Motor por indução:** muito mais silencioso, durável e indicado para uso frequente ou jornadas longas em oficinas e lava-rápidos, porém mais pesado e caro.

## 3. Comprimento de mangueira e Stop Total

Mangueiras de 3 metros atendem bem espaços compactos, mas exigem mover o aparelho algumas vezes ao lavar um carro sedã ou SUV. Confira também se o modelo conta com **Stop Total** (desligamento automático ao soltar o gatilho) e se a voltagem escolhida (127V ou 220V) corresponde à tomada da sua garagem.`,
  },
  {
    id: 'art-como-funciona-scanner-obd2',
    slug: 'como-funciona-scanner-automotivo-obd2',
    title: 'Como funciona um scanner automotivo OBD2 e qual escolher para sua garagem?',
    categorySlug: 'equipamentos-automotivos',
    articleType: 'comparativo',
    summary:
      'Entenda o padrão OBD-II de 16 pinos, o que um leitor ELM327 realmente consegue diagnosticar e quando vale investir em um scanner dedicado.',
    imageUrl: '/src/assets/images/cat_automotive_gear_1795185272682.jpg',
    keywords: ['scanner automotivo', 'obd2 elm327', 'luz da injecao', 'diagnostico automotivo'],
    readMinutes: 6,
    relatedProductSlugs: ['scanner-automotivo-obd2-elm327'],
    featured: true,
    status: 'published',
    content: `## O que é a porta OBD2 do seu carro?

OBD2 (*On-Board Diagnostics II*) é um padrão de comunicação eletrônico presente na grande maioria dos carros de passeio fabricados ou importados no Brasil a partir de 2010 (em alguns importados, desde meados dos anos 2000). A tomada de 16 pinos geralmente fica sob o painel, próxima à coluna de direção ou caixa de fusíveis.

## O que o leitor ELM327 faz na prática

1. **Lê códigos de falha (DTC):** identifica códigos padronizados como \`P0300\` (falha de ignição) ou \`P0420\` (eficiência do catalisador).
2. **Telemetria em tempo real:** exibe temperatura do líquido de arrefecimento (vital em veículos sem marcador no painel), rotação, carga do motor e tensão da bateria.
3. **Limpa a luz de injeção:** útil após trocar uma vela, bobina ou sensor defeituoso.

## Limitações que você precisa conhecer

Leitores ELM327 básicos acessam principalmente a central de **injeção eletrônica (motor)**. Se você precisa diagnosticar módulos de **ABS, Airbag, câmbio automático ou resetar intervalo de revisão**, precisará de um scanner automotivo dedicado com suporte multimódulos ou equipamento de nível oficina.`,
  },
  {
    id: 'art-escolher-esmerilhadeira',
    slug: 'como-escolher-uma-esmerilhadeira-angular',
    title: 'Como escolher uma esmerilhadeira angular sem errar no disco e na potência',
    categorySlug: 'ferramentas-eletricas',
    articleType: 'guia',
    summary:
      'Saiba quando optar por discos de 4.1/2" (115 mm) ou 5", qual potência mínima buscar e cuidados essenciais de segurança no corte de metais.',
    imageUrl: '/src/assets/images/cat_power_tools_1795185272335.jpg',
    keywords: ['como escolher esmerilhadeira', 'bosch gws 700', 'disco 4.1/2', 'seguranca corte'],
    readMinutes: 5,
    relatedProductSlugs: ['esmerilhadeira-bosch-gws-700'],
    featured: false,
    status: 'published',
    content: `## 1. Tamanho do disco: 4.1/2" (115 mm) é o padrão versátil

Para 90% dos trabalhos em garagem, serralheria leve e oficina, a esmerilhadeira angular de **4.1/2 polegadas (115 mm)** — como a Bosch GWS 700 — oferece o melhor equilíbrio entre alcance de corte, facilidade de encontrar discos e controle com as mãos.

## 2. Potência e peso

Modelos entre **700W e 850W** oferecem força consistente para cortar barras chatas, cantoneiras, tubos e remover soldas sem perder rotação facilmente, mantendo o peso abaixo de 2 kg.

## 3. Segurança nunca é opcional

- **Jamais remova a capa de proteção** do disco.
- **Nunca utilize discos de serra dentados de madeira** em esmerilhadeiras angulares (risco grave de contragolpe).
- Utilize sempre óculos de proteção ampla, protetor auricular e luvas adequadas ao processo.`,
  },
  {
    id: 'art-ferramentas-essenciais-oficina-casa',
    slug: 'ferramentas-essenciais-para-oficina-e-casa',
    title: 'Quais ferramentas não podem faltar para montar uma garagem funcional?',
    categorySlug: 'ferramentas-manuais',
    articleType: 'guia',
    summary:
      'Lista objetiva e sem exageros dos itens fundamentais para manutenção preventiva residencial e automotiva com segurança.',
    imageUrl: '/src/assets/images/cat_hand_tools_1795185271926.jpg',
    keywords: ['ferramentas essenciais', 'montar oficina', 'jogo de ferramentas', 'macaco e cavaletes'],
    readMinutes: 6,
    relatedProductSlugs: ['kit-ferramentas-46-pecas-soquetes', 'macaco-hidraulico-sparta-2-toneladas', 'carregador-inteligente-bateria-12v'],
    featured: false,
    status: 'published',
    content: `## Monte a base antes de comprar itens específicos

Montar uma garagem eficiente não exige comprar carrinhos de mil peças no primeiro dia. O segredo está em cobrir os quatro pilares da manutenção: **aperto, elevação segura, diagnóstico elétrico e corte/perfuração**.

1. **Jogo de soquetes e bits bem estruturado:** um conjunto de 1/4" (como o kit de 46 peças) resolve quase todos os parafusos internos, carenagens e periféricos; complemente depois com soquetes de 1/2" para rodas e suspensão.
2. **Parafusadeira/furadeira a bateria:** agiliza desmontagens repetitivas e instalações na parede da própria oficina.
3. **Macaco hidráulico + par de cavaletes:** segurança absoluta antes de qualquer trabalho sob o veículo.
4. **Carregador inteligente 12V e leitor OBD2:** evitam trocas prematuras de bateria e ajudam a ler códigos de falha antes de substituir peças no escuro.`,
  },
];
