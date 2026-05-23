'use client'

import { useState } from 'react'

const WINDOW = '9–23 mai 2026'

type Platform = 'TikTok' | 'Instagram' | 'X' | 'YouTube'
type Category = 'Polêmica' | 'Meme' | 'Futebol' | 'Humor' | 'Cultura' | 'Nostalgia' | 'IA'
type Saturation = 'emergente' | 'crescendo'

interface Creator {
  name: string
  handle: string
  link: string
}

interface Trend {
  rank: number
  title: string
  subtitle: string
  category: Category
  platforms: Platform[]
  heat: number
  saturation: Saturation
  replications: string
  creators: Creator[]
  description: string
  insight: string
  opportunity: string
  originalPostLink: string
  coverageLink: string
  linkLabel: string
  tags: string[]
  fire: boolean
}

const TRENDS: Trend[] = [
  {
    rank: 1,
    title: 'IABatida — "O Sapo Não Lava o Pé" em Blues dos Anos 50',
    subtitle: '@iabatida · TikTok · 9 mai 2026 · 1,5M likes',
    category: 'IA',
    platforms: ['TikTok', 'Instagram'],
    heat: 9,
    saturation: 'emergente',
    replications: '+12k covers e reações geradas',
    creators: [
      { name: 'IABatida', handle: '@iabatida', link: 'https://www.tiktok.com/@iabatida' },
    ],
    description: 'IA transforma a cantiga infantil "O Sapo Não Lava o Pé" num blues pesado dos anos 50 com sapo em smoking num clube fumegante. O canal @iabatida reimagina músicas brasileiras em outros gêneros via IA — o resultado é absurdo e adorável. 1,5M de likes no vídeo do Sapo; Baby Shark anos 50 chegou a 1,6M no mesmo canal. Usuários passaram a taggear o canal sugerindo novas músicas para reimaginação.',
    insight: 'Novo formato: IA como cúmplice criativo da nostalgia brasileira. Quando o absurdo é bem executado, viraliza sem celebridade ou polêmica. Canal com 6,7M de likes totais em crescimento acelerado — estamos no começo da curva.',
    opportunity: 'Marcas podem co-patrocinar uma versão IA de jingle histórico ou clássico ligado ao produto. Baixíssima produção, alto potencial de UGC — usuários vão sugerir releituras espontaneamente.',
    originalPostLink: 'https://www.tiktok.com/@iabatida/video/7634312872121748757',
    coverageLink: 'https://decrypt.co/366884/blues-singing-ai-frog-taking-over-tiktok-brazil',
    linkLabel: 'Ver TikTok original — @iabatida',
    tags: ['#IABatida', '#SapoBlues', '#MúsicaIA', '#NostalgiaBR'],
    fire: true,
  },
  {
    rank: 2,
    title: 'Neymar chora ao ser convocado para a Copa 2026',
    subtitle: '@neymarjr · Instagram · 19 mai 2026',
    category: 'Futebol',
    platforms: ['Instagram', 'X', 'TikTok'],
    heat: 10,
    saturation: 'crescendo',
    replications: '+90k reações, vídeos e memes',
    creators: [
      { name: 'Neymar Jr.', handle: '@neymarjr', link: 'https://www.instagram.com/neymarjr/' },
      { name: 'Bruna Biancardi', handle: '@brunabiancardi', link: 'https://www.instagram.com/brunabiancardi/' },
    ],
    description: 'Após 2 anos e meio fora da Seleção, Neymar postou o vídeo da reação ao ouvir o nome ser lido por Ancelotti. Filmado pela mulher Bruna Biancardi, ele aparece em lágrimas: "choro de muita felicidade". O vídeo acumulou milhões de views em horas. Copa 2026 começa em junho — a narrativa de retorno tem potencial crescente.',
    insight: 'Vídeos de reação autêntica têm alcance exponencial porque ativam empatia coletiva. O Brasil inteiro esperava esse momento — quando a Seleção convoca, o país para. O timing pré-Copa amplifica tudo.',
    opportunity: 'Marcas com equity patriótico podem ancorar em "de volta para representar o Brasil". Janela de 30 dias com Copa iniciando em junho — maior oportunidade de branding esportivo do ano.',
    originalPostLink: 'https://www.instagram.com/reel/DYhZJtsE6q2/',
    coverageLink: 'https://www.metropoles.com/esportes/veja-reacao-de-neymar-ao-ser-convocado-para-a-copa-do-mundo',
    linkLabel: 'Ver Reel original — @neymarjr',
    tags: ['#Neymar', '#Copa2026', '#Convocação', '#SeleçãoBrasileira'],
    fire: true,
  },
  {
    rank: 3,
    title: '"Fica Bem" — o template meme da quinzena',
    subtitle: 'Vini Jr. → X Brasil → +200k posts · 18 mai 2026',
    category: 'Meme',
    platforms: ['X', 'Instagram', 'TikTok'],
    heat: 9,
    saturation: 'crescendo',
    replications: '+200k posts usando o template',
    creators: [
      { name: 'Vini Jr.', handle: '@vinijr', link: 'https://www.instagram.com/vinijr/' },
      { name: 'Neide Comenta', handle: '@Neidecomenta', link: 'https://x.com/Neidecomenta' },
      { name: 'Out of Context BR', handle: '@oocbrsao', link: 'https://x.com/oocbrsao' },
    ],
    description: 'Vini Jr. encerrou o namoro com Virgínia Fonseca via Instagram Stories com "Obrigado por tudo! Fica bem!" — e a internet transformou "fica bem" num template universal de despedida irônica. Qualquer situação de abandono agora termina com a frase. @Neidecomenta e @oocbrsao foram os principais amplificadores.',
    insight: 'Template meme de alta penetração: 2 palavras, contexto universal. Ainda em crescimento — creators de nichos diferentes continuam adaptando. Shelf life estimado de 3-4 semanas antes de saturar.',
    opportunity: 'Marcas podem usar o humor de autoconsciência: "nosso produto antigo: fica bem. O novo chegou." Funciona para lançamentos, rebranding ou comunicação de upgrade.',
    originalPostLink: 'https://www.uai.com.br/app/entretenimento/famosos/2026/05/18/not-famosos,383147/vini-jr-e-detonado-apos-declaracao-de-fim-de-namoro-jurandir-se-achando.shtml',
    coverageLink: 'https://www.purepeople.com.br/noticia/vini-jr-e-virginia-terminaram-por-que-motivo-vem-a-tona-apos-rumores-de-traicao-teoria-de-afastamento-por-copa-do-mundo-2026-incentivado-pela-equipe_a419993/1',
    linkLabel: 'Ver cobertura completa — UAI',
    tags: ['#FicaBem', '#ViniJr', '#Virgínia', '#TemplateViral'],
    fire: true,
  },
  {
    rank: 4,
    title: 'Zé Felipe — comentário com 1 milhão de curtidas',
    subtitle: '@zefelipe · Instagram · 19 mai 2026',
    category: 'Polêmica',
    platforms: ['Instagram', 'X'],
    heat: 9,
    saturation: 'crescendo',
    replications: '1M curtidas no próprio comentário',
    creators: [
      { name: 'Zé Felipe', handle: '@zefelipe', link: 'https://www.instagram.com/zefelipe/' },
      { name: 'Virgínia Fonseca', handle: '@virginia', link: 'https://www.instagram.com/virginia/' },
    ],
    description: 'Zé Felipe — ex-marido de Virgínia e pai de seus filhos — comentou na foto de Dubai dela com "Bom dia fica bem kkk", reciclando exatamente a frase que Vini Jr. usou para terminar. O comentário ultrapassou 1 milhão de curtidas em horas — um dos mais curtidos da história do Instagram Brasil.',
    insight: 'Humor preciso com contexto perfeito. Zé Felipe não precisou explicar nada — apenas 5 palavras e um "kkk" disseram tudo. A audiência completou o raciocínio. Alta eficiência comunicacional.',
    opportunity: 'O formato "referência interna + ironia econômica" é raro de executar para marcas. Marcas com tom de voz ácido e boa leitura cultural podem usar o referencial com parcimônia.',
    originalPostLink: 'https://tvprime.correiobraziliense.com.br/noticia/387587/celebridades/comentario-de-ze-felipe-debochando-de-vini-jr-em-foto-de-virginia-ultrapassa-1-milhao-de-curtidas-no-instagram-19052026',
    coverageLink: 'https://portalleodias.com/famosos/nao-perde-uma-ze-felipe-deixa-comentario-em-foto-de-virginia-bom-dia-fica-bem',
    linkLabel: 'Ver cobertura — Correio Braziliense',
    tags: ['#ZéFelipe', '#FicaBem', '#ViralInstagram', '#Virgínia'],
    fire: true,
  },
  {
    rank: 5,
    title: 'Deolane — "Vou ficar bem ativa" horas antes de ser presa',
    subtitle: '@deolane · Instagram Stories · 21 mai 2026',
    category: 'Polêmica',
    platforms: ['Instagram', 'X'],
    heat: 10,
    saturation: 'crescendo',
    replications: '+45k posts com o meme',
    creators: [
      { name: 'Deolane Bezerra', handle: '@deolane', link: 'https://www.instagram.com/deolane/' },
    ],
    description: 'Horas antes de ser presa na Operação Vérnix (R$27M bloqueados, suspeita de vínculo com PCC), Deolane postou Stories segurando uma Hermès Birkin de ~R$325mil dizendo "Amanhã vou ficar bem ativa nessas redes". A ironia involuntária virou template instantâneo: anunciar futuras atividades que serão imediatamente interrompidas.',
    insight: 'Realidade superando qualquer roteiro de comédia. A força está na ironia não-intencional — que só a vida real cria. Nenhuma marca replica, mas pode surfar a energia do momento com cuidado.',
    opportunity: 'Marcas devem pausar entretenimento por 48h após o evento. Após esse período: janela para marcas com posicionamento genuíno de ética e transparência reafirmarem valores.',
    originalPostLink: 'https://www.correio24horas.com.br/em-alta/antes-de-ser-presa-deolane-bezerra-surgiu-nas-redes-com-bolsa-de-r-325-mil-eu-vou-ficar-bem-ativa-0526',
    coverageLink: 'https://www.poder360.com.br/poder-justica/deolane-exibiu-bolsa-de-r-325-mil-no-instagram-antes-de-ser-presa/',
    linkLabel: 'Ver cobertura — Correio 24h',
    tags: ['#Deolane', '#OperaçãoVérnix', '#VouFicarBemAtiva', '#IroniaReal'],
    fire: true,
  },
  {
    rank: 6,
    title: '"Papa Lesão XIV" — Neymar + Novo Papa = meme perfeito',
    subtitle: '@brunopredolin · TikTok + X · 8–9 mai 2026',
    category: 'Humor',
    platforms: ['TikTok', 'X', 'Instagram'],
    heat: 8,
    saturation: 'emergente',
    replications: '+15k variações — clubes, creators e fãs',
    creators: [
      { name: 'Bruno Predolin', handle: '@brunopredolin', link: 'https://www.tiktok.com/@brunopredolin' },
      { name: 'Sport Recife', handle: '@sportrecife', link: 'https://www.instagram.com/sportrecife/' },
      { name: 'Fortaleza EC', handle: '@fortalezaec', link: 'https://www.instagram.com/fortalezaec/' },
    ],
    description: 'Quando o Vaticano anunciou Papa Leão XIV (8 mai), a internet BR agiu em duas frentes: (1) Clubes com mascote leão (Sport, Fortaleza, Portuguesa) deram boas-vindas ao Papa em tom de torcida. (2) Neymar — eterno Papa das Lesões — virou "Papa Lesão XIV". @brunopredolin amplificou com TikTok sobre tweets antigos do Papa.',
    insight: 'Humor de justaposição cultural: evento mundial + obsessão local (futebol/lesão) = trend única. Clubes ágeis mostraram que marcas que entram no momento certo capturam o viral antes que esfrie.',
    opportunity: 'Marcas de saúde, esporte ou recuperação podem usar o tom "papa das recuperações". Janela estreita — formato ainda em crescimento, mas fecha em ~1 semana.',
    originalPostLink: 'https://www.tiktok.com/@brunopredolin/video/7502194783750802743',
    coverageLink: 'https://www.cnnbrasil.com.br/esportes/futebol/papa-lesao-xiv-neymar-e-outros-personagens-do-futebol-viram-meme-na-web/',
    linkLabel: 'Ver TikTok original — @brunopredolin',
    tags: ['#PapaLesãoXIV', '#Neymar', '#HabemusPapam', '#FutebolBR'],
    fire: false,
  },
  {
    rank: 7,
    title: 'Convocação Copa 2026 — Cerimônia no Museu do Amanhã vira meme',
    subtitle: 'Ancelotti + CBF · X + TikTok · 18 mai 2026',
    category: 'Futebol',
    platforms: ['X', 'TikTok', 'Instagram'],
    heat: 8,
    saturation: 'crescendo',
    replications: '+80k memes e posts',
    creators: [
      { name: 'Out of Context BR', handle: '@oocbrsao', link: 'https://x.com/oocbrsao' },
      { name: 'Pesgrau', handle: '@pesgrau', link: 'https://x.com/pesgrau' },
      { name: 'FuttMais', handle: '@futtmais', link: 'https://x.com/futtmais' },
    ],
    description: 'Ancelotti convocou 26 jogadores para a Copa no Museu do Amanhã (RJ) numa cerimônia solene que a internet achou clichê. A lista — com Neymar de volta após 2 anos — explodiu o X. Memes de @oocbrsao, @pesgrau e @futtmais dominaram por 3 dias consecutivos.',
    insight: 'Copa 2026 está a menos de 4 semanas. O engajamento futebolístico vai triplicar em junho. Marcas sem plano de Copa estão perdendo a maior janela de branding do ano.',
    opportunity: 'Conteúdo sobre escolhas de Ancelotti, palpites de escalação, narrativas de jogadores. Copa é o maior evento de UGC espontâneo do Brasil — o timing agora é crítico.',
    originalPostLink: 'https://www.metropoles.com/viralizou/veja-memes-da-convocacao-da-selecao-brasileira-para-a-copa-do-mundo-2026',
    coverageLink: 'https://www.cnnbrasil.com.br/esportes/futebol/veja-os-memes-sobre-a-convocacao-da-selecao-brasileira/',
    linkLabel: 'Ver memes — Metrópoles',
    tags: ['#Copa2026', '#Convocação', '#Ancelotti', '#SeleçãoBrasileira'],
    fire: false,
  },
  {
    rank: 8,
    title: 'Virgínia beija macaco em Dubai — debate público de racismo',
    subtitle: '@virginia · Instagram Stories → X · 19–20 mai 2026',
    category: 'Polêmica',
    platforms: ['Instagram', 'X', 'TikTok'],
    heat: 9,
    saturation: 'crescendo',
    replications: '+60k comentários e posts de debate',
    creators: [
      { name: 'Virgínia Fonseca', handle: '@virginia', link: 'https://www.instagram.com/virginia/' },
      { name: 'Anitta', handle: '@anitta', link: 'https://www.instagram.com/anitta/' },
    ],
    description: 'Dias após o término com Vini Jr. — alvo histórico de racismo europeu com comparações a macacos — Virgínia postou Stories beijando um macaco num zoo em Dubai. Anitta curtiu posts críticos. Virgínia emitiu nota se desculpando. O debate sobre intenção, racismo e responsabilidade de influencers durou 5+ dias.',
    insight: 'Quando Anitta entra em uma polêmica, a cobertura dobra. O debate extrapolou entretenimento e entrou em antirracismo e responsabilidade de celebridades — território sensível com reflexo longo.',
    opportunity: 'Exclusivamente para marcas com histórico genuíno de antirracismo — reafirmar posicionamento, nunca oportunismo. A audiência detecta imediatamente ações performáticas sem sustância.',
    originalPostLink: 'https://www.terra.com.br/diversao/que-pegada-foi-essa-virginia-fonseca-beija-macaco-durante-viagem-a-dubai-e-recebe-criticas,fef530c53c8eb7a1e3fb5fe954102003y3fxwqec.html',
    coverageLink: 'https://ndmais.com.br/comportamento/virginia-fonseca-beija-macaco-e-e-alvo-de-criticas-na-web/',
    linkLabel: 'Ver cobertura — Terra',
    tags: ['#Virgínia', '#Dubai', '#AntiRacismo', '#Polêmica'],
    fire: false,
  },
  {
    rank: 9,
    title: 'Exposição "MEME: no Br@sil da Memeficação" — CCBB BH',
    subtitle: 'CCBB Belo Horizonte · a partir de 10 mai 2026',
    category: 'Cultura',
    platforms: ['Instagram', 'X'],
    heat: 7,
    saturation: 'emergente',
    replications: '+25k posts e check-ins na exposição',
    creators: [
      { name: 'Saquinho de Lixo', handle: '@saquinhodelixo', link: 'https://www.instagram.com/saquinhodelixo/' },
      { name: 'Greengo Dictionary', handle: '@greengodictionary', link: 'https://www.instagram.com/greengodictionary/' },
      { name: 'Melted Videos', handle: '@meltedvideos', link: 'https://www.instagram.com/meltedvideos/' },
    ],
    description: 'A exposição no CCBB BH reúne @saquinhodelixo, @greengodictionary, @meltedvideos e criadores ao lado de artistas como Regina Silveira e Claudio Tozzi. Meme e arte fine art se tornam a mesma coisa. Quando a internet underground vira museu, o que era nicho vira patrimônio.',
    insight: 'Sinal cultural de longo prazo: meme culture deixou de ser marginal. Marcas que ainda tratam meme como "conteúdo barato" estão defasadas — é linguagem permanente da cultura brasileira.',
    opportunity: 'Parceria com criadores de meme é patrocínio de arte agora. Marcas com budget cultural podem associar-se à exposição ou creators para posicionamento de longo prazo.',
    originalPostLink: 'https://en.artsoul.com.br/revista/eventos/exposicao-meme-no-br-at-sil-da-memeficacao',
    coverageLink: 'https://en.artsoul.com.br/revista/eventos/exposicao-meme-no-br-at-sil-da-memeficacao',
    linkLabel: 'Ver exposição — ArtSoul',
    tags: ['#MemeBrasileiro', '#CCBBbh', '#CulturaBR', '#MemeArt'],
    fire: false,
  },
  {
    rank: 10,
    title: '"2026 é o novo 2016" — a nostalgia que todo mundo abraçou',
    subtitle: '@maisa + criadores · IG + TikTok + X · 18 mai 2026',
    category: 'Nostalgia',
    platforms: ['Instagram', 'TikTok', 'X'],
    heat: 7,
    saturation: 'crescendo',
    replications: '+25k posts com a trend',
    creators: [
      { name: 'Maisa', handle: '@maisa', link: 'https://www.instagram.com/maisa/' },
      { name: 'Saquinho de Lixo', handle: '@saquinhodelixo', link: 'https://www.instagram.com/saquinhodelixo/' },
    ],
    description: 'Resgatar fotos, filtros e sentimentos de 2016 — o filtro "Rio de Janeiro" do Instagram, a pose de paz, o Palmeiras. Maisa aderiu com 1M de curtidas. Saquinho entrou com sua "semaninha leve". A saudade coletiva de uma era que parecia simples continua crescendo, principalmente às vésperas da Copa.',
    insight: 'Nostalgia de 2016 representa pré-pandemia, pré-crise, pré-muita coisa. É uma fuga emocional coletiva validada. Com a Copa chegando — que também foi em 2014/2018 — o ciclo nostálgico amplifica.',
    opportunity: '"Brand nostalgia": mostrar produto/marca em 2016 vs. hoje. Baixíssima barreira de produção. Altíssimo potencial de UGC — usuários criam por conta própria sem incentivo.',
    originalPostLink: 'https://www.itatiaia.com.br/trends/2026-e-o-novo-2016-conheca-a-trend-nostalgica-que-dominou-a-web/',
    coverageLink: 'https://www.itatiaia.com.br/trends/2026-e-o-novo-2016-conheca-a-trend-nostalgica-que-dominou-a-web/',
    linkLabel: 'Ver trend — Itatiaia',
    tags: ['#2026EoNovo2016', '#Nostalgia', '#EraFelizENãoSabia'],
    fire: false,
  },
]

