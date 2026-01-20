'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { X, Send, MessageSquare, Bot, User, Loader2, FileCode, FolderOpen, Info, BookOpen, Search } from 'lucide-react';

export function XAlgoChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({ api: '/api/x-algo' }),
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status !== 'ready') return;
    sendMessage({ text: input });
    setInput('');
  };

  const getToolIcon = (toolName: string) => {
    switch (toolName) {
      case 'getFileContent':
        return <FileCode className="size-3" />;
      case 'listRepoContents':
        return <FolderOpen className="size-3" />;
      case 'getRepoInfo':
        return <Info className="size-3" />;
      case 'getReadme':
        return <BookOpen className="size-3" />;
      case 'searchRepoCode':
        return <Search className="size-3" />;
      default:
        return <Bot className="size-3" />;
    }
  };

  const getToolLabel = (toolName: string) => {
    switch (toolName) {
      case 'getFileContent':
        return 'Reading file';
      case 'listRepoContents':
        return 'Browsing repository';
      case 'getRepoInfo':
        return 'Getting repo info';
      case 'getReadme':
        return 'Reading README';
      case 'searchRepoCode':
        return 'Searching code';
      default:
        return toolName;
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-background shadow-lg transition-all hover:scale-105 hover:shadow-xl',
          isOpen && 'scale-0 opacity-0'
        )}
      >
        <MessageSquare className="size-5" />
        <span className="font-medium">Ask x-algo</span>
      </button>

      {/* Chat Panel */}
      <div
        className={cn(
          'fixed bottom-6 right-6 z-50 flex h-[600px] w-[420px] flex-col overflow-hidden rounded-2xl border bg-background shadow-2xl transition-all duration-300',
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-foreground text-background">
              <Bot className="size-4" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">x-algorithm Assistant</h3>
              <p className="text-xs text-muted-foreground">Ask anything about the repo</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
                <Bot className="size-8 text-muted-foreground" />
              </div>
              <h4 className="mb-2 font-medium text-foreground">Welcome to x-algo Assistant</h4>
              <p className="mb-4 max-w-[280px] text-sm text-muted-foreground">
                I can help you understand the x-algorithm repository by xAI. Ask me about:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['What is this repo?', 'Show me the structure', 'Explain the main code'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setInput(suggestion);
                    }}
                    className="rounded-full border bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex gap-3',
                    message.role === 'user' && 'flex-row-reverse'
                  )}
                >
                  <div
                    className={cn(
                      'flex size-7 shrink-0 items-center justify-center rounded-full',
                      message.role === 'user'
                        ? 'bg-foreground text-background'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {message.role === 'user' ? (
                      <User className="size-4" />
                    ) : (
                      <Bot className="size-4" />
                    )}
                  </div>
                  <div
                    className={cn(
                      'max-w-[85%] space-y-2',
                      message.role === 'user' && 'text-right'
                    )}
                  >
                    {message.parts.map((part, index) => {
                      if (part.type === 'text') {
                        return (
                          <div
                            key={index}
                            className={cn(
                              'rounded-2xl px-4 py-2.5 text-sm',
                              message.role === 'user'
                                ? 'bg-foreground text-background'
                                : 'bg-muted text-foreground'
                            )}
                          >
                            <div className="prose prose-sm dark:prose-invert max-w-none break-words">
                              {part.text.split('```').map((segment, i) => {
                                if (i % 2 === 1) {
                                  const lines = segment.split('\n');
                                  const language = lines[0];
                                  const code = lines.slice(1).join('\n');
                                  return (
                                    <pre key={i} className="my-2 overflow-x-auto rounded-lg bg-background/50 p-3 text-xs">
                                      <code>{code || segment}</code>
                                    </pre>
                                  );
                                }
                                return <span key={i} className="whitespace-pre-wrap">{segment}</span>;
                              })}
                            </div>
                          </div>
                        );
                      }

                      // Handle tool calls
                      if (part.type.startsWith('tool-')) {
                        const toolName = part.type.replace('tool-', '');
                        const state = (part as { state?: string }).state;
                        
                        return (
                          <div
                            key={index}
                            className="flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-2 text-xs text-muted-foreground"
                          >
                            {getToolIcon(toolName)}
                            <span>{getToolLabel(toolName)}</span>
                            {state === 'input-available' && (
                              <Loader2 className="size-3 animate-spin" />
                            )}
                            {state === 'output-available' && (
                              <span className="text-green-600">Done</span>
                            )}
                          </div>
                        );
                      }

                      return null;
                    })}
                  </div>
                </div>
              ))}
              
              {(status === 'submitted' || status === 'streaming') && (
                <div className="flex gap-3">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Bot className="size-4" />
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl bg-muted px-4 py-2.5 text-sm text-muted-foreground">
                    <Loader2 className="size-4 animate-spin" />
                    <span>{status === 'submitted' ? 'Thinking...' : 'Responding...'}</span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="border-t bg-muted/30 p-4">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about x-algorithm..."
              disabled={status !== 'ready'}
              className="flex-1 rounded-xl border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 disabled:opacity-50"
            />
            {status === 'streaming' ? (
              <Button
                type="button"
                onClick={() => stop()}
                variant="outline"
                size="icon"
                className="shrink-0 rounded-xl"
              >
                <X className="size-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={status !== 'ready' || !input.trim()}
                size="icon"
                className="shrink-0 rounded-xl bg-foreground text-background hover:bg-foreground/90"
              >
                <Send className="size-4" />
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
