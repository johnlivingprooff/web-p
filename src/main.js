import './assets/main.css'

import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes, scrollBehavior } from './router'
import { fetchEpisodes } from './data/rss.js'

export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior, base: import.meta.env.BASE_URL },
  ({ router }) => {
    if (import.meta.env.SSR) {
      router.beforeResolve(async (to) => {
        if (to.name === 'episode' || to.name === 'podcast') {
          const episodes = await fetchEpisodes();
          if (to.name === 'episode') {
            to.meta.state = { episode: episodes.find((ep) => ep.slug === to.params.slug) ?? null };
          }
        }
      });
    }
  },
)

export async function includedRoutes(paths, routes) {
  const episodes = await fetchEpisodes();
  const episodePaths = episodes.map((ep) => `/podcast/${ep.slug}`);
  return routes.flatMap((route) => {
    if (route.name === 'episode') return episodePaths;
    if (route.name === 'projects') return ['/projects'];
    return [route.path];
  });
}
