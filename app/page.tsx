'use client';
// const apiKey = process.env.OPENAI_API_KEY;

import { useState } from 'react';
import { Message, continueConversation } from './actions';
import { readStreamableValue } from 'ai/rsc';

// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export default function Home() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
      <div className='w-full max-w-md'>
        {conversation.map((message, index) => (
          <div key={index} className='mb-2 p-2 border rounded'>
            <strong>{message.role}</strong>: {message.content}
          </div>
        ))}
      </div>

      <div className='w-full max-w-md mt-4'>
         <label htmlFor='userInput' className='block mb-2'>Your message:</label>
        <input
          id='userInput'
          type='text'
          value={input}
          placeholder='Type your message here'
          onChange={event => {
            setInput(event.target.value);
          }}
          className='w-full px-3 py-2 mb-4 border rounded'
        />
        <button
        type='button'
          onClick={async () => {
            const { messages, newMessage } = await continueConversation([
              ...conversation,
              { role: 'user', content: input },
            ]);

            let textContent = '';

            for await (const delta of readStreamableValue(newMessage)) {
              textContent = `${textContent}${delta}`;

              setConversation([
                ...messages,
                { role: 'assistant', content: textContent },
              ]);
            }
          }}
        >
          Send Message
        </button>
      </div>
    </div>
  );
}