const SAT_CONFIG: Record<Saturation, { label: string; icon: string; bg: string; text: string; border: string; glow: string }> = {
  emergente: {
    label: 'EMERGENTE',
    icon: '🌱',
    bg: 'bg-emerald-500/12',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    glow: 'rgba(16,185,129,0.15)',
  },
  crescendo: {
    label: 'CRESCENDO',
    icon: '📈',
    bg: 'bg-orange-500/12',
    text: 'text-orange-400',
    border: 'border-orange-500/30',
    glow: 'rgba(249,115,22,0.15)',
  },
}

const CAT_STYLE: Record<Category, { bg: string; text: string; border: string }> = {
  Polêmica: { bg: 'bg-red-500/12',    text: 'text-red-400',    border: 'border-red-500/25'    },
  Meme:     { bg: 'bg-yellow-500/12', text: 'text-yellow-400', border: 'border-yellow-500/25' },
  Futebol:  { bg: 'bg-green-600/12',  text: 'text-green-400',  border: 'border-green-600/25'  },
  Humor:    { bg: 'bg-purple-500/12', text: 'text-purple-400', border: 'border-purple-500/25' },
  Cultura:  { bg: 'bg-cyan-500/12',   text: 'text-cyan-400',   border: 'border-cyan-500/25'   },
  Nostalgia:{ bg: 'bg-pink-500/12',   text: 'text-pink-400',   border: 'border-pink-500/25'   },
  IA:       { bg: 'bg-violet-500/12', text: 'text-violet-400', border: 'border-violet-500/25' },
}

