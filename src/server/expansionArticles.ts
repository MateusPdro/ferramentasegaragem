import type { PublishStatus } from '../types/index.ts';

export interface ExpansionArticleSeed {
  id: string;
  slug: string;
  title: string;
  categorySlug: string;
  articleType: 'guia' | 'comparativo';
  summary: string;
  content: string;
  imageUrl: string;
  keywords: string[];
  readMinutes: number;
  relatedProductSlugs: string[];
  featured: boolean;
  status: PublishStatus;
}

const IMG_CUTTER_HEATGUN = '/src/assets/images/sub_cutter_heatgun_1795188924149.jpg';
const IMG_PAINT_POLISHER = '/src/assets/images/sub_paint_polisher_1795188933133.jpg';
const IMG_HAND_TOOLS_SET = '/src/assets/images/sub_wrenches_pliers_hammer_1795188925624.jpg';
const IMG_HAND_SOCKETS = '/src/assets/images/cat_hand_tools_1795185271926.jpg';
const IMG_AUTOMOTIVE = '/src/assets/images/cat_automotive_gear_1795185272682.jpg';
const IMG_PRESSURE_WASHER = '/src/assets/images/cat_pressure_washers_1795185272064.jpg';
const IMG_VACUUM_EXTRACTOR = '/src/assets/images/sub_vacuum_extractor_1795188925389.jpg';

