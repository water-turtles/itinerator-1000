import openai from '../openAi/openAi-api.js'

interface RequestQuery {
  destination: string;
  activity: string;
  timeOfYear: string;
  duration: string;
  people: string;
}

const generate = async (requestQuery: RequestQuery): Promise<string> => {
  const { destination, activity, timeOfYear, duration, people } = requestQuery
  // const familyFlag = family ? '' : 'not'
  console.log('requestQuery in generate.ts', requestQuery)
  const response: any = await openai.createCompletion({
    model: 'text-davinci-003',
    // TODO: create the query
    prompt: `You are an itinerary planner. You are planning a trip to ${destination} in ${timeOfYear}, for ${people} travelers, preferably with some activity that is ${activity}, staying for ${duration} days. I want you to create a JSON object with the following properties:

1. "title" - a string title for the trip.
2. "destination" - a string, which is "${destination}".
3. "proposedDates" - an array of dates in the "mm/dd/yy" format. Please, propose dates that are in the future from June 3rd 2023.
4. "details" - an object where each key is a date from the "proposedDates" array, and each value is another object. This nested object should have three keys: "Morning", "Afternoon", "Evening", each containing a string with itinerary details for that date and time of day. The activities you propose for each day should be within 10 miles of each other.

Start and end the response with curly braces {} to ensure it's a valid JSON object. Remember, each property in the JSON object should be a key-value pair with the key and value enclosed in double quotes "" (except for numbers and booleans). Here's an example structure of how I want the JSON object to look:

{
  "title": "The title of the trip",
  "destination": "The destination of the trip",
  "proposedDates": ["01/01/23", "01/02/23"],
  "details": {
    "01/01/23": {
      "Morning": "Morning itinerary",
      "Afternoon": "Afternoon itinerary",
      "Evening": "Evening itinerary"
    },
    "01/02/23": {
      "Morning": "Morning itinerary",
      "Afternoon": "Afternoon itinerary",
      "Evening": "Evening itinerary"
    }
  }
}`,
    // prompt: `You are an itinerary planner. You are planning a trip to ${destination} in ${timeOfYear}, for ${people} travelers, preferably with some activity that is ${activity}, staying for ${duration} days. You're giving back a JSON object with the following properties: title, destination, proposed dates, and then a 'details' property that is an array of objects, each containing each date as the key, and within the key's value, you give me a proposed itinerary in the form of key-value, where keys are 'Morning', 'Afternoon', 'Evening', and values are the itinerary details for that date and time of day. The activities for each day you come up with should be within 10 miles of each other. All dates should be in a mm/dd/yy format. It is June 3rd 2023 today, so use dates in the future when giving the response.`,
    // prompt: `You are an itinerary planner. You are planning a trip to ${destination} in ${timeOfYear}, for ${people}, preferably with some activity that is ${activity}, staying for ${duration}. Respond with a JSON object containing a javascript object that has a key-value pair with "destination" as key and "cancun" as value `,
    max_tokens: 1000,
    temperature: 0
  })

  return response.data.choices[0].text
}

export default generate
