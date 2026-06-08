import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Projects from '../views/ProjectView.vue'
import Podcast from '../views/PodcastView.vue'
import EpisodeDetail from '../views/EpisodeDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/projects/:id?', name: 'projects', component: Projects },
    { path: '/podcast', name: 'podcast', component: Podcast },
    { path: '/podcast/:slug', name: 'episode', component: EpisodeDetail },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, top: 0, behavior: 'smooth' };
    return { top: 0 };
  },
})

export default router
