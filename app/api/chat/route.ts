import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  tool,
  UIMessage,
} from 'ai';
import { z } from 'zod';

export const maxDuration = 60;

const GITHUB_REPO = 'xai-org/x-algorithm';
const GITHUB_RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_REPO}/main`;
const GITHUB_API_BASE = `https://api.github.com/repos/${GITHUB_REPO}`;

// Tool to list files in a directory
const listFilesTool = tool({
  description:
    'List files and directories in the x-algorithm repository. Use this to explore the codebase structure. Start with the root path "" to see the top-level files.',
  inputSchema: z.object({
    path: z
      .string()
      .describe(
        'The directory path to list, e.g., "" for root, "home-mixer/scorers" for a subdirectory'
      ),
  }),
  execute: async ({ path }) => {
    try {
      const url = `${GITHUB_API_BASE}/contents/${path}`;
      const response = await fetch(url, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'x-algorithm-assistant',
        },
      });

      if (!response.ok) {
        return { error: `Failed to list directory: ${response.statusText}`, files: [] };
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        return { error: 'Path is a file, not a directory', files: [] };
      }

      const files = data.map((item: { name: string; type: string; path: string; size?: number }) => ({
        name: item.name,
        type: item.type,
        path: item.path,
        size: item.size,
      }));

      return {
        path: path || '/',
        files,
        count: files.length,
      };
    } catch (error) {
      return { error: `Error listing files: ${error}`, files: [] };
    }
  },
});

// Tool to read file contents
const readFileTool = tool({
  description:
    'Read the contents of a specific file from the x-algorithm repository. Use this to understand how specific parts of the algorithm work.',
  inputSchema: z.object({
    path: z
      .string()
      .describe(
        'The full file path, e.g., "home-mixer/scorers/weighted_scorer.rs" or "README.md"'
      ),
  }),
  execute: async ({ path }) => {
    try {
      const url = `${GITHUB_RAW_BASE}/${path}`;
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'x-algorithm-assistant',
        },
      });

      if (!response.ok) {
        return { error: `Failed to read file: ${response.statusText}`, content: null };
      }

      const content = await response.text();

      // Truncate very large files
      const maxLength = 15000;
      const truncated = content.length > maxLength;
      const displayContent = truncated ? content.slice(0, maxLength) + '\n\n... [truncated]' : content;

      return {
        path,
        content: displayContent,
        size: content.length,
        truncated,
      };
    } catch (error) {
      return { error: `Error reading file: ${error}`, content: null };
    }
  },
});

// Tool to search for code patterns
const searchCodeTool = tool({
  description:
    'Search for specific code patterns, function names, or keywords across the x-algorithm repository. Returns matching files and snippets.',
  inputSchema: z.object({
    query: z
      .string()
      .describe(
        'The search term or pattern to look for, e.g., "favorite_score", "OON_WEIGHT", "engagement"'
      ),
  }),
  execute: async ({ query }) => {
    try {
      const url = `https://api.github.com/search/code?q=${encodeURIComponent(query)}+repo:${GITHUB_REPO}`;
      const response = await fetch(url, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'x-algorithm-assistant',
        },
      });

      if (!response.ok) {
        // GitHub search API has rate limits
        if (response.status === 403) {
          return {
            error: 'GitHub API rate limit reached. Try reading specific files instead.',
            results: [],
          };
        }
        return { error: `Search failed: ${response.statusText}`, results: [] };
      }

      const data = await response.json();

      const results = data.items?.slice(0, 10).map((item: { name: string; path: string; html_url: string }) => ({
        name: item.name,
        path: item.path,
        url: item.html_url,
      })) || [];

      return {
        query,
        total_count: data.total_count,
        results,
      };
    } catch (error) {
      return { error: `Search error: ${error}`, results: [] };
    }
  },
});

// Tool to get repository structure overview
const getRepoOverviewTool = tool({
  description:
    'Get a high-level overview of the x-algorithm repository structure and key directories. Use this first to understand the codebase layout.',
  inputSchema: z.object({}),
  execute: async () => {
    try {
      // Fetch root directory
      const response = await fetch(`${GITHUB_API_BASE}/contents/`, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'x-algorithm-assistant',
        },
      });

      if (!response.ok) {
        return { error: 'Failed to fetch repository overview' };
      }

      const rootContents = await response.json();

      const structure = rootContents.map((item: { name: string; type: string; path: string }) => ({
        name: item.name,
        type: item.type,
      }));

      return {
        repository: GITHUB_REPO,
        description:
          "X's recommendation algorithm - determines how posts are scored and ranked in the For You feed",
        key_directories: {
          'home-mixer': 'Main ranking logic, scorers, filters, and candidate pipelines',
          'phoenix': 'Neural network models including grok.py',
          'thunder': 'Thunder service for real-time processing',
        },
        key_files: {
          'README.md': 'Repository documentation',
          'home-mixer/scorers/weighted_scorer.rs': 'Main scoring formula',
          'home-mixer/scorers/oon_scorer.rs': 'In-network vs out-of-network scoring',
          'home-mixer/scorers/author_diversity_scorer.rs': 'Author diversity decay',
          'home-mixer/candidate_pipeline/phoenix_candidate_pipeline.rs': 'Pipeline filters',
          'home-mixer/candidate_pipeline/candidate.rs': '19 engagement signals definition',
          'phoenix/grok.py': 'Neural network model',
        },
        root_structure: structure,
      };
    } catch (error) {
      return { error: `Error getting overview: ${error}` };
    }
  },
});

const tools = {
  getRepoOverview: getRepoOverviewTool,
  listFiles: listFilesTool,
  readFile: readFileTool,
  searchCode: searchCodeTool,
};

const systemPrompt = `You are an expert assistant that helps users understand the X (formerly Twitter) recommendation algorithm.

You have access to the actual open-source codebase at github.com/xai-org/x-algorithm. Use your tools to explore and read the code to answer questions accurately.

Key knowledge about the algorithm:
- Every post gets a score that determines its ranking in "For You" feed
- A neural network predicts 19 types of engagement (likes, replies, reposts, etc.)
- These predictions are multiplied by weights and summed
- Posts from people you follow (in-network) get full score; strangers (out-of-network) are penalized
- Multiple posts from same author get diminishing scores (author diversity)
- Various filters remove posts before and after scoring

When answering questions:
1. First use getRepoOverview to understand the repository structure if needed
2. Use listFiles to explore directories
3. Use readFile to examine specific code
4. Use searchCode to find relevant patterns (but be aware of rate limits)

Always cite the specific files and code you reference. Format code snippets clearly.
Be helpful, accurate, and educational. If you can't find something, say so honestly.`;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: 'anthropic/claude-sonnet-4',
    system: systemPrompt,
    messages: convertToModelMessages(messages),
    tools,
    stopWhen: stepCountIs(15),
  });

  return result.toUIMessageStreamResponse();
}
