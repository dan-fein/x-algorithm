import { tool } from 'ai';
import { z } from 'zod';

const REPO_OWNER = 'xai-org';
const REPO_NAME = 'x-algorithm';
const GITHUB_API_BASE = 'https://api.github.com';

// Cache for repository content to avoid repeated API calls
const contentCache = new Map<string, { content: string; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function fetchWithCache(url: string, cacheKey: string): Promise<string> {
  const cached = contentCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.content;
  }

  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'x-algo-assistant',
      ...(process.env.GITHUB_TOKEN ? { 'Authorization': `token ${process.env.GITHUB_TOKEN}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  const content = await response.text();
  contentCache.set(cacheKey, { content, timestamp: Date.now() });
  return content;
}

export const listRepoContents = tool({
  description: 'List files and directories in the x-algorithm GitHub repository. Use this to explore the repository structure and find relevant files.',
  inputSchema: z.object({
    path: z.string().default('').describe('The path within the repository to list. Use empty string for root directory.'),
  }),
  execute: async ({ path }) => {
    const url = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`;
    const cacheKey = `list:${path}`;
    
    try {
      const data = await fetchWithCache(url, cacheKey);
      const contents = JSON.parse(data);
      
      if (Array.isArray(contents)) {
        return {
          path,
          items: contents.map((item: { name: string; type: string; path: string; size?: number }) => ({
            name: item.name,
            type: item.type,
            path: item.path,
            size: item.size,
          })),
        };
      }
      
      return { path, items: [contents] };
    } catch (error) {
      return { error: `Failed to list contents at ${path}: ${error instanceof Error ? error.message : 'Unknown error'}` };
    }
  },
});

export const getFileContent = tool({
  description: 'Get the content of a specific file from the x-algorithm GitHub repository. Use this to read source code, documentation, or configuration files.',
  inputSchema: z.object({
    path: z.string().describe('The full path to the file within the repository (e.g., "README.md", "src/main.py")'),
  }),
  execute: async ({ path }) => {
    const url = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`;
    const cacheKey = `file:${path}`;
    
    try {
      const data = await fetchWithCache(url, cacheKey);
      const fileInfo = JSON.parse(data);
      
      if (fileInfo.type !== 'file') {
        return { error: `${path} is not a file, it's a ${fileInfo.type}` };
      }
      
      // Decode base64 content
      const content = Buffer.from(fileInfo.content, 'base64').toString('utf-8');
      
      return {
        path: fileInfo.path,
        name: fileInfo.name,
        size: fileInfo.size,
        content: content.length > 15000 ? content.substring(0, 15000) + '\n\n[Content truncated due to size...]' : content,
      };
    } catch (error) {
      return { error: `Failed to get file content for ${path}: ${error instanceof Error ? error.message : 'Unknown error'}` };
    }
  },
});

export const searchRepoCode = tool({
  description: 'Search for code patterns, function names, or specific text within the x-algorithm repository. Useful for finding where specific functionality is implemented.',
  inputSchema: z.object({
    query: z.string().describe('The search query - can be a function name, variable, or code pattern'),
  }),
  execute: async ({ query }) => {
    const url = `${GITHUB_API_BASE}/search/code?q=${encodeURIComponent(query)}+repo:${REPO_OWNER}/${REPO_NAME}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'x-algo-assistant',
          ...(process.env.GITHUB_TOKEN ? { 'Authorization': `token ${process.env.GITHUB_TOKEN}` } : {}),
        },
      });

      if (!response.ok) {
        // Code search requires authentication or may have rate limits
        if (response.status === 403) {
          return { 
            error: 'Code search rate limited. Please use listRepoContents and getFileContent to explore the repository instead.',
            suggestion: 'Try listing the repository contents first to find relevant files.'
          };
        }
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        query,
        totalCount: data.total_count,
        results: data.items?.slice(0, 10).map((item: { path: string; name: string; repository: { full_name: string } }) => ({
          path: item.path,
          name: item.name,
          repository: item.repository.full_name,
        })) || [],
      };
    } catch (error) {
      return { 
        error: `Search failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        suggestion: 'Try using listRepoContents to browse the repository structure instead.'
      };
    }
  },
});

export const getRepoInfo = tool({
  description: 'Get general information about the x-algorithm repository including description, stars, forks, and latest activity.',
  inputSchema: z.object({}),
  execute: async () => {
    const url = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}`;
    const cacheKey = 'repo:info';
    
    try {
      const data = await fetchWithCache(url, cacheKey);
      const repo = JSON.parse(data);
      
      return {
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        openIssues: repo.open_issues_count,
        defaultBranch: repo.default_branch,
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        topics: repo.topics,
        license: repo.license?.name,
        htmlUrl: repo.html_url,
      };
    } catch (error) {
      return { error: `Failed to get repository info: ${error instanceof Error ? error.message : 'Unknown error'}` };
    }
  },
});

export const getReadme = tool({
  description: 'Get the README content of the x-algorithm repository. This is usually the best starting point to understand what the repository is about.',
  inputSchema: z.object({}),
  execute: async () => {
    const url = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/readme`;
    const cacheKey = 'repo:readme';
    
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'x-algo-assistant',
          ...(process.env.GITHUB_TOKEN ? { 'Authorization': `token ${process.env.GITHUB_TOKEN}` } : {}),
        },
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      const content = Buffer.from(data.content, 'base64').toString('utf-8');
      
      return {
        name: data.name,
        path: data.path,
        content,
      };
    } catch (error) {
      return { error: `Failed to get README: ${error instanceof Error ? error.message : 'Unknown error'}` };
    }
  },
});

export const githubTools = {
  listRepoContents,
  getFileContent,
  searchRepoCode,
  getRepoInfo,
  getReadme,
};