const PLAT_ICON: Record<Platform, string> = {
  TikTok:    '♪',
  Instagram: '◈',
  X:         '✕',
  YouTube:   '▶',
}

const ALL_CATS = Object.keys(CAT_STYLE) as Category[]
const ALL_PLATS: Platform[] = ['TikTok', 'Instagram', 'X']
const ALL_SATS: Saturation[] = ['emergente', 'crescendo']

function HeatBar({ v }: { v: number }) {
  const color = v >= 9 ? '#ef4444' : v >= 7 ? '#f97316' : '#eab308'
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="h-1 rounded-sm"
          style={{
            width: i < v ? '8px' : '6px',
            background: i < v ? color : 'rgba(255,255,255,0.08)',
            transition: 'all 0.2s',
          }}
        />
      ))}
      <span className="ml-1.5 text-[11px] font-black tabular-nums" style={{ color }}>{v}/10</span>
    </div>
  )
}

export default function TrendsDashboard() {
  const [cat, setCat]   = useState<Category | null>(null)
  const [plat, setPlat] = useState<Platform | null>(null)
  const [sat, setSat]   = useState<Saturation | null>(null)
  const [open, setOpen] = useState<number | null>(null)

  const visible = TRENDS.filter(t => {
    if (cat  && t.category !== cat)                    return false
    if (plat && !t.platforms.includes(plat))           return false
    if (sat  && t.saturation !== sat)                  return false
    return true
  })

  const fireCount = TRENDS.filter(t => t.fire).length
  const emerCount = TRENDS.filter(t => t.saturation === 'emergente').length

  return (
    <div
      className="min-h-screen text-white selection:bg-green-500/30"
      style={{ background: 'linear-gradient(160deg,#030308 0%,#080818 50%,#040410 100%)' }}
    >
      {/* ── NOISE OVERLAY ── */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* ── HEADER ── */}
      <header
        className="sticky top-0 z-40 border-b border-white/5"
        style={{ background: 'rgba(3,3,8,0.92)', backdropFilter: 'blur(20px) saturate(180%)' }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black shrink-0"
              style={{ background: 'linear-gradient(135deg,#22c55e 0%,#16a34a 100%)', boxShadow: '0 0 16px rgba(34,197,94,0.4)' }}
            >
              S
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-black text-white text-sm sm:text-base tracking-tight">Smart</span>
                <span className="text-white/20">·</span>
                <span className="text-white/50 text-[11px] font-semibold tracking-widest uppercase">Trend Radar</span>
              </div>
              <p className="text-white/25 text-[10px] leading-none hidden sm:block tracking-wide">inteligência de cultura digital brasileira</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:block text-white/30 text-[11px] font-medium">{WINDOW}</span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-green-500/25 bg-green-500/8">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-[10px] font-bold uppercase tracking-widest">Ao Vivo</span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-12">

        {/* ── HERO ── */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/8 bg-white/3 text-[11px] text-white/40 mb-6 tracking-wide">
            🇧🇷 quinzena de {WINDOW}
          </div>

          <h1 className="font-black tracking-tight leading-[0.92] mb-5">
            <span className="block text-4xl sm:text-6xl lg:text-7xl text-white/90">10 trends que estão</span>
            <span
              className="block text-5xl sm:text-7xl lg:text-8xl"
              style={{
                background: 'linear-gradient(90deg, #22c55e 0%, #16a34a 30%, #f97316 70%, #ef4444 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              bombando agora
            </span>
          </h1>

          <p className="text-white/40 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Curadoria com dados reais — posts verificados, volume de replicação medido, nível de saturação mapeado.
            Só trends emergentes e crescendo. Nada já saturado.
          </p>
        </div>

        {/* ── STATS ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {([
            ['📡', '10', 'trends na quinzena'],
            ['🔥', String(fireCount), 'em chamas agora'],
            ['🌱', String(emerCount), 'emergentes hoje'],
            ['📈', String(TRENDS.length - emerCount), 'crescendo'],
          ] as const).map(([icon, val, label]) => (
            <div
              key={label}
              className="rounded-2xl border border-white/6 p-4"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <div className="text-xl mb-1.5">{icon}</div>
              <div className="text-white font-black text-2xl leading-none">{val}</div>
              <div className="text-white/30 text-[11px] mt-1 tracking-wide">{label}</div>
            </div>
          ))}
        </div>

        {/* ── LEGENDA SATURAÇÃO ── */}
        <div className="flex flex-wrap gap-3 mb-6 p-4 rounded-2xl border border-white/6" style={{ background: 'rgba(255,255,255,0.015)' }}>
          <p className="text-white/30 text-[11px] uppercase tracking-widest self-center font-semibold w-full sm:w-auto">Saturação:</p>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-emerald-500/25 bg-emerald-500/8">
            <span className="text-xs">🌱</span>
            <span className="text-emerald-400 text-[11px] font-bold uppercase tracking-wider">Emergente</span>
            <span className="text-emerald-400/40 text-[10px]">— apareceu agora, janela aberta</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-orange-500/25 bg-orange-500/8">
            <span className="text-xs">📈</span>
            <span className="text-orange-400 text-[11px] font-bold uppercase tracking-wider">Crescendo</span>
            <span className="text-orange-400/40 text-[10px]">— em alta, pico ainda à vista</span>
          </div>
        </div>

        {/* ── FILTROS ── */}
        <div className="flex flex-wrap gap-1.5 mb-8">
          <button
            onClick={() => { setCat(null); setPlat(null); setSat(null) }}
            className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all ${
              !cat && !plat && !sat
                ? 'bg-white text-black border-white'
                : 'border-white/10 text-white/35 hover:text-white/70 hover:border-white/20'
            }`}
          >
            Tudo
          </button>

          <span className="self-stretch w-px bg-white/6 hidden sm:block mx-1" />

          {ALL_SATS.map(s => {
            const sc = SAT_CONFIG[s]
            return (
              <button
                key={s}
                onClick={() => setSat(sat === s ? null : s)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all ${
                  sat === s ? `${sc.bg} ${sc.text} ${sc.border}` : 'border-white/10 text-white/35 hover:text-white/70 hover:border-white/20'
                }`}
              >
                {sc.icon} {sc.label.charAt(0) + sc.label.slice(1).toLowerCase()}
              </button>
            )
          })}

          <span className="self-stretch w-px bg-white/6 hidden sm:block mx-1" />

          {ALL_CATS.map(c => {
            const cs = CAT_STYLE[c]
            return (
              <button
                key={c}
                onClick={() => setCat(cat === c ? null : c)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all ${
                  cat === c ? `${cs.bg} ${cs.text} ${cs.border}` : 'border-white/10 text-white/35 hover:text-white/70 hover:border-white/20'
                }`}
              >
                {c}
              </button>
            )
          })}

          <span className="self-stretch w-px bg-white/6 hidden sm:block mx-1" />

          {ALL_PLATS.map(p => (
            <button
              key={p}
              onClick={() => setPlat(plat === p ? null : p)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all ${
                plat === p ? 'bg-white/10 text-white border-white/25' : 'border-white/10 text-white/35 hover:text-white/70 hover:border-white/20'
              }`}
            >
              {PLAT_ICON[p]} {p}
            </button>
          ))}
        </div>

        {/* ── TREND CARDS ── */}
        <div className="space-y-2">
          {visible.map(t => {
            const sc  = SAT_CONFIG[t.saturation]
            const cs  = CAT_STYLE[t.category]
            const isOpen = open === t.rank
            const accentColor = t.saturation === 'emergente' ? '#10b981' : '#f97316'

            return (
              <div
                key={t.rank}
                className="rounded-2xl border overflow-hidden transition-all duration-300"
                style={{
                  borderColor: t.fire ? 'rgba(239,68,68,0.22)' : 'rgba(255,255,255,0.07)',
                  background: t.fire
                    ? 'linear-gradient(135deg, rgba(239,68,68,0.04) 0%, rgba(255,255,255,0.02) 100%)'
                    : 'rgba(255,255,255,0.02)',
                  boxShadow: isOpen ? `0 0 40px ${sc.glow}` : 'none',
                }}
              >
                {/* Card header — always visible */}
                <button
                  onClick={() => setOpen(isOpen ? null : t.rank)}
                  className="w-full text-left"
                >
                  <div className="flex items-stretch gap-0">
                    {/* Accent bar */}
                    <div
                      className="w-0.5 shrink-0 rounded-l-2xl"
                      style={{ background: accentColor, opacity: isOpen ? 1 : 0.4 }}
                    />

                    <div className="flex-1 flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4">
                      {/* Rank */}
                      <div
                        className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm"
                        style={{
                          background: t.rank <= 3
                            ? `${accentColor}22`
                            : 'rgba(255,255,255,0.04)',
                          color: t.rank <= 3 ? accentColor : 'rgba(255,255,255,0.3)',
                          border: `1px solid ${t.rank <= 3 ? accentColor + '30' : 'rgba(255,255,255,0.07)'}`,
                        }}
                      >
                        {t.rank}
                      </div>

                      {/* Main content */}
                      <div className="flex-1 min-w-0">
                        {/* Badges row */}
                        <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                          {/* Saturation badge */}
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black border uppercase tracking-wider ${sc.bg} ${sc.text} ${sc.border}`}
                          >
                            {sc.icon} {sc.label}
                          </span>

                          {/* Category */}
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${cs.bg} ${cs.text} ${cs.border}`}>
                            {t.category}
                          </span>

                          {/* Fire badge */}
                          {t.fire && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-red-500/15 text-red-400 border border-red-500/20 animate-pulse">
                              🔥 Em Chamas
                            </span>
                          )}

                          {/* Platforms */}
                          {t.platforms.map(p => (
                            <span key={p} className="text-white/25 text-[10px]">{PLAT_ICON[p]}</span>
                          ))}
                        </div>

                        {/* Title */}
                        <h2 className="text-white font-bold text-sm sm:text-[15px] leading-snug line-clamp-1 mb-0.5">
                          {t.title}
                        </h2>
                        <p className="text-white/35 text-[11px] sm:text-xs line-clamp-1">{t.subtitle}</p>
                      </div>

                      {/* Right side — heat + replications */}
                      <div className="shrink-0 hidden sm:flex flex-col items-end gap-1.5">
                        <HeatBar v={t.heat} />
                        <span className="text-white/30 text-[10px] font-medium">{t.replications}</span>
                      </div>

                      {/* Chevron */}
                      <span
                        className="shrink-0 text-white/20 text-xs transition-transform duration-300"
                        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      >
                        ▼
                      </span>
                    </div>
                  </div>
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div className="border-t border-white/6 px-4 sm:px-5 pb-5 pt-4 space-y-4">
                    {/* Mobile heat + replications */}
                    <div className="flex sm:hidden items-center justify-between">
                      <HeatBar v={t.heat} />
                      <span className="text-white/30 text-[11px]">{t.replications}</span>
                    </div>

                    {/* Creators */}
                    <div>
                      <p className="text-white/25 text-[10px] uppercase tracking-widest mb-2 font-semibold">
                        Principais criadores usando
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {t.creators.map(c => (
                          <a
                            key={c.handle}
                            href={c.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-white/10 bg-white/3 text-white/55 text-[11px] font-semibold hover:border-white/25 hover:text-white/80 transition-all"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ background: accentColor }}
                            />
                            {c.name}
                            <span className="text-white/25 font-normal">{c.handle}</span>
                            <span className="text-white/20">↗</span>
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-white/55 text-sm leading-relaxed">{t.description}</p>

                    {/* Insight + Opportunity */}
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      <div
                        className="rounded-xl p-4 border border-sky-500/15"
                        style={{ background: 'rgba(14,165,233,0.04)' }}
                      >
                        <p className="text-sky-400 text-[10px] font-black uppercase tracking-widest mb-2">
                          💡 Insight estratégico
                        </p>
                        <p className="text-sky-100/65 text-[13px] leading-relaxed">{t.insight}</p>
                      </div>
                      <div
                        className="rounded-xl p-4 border border-green-500/15"
                        style={{ background: 'rgba(34,197,94,0.04)' }}
                      >
                        <p className="text-green-400 text-[10px] font-black uppercase tracking-widest mb-2">
                          🎯 Aplicação para marcas
                        </p>
                        <p className="text-green-100/65 text-[13px] leading-relaxed">{t.opportunity}</p>
                      </div>
                    </div>

                    {/* Tags + Links */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <div className="flex flex-wrap gap-1.5">
                        {t.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded text-[10px] text-white/25 border border-white/6"
                            style={{ background: 'rgba(255,255,255,0.02)' }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        {t.coverageLink !== t.originalPostLink && (
                          <a
                            href={t.coverageLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold text-white/45 border border-white/8 hover:border-white/20 hover:text-white/70 transition-all"
                          >
                            Ver cobertura ↗
                          </a>
                        )}
                        <a
                          href={t.originalPostLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-black text-white hover:opacity-80 transition-opacity"
                          style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)` }}
                        >
                          {t.linkLabel} ↗
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {visible.length === 0 && (
            <div className="text-center py-24">
              <p className="text-white/20 text-sm">Nenhuma trend com esse filtro.</p>
              <p className="text-white/10 text-xs mt-1">
                (só trends não-saturadas chegam aqui — o filtro é exigente)
              </p>
            </div>
          )}
        </div>

        {/* ── FOOTER ── */}
        <footer className="mt-20 pt-10 border-t border-white/5 text-center space-y-2">
          <p className="text-white/30 text-sm font-semibold">Smart Trend Radar</p>
          <p className="text-white/15 text-xs">
            Quinzena {WINDOW} · Dados verificados via posts originais e cobertura jornalística
          </p>
          <p className="text-white/10 text-[11px] italic">
            por trás de cada trend há um jovem triste tentando fazer seu cliente feliz
          </p>
        </footer>
      </main>
    </div>
  )
}
