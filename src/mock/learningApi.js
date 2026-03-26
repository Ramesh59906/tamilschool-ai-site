const SESSIONS_KEY = 'tkm_learning_sessions_v1'

function safeJsonParse(value, fallback) {
  try {
    const parsed = JSON.parse(value)
    return parsed ?? fallback
  } catch {
    return fallback
  }
}

function loadSessions() {
  if (typeof window === 'undefined') return []
  const raw = window.localStorage.getItem(SESSIONS_KEY)
  return safeJsonParse(raw, [])
}

function saveSessions(sessions) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions))
}

export function listConversationScenarios() {
  return [
    {
      id: 'school-intro',
      title: 'At School: Introductions',
      level: 'Beginner',
      goal: 'Introduce yourself and ask simple questions.',
    },
    {
      id: 'shop-fruits',
      title: 'At the Shop: Buying Fruits',
      level: 'Beginner',
      goal: 'Ask prices and quantities politely.',
    },
    {
      id: 'bus-directions',
      title: 'Travel: Asking Directions',
      level: 'Intermediate',
      goal: 'Ask where to go and understand short answers.',
    },
    {
      id: 'friends-weekend',
      title: 'Friends: Weekend Plans',
      level: 'Intermediate',
      goal: 'Talk about plans using time words.',
    },
  ]
}

function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function extractTamilishWords(text) {
  const str = String(text || '')
  const tokens = str
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean)

  const stop = new Set(['the', 'a', 'an', 'and', 'or', 'to', 'in', 'of', 'for', 'is', 'are', 'i', 'you'])
  return tokens.filter((t) => t.length >= 3 && !stop.has(t))
}

export async function mockConversationChat({ scenarioId, messages }) {
  const lastUser = [...(messages || [])].reverse().find((m) => m.role === 'user')?.content || ''

  const openersByScenario = {
    'school-intro': [
      'வணக்கம்! நான் உங்களை சந்தித்ததில் மகிழ்ச்சி. உங்கள் பெயர் என்ன?',
      'வணக்கம்! இன்று பள்ளியில் எப்படி இருக்கிறீர்கள்?',
    ],
    'shop-fruits': [
      'வணக்கம்! இன்று எந்த பழங்கள் வேண்டும்?',
      'வணக்கம்! ஆப்பிள், வாழைப்பழம் இருக்கிறது. எத்தனை வேண்டும்?',
    ],
    'bus-directions': [
      'வணக்கம்! நீங்கள் எங்கே போக வேண்டும்?',
      'சரி, அந்த இடத்துக்கு எந்த வழி வேண்டும் என்று கேளுங்கள்.',
    ],
    'friends-weekend': [
      'ஹாய்! இந்த வார இறுதியில் என்ன செய்ய போகிறீர்கள்?',
      'சூப்பர்! நீங்கள் எப்போது புறப்படப் போகிறீர்கள்?',
    ],
  }

  const genericReplies = [
    'நன்று! இன்னொரு வாக்கியம் சொல்ல முடியுமா?',
    'சரி. இதை கொஞ்சம் மெதுவாகவும் தெளிவாகவும் சொல்ல முயற்சிக்கவும்.',
    'அருமை! இப்போது ஒரு கேள்வி கேளுங்கள்.',
    'புரிந்தது. “தயவு செய்து” (please) சேர்த்து சொல்ல முயற்சிக்கவும்.',
  ]

  const assistantText =
    lastUser.trim().length === 0
      ? randomPick(openersByScenario[scenarioId] ?? genericReplies)
      : randomPick([
          'நன்று! நீங்கள் சொன்னது சரியாக உள்ளது. இன்னொரு எடுத்துக்காட்டு சொல்லுங்கள்.',
          'சிறந்த முயற்சி. இப்போது “எங்கே / எப்போது” கொண்டு ஒரு கேள்வி கேளுங்கள்.',
          'நன்று. அதே அர்த்தத்தை இன்னும் எளிமையாக சொல்லலாம். மீண்டும் முயற்சி செய்யுங்கள்.',
          randomPick(genericReplies),
        ])

  const pronunciationTips = [
    'Tip: நீண்ட உயிரெழுத்து (ஆ/ஈ/ஊ) தெளிவாக உச்சரிக்க முயற்சி செய்யவும்.',
    'Tip: “ழ” (ழ) ஒலியை மெதுவாக பயிற்சி செய்யவும் — “தமிழ்”.',
    'Tip: வார்த்தைகளுக்கு இடையில் சிறிய இடைவெளி விடுங்கள்.',
  ]

  const feedback = {
    quickCheck: randomPick(['Great', 'Good', 'Keep going']),
    nextPrompt: randomPick([
      'Ask a question using “எங்கே?”.',
      'Say one sentence about today.',
      'Use “தயவு செய்து” in your next line.',
    ]),
    pronunciationHint: randomPick(pronunciationTips),
  }

  await new Promise((r) => setTimeout(r, 450))

  return {
    assistant: assistantText,
    feedback,
  }
}

export function saveLearningSession({ userEmail, role, moduleId, scenarioId, messages }) {
  const sessions = loadSessions()
  const words = messages?.flatMap((m) => extractTamilishWords(m.content)).slice(0, 200) ?? []
  const uniqueWords = Array.from(new Set(words)).slice(0, 120)

  const session = {
    id: `sess_${Date.now()}_${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
    userEmail: String(userEmail || '').toLowerCase(),
    role,
    moduleId,
    scenarioId,
    messageCount: Array.isArray(messages) ? messages.length : 0,
    vocab: uniqueWords,
  }

  sessions.unshift(session)
  saveSessions(sessions)
  return session
}

export function getLearningProgress({ userEmail } = {}) {
  const sessions = loadSessions().filter((s) => {
    if (!userEmail) return true
    return String(s.userEmail || '').toLowerCase() === String(userEmail).toLowerCase()
  })

  const totalSessions = sessions.length
  const totalMessages = sessions.reduce((sum, s) => sum + (s.messageCount || 0), 0)
  const vocab = new Set(sessions.flatMap((s) => s.vocab || []))

  const masteryPct = Math.min(95, Math.round(30 + totalSessions * 6 + Math.min(25, vocab.size / 8)))

  return {
    totalSessions,
    totalMessages,
    masteryPct,
    vocabCount: vocab.size,
    recentSessions: sessions.slice(0, 10),
  }
}

