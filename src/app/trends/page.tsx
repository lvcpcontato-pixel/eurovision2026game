'use client'

import { useState } from 'react'

const WEEK = 'Semana de 19–23 mai 2026'

type Platform = 'TikTok' | 'Instagram' | 'X'
type Category = 'Polêmica' | 'Música' | 'Dança' | 'Meme' | 'Nostalgia' | 'Esportes' | 'Games'

interface Trend {
  rank: number
  title: string
  subtitle: string
  category: Category
  platforms: Platform[]
  heat: number
  reach: string
  description: string
  insight: string
  opportunity: string
  link: string
  linkLabel: string
  tags: string[]
  fire: boolean
}

const TRENDS: Trend[] = [
  {
    rank: 1,
    title: 'Deolane Bezerra presa',
    subtitle: 'Operação Vérnix — 21 mai 2026',
    category: 'Polêmica',
    platforms: ['X', 'Instagram', 'TikTok'],
    heat: 10,
    reach: '+280M impressões',
    description: 'A influenciadora com 21 milhões de seguidores foi presa em SP pela Polícia Civil numa operação contra lavagem de dinheiro ligada ao PCC. R$ 27M bloqueados. A internet parou.',
    insight: 'Evento de timing imprevisível que congela toda a atenção. Marcas devem PAUSAR comunicação de entretenimento por 24-48h para não soar insensível — e monitorar o desdobramento.',
    opportunity: 'Reactive content cuidadoso sobre valores de integridade, propósito e saúde mental. Janela para marcas com posicionamento ético reforçarem seus valores com autenticidade.',
    link: 'https://agenciabrasil.ebc.com.br/justica/noticia/2026-05/influenciadora-deolane-bezerra-e-presa-em-acao-da-policia-civil-de-sp',
    linkLabel: 'Ver notícia — Agência Brasil',
    tags: ['#Deolane', '#OperaçãoVérnix', '#PCC'],
    fire: true,
  },
  {
    rank: 2,
    title: 'Virgínia + Vini Jr. — polêmica do macaco',
    subtitle: 'Término + vídeo acusado de racismo',
    category: 'Polêmica',
    platforms: ['X', 'Instagram', 'TikTok'],
    heat: 10,
    reach: '+200M impressões',
    description: 'Após o término com Vini Jr., Virgínia publicou um vídeo beijando um macaco em Dubai. A internet interpretou como indireta racista ao jogador. Anitta, Whindersson e dezenas de famosos se manifestaram.',
    insight: 'Dupla narrativa: debate sobre racismo estrutural + dinâmicas de relacionamento público. Extremamente polarizador — exige que marcas tomem posição com clareza ou fiquem em silêncio estratégico.',
    opportunity: 'Marcas com histórico de combate ao racismo têm oportunidade de reafirmar posicionamento de forma direta e genuína, não como oportunismo.',
    link: 'https://www.cnnbrasil.com.br/entretenimento/famosos-criticam-virginia-apos-polemica-de-racismo-com-vini-jr/',
    linkLabel: 'Ver cobertura — CNN Brasil',
    tags: ['#Virgínia', '#ViniJr', '#Racismo'],
    fire: true,
  },
  {
    rank: 3,
    title: '"2026 é o novo 2016"',
    subtitle: 'A trend nostálgica que dominou o mês',
    category: 'Nostalgia',
    platforms: ['Instagram', 'TikTok', 'X'],
    heat: 9,
    reach: '+25k posts · Maisa 1M curtidas',
    description: 'Criadores e celebridades resgatam fotos, filtros e estética de 2016. Antes e depois com palmeiras, pose de paz com os dedos e filtro "Rio de Janeiro" do Instagram. Viih Tube, Maisa, Kylie Jenner e Dua Lipa aderiram.',
    insight: 'Trend de baixíssima barreira de produção e alto engajamento emocional. O passado vira conteúdo de marca sem esforço — e ressoa profundamente com millennials de 26-35 anos.',
    opportunity: 'Marcas consolidadas podem fazer "brand nostalgia" mostrando como evoluíram desde 2016. Altíssimo potencial de UGC espontâneo e reshare.',
    link: 'https://www.itatiaia.com.br/trends/2026-e-o-novo-2016-conheca-a-trend-nostalgica-que-dominou-a-web/',
    linkLabel: 'Ver trend — Itatiaia',
    tags: ['#2016EhONovo2026', '#Nostalgia', '#BeforeAndAfter'],
    fire: true,
  },
  {
    rank: 4,
    title: 'Whindersson: "Gastei R$40M em drogas"',
    subtitle: '"Falei essa merda mesmo" — meme do mês',
    category: 'Meme',
    platforms: ['X', 'TikTok'],
    heat: 8,
    reach: '+80M impressões',
    description: 'No programa Hotel Mazzafera, Whindersson revelou ter gastado toda uma fortuna em drogas. A internet explodiu, ele retrocedeu e virou meme: "Falei essa merda mesmo". Suas explicações viraram material de humor.',
    insight: 'Whindersson é um termômetro da cultura brasileira. A naturalidade com que ele trata vulnerabilidade gera conexão imediata — e a frase se tornou template de autoconsciência hilária.',
    opportunity: 'Meme "falei essa merda mesmo" como template para marcas que queiram se autocorrigir com humor. Funciona bem em contextos de product fail ou atualização de posição.',
    link: 'https://www.marciapiovesan.com.br/internet/whindersson-nunes-revela-ter-gastado-fortuna-com-drogas-e-reage-apos-polemica-falei-essa-merda-mesmo.phtml',
    linkLabel: 'Ver polêmica completa',
    tags: ['#Whindersson', '#FaleiEssaMerda', '#HotelMazzafera'],
    fire: false,
  },
  {
    rank: 5,
    title: 'Shakira em Copacabana + Bruna Marquezine',
    subtitle: 'Show gratuito + celebridade no varanda viral',
    category: 'Música',
    platforms: ['Instagram', 'TikTok'],
    heat: 8,
    reach: '+150M visualizações',
    description: 'O show gratuito de Shakira em Copacabana reuniu multidões e foi transmitido pela Globo. Bruna Marquezine apareceu na varanda do Copacabana Palace de vestido branco e levou a plateia ao delírio — os vídeos viralizaram imediatamente.',
    insight: 'Shakira + praia + Bruna = cartão postal do Brasil moderno. Fortíssimo em turismo, moda, beleza e lifestyle. Bruna Marquezine é um ativo de brand da nova geração brasileira.',
    opportunity: 'Associação ao contexto do show para marcas de lifestyle e turismo. Conteúdo "carioca" com sotaque internacional ressoa muito além do Rio.',
    link: 'https://www.purepeople.com.br/midia/bruna-marquezine-da-close-no-copacabana-palace-para-show-de-shakira-e-leva-publico-ao-delirio-com-vestido-branco-curtinho_m4756130',
    linkLabel: 'Ver momento viral — Purepeople',
    tags: ['#Shakira', '#Copacabana', '#BrunaMarquezine'],
    fire: false,
  },
  {
    rank: 6,
    title: 'Algoritmo do Amor',
    subtitle: 'Anitta feat. Pedro Sampaio — coreografia 500M views',
    category: 'Dança',
    platforms: ['TikTok', 'Instagram'],
    heat: 8,
    reach: '+500M views de coreografia',
    description: 'A música mais tocada do mês no Brasil. A fusão funk + pop eletrônico de Anitta com Pedro Sampaio se tornou trilha do TikTok. Coreografia de fácil replicação gerou onda de duetos e versões criativas.',
    insight: 'Anitta é uma máquina de trends — qualquer audio dela vira plataforma para creators de todos os nichos. O áudio "Algoritmo do Amor" já aparece em conteúdo de moda, food, pets e lifestyle.',
    opportunity: 'Usar o áudio como pano de fundo para product reveals e transições. Alta taxa de retenção. Brand collabs com creators que já estão usando o som.',
    link: 'https://www.tiktok.com/discover/algoritmo-do-amor-anitta',
    linkLabel: 'Ver trend no TikTok',
    tags: ['#AlgoritmoDoAmor', '#Anitta', '#PedroSampaio'],
    fire: false,
  },
  {
    rank: 7,
    title: 'Desafio dos 5 Segundos',
    subtitle: 'MC Livinho — 2M+ vídeos criados no TikTok',
    category: 'Dança',
    platforms: ['TikTok'],
    heat: 7,
    reach: '+2M vídeos criados',
    description: 'O desafio mais democrático do TikTok este mês: faça algo impressionante em 5 segundos no ritmo do beat de MC Livinho. Funciona para qualquer nicho — de chefs a academias, passando por pets e crianças.',
    insight: 'Template universal de altíssimo aproveitamento. A mecânica de "5 segundos" se adapta a qualquer briefing de produto ou serviço. Engajamento proporcional à criatividade.',
    opportunity: 'Product reveal em 5 segundos, antes/depois relâmpago, ou funcionário/brand doing something impressive. ROI alto com produção simples.',
    link: 'https://www.tiktok.com/discover/desafio-dos-5-segundos-mc-livinho',
    linkLabel: 'Ver desafio no TikTok',
    tags: ['#Desafiodos5Segundos', '#MCLivinho', '#TikTokChallenge'],
    fire: false,
  },
  {
    rank: 8,
    title: '#LOLFanFest2026',
    subtitle: '1º dia trending no X Brasil — 23 mai',
    category: 'Games',
    platforms: ['X'],
    heat: 7,
    reach: 'Top 1 trending X Brasil',
    description: 'O primeiro dia do League of Legends Fan Fest 2026 tomou conta do X com dezenas de milhares de tweets em tempo real. A comunidade de gaming no Brasil está entre as mais ativas do mundo.',
    insight: 'Gaming saiu do nicho para o mainstream. A geração 18-35 que joga LoL tem alto poder de compra e altíssima fidelidade às marcas que respeitam sua cultura.',
    opportunity: 'Reactive content e patrocínio de live: baixo custo com alto impacto nessa comunidade. Marcas fora do universo gamer têm janela única de entrada sem concorrência saturada.',
    link: 'https://x.com/search?q=%23LOLFanFest2026',
    linkLabel: 'Ver trending no X',
    tags: ['#LOLFanFest2026', '#LeagueOfLegends', '#Esports'],
    fire: false,
  },
  {
    rank: 9,
    title: 'Guiana Brasileira',
    subtitle: 'Quando a internet decidiu que Portugal é estado do Brasil',
    category: 'Meme',
    platforms: ['TikTok', 'X'],
    heat: 7,
    reach: '+75M impressões',
    description: 'Brasileiros começaram a tratar Portugal como um estado brasileiro — usando linguagem de bairrismo, mapas e até "notícias locais". Influenciadores portugueses reagiram e a trend cruzou fronteiras.',
    insight: 'Meme de identidade nacional com forte apelo de pertencimento e leveza. Raramente um meme gera tanto engajamento binacional espontâneo — e com baixíssima toxicidade.',
    opportunity: 'Marcas com presença bilateral ou conexão lusófona têm oportunidade de entrar na brincadeira. Alto potencial de reshare orgânico em PT-BR e PT-PT.',
    link: 'https://www.tiktok.com/discover/guiana-brasileira-portugal-meme',
    linkLabel: 'Ver trend no TikTok',
    tags: ['#GuianaBrasileira', '#Portugal', '#MemeBrasileiro'],
    fire: false,
  },
  {
    rank: 10,
    title: 'Meme "Six Seven" (6-7)',
    subtitle: 'O grito do garoto + Doot Doot = hit do TikTok',
    category: 'Meme',
    platforms: ['TikTok', 'X', 'Instagram'],
    heat: 6,
    reach: '+120M impressões globais',
    description: 'Um garoto de 12 anos viralizou gritando "SIX SEVEN!" numa quadra de basquete. Editado com o beat "Doot Doot", o corte tomou conta do TikTok mundial — e o Brasil abraçou fortemente como template de celebração.',
    insight: 'Meme de celebração espontânea e sem toxicidade. Alta versatilidade: funciona para resultados acima da expectativa, conquistas, marcos e surpresas positivas.',
    opportunity: 'Posts de resultados de campanha, metas batidas ou lançamentos bem-sucedidos. Humor leve e altamente compartilhável, sem risco de backlash.',
    link: 'https://www.tiktok.com/discover/6-7-six-seven-meme-viral',
    linkLabel: 'Ver meme no TikTok',
    tags: ['#SixSeven', '#67', '#DootDoot'],
    fire: false,
  },
]