export const EXPANSION_COMPARATIVE_DRAFTS: ExpansionArticleSeed[] = [
  // 1. Serra marmore
  {
    id: 'art-comp-draft-serra-marmore',
    slug: 'comparativo-makita-4100nh3zx2-vs-vonder-smv1300s-vs-bosch-gdc-150',
    title: 'Rascunho de Comparativo: Makita 4100NH3ZX2 vs. Vonder SMV1300S vs. Bosch GDC 150',
    categorySlug: 'ferramentas-eletricas',
    articleType: 'comparativo',
    summary:
      'Pauta comparativa baseada em especificações confirmadas de potência (1.300W vs 1.500W), diâmetro de disco (110 mm vs 125 mm) e peso entre as três serras mármore.',
    imageUrl: IMG_CUTTER_HEATGUN,
    keywords: ['comparativo serra marmore', 'makita 4100nh3zx2', 'vonder smv1300s', 'bosch gdc 150'],
    readMinutes: 5,
    relatedProductSlugs: [
      'serra-marmore-makita-4100nh3zx2',
      'serra-marmore-vonder-smv1300s',
      'serra-marmarmore-bosch-gdc-150',
    ],
    featured: false,
    status: 'draft',
    content: `## Pauta de Comparativo Técnico (Rascunho Editorial)

Este rascunho consolida os dados confirmados até o momento para revisão final antes da publicação:

### Pontos de comparação confirmados
- **Potência:** Makita 4100NH3ZX2 (1.300 W) e Vonder SMV1300S (1.300 W) vs. Bosch GDC 150 (1.500 W).
- **Capacidade de disco:** Makita e Vonder trabalham com discos de 110 mm (4-3/8"), enquanto a Bosch GDC 150 comporta discos de até 125 mm (5"), alcançando 40 mm de profundidade de corte.
- **Rotação:** 13.800 RPM (Makita), 13.000 RPM (Vonder) e 12.000–12.200 RPM (Bosch).
- **Peso:** 2,6 kg (Bosch), 2,9 kg (Makita) e aprox. 3,4 kg (Vonder).

### Itens pendentes para publicação
- Validar condições atuais de kit (inclusão ou não de mangueira e disco) nas ofertas ativas.`,
  },
  // 2. Soprador termico
  {
    id: 'art-comp-draft-soprador-termico',
    slug: 'comparativo-sopradores-vonder-stv200-vs-stv150-vs-spark-br-2000w',
    title: 'Rascunho de Comparativo: Vonder STV 200 vs. Vonder STV 150 vs. Spark BR 2000 W',
    categorySlug: 'ferramentas-eletricas',
    articleType: 'comparativo',
    summary:
      'Estrutura comparativa sobre controle térmico (2 estágios, 3 estágios com modo 50 °C e dial até 600 °C) nos sopradores térmicos de entrada e oficina.',
    imageUrl: IMG_CUTTER_HEATGUN,
    keywords: ['comparativo soprador termico', 'vonder stv 200', 'vonder stv 150', 'spark br 2000w'],
    readMinutes: 5,
    relatedProductSlugs: [
      'soprador-termico-vonder-stv-200-2000w',
      'soprador-termico-vonder-stv-150-1500w',
      'soprador-termico-spark-br-2000w',
    ],
    featured: false,
    status: 'draft',
    content: `## Pauta de Comparativo Técnico (Rascunho Editorial)

### Eixos objetivos já levantados
- **Controle de temperatura:** Vonder STV 150 (2 posições: 300 °C / 500 °C), Vonder STV 200 (3 posições: 50 °C / 350 °C / 550 °C) e Spark BR AMG-S220 (ajuste rotativo até 600 °C).
- **Vazão de ar:** 280–480 L/min (STV 150), 300–500 L/min (STV 200) e 250–500 L/min (Spark BR).
- **Atenção à tensão:** Conferir diferenças de potência entre edições 127V e 220V antes da publicação final.`,
  },
  // 3. Pistola de pintura eletrica
  {
    id: 'art-comp-draft-pistola-pintura',
    slug: 'comparativo-pistolas-pintura-tbt-tpp150-vs-wap-epp400-vs-vonder-pev400',
    title: 'Rascunho de Comparativo: The Black Tools TPP150 vs. WAP EPP400 vs. Vonder PEV 400',
    categorySlug: 'ferramentas-eletricas',
    articleType: 'comparativo',
    summary:
      'Comparação estruturada de potência (600W vs 400W), capacidade da caneca (1.250 ml vs 900 ml vs 800 ml) e viscosidade suportada em pistolas elétricas.',
    imageUrl: IMG_PAINT_POLISHER,
    keywords: ['comparativo pistola pintura', 'tpp150', 'wap epp400', 'vonder pev 400'],
    readMinutes: 5,
    relatedProductSlugs: [
      'pistola-pintura-eletrica-the-black-tools-tpp150',
      'pistola-pintura-eletrica-wap-epp400',
      'pistola-pintura-eletrica-vonder-pev-400',
    ],
    featured: false,
    status: 'draft',
    content: `## Pauta de Comparativo Técnico (Rascunho Editorial)

### Especificações confirmadas lado a lado
- **Potência do motor:** 600 W na The Black Tools TPP150 contra 400 W na WAP EPP400 e na Vonder PEV 400.
- **Reservatório:** 1.250 ml (TPP150), 900 ml (WAP EPP400) e 800 ml (Vonder PEV 400).
- **Vazão máxima declarada:** 700 ml/min nos três modelos.
- **Viscosidade:** Até 60 DIN-s na EPP400 e < 40 DIN-s na PEV 400.`,
  },
  // 4. Politriz eletrica
  {
    id: 'art-comp-draft-politriz',
    slug: 'comparativo-politrizes-tbt-bpa1200-vs-holtter-600w-vs-bosch-gpo-14-ce',
    title: 'Rascunho de Comparativo: The Black Tools BPA1200 vs. Holtter 600W vs. Bosch GPO 14 CE',
    categorySlug: 'ferramentas-eletricas',
    articleType: 'comparativo',
    summary:
      'Análise preliminar sobre faixa segura de RPM para pintura automotiva, tamanho de boina (5" vs 7") e estabilidade eletrônica sob carga.',
    imageUrl: IMG_PAINT_POLISHER,
    keywords: ['comparativo politriz', 'bpa1200', 'holtter 600w', 'bosch gpo 14 ce'],
    readMinutes: 5,
    relatedProductSlugs: [
      'politriz-eletrica-the-black-tools-bpa1200',
      'politriz-eletrica-holtter-600w',
      'politriz-eletrica-bosch-gpo-14-ce',
    ],
    featured: false,
    status: 'draft',
    content: `## Pauta de Comparativo Técnico (Rascunho Editorial)

### Diferenciais técnicos confirmados
- **Bosch GPO 14 CE:** 1.400 W, 750–3.000 RPM com Constant Electronic e 2,5 kg — janela térmica ideal para detalhamento automotivo.
- **The Black Tools BPA1200:** 1.200 W, 1.000–4.200 RPM, prato 7" (opção intermediária de entrada).
- **Holtter 600 W:** 600 W, até 4.500 RPM, prato 5" voltado a enceramento leve doméstico.`,
  },
  // 5. Jogos de chaves combinadas
  {
    id: 'art-comp-draft-chaves-combinadas',
    slug: 'comparativo-chaves-combinadas-gedore-robust-vs-tbt-tkch12-vs-tramontina-pro',
    title: 'Rascunho de Comparativo: Gedore Robust 12p vs. The Black Tools TKCH12 vs. Tramontina PRO',
    categorySlug: 'ferramentas-manuais',
    articleType: 'comparativo',
    summary:
      'Pauta comparativa sobre grade de milímetros (6–22 mm vs grades PRO), material (Cr-V vs aço especial) e perfil de encaixe.',
    imageUrl: IMG_HAND_TOOLS_SET,
    keywords: ['comparativo chaves combinadas', 'gedore robust', 'tkch12', 'tramontina pro'],
    readMinutes: 4,
    relatedProductSlugs: [
      'jogo-chaves-combinadas-gedore-robust-12-pecas',
      'jogo-chaves-combinadas-the-black-tools-tkch12',
      'jogo-chaves-combinadas-tramontina-pro-12-pecas',
    ],
    featured: false,
    status: 'draft',
    content: `## Pauta de Comparativo Técnico (Rascunho Editorial)

- **Grades confirmadas:** Gedore Robust S09105012 e The Black Tools TKCH12 oferecem 6 a 22 mm (pulando 15/16/18/20/21 mm). Na Tramontina PRO há variações por código (6–19 mm ou 10–32 mm).
- **Diferencial técnico:** Tramontina PRO destaca aço Cromo-Vanádio e perfil Hyper Drive para alto esforço contínuo.`,
  },
  // 6. Jogos de soquetes e catracas
  {
    id: 'art-comp-draft-soquetes',
    slug: 'comparativo-soquetes-stels-57-pecas-vs-quicko-46-vs-hexon-46',
    title: 'Rascunho de Comparativo: Stels 57 Peças vs. Quicko 46 Peças vs. Hexon 46 Peças',
    categorySlug: 'ferramentas-manuais',
    articleType: 'comparativo',
    summary:
      'Comparação direta entre jogos de encaixe 1/4": quando os soquetes longos e 3 extensões do Stels 57 peças justificam a diferença sobre os kits de 46 peças.',
    imageUrl: IMG_HAND_SOCKETS,
    keywords: ['stels 57 pecas', 'quicko 46 pecas', 'hexon 46 pecas', 'jogo soquetes'],
    readMinutes: 4,
    relatedProductSlugs: [
      'jogo-soquetes-stels-57-pecas-1410155',
      'jogo-soquetes-quicko-46-pecas',
      'jogo-soquetes-hexon-46-pecas',
    ],
    featured: false,
    status: 'draft',
    content: `## Pauta de Comparativo Técnico (Rascunho Editorial)

- **Diferença estrutural:** Quicko 46 e Hexon 46 seguem a maleta clássica de 46 itens (13 soquetes curtos 4–14 mm + bits). O Stels 57 peças (1410155) acrescenta 7 soquetes longos (6–13 mm) e três extensões rígidas.
- **Material:** Os três são ofertados em aço Cromo-Vanádio com encaixe 1/4".`,
  },
  // 7. Alicates
  {
    id: 'art-comp-draft-alicates',
    slug: 'comparativo-alicates-universais-8-1000v-vonder-vs-tramontina-vs-stanley',
    title: 'Rascunho de Comparativo: Alicate Universal 8" 1000V Vonder vs. Tramontina Master vs. Stanley',
    categorySlug: 'ferramentas-manuais',
    articleType: 'comparativo',
    summary:
      'Checklist comparativo de certificação elétrica NBR 9699 / NR-10, liga metálica (Cr-V vs aço especial) e ergonomia do cabo.',
    imageUrl: IMG_HAND_TOOLS_SET,
    keywords: ['alicate 1000v', 'vonder', 'tramontina master', 'stanley'],
    readMinutes: 4,
    relatedProductSlugs: [
      'alicate-universal-vonder-8-isolado-1000v',
      'alicate-universal-tramontina-master-8-1000v',
      'alicate-universal-stanley-8-1000v',
    ],
    featured: false,
    status: 'draft',
    content: `## Pauta de Comparativo Técnico (Rascunho Editorial)

- Todos os três possuem versões de 8 polegadas (~200–203 mm) com isolação declarada para 1.000 V CA.
- **Ponto de atenção obrigatório para revisão:** Confirmar explicitamente na oferta se o modelo Stanley selecionado pertence à linha certificada 1000V e não à linha padrão não isolada.`,
  } as ExpansionArticleSeed,
  // 8. Martelos
  {
    id: 'art-comp-draft-martelos',
    slug: 'comparativo-martelos-unha-vonder-fibra-vs-lfal-vs-tramontina-master',
    title: 'Rascunho de Comparativo: Martelo de Unha Vonder Cabo Fibra vs. LFAL vs. Tramontina Master',
    categorySlug: 'ferramentas-manuais',
    articleType: 'comparativo',
    summary:
      'Pauta sobre absorção de impacto em cabos de fibra de vidro vs. madeira tradicional e padronização por diâmetro da face (25, 27 e 29 mm).',
    imageUrl: IMG_HAND_TOOLS_SET,
    keywords: ['martelo unha', 'vonder cabo fibra', 'lfal', 'tramontina master'],
    readMinutes: 4,
    relatedProductSlugs: [
      'martelo-unha-vonder-cabo-fibra-27mm',
      'martelo-unha-lfal-cabo-fibra',
      'martelo-unha-tramontina-master-profissional-27mm',
    ],
    featured: false,
    status: 'draft',
    content: `## Pauta de Comparativo Técnico (Rascunho Editorial)

- **Cabos:** Vonder e LFAL utilizam fibra de vidro emborrachada; Tramontina Master oferece o clássico cabo em madeira envernizada (ou sublinhas em polímero/fibra).
- **Segurança:** Manter orientação técnica de não golpear superfícies acima de 45 HRC.`,
  },
  // 9. Scanners automotivos
  {
    id: 'art-comp-draft-scanners',
    slug: 'comparativo-scanners-obd2-elm327-vs-v519-vs-launch-cr3001',
    title: 'Rascunho de Comparativo: ELM327 Bluetooth vs. V519 OBD2 vs. Launch Creader CR3001',
    categorySlug: 'equipamentos-automotivos',
    articleType: 'comparativo',
    summary:
      'Evolução entre leitor Bluetooth de entrada e scanners autônomos com tela colorida: o que muda na compatibilidade de protocolos e autonomia de uso.',
    imageUrl: IMG_AUTOMOTIVE,
    keywords: ['scanner obd2', 'elm327', 'v519', 'launch cr3001'],
    readMinutes: 5,
    relatedProductSlugs: [
      'scanner-automotivo-obd2-elm327',
      'scanner-automotivo-v519-obd2',
      'scanner-automotivo-launch-creader-cr3001',
    ],
    featured: false,
    status: 'draft',
    content: `## Pauta de Comparativo Técnico (Rascunho Editorial)

- **Interface:** ELM327 depende de smartphone e aplicativo externo; V519 (tela 2,8") e Launch CR3001 (tela TFT colorida) funcionam de modo autônomo pela porta OBD2.
- **Escopo real:** Todos atuam na leitura/limpeza OBD-II de motor/emissões e NÃO acessam módulos de ABS ou Airbag.`,
  },
  // 10. Carregadores de bateria
  {
    id: 'art-comp-draft-carregadores',
    slug: 'comparativo-carregadores-trafotron-cf5ah-vs-woosh-12v-6a-vs-zeno-on',
    title: 'Rascunho de Comparativo: Trafotron CF5AH 5A vs. Woosh 12V 6A vs. Zeno oN 12V 6A',
    categorySlug: 'equipamentos-automotivos',
    articleType: 'comparativo',
    summary:
      'Construção metálica nacional (5A chaveado) versus carregadores digitais microprocessados bivolt automáticos (6A com LCD e pulso).',
    imageUrl: IMG_AUTOMOTIVE,
    keywords: ['carregador bateria 12v', 'trafotron cf5ah', 'woosh 12v 6a', 'zeno on'],
    readMinutes: 5,
    relatedProductSlugs: [
      'carregador-bateria-trafotron-cf5ah-12v-5a',
      'carregador-inteligente-bateria-woosh-12v-6a',
      'carregador-inteligente-bateria-zeno-on-12v-6a',
    ],
    featured: false,
    status: 'draft',
    content: `## Pauta de Comparativo Técnico (Rascunho Editorial)

- **Trafotron CF5AH:** 12V, 5A, 60 W, gabinete metálico robusto e seleção bivolt por chave.
- **Woosh e Zeno oN 12V 6A:** Bivolt automático, display LCD em tempo real, corte em carga completa e função pulso para baterias de 4Ah a 100Ah.`,
  },
  // 11. Compressores portateis
  {
    id: 'art-comp-draft-compressores',
    slug: 'comparativo-compressores-portateis-verunto-ver-b15-vs-astroai-vs-osram-450',
    title: 'Rascunho de Comparativo: VERUNTO VER-B15 vs. AstroAI 150 PSI vs. OSRAM TYREinflate 450',
    categorySlug: 'equipamentos-automotivos',
    articleType: 'comparativo',
    summary:
      'Comparação entre calibrador a bateria USB-C ultracompacto e compressores digitais ligados à tomada 12V do veículo.',
    imageUrl: IMG_AUTOMOTIVE,
    keywords: ['compressor portatil', 'verunto ver-b15', 'astroai', 'osram tyreinflate 450'],
    readMinutes: 5,
    relatedProductSlugs: [
      'compressor-portatil-verunto-ver-b15-150psi',
      'compressor-portatil-astroai-digital-150psi',
      'compressor-portatil-osram-tyreinflate-450',
    ],
    featured: false,
    status: 'draft',
    content: `## Pauta de Comparativo Técnico (Rascunho Editorial)

- **Alimentação:** VERUNTO VER-B15 opera com bateria interna USB-C (2.000 mAh); OSRAM TYREinflate 450 opera exclusivamente via tomada 12V; AstroAI varia conforme SKU (12V, AC/DC ou bateria).
- **Pressão:** Até 150 PSI (VERUNTO e AstroAI) vs. até 80 PSI / 5,5 bar (OSRAM TYREinflate 450 com foco automotivo rápido em ~3,5 min).`,
  },
  // 12. Macacos hidraulicos
  {
    id: 'art-comp-draft-macacos',
    slug: 'comparativo-macacos-sparta-jacare-2t-vs-sparta-garrafa-3t-vs-titanium-garrafa-2t',
    title: 'Rascunho de Comparativo: Sparta Jacaré 2T vs. Sparta Garrafa 3T vs. Titanium Garrafa 2T',
    categorySlug: 'equipamentos-automotivos',
    articleType: 'comparativo',
    summary:
      'Altura mínima de encaixe (135 mm vs 148 mm vs 180 mm), capacidade de carga (2T vs 3T) e estabilidade entre macaco jacaré e garrafa.',
    imageUrl: IMG_AUTOMOTIVE,
    keywords: ['macaco hidraulico', 'sparta jacare 2t', 'sparta garrafa 3t', 'titanium 2t'],
    readMinutes: 5,
    relatedProductSlugs: [
      'macaco-hidraulico-sparta-2-toneladas',
      'macaco-hidraulico-garrafa-sparta-3-toneladas',
      'macaco-hidraulico-garrafa-titanium-platina-2-toneladas',
    ],
    featured: false,
    status: 'draft',
    content: `## Pauta de Comparativo Técnico (Rascunho Editorial)

- **Vão livre mínimo:** Sparta Jacaré 2T (135–300 mm), Titanium Garrafa 2T (148–278 mm) e Sparta Garrafa 3T (180–340 mm).
- **Segurança:** Destacar em todas as colunas que nenhum macaco hidráulico substitui cavaletes mecânicos ao acessar a parte inferior do veículo.`,
  },
  // 13. Lavadoras de alta pressao
  {
    id: 'art-comp-draft-lavadoras',
    slug: 'comparativo-lavadoras-karcher-k2-vs-wap-wl1800-vs-electrolux-ews1850',
    title: 'Rascunho de Comparativo: Kärcher K2 Compacta vs. WAP WL 1800 vs. Electrolux EWS1850',
    categorySlug: 'limpeza-e-acessorios',
    articleType: 'comparativo',
    summary:
      'Disputa direta entre as três lavadoras residenciais mais buscadas: vazão de enxágue (280 vs 300 vs 360 L/h), pressão máxima e alcance de cabo.',
    imageUrl: IMG_PRESSURE_WASHER,
    keywords: ['lavadora alta pressao', 'karcher k2', 'wap wl 1800', 'electrolux ews1850'],
    readMinutes: 5,
    relatedProductSlugs: [
      'lavadora-karcher-k2-compacta',
      'lavadora-wap-wl-1800',
      'lavadora-electrolux-powerwash-ews1850',
    ],
    featured: false,
    status: 'draft',
    content: `## Pauta de Comparativo Técnico (Rascunho Editorial)

- **Vazão máxima:** WAP WL 1800 (360 L/h), Kärcher K2 (300 L/h) e Electrolux EWS1850 (280 L/h).
- **Pressão declarada:** 1.850 PSI na Electrolux contra 1.500 PSI nas versões de entrada K2 Compacta e WL 1800.
- **Mobilidade:** Electrolux traz cabo de força de 5 m; todas vêm com mangueira de alta pressão de 3 m no kit básico.`,
  },
  // 14. Aspiradores de po e agua
  {
    id: 'art-comp-draft-aspiradores-agua-po',
    slug: 'comparativo-aspiradores-wap-gtw-10-vs-electrolux-aqp20-vs-vonder-apv-1010',
    title: 'Rascunho de Comparativo: WAP GTW 10 vs. Electrolux AQP20 vs. Vonder APV 1010',
    categorySlug: 'limpeza-e-acessorios',
    articleType: 'comparativo',
    summary:
      'Capacidade útil para água e pó, presença de filtro HEPA e potência elétrica nos três aspiradores tipo barril para oficina e garagem.',
    imageUrl: IMG_VACUUM_EXTRACTOR,
    keywords: ['aspirador po e agua', 'wap gtw 10', 'electrolux aqp20', 'vonder apv 1010'],
    readMinutes: 5,
    relatedProductSlugs: [
      'aspirador-po-e-agua-wap-gtw-10',
      'aspirador-po-e-agua-electrolux-acqua-power-aqp20',
      'aspirador-po-e-agua-vonder-apv-1010',
    ],
    featured: false,
    status: 'draft',
    content: `## Pauta de Comparativo Técnico (Rascunho Editorial)

- **Potência:** WAP GTW 10 (1.400 W), Electrolux AQP20 (1.250–1.400 W conf. versão) e Vonder APV 1010 (1.000 W).
- **Capacidade:** Electrolux AQP20 lidera em volume de água útil (11 L em barril de 18 L) contra barris compactos de 10 L na WAP e Vonder.
- **Filtragem:** Vonder APV 1010 se diferencia pelo filtro HEPA de série para poeira fina de oficina.`,
  },
  // 15. Extratoras e higienizadoras
  {
    id: 'art-comp-draft-extratoras',
    slug: 'comparativo-extratoras-wap-spot-cleaner-w3-vs-w2-vs-philco-pex30a',
    title: 'Rascunho de Comparativo: WAP Spot Cleaner W3 vs. WAP W2 vs. Philco PEX30A',
    categorySlug: 'limpeza-e-acessorios',
    articleType: 'comparativo',
    summary:
      'Comparação direta de potência de sucção (110 vs 122 vs 160 mbar) e volume útil dos tanques nas principais extratoras portáteis.',
    imageUrl: IMG_VACUUM_EXTRACTOR,
    keywords: ['extratora portatil', 'spot cleaner w3', 'spot cleaner w2', 'philco pex30a'],
    readMinutes: 5,
    relatedProductSlugs: [
      'extratora-portatil-wap-spot-cleaner-w3',
      'extratora-portatil-wap-spot-cleaner-w2',
      'extratora-portatil-philco-pex30a',
    ],
    featured: false,
    status: 'draft',
    content: `## Pauta de Comparativo Técnico (Rascunho Editorial)

- **Poder de extração:** Spot Cleaner W3 (1.450 W / 110 mbar) < Spot Cleaner W2 (1.600 W / 122 mbar) < Philco PEX30A (2.000 W / 160 mbar).
- **Autonomia de água limpa:** ~1,1 L (W3), 1,4 L (W2) e 1,8 L útil (PEX30A).`,
  },
  // 16. Aspiradores verticais e portateis
  {
    id: 'art-comp-draft-aspiradores-verticais',
    slug: 'comparativo-wap-high-speed-plus-vs-black-vs-max',
    title: 'Rascunho de Comparativo: WAP High Speed Plus vs. High Speed Black vs. High Speed Max',
    categorySlug: 'limpeza-e-acessorios',
    articleType: 'comparativo',
    summary:
      'Entenda o que realmente muda entre as três variações mais vendidas da linha WAP High Speed (potência, acessórios 2 em 1 vs 3 em 1 e acabamento).',
    imageUrl: IMG_VACUUM_EXTRACTOR,
    keywords: ['wap high speed', 'high speed plus', 'high speed black', 'high speed max'],
    readMinutes: 4,
    relatedProductSlugs: [
      'aspirador-vertical-wap-high-speed-plus-1350w',
      'aspirador-vertical-wap-high-speed-black',
      'aspirador-vertical-wap-high-speed-max-1350w',
    ],
    featured: false,
    status: 'draft',
    content: `## Pauta de Comparativo Técnico (Rascunho Editorial)

- **Base compartilhada:** Todos trazem reservatório de 1,2 L sem saco, sistema Cyclone, peso de ~1,25 kg e filtro HEPA lavável apenas para pó seco.
- **Diferenças a validar nas ofertas:** Versões Plus e Max oferecem pacote 3 em 1 com 1.350 W e três bocais; edições Black frequentemente vêm em kit 2 em 1 de entrada.`,
  },
];

