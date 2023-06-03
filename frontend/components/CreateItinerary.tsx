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

      const resp = await response.json()
      const data = JSON.parse(resp.itineraryResponse)
      console.log(data)
      setItineraryData(data)
      console.log(data)

      const divToUpdate = document.querySelector('#GPTAPIResponse')
      let htmlToPush = `
        <u>Title</u>: ${data.title} <br />
        <u>Destination</u>: ${data.destination} <br />
        <u>Start Date</u>: ${data.proposedDates[0]}<br />
        <u>End Date</u>: ${data.proposedDates[data.proposedDates.length - 1]}
        `

      data.proposedDates.forEach((date: string) => {
        console.log(date)
        htmlToPush = htmlToPush.concat('<br /><u>', date, '</u>')
        htmlToPush = htmlToPush.concat('<br />', ' Morning: ', data.details[date].Morning)
        htmlToPush = htmlToPush.concat('<br />', ' Afternoon: ', data.details[date].Afternoon)
        htmlToPush = htmlToPush.concat('<br />', ' Evening: ', data.details[date].Evening)
      })

      console.log(htmlToPush)

      if (divToUpdate) divToUpdate.innerHTML = htmlToPush
      /*
      {title: 'Cancun Snorkeling Adventure', destination: 'Cancun', proposedDates: Array(2), details: {…}}
destination
:
"Cancun"
details
:
10/01/23
:
{Morning: 'Visit the Xel-Ha Park for snorkeling and other water activities', Afternoon: 'Explore the ancient Mayan ruins of Tulum', Evening: 'Enjoy a romantic dinner at the beach'}
10/02/23
:
{Morning: 'Take a boat tour of the Nichupte Lagoon', Afternoon: 'Relax on the beach and soak up the sun', Evening: 'Go shopping in downtown Cancun'}
[[Prototype]]
:
Object
proposedDates
:
(2) ['10/01/23', '10/02/23']
title
:
"Cancun Snorkeling Adventure"
      */

      /*  [1]   title: "Cancun Snorkeling Trip",
          [1]   destination: "Cancun, Mexico",
          [1]   proposedDates: ["10/01/20", "10/02/20"],
          [1]   details: {
          [1]     "10/01/20": {
          [1]       Morning: "Visit the Chac Mool Beach for snorkeling",
          [1]       Afternoon: "Visit the El Meco Ruins",
          [1]       Evening: "Visit the La Isla Shopping Mall"
          [1]     },
          [1]     "10/02/20": {
          [1]       Morning: "Visit the El Rey Ruins",
          [1]       Afternoon: "Visit the El Mirador Beach for snorkeling",
          [1]       Evening: "Visit the Plaza Las Americas Shopping Mall"
          [1]     }
          [1]   }
          [1] } */
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
            <FormInput labelText="with..." onInputChange={setPeople} placeholder="2 (e.g. number of people)"/>
            <br/>
            <a href="#modal-displayItinerary">
              <button onClick={handleSubmit} className="btn w-64 rounded-full">Submit</button>
            </a>
          </div>
        </div>
      </div>

      {/* This modal will be called by an anchor tag earlier in this return statement */}
      <div className="modal" id="modal-displayItinerary">
        <div className="modal-box" id="modalBox-displayItinerary">
          <h3 className="font-bold text-lg">Here's your sample itinerary:</h3>
          <div id="GPTAPIResponse" className="py-4">
            <p> Awaiting Skynet Response... </p>
          </div>
          <div className="modal-action">
            <a href="#" className="btn btn-warning">Close</a>
          </div>
        </div>
      </div>
    </>
  )
}