const CAT_STYLE: Record<Category, { bg: string; text: string; border: string }> = {
  Polêmica: { bg: 'bg-red-500/15',    text: 'text-red-400',    border: 'border-red-500/30'    },
  Música:   { bg: 'bg-orange-500/15', text: 'text-orange-400', border: 'border-orange-500/30' },
  Dança:    { bg: 'bg-purple-500/15', text: 'text-purple-400', border: 'border-purple-500/30' },
  Meme:     { bg: 'bg-yellow-500/15', text: 'text-yellow-400', border: 'border-yellow-500/30' },
  Nostalgia:{ bg: 'bg-pink-500/15',   text: 'text-pink-400',   border: 'border-pink-500/30'   },
  Esportes: { bg: 'bg-blue-500/15',   text: 'text-blue-400',   border: 'border-blue-500/30'   },
  Games:    { bg: 'bg-cyan-500/15',   text: 'text-cyan-400',   border: 'border-cyan-500/30'   },
}

const PLAT_STYLE: Record<Platform, { bg: string; text: string; icon: string }> = {
  TikTok:    { bg: 'bg-white/8',       text: 'text-white/80',  icon: '♪' },
  Instagram: { bg: 'bg-pink-600/20',   text: 'text-pink-300',  icon: '◈' },
  X:         { bg: 'bg-slate-600/30',  text: 'text-slate-300', icon: '✕' },
}

