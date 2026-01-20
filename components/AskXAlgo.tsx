'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';

export function AskXAlgo() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  const isLoading = status === 'streaming' || status === 'submitted';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput('');
  };

  const suggestedQuestions = [
    'How does the scoring algorithm work?',
    'What are the 19 engagement signals?',
    'How does author diversity affect rankings?',
    'What filters remove posts from the feed?',
  ];

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 px-4 py-2.5 bg-[--terminal-green] text-[--ds-gray-1000] font-medium text-sm hover:bg-[--ds-gray-300] hover:text-[--ds-gray-1000] transition-colors flex items-center gap-2 rounded-md shadow-lg"
      >
        <span className="text-lg">{'>'}_</span>
        Ask x-algo
      </button>

      {/* Chat modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl h-[600px] max-h-[80vh] bg-[--ds-gray-1000] border border-[--ds-border] rounded-lg flex flex-col overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[--ds-border] bg-[--ds-gray-900]">
              <div className="flex items-center gap-2">
                <span className="text-[--terminal-green]">{'>'}_</span>
                <span className="font-medium text-[--ds-gray-200]">Ask x-algo</span>
                <span className="text-xs text-[--ds-gray-500]">AI assistant</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="px-2 py-1 text-[--ds-gray-400] hover:text-[--ds-gray-200] transition-colors"
              >
                [x]
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col justify-center">
                  <div className="text-center mb-6">
                    <p className="text-[--ds-gray-400] mb-2">
                      Ask anything about the X algorithm
                    </p>
                    <p className="text-[--ds-gray-500] text-sm">
                      I can read and analyze the actual source code
                    </p>
                  </div>
                  <div className="grid gap-2 max-w-md mx-auto">
                    {suggestedQuestions.map((question, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          sendMessage({ text: question });
                        }}
                        className="text-left px-3 py-2 text-sm text-[--ds-gray-400] border border-[--ds-border] rounded hover:border-[--ds-gray-600] hover:text-[--ds-gray-300] transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-3 py-2 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-[--terminal-green] text-[--ds-gray-1000]'
                          : 'bg-[--ds-gray-900] text-[--ds-gray-300] border border-[--ds-border]'
                      }`}
                    >
                      {message.parts.map((part, index) => {
                        if (part.type === 'text') {
                          return (
                            <div key={index} className="whitespace-pre-wrap text-sm leading-relaxed">
                              <FormattedMessage text={part.text} />
                            </div>
                          );
                        }
                        // Handle tool calls
                        if (part.type === 'tool-getRepoOverview') {
                          return (
                            <div key={index} className="text-xs text-[--ds-gray-500] italic my-1">
                              {part.state === 'input-available' && 'Getting repository overview...'}
                              {part.state === 'output-available' && 'Repository overview loaded'}
                            </div>
                          );
                        }
                        if (part.type === 'tool-listFiles') {
                          return (
                            <div key={index} className="text-xs text-[--ds-gray-500] italic my-1">
                              {part.state === 'input-available' && `Listing files in ${part.input?.path || 'root'}...`}
                              {part.state === 'output-available' && `Listed ${part.output?.count || 0} files`}
                            </div>
                          );
                        }
                        if (part.type === 'tool-readFile') {
                          return (
                            <div key={index} className="text-xs text-[--ds-gray-500] italic my-1">
                              {part.state === 'input-available' && `Reading ${part.input?.path}...`}
                              {part.state === 'output-available' && `Read file: ${part.input?.path}`}
                            </div>
                          );
                        }
                        if (part.type === 'tool-searchCode') {
                          return (
                            <div key={index} className="text-xs text-[--ds-gray-500] italic my-1">
                              {part.state === 'input-available' && `Searching for "${part.input?.query}"...`}
                              {part.state === 'output-available' && `Found ${part.output?.total_count || 0} results`}
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                ))
              )}
              {isLoading && messages.length > 0 && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex justify-start">
                  <div className="px-3 py-2 bg-[--ds-gray-900] border border-[--ds-border] rounded-lg">
                    <span className="text-[--terminal-green] animate-pulse">{'>'}_</span>
                    <span className="text-[--ds-gray-500] ml-2 text-sm">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-[--ds-border]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about the algorithm..."
                  disabled={isLoading}
                  className="flex-1 px-3 py-2 bg-[--ds-gray-900] border border-[--ds-border] rounded text-[--ds-gray-200] text-sm placeholder:text-[--ds-gray-600] focus:outline-none focus:border-[--ds-gray-600] disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="px-4 py-2 bg-[--terminal-green] text-[--ds-gray-1000] font-medium text-sm rounded hover:bg-[--ds-gray-300] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// Helper component to format markdown-like text
function FormattedMessage({ text }: { text: string }) {
  // Simple markdown-ish formatting
  const parts = text.split(/(```[\s\S]*?```|`[^`]+`|\*\*[^*]+\*\*)/g);

  return (
    <>
      {parts.map((part, i) => {
        // Code blocks
        if (part.startsWith('```') && part.endsWith('```')) {
          const code = part.slice(3, -3);
          const lines = code.split('\n');
          const lang = lines[0].match(/^\w+$/) ? lines.shift() : '';
          return (
            <pre
              key={i}
              className="my-2 p-2 bg-[--ds-gray-800] rounded text-xs overflow-x-auto"
            >
              {lang && (
                <div className="text-[--ds-gray-500] mb-1 text-[10px] uppercase">{lang}</div>
              )}
              <code>{lines.join('\n')}</code>
            </pre>
          );
        }
        // Inline code
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={i} className="px-1 py-0.5 bg-[--ds-gray-800] rounded text-[--terminal-green] text-xs">
              {part.slice(1, -1)}
            </code>
          );
        }
        // Bold
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="font-semibold text-[--ds-gray-200]">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
