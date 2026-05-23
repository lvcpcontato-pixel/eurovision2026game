'use client'

import { useState } from 'react'

const WEEK = 'Semana de 19–23 mai 2026'

type Platform = 'TikTok' | 'Instagram' | 'X'
type Category = 'Polêmica' | 'Música' | 'Meme' | 'Absurdo' | 'Nostalgia' | 'Política' | 'Cultura'
type Source = 'Saquinho de Lixo' | 'Greengo Dictionary' | 'Melted Videos' | 'Mainstream' | 'Todos'

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
  source: Source
  sourceHandle: string
  sourceLink: string
}

const TRENDS: Trend[] = [
  {
    rank: 1,
    title: 'Cachorro da raça "Me Tira Daqui"',
    subtitle: '@saquinhodelixo — Reels viral',
    category: 'Absurdo',
    platforms: ['Instagram'],
    heat: 10,
    reach: '+2M impressões',
    description: 'Saquinho de Lixo postou uma raça de cachorro chamada "me tira daqui". Um nome. Uma sentença. Um país inteiro se identificou. A trend virou template: nomear qualquer coisa (planta, roupa, sentimento) com a frase que descreve exatamente como você se sente.',
    insight: 'O humor de identificação coletiva é o mais poderoso do Brasil digital. Quando a internet se vê num cachorro com nome de estado emocional, o conteúdo já se distribuiu sozinho. Nenhum orçamento de mídia replica isso.',
    opportunity: 'Marca pode "nomear" produtos com humor honesto sobre seu uso real. Ex: hidratante da raça "só lembro quando já tá acabando". Baixíssima produção, altíssima identificação.',
    link: 'https://www.instagram.com/reel/DL-1t6TSxbh/',
    linkLabel: 'Ver Reel — @saquinhodelixo',
    tags: ['#MeTiraDaqui', '#SaquinhoDeLixo', '#MemeDeIdentificação'],
    fire: true,
    source: 'Saquinho de Lixo',
    sourceHandle: '@saquinhodelixo',
    sourceLink: 'https://www.instagram.com/saquinhodelixo/',
  },
  {
    rank: 2,
    title: 'O little banana não dorme',
    subtitle: '@greengodictionary — TikTok viral',
    category: 'Absurdo',
    platforms: ['TikTok', 'Instagram'],
    heat: 10,
    reach: '+180M views',
    description: 'Greengo Dictionary lançou "hoje o little banana não dorme" e a internet brasileira imediatamente entendeu. O "little banana" (bananinha) virou personagem da ansiedade noturna — aquele ser que fica acordado às 3h repassando conversas de 2017.',
    insight: 'O formato Greengo Dictionary — tradução literal absurda de expressão brasileira — virou um universo de personagens. O "little banana" é o mais recente e mais adorado. Humor sobre ansiedade que não é sombrio, é acolhedor.',
    opportunity: 'Marcas de bem-estar, saúde mental, apps de sono ou até e-commerce de pijamas têm uma entrada natural e autêntica. Conteúdo noturno + este personagem = combinação improvável que funciona.',
    link: 'https://www.tiktok.com/@greengodictionary/video/7558467135702371595',
    linkLabel: 'Ver TikTok — @greengodictionary',
    tags: ['#LittleBanana', '#GreenGoDictionary', '#AnxiedadeNoturna'],
    fire: true,
    source: 'Greengo Dictionary',
    sourceHandle: '@greengodictionary',
    sourceLink: 'https://www.tiktok.com/@greengodictionary',
  },
  {
    rank: 3,
    title: 'Deolane presa — a internet de plantão',
    subtitle: 'Operação Vérnix — 21 mai 2026',
    category: 'Polêmica',
    platforms: ['X', 'Instagram', 'TikTok'],
    heat: 10,
    reach: '+280M impressões',
    description: 'Influenciadora com 21 milhões de seguidores presa em SP numa operação contra lavagem de dinheiro ligada ao PCC. R$27M bloqueados. Melted Videos e Saquinho reagiram com memes que misturavam horror e humor ácido — o formato clássico de quando a realidade é absurda demais.',
    insight: 'Quando Melted Videos e Saquinho de Lixo fazem meme de algo, esse algo já atravessou o mainstream e entrou na camada mais profunda da cultura digital. Este evento está nessa categoria.',
    opportunity: 'Marcas devem pausar entretenimento por 48h. Depois: janela para marcas com posicionamento ético genuíno. Não oportunismo — reafirmação de valores já construídos.',
    link: 'https://agenciabrasil.ebc.com.br/justica/noticia/2026-05/influenciadora-deolane-bezerra-e-presa-em-acao-da-policia-civil-de-sp',
    linkLabel: 'Ver notícia — Agência Brasil',
    tags: ['#Deolane', '#OperaçãoVérnix', '#InternetDeUrgência'],
    fire: true,
    source: 'Todos',
    sourceHandle: '@meltedvideos / @saquinhodelixo',
    sourceLink: 'https://www.instagram.com/saquinhodelixo/',
  },
  {
    rank: 4,
    title: 'Whindersson: "Falei essa merda mesmo"',
    subtitle: 'Hotel Mazzafera → meme de autoconsciência',
    category: 'Meme',
    platforms: ['X', 'TikTok'],
    heat: 8,
    reach: '+80M impressões',
    description: 'Whindersson revelou ter gastado R$40M em drogas no Hotel Mazzafera. Depois assistiu às notícias, reconheceu o próprio exagero e disse "falei essa merda mesmo". Saquinho de Lixo transformou a frase em template universal de autoconsciência cômica.',
    insight: 'A frase "falei essa merda mesmo" é o ápice do formato Saquinho: vulnerabilidade + humor + total ausência de drama. Funciona porque admite o erro sem pedir desculpa performática.',
    opportunity: 'Template para marcas que querem mostrar autoconsciência com leveza. Também funciona para comunicados de mudança de produto/serviço: "a gente falou essa merda, mas melhorou".',
    link: 'https://www.marciapiovesan.com.br/internet/whindersson-nunes-revela-ter-gastado-fortuna-com-drogas-e-reage-apos-polemica-falei-essa-merda-mesmo.phtml',
    linkLabel: 'Ver polêmica completa',
    tags: ['#FaleiEssaMerda', '#Whindersson', '#AutoconsciênciaColetiva'],
    fire: false,
    source: 'Saquinho de Lixo',
    sourceHandle: '@saquinhodelixo',
    sourceLink: 'https://www.instagram.com/saquinhodelixo/',
  },
  {
    rank: 5,
    title: '"2026 é o novo 2016"',
    subtitle: 'A trend nostalgia que Saquinho sabia que ia bombar',
    category: 'Nostalgia',
    platforms: ['Instagram', 'TikTok', 'X'],
    heat: 9,
    reach: 'Maisa 1M curtidas · 25k posts',
    description: 'Resgatar fotos, filtros e sentimentos de 2016. Palmeiras. Pose de paz. Filtro "Rio de Janeiro" do Instagram. "Eu era feliz e não sabia." Saquinho de Lixo aderiu com o formato "semaninha leve" de sempre — e a internet explorou com saudade coletiva genuína.',
    insight: 'Nostalgia de uma época que parecia simples. Funciona porque 2016 representa o pré-pandemia, pré-crise, pré-muita coisa. É uma fuga emocional validada coletivamente — e Saquinho entende disso melhor que qualquer agência.',
    opportunity: '"Brand nostalgia" mostrando produto/marca em 2016 vs. hoje. Baixíssima barreira de produção. Altíssimo potencial de UGC — usuários criam por conta própria.',
    link: 'https://www.itatiaia.com.br/trends/2026-e-o-novo-2016-conheca-a-trend-nostalgica-que-dominou-a-web/',
    linkLabel: 'Ver trend — Itatiaia',
    tags: ['#2016EhONovo2026', '#Nostalgia', '#EraFelizENãoSabia'],
    fire: false,
    source: 'Saquinho de Lixo',
    sourceHandle: '@saquinhodelixo',
    sourceLink: 'https://www.instagram.com/saquinhodelixo/',
  },
  {
    rank: 6,
    title: 'Laranjão',
    subtitle: '@greengodictionary — absurdismo geopolítico brasileiro',
    category: 'Política',
    platforms: ['TikTok'],
    heat: 7,
    reach: '+45M views',
    description: 'Greengo Dictionary postou: "🇧🇷 laranjão, depois que tu cozinhar tu limpa os vidros e o fogão 🇨🇳". A relação Brasil-China transformada em meme doméstico absurdo. O país como cozinheiro que fez o trabalho pesado enquanto o sócio fica sentado.',
    insight: 'Greengo Dictionary consegue fazer política virar humor acessível sem simplificar demais. O "laranjão" não precisa de contexto — quem sabe, sabe; quem não sabe, ri mesmo assim. Alcance transversal.',
    opportunity: 'Marcas com posicionamento local/nacional podem usar o tom "laranjão" para reforçar orgulho brasileiro com ironia. Anti-colonialismo digital com humor.',
    link: 'https://www.tiktok.com/@greengodictionary/video/7492088544031247621',
    linkLabel: 'Ver TikTok — @greengodictionary',
    tags: ['#Laranjão', '#GreenGoDictionary', '#BrasilChina'],
    fire: false,
    source: 'Greengo Dictionary',
    sourceHandle: '@greengodictionary',
    sourceLink: 'https://www.tiktok.com/@greengodictionary',
  },
  {
    rank: 7,
    title: 'Exposição MEME no Br@sil',
    subtitle: 'CCBB BH — Greengo, Melted e Saquinho no museu',
    category: 'Cultura',
    platforms: ['Instagram', 'X'],
    heat: 7,
    reach: '+30M impressões',
    description: 'A exposição "MEME: no Br@sil da Memeficação" no CCBB Belo Horizonte reuniu Greengo Dictionary, Melted Videos, Saquinho de Lixo e outros criadores ao lado de artistas como Regina Silveira e Claudio Tozzi. Meme virou arte. Arte virou meme. A internet não soube bem o que fazer com isso.',
    insight: 'Quando a cultura underground entra no museu, ela legitima e ao mesmo tempo ameaça sua própria identidade. Mas para marcas, isso sinaliza: meme culture é linguagem permanente, não fase passageira.',
    opportunity: 'Marcas que investem em parceria com criadores de meme agora constroem capital cultural de longo prazo. É arte. É comunicação. É o patrimônio imaterial do Brasil digital.',
    link: 'https://en.artsoul.com.br/revista/eventos/exposicao-meme-no-br-at-sil-da-memeficacao',
    linkLabel: 'Ver exposição — CCBB BH',
    tags: ['#MemeBrasileiro', '#MemeArt', '#CCBBbh'],
    fire: false,
    source: 'Todos',
    sourceHandle: '@greengodictionary / @meltedvideos / @saquinhodelixo',
    sourceLink: 'https://en.artsoul.com.br/revista/eventos/exposicao-meme-no-br-at-sil-da-memeficacao',
  },
  {
    rank: 8,
    title: 'Virgínia + Vini Jr. — a internet julgou',
    subtitle: 'Término + vídeo acusado de racismo',
    category: 'Polêmica',
    platforms: ['X', 'Instagram', 'TikTok'],
    heat: 8,
    reach: '+200M impressões',
    description: 'Após o término com Vini Jr., Virgínia publicou vídeo beijando macaco em Dubai. A internet interpretou como racismo. Melted Videos respondeu com montagem ácida. Saquinho ficou em silêncio estratégico. O debate atravessou humor e chegou em território sério.',
    insight: 'Quando Melted Videos faz meme de polêmica racial, o termômetro já passou do ponto. Marcas devem observar, não participar — a menos que tenham histórico real de antirracismo.',
    opportunity: 'Marcas com histórico genuíno de combate ao racismo podem reafirmar posicionamento. Nunca oportunismo de momento — a audiência de meme percebe imediatamente.',
    link: 'https://www.cnnbrasil.com.br/entretenimento/famosos-criticam-virginia-apos-polemica-de-racismo-com-vini-jr/',
    linkLabel: 'Ver cobertura — CNN Brasil',
    tags: ['#Virgínia', '#ViniJr', '#DebateNecessário'],
    fire: false,
    source: 'Melted Videos',
    sourceHandle: '@meltedvideos',
    sourceLink: 'https://www.instagram.com/meltedvideos/',
  },
  {
    rank: 9,
    title: 'Guiana Brasileira',
    subtitle: 'Quando Portugal virou estado do Brasil na internet',
    category: 'Absurdo',
    platforms: ['TikTok', 'X'],
    heat: 7,
    reach: '+75M impressões',
    description: 'Brasileiros tratam Portugal como estado brasileiro — mapas, "notícias locais", gentílicos. É o formato Greengo Dictionary perfeito: absurdismo de identidade nacional sem agressão. Influenciadores portugueses reagiram. A trend cruzou o Atlântico.',
    insight: 'Greengo Dictionary vive desse humor: "você é muito brasileiro pra entender". É identidade como superpoder cômico. Marcas com presença lusófona têm janela única nessa narrativa.',
    opportunity: 'Conteúdo bilíngue/binacional com humor de bairrismo afetivo. Marcas de turismo, educação ou com presença em Portugal podem entrar na brincadeira com muita naturalidade.',
    link: 'https://www.tiktok.com/discover/guiana-brasileira-portugal-meme',
    linkLabel: 'Ver trend no TikTok',
    tags: ['#GuianaBrasileira', '#GreenGoDictionary', '#IdentidadeNacional'],
    fire: false,
    source: 'Greengo Dictionary',
    sourceHandle: '@greengodictionary',
    sourceLink: 'https://www.tiktok.com/@greengodictionary',
  },
  {
    rank: 10,
    title: '"No puedo estoy cansadito" — revival',
    subtitle: '@meltedvideos — o clássico que não morre',
    category: 'Meme',
    platforms: ['Instagram', 'X'],
    heat: 6,
    reach: '+40M impressões',
    description: 'O meme mais icônico de Melted Videos — boneco 3D exausto dizendo "no puedo estoy cansadito" — está em revival. Publicações semanais o ressignificam: trabalho de segunda, pós-feriado, início de mês. É um personagem com vida própria que nunca envelhece.',
    insight: 'Melted Videos provou que um personagem de meme bem construído tem shelf life ilimitado. O "cansadito" tem uso editorial eterno porque representa um estado permanente da vida moderna brasileira.',
    opportunity: 'Use o formato meme-personagem para criar mascotes de comunicação com sentimento. Identidade + emoção + humor + repetição = brand asset de longo prazo.',
    link: 'https://www.instagram.com/meltedvideos/',
    linkLabel: 'Ver perfil — @meltedvideos',
    tags: ['#NoPoedoEstoyCansadito', '#MeltedVideos', '#MemePerene'],
    fire: false,
    source: 'Melted Videos',
    sourceHandle: '@meltedvideos',
    sourceLink: 'https://www.instagram.com/meltedvideos/',
  },
]

