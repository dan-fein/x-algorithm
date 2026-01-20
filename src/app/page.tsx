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
  candidate: `${GITHUB_BASE}/blob/main/home-mixer/candidate_pipeline/candidate.rs`,
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-16">
          <pre className="ascii-art mb-8">{`
██╗  ██╗     █████╗ ██╗      ██████╗  ██████╗
╚██╗██╔╝    ██╔══██╗██║     ██╔════╝ ██╔═══██╗
 ╚███╔╝     ███████║██║     ██║  ███╗██║   ██║
 ██╔██╗     ██╔══██║██║     ██║   ██║██║   ██║
██╔╝ ██╗    ██║  ██║███████╗╚██████╔╝╚██████╔╝
╚═╝  ╚═╝    ╚═╝  ╚═╝╚══════╝ ╚═════╝  ╚═════╝`}</pre>

          <p className="mb-6">
            <span className="text-green">$</span> cat README.md
          </p>

          <div className="space-y-4">
            <p>
              Every post on X is given a <span className="text-green font-medium">score</span>.
              This score determines whether the post appears in your &quot;For You&quot; feed,
              and where it ranks.
            </p>
            <p>
              The score is calculated by a neural network that looks at
              you (your history, who you follow) and the post (content, author, age),
              then predicts how likely you are to engage with it.
            </p>
            <p>
              X open-sourced this algorithm. This page breaks down exactly how it works.
            </p>
          </div>

          <p className="mt-8 text-dim text-sm">
            Last updated: {data.lastUpdated} | Source:{' '}
            <a href={GITHUB_BASE} className="underline">
              xai-org/x-algorithm
            </a>
          </p>
        </header>

        {/* How it works overview */}
        <section id="tldr" className="section">
          <p className="mb-4"><span className="text-green">$</span> ./explain.sh</p>

          <TerminalWindow title="how the algorithm works">
            <pre className="text-sm">{`For each post you might see, the algorithm:

1. FILTERS out posts that should never appear
   (too old, from blocked users, already seen, etc.)

2. PREDICTS 19 types of engagement
   "How likely is this user to like/reply/repost/etc?"

3. CALCULATES a weighted score
   Each prediction is multiplied by a weight and summed.

4. ADJUSTS the score based on:
   - Whether you follow the author (in-network boost)
   - How many posts from this author are already in your feed

5. RANKS all posts by final score

6. SHOWS you the top results`}</pre>
          </TerminalWindow>
        </section>

        {/* The 19 Signals */}
        <section id="engagement" className="section">
          <p className="mb-4">
            <span className="text-green">$</span> cat engagement_signals.txt
          </p>

          <p className="text-dim text-sm mb-4">
            The neural network predicts 19 different ways you might engage with a post.
            Each prediction is a probability from 0 to 1.
            {' '}<a href={sources.candidate} className="underline">source</a>
          </p>

          <TerminalWindow title="19 engagement predictions">
            <pre className="text-sm">{`POSITIVE SIGNALS (15):
  favorite_score        "Will they like it?"
  reply_score           "Will they reply?"
  repost_score          "Will they retweet?"
  quote_score           "Will they quote tweet?"
  click_score           "Will they click on it?"
  profile_click_score   "Will they click the author's profile?"
  follow_author_score   "Will they follow the author?"
  share_score           "Will they share it?"
  share_via_dm_score    "Will they share via DM?"
  share_via_copy_link   "Will they copy the link?"
  photo_expand_score    "Will they expand the photo?"
  vqv_score             "Will they watch the video?" (quality view)
  quoted_click_score    "Will they click the quoted tweet?"
  dwell_score           "Will they stop and read it?"
  dwell_time            "How long will they look at it?" (continuous)

NEGATIVE SIGNALS (4):
  not_interested_score  "Will they tap 'Not interested'?"
  block_author_score    "Will they block the author?"
  mute_author_score     "Will they mute the author?"
  report_score          "Will they report it?"`}</pre>
          </TerminalWindow>
        </section>

        {/* Scoring */}
        <section id="scoring" className="section">
          <p className="mb-4">
            <span className="text-green">$</span> cat weighted_scorer.rs
          </p>

          <p className="text-dim text-sm mb-4">
            Each prediction is multiplied by a weight, then summed.
            Negative signals subtract from the score.
            {' '}<a href={sources.weightedScorer} className="underline">source</a>
          </p>

          <TerminalWindow title="scoring formula">
            <pre className="text-sm">{`score = (favorite_score       * FAVORITE_WEIGHT)
      + (reply_score          * REPLY_WEIGHT)
      + (repost_score         * RETWEET_WEIGHT)
      + (quote_score          * QUOTE_WEIGHT)
      + (click_score          * CLICK_WEIGHT)
      + (profile_click_score  * PROFILE_CLICK_WEIGHT)
      + (follow_author_score  * FOLLOW_AUTHOR_WEIGHT)
      + (share_score          * SHARE_WEIGHT)
      + (share_via_dm_score   * SHARE_VIA_DM_WEIGHT)
      + (share_via_copy_link  * SHARE_VIA_COPY_LINK_WEIGHT)
      + (photo_expand_score   * PHOTO_EXPAND_WEIGHT)
      + (vqv_score            * VQV_WEIGHT)
      + (quoted_click_score   * QUOTED_CLICK_WEIGHT)
      + (dwell_score          * DWELL_WEIGHT)
      + (dwell_time           * CONT_DWELL_TIME_WEIGHT)
      - (not_interested_score * NOT_INTERESTED_WEIGHT)
      - (block_author_score   * BLOCK_AUTHOR_WEIGHT)
      - (mute_author_score    * MUTE_AUTHOR_WEIGHT)
      - (report_score         * REPORT_WEIGHT)`}</pre>
          </TerminalWindow>

          <div className="mt-4 p-4 border border-[--ds-border] rounded-md">
            <p className="text-dim text-sm">
              <strong className="text-[--ds-gray-300]">Note:</strong> The actual weight values
              (FAVORITE_WEIGHT, REPLY_WEIGHT, etc.) are not in the open source release.
              They are in a <code className="text-[--ds-gray-400]">params</code> module
              that was excluded &quot;for security reasons.&quot;
              We know the formula structure, but not the multipliers.
            </p>
          </div>
        </section>

        {/* In-network boost */}
        <section id="network" className="section">
          <p className="mb-4">
            <span className="text-green">$</span> cat oon_scorer.rs
          </p>

          <p className="text-dim text-sm mb-4">
            Posts from people you follow get their full score.
            Posts from strangers are penalized.
            {' '}<a href={sources.oonScorer} className="underline">source</a>
          </p>

          <TerminalWindow title="in-network vs out-of-network">
            <pre className="text-sm">{`if (you follow the author) {
    final_score = score;                      // full score
} else {
    final_score = score * OON_WEIGHT_FACTOR;  // reduced
}

This is why posts from accounts you follow dominate your feed.
Out-of-network posts need much higher engagement predictions
to compete.`}</pre>
          </TerminalWindow>

          <div className="mt-4 p-4 border border-[--ds-border] rounded-md">
            <p className="text-dim text-sm">
              <strong className="text-[--ds-gray-300]">Unknown:</strong> The exact value of
              OON_WEIGHT_FACTOR is not public. It is likely between 0.3 and 0.8.
            </p>
          </div>
        </section>

        {/* Author diversity */}
        <section id="diversity" className="section">
          <p className="mb-4">
            <span className="text-green">$</span> cat author_diversity_scorer.rs
          </p>

          <p className="text-dim text-sm mb-4">
            If the same author has multiple posts in your feed, each subsequent
            post gets a reduced score. This prevents one person from flooding your feed.
            {' '}<a href={sources.authorDiversity} className="underline">source</a>
          </p>

          <TerminalWindow title="author diversity decay">
            <pre className="text-sm">{`multiplier = (1 - FLOOR) * DECAY^position + FLOOR

How it works:
  1st post from @user:  1.0x                (full score)
  2nd post from @user:  (1-FLOOR)*DECAY + FLOOR
  3rd post from @user:  (1-FLOOR)*DECAY^2 + FLOOR
  nth post from @user:  approaches FLOOR

This is why you see variety in your feed, even if one person
posts a lot.`}</pre>
          </TerminalWindow>

          <div className="mt-4 p-4 border border-[--ds-border] rounded-md">
            <p className="text-dim text-sm">
              <strong className="text-[--ds-gray-300]">Unknown:</strong> AUTHOR_DIVERSITY_DECAY
              and AUTHOR_DIVERSITY_FLOOR are not public.
              Typical values might be decay=0.5-0.7, floor=0.2-0.4.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section id="filters" className="section">
          <p className="mb-4">
            <span className="text-green">$</span> ls filters/
          </p>

          <p className="text-dim text-sm mb-4">
            Before scoring even happens, posts are filtered out if they match
            certain rules. No score can save a filtered post.
            {' '}<a href={sources.phoenixPipeline} className="underline">source</a>
          </p>

          <TerminalWindow title="hard filters (posts removed entirely)">
            <pre className="text-sm">{`PRE-SCORING FILTERS (10):
  AgeFilter                 Posts older than ~48 hours
  SelfTweetFilter           Your own posts
  AuthorSocialgraphFilter   From users you blocked or muted
  MutedKeywordFilter        Contains words you muted
  PreviouslySeenPostsFilter Posts you already saw
  PreviouslyServedFilter    Posts already shown this session
  DropDuplicatesFilter      Duplicate post IDs
  RetweetDedupFilter        Same tweet retweeted multiple times
  CoreDataHydrationFilter   Posts that failed to load
  SubscriptionFilter        Paywalled content you can not access

POST-SCORING FILTERS (2):
  VFFilter                  Spam, violence, deleted posts
  DedupConversationFilter   Multiple replies in same thread`}</pre>
          </TerminalWindow>
        </section>

        {/* Pipeline */}
        <section id="pipeline" className="section">
          <p className="mb-4">
            <span className="text-green">$</span> cat pipeline.txt
          </p>

          <p className="text-dim text-sm mb-4">
            The complete sequence from request to response.
          </p>

          <TerminalWindow title="execution order">
            <pre className="text-sm">{`1. FETCH USER DATA
   Your engagement history, who you follow, who you blocked

2. GET CANDIDATE POSTS
   In-network:  recent posts from people you follow
   Out-network: posts the ML model thinks you will like

3. HYDRATE POSTS
   Fetch full content, author info, video duration, etc.

4. APPLY HARD FILTERS
   Remove posts that should never appear (10 filters)

5. SCORE EACH POST
   Neural network predicts 19 engagement probabilities
   Weighted sum becomes the base score
   Adjust for author diversity
   Adjust for in-network vs out-of-network

6. RANK AND SELECT
   Sort by final score, pick top N

7. FINAL SAFETY CHECK
   Remove spam, violence, deleted posts (2 filters)`}</pre>
          </TerminalWindow>
        </section>

        {/* Sources */}
        <section id="sources" className="section">
          <p className="mb-4">
            <span className="text-green">$</span> ls src/
          </p>

          <TerminalWindow title="key source files">
            <pre className="text-sm">{`weighted_scorer.rs       How scores are calculated
oon_scorer.rs            In-network vs out-of-network
author_diversity.rs      Penalizing repeat authors
phoenix_pipeline.rs      The full pipeline
candidate.rs             The 19 engagement signals
grok.py                  The neural network (transformer)

All code: github.com/xai-org/x-algorithm`}</pre>
          </TerminalWindow>
        </section>

        {/* Summary */}
        <section className="section">
          <p className="mb-4">
            <span className="text-green">$</span> ./summary.sh
          </p>

          <TerminalWindow title="key takeaways">
            <pre className="text-sm">{`WHAT HELPS A POST:
  High engagement predictions across all 19 signals
  Posted by someone the viewer follows (in-network)
  Recent (under 48 hours old)
  Not seen before by this viewer
  Author does not have other posts in same feed batch

WHAT HURTS A POST:
  Older than 48 hours (hard filter, removed entirely)
  From a blocked or muted user (hard filter)
  Contains muted keywords (hard filter)
  Already seen (hard filter)
  High block/mute/report predictions (negative weight)
  Author has multiple posts in feed (diversity penalty)
  From someone the viewer does not follow (OON penalty)

WHAT IS NOT PUBLIC:
  FAVORITE_WEIGHT, REPLY_WEIGHT, etc. (all 19 weights)
  OON_WEIGHT_FACTOR (in-network vs out-of-network)
  AUTHOR_DIVERSITY_DECAY and FLOOR values
  MAX_POST_AGE exact value in seconds

The algorithm optimizes for predicted engagement.
Your feed is personalized based on your history.

$ exit 0`}</pre>
          </TerminalWindow>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-[--ds-border] text-dim text-sm">
          <div className="flex flex-col gap-2">
            <p>
              Source: <a href={GITHUB_BASE} className="underline">xai-org/x-algorithm</a>
            </p>
            <p>
              Project: <a href="https://github.com/dan-fein/x-algorithm" className="underline">dan-fein/x-algorithm</a>
            </p>
            <p className="mt-2">Last updated: {data.lastUpdated}</p>
          </div>
          <div className="mt-6">
            <span className="cursor" />
          </div>
        </footer>
      </main>
    </div>
  );
}
