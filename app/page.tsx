import { Navigation } from "@/components/Navigation";
import { TerminalWindow } from "@/components/TerminalWindow";
import { AskAlgoChat } from "@/components/AskAlgoChat";
import { Github, Code, Layers, Zap, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navigation />
      <AskAlgoChat />

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-16">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="font-mono text-sm text-emerald-400">
              Open Source
            </span>
          </div>

          <h1 className="mb-6 text-balance font-mono text-5xl font-bold leading-tight text-zinc-100 md:text-7xl">
            <span className="text-emerald-400">x</span>-algorithm
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-pretty font-mono text-lg text-zinc-400 md:text-xl">
            The open source recommendation algorithm powering the For You
            timeline. Explore, understand, and contribute.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="https://github.com/xai-org/x-algorithm"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md border border-emerald-500 bg-emerald-500/20 px-6 py-3 font-mono text-sm font-medium text-emerald-400 transition-all hover:bg-emerald-500/30"
            >
              <Github className="h-5 w-5" />
              View on GitHub
            </Link>
            <Link
              href="#features"
              className="flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900 px-6 py-3 font-mono text-sm font-medium text-zinc-300 transition-all hover:border-zinc-600 hover:bg-zinc-800"
            >
              Learn More
            </Link>
          </div>

          {/* Terminal Preview */}
          <div className="mt-16">
            <TerminalWindow title="~/x-algorithm" typingEffect>
              {`$ git clone https://github.com/xai-org/x-algorithm.git
Cloning into 'x-algorithm'...
remote: Enumerating objects: done.
remote: Total 1247 (delta 0), reused 0 (delta 0)
Receiving objects: 100% (1247/1247), done.

$ cd x-algorithm && cat README.md
# X Algorithm
The algorithm that powers the For You timeline...`}
            </TerminalWindow>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-mono text-3xl font-bold text-zinc-100 md:text-4xl">
              What&apos;s Inside
            </h2>
            <p className="mx-auto max-w-2xl font-mono text-zinc-400">
              Explore the components that power content ranking and
              recommendations
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Code className="h-6 w-6" />}
              title="Ranking Algorithm"
              description="The core ranking logic that scores and orders content for maximum relevance and engagement."
            />
            <FeatureCard
              icon={<Layers className="h-6 w-6" />}
              title="ML Models"
              description="Machine learning models for content understanding, user preference modeling, and prediction."
            />
            <FeatureCard
              icon={<Zap className="h-6 w-6" />}
              title="Real-time Processing"
              description="Systems for processing signals and updating rankings in real-time as new content arrives."
            />
            <FeatureCard
              icon={<Users className="h-6 w-6" />}
              title="User Modeling"
              description="How user preferences and behaviors are captured and used to personalize content."
            />
            <FeatureCard
              icon={<Github className="h-6 w-6" />}
              title="Open Source"
              description="Full transparency into how content is ranked. Contribute, audit, and improve the algorithm."
            />
            <FeatureCard
              icon={
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              }
              title="For You Timeline"
              description="Powers the personalized content feed seen by hundreds of millions of users daily."
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="border-t border-zinc-800 px-4 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-4 font-mono text-3xl font-bold text-zinc-100">
                About the Project
              </h2>
              <p className="mb-4 font-mono text-zinc-400 leading-relaxed">
                The x-algorithm repository contains the source code for the
                recommendation system that determines what content appears in
                your For You timeline.
              </p>
              <p className="font-mono text-zinc-400 leading-relaxed">
                This open source release enables researchers, developers, and
                the community to understand, audit, and contribute to how
                content is ranked and recommended.
              </p>
            </div>
            <div>
              <TerminalWindow title="stats">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Language</span>
                    <span>Scala / Python</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">License</span>
                    <span>AGPL-3.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Stars</span>
                    <span>62k+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Forks</span>
                    <span>11k+</span>
                  </div>
                </div>
              </TerminalWindow>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <span className="font-mono text-sm text-zinc-500">
              x-algorithm documentation site
            </span>
            <div className="flex items-center gap-6">
              <Link
                href="https://github.com/xai-org/x-algorithm"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-zinc-500 transition-colors hover:text-emerald-400"
              >
                GitHub
              </Link>
              <Link
                href="https://github.com/xai-org/x-algorithm/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-zinc-500 transition-colors hover:text-emerald-400"
              >
                License
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-emerald-500/30 hover:bg-zinc-900">
      <div className="mb-4 inline-flex rounded-md border border-emerald-500/30 bg-emerald-500/10 p-2 text-emerald-400">
        {icon}
      </div>
      <h3 className="mb-2 font-mono text-lg font-semibold text-zinc-100">
        {title}
      </h3>
      <p className="font-mono text-sm text-zinc-400 leading-relaxed">{description}</p>
    </div>
  );
}
