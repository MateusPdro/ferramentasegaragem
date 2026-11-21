import type { ProductFAQ, ProductSpecs, PublishStatus } from '../types/index.ts';

export interface ExpansionProductSeed {
  id: string;
  slug: string;
  title: string;
  name: string;
  brand: string;
  model: string;
  categorySlug: string;
  subcategory: string;
  toolType: string;
  application: string;
  shortDescription: string;
  introduction: string;
  imageUrl: string;
  specs: ProductSpecs;
  highlights: string[];
  featuresText: string;
  pros: string[];
  cons: string[];
  targetAudience: string;
  comparisonNotes: string;
  faq: ProductFAQ[];
  mlReferenceUrl: string;
  ratingInfo?: string;
  salesInfo?: string;
  verifiedAt: string;
  featured: boolean;
  status: PublishStatus;
}

/**
 * Mapeia os 10 produtos iniciais preservados para as subcategorias padronizadas
 * sem alterar id, slug, status ou links de afiliados ja cadastrados.
 */
export const EXISTING_PRODUCT_SUBCATEGORIES: Record<string, string> = {
  'prod-tb-21px': 'Parafusadeiras e Furadeiras',
  'prod-wap-wf-12k32': 'Parafusadeiras e Furadeiras',
  'prod-bosch-gws-700': 'Esmerilhadeiras',
  'prod-kit-46-pecas': 'Jogos de soquetes e catracas',
  'prod-scanner-obd2-elm327': 'Scanners automotivos',
  'prod-macaco-sparta-2t': 'Macacos hidráulicos',
  'prod-auxiliar-partida-compressor': 'Auxiliares de partida',
  'prod-carregador-bateria-12v': 'Carregadores de bateria',
  'prod-karcher-k2': 'Lavadoras de alta pressão',
  'prod-wap-wl-1800': 'Lavadoras de alta pressão',
};

/**
 * Atualiza a lista de subtopicos das 4 categorias principais preservando os topicos originais
 * e acrescentando os 16 tipos da expansao do catalogo.
 */
export const EXPANDED_CATEGORY_SUBTOPICS: Record<string, string[]> = {
  'ferramentas-eletricas': [
    'Furadeiras',
    'Parafusadeiras',
    'Esmerilhadeiras',
    'Serra mármore',
    'Soprador térmico',
    'Pistola de pintura elétrica',
    'Politriz elétrica',
    'Serras circulares',
    'Marteletes',
    'Chaves de impacto',
  ],
  'ferramentas-manuais': [
    'Jogos de chaves combinadas',
    'Jogos de soquetes e catracas',
    'Alicates',
    'Martelos',
    'Jogos de ferramentas',
    'Chaves de fenda e Philips',
    'Torquímetros',
    'Maletas de ferramentas',
  ],
  'equipamentos-automotivos': [
    'Scanners automotivos',
    'Carregadores de bateria',
    'Compressores portáteis',
    'Macacos hidráulicos',
    'Auxiliares de partida',
    'Leitores OBD2',
    'Equipamentos de diagnóstico',
  ],
  'limpeza-e-acessorios': [
    'Lavadoras de alta pressão',
    'Aspiradores de pó e água',
    'Extratoras e higienizadoras',
    'Aspiradores verticais e portáteis',
    'Limpeza automotiva',
    'Detalhamento',
  ],
};

const IMG_CUTTER_HEATGUN = '/src/assets/images/sub_cutter_heatgun_1795188924149.jpg';
const IMG_PAINT_POLISHER = '/src/assets/images/sub_paint_polisher_1795188933133.jpg';
const IMG_HAND_TOOLS_SET = '/src/assets/images/sub_wrenches_pliers_hammer_1795188925624.jpg';
const IMG_HAND_SOCKETS = '/src/assets/images/cat_hand_tools_1795185271926.jpg';
const IMG_AUTOMOTIVE = '/src/assets/images/cat_automotive_gear_1795185272682.jpg';
const IMG_PRESSURE_WASHER = '/src/assets/images/cat_pressure_washers_1795185272064.jpg';
const IMG_VACUUM_EXTRACTOR = '/src/assets/images/sub_vacuum_extractor_1795188925389.jpg';

const VERIFIED_DATE = '2026-11-20';