const ALL_CATS: Category[] = ['Polêmica', 'Música', 'Dança', 'Meme', 'Nostalgia', 'Esportes', 'Games']
const ALL_PLATS: Platform[] = ['TikTok', 'Instagram', 'X']

function HeatBar({ v }: { v: number }) {
  const color = v >= 9 ? '#ef4444' : v >= 7 ? '#f97316' : '#eab308'
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="h-1.5 w-1.5 rounded-sm"
          style={{ background: i < v ? color : 'rgba(255,255,255,0.1)' }}
        />
      ))}
      <span className="ml-1 text-[11px] font-bold" style={{ color }}>{v}/10</span>
    </div>
  )
}

export default function TrendsDashboard() {
  const [cat, setCat] = useState<Category | null>(null)
  const [plat, setPlat] = useState<Platform | null>(null)
  const [open, setOpen] = useState<number | null>(null)

  const visible = TRENDS.filter(t => {
    if (cat && t.category !== cat) return false
    if (plat && !t.platforms.includes(plat)) return false
    return true
  })

  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(160deg,#050510 0%,#0c0c1e 60%,#060612 100%)' }}>

      {/* ─── HEADER ─── */}
      <header className="sticky top-0 z-40 border-b border-white/5 backdrop-blur-2xl" style={{ background: 'rgba(5,5,16,0.88)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black select-none" style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)' }}>S</div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-black text-white text-base tracking-tight">Smart</span>
                <span className="text-white/25 font-light">·</span>
                <span className="text-white/55 text-xs font-semibold tracking-wide uppercase">Trend Radar</span>
              </div>
              <p className="text-white/25 text-[10px] leading-none hidden sm:block">Inteligência de tendências para comunicação estratégica</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <span className="hidden sm:block text-white/35 text-xs">{WEEK}</span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-green-500/30 bg-green-500/8">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-[10px] font-bold uppercase tracking-wider">AO VIVO</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* ─── HERO ─── */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/4 text-[11px] text-white/45 mb-5">
            🇧🇷 Internet brasileira &nbsp;·&nbsp; {WEEK}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none mb-4">
            10 trends que estão{' '}
            <span className="inline-block" style={{ background: 'linear-gradient(90deg,#22c55e 0%,#06b6d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              bombando agora
            </span>
          </h1>
          <p className="text-white/45 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Curadoria semanal com dados reais das maiores tendências virais para transformar em oportunidades de comunicação.
          </p>
        </div>

        {/* ─── STATS ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {([
            ['📡', '+1.6B', 'alcance total estimado'],
            ['🔥', '3', 'trends em chamas'],
            ['📲', '3 plats.', 'TikTok · IG · X'],
            ['🔄', '23 mai', 'última atualização'],
          ] as const).map(([icon, val, label]) => (
            <div key={label} className="rounded-2xl border border-white/7 p-4" style={{ background: 'rgba(255,255,255,0.025)' }}>
              <div className="text-2xl mb-1">{icon}</div>
              <div className="text-white font-bold text-xl leading-tight">{val}</div>
              <div className="text-white/35 text-xs mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* ─── FILTERS ─── */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button onClick={() => setCat(null)} className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${cat === null ? 'bg-white text-black border-white' : 'border-white/12 text-white/45 hover:text-white hover:border-white/25'}`}>
            Todas
          </button>
          {ALL_CATS.map(c => {
            const s = CAT_STYLE[c]
            return (
              <button key={c} onClick={() => setCat(cat === c ? null : c)} className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${cat === c ? `${s.bg} ${s.text} ${s.border}` : 'border-white/12 text-white/45 hover:text-white hover:border-white/25'}`}>
                {c}
              </button>
            )
          })}
          <div className="w-px bg-white/8 self-stretch mx-1 hidden sm:block" />
          {ALL_PLATS.map(p => {
            const s = PLAT_STYLE[p]
            return (
              <button key={p} onClick={() => setPlat(plat === p ? null : p)} className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${plat === p ? 'bg-white/12 text-white border-white/35' : 'border-white/12 text-white/45 hover:text-white hover:border-white/25'}`}>
                {s.icon} {p}
              </button>
            )
          })}
        </div>

        {/* ─── TREND CARDS ─── */}
        <div className="space-y-2.5">
          {visible.map(t => {
            const cs = CAT_STYLE[t.category]
            const isOpen = open === t.rank
            return (
              <div key={t.rank} className="rounded-2xl border overflow-hidden transition-all duration-200" style={{ borderColor: t.fire ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.07)', background: t.fire ? 'rgba(239,68,68,0.03)' : 'rgba(255,255,255,0.022)' }}>

                {/* Collapsed row */}
                <button onClick={() => setOpen(isOpen ? null : t.rank)} className="w-full text-left">
                  <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5">

                    {/* Rank badge */}
                    <div className={`flex-none w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm ${t.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' : t.rank <= 3 ? 'bg-white/10 text-white' : 'bg-white/5 text-white/35'}`}>
                      {t.rank}
                    </div>

                    {/* Main info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${cs.bg} ${cs.text} ${cs.border}`}>{t.category}</span>
                        {t.fire && <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-500/20 text-red-400 border border-red-500/25 animate-pulse">🔥 Em Chamas</span>}
                        {t.platforms.map(p => {
                          const ps = PLAT_STYLE[p]
                          return <span key={p} className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${ps.bg} ${ps.text}`}>{ps.icon} {p}</span>
                        })}
                      </div>
                      <h2 className="text-white font-bold text-sm sm:text-base leading-snug line-clamp-1">{t.title}</h2>
                      <p className="text-white/40 text-xs sm:text-sm line-clamp-1">{t.subtitle}</p>
                    </div>

                    {/* Right col */}
                    <div className="flex-none flex-col items-end gap-1.5 hidden sm:flex">
                      <HeatBar v={t.heat} />
                      <span className="text-white/30 text-[11px]">{t.reach}</span>
                    </div>

                    <span className={`flex-none text-white/25 text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                  </div>
                </button>

                {/* Expanded detail */}
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 border-t border-white/5 pt-4 space-y-4">

                    {/* Mobile heat */}
                    <div className="flex sm:hidden items-center justify-between">
                      <HeatBar v={t.heat} />
                      <span className="text-white/30 text-[11px]">{t.reach}</span>
                    </div>

                    <p className="text-white/60 text-sm leading-relaxed">{t.description}</p>

                    <div className="grid sm:grid-cols-2 gap-2.5">
                      <div className="rounded-xl p-4 border border-cyan-500/15" style={{ background: 'rgba(6,182,212,0.05)' }}>
                        <p className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-2">💡 Insight estratégico</p>
                        <p className="text-cyan-100/75 text-sm leading-relaxed">{t.insight}</p>
                      </div>
                      <div className="rounded-xl p-4 border border-green-500/15" style={{ background: 'rgba(34,197,94,0.05)' }}>
                        <p className="text-green-400 text-[10px] font-bold uppercase tracking-widest mb-2">🎯 Oportunidade de marca</p>
                        <p className="text-green-100/75 text-sm leading-relaxed">{t.opportunity}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <div className="flex flex-wrap gap-1.5">
                        {t.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 rounded text-[11px] text-white/35 bg-white/4 border border-white/7">{tag}</span>
                        ))}
                      </div>
                      <a
                        href={t.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-opacity hover:opacity-80"
                        style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)' }}
                      >
                        {t.linkLabel} ↗
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {visible.length === 0 && (
            <p className="text-center py-20 text-white/25 text-sm">Nenhuma trend com esse filtro.</p>
          )}
        </div>

        {/* ─── FOOTER ─── */}
        <footer className="mt-16 pt-8 border-t border-white/6 text-center space-y-1.5">
          <p className="text-white/35 text-sm">
            <span className="font-bold text-white/55">Smart Trend Radar</span> — Curadoria estratégica de tendências virais brasileiras
          </p>
          <p className="text-white/20 text-xs">
            Dados consolidados de TikTok, Instagram e X (Twitter) · {WEEK} · Atualizado em 23/05/2026
          </p>
          <p className="text-white/15 text-xs">
            Powered by Smart · Ferramenta interna de inteligência cultural
          </p>
        </footer>
      </main>
    </div>
  )
}
