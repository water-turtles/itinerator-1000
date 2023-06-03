import React, { useState, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import CreateItinerary from './components/CreateItinerary'
import ItineraryContext from './context/ItineraryContext'

interface Itinerary {
  destination: string,
  activity: string,
  timeOfYear: string,
  duration: string,
  people: string,
}

const router = createBrowserRouter([
  {
    // path: '/',
    // element: <Root />,
    // errorElement: <ErrorPage />,
    // children: [
    //   {
    //     path: '/',
    //     element: <HomePage />
    //   },
    //   {
    //     path: '/trip/new',
    //     element: <CreateTrip />
    //   },
    //   {
    //     path: '/trip/:tripId',
    //     element: <TripDashboard />,
    //     loader: tripLoader
    //   }
    //   // Additional routes go here
    // ]
  },
  {
    path: '/create',
    element: <CreateItinerary />
    // errorElement: <ErrorPage />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
    // errorElement: <ErrorPage />
  }
])

const App: React.FC = () => {
  const [itineraryData, setItineraryData] = useState<Itinerary | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    console.log('itineraryData/App has re-rendered', itineraryData)
  }, [itineraryData])
  return (
    <React.StrictMode>
      <ItineraryContext.Provider value={{ itineraryData, setItineraryData, loading, setLoading }}>
        <RouterProvider router={router} />
      </ItineraryContext.Provider>
    </React.StrictMode>
  )
}

export default App