export const EXPANSION_PRODUCTS: ExpansionProductSeed[] = [
  // =========================================================================
  // 1. FERRAMENTAS ELETRICAS (12 novos modelos em 4 novos tipos)
  // =========================================================================

  // --- Tipo 1: Serra marmore ---
  {
    id: 'prod-makita-4100nh3zx2',
    slug: 'serra-marmore-makita-4100nh3zx2',
    title: 'Análise da Serra Mármore Makita 4100NH3ZX2 (1.300 W)',
    name: 'Serra Mármore Makita 4100NH3ZX2 1.300 W',
    brand: 'Makita',
    model: '4100NH3ZX2',
    categorySlug: 'ferramentas-eletricas',
    subcategory: 'Serra mármore',
    toolType: 'Serra mármore 110 mm',
    application: 'Corte de pisos cerâmicos, porcelanatos, mármores, granitos e alvenaria',
    shortDescription:
      'Referência profissional de 1.300 W para discos de 110 mm (4-3/8"), atingindo 13.800 RPM com peso compacto de 2,9 kg.',
    introduction:
      'A Makita 4100NH3ZX2 é uma das serras mármore mais tradicionais em obras e reformas no Brasil. Combina motor de 1.300 W, rotação elevada de 13.800 RPM e corpo compacto de 2,9 kg voltado a cortes retos em revestimentos e pedras.',
    imageUrl: IMG_CUTTER_HEATGUN,
    specs: {
      marca: 'Makita',
      modelo: '4100NH3ZX2',
      categoria: 'Ferramentas elétricas',
      potencia: '1.300 W',
      voltagem: '127V ou 220V (versões dedicadas)',
      rotacao: '13.800 RPM',
      capacidade: 'Disco 110 mm (4-3/8"); corte máx. 32 mm a 90°',
      peso: '2,9 kg',
      dimensoes: 'Aprox. 227 x 209 x 166 mm',
      acessoriosInclusos: 'Chave Allen, chave fixa e kit refrigeração (conforme lote/anúncio)',
      garantia: '12 meses (padrão fabricante Brasil)',
    },
    highlights: [
      'Motor de 1.300 W com 13.800 RPM',
      'Aceita discos diamantados de 110 mm',
      'Peso de 2,9 kg com boa ergonomia',
      'Base ajustável para profundidade até 32 mm',
    ],
    featuresText:
      'Projetada para cortes úmidos ou a seco (conforme o disco diamantado utilizado), a 4100NH3ZX2 possui ajuste de profundidade de corte até 32 mm em 90 graus e gatilho com trava de segurança. A rotação de 13.800 RPM favorece cortes limpos em porcelanato quando equipada com disco contínuo de qualidade.',
    pros: [
      'Equilíbrio reconhecido entre potência (1.300 W) e peso reduzido (2,9 kg).',
      'Ampla oferta de peças de reposição e assistência técnica Makita no país.',
      'Alta rotação de 13.800 RPM auxilia na qualidade do acabamento em pisos.',
    ],
    cons: [
      'A versão 4100NH3ZX2 realiza cortes apenas em 90°, sem ajuste de base em 45°.',
      'Discos diamantados específicos podem precisar ser adquiridos à parte dependendo do kit.',
    ],
    targetAudience:
      'Azulejistas, pedreiros, instaladores de revestimentos e marmoristas que buscam uma máquina durável e leve para cortes retos diários.',
    comparisonNotes:
      'Frente à Vonder SMV1300S (também 1.300 W e 110 mm), a Makita se destaca pelo menor peso (2,9 kg) e rotação ligeiramente superior (13.800 vs. 13.000 RPM). Já contra a Bosch GDC 150, perde em capacidade máxima de disco (110 mm vs. 125 mm).',
    faq: [
      {
        question: 'A Makita 4100NH3ZX2 faz corte em 45 graus (meia-esquadria)?',
        answer: 'Este modelo possui base fixa para cortes em 90° com ajuste de profundidade até 32 mm. Para cortes inclinados em 45°, é necessário optar por versões com base basculante.',
      },
      {
        question: 'Posso usar disco de madeira na serra mármore?',
        answer: 'Não. Por segurança, jamais instale discos dentados de madeira em serras mármore devido ao risco grave de contragolpe na alta rotação.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/makita-4100nh3zx2',
    salesInfo: 'Presença recorrente entre as serras mármore mais buscadas no Mercado Livre Brasil',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },
  {
    id: 'prod-vonder-smv1300s',
    slug: 'serra-marmore-vonder-smv1300s',
    title: 'Análise da Serra Mármore Vonder SMV1300S (1.300 W)',
    name: 'Serra Mármore Vonder SMV1300S 1.300 W',
    brand: 'Vonder',
    model: 'SMV1300S',
    categorySlug: 'ferramentas-eletricas',
    subcategory: 'Serra mármore',
    toolType: 'Serra mármore 110 mm',
    application: 'Reformas residenciais, corte de telhas, tijolos, pisos e pedras',
    shortDescription:
      'Serra mármore de entrada/profissional leve com 1.300 W, 13.000 RPM, disco de 110 mm e trava do interruptor contra acionamento acidental.',
    introduction:
      'A Vonder SMV1300S entrega 1.300 W de potência em uma faixa de preço competitiva para reformas e serviços de alvenaria. É voltada a quem precisa de capacidade de corte padrão de 110 mm com regulagem de profundidade.',
    imageUrl: IMG_CUTTER_HEATGUN,
    specs: {
      marca: 'Vonder',
      modelo: 'SMV1300S',
      categoria: 'Ferramentas elétricas',
      potencia: '1.300 W',
      voltagem: '127V ou 220V (escolher conforme rede)',
      rotacao: '13.000 RPM',
      capacidade: 'Disco 110 mm (4-3/8"); furo 20 mm; corte aprox. 34 mm a 90°',
      peso: 'Aprox. 3,4 kg',
      dimensoes: 'Não informado',
      acessoriosInclusos: 'Chave dois pinos e chave Allen (verificar itens de refrigeração no anúncio)',
      garantia: '12 meses (garantia legal + fabricante Vonder)',
    },
    highlights: [
      'Potência de 1.300 W com 13.000 RPM',
      'Regulagem de profundidade na sapata',
      'Trava de segurança no gatilho',
      'Bom custo-benefício para reformas',
    ],
    featuresText:
      'Com rotação nominal de 13.000 RPM, a SMV1300S utiliza discos de 110 mm com furo padrão de 20 mm (ou anel redutor quando aplicável). Possui base metálica ajustável em altura para controlar a profundidade de rasgo em paredes ou pisos.',
    pros: [
      'Preço frequentemente mais acessível que marcas de linha pesada mantendo 1.300 W.',
      'Interruptor com trava de segurança reduz risco de acionamento involuntário.',
      'Fácil reposição de escovas de carvão e discos padrão de 110 mm.',
    ],
    cons: [
      'Ligeiramente mais pesada (cerca de 3,4 kg) que concorrentes como Makita 4100NH3ZX2 e Bosch GDC 150.',
      'Indicada para reformas e uso moderado em comparação a linhas industriais contínuas.',
    ],
    targetAudience:
      'Pedreiros autônomos, eletricistas que abrem rasgos leves em alvenaria e proprietários em reforma residencial.',
    comparisonNotes:
      'Oferece a mesma potência nominal de 1.300 W da Makita 4100NH3ZX2 com investimento menor, em troca de peso superior e acabamento mais simples.',
    faq: [
      {
        question: 'A Vonder SMV1300S vem com disco diamantado?',
        answer: 'Na maioria dos kits padrão de fábrica, acompanha apenas as chaves de troca. Confira na descrição da oferta se o vendedor inclui disco ou mangueira de água.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/vonder-smv1300s',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },
  {
    id: 'prod-bosch-gdc-150',
    slug: 'serra-marmore-bosch-gdc-150',
    title: 'Análise da Serra Mármore Bosch GDC 150 (1.500 W / Disco 125 mm)',
    name: 'Serra Mármore Bosch GDC 150 Titan 1.500 W',
    brand: 'Bosch',
    model: 'GDC 150',
    categorySlug: 'ferramentas-eletricas',
    subcategory: 'Serra mármore',
    toolType: 'Serra mármore 125 mm',
    application: 'Cortes profundos em concreto, granito, mármore e porcelanato pesado',
    shortDescription:
      'Modelo robusto de 1.500 W compatível com discos de até 125 mm (5"), pesando apenas 2,6 kg e alcançando 40 mm de profundidade de corte.',
    introduction:
      'A Bosch GDC 150 se diferencia no segmento por combinar um dos motores mais fortes da categoria (1.500 W) com baixo peso (2,6 kg) e compatibilidade com discos de 125 mm, ampliando a profundidade de corte.',
    imageUrl: IMG_CUTTER_HEATGUN,
    specs: {
      marca: 'Bosch',
      modelo: 'GDC 150',
      categoria: 'Ferramentas elétricas',
      potencia: '1.500 W',
      voltagem: '127V ou 220V (versões dedicadas)',
      rotacao: '12.000 a 12.200 RPM',
      capacidade: 'Discos de 105 mm a 125 mm (5"); corte até 40 mm a 90°',
      peso: '2,6 kg',
      dimensoes: 'Não informado',
      acessoriosInclusos: 'Chave sextavada e chave de aperto (varia conforme edição)',
      garantia: '24 meses (linha Bosch Professional)',
    },
    highlights: [
      'Motor de 1.500 W de alto torque',
      'Compatível com discos de até 125 mm (40 mm de corte)',
      'Apenas 2,6 kg de peso',
      '2 anos de garantia profissional Bosch',
    ],
    featuresText:
      'A placa base ampla e plana da GDC 150 melhora o apoio em cortes longos, enquanto os 1.500 W evitam queda brusca de rotação ao cortar granitos espessos ou vigas de alvenaria. Aceita tanto discos tradicionais de 110 mm quanto discos de 125 mm.',
    pros: [
      'Maior potência (1.500 W) e maior profundidade de corte (até 40 mm) entre os modelos comparados.',
      'Peso muito baixo (2,6 kg) apesar do motor mais forte.',
      'Garantia estendida de 24 meses na linha azul profissional.',
    ],
    cons: [
      'Valor de aquisição geralmente superior ao de modelos de 1.300 W.',
      'Versão GDC 150 padrão foca em cortes retos 90° (modelos inclináveis pertencem a outras referências).',
    ],
    targetAudience:
      'Marmoristas, instaladores profissionais de pisos espessos e equipes de obra com uso intenso diário.',
    comparisonNotes:
      'Supera a Makita 4100NH3ZX2 e a Vonder SMV1300S tanto em potência (1.500 W vs. 1.300 W) quanto em profundidade de corte com disco de 125 mm, sendo ainda mais leve (2,6 kg).',
    faq: [
      {
        question: 'A Bosch GDC 150 aceita discos comuns de 110 mm?',
        answer: 'Sim. Ela comporta discos de 105 mm, 110 mm e até 125 mm, respeitando o diâmetro do furo e o anel redutor quando aplicável.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/bosch-gdc-150',
    verifiedAt: VERIFIED_DATE,
    featured: true,
    status: 'published',
  },

  // --- Tipo 2: Soprador termico ---
  {
    id: 'prod-vonder-stv-200',
    slug: 'soprador-termico-vonder-stv-200-2000w',
    title: 'Análise do Soprador Térmico Vonder STV 200 (2.000 W / 3 Estágios)',
    name: 'Soprador Térmico Vonder 2.000 W 3 Estágios (STV 200)',
    brand: 'Vonder',
    model: 'STV 200 / STV 200N',
    categorySlug: 'ferramentas-eletricas',
    subcategory: 'Soprador térmico',
    toolType: 'Soprador térmico 3 estágios',
    application: 'Aplicação de insulfilm, termo-retrátil, remoção de tintas e moldagem de PVC',
    shortDescription:
      'Soprador térmico de 2.000 W com 3 estágios de temperatura (50 °C, 350 °C e 550 °C) e fluxo de ar até 500 L/min.',
    introduction:
      'O Vonder STV 200 de 2.000 W é o modelo intermediário-profissional da marca para quem precisa não só de alta temperatura (550 °C), mas também de um primeiro estágio frio/morno a 50 °C essencial para resfriamento e secagem controlada.',
    imageUrl: IMG_CUTTER_HEATGUN,
    specs: {
      marca: 'Vonder',
      modelo: 'STV 200 / STV 200N',
      categoria: 'Ferramentas elétricas',
      potencia: 'Estágio 1: 130 W | Estágio 2: 1.000 W | Estágio 3: 2.000 W',
      voltagem: '127V ou 220V (versões dedicadas; 127V pode variar potência máx. para 1.500W em algumas séries)',
      capacidade: 'Temperaturas: 50 °C / 350 °C / 550 °C; Fluxo de ar: 300 a 500 L/min',
      peso: 'Aprox. 0,9 kg a 1,1 kg',
      dimensoes: 'Não informado',
      acessoriosInclusos: '4 bocais direcionadores e maleta plástica (varia conforme versão STV 200 vs. 200N)',
      garantia: '12 meses',
    },
    highlights: [
      '3 estágios reais incluindo modo de 50 °C',
      'Potência de até 2.000 W (versão 220V)',
      'Fluxo de ar até 500 L/min',
      'Acompanha bocais para diferentes direcionamentos',
    ],
    featuresText:
      'Os três níveis térmicos permitem adaptar a ferramenta desde envelopamento automotivo e encolhimento de espaguetes termo-retráteis até remoção de vernizes pesados e solda leve de plásticos. O apoio traseiro plano possibilita deixá-lo em pé na bancada com as mãos livres.',
    pros: [
      'Estágio de 50 °C preserva a resistência interna ao resfriar antes de desligar.',
      'Excelente alcance térmico (até 550 °C) com 500 L/min de vazão.',
      'Kit costuma incluir bocais planos e redutores úteis para cantos.',
    ],
    cons: [
      'Na versão 127V, verifique a etiqueta técnica pois alguns lotes operam em 1.500 W enquanto 2.000 W é padrão no 220V.',
      'Não possui visor digital grau a grau como sopradores eletrônicos avançados.',
    ],
    targetAudience:
      'Instaladores de insulfilm/envelopamento, eletricistas industriais, encanadores e marceneiros.',
    comparisonNotes:
      'Frente ao Vonder STV 150 (2 estágios: 300 °C / 500 °C), o STV 200 agrega o estágio de 50 °C e maior reserva de potência. Comparado ao Spark BR 2000 W, tem controle por 3 posições fixas em vez de potenciômetro contínuo.',
    faq: [
      {
        question: 'Qual a diferença entre 127V e 220V nos sopradores Vonder 2000W?',
        answer: 'Por limitações de corrente em tomadas residenciais de 10A/20A, versões 220V atingem 2.000 W plenos, enquanto versões 127V da mesma família costumam operar entre 1.500 W e 1.600 W.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/soprador-termico-vonder-2000w-3-estagios',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },
  {
    id: 'prod-vonder-stv-150',
    slug: 'soprador-termico-vonder-stv-150-1500w',
    title: 'Análise do Soprador Térmico Vonder 1.500 W (2 Temperaturas)',
    name: 'Soprador Térmico Vonder STV 150 / STV 1500N 1.500 W',
    brand: 'Vonder',
    model: 'STV 150 / STV 1500N',
    categorySlug: 'ferramentas-eletricas',
    subcategory: 'Soprador térmico',
    toolType: 'Soprador térmico 2 estágios',
    application: 'Encolhimento de termo-retrátil, remoção leve de adesivos e moldagem de tubos',
    shortDescription:
      'Soprador térmico compacto de 1.500 W com duas faixas de operação (300 °C / 280 L/min e 500 °C / 480 L/min) voltado a uso eventual e reparos.',
    introduction:
      'O Vonder de 1.500 W com 2 temperaturas (séries STV 150 e STV 1500N) é a opção de entrada da marca para tarefas rápidas de manutenção elétrica, remoção de etiquetas, aquecimento de peças plásticas e artesanato.',
    imageUrl: IMG_CUTTER_HEATGUN,
    specs: {
      marca: 'Vonder',
      modelo: 'STV 150 / STV 1500N',
      categoria: 'Ferramentas elétricas',
      potencia: 'Estágio 1: 750 W | Estágio 2: 1.500 W',
      voltagem: '127V ou 220V (versão específica)',
      capacidade: 'Temperaturas: 300 °C e 500 °C; Fluxo de ar: 280 L/min e 480 L/min',
      peso: 'Aprox. 0,7 a 0,9 kg',
      dimensoes: 'Não informado',
      acessoriosInclusos: 'Bocal plano (varia conforme kit do vendedor)',
      garantia: '12 meses',
    },
    highlights: [
      'Duas temperaturas práticas: 300 °C e 500 °C',
      'Peso leve abaixo de 1 kg',
      'Consumo reduzido em 750 W no 1º estágio',
      'Ideal para instalações elétricas e pequenos reparos',
    ],
    featuresText:
      'Seu seletor traseiro de duas posições entrega aquecimento rápido a 300 °C com menor fluxo (280 L/min) para trabalhos delicados em fios e termo-retrátil, ou 500 °C com 480 L/min para dobrar PVC e amolecer tintas.',
    pros: [
      'Custo inicial baixo e peso muito leve para uso acima da cabeça.',
      'Compatível com tomadas residenciais padrão sem sobrecarga.',
      'Simplicidade operacional com dois estágios bem definidos.',
    ],
    cons: [
      'Não possui estágio de ar frio/50 °C para resfriamento antes de guardar.',
      'Menos indicado para jornadas contínuas longas em envelopamento pesado.',
    ],
    targetAudience:
      'Eletricistas residenciais, instaladores de som automotivo, hobbistas e manutenção doméstica.',
    comparisonNotes:
      'É mais simples e barato que o Vonder STV 200 (que inclui 3º estágio a 50 °C e 2.000 W), sendo ideal para uso pontual.',
    faq: [
      {
        question: 'Serve para aplicar película ou fazer envelopamento?',
        answer: 'Para pequenos detalhes sim, porém profissionais de envelopamento costumam preferir modelos de 3 estágios ou ajuste fino como o STV 200 ou Spark BR 2000 W para controlar melhor o calor sem queimar o vinil.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/soprador-termico-vonder-1500w',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },
  {
    id: 'prod-spark-br-2000w',
    slug: 'soprador-termico-spark-br-2000w',
    title: 'Análise do Soprador Térmico Spark BR 2.000 W (AMG-S220)',
    name: 'Soprador Térmico Spark BR 2.000 W com Ajuste de Temperatura',
    brand: 'Spark BR',
    model: 'AMG-S220 / 2000W',
    categorySlug: 'ferramentas-eletricas',
    subcategory: 'Soprador térmico',
    toolType: 'Soprador térmico com ajuste de temperatura',
    application: 'Envelopamento, remoção de verniz, solda plástica e secagem técnica',
    shortDescription:
      'Soprador térmico de 2.000 W com seletor rotativo de temperatura até 600 °C, duas velocidades de fluxo (250–500 L/min) e conjunto de espátula e bocais.',
    introduction:
      'O Spark BR 2.000 W se destacou nos marketplaces brasileiros pelo kit completo de acessórios e pela presença de ajuste progressivo de temperatura que chega até 600 °C em dois níveis de vazão de ar.',
    imageUrl: IMG_CUTTER_HEATGUN,
    specs: {
      marca: 'Spark BR',
      modelo: 'AMG-S220 (2.000 W)',
      categoria: 'Ferramentas elétricas',
      potencia: '2.000 W',
      voltagem: '127V ou 220V (escolher conforme anúncio)',
      capacidade: 'Temperatura ajustável até 600 °C; Fluxo de ar: 250 a 500 L/min',
      peso: 'Não informado',
      dimensoes: 'Não informado',
      acessoriosInclusos: 'Maleta, 4 bicos direcionadores e espátula raspadora (conforme kit)',
      garantia: 'Conforme política do vendedor / importador no Brasil',
    },
    highlights: [
      'Temperatura máxima declarada de até 600 °C',
      'Dial traseiro para ajuste gradual de calor',
      'Duas velocidades de vento (250 e 500 L/min)',
      'Kit costuma incluir maleta e espátula',
    ],
    featuresText:
      'Combina chave seletora de duas velocidades de ventilação com regulagem variável na traseira, permitindo adaptar a intensidade térmica conforme a sensibilidade do material plástico, película automotiva ou tinta.',
    pros: [
      'Ajuste variável oferece maior flexibilidade que chaves fixas de apenas 2 posições.',
      'Temperatura de pico de 600 °C atende aplicações mais exigentes.',
      'Boa relação de acessórios inclusos na maleta.',
    ],
    cons: [
      'Marca com menor rede física de assistência autorizada comparada à Vonder ou Bosch.',
      'Sempre deixe o aparelho esfriar em fluxo mínimo antes de desligar totalmente.',
    ],
    targetAudience:
      'Profissionais de estética automotiva, entusiastas de bricolagem e oficinas que buscam ajuste variável econômico.',
    comparisonNotes:
      'Oferece regulagem gradual e teto de 600 °C superior ao Vonder STV 150 (500 °C), competindo em preço com modelos de entrada.',
    faq: [
      {
        question: 'O Spark BR 2000 W tem display digital?',
        answer: 'O ajuste nessa linha é feito por dial analógico rotativo combinado com chave de 2 níveis de fluxo, dispensando tela LCD.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/soprador-termico-spark-br-2000w',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },

  // --- Tipo 3: Pistola de pintura eletrica ---
  {
    id: 'prod-tbt-tpp150',
    slug: 'pistola-pintura-eletrica-the-black-tools-tpp150',
    title: 'Análise da Pistola de Pintura Elétrica The Black Tools TPP150 (600 W)',
    name: 'Pistola de Pintura Elétrica HVLP The Black Tools TPP150 600 W',
    brand: 'The Black Tools',
    model: 'TPP150',
    categorySlug: 'ferramentas-eletricas',
    subcategory: 'Pistola de pintura elétrica',
    toolType: 'Pistola de pintura elétrica HVLP',
    application: 'Pintura de portões, móveis, paredes e superfícies com esmalte, verniz ou látex diluído',
    shortDescription:
      'Pistola HVLP de 600 W com reservatório grande de 1.250 ml, vazão de 700 ml/min, 3 modos de leque e múltiplos bicos inclusos.',
    introduction:
      'A The Black Tools TPP150 entrega maior capacidade de reservatório (1,25 litro) e motor de 600 W em relação às concorrentes de 400 W da mesma faixa, reduzindo paradas para reabastecimento de tinta em portões e paredes.',
    imageUrl: IMG_PAINT_POLISHER,
    specs: {
      marca: 'The Black Tools',
      modelo: 'TPP150',
      categoria: 'Ferramentas elétricas',
      potencia: '600 W',
      voltagem: '127V ou 220V (versão dedicada)',
      vazao: 'Máx. 700 ml/min',
      capacidade: 'Caneca 1.250 ml; 3 padrões de jato; bicos 1.0, 1.5, 2.0 e 2.5 mm',
      peso: 'Não informado',
      dimensoes: 'Não informado',
      acessoriosInclusos: 'Copo medidor de viscosidade, múltiplos bicos, agulha/escova de limpeza',
      garantia: 'Conforme política do fabricante / importador',
    },
    highlights: [
      'Motor de 600 W (mais forte que modelos de 400 W)',
      'Reservatório amplo de 1.250 ml',
      'Múltiplos diâmetros de bico (1.0 a 2.5 mm)',
      'Regulagem em leque vertical, horizontal e circular',
    ],
    featuresText:
      'Utiliza tecnologia HVLP (Alto Volume, Baixa Pressão) para atomizar tintas com menos névoa dispersa do que pistolas de ar comprimido convencionais. O conjunto de 4 bicos permite alternar de vernizes finos (1.0/1.5 mm) até tintas látex devidamente diluídas (2.5 mm).',
    pros: [
      'Maior capacidade de caneca da categoria (1.250 ml) acelera pinturas contínuas.',
      'Potência de 600 W ajuda na pulverização de tintas ligeiramente mais encorpadas.',
      'Vem equipada com variedade de bicos para diferentes viscosidades.',
    ],
    cons: [
      'Caneca cheia com 1,25 L fica mais pesada no punho durante pinturas prolongadas no alto.',
      'Exige limpeza imediata completa após cada uso para não entupir bicos e válvulas.',
    ],
    targetAudience:
      'Pintores residenciais, hobbistas de marcenaria e proprietários que pintam grades, muros, portas e móveis em casa.',
    comparisonNotes:
      'Frente à WAP EPP400 e à Vonder PEV 400 (ambas de 400 W), a TPP150 oferece motor mais potente (600 W) e caneca maior (1.250 ml contra 900 ml / 800 ml).',
    faq: [
      {
        question: 'Posso colocar tinta acrílica direto da lata na TPP150?',
        answer: 'Não. Toda pistola elétrica HVLP exige diluição da tinta conforme recomendação do fabricante da tinta e teste no copo medidor de viscosidade que acompanha o produto.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/the-black-tools-tpp150',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },
  {
    id: 'prod-wap-epp400',
    slug: 'pistola-pintura-eletrica-wap-epp400',
    title: 'Análise da Pistola de Pintura Elétrica WAP EPP400 (400 W)',
    name: 'Pistola de Pintura Elétrica WAP EPP400 400 W',
    brand: 'WAP',
    model: 'EPP400',
    categorySlug: 'ferramentas-eletricas',
    subcategory: 'Pistola de pintura elétrica',
    toolType: 'Pistola de pintura elétrica HVLP',
    application: 'Pintura doméstica de móveis, janelas, portões e artesanato',
    shortDescription:
      'Pistola elétrica de 400 W com reservatório de 900 ml, vazão até 700 ml/min, bico de 2,5 mm, 3 posições de leque e copo medidor até 60 DIN-s.',
    introduction:
      'A WAP EPP400 é uma pistola elétrica compacta de corpo único projetada para uso doméstico e bricolagem. Seus 400 W alimentam uma turbina direta com reservatório de 900 ml e controle de vazão no gatilho.',
    imageUrl: IMG_PAINT_POLISHER,
    specs: {
      marca: 'WAP',
      modelo: 'EPP400',
      categoria: 'Ferramentas elétricas',
      potencia: '400 W',
      voltagem: '127V ou 220V (versão dedicada)',
      pressao: '1,45 a 2,90 PSI',
      vazao: 'Máx. 700 ml/min',
      capacidade: 'Caneca 900 ml; bico 2,5 mm; viscosidade máx. 60 DIN-s',
      peso: 'Não informado',
      dimensoes: 'Não informado',
      acessoriosInclusos: 'Copo medidor de viscosidade e agulha desentupidora',
      garantia: '12 meses (padrão WAP)',
    },
    highlights: [
      'Viscosidade máxima suportada de até 60 DIN-s',
      'Caneca graduada de 900 ml',
      '3 modos de pintura (horizontal, vertical e circular)',
      'Rede ampla de assistência técnica WAP',
    ],
    featuresText:
      'O bico de 2,5 mm da EPP400 trabalha com tintas esmalte, vernizes, látex e acrílica diluídas até 60 DIN-s. Conta com ajuste no gatilho para dosar o volume de tinta liberado e botão frontal para girar o ângulo do leque.',
    pros: [
      'Mais leve e manejável no punho do que canecas de 1,2 L.',
      'Suporta viscosidade até 60 DIN-s bem documentada no manual.',
      'Assistência técnica nacional bem distribuída.',
    ],
    cons: [
      'Acompanha apenas um bico padrão de 2,5 mm (menos fino para vernizes ultradelicados).',
      'Cabo elétrico de comprimento padrão exige extensão em áreas abertas.',
    ],
    targetAudience:
      'Usuários domésticos e renovadores de móveis que priorizam leveza, ergonomia e suporte de marca nacional.',
    comparisonNotes:
      'Equivalente direta da Vonder PEV 400 em potência (400 W), mas com caneca ligeiramente maior (900 ml vs. 800 ml) e especificação de viscosidade até 60 DIN-s.',
    faq: [
      {
        question: 'A WAP EPP400 precisa de compressor de ar?',
        answer: 'Não. Ela já integra a turbina elétrica no próprio corpo, bastando ligar diretamente na tomada da tensão correta (127V ou 220V).',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/wap-epp400',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },
  {
    id: 'prod-vonder-pev-400',
    slug: 'pistola-pintura-eletrica-vonder-pev-400',
    title: 'Análise da Pistola de Pintura Elétrica Vonder PEV 400 (400 W)',
    name: 'Pistola de Pintura Elétrica Vonder PEV 400 HVLP 400 W',
    brand: 'Vonder',
    model: 'PEV 400',
    categorySlug: 'ferramentas-eletricas',
    subcategory: 'Pistola de pintura elétrica',
    toolType: 'Pistola de pintura elétrica HVLP',
    application: 'Aplicação de vernizes, seladores, tintas automotivas base água e esmaltes leves',
    shortDescription:
      'Modelo HVLP de 400 W com reservatório de 800 ml, bicos de 2,6 mm (e 1,8 mm conforme versão), 3 ajustes de leque e baixa névoa.',
    introduction:
      'A Vonder PEV 400 é voltada a pequenos projetos de marcenaria, serralheria doméstica e aplicação de vernizes ou esmaltes sintéticos diluídos, trazendo corpo desmontável para facilitar a limpeza interna.',
    imageUrl: IMG_PAINT_POLISHER,
    specs: {
      marca: 'Vonder',
      modelo: 'PEV 400',
      categoria: 'Ferramentas elétricas',
      potencia: '400 W',
      voltagem: '127V ou 220V (versões dedicadas)',
      vazao: 'Máx. 700 ml/min',
      capacidade: 'Caneca 800 ml; viscosidade recomendada abaixo de 40 DIN-s; bico 2,6 mm (kit pode incluir 1,8 mm)',
      peso: 'Aprox. 1,4 kg',
      dimensoes: 'Não informado',
      acessoriosInclusos: 'Copo medidor de viscosidade e agulha de limpeza',
      garantia: '12 meses',
    },
    highlights: [
      'Corpo frontal destacável para limpeza rápida',
      'Vazão máxima de 700 ml/min com 3 ajustes de jato',
      'Leve (cerca de 1,4 kg vazia)',
      'Indicação clara de diluição (< 40 DIN-s)',
    ],
    featuresText:
      'O sistema de encaixe rápido separa a parte frontal (caneca, bico e pescador) do bloco do motor elétrico, permitindo lavar os componentes com água ou solvente adequado sem molhar a turbina.',
    pros: [
      'Fácil desmontagem para limpeza após o expediente.',
      'Peso enxuto (1,4 kg) reduz cansaço em trabalhos detalhados.',
      'Boa disponibilidade de bicos e copos de reposição Vonder.',
    ],
    cons: [
      'Caneca menor (800 ml) exige mais recargas em muros grandes.',
      'Exige diluição cuidadosa abaixo de 40 DIN-s para não cuspir gotículas.',
    ],
    targetAudience:
      'Marceneiros amadores, hobbistas e manutenção predial leve focada em portas, grades e peças de madeira.',
    comparisonNotes:
      'Perde em volume de caneca para a TPP150 (1.250 ml) e EPP400 (900 ml), exigindo também tinta um pouco mais diluída (< 40 DIN-s), mas destaca-se pela praticidade na limpeza.',
    faq: [
      {
        question: 'Posso usar solvente/thinner para limpar a Vonder PEV 400?',
        answer: 'Consulte o manual específico do lote, mas o ideal é evitar solventes extremamente agressivos diretamente sobre vedações plásticas e sempre lavar apenas o cabeçote frontal desacoplado do motor.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/vonder-pev-400',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },

  // --- Tipo 4: Politriz eletrica ---
  {
    id: 'prod-tbt-bpa1200',
    slug: 'politriz-eletrica-the-black-tools-bpa1200',
    title: 'Análise da Politriz Automotiva The Black Tools BPA1200 (1.200 W)',
    name: 'Politriz Elétrica Rotativa The Black Tools BPA1200 1.200 W',
    brand: 'The Black Tools',
    model: 'BPA1200',
    categorySlug: 'ferramentas-eletricas',
    subcategory: 'Politriz elétrica',
    toolType: 'Politriz rotativa 7"',
    application: 'Polimento automotivo de corte e refino, lixamento leve e acabamento em madeira',
    shortDescription:
      'Politriz rotativa de 1.200 W com controle variável de velocidade (1.000 a 4.200 RPM) para boinas de 7" (180 mm) e empunhadura em D.',
    introduction:
      'A The Black Tools BPA1200 oferece potência elevada de 1.200 W e controle eletrônico de rotações em uma faixa de preço de entrada/intermediária para quem está montando kit de polimento em garagem.',
    imageUrl: IMG_PAINT_POLISHER,
    specs: {
      marca: 'The Black Tools',
      modelo: 'BPA1200',
      categoria: 'Ferramentas elétricas',
      potencia: '1.200 W',
      voltagem: '127V ou 220V (versão dedicada)',
      rotacao: '1.000 a 4.200 RPM (velocidade variável)',
      capacidade: 'Disco/boina de 7" (180 mm); eixo M14',
      peso: 'Não informado',
      dimensoes: 'Não informado',
      acessoriosInclusos: 'Disco de borracha/velcro 7", boina de pele e empunhadura tipo D',
      garantia: 'Conforme política do fabricante / importador',
    },
    highlights: [
      'Motor de 1.200 W com velocidade variável',
      'Suporte para discos de 7" (180 mm)',
      'Empunhadura auxiliar tipo D',
      'Trava de eixo para troca de boinas',
    ],
    featuresText:
      'Por ser uma politriz rotativa com faixa a partir de 1.000 RPM, atua bem na etapa de corte com boinas de lã ou espuma agressiva. A alça frontal em arco ("D") proporciona apoio equilibrado sobre capôs e tetos.',
    pros: [
      'Boa reserva de potência (1.200 W) pelo custo inicial competitivo.',
      'Aceita pratos padrão M14 de 5" ou 7" com facilidade.',
      'Velocidade variável evita trabalhar sempre em rotação máxima.',
    ],
    cons: [
      'Velocidade mínima de 1.000 RPM e teto de 4.200 RPM exigem cuidado redobrado em quinas e vernizes macios.',
      'Não possui controle eletrônico constante contra queda de giro sob carga pesada como modelos industriais.',
    ],
    targetAudience:
      'Entusiastas automotivos, iniciantes em estética veicular e funileiros com orçamento controlado.',
    comparisonNotes:
      'Frente à Holtter 600 W, entrega o dobro de potência nominal (1.200 W) e prato de 7" em vez de 5". Frente à Bosch GPO 14 CE, tem giro mínimo mais alto (1.000 vs. 750 RPM) e sem controle constante eletrônico.',
    faq: [
      {
        question: 'Posso usar boina de 5 polegadas na BPA1200?',
        answer: 'Sim, desde que utilize um prato suporte com rosca M14 compatível de 5 polegadas adquirido separadamente.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/the-black-tools-bpa1200',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },
  {
    id: 'prod-holtter-600w',
    slug: 'politriz-eletrica-holtter-600w',
    title: 'Análise da Polidora Elétrica Holtter 600 W (5")',
    name: 'Politriz e Lixadeira Elétrica Holtter 600 W 5"',
    brand: 'Holtter',
    model: 'Polidora 600 W 5"',
    categorySlug: 'ferramentas-eletricas',
    subcategory: 'Politriz elétrica',
    toolType: 'Politriz compacta 5"',
    application: 'Enceramento, brilho leve, revitalização de faróis e pequenos retoques',
    shortDescription:
      'Polidora elétrica compacta de 600 W para boinas de 5" (125 mm) com rotação até 4.500 RPM voltada a uso doméstico ocasional.',
    introduction:
      'A Holtter de 600 W ocupa o segmento ultra-compacto de polidoras de 5 polegadas. Indicada para quem deseja aplicar cera, dar lustro em pintura ou polir faróis sem lidar com o peso de uma politriz rotativa grande de 7".',
    imageUrl: IMG_PAINT_POLISHER,
    specs: {
      marca: 'Holtter',
      modelo: 'Polidora Elétrica 600 W',
      categoria: 'Ferramentas elétricas',
      potencia: '600 W',
      voltagem: '127V ou 220V (confirmar no anúncio)',
      rotacao: 'Até 4.500 RPM (velocidade variável conforme seletor)',
      capacidade: 'Disco 5" (125 mm)',
      peso: 'Não informado',
      dimensoes: 'Aprox. 24 x 11 x 20 cm',
      acessoriosInclusos: 'Disco suporte 5" e boinas básicas (varia conforme kit)',
      garantia: 'Conforme vendedor / importador',
    },
    highlights: [
      'Formato compacto fácil de guardar e manusear',
      'Boina de 5" (125 mm) prática para portas e para-choques',
      'Potência de 600 W voltada a lustro e enceramento',
    ],
    featuresText:
      'Com dimensões reduzidas e prato de 125 mm, alcança colunas, retrovisores e para-choques com facilidade. Seu foco é manutenção estética residencial e aplicação mecânica de ceras e selantes.',
    pros: [
      'Leve, compacta e de baixíssimo custo de entrada.',
      'Tamanho de 5" é mais amigável para iniciantes que pratos de 7".',
    ],
    cons: [
      'Motor de 600 W perde giro se pressionado com força na etapa de corte pesado.',
      'Rotação máxima de 4.500 RPM não deve ser usada com boina seca sobre a pintura.',
    ],
    targetAudience:
      'Proprietários de veículos que gostam de encerar o carro no fim de semana e polir faróis em casa.',
    comparisonNotes:
      'Não compete em torque contínuo com a Bosch GPO 14 CE (1.400 W), sendo destinada estritamente a uso leve e ocasional.',
    faq: [
      {
        question: 'A Holtter 600 W dá conta de remover riscos profundos com massa de polir?',
        answer: 'Ela remove oxidação leve e marcas suaves, mas para correção severa de verniz em carros inteiros recomenda-se uma politriz de 1.200 W a 1.400 W ou roto-orbital dedicada.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/politriz-holtter-600w',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },
  {
    id: 'prod-bosch-gpo-14-ce',
    slug: 'politriz-eletrica-bosch-gpo-14-ce',
    title: 'Análise da Politriz Profissional Bosch GPO 14 CE (1.400 W)',
    name: 'Politriz Angular Bosch GPO 14 CE Professional 1.400 W',
    brand: 'Bosch',
    model: 'GPO 14 CE',
    categorySlug: 'ferramentas-eletricas',
    subcategory: 'Politriz elétrica',
    toolType: 'Politriz rotativa profissional 7"',
    application: 'Detalhamento automotivo profissional, corte pesado, refino e lustro industrial',
    shortDescription:
      'Politriz profissional de 1.400 W, apenas 2,5 kg, faixa precisa de 750 a 3.000 RPM em 6 níveis e controle eletrônico constante.',
    introduction:
      'A Bosch GPO 14 CE é referência entre detalhadores profissionais e funilarias. Diferentemente de modelos genéricos de alta rotação, ela trabalha exatamente na janela técnica ideal de polimento (750 a 3.000 RPM) com eletrônica que mantém o giro estável mesmo sob pressão.',
    imageUrl: IMG_PAINT_POLISHER,
    specs: {
      marca: 'Bosch',
      modelo: 'GPO 14 CE',
      categoria: 'Ferramentas elétricas',
      potencia: '1.400 W',
      voltagem: '127V ou 220V (versões dedicadas)',
      rotacao: '750 a 3.000 RPM (6 velocidades com Constant Electronic e partida suave)',
      capacidade: 'Prato/boina até 7" (180 mm); eixo M14',
      peso: '2,5 kg',
      dimensoes: 'Não informado',
      acessoriosInclusos: 'Empunhadura tipo D, empunhadura auxiliar e prato de borracha (conforme edição)',
      garantia: '24 meses (linha Bosch Professional)',
    },
    highlights: [
      'Rotação ideal de 750 a 3.000 RPM com partida suave',
      'Sistema Constant Electronic mantém RPM sob pressão',
      'Peso de apenas 2,5 kg com 1.400 W de força',
      'Proteção contra sobrecarga e religamento',
    ],
    featuresText:
      'A partida suave evita respingos de composto polidor ao ligar a máquina. O seletor de 6 velocidades permite iniciar o trabalho a 750 RPM para espalhar o produto e subir para 1.500–2.100 RPM no corte sem oscilação de força graças ao controle eletrônico constante.',
    pros: [
      'Melhor controle térmico e de rotação (750–3.000 RPM) para proteger o verniz.',
      'Muito leve (2,5 kg) para longas horas de polimento lateral.',
      'Eletrônica Constant Electronic impede que o motor "morra" ao pressionar.',
    ],
    cons: [
      'Investimento significativamente mais alto que politrizes hobby.',
      'Requer boinas e suportes M14 de boa qualidade (muitas edições vêm sem boinas de espuma).',
    ],
    targetAudience:
      'Estúdios de detalhamento automotivo, funilarias profissionais e técnicos de acabamento náutico/industrial.',
    comparisonNotes:
      'Supera amplamente a The Black Tools BPA1200 e a Holtter 600 W em precisão de rotação (750–3.000 RPM vs. picos de 4.200–4.500 RPM), durabilidade e estabilidade eletrônica sob carga.',
    faq: [
      {
        question: 'Por que 750 a 3.000 RPM é melhor que 4.500 RPM para polir carro?',
        answer: 'Em polimento automotivo, rotações acima de 2.500–3.000 RPM geram calor excessivo rapidamente e aumentam muito o risco de holografias ou queima de verniz.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/bosch-gpo-14-ce',
    verifiedAt: VERIFIED_DATE,
    featured: true,
    status: 'published',
  },

  // =========================================================================
  // 2. FERRAMENTAS MANUAIS (12 novos modelos em 4 tipos)
  // =========================================================================

  // --- Tipo 5: Jogos de chaves combinadas ---
  {
    id: 'prod-gedore-robust-12p',
    slug: 'jogo-chaves-combinadas-gedore-robust-12-pecas',
    title: 'Análise do Jogo de Chaves Combinadas Gedore Robust 12 Peças (6 a 22 mm)',
    name: 'Jogo de Chaves Combinadas Gedore Robust S09105012 (12 Peças)',
    brand: 'Gedore Robust',
    model: 'S09105012 (Ref. 3370080)',
    categorySlug: 'ferramentas-manuais',
    subcategory: 'Jogos de chaves combinadas',
    toolType: 'Jogo de chaves combinadas 6–22 mm',
    application: 'Mecânica automotiva, montagem industrial e manutenção predial',
    shortDescription:
      'Conjunto de 12 chaves combinadas (6 a 22 mm) fabricadas em aço especial Gedore Robust com acabamento cromado polido e suporte organizador.',
    introduction:
      'O jogo Gedore Robust de 12 peças (referência S09105012 / 3370080) reúne a chancela do grupo Gedore em uma linha voltada ao excelente custo-benefício para oficinas e entusiastas exigentes.',
    imageUrl: IMG_HAND_TOOLS_SET,
    specs: {
      marca: 'Gedore Robust',
      modelo: 'S09105012 / 3370080',
      categoria: 'Ferramentas manuais',
      capacidade: '12 medidas: 6, 7, 8, 9, 10, 11, 12, 13, 14, 17, 19 e 22 mm',
      peso: 'Aprox. 1,1 a 1,3 kg',
      dimensoes: 'Acondicionado em suporte plástico organizador',
      acessoriosInclusos: '12 chaves combinadas + suporte organizador com alça',
      garantia: 'Conforme garantia Gedore do Brasil',
    },
    highlights: [
      'Cobertura prática de 6 mm a 22 mm',
      'Lado estrela inclinado em 15° para ergonomia',
      'Aço especial com acabamento cromado',
      'Padrão de qualidade do grupo Gedore',
    ],
    featuresText:
      'Cada chave combina boca fixa e lado estrela de mesma bitola, com pescoço levemente inclinado para livrar os dedos em parafusos rentes a chapas. As medidas incluem os tamanhos mais usados em veículos nacionais (8, 10, 12, 13, 14, 17 e 19 mm) além da chave 22 mm.',
    pros: [
      'Tolerâncias dimensionais confiáveis que reduzem folgas e risco de espanar porcas.',
      'Inclui medida de 22 mm no conjunto padrão de 12 peças.',
      'Suporte prático para pendurar em painel perfurado de oficina.',
    ],
    cons: [
      'Não traz medidas intermediárias de 15, 16, 18, 20 ou 21 mm (alguns carros modernos usam 15, 16 e 18 mm).',
      'Linha Robust tem perfil mais simples que a linha Gedore Red / Gedore Industrial topo de linha.',
    ],
    targetAudience:
      'Mecânicos, eletricistas industriais, motociclistas e proprietários que desejam chaves duráveis sem pagar o preço da linha pesada alemã.',
    comparisonNotes:
      'Traz exatamente a mesma grade de medidas (6–14, 17, 19, 22 mm) do The Black Tools TKCH12, diferenciando-se pelo padrão metalúrgico Gedore.',
    faq: [
      {
        question: 'Quais medidas vêm no jogo Gedore Robust de 12 peças?',
        answer: 'Vem com 6, 7, 8, 9, 10, 11, 12, 13, 14, 17, 19 e 22 mm. Note que não inclui 15, 16 ou 18 mm.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/jogo-chaves-combinadas-gedore-robust-12-pecas',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },
  {
    id: 'prod-tbt-tkch12',
    slug: 'jogo-chaves-combinadas-the-black-tools-tkch12',
    title: 'Análise do Jogo de Chaves Combinadas The Black Tools TKCH12 (12 Peças)',
    name: 'Jogo de Chaves Combinadas The Black Tools TKCH12 (6 a 22 mm)',
    brand: 'The Black Tools',
    model: 'TKCH12',
    categorySlug: 'ferramentas-manuais',
    subcategory: 'Jogos de chaves combinadas',
    toolType: 'Jogo de chaves combinadas 6–22 mm',
    application: 'Reparos residenciais, manutenção de motos, bicicletas e uso leve',
    shortDescription:
      'Jogo econômico de 12 chaves combinadas (6 a 22 mm) em aço cromado polido com suporte plástico para organização em garagem.',
    introduction:
      'O The Black Tools TKCH12 mira o público doméstico e entusiasta que busca um jogo completo de 6 a 22 mm pelo menor investimento possível para caixa de ferramentas residencial.',
    imageUrl: IMG_HAND_TOOLS_SET,
    specs: {
      marca: 'The Black Tools',
      modelo: 'TKCH12',
      categoria: 'Ferramentas manuais',
      capacidade: '12 peças: 6, 7, 8, 9, 10, 11, 12, 13, 14, 17, 19 e 22 mm',
      peso: 'Não informado',
      dimensoes: 'Suporte plástico organizador',
      acessoriosInclusos: '12 chaves combinadas + suporte organizador',
      garantia: 'Conforme fabricante / importador',
    },
    highlights: [
      '12 medidas essenciais de 6 a 22 mm',
      'Acabamento cromado resistente à oxidação leve',
      'Suporte plástico compacto para guardar na maleta',
    ],
    featuresText:
      'Reúne chaves de boca e estrela na mesma peça para atender desde pequenos parafusos de bicicletas até porcas de 19 e 22 mm em manutenções eventuais.',
    pros: [
      'Custo de entrada muito baixo por chave.',
      'Grade bem escolhida cobrindo até 22 mm.',
    ],
    cons: [
      'Não é projetado para uso mecânico diário com prolongadores ("cano") em parafusos travados.',
      'Também pula as medidas de 15, 16 e 18 mm.',
    ],
    targetAudience:
      'Uso doméstico, proprietários de motos e bicicletas ou kit reserva para deixar no carro.',
    comparisonNotes:
      'Alternativa econômica à Gedore Robust S09105012 e Tramontina PRO, recomendada para torques leves e eventuais.',
    faq: [
      {
        question: 'Serve para uso profissional pesado em caminhões ou suspensão?',
        answer: 'Para uso pesado e contínuo com alto torque, recomenda-se linhas forjadas em Cromo-Vanádio profissional como Tramontina PRO ou Gedore.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/the-black-tools-tkch12',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },
  {
    id: 'prod-tramontina-pro-12p',
    slug: 'jogo-chaves-combinadas-tramontina-pro-12-pecas',
    title: 'Análise do Jogo de Chaves Combinadas Tramontina PRO (12 Peças)',
    name: 'Jogo de Chaves Combinadas Tramontina PRO Cr-V (12 Peças)',
    brand: 'Tramontina PRO',
    model: 'Linha PRO 12 Peças Cr-V',
    categorySlug: 'ferramentas-manuais',
    subcategory: 'Jogos de chaves combinadas',
    toolType: 'Jogo de chaves combinadas Cr-V',
    application: 'Oficinas mecânicas profissionais, indústria e manutenção pesada',
    shortDescription:
      'Chaves combinadas em aço Cromo-Vanádio forjado e temperado com perfil Hyper Drive na boca estrela para reduzir desgaste dos parafusos.',
    introduction:
      'A linha Tramontina PRO representa o segmento industrial da marca brasileira. Seus conjuntos de 12 peças em aço Cromo-Vanádio (disponíveis em grades como 6–19 mm ou 10–32 mm conforme referência do kit) oferecem alta resistência mecânica e encaixe preciso.',
    imageUrl: IMG_HAND_TOOLS_SET,
    specs: {
      marca: 'Tramontina PRO',
      modelo: 'Conjunto 12 Peças (ex.: Ref. 44660/212 ou 44660/214)',
      categoria: 'Ferramentas manuais',
      capacidade: '12 peças em aço Cr-V (grade 6–19 mm ou 10–32 mm — conferir anúncio)',
      peso: 'Aprox. 1,0 a 2,8 kg conforme grade de bitolas',
      dimensoes: 'Suporte plástico ou estojo em lona (conforme referência)',
      acessoriosInclusos: '12 chaves combinadas Cr-V + organizador',
      garantia: 'Garantia contra defeitos de fabricação (linha PRO)',
    },
    highlights: [
      'Aço Cromo-Vanádio forjado e temperado',
      'Perfil Hyper Drive evita arredondar sextavados',
      'Pescoço fino e calibrado conforme normas DIN',
      'Linha industrial de longa vida útil',
    ],
    featuresText:
      'O perfil Hyper Drive na extremidade estrela distribui a força nas faces planas da porca ou parafuso em vez de concentrar pressão apenas nos cantos vivos, reduzindo drasticamente o risco de espanar peças oxidadas.',
    pros: [
      'Resistência mecânica superior para uso profissional diário.',
      'Acabamento cromado fosco ou acetinado que não escorrega fácil com mãos sujas de óleo.',
      'Ampla aceitação e reposição avulsa por bitola no Brasil.',
    ],
    cons: [
      'Atenção à referência do anúncio: há kits de 12 peças da Tramontina PRO de 6–19 mm e outros de 10–32 mm.',
      'Preço mais elevado que conjuntos de entrada.',
    ],
    targetAudience:
      'Mecânicos profissionais, técnicos de manutenção industrial e entusiastas que querem ferramentas definitivas.',
    comparisonNotes:
      'Destaca-se frente à The Black Tools TKCH12 e à linha de entrada pela metalurgia Cr-V de padrão industrial e perfil Hyper Drive.',
    faq: [
      {
        question: 'Todas as chaves Tramontina PRO de 12 peças têm as mesmas medidas?',
        answer: 'Não. A Tramontina PRO comercializa mais de uma combinação de 12 peças (como jogos de 6 a 19 mm e jogos pesados de 10 a 32 mm). Sempre confira a lista de milímetros na ficha do anúncio.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/tramontina-pro-jogo-chaves-combinadas-12-pecas',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },

  // --- Tipo 6: Jogos de soquetes e catracas ---
  {
    id: 'prod-stels-57-pecas',
    slug: 'jogo-soquetes-stels-57-pecas-1410155',
    title: 'Análise do Jogo de Soquetes e Bits Stels 57 Peças (Ref. 1410155)',
    name: 'Jogo de Ferramentas e Soquetes Stels 57 Peças 1/4" (Ref. 1410155)',
    brand: 'Stels',
    model: '14101 / 1410155 (57 Peças)',
    categorySlug: 'ferramentas-manuais',
    subcategory: 'Jogos de soquetes e catracas',
    toolType: 'Jogo de soquetes 1/4" 57 peças',
    application: 'Mecânica automotiva leve, motos, painéis, cofre de motor e eletrônica pesada',
    shortDescription:
      'Maleta com 57 peças em aço Cromo-Vanádio encaixe 1/4", somando soquetes curtos E soquetes longos (canhão) de 4 a 14 mm com catraca reversível.',
    introduction:
      'Enquanto os tradicionais jogos de 46 peças trazem apenas soquetes curtos, o Stels 57 peças (Ref. 1410155) agrega um conjunto de soquetes sextavados longos de 6 a 13 mm, fazendo grande diferença em prisioneiros compridos e locais fundos.',
    imageUrl: IMG_HAND_SOCKETS,
    specs: {
      marca: 'Stels',
      modelo: 'Ref. 1410155 (57 peças)',
      categoria: 'Ferramentas manuais',
      capacidade: 'Encaixe 1/4"; 13 soquetes curtos (4–14 mm) + 7 soquetes longos (6–13 mm) + 24 bits',
      peso: 'Aprox. 1,6 a 1,8 kg',
      dimensoes: 'Maleta termoplástica com fechos metálicos',
      acessoriosInclusos: 'Catraca reversível 1/4", extensões (50/100/150 mm), junta universal, cabo T, chave manual e chaves Allen',
      garantia: 'Conforme fabricante / importador',
    },
    highlights: [
      'Inclui 7 soquetes longos (6 a 13 mm)',
      'Fabricado em aço Cromo-Vanádio (Cr-V)',
      'Três extensões + junta universal inclusas',
      'Travas metálicas na maleta',
    ],
    featuresText:
      'A presença dos soquetes longos e das três extensões (incluindo 150 mm) amplia muito o alcance em coletores, suportes de alternador, carenagens de moto e móveis profundos, mantendo o conjunto compacto no padrão 1/4".',
    pros: [
      'Soquetes longos resolvem porcas em prisioneiros onde o soquete curto não alcança.',
      'Maleta resistente com fechos metálicos duráveis.',
      'Excelente variedade de bits Torx, Allen, Phillips e Fenda já montados em soquete.',
    ],
    cons: [
      'Encaixe de 1/4" continua limitado a torques leves/médios (não serve para rodas).',
      'Ligeiramente mais caro e volumoso que os kits compactos de 46 peças.',
    ],
    targetAudience:
      'Motociclistas, mecânicos de acabamento interno/injeção e entusiastas que querem mais versatilidade que um kit básico de 46 peças.',
    comparisonNotes:
      'Supera o Quicko 46 peças e o Hexon 46 peças pela inclusão dos 7 soquetes longos e terceira extensão, sendo o upgrade direto dentro do encaixe 1/4".',
    faq: [
      {
        question: 'Os soquetes do kit Stels 57 peças são sextavados ou estriados?',
        answer: 'São soquetes sextavados de 6 pontas em aço Cromo-Vanádio, oferecendo melhor apoio nas faces do parafuso sem danificar cantos.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/stels-57-pecas',
    salesInfo: 'Um dos jogos compactos em Cr-V mais procurados do Mercado Livre',
    verifiedAt: VERIFIED_DATE,
    featured: true,
    status: 'published',
  },
  {
    id: 'prod-quicko-46-pecas',
    slug: 'jogo-soquetes-quicko-46-pecas',
    title: 'Análise do Jogo de Ferramentas e Soquetes Quicko 46 Peças',
    name: 'Kit de Ferramentas e Soquetes Quicko 46 Peças Cr-V 1/4"',
    brand: 'Quicko',
    model: '46 Peças Cr-V 1/4"',
    categorySlug: 'ferramentas-manuais',
    subcategory: 'Jogos de soquetes e catracas',
    toolType: 'Jogo de soquetes 1/4" 46 peças',
    application: 'Reparos rápidos em carros, motos, bicicletas e eletrodomésticos',
    shortDescription:
      'Maleta de 46 peças em aço Cromo-Vanádio (50BV30) com catraca de 45 dentes e liberação rápida, soquetes de 4 a 14 mm e extensão flexível.',
    introduction:
      'O kit Quicko de 46 peças segue a arquitetura clássica e compacta de encaixe 1/4", diferenciando-se pela especificação de aço Cromo-Vanádio 50BV30 e catraca de 45 dentes com botão de soltura rápida.',
    imageUrl: IMG_HAND_SOCKETS,
    specs: {
      marca: 'Quicko',
      modelo: 'Jogo 46 Peças 1/4"',
      categoria: 'Ferramentas manuais',
      capacidade: 'Soquetes métricos 4 a 14 mm (encaixe 1/4"); catraca 45 dentes quick-release',
      peso: 'Aprox. 1,2 kg',
      dimensoes: 'Maleta termoplástica compacta',
      acessoriosInclusos: '13 soquetes, 21 bits soquete, catraca, extensões rígidas e flexível, junta universal, cabo T e chaves Allen',
      garantia: 'Conforme vendedor / importador',
    },
    highlights: [
      'Aço Cromo-Vanádio 50BV30',
      'Catraca 45 dentes com botão quick-release',
      'Extensão flexível e junta universal inclusas',
      'Extremamente portátil para porta-malas',
    ],
    featuresText:
      'Com ângulo de retorno de 8° (45 dentes), a catraca permite apertar e soltar parafusos em compartimentos apertados como suportes de bateria, painéis e mesas de guidão de bicicleta.',
    pros: [
      'Conjunto equilibrado de peças em maleta fina fácil de transportar.',
      'Botão de liberação rápida impede que o soquete fique preso no parafuso ao puxar a catraca.',
    ],
    cons: [
      'Sem soquetes longos (disponíveis apenas no kit Stels 57 peças).',
      'Extensão flexível deve ser usada apenas para aproximar parafusos, sem alto torque.',
    ],
    targetAudience:
      'Motoristas, ciclistas e usuários domésticos que querem um kit de emergência prático e completo.',
    comparisonNotes:
      'Praticamente idêntico em layout ao Hexon 46 peças e ao kit multimarca 46 peças, variando acabamento de maleta e especificação de aço declarada.',
    faq: [
      {
        question: 'A catraca 1/4" aguenta aperto pesado em polia ou roda?',
        answer: 'Não. Catracas de 1/4" são feitas para parafusos até 14 mm com torque moderado. Para aperto alto, utilize cabos de força ou encaixe 1/2".',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/kit-ferramentas-46-pecas-quicko',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },
  {
    id: 'prod-hexon-46-pecas',
    slug: 'jogo-soquetes-hexon-46-pecas',
    title: 'Análise do Jogo de Soquetes e Catraca Hexon 46 Peças',
    name: 'Jogo de Soquetes e Pontas Hexon 46 Peças 1/4" Cr-V',
    brand: 'Hexon',
    model: '46 Peças 1/4"',
    categorySlug: 'ferramentas-manuais',
    subcategory: 'Jogos de soquetes e catracas',
    toolType: 'Jogo de soquetes 1/4" 46 peças',
    application: 'Manutenção residencial, móveis, motos e elétrica leve',
    shortDescription:
      'Conjunto popular de 46 peças em Cromo-Vanádio encaixe 1/4" com soquetes de 4 a 14 mm, 21 pontas bits, extensões e maleta organizadora.',
    introduction:
      'O jogo Hexon de 46 peças aparece com frequência entre as opções mais competitivas no Mercado Livre Brasil, entregando o pacote completo de soquetes métricos 4–14 mm e pontas Torx/Allen/Phillips para reparos rápidos.',
    imageUrl: IMG_HAND_SOCKETS,
    specs: {
      marca: 'Hexon',
      modelo: 'Kit 46 Peças 1/4"',
      categoria: 'Ferramentas manuais',
      capacidade: '13 soquetes 4 a 14 mm; 21 bits soquete (Fenda, PH, PZ, Torx T10–T40, Hex 3–8)',
      peso: 'Aprox. 1,2 kg',
      dimensoes: 'Maleta plástica organizadora',
      acessoriosInclusos: 'Catraca reversível, 2 extensões rígidas, 1 extensão flexível, cabo T, junta universal e 3 chaves hexagonais',
      garantia: 'Conforme vendedor / importador',
    },
    highlights: [
      'Cobertura completa de bits Torx e Allen mais comuns',
      'Cabo manual tipo chave de fenda com encaixe 1/4" na base',
      'Preço bastante competitivo',
    ],
    featuresText:
      'O cabo tipo chave de fenda permite usar qualquer soquete ou bit com agilidade manual antes de aplicar o aperto final com a catraca reversível ou cabo T.',
    pros: [
      'Excelente relação custo por peça para ter uma maleta dedicada em casa ou no carro.',
      'Identificação marcada nas cavidades da maleta agiliza conferir se faltou alguma peça.',
    ],
    cons: [
      'Não indicado para torques elevados ou uso industrial contínuo.',
      'Travas plásticas da maleta exigem manuseio cuidadoso.',
    ],
    targetAudience:
      'Consumidores residenciais e hobbistas em busca de economia em um kit versátil de 1/4".',
    comparisonNotes:
      'Compara diretamente com o Quicko 46 peças em composição de itens, enquanto o Stels 57 peças se diferencia pelos soquetes longos e travas metálicas.',
    faq: [
      {
        question: 'Quais pontas Torx vêm no kit Hexon 46 peças?',
        answer: 'O padrão dessa maleta inclui pontas Torx T10, T15, T20, T25, T30 e T40 acopladas diretamente em base sextavada de 1/4".',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/hexon-46-pecas',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },

  // --- Tipo 7: Alicates ---
  {
    id: 'prod-vonder-alicate-8-1000v',
    slug: 'alicate-universal-vonder-8-isolado-1000v',
    title: 'Análise do Alicate Universal Vonder 8" Isolado 1.000 V',
    name: 'Alicate Universal Vonder 8" Aço Cr-V Isolado 1.000 V',
    brand: 'Vonder',
    model: 'Universal 8" Isolado 1000V',
    categorySlug: 'ferramentas-manuais',
    subcategory: 'Alicates',
    toolType: 'Alicate universal 8" isolado',
    application: 'Corte e torção de fios/cabos, manutenção elétrica e reparos gerais',
    shortDescription:
      'Alicate universal de 8" (203 mm) forjado em aço Cromo-Vanádio com cabo anatômico de abas protetoras e isolação testada para 1.000 V CA.',
    introduction:
      'O alicate universal Vonder de 8 polegadas isolado 1.000 V é voltado a eletricistas, instaladores e técnicos de manutenção que precisam de resistência mecânica em aço Cr-V e proteção contra choques em circuitos de baixa tensão.',
    imageUrl: IMG_HAND_TOOLS_SET,
    specs: {
      marca: 'Vonder',
      modelo: 'Universal 8" Isolado 1000V',
      categoria: 'Ferramentas manuais',
      voltagem: 'Isolação para até 1.000 V CA (conforme marcação no cabo)',
      capacidade: 'Comprimento 8" (203 mm); corte de arames macios e fios de cobre/alumínio',
      peso: 'Aprox. 0,38 kg',
      dimensoes: '203 mm',
      acessoriosInclusos: 'Não se aplica',
      garantia: '12 meses (padrão Vonder)',
    },
    highlights: [
      'Corpo em aço Cromo-Vanádio (Cr-V)',
      'Cabo isolado até 1.000 V com abas protetoras',
      'Ranhuras cruzadas no bico para melhor agarre',
      'Corte temperado por indução',
    ],
    featuresText:
      'As abas elevadas na transição entre o cabo e o metal evitam que os dedos escorreguem acidentalmente para a parte metálica durante trabalhos em quadros de distribuição. O bico plano e serrilhado garante boa pega em porcas e terminais.',
    pros: [
      'Construção robusta em aço Cromo-Vanádio na linha isolada.',
      'Empunhadura confortável com abas de segurança pronunciadas.',
      'Fácil de encontrar em todo o Brasil.',
    ],
    cons: [
      'Apenas o cabo possui isolação; jamais utilize se houver cortes ou trincas na capa protetora.',
      'Não indicado para cortar cabos de aço duro de bitola grossa.',
    ],
    targetAudience:
      'Eletricistas, técnicos de refrigeração, instaladores e caixa de ferramentas residencial.',
    comparisonNotes:
      'Compete diretamente com o Tramontina Master 8" 1000V e Stanley 8" 1000V, entregando corpo em Cr-V e ótima disponibilidade de estoque.',
    faq: [
      {
        question: 'Posso trabalhar com o circuito energizado usando alicate 1000V?',
        answer: 'Mesmo com isolação certificada para 1.000 V, as normas técnicas de segurança (como NR-10) determinam desligar o disjuntor sempre que possível e usar todos os EPIs adequados.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/alicate-universal-vonder-8-1000v',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },
  {
    id: 'prod-tramontina-alicate-8-1000v',
    slug: 'alicate-universal-tramontina-master-8-1000v',
    title: 'Análise do Alicate Universal Tramontina Master 8" 1.000 V',
    name: 'Alicate Universal Tramontina Master 8" Isolado 1.000 V',
    brand: 'Tramontina',
    model: 'Master 8" 1000V (Ref. 41001/108)',
    categorySlug: 'ferramentas-manuais',
    subcategory: 'Alicates',
    toolType: 'Alicate universal 8" isolado',
    application: 'Instalações elétricas prediais, corte de condutores e apertos diversos',
    shortDescription:
      'Clássico alicate universal de 8" da Tramontina em aço especial com têmpera por indução no gume de corte e isolação certificada 1.000 V NBR 9699.',
    introduction:
      'O Tramontina Master 8" isolado 1.000 V é provavelmente o alicate mais presente nas caixas de ferramentas brasileiras, combinando preço acessível, têmpera por indução no corte e atendimento às normas NBR 9699 e NR-10.',
    imageUrl: IMG_HAND_TOOLS_SET,
    specs: {
      marca: 'Tramontina',
      modelo: 'Master 8" (Ref. 41001/108)',
      categoria: 'Ferramentas manuais',
      voltagem: 'Isolação 1.000 V CA (normas ABNT NBR 9699 / NR-10)',
      capacidade: 'Tamanho nominal 8" (~200–203 mm)',
      peso: 'Aprox. 0,36 kg',
      dimensoes: 'Aprox. 200 x 55 x 22 mm',
      acessoriosInclusos: 'Não se aplica',
      garantia: 'Garantia contra defeitos de fabricação Tramontina',
    },
    highlights: [
      'Atende às normas NBR 9699 e NR-10 (1.000 V)',
      'Gume de corte temperado por indução',
      'Acabamento fosfatizado resistente',
      'Excelente custo-benefício nacional',
    ],
    featuresText:
      'Fabricado em aço carbono especial com tratamento térmico diferenciado no gume, preserva o fio de corte para cabos de cobre e arames leves sem trincar a lâmina. O cabo ergonômico traz textura antideslizante.',
    pros: [
      'Certificação explícita NBR 9699 / NR-10 para 1.000 V amplamente reconhecida.',
      'Preço muito competitivo frente a importados.',
      'Articulação suave após os primeiros usos.',
    ],
    cons: [
      'Aço carbono especial da linha Master não tem a mesma resistência extrema ao corte de aço duro da linha Tramontina PRO Cr-V.',
      'Requer leve lubrificação periódica na articulação contra ferrugem.',
    ],
    targetAudience:
      'Eletricistas prediais, instaladores, estudantes de elétrica e uso doméstico geral.',
    comparisonNotes:
      'Mais acessível que linhas PRO ou importadas, mantendo certificação clara NBR 9699 para 1.000 V.',
    faq: [
      {
        question: 'Qual a diferença entre o Tramontina Master e o Tramontina PRO?',
        answer: 'A linha Master atende uso geral e elétrico padrão em aço especial, enquanto a linha Tramontina PRO utiliza aço Cromo-Vanádio voltado a uso industrial severo.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/alicate-universal-tramontina-8-1000v',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },
  {
    id: 'prod-stanley-alicate-8-1000v',
    slug: 'alicate-universal-stanley-8-1000v',
    title: 'Análise do Alicate Universal Stanley 8" Profissional 1.000 V',
    name: 'Alicate Universal Stanley 8" Isolado 1.000 V Cr-Ni / Cr-V',
    brand: 'Stanley',
    model: 'STHT / 84-055 / Linha 1000V 8"',
    categorySlug: 'ferramentas-manuais',
    subcategory: 'Alicates',
    toolType: 'Alicate universal 8" isolado',
    application: 'Elétrica profissional, manutenção automotiva e mecânica geral',
    shortDescription:
      'Alicate universal de 8" (203 mm) em aço forjado Cromo-Níquel/Cromo-Vanádio com cabo bimaterial de dupla camada isolada para 1.000 V.',
    introduction:
      'A Stanley oferece alicates universais de 8" em versões de linha padrão e linha isolada 1.000 V (certificada conforme ABNT NBR 9699 / IEC 60900). Destaca-se pela empunhadura bimaterial confortável e boa rigidez na ponta.',
    imageUrl: IMG_HAND_TOOLS_SET,
    specs: {
      marca: 'Stanley',
      modelo: 'Universal 8" Isolado 1000V (verificar referência no anúncio)',
      categoria: 'Ferramentas manuais',
      voltagem: '1.000 V CA nas versões isoladas VDE/NBR 9699 (conferir antes da compra)',
      capacidade: 'Comprimento 8" (203 mm)',
      peso: 'Aprox. 0,38 kg',
      dimensoes: '203 mm',
      acessoriosInclusos: 'Não se aplica',
      garantia: 'Garantia limitada Stanley contra defeitos de fabricação',
    },
    highlights: [
      'Aço forjado resistente a torções laterais',
      'Cabo bimaterial de alta aderência',
      'Proteção para dedos contra deslizamento',
    ],
    featuresText:
      'Possui mandíbulas usinadas com precisão para segurar chapas finas e fios sem patinar, além de zona de corte reforçada próxima ao pino de articulação para maior alavancagem.',
    pros: [
      'Ótima ergonomia do cabo bimaterial mesmo com mãos suadas ou com luvas.',
      'Boa rigidez estrutural do aço forjado.',
    ],
    cons: [
      'Atenção redobrada no Mercado Livre: a Stanley vende alicates 8" amarelos e pretos comuns (não isolados para 1.000V) e versões VDE/1000V específicas — confira a gravação 1000V no cabo.',
    ],
    targetAudience:
      'Técnicos de manutenção, eletricistas e entusiastas que preferem empunhadura bimaterial.',
    comparisonNotes:
      'Empata em tamanho (8") com Vonder e Tramontina Master, mas exige conferir se o anúncio corresponde exatamente à versão certificada 1000V.',
    faq: [
      {
        question: 'Todo alicate Stanley amarelo e preto é isolado para 1000V?',
        answer: 'Não. A Stanley possui modelos padrão amarelo/preto apenas com revestimento ergonômico e modelos específicos gravados com 1000V / NBR 9699 (geralmente vermelho/amarelo ou linha isolada declarada). Confira a ficha do vendedor.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/alicate-universal-stanley-8-1000v',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },

  // --- Tipo 8: Martelos ---
  {
    id: 'prod-vonder-martelo-fibra-27',
    slug: 'martelo-unha-vonder-cabo-fibra-27mm',
    title: 'Análise do Martelo de Unha Vonder Cabo de Fibra 27 mm',
    name: 'Martelo de Unha Vonder Cabo de Fibra de Vidro 27 mm',
    brand: 'Vonder',
    model: 'Cabo Fibra 27 mm (ex.: Ref. 3589270000)',
    categorySlug: 'ferramentas-manuais',
    subcategory: 'Martelos',
    toolType: 'Martelo de unha cabo de fibra',
    application: 'Carpintaria, montagem de formas, reformas e fixação geral com pregos',
    shortDescription:
      'Martelo de unha com cabeça de 27 mm em aço forjado temperado e cabo em fibra de vidro revestido com empunhadura TPR que absorve vibrações.',
    introduction:
      'O martelo de unha Vonder com cabo em fibra de vidro na medida intermediária de 27 mm oferece maior resistência à umidade e impactos do que cabos de madeira tradicionais, reduzindo o recuo no punho ao pregar madeiras densas.',
    imageUrl: IMG_HAND_TOOLS_SET,
    specs: {
      marca: 'Vonder',
      modelo: 'Cabo de Fibra 27 mm',
      categoria: 'Ferramentas manuais',
      capacidade: 'Cabeça 27 mm; disponível também em versões 25 mm e 29 mm',
      peso: 'Aprox. 0,69 kg (total na versão 27 mm)',
      dimensoes: 'Comprimento total aprox. 330 mm',
      acessoriosInclusos: 'Não se aplica',
      garantia: '12 meses (Vonder)',
    },
    highlights: [
      'Cabo em fibra de vidro de alta resistência mecânica',
      'Empunhadura emborrachada TPR antiderrapante',
      'Não resseca ou empena com umidade',
      'Cabeça em aço forjado e temperado',
    ],
    featuresText:
      'A combinação de núcleo em fibra de vidro com capa em borracha termoplástica (TPR) amortece o impacto transmitido ao braço em batidas repetitivas. A unha curva facilita a extração de pregos médios e grandes.',
    pros: [
      'Muito mais resistente a quebras por erro de mira perto da cabeça do que cabos de madeira comuns.',
      'Pegada firme mesmo com mãos suadas.',
      'Medida de 27 mm equilibra bem potência de batida e controle.',
    ],
    cons: [
      'Cabo de fibra tem custo ligeiramente superior ao de madeira simples.',
      'Se a fixação epóxi sofrer impacto extremo lateral inadequado, exige inspeção antes do uso.',
    ],
    targetAudience:
      'Carpinteiros, pedreiros, montadores de telhados e usuários residenciais que querem um martelo durável.',
    comparisonNotes:
      'Frente ao Tramontina Master 27 mm de cabo de madeira, oferece maior resistência climática e absorção de impacto pelo cabo em fibra. Frente ao LFAL, traz especificações e peso mais bem padronizados por bitola.',
    faq: [
      {
        question: 'Qual medida escolher: 25 mm, 27 mm ou 29 mm?',
        answer: '25 mm é mais leve para uso doméstico e pregos finos; 27 mm é a medida coringa ideal para oficinas e reformas; 29 mm é mais pesada e voltada a carpintaria estrutural pesada.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/martelo-unha-vonder-cabo-fibra-27mm',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },
  {
    id: 'prod-lfal-martelo-fibra',
    slug: 'martelo-unha-lfal-cabo-fibra',
    title: 'Análise do Martelo de Unha LFAL Cabo de Fibra',
    name: 'Martelo de Unha LFAL Cabo de Fibra Emborrachado',
    brand: 'LFAL',
    model: 'Martelo Unha Cabo de Fibra',
    categorySlug: 'ferramentas-manuais',
    subcategory: 'Martelos',
    toolType: 'Martelo de unha cabo de fibra',
    application: 'Construção civil leve, reparos domésticos e reformas gerais',
    shortDescription:
      'Martelo de unha popular em marketplaces com cabeça metálica de impacto, unha extratora e cabo leve em fibra de vidro com pega emborrachada.',
    introduction:
      'Presente em grande volume no Mercado Livre Brasil em anúncios unitários e kits promocionais, o martelo de unha LFAL com cabo de fibra atende quem busca uma ferramenta funcional e econômica para caixa de ferramentas básica.',
    imageUrl: IMG_HAND_TOOLS_SET,
    specs: {
      marca: 'LFAL',
      modelo: 'Cabo de Fibra Emborrachado (conferir mm no anúncio)',
      categoria: 'Ferramentas manuais',
      capacidade: 'Cabeça aço resistente para pregar e remover pregos (diâmetro varia conforme anúncio, comum 27 mm)',
      peso: 'Não informado (varia conforme bitola do lote)',
      dimensoes: 'Não informado',
      acessoriosInclusos: 'Alguns anúncios são vendidos em kit com 2 unidades',
      garantia: 'Conforme vendedor / importador',
    },
    highlights: [
      'Cabo em fibra de vidro leve',
      'Empunhadura emborrachada ergonômica',
      'Preço bastante acessível em kits e unidades',
    ],
    featuresText:
      'Adota a construção moderna de cabo sintético em fibra revestido por borracha texturizada para minimizar vibração no uso doméstico e pequenas reformas sem exigir manutenção do cabo.',
    pros: [
      'Custo muito baixo para ter um cabo de fibra em vez de madeira simples.',
      'Leve para trabalhos ocasionais em casa.',
    ],
    cons: [
      'Fichas técnicas dos anúncios variam quanto ao diâmetro exato da face e peso da cabeça — confira sempre antes de comprar.',
      'Menor histórico de uso em carpintaria pesada diária em comparação a Tramontina ou Vonder.',
    ],
    targetAudience:
      'Consumidores residenciais, síndicos, pequenas reformas e kits de manutenção básica.',
    comparisonNotes:
      'Compete pelo menor preço dentro do grupo de cabos em fibra, enquanto Vonder e Tramontina entregam maior padronização documental e de dureza da cabeça.',
    faq: [
      {
        question: 'O que conferir ao comprar o martelo LFAL no Mercado Livre?',
        answer: 'Confirme no anúncio o diâmetro exato da cabeça (ex.: 25 mm ou 27 mm) e se o pacote refere-se a 1 unidade ou kit com 2 peças.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/martelo-unha-lfal-cabo-fibra',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },
  {
    id: 'prod-tramontina-martelo-27',
    slug: 'martelo-unha-tramontina-master-profissional-27mm',
    title: 'Análise do Martelo de Unha Profissional Tramontina Master 27 mm',
    name: 'Martelo de Unha Tramontina Master Profissional 27 mm',
    brand: 'Tramontina',
    model: 'Master 27 mm (Ref. 40370/027 ou 40200/027)',
    categorySlug: 'ferramentas-manuais',
    subcategory: 'Martelos',
    toolType: 'Martelo de unha profissional',
    application: 'Carpintaria profissional, marcenaria, reformas e construção civil',
    shortDescription:
      'Martelo clássico de 27 mm com cabeça forjada em aço especial temperado nas áreas de impacto e unha, fixada por resina epóxi ao cabo.',
    introduction:
      'A linha Tramontina Master (disponível em versões de 25, 27 e 29 mm com cabo de madeira envernizada ou opções em polímero/fibra) é o padrão clássico brasileiro pela precisão do tratamento térmico localizado na face de batida.',
    imageUrl: IMG_HAND_TOOLS_SET,
    specs: {
      marca: 'Tramontina',
      modelo: 'Master 27 mm (40370/027 Jateado / 40200/027 Polido)',
      categoria: 'Ferramentas manuais',
      capacidade: 'Face de impacto 27 mm (também fabricado em 29 mm para serviço pesado)',
      peso: 'Aprox. 0,55 a 0,60 kg (versão 27 mm cabo madeira)',
      dimensoes: 'Balanceamento ergonômico tradicional',
      acessoriosInclusos: 'Não se aplica',
      garantia: 'Garantia contra defeitos de fabricação Tramontina',
    },
    highlights: [
      'Cabeça forjada em aço especial com têmpera localizada',
      'Fixação com resina epóxi para evitar folga da cabeça',
      'Disponibilidade em 25 mm, 27 mm e 29 mm',
      'Acabamento envernizado ou polido contra oxidação',
    ],
    featuresText:
      'A Tramontina aplica tratamento térmico diferenciado: a face de impacto e a ponta da unha recebem alta dureza para não amassar nem abrir ao arrancar pregos, mantendo o núcleo da cabeça menos quebradiço.',
    pros: [
      'Controle rigoroso da dureza do aço evitando lascas perigosas (respeitando superfícies < 45 HRC).',
      'Balanceamento tradicional preferido por muitos carpinteiros profissionais.',
      'Ampla variedade de tamanhos (25, 27 e 29 mm) fáceis de identificar pelo código.',
    ],
    cons: [
      'Versões com cabo de madeira exigem evitar umidade constante para não dilatar ou ressecar.',
      'Cabos em madeira absorvem menos vibração que cabos modernos com empunhadura TPR.',
    ],
    targetAudience:
      'Carpinteiros, marceneiros, pedreiros e profissionais que valorizam aço confiável e balanceamento clássico.',
    comparisonNotes:
      'Para quem prefere resistência à umidade e pega emborrachada, o Vonder Cabo de Fibra 27 mm (ou a versão Tramontina fibra 40700/227) leva vantagem; para marcenaria seca tradicional, o Tramontina Master 27 mm é referência.',
    faq: [
      {
        question: 'Posso usar martelo de unha para bater em talhadeira de aço ou aço temperado?',
        answer: 'Não. Nunca golpeie superfícies metálicas com dureza superior a 45 HRC usando martelo de unha comum, pois há risco de lascamento da face de aço. Use marreta ou martelo de bola apropriado.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/martelo-unha-tramontina-27mm',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },

  // =========================================================================
  // 3. EQUIPAMENTOS AUTOMOTIVOS (10 novos modelos + 2 originais = 12 modelos nos 4 tipos)
  // =========================================================================

  // --- Tipo 9: Scanners automotivos (ELM327 já existe como prod-scanner-obd2-elm327) ---
  {
    id: 'prod-scanner-v519',
    slug: 'scanner-automotivo-v519-obd2',
    title: 'Análise do Scanner Automotivo V519 OBD2 com Tela Colorida',
    name: 'Scanner Automotivo V519 OBD2 / EOBD Tela 2,8"',
    brand: 'V519 (Multimarca)',
    model: 'V519 OBD2',
    categorySlug: 'equipamentos-automotivos',
    subcategory: 'Scanners automotivos',
    toolType: 'Scanner automotivo com tela',
    application: 'Diagnóstico de injeção eletrônica, leitura/limpeza DTC e teste rápido de bateria',
    shortDescription:
      'Leitor OBD2 autônomo com tela colorida de 2,8", suporte a 9 protocolos, menu em português, teste de bateria em tempo real e sem depender de celular.',
    introduction:
      'O scanner V519 evolui a experiência do usuário em relação ao adaptador ELM327 ao trazer tela colorida própria de 2,8 polegadas, botões físicos e alimentação direta pela tomada OBD2 do carro, dispensando pareamento Bluetooth.',
    imageUrl: IMG_AUTOMOTIVE,
    specs: {
      marca: 'V519 (OEM)',
      modelo: 'V519 OBD2',
      categoria: 'Equipamentos automotivos',
      voltagem: 'DC 9V a 16V (alimentado via tomada OBD2 16 pinos)',
      capacidade: '9 protocolos OBD2/EOBD/CAN; tela 2,8" (240x320); biblioteca de DTCs; Modo 6/8; Sonda O2; teste tensão bateria',
      peso: 'Não informado',
      dimensoes: 'Portátil com cabo fixo',
      acessoriosInclusos: 'Scanner com cabo OBD2 integrado e manual',
      garantia: 'Conforme vendedor / importador',
    },
    highlights: [
      'Tela colorida de 2,8" (dispensa smartphone)',
      'Idioma português e consulta de códigos DTC',
      'Monitoramento de tensão da bateria e I/M Readiness',
      '9 protocolos OBD2/CAN suportados',
    ],
    featuresText:
      'Basta conectar o cabo na tomada de diagnóstico do carro e girar a chave para ler e apagar códigos de falha do motor, checar prontidão de emissões (I/M Readiness), visualizar dados congelados (Freeze Frame) e gráficos ao vivo de sensores da ECU.',
    pros: [
      'Pronto para usar a qualquer momento sem instalar aplicativo ou depender da bateria do celular.',
      'Tela de 2,8" maior que leitores compactos de entrada.',
      'Função de monitoramento de tensão ajuda a avaliar bateria e alternador.',
    ],
    cons: [
      'Focado apenas em motor/injeção OBD2 padrão: NÃO lê módulos de ABS, Airbag (SRS) ou câmbio automático.',
      'Carros nacionais mais antigos sem padrão OBD2 completo podem não comunicar.',
    ],
    targetAudience:
      'Proprietários de veículos, vendedores de carros seminovos e pequenas oficinas que querem um leitor prático independente de celular.',
    comparisonNotes:
      'Mais completo e autônomo que o ELM327 Bluetooth por ter tela própria de 2,8". Frente ao Launch Creader CR3001, oferece visor maior pelo custo reduzido, enquanto o Launch entrega suporte oficial de marca tradicional e atualização USB.',
    faq: [
      {
        question: 'O scanner V519 apaga luz de Airbag ou ABS?',
        answer: 'Não. Ele atua sobre protocolos genéricos OBD2 do módulo de injeção eletrônica (motor e emissões). Diagnósticos de ABS e Airbag exigem scanners multimarcas profissionais avançados.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/scanner-automotivo-v519',
    verifiedAt: VERIFIED_DATE,
    featured: true,
    status: 'published',
  },
  {
    id: 'prod-launch-cr3001',
    slug: 'scanner-automotivo-launch-creader-cr3001',
    title: 'Análise do Scanner Automotivo Launch Creader CR3001 OBD2',
    name: 'Scanner Automotivo Launch Creader CR3001 OBD2 Completo',
    brand: 'Launch',
    model: 'Creader CR3001',
    categorySlug: 'equipamentos-automotivos',
    subcategory: 'Scanners automotivos',
    toolType: 'Scanner automotivo com tela',
    application: 'Diagnóstico de falha P0xxx, inspeção de sensores O2, EVAP e leitura de VIN',
    shortDescription:
      'Leitor OBD2 de marca tradicional em diagnóstico automotivo, com os 10 modos completos OBD-II, menu em português, DTC Lookup e atualização via USB.',
    introduction:
      'A Launch é uma das fabricantes mais respeitadas em equipamentos de oficina no mundo, e o Creader CR3001 é seu modelo de entrada compacto para proprietários e eletricistas verificarem os 10 modos completos OBD-II.',
    imageUrl: IMG_AUTOMOTIVE,
    specs: {
      marca: 'Launch',
      modelo: 'Creader CR3001',
      categoria: 'Equipamentos automotivos',
      voltagem: '9V a 18V DC via conector OBD-II',
      capacidade: '10 modos OBD-II completos ($01–$0A), DTC Lookup, gráfico ao vivo, teste O2 e EVAP, idioma português',
      peso: 'Aprox. 0,25 kg',
      dimensoes: 'Tela TFT colorida compacta (1,77" a 2,4" conf. revisão)',
      acessoriosInclusos: 'Scanner CR3001, cabo OBD-II fixo e cabo USB para atualização de firmware',
      garantia: '12 meses (conforme distribuidor autorizado)',
    },
    highlights: [
      'Marca referência mundial em diagnóstico (Launch)',
      'Suporte completo aos 10 modos OBD-II',
      'Biblioteca interna DTC Lookup em português',
      'Atualizável via computador (USB)',
    ],
    featuresText:
      'Além de ler e apagar falhas genéricas da injeção, o CR3001 executa testes de sensor de oxigênio (sonda lambda), monitoramento de sistema evaporativo (EVAP), leitura do número do chassi (VIN) e exibição gráfica de parâmetros em tempo real.',
    pros: [
      'Estabilidade de software e compatibilidade superior a réplicas genéricas sem marca.',
      'Menu em português e atualização via porta USB gratuita pelo fabricante.',
      'Corpo robusto e muito fácil de guardar no porta-luvas.',
    ],
    cons: [
      'Não acessa ABS, Airbag (SRS) nem funções de serviço como reset de óleo/freio eletrônico.',
      'Tela menor do que scanners como o V519.',
    ],
    targetAudience:
      'Mecânicos que querem um leitor OBD2 rápido de bolso confiável e motoristas exigentes que priorizam marca reconhecida.',
    comparisonNotes:
      'Traz a confiabilidade de hardware/firmware da marca Launch frente a opções genéricas como V519 e ELM327.',
    faq: [
      {
        question: 'O Launch CR3001 funciona em qualquer carro brasileiro?',
        answer: 'Funciona em veículos a gasolina/flex com padrão OBD-II completo (em geral fabricados a partir de 2010 no Brasil; alguns importados desde 1996/2000). Carros antigos pré-OBD2 ou alguns utilitários específicos exigem protocolos proprietários.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/launch-creader-cr3001',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },

  // --- Tipo 10: Carregadores de bateria ---
  {
    id: 'prod-trafotron-cf5ah',
    slug: 'carregador-bateria-trafotron-cf5ah-12v-5a',
    title: 'Análise do Carregador de Bateria Trafotron CF5AH 12V 5A',
    name: 'Carregador de Bateria Automotivo Trafotron CF5AH 12V 5A Bivolt',
    brand: 'Trafotron',
    model: 'CF5AH',
    categorySlug: 'equipamentos-automotivos',
    subcategory: 'Carregadores de bateria',
    toolType: 'Carregador de bateria 12V',
    application: 'Recarga lenta e semirrápida de baterias automotivas e náuticas 12V',
    shortDescription:
      'Carregador nacional em gabinete metálico de 5A (60 W), chave seletora bivolt, modo carga lenta/rápida e proteção contra inversão de polaridade.',
    introduction:
      'O Trafotron CF5AH é um carregador robusto fabricado no Brasil em gabinete metálico, projetado para entregar até 5 amperes contínuos em sistemas 12V com opção de carga lenta e proteção contra erro na conexão das garras.',
    imageUrl: IMG_AUTOMOTIVE,
    specs: {
      marca: 'Trafotron',
      modelo: 'CF5AH',
      categoria: 'Equipamentos automotivos',
      potencia: '60 W',
      voltagem: 'Entrada Bivolt chaveado (110V/220V) | Saída 12V (máx. ~15,2V)',
      capacidade: 'Corrente de saída 5A; indicado para baterias de carros e motos 12V',
      peso: 'Aprox. 1,1 kg',
      dimensoes: 'Gabinete metálico compacto',
      acessoriosInclusos: 'Cabos com garras jacaré vermelho/preto integrados',
      garantia: 'Conforme fabricante Trafotron',
    },
    highlights: [
      'Gabinete metálico resistente para oficina',
      'Saída de 5A (60 W) para carga lenta e semirrápida',
      'Proteção contra inversão, sobrecarga e curto',
      'Fabricação nacional com assistência direta',
    ],
    featuresText:
      'Oferece seleção de intensidade de carga com LED indicador de polaridade invertida e fusível de segurança, protegendo o equipamento contra ligações acidentais invertidas nos bornes.',
    pros: [
      'Construção em aço muito mais resistente a quedas na garagem do que carcaças plásticas leves.',
      'Marca nacional tradicional em transformadores e carregadores.',
      'Possui proteções elétricas contra curto-circuito e inversão.',
    ],
    cons: [
      'Não conta com visor digital LCD exibindo voltagem exata nem função pulso de dessulfatação automática.',
      'Chave bivolt manual exige atenção antes de ligar na tomada 220V.',
    ],
    targetAudience:
      'Oficinas mecânicas, autoelétricas e usuários de garagem que valorizam robustez física e simplicidade nacional.',
    comparisonNotes:
      'Enquanto Woosh e Zeno oN 12V 6A apostam em visor LCD digital, pulso de recuperação e bivolt automático em corpo plástico, o Trafotron CF5AH prioriza robustez em metal e construção tradicional.',
    faq: [
      {
        question: 'O Trafotron CF5AH serve para dar partida imediata (chupeta)?',
        answer: 'Não. Com saída de 5A, ele é um carregador para recarregar a bateria gradualmente (várias horas conforme os Ah da bateria), não um auxiliar de partida de alta corrente.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/trafotron-cf5ah',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },
  {
    id: 'prod-woosh-12v-6a',
    slug: 'carregador-inteligente-bateria-woosh-12v-6a',
    title: 'Análise do Carregador Inteligente de Bateria Woosh 12V 6A',
    name: 'Carregador Inteligente de Bateria Woosh 12V 6A com Display LCD',
    brand: 'Woosh',
    model: '12V 6A Inteligente Pulse Repair',
    categorySlug: 'equipamentos-automotivos',
    subcategory: 'Carregadores de bateria',
    toolType: 'Carregador inteligente microprocessado',
    application: 'Recarga automática, manutenção e dessulfatação por pulso em baterias 12V (4Ah–100Ah)',
    shortDescription:
      'Carregador microprocessado bivolt automático de 6A com display LCD, modo recuperação por pulso e desligamento automático ao completar 100%.',
    introduction:
      'O carregador Woosh 12V 6A ganhou enorme popularidade no Mercado Livre Brasil por unir bivolt automático, visor LCD completo (tensão, amperagem e temperatura) e gerenciamento microprocessado em um aparelho de bolso.',
    imageUrl: IMG_AUTOMOTIVE,
    specs: {
      marca: 'Woosh',
      modelo: '12V 6A Smart Charger',
      categoria: 'Equipamentos automotivos',
      voltagem: 'Entrada Bivolt automática (110V–220V) / Saída 12V controlada',
      capacidade: '6A máx.; recomendado para baterias 12V de 4Ah a 100Ah',
      peso: 'Aprox. 0,45 kg',
      dimensoes: 'Compacto portátil com cooler integrado',
      acessoriosInclusos: 'Cabos com garras jacaré integradas e manual',
      garantia: 'Conforme vendedor / importador',
    },
    highlights: [
      'Entrada bivolt automática sem risco de erro',
      'Display LCD com leitura em tempo real (V, A, °C)',
      'Desligamento / flutuação automática no fim da carga',
      'Modo reparo por pulso para baterias paradas',
    ],
    featuresText:
      'Equipado com sensor térmico interno para ajustar a curva de carga conforme o ambiente (modos verão/inverno) e botão capacitivo para selecionar o modo carro, moto, AGM ou reparo por pulso de alta frequência.',
    pros: [
      'Totalmente automático: não ferve a bateria se ficar ligado após completar 100%.',
      'Leitura imediata da voltagem da bateria antes mesmo de ligar na tomada.',
      'Muito leve para guardar no porta-malas.',
    ],
    cons: [
      'A função pulso auxilia baterias sulfatadas parcialmente, mas não ressuscita baterias com placas em curto ou 0V absoluto.',
      'Carcaça plástica exige cuidado contra quedas no piso da oficina.',
    ],
    targetAudience:
      'Proprietários de carros pouco usados, motociclistas e garagens residenciais que querem praticidade automática.',
    comparisonNotes:
      'Compartilha arquitetura semelhante ao Zeno oN 12V 6A, superando o Trafotron CF5AH em automação e visor LCD, mas com carcaça menos pesada.',
    faq: [
      {
        question: 'Qual bateria o Woosh 12V 6A consegue carregar?',
        answer: 'É dimensionado para baterias de chumbo-ácido, AGM e Gel de 12V com capacidade entre 4Ah (motos) e 100Ah (carros e SUVs leves). Não usar em baterias 24V de caminhões.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/carregador-bateria-woosh-12v-6a',
    salesInfo: 'Modelo entre os mais vendidos e avaliados na categoria no Mercado Livre',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },
  {
    id: 'prod-zeno-on-12v-6a',
    slug: 'carregador-inteligente-bateria-zeno-on-12v-6a',
    title: 'Análise do Carregador Inteligente de Bateria Zeno oN 12V 6A',
    name: 'Carregador Inteligente Automotivo Zeno oN 12V 6A Display Digital',
    brand: 'Zeno oN',
    model: '12V 6A Digital Bivolt',
    categorySlug: 'equipamentos-automotivos',
    subcategory: 'Carregadores de bateria',
    toolType: 'Carregador inteligente microprocessado',
    application: 'Recarga inteligente, flutuação e recuperação de baterias 12V de carros e motos',
    shortDescription:
      'Carregador microprocessado bivolt de 6A com display LCD em tempo real, modo de flutuação segura, modo reparo por pulso e proteções eletrônicas.',
    introduction:
      'O Zeno oN 12V 6A pertence à mesma família de carregadores digitais inteligentes amplamente distribuídos no e-commerce brasileiro, trazendo carregamento em múltiplos estágios para preservar baterias entre 4Ah e 100Ah.',
    imageUrl: IMG_AUTOMOTIVE,
    specs: {
      marca: 'Zeno oN',
      modelo: '12V 6A Inteligente',
      categoria: 'Equipamentos automotivos',
      voltagem: 'Bivolt automático 110V/220V | Saída 12V DC',
      capacidade: 'Até 6A; baterias 12V de 4Ah a 100Ah',
      peso: 'Aprox. 0,45 kg',
      dimensoes: 'Compacto portátil',
      acessoriosInclusos: 'Garras jacaré isoladas e manual',
      garantia: 'Conforme vendedor / importador',
    },
    highlights: [
      'Carga em estágios com corte automático',
      'Display digital de tensão, corrente e nível',
      'Proteção contra inversão de polaridade e curto',
      'Bivolt automático prático para viagens',
    ],
    featuresText:
      'Ao detectar a conexão correta das garras, o circuito ajusta automaticamente a amperagem até 6A e reduz progressivamente próximo de 100%, mantendo modo seguro sem sobrecarga nem aquecimento excessivo da bateria.',
    pros: [
      'Fácil leitura dos dados elétricos direto no visor.',
      'Proteção confiável contra ligação invertida acidental.',
      'Ótimo custo-benefício para uso residencial.',
    ],
    cons: [
      'Projeto muito similar ao de outros carregadores importados da mesma faixa (como Woosh 12V 6A).',
      'Ventoinha interna gera ruído leve durante a carga máxima.',
    ],
    targetAudience:
      'Motoristas que deixam o carro parado por dias, colecionadores de carros antigos e uso doméstico geral.',
    comparisonNotes:
      'Equivalente funcional direto do Woosh 12V 6A; na decisão entre os dois, compare garantia do vendedor, comprimento de cabo e preço atualizado na oferta.',
    faq: [
      {
        question: 'Posso deixar o Zeno oN conectado durante a noite inteira?',
        answer: 'Sim. Como ele possui controle microprocessado e desligamento automático ao completar a carga, não há risco de sobrecarga em baterias saudáveis.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/carregador-bateria-zeno-on-12v-6a',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },

  // --- Tipo 11: Compressores portateis ---
  {
    id: 'prod-verunto-ver-b15',
    slug: 'compressor-portatil-verunto-ver-b15-150psi',
    title: 'Análise do Compressor de Ar Portátil VERUNTO VER-B15 (150 PSI)',
    name: 'Compressor de Ar Portátil Digital a Bateria VERUNTO VER-B15 150 PSI',
    brand: 'VERUNTO',
    model: 'VER-B15',
    categorySlug: 'equipamentos-automotivos',
    subcategory: 'Compressores portáteis',
    toolType: 'Compressor portátil a bateria',
    application: 'Calibragem emergencial de pneus de carros, motos, bicicletas e bolas sem fio',
    shortDescription:
      'Calibrador portátil sem fio com pressão máxima de 150 PSI, fluxo de ~25 L/min, bateria interna de 2.000 mAh USB-C, parada automática e apenas 380 g.',
    introduction:
      'O VERUNTO VER-B15 aposta na portabilidade extrema: pesando cerca de 380 gramas e carregado via USB-C, elimina a dependência da tomada 12V do carro para calibrar pneus de bicicletas, motos ou completar pressão de carros.',
    imageUrl: IMG_AUTOMOTIVE,
    specs: {
      marca: 'VERUNTO',
      modelo: 'VER-B15',
      categoria: 'Equipamentos automotivos',
      potencia: '50 W',
      voltagem: 'Bateria interna 7,4V (2.000 mAh) com recarga USB-C 5V',
      pressao: 'Até 150 PSI (PSI / BAR / KPA / KG/cm²)',
      vazao: 'Aprox. 25 L/min',
      peso: 'Aprox. 380 g',
      dimensoes: 'Portátil compacto para porta-luvas ou mochila',
      acessoriosInclusos: 'Mangueira de ar, adaptadores Presta/bola/inflável, cabo USB-C',
      garantia: 'Conforme vendedor / importador',
    },
    highlights: [
      'Totalmente sem fio com bateria USB-C',
      'Pressão máxima até 150 PSI e auto-desligamento',
      'Peso ultraleve de cerca de 380 g',
      'Lanterna LED de emergência integrada',
    ],
    featuresText:
      'Permite programar a pressão alvo no display digital e inicia a calibragem com parada automática ao atingir o valor definido. A lanterna integrada auxilia em trocas ou calibragens noturnas.',
    pros: [
      'Extremamente prático para motos, bicicletas e ajustes rápidos no carro sem puxar fios.',
      'Recarga universal via cabo USB-C.',
      'Cabe facilmente no porta-luvas ou bolsa de selim.',
    ],
    cons: [
      'Bateria de 2.000 mAh é voltada a ajustes rápidos; encher múltiplos pneus grandes totalmente zerados exige pausa e recarga.',
      'Esquenta no bico metálico após alguns minutos seguidos de uso.',
    ],
    targetAudience:
      'Ciclistas, motociclistas e motoristas que desejam um calibrador compacto de bolso no carro.',
    comparisonNotes:
      'Frente ao OSRAM TYREinflate 450 (alimentado na tomada 12V do carro), o VERUNTO ganha em liberdade sem fio e leveza, mas tem autonomia limitada pela bateria interna.',
    faq: [
      {
        question: 'O VERUNTO VER-B15 enche um pneu de carro completamente vazio?',
        answer: 'Para completar de 24 para 32 PSI nos quatro pneus ele atende bem. Se um pneu de SUV estiver totalmente zerado no aro, modelos ligados direto no 12V (como OSRAM ou AstroAI 12V) têm mais autonomia térmica e elétrica.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/compressor-portatil-verunto-ver-b15',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },
  {
    id: 'prod-astroai-150psi',
    slug: 'compressor-portatil-astroai-digital-150psi',
    title: 'Análise do Compressor de Ar Portátil AstroAI 150 PSI Digital',
    name: 'Compressor de Ar Portátil Digital AstroAI 150 PSI com Auto-Stop',
    brand: 'AstroAI',
    model: 'Digital 150 PSI (12V / Bateria conf. versão)',
    categorySlug: 'equipamentos-automotivos',
    subcategory: 'Compressores portáteis',
    toolType: 'Compressor portátil digital',
    application: 'Calibragem de pneus automotivos, SUVs médios, bicicletas e infláveis',
    shortDescription:
      'Compressor digital de marca global reconhecida com teto de 150 PSI, visor LCD retroiluminado, desligamento automático e lanterna de emergência.',
    introduction:
      'A AstroAI conquistou espaço sólido com compressores portáteis digitais confiáveis até 150 PSI. Comercializados no Brasil em versões ligadas ao 12V do veículo ou a bateria recarregável, trazem visor claro e auto-desligamento preciso.',
    imageUrl: IMG_AUTOMOTIVE,
    specs: {
      marca: 'AstroAI',
      modelo: 'Compressor Digital 150 PSI (conferir se versão 12V AC/DC ou bateria)',
      categoria: 'Equipamentos automotivos',
      voltagem: '12V DC veicular ou bateria recarregável (conforme modelo exato do anúncio)',
      pressao: 'Até 150 PSI (PSI / BAR / KPA / KG/cm²)',
      capacidade: 'Ciclo de uso contínuo recomendado de 10–15 min; pneu 0–35 PSI em ~4–5 min (versão 12V)',
      peso: 'Não informado (varia conforme versão)',
      dimensoes: 'Compacto com compartimento para cabo/bicos',
      acessoriosInclusos: 'Bicos para bola, válvula Presta, infláveis e bolsa/manual (conforme versão)',
      garantia: 'Conforme vendedor / importador',
    },
    highlights: [
      'Visor LCD digital retroiluminado legível à noite',
      'Desligamento automático na pressão programada',
      '4 unidades de medida (PSI, BAR, KPA, KG/cm²)',
      'Lanterna LED para emergências na estrada',
    ],
    featuresText:
      'Permite configurar exatamente a calibragem do manual do veículo (ex.: 32 PSI), acompanhar o enchimento em tempo real na tela e confiar no corte automático sem precisar ficar checando com manômetro separado.',
    pros: [
      'Boa precisão de leitura e controle automático ao atingir a pressão alvo.',
      'Marca consolidada internacionalmente em acessórios automotivos.',
      'Acompanha adaptadores variados para uso além do carro.',
    ],
    cons: [
      'A AstroAI possui várias versões no Mercado Livre (com fio 12V, dupla fonte AC/DC e a bateria L7) — confira o tipo de alimentação antes de fechar o pedido.',
      'Exige respeito ao ciclo de descanso de 10 a 15 minutos para preservar o pistão.',
    ],
    targetAudience:
      'Motoristas de viagem e famílias que procuram um calibrador digital confiável para manter no porta-malas.',
    comparisonNotes:
      'Concorre com o OSRAM TYREinflate 450 nas versões 12V, oferecendo teto de pressão nominal maior (150 PSI vs. 80 PSI na OSRAM) e forte apelo de praticidade.',
    faq: [
      {
        question: 'Posso ligar compressor 12V com o motor do carro desligado?',
        answer: 'Recomenda-se ligar o motor do veículo durante o uso de compressores 12V na tomada auxiliar para evitar queda de tensão e preservar a bateria do carro.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/compressor-portatil-astroai-150-psi',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },
  {
    id: 'prod-osram-tyreinflate-450',
    slug: 'compressor-portatil-osram-tyreinflate-450',
    title: 'Análise do Compressor Portátil OSRAM TYREinflate 450 Digital 12V',
    name: 'Compressor Portátil Digital OSRAM TYREinflate 450 (12V)',
    brand: 'OSRAM',
    model: 'TYREinflate 450 (OTI450)',
    categorySlug: 'equipamentos-automotivos',
    subcategory: 'Compressores portáteis',
    toolType: 'Compressor portátil 12V',
    application: 'Enchimento rápido de pneus automotivos via tomada 12V na estrada ou garagem',
    shortDescription:
      'Compressor automotivo oficial OSRAM alimentado pela tomada 12V, com parada automática digital, cabo de longo alcance e enchimento de pneu 13" em ~3,5 minutos.',
    introduction:
      'O OSRAM TYREinflate 450 traz a engenharia alemã da marca para o kit de emergência do carro. Alimentado pela tomada 12V veicular, prioriza velocidade real de enchimento, cabo retrátil organizado e precisão de +/- 0,1 bar.',
    imageUrl: IMG_AUTOMOTIVE,
    specs: {
      marca: 'OSRAM',
      modelo: 'TYREinflate 450 (OTI450)',
      categoria: 'Equipamentos automotivos',
      voltagem: '12V DC (conector veicular)',
      pressao: 'Até 5,5 bar (aprox. 80 PSI), precisão ±0,1 bar',
      vazao: 'Não informado oficialmente pelo fabricante',
      capacidade: 'Infla pneu 13" vazio até 35 PSI em aprox. 3,5 minutos',
      peso: 'Não informado',
      dimensoes: 'Corpo plano com enrolador de cabo e compartimento de tampas de válvula',
      acessoriosInclusos: 'Kit de 3 adaptadores (bicicleta, bola, infláveis) e estojo/compartimento integrado',
      garantia: '12 a 24 meses conforme política OSRAM Brasil',
    },
    highlights: [
      'Enche um pneu 13" até 35 PSI em cerca de 3,5 minutos',
      'Desligamento automático digital (Auto-Stop)',
      'Cabo 12V retrátil integrado ao corpo plano',
      'Precisão declarada de ±0,1 bar',
    ],
    featuresText:
      'Diferente de mini compressores cilíndricos que tombam no chão, o TYREinflate 450 apoia-se de forma estável no asfalto, traz enrolador para o fio de alimentação sem emaranhar e válvula liberadora de pressão caso o usuário queira desinflar.',
    pros: [
      'Não depende de bateria interna carregada para emergências (usa o próprio 12V do carro).',
      'Excelente organização do cabo e dos adaptadores no próprio corpo.',
      'Garantia e procedência oficial OSRAM no Brasil.',
    ],
    cons: [
      'Pressão máxima oficial de 80 PSI (suficiente para carros/SUVs, mas inferior a 150 PSI para bicicletas speed de altíssima pressão).',
      'Exige estar conectado à tomada 12V do veículo para funcionar.',
    ],
    targetAudience:
      'Motoristas viajantes que buscam máxima confiabilidade elétrica e rapidez ao calibrar os 4 pneus do carro.',
    comparisonNotes:
      'Frente ao VERUNTO VER-B15, não funciona sem fio, mas entrega maior velocidade e consistência contínua em pneus automotivos sem descarregar bateria.',
    faq: [
      {
        question: 'Qual a diferença entre OSRAM TYREinflate 200 e 450?',
        answer: 'O modelo 200 possui mostrador analógico sem auto-stop (~4,5 min por pneu 13"), enquanto o 450 traz visor digital com desligamento automático na pressão selecionada e enchimento mais rápido (~3,5 min).',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/osram-tyreinflate-450',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },

  // --- Tipo 12: Macacos hidraulicos (Sparta Jacaré 2T já existe como prod-macaco-sparta-2t) ---
  {
    id: 'prod-sparta-garrafa-3t',
    slug: 'macaco-hidraulico-garrafa-sparta-3-toneladas',
    title: 'Análise do Macaco Hidráulico Tipo Garrafa Sparta 3 Toneladas',
    name: 'Macaco Hidráulico Tipo Garrafa Sparta 3 Toneladas',
    brand: 'Sparta',
    model: 'Garrafa 3T (Ref. 5032355 / 50323)',
    categorySlug: 'equipamentos-automotivos',
    subcategory: 'Macacos hidráulicos',
    toolType: 'Macaco hidráulico tipo garrafa',
    application: 'Elevação de picapes, SUVs, vans leves e utilitários com maior vão livre',
    shortDescription:
      'Macaco hidráulico tipo garrafa com capacidade nominal de 3 toneladas (3.000 kg), altura entre 180 mm e 340 mm, pesando cerca de 2,3 kg.',
    introduction:
      'O macaco garrafa Sparta de 3 toneladas atende veículos mais pesados e altos — como utilitários, caminhonetes e SUVs — ocupando menos espaço no porta-malas do que um macaco jacaré equivalente.',
    imageUrl: IMG_AUTOMOTIVE,
    specs: {
      marca: 'Sparta',
      modelo: 'Garrafa 3 Toneladas',
      categoria: 'Equipamentos automotivos',
      capacidade: '3 toneladas (3.000 kg)',
      dimensoes: 'Altura mínima: 180 mm | Altura máxima: 340 mm',
      peso: 'Aprox. 2,3 kg',
      acessoriosInclusos: 'Alavanca de acionamento bipartida',
      garantia: 'Conforme política do fabricante / importador',
    },
    highlights: [
      'Capacidade reforçada de 3.000 kg',
      'Leve (~2,3 kg) e muito compacto para guardar',
      'Elevação até 340 mm com fuso de ajuste',
      'Válvula de segurança contra sobrecarga',
    ],
    featuresText:
      'O pistão hidráulico vertical unido ao fuso mecânico superior permite encostar o apoio diretamente sob o ponto estrutural antes de iniciar o bombeamento, aproveitando melhor o curso hidráulico.',
    pros: [
      'Suporta 3 toneladas ocupando fração do espaço de um jacaré.',
      'Peso reduzido (~2,3 kg) frente aos ~7 kg de um jacaré compacto.',
      'Excelente relação capacidade por real investido.',
    ],
    cons: [
      'Altura mínima de 180 mm (18 cm) NÃO entra sob carros de passeio rebaixados ou com pneu furado baixo.',
      'Base menor exige piso firme e plano, além de cavaletes obrigatórios antes de trabalhar sob o veículo.',
    ],
    targetAudience:
      'Proprietários de SUVs, picapes, vans leves e pequenas oficinas de apoio.',
    comparisonNotes:
      'Comporta 1 tonelada a mais que o Titanium Garrafa 2T (3.000 kg vs. 2.000 kg) e eleva mais alto (340 mm), exigindo porém 180 mm de vão livre mínimo contra 148 mm do Titanium 2T e 135 mm do Sparta Jacaré 2T.',
    faq: [
      {
        question: 'O macaco garrafa de 3 toneladas entra em qualquer carro hatch ou sedã?',
        answer: 'Não. Com 18 cm de altura fechado, se o pneu furar em um carro de passeio baixo, o vão da carroceria até o chão pode ficar menor que 18 cm. Nesses casos, prefira o macaco tipo jacaré (13,5 cm).',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/macaco-hidraulico-garrafa-sparta-3-toneladas',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },
  {
    id: 'prod-titanium-garrafa-2t',
    slug: 'macaco-hidraulico-garrafa-titanium-platina-2-toneladas',
    title: 'Análise do Macaco Hidráulico Garrafa Titanium Platina 2 Toneladas',
    name: 'Macaco Hidráulico Tipo Garrafa Titanium Platina 2 Toneladas (Ref. 07792)',
    brand: 'Titanium Platina',
    model: 'Garrafa 2T (Ref. 07792)',
    categorySlug: 'equipamentos-automotivos',
    subcategory: 'Macacos hidráulicos',
    toolType: 'Macaco hidráulico tipo garrafa',
    application: 'Troca emergencial de pneus e apoio de elevação leve até 2.000 kg',
    shortDescription:
      'Macaco garrafa compacto de 2 toneladas (2.000 kg), altura inicial de 148 mm até 278 mm (com fuso regulável) e cerca de 2,0 kg de peso.',
    introduction:
      'O Titanium Platina Garrafa 2 Toneladas (Ref. 07792) é uma alternativa ultracompacta para substituir macacos manuais cansativos em veículos com vão livre compatível, somando válvula de segurança e cabo desmontável.',
    imageUrl: IMG_AUTOMOTIVE,
    specs: {
      marca: 'Titanium Platina',
      modelo: '07792 (Garrafa 2T)',
      categoria: 'Equipamentos automotivos',
      capacidade: '2 toneladas (2.000 kg)',
      dimensoes: 'Altura mínima: 148 mm | Altura máxima: 278 mm (varia até ~345 mm conf. fuso/lote)',
      peso: 'Aprox. 1,9 a 2,1 kg',
      acessoriosInclusos: 'Alavanca de acionamento metálica',
      garantia: 'Conforme fabricante / importador',
    },
    highlights: [
      'Altura mínima reduzida para categoria garrafa (148 mm)',
      'Capacidade nominal de 2.000 kg',
      'Peso aproximado de apenas 2 kg',
    ],
    featuresText:
      'Seu formato vertical compacto encaixa facilmente em compartimentos laterais do porta-malas e traz fuso rosqueável na cabeça para compensar a folga inicial até a longarina ou eixo.',
    pros: [
      'Altura inicial de 148 mm facilita o encaixe frente a modelos garrafa maiores de 3T ou 5T.',
      'Leve e muito econômico.',
    ],
    cons: [
      'Curso hidráulico total limitado em carros com suspensão muito longa.',
      'Requer piso nivelado e cavaletes mecânicos para qualquer intervenção abaixo do carro.',
    ],
    targetAudience:
      'Proprietários de automóveis de passeio médios/altos que buscam economia de espaço e esforço na troca de estepe.',
    comparisonNotes:
      'Mais compacto e com menor altura inicial (148 mm) que o Sparta Garrafa 3T (180 mm), porém com limite de 2 toneladas e menor estabilidade sobre piso irregular que o Sparta Jacaré 2T.',
    faq: [
      {
        question: 'Devo usar cavaletes mesmo trocando pneu rapidamente?',
        answer: 'Se for apenas trocar o pneu sem colocar nenhuma parte do corpo embaixo do carro, garanta freio de mão puxado, marcha engatada e calço nas rodas opostas. Para qualquer serviço abaixo do veículo, cavaletes são obrigatórios.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/macaco-hidraulico-titanium-2-toneladas',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },

  // =========================================================================
  // 4. LIMPEZA E ACESSORIOS (10 novos modelos + 2 originais = 12 modelos nos 4 tipos)
  // =========================================================================

  // --- Tipo 13: Lavadoras de alta pressao (Kärcher K2 e WAP WL 1800 já existem) ---
  {
    id: 'prod-electrolux-ews1850',
    slug: 'lavadora-electrolux-powerwash-ews1850',
    title: 'Análise da Lavadora de Alta Pressão Electrolux PowerWash EWS1850',
    name: 'Lavadora de Alta Pressão Electrolux PowerWash EWS1850 (1.850 PSI)',
    brand: 'Electrolux',
    model: 'PowerWash EWS1850',
    categorySlug: 'limpeza-e-acessorios',
    subcategory: 'Lavadoras de alta pressão',
    toolType: 'Lavadora de alta pressão',
    application: 'Lavagem de quintais, garagens, veículos, fachadas e pisos externos',
    shortDescription:
      'Lavadora residencial de até 1.850 PSI e motor de 1.450–1.500 W com vazão de 280 L/h, sistema Stop Total, bico Vario e cabo elétrico longo de 5 metros.',
    introduction:
      'A Electrolux PowerWash EWS1850 entra na disputa direta com Kärcher K2 e WAP WL 1800 trazendo pressão máxima declarada superior (1.850 PSI) e um cabo elétrico mais longo de 5 metros que facilita a mobilidade no quintal.',
    imageUrl: IMG_PRESSURE_WASHER,
    specs: {
      marca: 'Electrolux',
      modelo: 'PowerWash EWS1850',
      categoria: 'Limpeza e acessórios',
      potencia: '1.450 W a 1.500 W (conforme tensão 127V/220V)',
      voltagem: '127V ou 220V (versão dedicada)',
      pressao: '1.850 PSI máxima',
      vazao: '280 L/h (4,66 L/min)',
      peso: 'Aprox. 5,3 kg',
      dimensoes: 'Aprox. 43 x 25 x 22 cm',
      acessoriosInclusos: 'Pistola, lança com bico Vario (leque/concentrado), mangueira de 3 m e engate rápido',
      garantia: '12 meses (Electrolux Brasil)',
    },
    highlights: [
      'Pressão máxima declarada de 1.850 PSI',
      'Cabo elétrico de 5 metros (maior alcance)',
      'Sistema Stop Total com desligamento no gatilho',
      'Bico Vario ajustável de leque a jato concentrado',
    ],
    featuresText:
      'Com motor de ~1.500 W e função Stop Total, a EWS1850 foca em pressão mais concentrada para remover musgo e encardidos de pisos sem gastar muita água (280 L/h). O cabo elétrico de 5 m ajuda a depender menos de extensões.',
    pros: [
      'Cabo elétrico de 5 metros oferece maior raio de alcance que modelos com cabo de 3 m.',
      'Pressão de pico de 1.850 PSI ajuda em rejuntes e calçadas.',
      'Ampla rede de atendimento Electrolux no Brasil.',
    ],
    cons: [
      'Vazão de 280 L/h é menor que os 360 L/h da WAP WL 1800 (enxágue de espuma leva um pouco mais de tempo).',
      'Mangueira de alta pressão continua com 3 metros.',
    ],
    targetAudience:
      'Proprietários de casas e apartamentos com quintal que querem boa pressão para pisos além da lavagem semanal do carro.',
    comparisonNotes:
      'Entrega maior pressão de pico (1.850 PSI) e cabo de força mais longo que Kärcher K2 e WAP WL 1800, porém com menor vazão de água (280 L/h vs. 300 e 360 L/h).',
    faq: [
      {
        question: 'A Electrolux EWS1850 vem com aplicador de detergente (snow foam)?',
        answer: 'O conjunto básico acompanha pistola, lança Vario e engate. Confira a descrição da oferta caso busque edições acompanhadas de reservatório de sabão.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/electrolux-ews1850',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },

  // --- Tipo 14: Aspiradores de po e agua ---
  {
    id: 'prod-wap-gtw-10',
    slug: 'aspirador-po-e-agua-wap-gtw-10',
    title: 'Análise do Aspirador de Pó e Água WAP GTW 10 (1.400 W)',
    name: 'Aspirador de Pó e Água WAP GTW 10 1.400 W 10 Litros',
    brand: 'WAP',
    model: 'GTW 10',
    categorySlug: 'limpeza-e-acessorios',
    subcategory: 'Aspiradores de pó e água',
    toolType: 'Aspirador de pó e água barril',
    application: 'Limpeza de interiores automotivos, oficinas domésticas, pisos secos e molhados',
    shortDescription:
      'Aspirador tipo barril de 1.400 W com reservatório total de 10 litros (7 L sólidos / 3,4 L líquidos), função sopro, rodízios e filtros laváveis.',
    introduction:
      'O WAP GTW 10 é um dos aspiradores de pó e água mais vendidos do país graças ao equilíbrio entre potência elétrica (1.400 W), tamanho compacto de 10 litros e função sopro para limpar cantos de carro e bancadas.',
    imageUrl: IMG_VACUUM_EXTRACTOR,
    specs: {
      marca: 'WAP',
      modelo: 'GTW 10',
      categoria: 'Limpeza e acessórios',
      potencia: '1.400 W',
      voltagem: '127V ou 220V (versões dedicadas)',
      pressao: 'Vácuo aprox. 160 mbar',
      capacidade: 'Recipiente total 10 L (útil: 7 L sólidos / 3,4 L líquidos)',
      peso: 'Aprox. 2,8 a 3,3 kg',
      dimensoes: 'Aprox. 31 x 31 x 40 cm',
      acessoriosInclusos: 'Mangueira 1,5 m, 3 tubos extensores, bico múltiplo, bico canto/escova, filtro pano e espuma',
      garantia: '12 meses (WAP)',
    },
    highlights: [
      'Motor de 1.400 W com bom vácuo (160 mbar)',
      'Aspira sólidos e líquidos com boia de proteção',
      'Função sopro integrada na saída traseira',
      'Porta-acessórios na própria base com rodízios',
    ],
    featuresText:
      'A função sopro facilita expulsar água de retrovisores, frisos automotivos ou soprar serragem da bancada antes de aspirar. O filtro de pano lavável atende pós e sujeira seca, enquanto o filtro de espuma protege a turbina ao sugar líquidos.',
    pros: [
      'Corpo leve (~3 kg) que cabe fácil entre carros na garagem.',
      'Peças e sacos descartáveis compatíveis muito fáceis de encontrar.',
      'Função sopro bem útil para detalhamento automotivo e oficina.',
    ],
    cons: [
      'Capacidade útil de líquidos de 3,4 L exige esvaziar rápido ao recolher grandes poças.',
      'Cabo elétrico de 2 metros exige extensão na maioria das garagens.',
    ],
    targetAudience:
      'Entusiastas que aspiram o próprio carro, pequenas oficinas e limpeza pesada residencial.',
    comparisonNotes:
      'Frente ao Electrolux AQP20 (barril de 18 L / útil 10 L pó / 11 L líquido), o WAP GTW 10 é mais compacto e fácil de guardar, mas tem menor reservatório útil e cabo mais curto.',
    faq: [
      {
        question: 'Posso aspirar água sem tirar o filtro de pano/papel?',
        answer: 'Não. Antes de aspirar líquidos, remova o filtro de pano ou saco de papel e deixe instalado apenas o filtro de espuma protetor da boia.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/wap-gtw-10',
    salesInfo: 'Campeão recorrente de buscas entre aspiradores 10L no Mercado Livre',
    verifiedAt: VERIFIED_DATE,
    featured: true,
    status: 'published',
  },
  {
    id: 'prod-electrolux-aqp20',
    slug: 'aspirador-po-e-agua-electrolux-acqua-power-aqp20',
    title: 'Análise do Aspirador de Pó e Água Electrolux Acqua Power AQP20',
    name: 'Aspirador de Pó e Água Electrolux Acqua Power AQP20',
    brand: 'Electrolux',
    model: 'AQP20',
    categorySlug: 'limpeza-e-acessorios',
    subcategory: 'Aspiradores de pó e água',
    toolType: 'Aspirador de pó e água barril',
    application: 'Limpeza de garagens, estofados, varandas e pisos molhados em áreas amplas',
    shortDescription:
      'Aspirador água e pó com barril de 18 litros (útil 10 L pó / 11 L água), motor até 1.400 W, função sopro e raio de alcance de 6,2 metros.',
    introduction:
      'O Electrolux Acqua Power AQP20 aposta em maior capacidade útil de líquidos (11 litros úteis) e alcance de trabalho superior (6,2 metros somando cabo, mangueira e tubos), diminuindo trocas de tomada ao redor do carro.',
    imageUrl: IMG_VACUUM_EXTRACTOR,
    specs: {
      marca: 'Electrolux',
      modelo: 'AQP20',
      categoria: 'Limpeza e acessórios',
      potencia: '1.250 W a 1.400 W (varia conforme lote/tensão 127V/220V — conferir etiqueta)',
      voltagem: '127V ou 220V (versão dedicada)',
      capacidade: 'Barril 18 L totais (útil: 10 L sólidos / 11 L líquidos); raio de ação 6,2 m',
      peso: 'Aprox. 3,8 a 4,2 kg',
      dimensoes: 'Aprox. 48 x 33 x 33 cm',
      acessoriosInclusos: 'Bocal pisos, bocal cantos/frestas, tubos prolongadores, mangueira flexível e filtro',
      garantia: '12 meses (Electrolux)',
    },
    highlights: [
      'Capacidade útil de 11 L para líquidos',
      'Alcance de 6,2 metros com cabo de 3,5 m',
      'Função sopro e rodinhas 360°',
      'Aceita saco descartável original Electrolux',
    ],
    featuresText:
      'O grande diferencial do AQP20 frente a barris de 10 litros é poder recolher muito mais água após lavar tapetes, varandas ou garagem antes de abrir a tampa para esvaziar, mantendo o cabo mais longo da categoria de entrada.',
    pros: [
      'Excelente volume útil para líquidos (11 litros vs. 3,4 L de modelos de 10L).',
      'Raio de ação de 6,2 m facilita limpar o carro inteiro de uma tomada próxima.',
    ],
    cons: [
      'Ocupa mais espaço no armário do que o WAP GTW 10 ou Vonder APV 1010.',
      'Potência nominal declarada varia entre 1.250 W e 1.400 W conforme revisão do modelo.',
    ],
    targetAudience:
      'Quem limpa áreas molhadas maiores, tapetes residenciais e busca menos interrupções por esvaziamento.',
    comparisonNotes:
      'Vence o WAP GTW 10 e o Vonder APV 1010 em capacidade útil de água (11 L) e comprimento de alcance, perdendo apenas em compacidade.',
    faq: [
      {
        question: 'O Electrolux AQP20 é extratora de estofados?',
        answer: 'Não. Ele aspira água que você já tenha borrifado manualmente no estofado (e ajuda muito nisso), mas não possui bomba injetora de água limpa com gatilho no bico como uma extratora dedicada (ex.: WAP Spot Cleaner).',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/electrolux-aqp20',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },
  {
    id: 'prod-vonder-apv-1010',
    slug: 'aspirador-po-e-agua-vonder-apv-1010',
    title: 'Análise do Aspirador de Pó e Água Vonder APV 1010 (1.000 W / HEPA)',
    name: 'Aspirador de Pó e Água Vonder APV 1010 10 Litros Filtro HEPA',
    brand: 'Vonder',
    model: 'APV 1010',
    categorySlug: 'limpeza-e-acessorios',
    subcategory: 'Aspiradores de pó e água',
    toolType: 'Aspirador de pó e água barril',
    application: 'Limpeza de oficina, bancada de madeira, manutenção de máquinas e automóveis',
    shortDescription:
      'Aspirador compacto de 1.000 W com reservatório de 10 litros, filtro HEPA para partículas finas, função sopro e design pensado para oficina.',
    introduction:
      'O Vonder APV 1010 combina reservatório de 10 litros e função sopro com filtragem HEPA de série — um diferencial importante para quem aspira pó fino de lixamento, gesso leve ou poeira de oficina sem devolver micropartículas ao ambiente.',
    imageUrl: IMG_VACUUM_EXTRACTOR,
    specs: {
      marca: 'Vonder',
      modelo: 'APV 1010',
      categoria: 'Limpeza e acessórios',
      potencia: '1.000 W',
      voltagem: '127V ou 220V (versão dedicada)',
      pressao: 'Força de aspiração aprox. 15–16 kPa',
      capacidade: 'Reservatório total 10 L; filtro HEPA + filtro espuma',
      peso: 'Aprox. 3,3 kg',
      dimensoes: 'Não informado',
      acessoriosInclusos: 'Mangueira flexível 1,5 m, 3 tubos extensores, bocal pisos, bocal cantos, filtro HEPA e espuma',
      garantia: '12 meses (Vonder)',
    },
    highlights: [
      'Acompanha filtro HEPA para poeira fina',
      'Reservatório compacto de 10 litros',
      'Função sopro para limpeza de ferramentas',
      'Consumo elétrico moderado de 1.000 W',
    ],
    featuresText:
      'Com motor de 1.000 W e vedação com filtro HEPA cartucho, captura pó fino de marcenaria e alvenaria leve com melhor retenção do que sacos de pano simples, além de sugar líquidos após remover o cartucho seco.',
    pros: [
      'Filtro HEPA retém partículas finas melhor que filtros simples de tecido.',
      'Consumo menor (1.000 W) adequado a tomadas comuns e oficinas compartilhadas.',
    ],
    cons: [
      'Potência de 1.000 W é inferior aos 1.400 W do WAP GTW 10.',
      'Filtro HEPA exige limpeza cuidadosa a seco e nunca deve ser molhado ao aspirar água.',
    ],
    targetAudience:
      'Marceneiros de garagem, instaladores que furam paredes e oficinas domésticas que lidam com poeira fina.',
    comparisonNotes:
      'Tem menor potência nominal (1.000 W) frente ao WAP GTW 10 (1.400 W), mas compensa na retenção de pó fino via filtro HEPA incluso.',
    faq: [
      {
        question: 'Posso ligar o Vonder APV 1010 diretamente na saída de pó de uma lixadeira?',
        answer: 'Sim, utilizando adaptador compatível para a mangueira. Limpe o filtro HEPA com frequência ao aspirar pó fino de madeira ou massa para não perder sucção.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/vonder-apv-1010',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },

  // --- Tipo 15: Extratoras e higienizadoras ---
  {
    id: 'prod-wap-spot-cleaner-w3',
    slug: 'extratora-portatil-wap-spot-cleaner-w3',
    title: 'Análise da Extratora Portátil WAP Spot Cleaner W3 (1.450 W)',
    name: 'Extratora Higienizadora Portátil WAP Spot Cleaner W3 1.450 W',
    brand: 'WAP',
    model: 'Spot Cleaner W3',
    categorySlug: 'limpeza-e-acessorios',
    subcategory: 'Extratoras e higienizadoras',
    toolType: 'Extratora portátil de estofados',
    application: 'Higienização de bancos automotivos, sofás, colchões, tapetes e manchas pontuais',
    shortDescription:
      'Extratora compacta 3 em 1 de 1.450 W com dois tanques separados (~1,1 L água limpa / 850 ml água suja), vácuo de 110 mbar e bico de autolimpeza.',
    introduction:
      'A WAP Spot Cleaner W3 popularizou o conceito de extratora compacta portátil no Brasil: borrifa solução de limpeza, esfrega com escova integrada e extrai a sujeira para o reservatório de água suja sem precisar de uma extratora industrial pesada.',
    imageUrl: IMG_VACUUM_EXTRACTOR,
    specs: {
      marca: 'WAP',
      modelo: 'Spot Cleaner W3',
      categoria: 'Limpeza e acessórios',
      potencia: '1.450 W',
      voltagem: '127V ou 220V (versão dedicada)',
      pressao: 'Vácuo 110 mbar',
      capacidade: 'Água limpa: 1.080 ml (~1,1 L) | Água suja: 850 ml',
      peso: 'Aprox. 3,8 a 4,2 kg',
      dimensoes: 'Compacta com alça de transporte',
      acessoriosInclusos: 'Bico extrator com escova, bico de borracha autolimpeza, mangueira 1,2 m e cabo 5 m',
      garantia: '12 meses (WAP)',
    },
    highlights: [
      'Borrifa, esfrega e extrai sujeira profunda',
      'Sistema de autolimpeza da mangueira',
      'Cabo elétrico longo de 5 metros',
      'Compacta e fácil de guardar no armário',
    ],
    featuresText:
      'Com dois reservatórios translúcidos independentes, nunca mistura água limpa com o resíduo extraído do tecido. O bocal de autolimpeza fecha a ponta da mangueira para lavar todo o duto interno ao final do serviço.',
    pros: [
      'Extremamente prática para remover manchas frescas em sofás e bancos de carro em poucos minutos.',
      'Autolimpeza evita mau cheiro na mangueira após guardar.',
      'Cabo de 5 metros alcança bancos dianteiros e traseiros facilmente.',
    ],
    cons: [
      'Tanques pequenos (1,1 L / 850 ml) exigem reabastecimento e esvaziamento frequentes em sofás grandes.',
      'Sucção de 110 mbar é menor que a da irmã maior Spot Cleaner W2 (122 mbar) e Philco PEX30A (160 mbar).',
    ],
    targetAudience:
      'Famílias com crianças/pets e donos de carro que desejam higienizar bancos e estofados em casa sem alugar máquinas.',
    comparisonNotes:
      'Menor e mais leve que a Philco PEX30A, mas perde em volume de tanque e potência de sucção para W2 e PEX30A.',
    faq: [
      {
        question: 'Posso usar sabão em pó comum na extratora WAP Spot Cleaner W3?',
        answer: 'Não. Utilize apenas detergentes específicos para extratoras com baixa formação de espuma para evitar danos à bomba e à turbina de sucção.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/wap-spot-cleaner-w3',
    salesInfo: 'Uma das extratoras portáteis mais vendidas do Mercado Livre Brasil',
    verifiedAt: VERIFIED_DATE,
    featured: true,
    status: 'published',
  },
  {
    id: 'prod-wap-spot-cleaner-w2',
    slug: 'extratora-portatil-wap-spot-cleaner-w2',
    title: 'Análise da Extratora Portátil WAP Spot Cleaner W2 (1.600 W)',
    name: 'Extratora Higienizadora Portátil WAP Spot Cleaner W2 1.600 W',
    brand: 'WAP',
    model: 'Spot Cleaner W2',
    categorySlug: 'limpeza-e-acessorios',
    subcategory: 'Extratoras e higienizadoras',
    toolType: 'Extratora portátil de estofados',
    application: 'Higienização de estofados residenciais, colchões e interior de automóveis',
    shortDescription:
      'Evolução da linha Spot Cleaner com motor de 1.600 W, sucção mais forte (122 mbar) e tanques ampliados para 1,4 L limpa e 1,2 L suja.',
    introduction:
      'A WAP Spot Cleaner W2 corrige duas limitações da versão W3 ao elevar a potência para 1.600 W, reforçar o poder de vácuo para 122 mbar e ampliar os reservatórios de água limpa e suja.',
    imageUrl: IMG_VACUUM_EXTRACTOR,
    specs: {
      marca: 'WAP',
      modelo: 'Spot Cleaner W2',
      categoria: 'Limpeza e acessórios',
      potencia: '1.600 W',
      voltagem: '127V ou 220V (versão dedicada)',
      pressao: 'Vácuo 122 mbar',
      capacidade: 'Água limpa: 1.400 ml | Água suja útil: 1.200 ml',
      peso: 'Aprox. 4,5 kg',
      dimensoes: 'Portátil com suporte de cabo e mangueira',
      acessoriosInclusos: 'Bicos extratores e acessórios de autolimpeza',
      garantia: '12 meses (WAP)',
    },
    highlights: [
      'Potência elevada para 1.600 W e 122 mbar de vácuo',
      'Tanques maiores: 1,4 L limpa / 1,2 L suja',
      'Extração deixa o tecido menos encharcado que a W3',
    ],
    featuresText:
      'A maior pressão negativa (122 mbar) puxa mais umidade residual de dentro da espuma de bancos automotivos e sofás, acelerando o tempo de secagem natural após a higienização.',
    pros: [
      'Menor tempo de secagem dos estofados graças ao vácuo de 122 mbar.',
      'Menos paradas para trocar água do que na W3.',
    ],
    cons: [
      'Ainda possui capacidade portátil: higienizar múltiplos sofás seguidos em ritmo comercial pede modelos tipo barril (ex.: WAP Home/Carpet Cleaner).',
      'Investimento geralmente acima da W3.',
    ],
    targetAudience:
      'Quem realiza higienizações completas de sofás de 3 lugares, colchões casal e carros inteiros em casa.',
    comparisonNotes:
      'Posiciona-se exatamente entre a WAP Spot Cleaner W3 (1.450 W / 110 mbar) e a Philco PEX30A (2.000 W / 160 mbar).',
    faq: [
      {
        question: 'Qual é mais forte: Spot Cleaner W2 ou W3?',
        answer: 'Apesar do número menor no nome, a WAP Spot Cleaner W2 é superior em ficha técnica à W3: tem 1.600 W contra 1.450 W, vácuo de 122 mbar contra 110 mbar e reservatórios maiores.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/wap-spot-cleaner-w2',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },
  {
    id: 'prod-philco-pex30a',
    slug: 'extratora-portatil-philco-pex30a',
    title: 'Análise da Extratora Higienizadora Philco PEX30A (2.000 W)',
    name: 'Extratora Higienizadora Portátil Philco PEX30A 2.000 W',
    brand: 'Philco',
    model: 'PEX30A',
    categorySlug: 'limpeza-e-acessorios',
    subcategory: 'Extratoras e higienizadoras',
    toolType: 'Extratora portátil de estofados',
    application: 'Higienização profunda de estofados, tapetes, carpetes automotivos e colchões',
    shortDescription:
      'Extratora portátil de alta potência (2.000 W), vácuo de 16 kPa (~160 mbar), tanque de água limpa de 2,6 L totais (1,8 L útil) e função autolimpeza.',
    introduction:
      'A Philco PEX30A chegou para competir com força máxima entre extratoras portáteis, trazendo motor de 2.000 W e 16 kPa (160 mbar) de sucção aliado ao maior reservatório de água limpa do trio.',
    imageUrl: IMG_VACUUM_EXTRACTOR,
    specs: {
      marca: 'Philco',
      modelo: 'PEX30A',
      categoria: 'Limpeza e acessórios',
      potencia: '2.000 W',
      voltagem: '127V ou 220V (versão dedicada)',
      pressao: 'Sucção 16 kPa (~160 mbar)',
      capacidade: 'Água limpa: 2,6 L total (1,8 L útil) | Água suja: 1,8 L total (1,2 L útil)',
      peso: 'Aprox. 4,5 kg',
      dimensoes: 'Compacta vertical com alça superior',
      acessoriosInclusos: 'Bico extrator largo, bico para cantos/frestas e tampa autolimpante',
      garantia: '12 meses (Philco)',
    },
    highlights: [
      'Potência de 2.000 W e 160 mbar de vácuo',
      'Maior tanque de água limpa (1,8 L útil)',
      'Acompanha bico específico para cantos',
      'Sistema de autolimpeza da mangueira',
    ],
    featuresText:
      'A combinação de 16 kPa de sucção e reservatório útil de 1,8 L permite pulverizar solução flotadora com bom rendimento e sugar a umidade com eficiência em carpetes automotivos e tapetes mais grossos.',
    pros: [
      'Maior força de sucção (160 mbar) e potência nominal (2.000 W) entre as portáteis comparadas.',
      'Maior autonomia de água limpa antes de reabastecer.',
      'Inclui bocal estreito excelente para trilhos e cantos de bancos automotivos.',
    ],
    cons: [
      'Consumo de 2.000 W em 127V requer tomada em bom estado (evitar benjamins/extensões finas).',
      'Nível de ruído perceptivelmente alto durante a extração.',
    ],
    targetAudience:
      'Entusiastas de detalhamento automotivo e residências que buscam máxima sucção no formato portátil.',
    comparisonNotes:
      'Supera a WAP Spot Cleaner W3 e a W2 em potência elétrica (2.000 W) e vácuo (160 mbar), mantendo porte compacto portátil.',
    faq: [
      {
        question: 'Posso colocar água quente na extratora Philco PEX30A?',
        answer: 'Consulte o limite exato do manual da Philco (geralmente água morna até ~40–50 °C auxilia na limpeza, evitando água fervente que pode deformar tanques plásticos e vedações).',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/philco-pex30a',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },

  // --- Tipo 16: Aspiradores verticais e portateis ---
  {
    id: 'prod-wap-high-speed-plus',
    slug: 'aspirador-vertical-wap-high-speed-plus-1350w',
    title: 'Análise do Aspirador Vertical WAP High Speed Plus 1.350 W',
    name: 'Aspirador de Pó Vertical 3 em 1 WAP High Speed Plus 1.350 W',
    brand: 'WAP',
    model: 'High Speed Plus',
    categorySlug: 'limpeza-e-acessorios',
    subcategory: 'Aspiradores verticais e portáteis',
    toolType: 'Aspirador vertical 3 em 1',
    application: 'Limpeza rápida de pisos, tapetes e uso portátil manual em estofados e carros',
    shortDescription:
      'Aspirador vertical 3 em 1 com 1.350 W, tecnologia Cyclone, filtro HEPA lavável, reservatório de 1,2 L, cabo de 4 metros e peso leve de 1,25 kg.',
    introduction:
      'O WAP High Speed Plus é um campeão de vendas por entregar 1.350 W reais com apenas 1,25 kg no uso portátil/vertical. Pode ser convertido rapidamente em aspirador de mão para limpar painéis, bancos do carro e sofás.',
    imageUrl: IMG_VACUUM_EXTRACTOR,
    specs: {
      marca: 'WAP',
      modelo: 'High Speed Plus',
      categoria: 'Limpeza e acessórios',
      potencia: '1.350 W',
      voltagem: '127V ou 220V (versão dedicada)',
      pressao: 'Vácuo aprox. 131 a 134 mbar',
      capacidade: 'Reservatório sem saco de 1,2 L; filtro HEPA lavável; cabo 4 m',
      peso: 'Aprox. 1,25 kg',
      dimensoes: 'Formato vertical desmontável 3 em 1',
      acessoriosInclusos: 'Bocal múltiplo pisos, bocal cantos e bocal escova para estofados',
      garantia: '12 meses (WAP)',
    },
    highlights: [
      'Potência de 1.350 W em corpo de 1,25 kg',
      'Tecnologia Cyclone + filtro HEPA lavável',
      'Modo 3 em 1: vertical e portátil de mão',
      'Dispensa compra de sacos descartáveis',
    ],
    featuresText:
      'O sistema Cyclone mantém a poeira girando longe do filtro HEPA, preservando o poder de sucção por mais tempo. Sem haste e com bico para cantos, torna-se um aspirador de mão ágil para o interior do veículo.',
    pros: [
      'Extremamente leve (1,25 kg) para o poder de sucção de 1.350 W.',
      'Filtro HEPA reutilizável lavável economiza em consumíveis.',
      'Acompanha bico escova e bico canto no pacote padrão.',
    ],
    cons: [
      'Aspira APENAS sólidos secos — nunca aspire líquidos neste modelo.',
      'Por ter cabo de 4 metros, depende de tomada próxima ao carro na garagem.',
    ],
    targetAudience:
      'Moradores de apartamentos, casas e donos de veículos que querem praticidade diária sem montar um aspirador barril grande.',
    comparisonNotes:
      'Tem acabamento vermelho/grafite e 1.350 W com kit 3 em 1 completo, muito próximo ao High Speed Max (acabamento azul/cinza) e ligeiramente mais completo em bocais que algumas versões 2 em 1 Black.',
    faq: [
      {
        question: 'O WAP High Speed Plus pode aspirar água?',
        answer: 'Não. Todos os aspiradores verticais da linha WAP High Speed são exclusivos para sólidos/pó seco.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/wap-high-speed-plus',
    salesInfo: 'Entre os aspiradores verticais mais vendidos do Mercado Livre Brasil',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },
  {
    id: 'prod-wap-high-speed-black',
    slug: 'aspirador-vertical-wap-high-speed-black',
    title: 'Análise do Aspirador Vertical WAP High Speed Black',
    name: 'Aspirador de Pó Vertical 2 em 1 WAP High Speed Black',
    brand: 'WAP',
    model: 'High Speed Black',
    categorySlug: 'limpeza-e-acessorios',
    subcategory: 'Aspiradores verticais e portáteis',
    toolType: 'Aspirador vertical 2 em 1',
    application: 'Aspiração diária seca em pisos frios, tapetes e uso portátil em móveis/carros',
    shortDescription:
      'Versão discreta toda preta da família High Speed (~1.300–1.350 W conf. lote), sistema Cyclone, filtro HEPA lavável e conversão em aspirador de mão.',
    introduction:
      'O WAP High Speed Black traz a mesma base prática da linha High Speed em acabamento preto sóbrio, geralmente comercializado em configuração 2 em 1 (vertical + portátil com bico de canto e piso) em promoções agressivas.',
    imageUrl: IMG_VACUUM_EXTRACTOR,
    specs: {
      marca: 'WAP',
      modelo: 'High Speed Black',
      categoria: 'Limpeza e acessórios',
      potencia: '1.300 W a 1.350 W (verificar etiqueta do lote)',
      voltagem: '127V ou 220V (versão dedicada)',
      capacidade: 'Reservatório 1,2 L sem saco; filtro HEPA; cabo aprox. 4 m',
      peso: 'Aprox. 1,25 kg',
      dimensoes: 'Vertical conversível para portátil',
      acessoriosInclusos: 'Bocal múltiplo pisos e bico cantos (conferir se inclui bico escova no kit)',
      garantia: '12 meses (WAP)',
    },
    highlights: [
      'Visual todo preto discreto para deixar à mão',
      'Sistema Cyclone evita entupimento rápido do filtro',
      'Conversível para portátil de mão',
    ],
    featuresText:
      'Mantém a facilidade de esvaziamento com clique único do copo coletor transparente e filtro HEPA lavável em água corrente (que deve secar completamente antes da reinstalação).',
    pros: [
      'Frequentemente encontrado com preço promocional abaixo das versões Plus/Max.',
      'Leveza e potência compatíveis com toda a família High Speed.',
    ],
    cons: [
      'Algumas edições 2 em 1 Black não incluem o terceiro bico escova presente nas edições 3 em 1 Plus/Max.',
      'Exclusivo para sujeira seca.',
    ],
    targetAudience:
      'Usuários que preferem estética preta discreta e menor preço na linha High Speed.',
    comparisonNotes:
      'Na prática compartilha a plataforma mecânica da série High Speed; compare sempre se o anúncio inclui 2 ou 3 bocais e se declara 1.300 W ou 1.350 W.',
    faq: [
      {
        question: 'Qual a diferença prática entre WAP High Speed Black, Plus e Max?',
        answer: 'A base mecânica, capacidade de 1,2 L, sistema Cyclone e filtro HEPA são muito semelhantes. As diferenças estão na cor (preto no Black, vermelho no Plus, azul/cinza no Max), potência (1300W vs 1350W conforme lote) e na quantidade de bocais no kit (2 em 1 vs 3 em 1).',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/wap-high-speed-black',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },
  {
    id: 'prod-wap-high-speed-max',
    slug: 'aspirador-vertical-wap-high-speed-max-1350w',
    title: 'Análise do Aspirador Vertical WAP High Speed Max 1.350 W',
    name: 'Aspirador de Pó Vertical 3 em 1 WAP High Speed Max 1.350 W',
    brand: 'WAP',
    model: 'High Speed Max',
    categorySlug: 'limpeza-e-acessorios',
    subcategory: 'Aspiradores verticais e portáteis',
    toolType: 'Aspirador vertical 3 em 1',
    application: 'Limpeza seca versátil de residências, estofados, frestas e bancos de automóveis',
    shortDescription:
      'Versão 3 em 1 de 1.350 W com acabamento azul/cinza, filtro HEPA lavável, tecnologia Cyclone, reservatório de 1,2 L e cabo de 4 metros.',
    introduction:
      'O WAP High Speed Max 1.350 W entrega o pacote completo 3 em 1 da série com acabamento cinza e azul, combinando potência de 1.350 W, bocal múltiplo articulado e acessórios para estofados e frestas.',
    imageUrl: IMG_VACUUM_EXTRACTOR,
    specs: {
      marca: 'WAP',
      modelo: 'High Speed Max',
      categoria: 'Limpeza e acessórios',
      potencia: '1.350 W',
      voltagem: '127V ou 220V (versão dedicada)',
      pressao: 'Vácuo aprox. 131–134 mbar',
      capacidade: '1,2 L sem saco; filtro HEPA; cabo 4 m',
      peso: 'Aprox. 1,25 kg',
      dimensoes: 'Vertical 3 em 1 com haste removível',
      acessoriosInclusos: 'Bocal múltiplo pisos, bico canto e bico escova para estofados',
      garantia: '12 meses (WAP)',
    },
    highlights: [
      'Kit 3 em 1 completo com bico escova e canto',
      'Motor de 1.350 W com peso de 1,25 kg',
      'Filtro HEPA lavável + sistema Cyclone',
    ],
    featuresText:
      'Assim como o High Speed Plus, adapta-se rapidamente de aspirador de piso a aspirador manual para alcançar vãos entre os bancos automotivos, tapetes de borracha e estofamentos.',
    pros: [
      'Leve, potente e já inclui os três principais bocais de limpeza seca.',
      'Manutenção simples e barata sem troca de saco descartável.',
    ],
    cons: [
      'Aquece na saída lateral de ar durante uso prolongado contínuo.',
      'Não pode aspirar água ou líquidos.',
    ],
    targetAudience:
      'Quem busca o conjunto 3 em 1 completo da WAP High Speed e prefere a paleta cinza/azul ou melhor oferta do dia frente ao Plus.',
    comparisonNotes:
      'Tecnicamente equivalente ao High Speed Plus 1.350 W em potência, peso e filtragem, variando cor e eventuais promoções entre os dois SKUs.',
    faq: [
      {
        question: 'Qual escolher entre High Speed Plus e High Speed Max?',
        answer: 'Como ambos possuem 1.350 W, 1,2 L, 1,25 kg e kit 3 em 1 com filtro HEPA, escolha o que estiver com melhor preço e frete na voltagem da sua residência.',
      },
    ],
    mlReferenceUrl: 'https://lista.mercadolivre.com.br/wap-high-speed-max',
    verifiedAt: VERIFIED_DATE,
    featured: false,
    status: 'published',
  },
];
