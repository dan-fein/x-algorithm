import { XAlgoChat } from '@/components/x-algo-chat';
import { ExternalLink, Github, Cpu, Code2, Sparkles, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/50 via-background to-background" />
        <div className="relative mx-auto max-w-5xl px-6 py-24">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
              <Sparkles className="size-4" />
              <span>Powered by AI SDK v6</span>
            </div>
            
            <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight text-foreground md:text-6xl">
              Explore the
              <span className="relative mx-3">
                <span className="relative z-10">x-algorithm</span>
                <span className="absolute -inset-1 -skew-y-1 bg-foreground/10" />
              </span>
              Repository
            </h1>
            
            <p className="mb-8 max-w-2xl text-pretty text-lg text-muted-foreground">
              An AI-powered assistant that helps you understand and explore the x-algorithm repository by xAI. 
              Ask questions, browse code, and get explanations in real-time.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://github.com/xai-org/x-algorithm"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                <Github className="size-4" />
                View on GitHub
                <ExternalLink className="size-3" />
              </a>
              <button
                onClick={() => {
                  const chatButton = document.querySelector('[data-chat-trigger]');
                  if (chatButton instanceof HTMLElement) chatButton.click();
                }}
                className="flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Start Exploring
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="border-t bg-muted/20 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">How it works</h2>
            <p className="text-muted-foreground">
              The assistant uses AI SDK v6 with ToolLoopAgent to intelligently explore the repository
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border bg-background p-6">
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-muted">
                <Github className="size-6 text-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">GitHub Integration</h3>
              <p className="text-sm text-muted-foreground">
                The agent can browse directories, read files, and search code directly from the x-algorithm repository.
              </p>
            </div>
            
            <div className="rounded-2xl border bg-background p-6">
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-muted">
                <Cpu className="size-6 text-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">ToolLoopAgent</h3>
              <p className="text-sm text-muted-foreground">
                Uses AI SDK v6 ToolLoopAgent to iterate through tools until it has enough information to answer your question.
              </p>
            </div>
            
            <div className="rounded-2xl border bg-background p-6">
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-muted">
                <Code2 className="size-6 text-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">Real-time Streaming</h3>
              <p className="text-sm text-muted-foreground">
                Watch as the agent explores the repository in real-time, with tool calls and responses streaming to your chat.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Available Tools Section */}
      <div className="border-t py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">Agent Capabilities</h2>
            <p className="text-muted-foreground">
              The assistant has access to these tools to explore the repository
            </p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { name: 'getReadme', description: 'Read the README to understand the project overview' },
              { name: 'getRepoInfo', description: 'Get repository metadata like stars, forks, and language' },
              { name: 'listRepoContents', description: 'Browse directories and files in the repository' },
              { name: 'getFileContent', description: 'Read the full content of any source file' },
              { name: 'searchRepoCode', description: 'Search for specific code patterns or functions' },
            ].map((tool) => (
              <div
                key={tool.name}
                className="flex items-start gap-4 rounded-xl border bg-muted/30 p-4"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-background font-mono text-xs text-foreground">
                  fn
                </div>
                <div>
                  <code className="text-sm font-medium text-foreground">{tool.name}()</code>
                  <p className="mt-1 text-sm text-muted-foreground">{tool.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="mx-auto max-w-5xl px-6 text-center text-sm text-muted-foreground">
          <p>
            Built with{' '}
            <a href="https://sdk.vercel.ai" className="underline hover:text-foreground" target="_blank" rel="noopener noreferrer">
              AI SDK v6
            </a>
            {' '}and{' '}
            <a href="https://nextjs.org" className="underline hover:text-foreground" target="_blank" rel="noopener noreferrer">
              Next.js
            </a>
          </p>
        </div>
      </footer>

      {/* Chat Widget */}
      <XAlgoChat />
    </main>
  );
}
