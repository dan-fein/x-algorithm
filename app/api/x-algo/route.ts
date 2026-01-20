import { createAgentUIStreamResponse } from 'ai';
import { xAlgoAgent } from '@/lib/x-algo-agent';

export const maxDuration = 60;

export async function POST(request: Request) {
  const { messages } = await request.json();

  return createAgentUIStreamResponse({
    agent: xAlgoAgent,
    uiMessages: messages,
  });
}
