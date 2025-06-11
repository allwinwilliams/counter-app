// pages/predictions/output.js
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function OutputPage() {
  const router = useRouter()
  const [diagnosis, setDiagnosis] = useState(null)

  useEffect(() => {
    const raw = sessionStorage.getItem('diagnosis')
    if (!raw) {
      router.replace('/predictions/input')
      return
    }
    try {
      const obj = JSON.parse(raw)
      setDiagnosis(obj.diagnosis)
    } catch (e) {
      console.error('Invalid JSON in sessionStorage:', raw)
    }
  }, [])

  if (!diagnosis) return <p>Loading…</p>

  const container = {
    maxWidth: 500,
    margin: '40px auto',
    padding: 24,
    border: '1px solid #e0e0e0',
    borderRadius: 8,
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    fontFamily: 'sans-serif',
  }
  const btn = {
    marginTop: 20,
    padding: '10px 16px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    fontSize: 14,
    cursor: 'pointer',
  }

  return (
    <div style={container}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>
        Your Diagnosis
      </h2>

      <ul style={{ lineHeight: 1.6 }}>
        {diagnosis.prediction.map((d, i) => (
          <li key={i}>
            <strong>{d.name}</strong>: {(d.probability * 100).toFixed(1)}%
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 16 }}>
        <h4>Observation</h4>
        <p style={{ margin: '4px 0 12px' }}>
          {diagnosis.observation.description}
        </p>

        <h4>Treatment</h4>
        <p style={{ margin: '4px 0' }}>
          {diagnosis.treatment.description}
        </p>
      </div>

      <button style={btn} onClick={() => router.push('/predictions/input')}>
        Back & Change Symptoms
      </button>
    </div>
  )
}
