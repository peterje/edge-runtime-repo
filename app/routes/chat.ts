import { ActionFunctionArgs } from "@vercel/remix";
import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
export const config = {runtime: 'edge'}
 
export async function action({request}: ActionFunctionArgs) {
  const { message } = await request.json();
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {role: 'system', content: 'You are a helpful assistant.'},
      {role: 'user', content: message},
    ]
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
