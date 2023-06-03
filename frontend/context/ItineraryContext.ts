import { createContext } from 'react'

interface Itinerary {
  destination: string,
  activity: string,
  timeOfYear: string,
  duration: string,
  people: string,
}

interface ItineraryContextType {
  itineraryData: Itinerary | null,
  setItineraryData: React.Dispatch<React.SetStateAction<Itinerary | null>>,
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
}

const ItineraryContext = createContext<ItineraryContextType | undefined >(undefined)

export default ItineraryContext
