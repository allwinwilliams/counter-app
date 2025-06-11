// pages/api/predict.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { symptoms } = req.body
  const symptomList = Array.isArray(symptoms) ? symptoms.join(', ') : String(symptoms)

  // build chat messages
  const messages = [
    { role: 'system', content: 'You are a helpful medical assistant.' },
    {
      role: 'user',
      content: `Based on these symptoms: ${symptomList}, respond with **only** valid JSON in this shape:

\`\`\`json
{
  "diagnosis": {
    "prediction": [
      { "name": "[Disease_1]", "probability": 0.65 },
      { "name": "[Disease_2]", "probability": 0.35 }
    ],
    "observation": { "description": "[brief summary]" },
    "treatment": { "description": "[suggested next steps]" }
  }
}
\`\`\`
`,
    },
  ]

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    if (!openaiRes.ok) {
      const errBody = await openaiRes.json().catch(() => ({}))
      return res.status(openaiRes.status).json({ error: errBody })
    }

    const payload = await openaiRes.json()
    let text = payload.choices[0].message.content
    // strip code fences if present
    text = text.replace(/```(?:json)?/g, '').trim()

    const result = JSON.parse(text)
    return res.status(200).json(result)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: err.message })
  }
}
