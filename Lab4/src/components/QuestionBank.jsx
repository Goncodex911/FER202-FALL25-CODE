import React, { useEffect, useMemo, useReducer, useState } from 'react'
import { Card, Button, ProgressBar, Badge, ListGroup, Form, Row, Col, Alert } from 'react-bootstrap'

const sampleQuestions = [
  { id: 1, category: 'Địa lý', difficulty: 'Dễ', question: 'Thủ đô của Úc là gì?', options: ['Sydney', 'Canberra', 'Melbourne', 'Perth'], answer: 'Canberra' },
  { id: 2, category: 'Khoa học', difficulty: 'Trung bình', question: 'Hành tinh nào gần Mặt Trời thứ 4?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], answer: 'Mars' },
  { id: 3, category: 'Toán', difficulty: 'Dễ', question: 'Kết quả 2 + 2 * 2 = ?', options: ['6', '8', '4', '2'], answer: '6' },
  { id: 4, category: 'CNTT', difficulty: 'Trung bình', question: 'Ngôn ngữ nào chạy trên trình duyệt?', options: ['Java', 'C++', 'JavaScript', 'Go'], answer: 'JavaScript' },
  { id: 5, category: 'CNTT', difficulty: 'Khó', question: 'CSS viết tắt của?', options: ['Cascading Style Sheets', 'Central Style Syntax', 'Computer Styled System', 'Case Style Sheet'], answer: 'Cascading Style Sheets' }
]

const initialState = (questions) => ({
  status: 'idle',     // idle | in_progress | finished | review
  index: 0,
  answers: {},        // { [qid]: option }
  locked: {},         // { [qid]: true } — khoá sau lần chọn đầu (immediate feedback)
  marked: {},         // { [qid]: true } — đánh dấu xem lại
  score: 0,
  startedAt: null,
  finishedAt: null,
  questions
})

function reducer(state, action) {
  switch (action.type) {
    case 'START':
      return { ...state, status: 'in_progress', index: 0, answers: {}, locked: {}, marked: {}, score: 0, startedAt: Date.now(), finishedAt: null }
    case 'ANSWER': {
      const { qid, option, lock } = action
      if (state.locked[qid]) return state
      const current = state.questions.find(q => q.id === qid)
      const isCorrect = option === current.answer
      const prev = state.answers[qid]
      const delta = prev ? 0 : (isCorrect ? 1 : 0) // chỉ tính điểm ở lần trả lời đầu
      return {
        ...state,
        answers: { ...state.answers, [qid]: option },
        locked: lock ? { ...state.locked, [qid]: true } : state.locked,
        score: state.score + delta
      }
    }
    case 'TOGGLE_MARK': {
      const { qid } = action
      const now = !state.marked[qid]
      return { ...state, marked: { ...state.marked, [qid]: now } }
    }
    case 'NEXT':
      return { ...state, index: Math.min(state.index + 1, state.questions.length - 1) }
    case 'PREV':
      return { ...state, index: Math.max(state.index - 1, 0) }
    case 'GOTO':
      return { ...state, index: action.index }
    case 'FINISH':
      return { ...state, status: 'finished', finishedAt: Date.now() }
    case 'REVIEW':
      return { ...state, status: 'review' }
    case 'RESET':
      return initialState(action.questions || state.questions)
    case 'LOAD':
      return { ...state, ...(action.payload || {}) }
    default:
      return state
  }
}

function useCountdown(active, seconds, onExpire) {
  const [remain, setRemain] = useState(seconds)
  useEffect(() => { if (active) setRemain(seconds) }, [active, seconds])
  useEffect(() => {
    if (!active) return
    const id = setInterval(() => {
      setRemain((r) => {
        if (r <= 1) { clearInterval(id); onExpire && onExpire(); return 0 }
        return r - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [active, onExpire, seconds])
  return remain
}

export default function QuestionBank() {
  // Tùy chọn trước khi bắt đầu
  const [shuffle, setShuffle] = useState(true)
  const [timeLimit, setTimeLimit] = useState(90) // giây
  const [immediateFeedback, setImmediateFeedback] = useState(true)
  const [filterCategory, setFilterCategory] = useState('Tất cả')
  const [filterDifficulty, setFilterDifficulty] = useState('Tất cả')

  const categories = useMemo(() => ['Tất cả', ...Array.from(new Set(sampleQuestions.map(q => q.category)))], [])
  const difficulties = useMemo(() => ['Tất cả', ...Array.from(new Set(sampleQuestions.map(q => q.difficulty)))], [])

  const questions = useMemo(() => {
    let arr = [...sampleQuestions]
    if (filterCategory !== 'Tất cả') arr = arr.filter(q => q.category === filterCategory)
    if (filterDifficulty !== 'Tất cả') arr = arr.filter(q => q.difficulty === filterDifficulty)
    if (shuffle) arr.sort(() => Math.random() - 0.5)
    return arr
  }, [shuffle, filterCategory, filterDifficulty])

  const [state, dispatch] = useReducer(reducer, questions, initialState)
  const progress = Math.round((Object.keys(state.answers).length / state.questions.length) * 100)
  const remain = useCountdown(state.status === 'in_progress', timeLimit, () => dispatch({ type: 'FINISH' }))

  const current = state.questions[state.index]
  const selected = current ? state.answers[current.id] : undefined
  const isLocked = current ? !!state.locked[current.id] : false
  const isMarked = current ? !!state.marked[current.id] : false
  const isCorrect = current ? selected === current.answer : false

  // Lưu/Phục hồi tiến trình
  useEffect(() => {
    localStorage.setItem('qb_state_full', JSON.stringify({ ...state, questions: state.questions }))
  }, [state])

  useEffect(() => {
    const raw = localStorage.getItem('qb_state_full')
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed.questions)) dispatch({ type: 'LOAD', payload: parsed })
      } catch {}
    }
  }, [])

  // Thống kê
  const total = state.questions.length
  const answered = Object.keys(state.answers).length
  const unanswered = Math.max(0, total - answered)
  const wrong = state.questions.filter(q => state.answers[q.id] && state.answers[q.id] !== q.answer).length
  const correct = state.score
  const percent = total ? Math.round((correct / total) * 100) : 0
  const durationSec = state.startedAt && state.finishedAt
    ? Math.round((state.finishedAt - state.startedAt) / 1000)
    : (timeLimit - remain)

  // Handlers
  const handleAnswer = (opt) => {
    if (!current) return
    dispatch({ type: 'ANSWER', qid: current.id, option: opt, lock: immediateFeedback })
  }
  const retryIncorrectOnly = () => {
    const wrongQs = state.questions.filter(q => state.answers[q.id] !== q.answer)
    const newQs = wrongQs.length ? wrongQs : state.questions
    dispatch({ type: 'RESET', questions: newQs })
  }
  const exportResults = () => {
    const results = state.questions.map((q, idx) => ({
      index: idx + 1,
      id: q.id,
      question: q.question,
      answerCorrect: q.answer,
      answerUser: state.answers[q.id] ?? null,
      correct: state.answers[q.id] === q.answer,
      marked: !!state.marked[q.id]
    }))
    const blob = new Blob([JSON.stringify({ summary: { total, correct, wrong, unanswered, percent }, results }, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'quiz_results.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center flex-wrap gap-2">
        <strong>Exercise 6: QuestionBank (đầy đủ tính năng)</strong>
        <div className="d-flex gap-2 align-items-center">
          <Badge bg="secondary">Thời gian: {remain}s</Badge>
          <Badge bg="info">Điểm: {correct}/{total}</Badge>
          <Badge bg="dark">{progress}%</Badge>
        </div>
      </Card.Header>

      <Card.Body>
        {state.status === 'idle' && (
          <div>
            <Row className="g-3 mb-3">
              <Col md={3}>
                <Form.Check
                  type="switch"
                  id="shuffle"
                  label="Xáo trộn câu hỏi"
                  checked={shuffle}
                  onChange={(e) => setShuffle(e.target.checked)}
                />
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Giới hạn thời gian (giây)</Form.Label>
                  <Form.Control
                    type="number" min={30} max={900}
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(parseInt(e.target.value || 90, 10))}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Check
                  type="switch"
                  id="immediate"
                  label="Chốt đáp án ngay sau khi chọn"
                  checked={immediateFeedback}
                  onChange={(e) => setImmediateFeedback(e.target.checked)}
                />
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Chủ đề</Form.Label>
                  <Form.Select value={filterCategory} onChange={(e)=>setFilterCategory(e.target.value)}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Độ khó</Form.Label>
                  <Form.Select value={filterDifficulty} onChange={(e)=>setFilterDifficulty(e.target.value)}>
                    {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Alert variant={questions.length ? 'secondary' : 'warning'} className="mb-3">
              Số câu sau khi lọc: <strong>{questions.length}</strong>
            </Alert>
            <Button onClick={() => dispatch({ type: 'START' })} disabled={!questions.length}>Bắt đầu làm bài</Button>
          </div>
        )}

        {state.status === 'in_progress' && current && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="mb-0">Câu {state.index + 1}/{total} — <small className="text-muted">{current.category} • {current.difficulty}</small></h5>
              <div className="d-flex gap-2">
                <Button size="sm" variant={isMarked ? 'warning' : 'outline-warning'} onClick={() => dispatch({ type: 'TOGGLE_MARK', qid: current.id })}>
                  {isMarked ? 'Bỏ đánh dấu' : 'Đánh dấu xem lại'}
                </Button>
              </div>
            </div>

            <div className="mb-2">{current.question}</div>
            <ListGroup className="mb-3">
              {current.options.map((opt) => {
                const active = selected === opt
                const showRight = isLocked && opt === current.answer
                const showWrong = isLocked && active && !isCorrect
                return (
                  <ListGroup.Item
                    key={opt}
                    action={!isLocked}
                    active={active}
                    onClick={() => !isLocked && handleAnswer(opt)}
                  >
                    {opt} {' '}
                    {showRight && <Badge bg="success" className="ms-2">Đúng</Badge>}
                    {showWrong && <Badge bg="danger" className="ms-2">Sai</Badge>}
                  </ListGroup.Item>
                )
              })}
            </ListGroup>

            <ProgressBar className="mb-3" now={progress} />
            <div className="d-flex gap-2 flex-wrap">
              <Button variant="secondary" onClick={() => dispatch({ type: 'PREV' })} disabled={state.index === 0}>Trước</Button>
              <Button onClick={() => dispatch({ type: 'NEXT' })} disabled={state.index === total - 1}>Tiếp</Button>
              <Button variant="warning" onClick={() => dispatch({ type: 'FINISH' })}>Nộp bài</Button>
              <Button variant="outline-danger" onClick={() => dispatch({ type: 'RESET', questions })}>Làm lại</Button>
            </div>
          </div>
        )}

        {state.status === 'finished' && (
          <div>
            <Alert variant={percent >= 50 ? 'success' : 'danger'}>
              Hoàn thành! Điểm: <strong>{correct}/{total}</strong> — {percent}% • Thời gian sử dụng: {durationSec}s
              <div>Trả lời đúng: {correct} • Sai: {wrong} • Chưa trả lời: {unanswered}</div>
            </Alert>
            <div className="d-flex gap-2 flex-wrap mb-3">
              <Button onClick={() => dispatch({ type: 'REVIEW' })}>Xem lại đáp án</Button>
              <Button variant="outline-primary" onClick={retryIncorrectOnly}>Làm lại câu sai</Button>
              <Button variant="outline-success" onClick={exportResults}>Xuất kết quả (JSON)</Button>
              <Button variant="outline-danger" onClick={() => dispatch({ type: 'RESET', questions })}>Làm lại toàn bộ</Button>
            </div>
          </div>
        )}

        {state.status === 'review' && (
          <div>
            <h5>Tổng kết & điều hướng nhanh</h5>
            <ListGroup className="mb-3">
              {state.questions.map((q, idx) => {
                const user = state.answers[q.id]
                const ok = user === q.answer
                return (
                  <ListGroup.Item key={q.id}>
                    <div className="d-flex justify-content-between align-items-start gap-3">
                      <div>
                        <div><strong>Câu {idx + 1}:</strong> {q.question} <small className="text-muted">({q.category} • {q.difficulty})</small></div>
                        <div>Đáp án của bạn: <Badge bg={ok ? 'success' : 'danger'}>{user || '(chưa chọn)'}</Badge></div>
                        <div>Đáp án đúng: <Badge bg="secondary">{q.answer}</Badge></div>
                        {state.marked[q.id] && <div><Badge bg="warning" text="dark">Đã đánh dấu</Badge></div>}
                      </div>
                      <div><Button size="sm" onClick={() => dispatch({ type: 'GOTO', index: idx })}>Tới câu</Button></div>
                    </div>
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
            <div className="d-flex gap-2 flex-wrap">
              <Button onClick={() => dispatch({ type: 'START' })}>Làm lại bộ câu hỏi</Button>
              <Button variant="outline-secondary" onClick={() => dispatch({ type: 'RESET', questions })}>Reset</Button>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  )
}
