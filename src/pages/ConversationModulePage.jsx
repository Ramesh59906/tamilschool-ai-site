import { useMemo, useRef, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { getCurrentUserUser, isUserAuthed } from '../auth/userAuthStorage'
import { listConversationScenarios, mockConversationChat, saveLearningSession } from '../mock/learningApi'

function bubbleClass(role) {
  return role === 'assistant'
    ? 'bg-white/10 text-white border border-white/10'
    : 'bg-emerald-500/15 text-emerald-50 border border-emerald-400/20'
}

export default function ConversationModulePage() {
  const authed = isUserAuthed()
  const me = authed ? getCurrentUserUser() : null
  const scenarios = useMemo(() => listConversationScenarios(), [])

  const [scenarioId, setScenarioId] = useState(scenarios[0]?.id ?? 'school-intro')
  const scenario = scenarios.find((s) => s.id === scenarioId) ?? scenarios[0]

  const [messages, setMessages] = useState(() => [
    {
      role: 'assistant',
      content: 'வணக்கம்! ஒரு சூழ்நிலையை தேர்வு செய்து பேசத் தொடங்கலாம்.',
    },
  ])
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const [lastFeedback, setLastFeedback] = useState(null)
  const [savedId, setSavedId] = useState(null)

  const endRef = useRef(null)

  if (!authed) return <Navigate to="/login?mode=user" replace />

  function scrollToEnd() {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }

  async function send() {
    const text = draft.trim()
    if (!text || busy) return

    setSavedId(null)
    setDraft('')
    setLastFeedback(null)

    const next = [...messages, { role: 'user', content: text }]
    setMessages(next)
    setBusy(true)
    queueMicrotask(scrollToEnd)

    try {
      const res = await mockConversationChat({ scenarioId, messages: next })
      const withAssistant = [...next, { role: 'assistant', content: res.assistant }]
      setMessages(withAssistant)
      setLastFeedback(res.feedback)
      queueMicrotask(scrollToEnd)
    } finally {
      setBusy(false)
    }
  }

  function endSession() {
    const sess = saveLearningSession({
      userEmail: me?.email,
      role: me?.role,
      moduleId: 'conversational-learning',
      scenarioId,
      messages,
    })
    setSavedId(sess.id)
  }

  return (
    <div className="min-h-svh bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-[90rem] items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Link to="/learn" className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-bold text-white hover:bg-white/10">
              ← Modules
            </Link>
            <div className="flex flex-col">
              <div className="text-xs font-bold uppercase tracking-widest text-emerald-300">Conversational Learning</div>
              <div className="text-sm text-slate-200">Scenario chat • {me?.email}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/learn/progress"
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Progress
            </Link>
            <button
              type="button"
              onClick={endSession}
              className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-2 text-sm font-extrabold text-white shadow-[0_18px_42px_rgba(16,185,129,0.25)]"
            >
              End session
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[90rem] grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[22rem_1fr]">
        <section className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <h2 className="font-display text-xl font-extrabold text-white">Scenario</h2>
          <p className="mt-1 text-sm text-slate-300">Pick a situation. Then chat in Tamil (or mix Tamil + English while learning).</p>

          <div className="mt-4">
            <label htmlFor="scenario" className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/50">
              Choose scenario
            </label>
            <select
              id="scenario"
              value={scenarioId}
              onChange={(e) => setScenarioId(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm font-semibold text-white outline-none focus:border-emerald-400/40"
            >
              {scenarios.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title} • {s.level}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/30 p-4">
            <p className="text-sm font-extrabold text-white">{scenario?.title}</p>
            <p className="mt-1 text-sm text-slate-300">{scenario?.goal}</p>
          </div>

          {lastFeedback && (
            <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-200/90">Coach feedback</p>
              <p className="mt-2 text-sm text-emerald-50">
                <span className="font-extrabold">{lastFeedback.quickCheck}.</span> {lastFeedback.nextPrompt}
              </p>
              <p className="mt-2 text-sm text-emerald-50/90">{lastFeedback.pronunciationHint}</p>
            </div>
          )}

          {savedId && (
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-bold text-white">Saved.</p>
              <p className="mt-1 text-sm text-slate-300">
                Session id: <span className="font-mono text-xs text-slate-200">{savedId}</span>
              </p>
            </div>
          )}

          <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/30 p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-white/50">Tips</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>Try short sentences first.</li>
              <li>Ask questions using “எங்கே / எப்போது / எதற்கு”.</li>
              <li>Click “End session” to record progress.</li>
            </ul>
          </div>
        </section>

        <section className="flex min-h-[70svh] flex-col rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="border-b border-white/10 px-5 py-4">
            <p className="text-xs font-bold uppercase tracking-widest text-white/50">Chat</p>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
            {messages.map((m, idx) => (
              <div key={`${m.role}_${idx}`} className={`max-w-[44rem] rounded-2xl px-4 py-3 ${bubbleClass(m.role)}`}>
                <p className="text-xs font-bold uppercase tracking-widest text-white/40">{m.role === 'assistant' ? 'Tutor' : 'You'}</p>
                <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed">{m.content}</p>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="border-t border-white/10 px-4 py-4">
            <div className="flex items-end gap-2">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    send()
                  }
                }}
                placeholder="Type your message… (Enter to send, Shift+Enter for new line)"
                className="min-h-[3.1rem] w-full resize-none rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400/40"
              />
              <button
                type="button"
                onClick={send}
                disabled={busy}
                className="inline-flex h-[3.1rem] items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 text-sm font-extrabold text-white shadow-[0_18px_42px_rgba(16,185,129,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {busy ? '...' : 'Send'}
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