const CAT_STYLE: Record<Category, { bg: string; text: string; border: string }> = {
  Polêmica: { bg: 'bg-red-500/15',    text: 'text-red-400',    border: 'border-red-500/30'    },
  Música:   { bg: 'bg-orange-500/15', text: 'text-orange-400', border: 'border-orange-500/30' },
  Meme:     { bg: 'bg-yellow-500/15', text: 'text-yellow-400', border: 'border-yellow-500/30' },
  Absurdo:  { bg: 'bg-purple-500/15', text: 'text-purple-400', border: 'border-purple-500/30' },
  Nostalgia:{ bg: 'bg-pink-500/15',   text: 'text-pink-400',   border: 'border-pink-500/30'   },
  Política: { bg: 'bg-blue-500/15',   text: 'text-blue-400',   border: 'border-blue-500/30'   },
  Cultura:  { bg: 'bg-cyan-500/15',   text: 'text-cyan-400',   border: 'border-cyan-500/30'   },
}

const PLAT_STYLE: Record<Platform, { bg: string; text: string; icon: string }> = {
  TikTok:    { bg: 'bg-white/8',      text: 'text-white/80',  icon: '♪' },
  Instagram: { bg: 'bg-pink-600/20',  text: 'text-pink-300',  icon: '◈' },
  X:         { bg: 'bg-slate-600/30', text: 'text-slate-300', icon: '✕' },
}

