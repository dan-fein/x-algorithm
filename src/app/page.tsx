import { Navigation } from '@/components/Navigation';
import { TerminalWindow } from '@/components/TerminalWindow';
import data from '@/data/metadata.json';

const GITHUB_BASE = 'https://github.com/xai-org/x-algorithm';

const sources = {
  weightedScorer: `${GITHUB_BASE}/blob/main/home-mixer/scorers/weighted_scorer.rs`,
  oonScorer: `${GITHUB_BASE}/blob/main/home-mixer/scorers/oon_scorer.rs`,
  authorDiversity: `${GITHUB_BASE}/blob/main/home-mixer/scorers/author_diversity_scorer.rs`,
  thunder: `${GITHUB_BASE}/blob/main/thunder/thunder_service.rs`,
  phoenixPipeline: `${GITHUB_BASE}/blob/main/home-mixer/candidate_pipeline/phoenix_candidate_pipeline.rs`,
  grok: `${GITHUB_BASE}/blob/main/phoenix/grok.py`,
  query: `${GITHUB_BASE}/blob/main/home-mixer/candidate_pipeline/query.rs`,
  libRs: `${GITHUB_BASE}/blob/main/home-mixer/lib.rs`,
  ageFilter: `${GITHUB_BASE}/blob/main/home-mixer/filters/age_filter.rs`,
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-12">
          <pre className="ascii-art mb-6">{`
██╗  ██╗     █████╗ ██╗      ██████╗  ██████╗
╚██╗██╔╝    ██╔══██╗██║     ██╔════╝ ██╔═══██╗
 ╚███╔╝     ███████║██║     ██║  ███╗██║   ██║
 ██╔██╗     ██╔══██║██║     ██║   ██║██║   ██║
██╔╝ ██╗    ██║  ██║███████╗╚██████╔╝╚██████╔╝
╚═╝  ╚═╝    ╚═╝  ╚═╝╚══════╝ ╚═════╝  ╚═════╝`}</pre>

          <p className="mb-4">
            <span className="text-green">$</span> cat README.md
          </p>

          <div className="space-y-3 text-[#808080]">
            <p>
              Every post on X is scored by a neural network that predicts
              how likely you are to engage with it.
            </p>
            <p>
              X open-sourced their recommendation algorithm. This is the
              technical breakdown—19 engagement signals, weighted scoring,
              12 hard filters, all extracted from the source code.
            </p>
          </div>

          <p className="mt-6 text-dim text-sm">
            Last updated: {data.lastUpdated} | Source:{' '}
            <a href={GITHUB_BASE} className="underline hover:text-[#a0a0a0]">
              xai-org/x-algorithm
            </a>
          </p>
        </header>

        {/* TL;DR */}
        <section id="tldr" className="section">
          <p className="mb-4"><span className="text-green">$</span> ./tldr.sh</p>

          <TerminalWindow title="output">
            <pre className="text-sm">{`SUCCESS = engagement_prediction + in_network + fresh + unique
FAILURE = old (>7d) | blocked | muted | duplicate | negative_signals

Factors:
  - 19 engagement probabilities (like, reply, repost, dwell, etc.)
  - In-network posts get full score, out-of-network ~0.5-0.8x
  - Author diversity decay (2nd post ~0.65x, 3rd ~0.47x)
  - 12 hard filters remove posts entirely before scoring`}</pre>
          </TerminalWindow>
        </section>

        {/* Engagement Signals */}
        <section id="engagement" className="section">
          <p className="mb-4">
            <span className="text-green">$</span> cat engagement_signals.txt
          </p>
          <p className="text-dim text-sm mb-4">
            <a href={sources.grok} className="underline">phoenix/grok.py</a>
          </p>

          <TerminalWindow title="19 signals">
            <pre className="text-sm">{`POSITIVE (15):
  favorite_score      reply_score         repost_score
  share_score         share_via_dm_score  share_via_copy_link_score
  click_score         profile_click_score photo_expand_score
  vqv_score           quote_score         quoted_click_score
  dwell_score         dwell_time          follow_author_score

NEGATIVE (4):
  not_interested_score    block_author_score
  mute_author_score       report_score`}</pre>
          </TerminalWindow>
        </section>

        {/* Scoring */}
        <section id="scoring" className="section">
          <p className="mb-4">
            <span className="text-green">$</span> cat weighted_scorer.rs
          </p>
          <p className="text-dim text-sm mb-4">
            <a href={sources.weightedScorer} className="underline">home-mixer/scorers/weighted_scorer.rs</a>
          </p>

          <TerminalWindow title="formula">
            <pre className="text-sm">{`score = sum(signal_i * WEIGHT_i) + NEGATIVE_OFFSET

// Each signal multiplied by learned weight
// Negative signals subtract from score
// Weights are proprietary (not in open source)`}</pre>
          </TerminalWindow>
        </section>

        {/* Network */}
        <section id="network" className="section">
          <p className="mb-4">
            <span className="text-green">$</span> cat oon_scorer.rs
          </p>
          <p className="text-dim text-sm mb-4">
            <a href={sources.oonScorer} className="underline">home-mixer/scorers/oon_scorer.rs</a>
          </p>

          <TerminalWindow title="in-network vs out-of-network">
            <pre className="text-sm">{`if (candidate.in_network == false) {
    score = score * OON_WEIGHT_FACTOR;  // ~0.5-0.8
}

IN_NETWORK:  users you follow    -> full score (1.0x)
OUT_NETWORK: recommended content -> reduced (~0.5-0.8x)`}</pre>
          </TerminalWindow>
        </section>

        {/* Diversity */}
        <section id="diversity" className="section">
          <p className="mb-4">
            <span className="text-green">$</span> cat author_diversity_scorer.rs
          </p>
          <p className="text-dim text-sm mb-4">
            <a href={sources.authorDiversity} className="underline">home-mixer/scorers/author_diversity_scorer.rs</a>
          </p>

          <TerminalWindow title="author diversity decay">
            <pre className="text-sm">{`multiplier = (1.0 - floor) * decay^position + floor

Post #  Multiplier  Effect
1       1.0x        full score
2       ~0.65x      significant reduction
3       ~0.47x      halved
4+      ~0.3x       floor (minimum)`}</pre>
          </TerminalWindow>
        </section>

        {/* Time */}
        <section id="time" className="section">
          <p className="mb-4">
            <span className="text-green">$</span> cat thunder_service.rs
          </p>
          <p className="text-dim text-sm mb-4">
            <a href={sources.thunder} className="underline">thunder/thunder_service.rs</a>
          </p>

          <TerminalWindow title="freshness">
            <pre className="text-sm">{`ORDER BY created_at DESC  // newer posts first

if (post.age > MAX_POST_AGE) {
    FILTER_OUT;  // typically ~7 days
}

// No exponential decay formula
// Time sensitivity learned by transformer`}</pre>
          </TerminalWindow>
        </section>

        {/* Filters */}
        <section id="filters" className="section">
          <p className="mb-4">
            <span className="text-green">$</span> ls filters/
          </p>
          <p className="text-dim text-sm mb-4">
            <a href={sources.phoenixPipeline} className="underline">home-mixer/candidate_pipeline/phoenix_candidate_pipeline.rs</a>
          </p>

          <TerminalWindow title="12 hard filters">
            <pre className="text-sm">{`AgeFilter                    Posts > MAX_POST_AGE (~7 days)
SelfTweetFilter              Your own posts
AuthorSocialgraphFilter      Blocked/muted users
MutedKeywordFilter           Your muted keywords
PreviouslySeenPostsFilter    Already seen (bloom filter)
PreviouslyServedPostsFilter  Served this session
DropDuplicatesFilter         Duplicate IDs
RetweetDeduplicationFilter   Duplicate retweets
CoreDataHydrationFilter      Failed to load
IneligibleSubscriptionFilter Paywalled without subscription
VFFilter                     Spam, violence, deleted
DedupConversationFilter      Duplicate threads`}</pre>
          </TerminalWindow>
        </section>

        {/* Pipeline */}
        <section id="pipeline" className="section">
          <p className="mb-4">
            <span className="text-green">$</span> cat pipeline.txt
          </p>

          <TerminalWindow title="execution order">
            <pre className="text-sm">{`1. HYDRATION     Fetch user history, following list
2. RETRIEVAL     Thunder (in-network) + Phoenix (out-of-network)
3. HYDRATION     Fetch post metadata, author info
4. FILTERING     Apply 12 hard filters
5. SCORING       Phoenix transformer -> 19 probabilities
                 WeightedScorer -> single score
                 AuthorDiversity -> attenuate repeats
                 OONScorer -> network adjustment
6. SELECTION     Sort by score, select top K
7. SAFETY        Visibility filtering, dedup`}</pre>
          </TerminalWindow>
        </section>

        {/* Sources */}
        <section id="sources" className="section">
          <p className="mb-4">
            <span className="text-green">$</span> ls -la src/
          </p>

          <TerminalWindow title="source files">
            <pre className="text-sm">{`weighted_scorer.rs      Scoring formula
oon_scorer.rs           Network adjustment
author_diversity.rs     Diversity decay
phoenix_pipeline.rs     Full pipeline
thunder_service.rs      In-network retrieval
grok.py                 Transformer model
query.rs                User features
lib.rs                  Module declarations (params excluded)`}</pre>
          </TerminalWindow>

          <p className="mt-4 text-dim text-sm">
            All links: <a href={GITHUB_BASE} className="underline">github.com/xai-org/x-algorithm</a>
          </p>
        </section>

        {/* Bottom TL;DR */}
        <section className="section">
          <p className="mb-4">
            <span className="text-green">$</span> ./summary.sh
          </p>

          <TerminalWindow title="takeaways">
            <pre className="text-sm">{`WHAT WORKS:
  - High engagement prediction (replies > likes)
  - From accounts viewer follows
  - Recent content
  - Unique (not seen before)
  - First post from author in batch

WHAT FAILS:
  - Old (>7 days)
  - From blocked/muted users
  - Contains muted keywords
  - Duplicate content
  - High block/mute/report prediction
  - Safety violations

REALITY:
  - Algorithm optimizes for engagement, not quality
  - Scored per-viewer (what works varies)
  - Weights are proprietary

$ exit 0`}</pre>
          </TerminalWindow>
        </section>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-[#222] text-dim text-sm">
          <p>
            Source: <a href={GITHUB_BASE} className="underline">xai-org/x-algorithm</a>
            {' '}| Project: <a href="https://github.com/dan-fein/x-algorithm" className="underline">dan-fein/x-algorithm</a>
          </p>
          <p className="mt-2">Last updated: {data.lastUpdated}</p>
          <div className="mt-4">
            <span className="cursor" />
          </div>
        </footer>
      </main>
    </div>
  );
}
