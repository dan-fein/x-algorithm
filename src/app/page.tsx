import { Navigation } from '@/components/Navigation';
import { Section } from '@/components/Section';
import { TerminalWindow } from '@/components/TerminalWindow';

const GITHUB_BASE = 'https://github.com/xai-org/x-algorithm';
const LAST_UPDATED = '2025-01-20';

// GitHub source links
const sources = {
  weightedScorer: `${GITHUB_BASE}/blob/main/home-mixer/scorers/weighted_scorer.rs`,
  oonScorer: `${GITHUB_BASE}/blob/main/home-mixer/scorers/oon_scorer.rs`,
  authorDiversity: `${GITHUB_BASE}/blob/main/home-mixer/scorers/author_diversity_scorer.rs`,
  thunder: `${GITHUB_BASE}/blob/main/thunder/thunder_service.rs`,
  phoenixPipeline: `${GITHUB_BASE}/blob/main/home-mixer/candidate_pipeline/phoenix_candidate_pipeline.rs`,
  grok: `${GITHUB_BASE}/blob/main/phoenix/grok.py`,
  query: `${GITHUB_BASE}/blob/main/home-mixer/candidate_pipeline/query.rs`,
  params: `${GITHUB_BASE}/blob/main/home-mixer/params.rs`,
};

function SourceLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-cyan hover:underline inline-flex items-center gap-1"
    >
      {children}
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 lg:mr-72 py-8">
        {/* Header */}
        <header className="mb-12 pt-8">
          <div className="flex items-center gap-2 mb-4 text-dim text-sm">
            <span className="text-green">●</span>
            <span>x-algorithm.vercel.app</span>
          </div>

          <pre className="ascii-art mb-6 overflow-x-auto">{`
██╗  ██╗     █████╗ ██╗      ██████╗  ██████╗
╚██╗██╔╝    ██╔══██╗██║     ██╔════╝ ██╔═══██╗
 ╚███╔╝     ███████║██║     ██║  ███╗██║   ██║
 ██╔██╗     ██╔══██║██║     ██║   ██║██║   ██║
██╔╝ ██╗    ██║  ██║███████╗╚██████╔╝╚██████╔╝
╚═╝  ╚═╝    ╚═╝  ╚═╝╚══════╝ ╚═════╝  ╚═════╝
          `}</pre>

          <h1 className="text-2xl sm:text-3xl font-bold mb-4">
            <span className="text-dim">$</span> <span className="text-green">cat</span> algorithm_decoded.md
          </h1>

          <p className="text-dim leading-relaxed max-w-2xl">
            A comprehensive technical analysis of the X recommendation algorithm.
            What makes posts succeed or fail? 19 engagement signals, weighted scoring,
            hard filters, and soft penalties—all extracted from the open-source codebase.
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            <span className="badge badge-green">19 signals</span>
            <span className="badge badge-cyan">weighted scoring</span>
            <span className="badge badge-yellow">12 hard filters</span>
            <span className="badge badge-red">4 penalties</span>
          </div>

          <div className="mt-6 p-4 border border-[#30363d] rounded-md bg-[#161b22] text-sm">
            <div className="flex flex-wrap items-center gap-4 text-dim">
              <div>
                <span className="text-yellow">Last Updated:</span> {LAST_UPDATED}
              </div>
              <div>
                <span className="text-yellow">Source:</span>{' '}
                <a href={GITHUB_BASE} target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">
                  xai-org/x-algorithm
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Quick Summary */}
        <Section id="summary" title="TL;DR" number="00">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 border border-[#3fb950] rounded-md bg-[rgba(63,185,80,0.05)]">
              <h3 className="text-green font-bold mb-3">Posts Succeed When:</h3>
              <ul className="text-sm space-y-2 text-dim">
                <li>• High engagement prediction (likes, replies, reposts)</li>
                <li>• From accounts you follow</li>
                <li>• Recent (newer = better)</li>
                <li>• Unique content (not seen before)</li>
                <li>• Matches your history patterns</li>
              </ul>
            </div>
            <div className="p-4 border border-[#f85149] rounded-md bg-[rgba(248,81,73,0.05)]">
              <h3 className="text-red font-bold mb-3">Posts Fail When:</h3>
              <ul className="text-sm space-y-2 text-dim">
                <li>• Too old (&gt;7 days)</li>
                <li>• From blocked/muted users</li>
                <li>• Already seen before</li>
                <li>• Predicted negative reactions</li>
                <li>• Safety violations (spam, etc.)</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Engagement Signals */}
        <Section id="engagement" title="ENGAGEMENT_PREDICTIONS" number="01">
          <p className="text-dim mb-4">
            The Phoenix Transformer predicts <span className="text-cyan">19 distinct engagement probabilities</span> for each post.
            Each probability indicates how likely the viewing user is to take that action.
          </p>
          <p className="text-dim mb-6 text-sm">
            <SourceLink href={sources.grok}>View transformer model →</SourceLink>
          </p>

          <TerminalWindow title="positive_signals.json" className="mb-6">
            <table className="terminal-table">
              <thead>
                <tr>
                  <th>Signal</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="text-green">favorite_score</td><td>Probability user will like the post</td></tr>
                <tr><td className="text-green">reply_score</td><td>Probability user will reply</td></tr>
                <tr><td className="text-green">repost_score</td><td>Probability user will retweet</td></tr>
                <tr><td className="text-green">share_score</td><td>Probability user will share externally</td></tr>
                <tr><td className="text-green">share_via_dm_score</td><td>Probability user shares via DM</td></tr>
                <tr><td className="text-green">share_via_copy_link_score</td><td>Probability user copies the link</td></tr>
                <tr><td className="text-green">click_score</td><td>Probability user clicks on post</td></tr>
                <tr><td className="text-green">profile_click_score</td><td>Probability user clicks author profile</td></tr>
                <tr><td className="text-green">photo_expand_score</td><td>Probability user expands photos</td></tr>
                <tr><td className="text-green">vqv_score</td><td>Video Quality View probability</td></tr>
                <tr><td className="text-green">quote_score</td><td>Probability user will quote-tweet</td></tr>
                <tr><td className="text-green">quoted_click_score</td><td>Probability user clicks quoted tweet</td></tr>
                <tr><td className="text-green">dwell_score</td><td>Probability user dwells on post</td></tr>
                <tr><td className="text-yellow">dwell_time</td><td>Expected dwell duration (continuous)</td></tr>
                <tr><td className="text-green">follow_author_score</td><td>Probability user follows author</td></tr>
              </tbody>
            </table>
          </TerminalWindow>

          <TerminalWindow title="negative_signals.json">
            <table className="terminal-table">
              <thead>
                <tr>
                  <th>Signal</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="text-red">not_interested_score</td><td>Probability user marks &quot;not interested&quot;</td></tr>
                <tr><td className="text-red">block_author_score</td><td>Probability user blocks the author</td></tr>
                <tr><td className="text-red">mute_author_score</td><td>Probability user mutes the author</td></tr>
                <tr><td className="text-red">report_score</td><td>Probability user reports the post</td></tr>
              </tbody>
            </table>
          </TerminalWindow>
        </Section>

        {/* Scoring Formula */}
        <Section id="scoring" title="WEIGHTED_SCORING" number="02">
          <p className="text-dim mb-4">
            All 19 predictions are combined into a single score using learned weights.
          </p>
          <p className="text-dim mb-6 text-sm">
            <SourceLink href={sources.weightedScorer}>weighted_scorer.rs →</SourceLink>
          </p>

          <TerminalWindow title="scoring_formula.rs">
            <pre className="text-sm overflow-x-auto">
              <code>{`final_score =
    (favorite_score    × FAVORITE_WEIGHT)
  + (reply_score       × REPLY_WEIGHT)
  + (repost_score      × RETWEET_WEIGHT)
  + (photo_expand_score × PHOTO_EXPAND_WEIGHT)
  + (click_score       × CLICK_WEIGHT)
  + (profile_click_score × PROFILE_CLICK_WEIGHT)
  + (vqv_score         × VQV_WEIGHT)
  + (share_score       × SHARE_WEIGHT)
  + (share_via_dm_score × SHARE_VIA_DM_WEIGHT)
  + (share_via_copy_link_score × SHARE_VIA_COPY_LINK_WEIGHT)
  + (dwell_score       × DWELL_WEIGHT)
  + (quote_score       × QUOTE_WEIGHT)
  + (quoted_click_score × QUOTED_CLICK_WEIGHT)
  + (follow_author_score × FOLLOW_AUTHOR_WEIGHT)
  + (dwell_time        × CONT_DWELL_TIME_WEIGHT)
  `}<span className="text-red">{`+ (not_interested_score × NOT_INTERESTED_WEIGHT)  // negative
  + (block_author_score × BLOCK_AUTHOR_WEIGHT)      // negative
  + (mute_author_score × MUTE_AUTHOR_WEIGHT)        // negative
  + (report_score      × REPORT_WEIGHT)             // negative`}</span>{`
  + NEGATIVE_SCORES_OFFSET`}</code>
            </pre>
          </TerminalWindow>

          <div className="mt-4 p-4 border border-[#30363d] rounded-md bg-[#161b22]">
            <p className="text-yellow text-sm">
              <span className="font-bold">// NOTE:</span> Specific weight values are excluded from the open-source release.{' '}
              <SourceLink href={sources.params}>See params.rs →</SourceLink>
            </p>
          </div>
        </Section>

        {/* Network Effects */}
        <Section id="network" title="IN_NETWORK_VS_OUT_OF_NETWORK" number="03">
          <p className="text-dim mb-4">
            Posts from users you follow receive preferential treatment.
          </p>
          <p className="text-dim mb-6 text-sm">
            <SourceLink href={sources.oonScorer}>oon_scorer.rs →</SourceLink>
          </p>

          <TerminalWindow title="network_scoring.rs">
            <pre className="text-sm">
              <code>{`if candidate.in_network == false {
    adjusted_score = base_score × `}<span className="text-yellow">OON_WEIGHT_FACTOR</span>{`  // typically 0.5-0.8
} else {
    adjusted_score = base_score  // no penalty for in-network
}`}</code>
            </pre>
          </TerminalWindow>

          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="p-4 border border-[#3fb950] rounded-md bg-[rgba(63,185,80,0.05)]">
              <div className="text-green font-bold mb-2">IN_NETWORK</div>
              <ul className="text-sm space-y-1 text-dim">
                <li>• Posts from users you follow</li>
                <li>• Full score (1.0x multiplier)</li>
                <li>• Retrieved via Thunder service</li>
                <li>• Sorted by recency</li>
              </ul>
            </div>
            <div className="p-4 border border-[#f85149] rounded-md bg-[rgba(248,81,73,0.05)]">
              <div className="text-red font-bold mb-2">OUT_OF_NETWORK</div>
              <ul className="text-sm space-y-1 text-dim">
                <li>• Posts from non-followed users</li>
                <li>• Reduced score (0.5-0.8x)</li>
                <li>• Retrieved via ML similarity</li>
                <li>• Must have strong signals</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Author Diversity */}
        <Section id="diversity" title="AUTHOR_DIVERSITY" number="04">
          <p className="text-dim mb-4">
            Prevents feed domination by a single author through exponential decay.
          </p>
          <p className="text-dim mb-6 text-sm">
            <SourceLink href={sources.authorDiversity}>author_diversity_scorer.rs →</SourceLink>
          </p>

          <TerminalWindow title="diversity_formula.rs">
            <pre className="text-sm">
              <code>{`multiplier(position) = (1.0 - floor) × decay_factor^position + floor
adjusted_score = weighted_score × multiplier`}</code>
            </pre>
          </TerminalWindow>

          <div className="mt-6">
            <table className="terminal-table">
              <thead>
                <tr>
                  <th>Author&apos;s Post #</th>
                  <th>Multiplier</th>
                  <th>Effect</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-cyan">1st</td>
                  <td className="text-green">1.0x</td>
                  <td className="text-dim">Full score</td>
                </tr>
                <tr>
                  <td className="text-cyan">2nd</td>
                  <td className="text-yellow">~0.65x</td>
                  <td className="text-dim">Significant reduction</td>
                </tr>
                <tr>
                  <td className="text-cyan">3rd</td>
                  <td className="text-orange">~0.475x</td>
                  <td className="text-dim">Halved from original</td>
                </tr>
                <tr>
                  <td className="text-cyan">4th+</td>
                  <td className="text-red">≥0.3x (floor)</td>
                  <td className="text-dim">Minimum multiplier</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* Time Factors */}
        <Section id="time" title="TIME_AND_FRESHNESS" number="05">
          <p className="text-dim mb-4">
            Freshness is handled through sorting and hard cutoffs rather than decay functions.
          </p>
          <p className="text-dim mb-6 text-sm">
            <SourceLink href={sources.thunder}>thunder_service.rs →</SourceLink>
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <TerminalWindow title="recency.rs">
              <pre className="text-sm">
                <code>{`// In-network posts sorted by
ORDER BY created_at DESC

// Newest posts appear first`}</code>
              </pre>
            </TerminalWindow>

            <TerminalWindow title="age_filter.rs">
              <pre className="text-sm">
                <code>{`if post.age > `}<span className="text-red">MAX_POST_AGE</span>{` {
    `}<span className="text-red">FILTER_OUT</span>{`  // ~7 days
}`}</code>
              </pre>
            </TerminalWindow>
          </div>

          <div className="mt-4 p-4 border border-[#30363d] rounded-md bg-[#161b22]">
            <p className="text-dim text-sm">
              <span className="text-purple font-bold">// KEY INSIGHT:</span> Time decay is <span className="text-cyan">learned implicitly</span> by the
              transformer from engagement history timestamps—not hand-engineered with exponential formulas.
            </p>
          </div>
        </Section>

        {/* Hard Filters */}
        <Section id="filters" title="HARD_FILTERS" number="06">
          <p className="text-dim mb-4">
            These filters remove posts <span className="text-red">entirely</span> before scoring.
            No score can overcome them.
          </p>
          <p className="text-dim mb-6 text-sm">
            <SourceLink href={sources.phoenixPipeline}>phoenix_candidate_pipeline.rs →</SourceLink>
          </p>

          <TerminalWindow title="filters.rs" className="mb-4">
            <table className="terminal-table">
              <thead>
                <tr>
                  <th>Filter</th>
                  <th>Removes</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="text-red">AgeFilter</td><td>Posts older than MAX_POST_AGE (~7 days)</td></tr>
                <tr><td className="text-red">SelfTweetFilter</td><td>Your own posts from your feed</td></tr>
                <tr><td className="text-red">AuthorSocialgraphFilter</td><td>Posts from blocked/muted users</td></tr>
                <tr><td className="text-red">MutedKeywordFilter</td><td>Posts containing your muted keywords</td></tr>
                <tr><td className="text-red">PreviouslySeenPostsFilter</td><td>Posts you&apos;ve already seen (bloom filter)</td></tr>
                <tr><td className="text-red">PreviouslyServedPostsFilter</td><td>Posts served this session</td></tr>
                <tr><td className="text-red">DropDuplicatesFilter</td><td>Duplicate post IDs</td></tr>
                <tr><td className="text-red">RetweetDeduplicationFilter</td><td>Duplicate retweets</td></tr>
                <tr><td className="text-red">CoreDataHydrationFilter</td><td>Posts that failed to load</td></tr>
                <tr><td className="text-red">IneligibleSubscriptionFilter</td><td>Paywalled content without subscription</td></tr>
                <tr><td className="text-red">VFFilter</td><td>Deleted, spam, violence, safety violations</td></tr>
                <tr><td className="text-red">DedupConversationFilter</td><td>Duplicate conversation branches</td></tr>
              </tbody>
            </table>
          </TerminalWindow>
        </Section>

        {/* Soft Penalties */}
        <Section id="penalties" title="SOFT_PENALTIES" number="07">
          <p className="text-dim mb-6">
            These don&apos;t remove posts but <span className="text-yellow">reduce their score</span>.
            Posts can still appear if other signals are strong enough.
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 border border-[#30363d] rounded-md">
              <span className="text-red">01</span>
              <span className="text-dim">High <span className="text-cyan">not_interested_score</span> → Model predicts you&apos;ll dismiss it</span>
            </div>
            <div className="flex items-center gap-3 p-3 border border-[#30363d] rounded-md">
              <span className="text-red">02</span>
              <span className="text-dim">High <span className="text-cyan">block_author_score</span> → Model predicts you might block</span>
            </div>
            <div className="flex items-center gap-3 p-3 border border-[#30363d] rounded-md">
              <span className="text-red">03</span>
              <span className="text-dim">High <span className="text-cyan">mute_author_score</span> → Model predicts you might mute</span>
            </div>
            <div className="flex items-center gap-3 p-3 border border-[#30363d] rounded-md">
              <span className="text-red">04</span>
              <span className="text-dim">High <span className="text-cyan">report_score</span> → Model predicts you might report</span>
            </div>
            <div className="flex items-center gap-3 p-3 border border-[#30363d] rounded-md">
              <span className="text-yellow">05</span>
              <span className="text-dim">Out-of-network status → OON_WEIGHT_FACTOR multiplier (&lt;1.0)</span>
            </div>
            <div className="flex items-center gap-3 p-3 border border-[#30363d] rounded-md">
              <span className="text-yellow">06</span>
              <span className="text-dim">Repeated author → Diversity decay for 2nd, 3rd+ posts</span>
            </div>
          </div>
        </Section>

        {/* Pipeline */}
        <Section id="pipeline" title="EXECUTION_PIPELINE" number="08">
          <p className="text-dim mb-4">
            The complete journey of a post through the recommendation system.
          </p>
          <p className="text-dim mb-6 text-sm">
            <SourceLink href={sources.phoenixPipeline}>phoenix_candidate_pipeline.rs →</SourceLink>
          </p>

          <TerminalWindow title="pipeline.rs">
            <pre className="text-sm overflow-x-auto">
              <code>{`
`}<span className="text-purple">// STAGE 1: QUERY HYDRATION</span>{`
├─ UserActionSeqQueryHydrator   `}<span className="text-dim">// Fetch engagement history</span>{`
└─ UserFeaturesQueryHydrator    `}<span className="text-dim">// Fetch following/blocked/muted</span>{`

`}<span className="text-purple">// STAGE 2: CANDIDATE RETRIEVAL (parallel)</span>{`
├─ `}<span className="text-green">ThunderSource</span>{`              `}<span className="text-dim">// In-network: from followers</span>{`
└─ `}<span className="text-cyan">PhoenixSource</span>{`              `}<span className="text-dim">// Out-of-network: ML retrieval</span>{`

`}<span className="text-purple">// STAGE 3: CANDIDATE HYDRATION (parallel)</span>{`
├─ InNetworkCandidateHydrator   `}<span className="text-dim">// Mark in/out network</span>{`
├─ CoreDataCandidateHydrator    `}<span className="text-dim">// Fetch text, metadata</span>{`
├─ VideoDurationCandidateHydrator
├─ SubscriptionHydrator
└─ GizmoduckCandidateHydrator   `}<span className="text-dim">// Author follower count</span>{`

`}<span className="text-purple">// STAGE 4: PRE-SCORING FILTERS</span>{`
├─ `}<span className="text-red">DropDuplicatesFilter</span>{`
├─ `}<span className="text-red">CoreDataHydrationFilter</span>{`
├─ `}<span className="text-red">AgeFilter</span>{`
├─ `}<span className="text-red">SelfTweetFilter</span>{`
├─ `}<span className="text-red">RetweetDeduplicationFilter</span>{`
├─ `}<span className="text-red">IneligibleSubscriptionFilter</span>{`
├─ `}<span className="text-red">PreviouslySeenPostsFilter</span>{`
├─ `}<span className="text-red">PreviouslyServedPostsFilter</span>{`
├─ `}<span className="text-red">MutedKeywordFilter</span>{`
└─ `}<span className="text-red">AuthorSocialgraphFilter</span>{`

`}<span className="text-purple">// STAGE 5: SCORING</span>{`
├─ `}<span className="text-cyan">PhoenixScorer</span>{`              `}<span className="text-dim">// 19 probabilities</span>{`
├─ `}<span className="text-cyan">WeightedScorer</span>{`             `}<span className="text-dim">// Combine into single score</span>{`
├─ `}<span className="text-cyan">AuthorDiversityScorer</span>{`      `}<span className="text-dim">// Attenuate repeated authors</span>{`
└─ `}<span className="text-cyan">OONScorer</span>{`                  `}<span className="text-dim">// Network adjustment</span>{`

`}<span className="text-purple">// STAGE 6: SELECTION</span>{`
└─ `}<span className="text-green">TopKScoreSelector</span>{`          `}<span className="text-dim">// Sort, select top K</span>{`

`}<span className="text-purple">// STAGE 7: POST-SELECTION</span>{`
├─ VFCandidateHydrator          `}<span className="text-dim">// Safety checks</span>{`
├─ `}<span className="text-red">VFFilter</span>{`
└─ `}<span className="text-red">DedupConversationFilter</span>
              </code>
            </pre>
          </TerminalWindow>
        </Section>

        {/* Success Factors */}
        <Section id="success" title="SUCCESS_FACTORS" number="09">
          <p className="text-dim mb-6">
            What makes a post rank higher in the algorithm.
          </p>

          <div className="space-y-2">
            {[
              'High predicted engagement (favorites, reposts, replies, dwell time)',
              'From users the viewer follows (in-network boost)',
              'Recent content (newer posts prioritized)',
              'First occurrence in feed (not duplicate/retweet already shown)',
              'Matches user\'s historical engagement patterns',
              'Author diversity (first post from that author in batch)',
              'Content type engagement match (user typically engages with similar)',
              'Strong follow_author_score (indicates compelling content)',
              'High profile_click_score (curiosity about author)',
              'Quality video content that drives vqv_score',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 border border-[#3fb950] rounded-md bg-[rgba(63,185,80,0.05)]">
                <span className="text-green font-bold">[✓]</span>
                <span className="text-dim">{item}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Failure Factors */}
        <Section id="failure" title="FAILURE_FACTORS" number="10">
          <p className="text-dim mb-6">
            What causes a post to fail in the algorithm.
          </p>

          <div className="space-y-2">
            {[
              { text: 'Too old (> MAX_POST_AGE, typically ~7 days)', type: 'hard' },
              { text: 'From blocked/muted user', type: 'hard' },
              { text: 'Contains muted keywords', type: 'hard' },
              { text: 'Already seen by user (bloom filter check)', type: 'hard' },
              { text: 'Duplicate content (retweet deduplication)', type: 'hard' },
              { text: 'Safety violations (spam, violence, deleted)', type: 'hard' },
              { text: 'High predicted negative reactions (not interested, block, mute, report)', type: 'soft' },
              { text: 'Repeated author in same batch (diversity decay)', type: 'soft' },
              { text: 'Out-of-network without strong engagement signals', type: 'soft' },
              { text: 'Failed metadata hydration', type: 'hard' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 border border-[#f85149] rounded-md bg-[rgba(248,81,73,0.05)]">
                <span className="text-red font-bold">[✗]</span>
                <span className="text-dim">{item.text}</span>
                <span className={`ml-auto text-xs ${item.type === 'hard' ? 'badge-red' : 'badge-yellow'} badge`}>
                  {item.type === 'hard' ? 'HARD' : 'SOFT'}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* Source Files */}
        <Section id="sources" title="SOURCE_FILES" number="11">
          <p className="text-dim mb-6">
            Direct links to the relevant source code files in the repository.
          </p>

          <TerminalWindow title="ls -la sources/">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-4">
                <span className="text-dim w-24">scorer</span>
                <SourceLink href={sources.weightedScorer}>weighted_scorer.rs</SourceLink>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-dim w-24">scorer</span>
                <SourceLink href={sources.oonScorer}>oon_scorer.rs</SourceLink>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-dim w-24">scorer</span>
                <SourceLink href={sources.authorDiversity}>author_diversity_scorer.rs</SourceLink>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-dim w-24">pipeline</span>
                <SourceLink href={sources.phoenixPipeline}>phoenix_candidate_pipeline.rs</SourceLink>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-dim w-24">service</span>
                <SourceLink href={sources.thunder}>thunder_service.rs</SourceLink>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-dim w-24">model</span>
                <SourceLink href={sources.grok}>grok.py</SourceLink>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-dim w-24">query</span>
                <SourceLink href={sources.query}>query.rs</SourceLink>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-dim w-24">params</span>
                <SourceLink href={sources.params}>params.rs</SourceLink>
                <span className="text-yellow text-xs">(weights excluded)</span>
              </div>
            </div>
          </TerminalWindow>
        </Section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-[#30363d] text-center text-dim text-sm">
          <div className="mb-4">
            <span className="text-green">$</span> echo &quot;Analysis complete&quot;
          </div>
          <p>
            Algorithm source:{' '}
            <a href={GITHUB_BASE} target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">
              xai-org/x-algorithm
            </a>
          </p>
          <p className="mt-2">
            Project:{' '}
            <a href="https://github.com/dan-fein/x-algorithm" target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">
              dan-fein/x-algorithm
            </a>
          </p>
          <p className="mt-4 text-xs">
            Weight values in params.rs are excluded from public release
          </p>
          <p className="mt-4 text-xs text-dim">
            Last updated: {LAST_UPDATED}
          </p>
          <div className="mt-6">
            <span className="cursor" />
          </div>
        </footer>
      </main>
    </div>
  );
}