const SOURCE_STYLE: Record<Source, { color: string; dot: string }> = {
  'Saquinho de Lixo':   { color: 'text-yellow-400',  dot: 'bg-yellow-400' },
  'Greengo Dictionary': { color: 'text-green-400',   dot: 'bg-green-400'  },
  'Melted Videos':      { color: 'text-purple-400',  dot: 'bg-purple-400' },
  'Mainstream':         { color: 'text-white/40',    dot: 'bg-white/40'   },
  'Todos':              { color: 'text-white/40',    dot: 'bg-white/40'   },
}

const ALL_CATS: Category[] = ['Polêmica', 'Meme', 'Absurdo', 'Nostalgia', 'Política', 'Cultura']
const ALL_PLATS: Platform[] = ['TikTok', 'Instagram', 'X']
const ALL_SOURCES: Source[] = ['Saquinho de Lixo', 'Greengo Dictionary', 'Melted Videos']

function HeatBar({ v }: { v: number }) {
  const color = v >= 9 ? '#ef4444' : v >= 7 ? '#f97316' : '#eab308'
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="h-1.5 w-1.5 rounded-sm" style={{ background: i < v ? color : 'rgba(255,255,255,0.1)' }} />
      ))}
      <span className="ml-1 text-[11px] font-bold" style={{ color }}>{v}/10</span>
    </div>
  )
}

