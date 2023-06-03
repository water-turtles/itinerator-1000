import { useContext } from 'react'
import ItineraryContext from '../context/ItineraryContext'

export default function Dashboard () {
  const context = useContext(ItineraryContext)

  if (context === undefined) {
    throw new Error('OtherComponent must be used within an ItineraryProvider')
  }

  const { itineraryData } = context

  return (
    <>

      <div>{itineraryData?.destination || 'nothing yet'}</div>

    </>
  )
}