export const EXPANSION_BUYING_GUIDES: ExpansionArticleSeed[] = [
  // 1. Serra marmore
  {
    id: 'art-guia-serra-marmore',
    slug: 'guia-como-escolher-serra-marmore',
    title: 'Como escolher uma serra mármore: disco 110 mm ou 125 mm, potência e segurança',
    categorySlug: 'ferramentas-eletricas',
    articleType: 'guia',
    summary:
      'Aprenda a avaliar potência (1.300W vs 1.500W), profundidade de corte, refrigeração com água e os cuidados de segurança essenciais ao usar uma serra mármore.',
    imageUrl: IMG_CUTTER_HEATGUN,
    keywords: ['como escolher serra marmore', 'disco 110mm ou 125mm', 'corte porcelanato'],
    readMinutes: 6,
    relatedProductSlugs: [
      'serra-marmore-makita-4100nh3zx2',
      'serra-marmore-vonder-smv1300s',
      'serra-marmore-bosch-gdc-150',
    ],
    featured: false,
    status: 'published',
    content: `## 1. Tamanho do disco e profundidade de corte

A maioria das serras mármore tradicionais utiliza discos diamantados de **110 mm (4-3/8")**, como a [Makita 4100NH3ZX2](/produto/serra-marmore-makita-4100nh3zx2) e a [Vonder SMV1300S](/produto/serra-marmore-vonder-smv1300s), entregando cerca de 32 a 34 mm de corte a 90 graus. Quando é preciso cortar pedras mais espessas ou abrir rasgos mais fundos, modelos para discos de **125 mm (5")**, como a [Bosch GDC 150](/produto/serra-marmore-bosch-gdc-150), alcançam até 40 mm.

## 2. Potência e peso na mão

Motores entre **1.300 W e 1.500 W** garantem corte constante sem travar o disco em porcelanatos densos ou granito. Observe também o peso: máquinas abaixo de **3 kg** reduzem muito a fadiga em cortes verticais em parede.

## 3. Regra inegociável de segurança

Nunca instale disco dentado de madeira em uma serra mármore. A rotação acima de 12.000 RPM transforma qualquer travamento em risco grave de contragolpe.`,
  },
  // 2. Soprador termico
  {
    id: 'art-guia-soprador-termico',
    slug: 'guia-como-escolher-soprador-termico',
    title: 'Como escolher soprador térmico: 2 estágios, 3 estágios ou ajuste de temperatura?',
    categorySlug: 'ferramentas-eletricas',
    articleType: 'guia',
    summary:
      'Saiba quando um soprador de 2 temperaturas basta e por que o estágio de 50 °C ou o seletor contínuo fazem diferença no envelopamento e na vida útil.',
    imageUrl: IMG_CUTTER_HEATGUN,
    keywords: ['como escolher soprador termico', 'estagio 50 graus', 'envelopamento'],
    readMinutes: 5,
    relatedProductSlugs: [
      'soprador-termico-vonder-stv-200-2000w',
      'soprador-termico-vonder-stv-150-1500w',
      'soprador-termico-spark-br-2000w',
    ],
    featured: false,
    status: 'published',
    content: `## 1. Para que serve cada faixa de calor

- **50 °C a 150 °C:** secagem rápida de adesivos, colas e resfriamento da resistência antes de desligar o aparelho (presente no [Vonder STV 200](/produto/soprador-termico-vonder-stv-200-2000w)).
- **300 °C a 350 °C:** encolhimento de tubo termo-retrátil elétrico e amolecimento de etiquetas e vinil.
- **500 °C a 600 °C:** remoção de tintas antigas em madeira/metal, solda plástica e moldagem de tubulação de PVC.

## 2. Quantos estágios escolher?

Para reparos elétricos ocasionais, um modelo de 2 temperaturas como o [Vonder STV 150](/produto/soprador-termico-vonder-stv-150-1500w) resolve com economia. Já para envelopamento automotivo ou jornadas frequentes, prefira modelos de 3 estágios ou ajuste progressivo como o [Spark BR 2.000 W](/produto/soprador-termico-spark-br-2000w).`,
  },
  // 3. Pistola de pintura
  {
    id: 'art-guia-pistola-pintura',
    slug: 'guia-como-escolher-pistola-pintura-eletrica',
    title: 'Como escolher pistola de pintura elétrica HVLP sem entupir nem desperdiçar tinta',
    categorySlug: 'ferramentas-eletricas',
    articleType: 'guia',
    summary:
      'Entenda o papel da potência em watts, da viscosidade em DIN-s, do diâmetro dos bicos e do volume da caneca antes de comprar sua pistola elétrica.',
    imageUrl: IMG_PAINT_POLISHER,
    keywords: ['pistola de pintura eletrica', 'hvlp', 'viscosidade din-s'],
    readMinutes: 6,
    relatedProductSlugs: [
      'pistola-pintura-eletrica-the-black-tools-tpp150',
      'pistola-pintura-eletrica-wap-epp400',
      'pistola-pintura-eletrica-vonder-pev-400',
    ],
    featured: false,
    status: 'published',
    content: `## 1. O segredo está na diluição (DIN-s)

Pistolas elétricas HVLP pulverizam a tinta por alto volume de ar e baixa pressão. Isso gera menos névoa que compressores tradicionais, mas exige diluir corretamente a tinta usando o **copo medidor de viscosidade**.

## 2. Potência, bicos e tamanho da caneca

- Para portões grandes e paredes, motores de **600 W** com caneca maior de 1.250 ml como a [The Black Tools TPP150](/produto/pistola-pintura-eletrica-the-black-tools-tpp150) reduzem reabastecimentos.
- Para móveis, grades e janelas, modelos compactos de **400 W** como a [WAP EPP400](/produto/pistola-pintura-eletrica-wap-epp400) (900 ml) e a [Vonder PEV 400](/produto/pistola-pintura-eletrica-vonder-pev-400) (800 ml) pesam menos no punho.`,
  },
  // 4. Politriz eletrica
  {
    id: 'art-guia-politriz',
    slug: 'guia-como-escolher-politriz-automotiva',
    title: 'Como escolher uma politriz elétrica: rotação segura, tamanho do prato e controle eletrônico',
    categorySlug: 'ferramentas-eletricas',
    articleType: 'guia',
    summary:
      'Não confunda esmerilhadeira com politriz: veja qual faixa de RPM protege o verniz automotivo e quando escolher 5" ou 7".',
    imageUrl: IMG_PAINT_POLISHER,
    keywords: ['como escolher politriz', 'polimento automotivo rpm', 'constant electronic'],
    readMinutes: 6,
    relatedProductSlugs: [
      'politriz-eletrica-bosch-gpo-14-ce',
      'politriz-eletrica-the-black-tools-bpa1200',
      'politriz-eletrica-holtter-600w',
    ],
    featured: false,
    status: 'published',
    content: `## 1. Por que a rotação mínima importa mais que a máxima

Para trabalhar compostos polidores com segurança sem queimar ou manchar o verniz do carro, a politriz precisa começar baixo (entre **600 e 1.000 RPM**) e trabalhar confortavelmente até **2.500–3.000 RPM**. Modelos profissionais como a [Bosch GPO 14 CE](/produto/politriz-eletrica-bosch-gpo-14-ce) oferecem partida suave e controle constante eletrônico nessa janela exata.

## 2. Uso eventual vs. detalhamento contínuo

Se a intenção for apenas aplicar cera ou revitalizar faróis eventualmente, modelos leves como a [Holtter 600 W](/produto/politriz-eletrica-holtter-600w) (5") atendem o básico. Para correção de verniz na garagem com orçamento intermediário, observe a [The Black Tools BPA1200](/produto/politriz-eletrica-the-black-tools-bpa1200) mantendo atenção à rotação.`,
  },
  // 5. Chaves combinadas
  {
    id: 'art-guia-chaves-combinadas',
    slug: 'guia-como-escolher-jogo-chaves-combinadas',
    title: 'Como escolher jogo de chaves combinadas: medidas essenciais, aço Cr-V e acabamento',
    categorySlug: 'ferramentas-manuais',
    articleType: 'guia',
    summary:
      'Entenda por que alguns jogos de 12 peças pulam as medidas 15, 16 e 18 mm e o que avaliar entre linhas domésticas e industriais.',
    imageUrl: IMG_HAND_TOOLS_SET,
    keywords: ['jogo de chaves combinadas', 'cromo vanadio', '6 a 22 mm'],
    readMinutes: 5,
    relatedProductSlugs: [
      'jogo-chaves-combinadas-gedore-robust-12-pecas',
      'jogo-chaves-combinadas-tramontina-pro-12-pecas',
      'jogo-chaves-combinadas-the-black-tools-tkch12',
    ],
    featured: false,
    status: 'published',
    content: `## 1. Conferindo a grade de medidas antes de comprar

Muitos jogos padrão de 12 peças cobrem de **6 mm a 22 mm** trazendo as bitolas mais clássicas (6 a 14, 17, 19 e 22 mm), como o [Gedore Robust S09105012](/produto/jogo-chaves-combinadas-gedore-robust-12-pecas) e o [The Black Tools TKCH12](/produto/jogo-chaves-combinadas-the-black-tools-tkch12). Se você trabalha com automóveis mais modernos, verifique se precisará adquirir avulsas as chaves 15, 16 e 18 mm.

## 2. Aço e perfil da boca estrela

Em parafusos oxidados de suspensão ou motor, chaves forjadas em **aço Cromo-Vanádio** com encaixe de apoio nas faces — como na linha [Tramontina PRO](/produto/jogo-chaves-combinadas-tramontina-pro-12-pecas) — evitam que a chave abra ou espane a cabeça do sextavado.`,
  },
  // 6. Jogos de soquetes e catracas
  {
    id: 'art-guia-soquetes-catracas',
    slug: 'guia-como-escolher-jogo-de-soquetes-e-catraca',
    title: 'Como escolher jogo de soquetes e catraca: encaixe 1/4", 3/8" ou 1/2" e soquetes longos',
    categorySlug: 'ferramentas-manuais',
    articleType: 'guia',
    summary:
      'Saiba quando um kit de 46 peças resolve e quando vale investir em conjuntos com soquetes longos ou encaixes maiores.',
    imageUrl: IMG_HAND_SOCKETS,
    keywords: ['jogo de soquetes', 'encaixe 1/4', 'catraca reversivel', 'stels 57'],
    readMinutes: 5,
    relatedProductSlugs: [
      'jogo-soquetes-stels-57-pecas-1410155',
      'jogo-soquetes-quicko-46-pecas',
      'jogo-soquetes-hexon-46-pecas',
    ],
    featured: false,
    status: 'published',
    content: `## 1. Entendendo o tamanho do quadrado de encaixe

- **1/4":** compacto, perfeito para parafusos de 4 a 14 mm, painéis internos, motos e cofres de motor apertados.
- **3/8":** intermediário para mecânica geral do motor.
- **1/2":** força pesada para rodas (17–21 mm), suspensão e freios.

## 2. Kits 46 peças vs. 57 peças

Os kits de 46 peças como [Quicko 46](/produto/jogo-soquetes-quicko-46-pecas) e [Hexon 46](/produto/jogo-soquetes-hexon-46-pecas) são campeões para levar no carro. Porém, se você costuma encontrar porcas presas em pontas compridas de prisioneiros, os **soquetes longos** do [Stels 57 peças](/produto/jogo-soquetes-stels-57-pecas-1410155) resolvem sem adaptações.`,
  },
  // 7. Alicates
  {
    id: 'art-guia-alicates',
    slug: 'guia-como-escolher-alicate-universal-isolado',
    title: 'Como escolher alicate universal 8": isolação 1.000 V, normas NBR e aço do corte',
    categorySlug: 'ferramentas-manuais',
    articleType: 'guia',
    summary:
      'Aprenda a conferir a certificação real 1.000 V no cabo, o tamanho ideal de alavancagem e os cuidados para preservar o fio de corte.',
    imageUrl: IMG_HAND_TOOLS_SET,
    keywords: ['alicate universal 8', 'isolado 1000v', 'nbr 9699'],
    readMinutes: 5,
    relatedProductSlugs: [
      'alicate-universal-vonder-8-isolado-1000v',
      'alicate-universal-tramontina-master-8-1000v',
      'alicate-universal-stanley-8-1000v',
    ],
    featured: false,
    status: 'published',
    content: `## 1. Nem todo cabo emborrachado é isolado para 1.000 V

Um erro frequente na compra online é confundir cabos ergonômicos comuns com isolação elétrica certificada. Antes de atuar em quadros elétricos, procure a marcação explícita de **1.000 V** e atendimento a normas como **ABNT NBR 9699 / IEC 60900**, presente em modelos como o [Tramontina Master 8" 1000V](/produto/alicate-universal-tramontina-master-8-1000v) e o [Vonder 8" Cr-V 1000V](/produto/alicate-universal-vonder-8-isolado-1000v).

## 2. Abas de proteção e aço

Prefira alicates de **8 polegadas** para alavancagem versátil no corte de cabos e com abas elevadas no cabo que impedem os dedos de escorregarem até o metal. No caso da linha [Stanley 8"](/produto/alicate-universal-stanley-8-1000v), confirme no anúncio se trata da edição isolada 1000V.`,
  },
  // 8. Martelos
  {
    id: 'art-guia-martelos',
    slug: 'guia-como-escolher-martelo-de-unha',
    title: 'Como escolher martelo de unha: cabo de fibra ou madeira e qual milimetragem comprar',
    categorySlug: 'ferramentas-manuais',
    articleType: 'guia',
    summary:
      'Compare cabeças de 25 mm, 27 mm e 29 mm e descubra por que os cabos de fibra de vidro ganharam espaço na caixa de ferramentas.',
    imageUrl: IMG_HAND_TOOLS_SET,
    keywords: ['como escolher martelo de unha', '27mm ou 29mm', 'cabo de fibra'],
    readMinutes: 4,
    relatedProductSlugs: [
      'martelo-unha-vonder-cabo-fibra-27mm',
      'martelo-unha-tramontina-master-profissional-27mm',
      'martelo-unha-lfal-cabo-fibra',
    ],
    featured: false,
    status: 'published',
    content: `## 1. Qual medida de cabeça escolher?

Os martelos de unha brasileiros são classificados pelo diâmetro nominal da face de impacto:
- **25 mm:** leve, ótimo para pequenos pregos e reparos dentro de casa.
- **27 mm:** equilíbrio ideal entre peso e precisão, como no [Vonder Fibra 27 mm](/produto/martelo-unha-vonder-cabo-fibra-27mm) e no [Tramontina Master 27 mm](/produto/martelo-unha-tramontina-master-profissional-27mm).
- **29 mm:** indicado para carpintaria estrutural pesada e pregos grossos.

## 2. Cabo de fibra de vidro vs. madeira

Cabos em fibra de vidro com pega emborrachada TPR (como Vonder e [LFAL](/produto/martelo-unha-lfal-cabo-fibra)) não incham com chuva nem ressecam ao sol, além de absorverem parte da vibração no punho.`,
  },
  // 9. Scanners automotivos
  {
    id: 'art-guia-scanners-obd2',
    slug: 'guia-como-escolher-scanner-automotivo-obd2',
    title: 'Como escolher um scanner automotivo OBD2: adaptador Bluetooth ou scanner com tela?',
    categorySlug: 'equipamentos-automotivos',
    articleType: 'guia',
    summary:
      'Entenda o que um leitor OBD2 realmente lê no seu carro, as limitações com ABS/Airbag e como escolher entre ELM327, V519 e Launch CR3001.',
    imageUrl: IMG_AUTOMOTIVE,
    keywords: ['scanner automotivo obd2', 'v519', 'launch cr3001', 'elm327'],
    readMinutes: 6,
    relatedProductSlugs: [
      'scanner-automotivo-obd2-elm327',
      'scanner-automotivo-v519-obd2',
      'scanner-automotivo-launch-creader-cr3001',
    ],
    featured: false,
    status: 'published',
    content: `## 1. O que todo leitor OBD2 de entrada faz (e o que NÃO faz)

Scanners OBD-II de faixa acessível lêem e apagam códigos de falha **P0xxx** da injeção eletrônica (motor, sensores de temperatura, sonda lambda, ignição, fluxo de ar). Eles **não acessam ABS, Airbag (SRS) nem câmbio automático** na grande maioria dos carros.

## 2. Celular vs. tela dedicada

- **Via smartphone:** o clássico [ELM327](/produto/scanner-automotivo-obd2-elm327) custa pouco e funciona com apps como Car Scanner e Torque.
- **Autônomo no cabo:** modelos com visor colorido como o [V519 OBD2](/produto/scanner-automotivo-v519-obd2) e o [Launch Creader CR3001](/produto/scanner-automotivo-launch-creader-cr3001) ficam prontos no porta-luvas sem depender de bateria ou pareamento de celular.`,
  },
  // 10. Carregadores de bateria
  {
    id: 'art-guia-carregadores-bateria',
    slug: 'guia-como-escolher-carregador-bateria-12v',
    title: 'Como escolher carregador de bateria automotiva 12V: amperagem, carga flutuante e pulso',
    categorySlug: 'equipamentos-automotivos',
    articleType: 'guia',
    summary:
      'Aprenda a calcular a corrente ideal (5A ou 6A) para a sua bateria e entenda a diferença entre carregador tradicional e carregador inteligente.',
    imageUrl: IMG_AUTOMOTIVE,
    keywords: ['carregador bateria 12v', 'carga lenta', 'bateria automotiva'],
    readMinutes: 5,
    relatedProductSlugs: [
      'carregador-bateria-trafotron-cf5ah-12v-5a',
      'carregador-inteligente-bateria-woosh-12v-6a',
      'carregador-inteligente-bateria-zeno-on-12v-6a',
    ],
    featured: false,
    status: 'published',
    content: `## 1. Qual amperagem escolher (5A ou 6A)?

Para carga lenta saudável em uma bateria automotiva padrão de **45 Ah a 75 Ah**, recomenda-se corrente próxima de 10% da capacidade nominal — exatamente onde modelos de **5A a 6A** atuam com segurança sem aquecer as placas internas.

## 2. Tradicional robusto vs. inteligente com LCD

- Se busca estrutura metálica simples de oficina, o nacional [Trafotron CF5AH](/produto/carregador-bateria-trafotron-cf5ah-12v-5a) entrega 5A com proteção contra inversão.
- Se prefere deixar o carro ligado na tomada por dias sem risco de ferver o eletrólito, carregadores microprocessados bivolt com corte automático como o [Woosh 12V 6A](/produto/carregador-inteligente-bateria-woosh-12v-6a) e o [Zeno oN 12V 6A](/produto/carregador-inteligente-bateria-zeno-on-12v-6a) gerenciam tudo sozinhos.`,
  },
  // 11. Compressores portateis
  {
    id: 'art-guia-compressores-portateis',
    slug: 'guia-como-escolher-compressor-portatil-pneus',
    title: 'Como escolher compressor portátil para pneus: bateria USB-C ou tomada 12V?',
    categorySlug: 'equipamentos-automotivos',
    articleType: 'guia',
    summary:
      'Compare autonomia, tempo de enchimento, função auto-stop e pressão máxima (80 PSI vs 150 PSI) antes de montar seu kit de emergência.',
    imageUrl: IMG_AUTOMOTIVE,
    keywords: ['compressor portatil pneus', '12v ou bateria', 'auto stop'],
    readMinutes: 5,
    relatedProductSlugs: [
      'compressor-portatil-verunto-ver-b15-150psi',
      'compressor-portatil-astroai-digital-150psi',
      'compressor-portatil-osram-tyreinflate-450',
    ],
    featured: false,
    status: 'published',
    content: `## 1. Bateria recarregável vs. tomada 12V do carro

- **A bateria (USB-C):** o [VERUNTO VER-B15](/produto/compressor-portatil-verunto-ver-b15-150psi) é imbatível em praticidade para bicicletas, motos e pequenos ajustes semanais no carro sem cabos.
- **Ligado no 12V do carro:** modelos como o [OSRAM TYREinflate 450](/produto/compressor-portatil-osram-tyreinflate-450) e as versões 12V da [AstroAI](/produto/compressor-portatil-astroai-digital-150psi) nunca ficam sem carga na hora da emergência rodoviária.

## 2. Exija desligamento automático (Auto-Stop)

Modelos digitais permitem programar exatamente 32 ou 35 PSI e desligam sozinhos ao atingir a pressão, evitando ficar agachado checando manômetros manuais.`,
  },
  // 12. Macacos hidraulicos
  {
    id: 'art-guia-macacos-hidraulicos',
    slug: 'guia-como-escolher-macaco-hidraulico-jacare-ou-garrafa',
    title: 'Como escolher macaco hidráulico: modelo jacaré ou garrafa, altura mínima e segurança',
    categorySlug: 'equipamentos-automotivos',
    articleType: 'guia',
    summary:
      'Meça o vão livre do seu carro com pneu murcho antes de comprar e entenda quando 2 toneladas bastam ou quando escolher 3 toneladas.',
    imageUrl: IMG_AUTOMOTIVE,
    keywords: ['macaco jacare ou garrafa', 'altura minima macaco', 'cavalete'],
    readMinutes: 5,
    relatedProductSlugs: [
      'macaco-hidraulico-sparta-2-toneladas',
      'macaco-hidraulico-garrafa-sparta-3-toneladas',
      'macaco-hidraulico-garrafa-titanium-platina-2-toneladas',
    ],
    featured: false,
    status: 'published',
    content: `## 1. Meça a altura mínima com pneu vazio!

Muitos motoristas compram macacos garrafa altos e descobrem na emergência que ele não entra debaixo da carroceria:
- **Jacaré 2T (ex.: [Sparta Jacaré 2T](/produto/macaco-hidraulico-sparta-2-toneladas)):** altura inicial baixa (135 mm) e base larga sobre 4 rodas, ideal para hatches, sedãs e garagens planas.
- **Garrafa 2T ou 3T:** ocupa pouquíssimo espaço, mas exige vão livre de 148 mm ([Titanium 2T](/produto/macaco-hidraulico-garrafa-titanium-platina-2-toneladas)) a 180 mm ([Sparta Garrafa 3T](/produto/macaco-hidraulico-garrafa-sparta-3-toneladas)), funcionando melhor em SUVs e picapes.

## 2. Regra de ouro em qualquer elevação

Jamais entre embaixo de um veículo apoiado apenas no macaco hidráulico — utilize sempre **cavaletes mecânicos** compatíveis.`,
  },
  // 13. Lavadoras de alta pressao
  {
    id: 'art-guia-lavadoras-pressao',
    slug: 'guia-pressao-psi-vs-vazao-lavadoras-alta-pressao',
    title: 'PSI ou Vazão (L/h)? Como comparar lavadoras de alta pressão residenciais corretamente',
    categorySlug: 'limpeza-e-acessorios',
    articleType: 'guia',
    summary:
      'Entenda por que olhar apenas o número máximo de PSI engana e veja o equilíbrio ideal para lavar carros e quintais.',
    imageUrl: IMG_PRESSURE_WASHER,
    keywords: ['psi ou vazao', 'lavadora alta pressao', 'karcher k2', 'wap wl 1800'],
    readMinutes: 5,
    relatedProductSlugs: [
      'lavadora-karcher-k2-compacta',
      'lavadora-wap-wl-1800',
      'lavadora-electrolux-powerwash-ews1850',
    ],
    featured: false,
    status: 'published',
    content: `## 1. Pressão descola a sujeira; vazão carrega ela embora

Em lavadoras de entrada (1.400 W a 1.500 W), existe uma troca direta de engenharia:
- A [WAP WL 1800](/produto/lavadora-wap-wl-1800) entrega ótima vazão máxima de **360 L/h** com 1.500 PSI e apenas 3 kg.
- A [Kärcher K2 Compacta](/produto/lavadora-karcher-k2-compacta) entrega **300 L/h** com ampla rede de acessórios.
- A [Electrolux EWS1850](/produto/lavadora-electrolux-powerwash-ews1850) prioriza pressão concentrada (**1.850 PSI** e **280 L/h**) e cabo elétrico maior (5 m).

## 2. Atenção à voltagem

Nenhuma dessas lavadoras residenciais é bivolt: confira sempre 127V ou 220V antes de finalizar o pedido.`,
  },
  // 14. Aspiradores de po e agua
  {
    id: 'art-guia-aspiradores-po-agua',
    slug: 'guia-como-escolher-aspirador-po-e-agua-oficina-garagem',
    title: 'Como escolher aspirador de pó e água: capacidade útil, função sopro e filtro HEPA',
    categorySlug: 'limpeza-e-acessorios',
    articleType: 'guia',
    summary:
      'Descubra por que um barril de 18 L comporta o triplo de água útil de um barril de 10 L e quando o filtro HEPA faz diferença na oficina.',
    imageUrl: IMG_VACUUM_EXTRACTOR,
    keywords: ['aspirador po e agua', 'wap gtw 10', 'electrolux aqp20', 'vonder apv 1010'],
    readMinutes: 5,
    relatedProductSlugs: [
      'aspirador-po-e-agua-wap-gtw-10',
      'aspirador-po-e-agua-electrolux-acqua-power-aqp20',
      'aspirador-po-e-agua-vonder-apv-1010',
    ],
    featured: false,
    status: 'published',
    content: `## 1. Capacidade total vs. capacidade útil

Um erro comum é olhar apenas o tamanho do tanque em litros. Um barril de 10 litros como o [WAP GTW 10](/produto/aspirador-po-e-agua-wap-gtw-10) comporta cerca de 3,4 L de líquidos antes da boia travar; já um barril de 18 L como o [Electrolux AQP20](/produto/aspirador-po-e-agua-electrolux-acqua-power-aqp20) comporta até **11 litros úteis de água**.

## 2. Poeira fina de oficina pede HEPA

Para quem fura paredes ou lixa madeira na garagem, modelos com filtro HEPA cartucho como o [Vonder APV 1010](/produto/aspirador-po-e-agua-vonder-apv-1010) retêm poeira fina com muito mais eficiência (lembrando sempre de retirar o HEPA ao aspirar líquidos).`,
  },
  // 15. Extratoras
  {
    id: 'art-guia-extratoras-portateis',
    slug: 'guia-como-escolher-extratora-portatil-estofados',
    title: 'Como escolher extratora portátil: poder de vácuo (mbar), tanques e detergente correto',
    categorySlug: 'limpeza-e-acessorios',
    articleType: 'guia',
    summary:
      'Entenda por que o vácuo em mbar define quanto tempo o banco do carro demora para secar após a higienização.',
    imageUrl: IMG_VACUUM_EXTRACTOR,
    keywords: ['como escolher extratora portatil', 'higienizacao bancos carro', 'spot cleaner'],
    readMinutes: 5,
    relatedProductSlugs: [
      'extratora-portatil-wap-spot-cleaner-w3',
      'extratora-portatil-wap-spot-cleaner-w2',
      'extratora-portatil-philco-pex30a',
    ],
    featured: false,
    status: 'published',
    content: `## 1. O vácuo (mbar / kPa) define o tempo de secagem

Em uma extratora, não basta molhar: quanto maior o vácuo, menos umidade fica retida na espuma do sofá ou banco do carro:
- [WAP Spot Cleaner W3](/produto/extratora-portatil-wap-spot-cleaner-w3): **110 mbar** (ótima para manchas pontuais e uso rápido).
- [WAP Spot Cleaner W2](/produto/extratora-portatil-wap-spot-cleaner-w2): **122 mbar** e tanques maiores (1,4 L limpa).
- [Philco PEX30A](/produto/extratora-portatil-philco-pex30a): **160 mbar (16 kPa)** e 2.000 W com 1,8 L útil.

## 2. Nunca use detergente espumoso comum

Espuma em excesso sobe para a turbina e aciona a boia prematuramente. Utilize sempre produtos específicos para extração.`,
  },
  // 16. Aspiradores verticais e portateis
  {
    id: 'art-guia-aspiradores-verticais',
    slug: 'guia-como-escolher-aspirador-vertical-para-casa-e-carro',
    title: 'Aspirador vertical com fio 1.350 W: vale a pena para manutenção rápida da casa e carro?',
    categorySlug: 'limpeza-e-acessorios',
    articleType: 'guia',
    summary:
      'Veja as vantagens de peso e sucção dos modelos verticais 3 em 1 Cyclone com filtro HEPA frente a aspiradores sem fio baratos.',
    imageUrl: IMG_VACUUM_EXTRACTOR,
    keywords: ['aspirador vertical 1350w', 'cyclone hepa', 'wap high speed'],
    readMinutes: 4,
    relatedProductSlugs: [
      'aspirador-vertical-wap-high-speed-plus-1350w',
      'aspirador-vertical-wap-high-speed-max-1350w',
      'aspirador-vertical-wap-high-speed-black',
    ],
    featured: false,
    status: 'published',
    content: `## 1. Potência constante na tomada vs. bateria econômica

Aspiradores sem fio muito baratos costumam perder sucção após poucos minutos. Modelos verticais com fio de **1.350 W**, como o [WAP High Speed Plus](/produto/aspirador-vertical-wap-high-speed-plus-1350w) e o [WAP High Speed Max](/produto/aspirador-vertical-wap-high-speed-max-1350w), entregam ~131–134 mbar constantes pesando cerca de **1,25 kg**.

## 2. Confira se o kit é 2 em 1 ou 3 em 1

Antes de comprar edições como o [WAP High Speed Black](/produto/aspirador-vertical-wap-high-speed-black), verifique se o pacote traz os três bocais (piso, canto e escova de estofados) caso pretenda aspirar bancos e painéis automotivos com frequência.`,
  },
];