const TRENDSETTERS = [
  { name: 'Saquinho de Lixo', handle: '@saquinhodelixo', link: 'https://www.instagram.com/saquinhodelixo/', desc: '2M seg · jovem triste tentando te fazer feliz', color: '#eab308' },
  { name: 'Greengo Dictionary', handle: '@greengodictionary', link: 'https://www.instagram.com/greengodictionary/', desc: '2M seg · traduzindo o Brasil pro mundo (absurdamente)', color: '#22c55e' },
  { name: 'Melted Videos', handle: '@meltedvideos', link: 'https://www.instagram.com/meltedvideos/', desc: '1M seg · memes ácidos com bonequinhos 3D', color: '#a855f7' },
]

export default function TrendsDashboard() {
  const [cat, setCat] = useState<Category | null>(null)
  const [plat, setPlat] = useState<Platform | null>(null)
  const [src, setSrc] = useState<Source | null>(null)
  const [open, setOpen] = useState<number | null>(null)

  const visible = TRENDS.filter(t => {
    if (cat && t.category !== cat) return false
    if (plat && !t.platforms.includes(plat)) return false
    if (src && t.source !== src && t.source !== 'Todos') return false
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
              <p className="text-white/25 text-[10px] leading-none hidden sm:block">curadoria underground da internet brasileira</p>
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
            <span className="inline-block" style={{ background: 'linear-gradient(90deg,#22c55e 0%,#a855f7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              bombando agora
            </span>
          </h1>
          <p className="text-white/45 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Curadoria via Saquinho de Lixo, Greengo Dictionary e Melted Videos — os trendsetters que descobrem o que vai bombar antes de todo mundo.
          </p>
        </div>

        {/* ─── TRENDSETTERS ─── */}
        <div className="mb-8">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-3 font-semibold">Trendsetters de referência desta semana</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {TRENDSETTERS.map(ts => (
              <a
                key={ts.name}
                href={ts.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-2xl border border-white/7 hover:border-white/15 transition-all"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <div className="w-8 h-8 rounded-xl flex-none flex items-center justify-center text-xs font-black" style={{ background: ts.color + '25', color: ts.color, border: `1px solid ${ts.color}40` }}>
                  {ts.name[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-white text-xs font-bold leading-tight truncate">{ts.name}</p>
                  <p className="text-white/35 text-[10px] truncate">{ts.desc}</p>
                </div>
                <span className="flex-none text-white/20 text-xs">↗</span>
              </a>
            ))}
          </div>
        </div>

        {/* ─── STATS ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {([
            ['📡', '+960M', 'alcance total estimado'],
            ['🔥', '3', 'trends em chamas'],
            ['🎭', '3 perfis', 'Saquinho · Greengo · Melted'],
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
          <button onClick={() => { setCat(null); setPlat(null); setSrc(null) }} className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${!cat && !plat && !src ? 'bg-white text-black border-white' : 'border-white/12 text-white/45 hover:text-white hover:border-white/25'}`}>
            Tudo
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
            const ps = PLAT_STYLE[p]
            return (
              <button key={p} onClick={() => setPlat(plat === p ? null : p)} className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${plat === p ? 'bg-white/12 text-white border-white/35' : 'border-white/12 text-white/45 hover:text-white hover:border-white/25'}`}>
                {ps.icon} {p}
              </button>
            )
          })}
          <div className="w-px bg-white/8 self-stretch mx-1 hidden sm:block" />
          {ALL_SOURCES.map(s => {
            const ss = SOURCE_STYLE[s]
            return (
              <button key={s} onClick={() => setSrc(src === s ? null : s)} className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${src === s ? `bg-white/10 ${ss.color} border-white/20` : 'border-white/12 text-white/45 hover:text-white hover:border-white/25'}`}>
                {s.split(' ')[0]}
              </button>
            )
          })}
        </div>

        {/* ─── TREND CARDS ─── */}
        <div className="space-y-2.5">
          {visible.map(t => {
            const cs = CAT_STYLE[t.category]
            const ss = SOURCE_STYLE[t.source]
            const isOpen = open === t.rank
            return (
              <div
                key={t.rank}
                className="rounded-2xl border overflow-hidden transition-all duration-200"
                style={{ borderColor: t.fire ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.07)', background: t.fire ? 'rgba(239,68,68,0.03)' : 'rgba(255,255,255,0.022)' }}
              >
                <button onClick={() => setOpen(isOpen ? null : t.rank)} className="w-full text-left">
                  <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5">
                    <div className={`flex-none w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm ${t.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' : t.rank <= 3 ? 'bg-white/10 text-white' : 'bg-white/5 text-white/35'}`}>
                      {t.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${cs.bg} ${cs.text} ${cs.border}`}>{t.category}</span>
                        {t.fire && <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-500/20 text-red-400 border border-red-500/25 animate-pulse">🔥 Em Chamas</span>}
                        <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-white/5 ${ss.color}`}>
                          <span className={`w-1 h-1 rounded-full ${ss.dot}`} />{t.source === 'Todos' ? 'Todos os perfis' : t.source}
                        </span>
                      </div>
                      <h2 className="text-white font-bold text-sm sm:text-base leading-snug line-clamp-1">{t.title}</h2>
                      <p className="text-white/40 text-xs sm:text-sm line-clamp-1">{t.subtitle}</p>
                    </div>
                    <div className="flex-none flex-col items-end gap-1.5 hidden sm:flex">
                      <HeatBar v={t.heat} />
                      <span className="text-white/30 text-[11px]">{t.reach}</span>
                    </div>
                    <span className={`flex-none text-white/25 text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 border-t border-white/5 pt-4 space-y-4">
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
                      <div className="flex items-center gap-2 flex-wrap">
                        <a
                          href={t.sourceLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold text-white/60 border border-white/10 hover:border-white/25 transition-all"
                        >
                          {t.sourceHandle} ↗
                        </a>
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
                  </div>
                )}
              </div>
            )
          })}

          {visible.length === 0 && (
            <p className="text-center py-20 text-white/25 text-sm">Nenhuma trend com esse filtro.<br /><span className="text-[11px]">(por trás disso há um jovem triste tentando te ajudar)</span></p>
          )}
        </div>

        {/* ─── FOOTER ─── */}
        <footer className="mt-16 pt-8 border-t border-white/6 text-center space-y-1.5">
          <p className="text-white/35 text-sm">
            <span className="font-bold text-white/55">Smart Trend Radar</span> — curadoria underground da internet brasileira
          </p>
          <p className="text-white/20 text-xs">
            Via @saquinhodelixo · @greengodictionary · @meltedvideos · {WEEK}
          </p>
          <p className="text-white/15 text-xs">
            por trás de cada trend há um jovem triste tentando fazer seu cliente feliz
          </p>
        </footer>
      </main>
    </div>
  )
}
