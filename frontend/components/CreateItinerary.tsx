import { useState, useContext, useEffect } from 'react'
import FormInput from './FormInput'
import Header from './Header'
import ItineraryContext from '../context/ItineraryContext'

export default function CreateItinerary () {
  const context = useContext(ItineraryContext)

  if (context === undefined) {
    throw new Error('CreateItinerary must be used within an ItineraryProvider')
  }

  const { setItineraryData } = context

  const [destination, setDestination] = useState('')
  const [activity, setActivity] = useState('')
  const [timeOfYear, setTimeOfYear] = useState('')
  const [duration, setDuration] = useState('')
  const [people, setPeople] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDuration(e.target.value)
  }

  const itineraryParameters = {
    destination,
    activity,
    timeOfYear,
    duration,
    people
  }

  const handleSubmit = async () => {
    try {
      console.log('trying handleSubmit in CreateItinerary', itineraryParameters)
      const response = await fetch('/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itineraryParameters })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setItineraryData(data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    return () => {
      console.log('CreateItinerary or Dashboard unmounted')
    }
  }, [])

  return (
    <>
      <Header/>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <div>I'm planning a trip</div>
            <FormInput labelText="to..." onInputChange={setDestination} placeholder="Cancun"/>
            <FormInput labelText="to do..." onInputChange={setActivity} placeholder="snorkel"/>
            <FormInput labelText="in..." onInputChange={setTimeOfYear} placeholder="October"/>
            <label className="label">
              <span className="label-text">for...</span>
            </label>
            <select className="select select-bordered w-full max-w-xs" onChange={handleChange}>
              {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
                <option key={num}>{num} {num === 1 ? 'day' : 'days'}</option>
              ))}
            </select>
            <FormInput labelText="with..." onInputChange={setPeople} placeholder="with family"/>
            <br/>
            <button onClick={handleSubmit} className="btn w-64 rounded-full">Submit</button>

          </div>
        </div>
      </div>

    </>
  )
}
