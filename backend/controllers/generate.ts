import openai from '../openAi/openAi-api'

const generate = async (requestQuery: any) => {
  const { destination, season, activityType, numTravlers, family, duration } = requestQuery
  const familyFlag = family ? '' : 'not'
  const response = await openai.createCompletion({
    model: 'text-ada-001',
    // TODO: create the query
    prompt: `You are an itinerary planner. You are planning a trip to ${destination} in ${season}, for ${numTravlers} travelers that are ${familyFlag} family, preferably with some activity that is ${activityType}, staying for ${duration} days. You're giving back a JSON object with the following properties: title, destination, proposed dates, and then a 'details' property that contains each date as the key, and within the key's value, you give me a proposed itinerary in the form of key-value, where keys are 'Morning', 'Afternoon', 'Evening', and values are the itinerary details for that date and time of day. The activities for each day you come up with should be within 10 miles of each other.`,
    max_tokens: 100,
    temperature: 0
  })
  return response.data.choices[0].text
}

export default generate
