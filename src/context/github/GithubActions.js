import axios from 'axios';

const GITHUB_URL = import.meta.env.VITE_GITHUB_URL;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
});

//function to get user results
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  const response = await github.get(`/search/users?${params}`);

  return response.data.items;
};

//function to get single user data and repos

export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([github.get(`/users/${login}`), github.get(`/users/${login}/repos`)]);
  return { user: user.data, repos: repos.data };
};



// Action to get most-starred repositories
export const getTopStarredRepos = async () => {
  const response = await github.get('/repositories', {
    params: {
      sort: 'stars', // Sort by stars to get most popular repos
      order: 'desc', // Descending order to get top repos first
      per_page: 5, // Fetch top 5 most-starred repositories (you can change per_page)
    },
  });
  return response.data; // This returns the most-starred repositories
};

// Function to get users from top-starred repositories
export const getTopStarredReposUsers = async () => {
  const repos = await getTopStarredRepos();
  const users = repos.map((repo) => repo.owner); // Extract owner from each repo
  return users;
};
