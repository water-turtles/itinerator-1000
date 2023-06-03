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
    prompt: `You are an itinerary planner. You are planning a trip to ${destination} in ${timeOfYear}, for ${people}, preferably with some activity that is ${activity}, staying for ${duration}. You're giving back a JSON object with the following properties: title, destination, proposed dates, and then a 'details' property that contains each date as the key, and within the key's value, you give me a proposed itinerary in the form of key-value, where keys are 'Morning', 'Afternoon', 'Evening', and values are the itinerary details for that date and time of day. The activities for each day you come up with should be within 10 miles of each other. `,
    // prompt: `You are an itinerary planner. You are planning a trip to ${destination} in ${timeOfYear}, for ${people}, preferably with some activity that is ${activity}, staying for ${duration}. Respond with a JSON object containing a javascript object that has a key-value pair with "destination" as key and "cancun" as value `,
    max_tokens: 100,
    temperature: 0
  })

  return response.data.choices[0].text
}

export default generate
