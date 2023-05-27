import { Configuration, OpenAIApi } from 'openai'
import dotenv from 'dotenv'
dotenv.config()

const openaiApiKey: string | undefined = process.env.OPENAI_API_KEY

if (!openaiApiKey) {
  console.error('OPENAI_API_KEY is not set.')
  process.exit(1)
}

const configuration: Configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai: OpenAIApi = new OpenAIApi(configuration)

export default openai
