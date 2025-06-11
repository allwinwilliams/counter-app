// pages/predictions/input.js
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function InputPage() {
  const router = useRouter()
  const [symptoms, setSymptoms] = useState({
    headache: false,
    fever: false,
    cold: false,
    toothpain: false,
  })
  const [other, setOther] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleCheckbox = e =>
    setSymptoms(s => ({ ...s, [e.target.value]: e.target.checked }))

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)

    const selected = Object.entries(symptoms)
      .filter(([, checked]) => checked)
      .map(([sym]) => sym)
    if (other.trim()) selected.push(other.trim())

    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: selected }),
      })
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}))
        throw new Error(errBody.error || 'API error')
      }
      const data = await res.json()
      sessionStorage.setItem('diagnosis', JSON.stringify(data))
      router.push('/predictions/output')
    } catch (err) {
      console.error(err)
      setError(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const container = {
    maxWidth: 400,
    margin: '40px auto',
    padding: 24,
    border: '1px solid #e0e0e0',
    borderRadius: 8,
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    fontFamily: 'sans-serif',
  }
  const checkboxRow = { marginBottom: 12 }
  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    borderRadius: 4,
    border: '1px solid #ccc',
    fontSize: 14,
  }
  const btn = {
    width: '100%',
    padding: '10px 0',
    marginTop: 16,
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    fontSize: 16,
    cursor: loading ? 'default' : 'pointer',
    opacity: loading ? 0.6 : 1,
  }
  const errorStyle = { color: 'red', marginTop: 12 }

  return (
    <div style={container}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>
        Enter Your Symptoms
      </h2>

      {['headache', 'fever', 'cold', 'toothpain'].map(sym => (
        <div key={sym} style={checkboxRow}>
          <label>
            <input
              type="checkbox"
              value={sym}
              checked={symptoms[sym]}
              onChange={handleCheckbox}
            />{' '}
            {sym.charAt(0).toUpperCase() + sym.slice(1)}
          </label>
        </div>
      ))}

      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Other symptoms"
          value={other}
          onChange={e => setOther(e.target.value)}
          style={inputStyle}
        />
      </div>

      <button onClick={handleSubmit} disabled={loading} style={btn}>
        {loading ? 'Predicting…' : 'Predict'}
      </button>

      {error && <p style={errorStyle}>{error}</p>}
    </div>
  )
}
