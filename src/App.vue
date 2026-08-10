<script>
import { useHead } from '@unhead/vue';
import Footer from '@/components/Footer.vue';
import FloatingPlayer from '@/components/FloatingPlayer.vue';
import { Analytics } from "@vercel/analytics/vue";

const SITE_URL = 'https://me.eiteone.org';
const SITE_TITLE = '#johnlivingprooff';
const SITE_DESC = "I'm Where Fear Becomes Love";

export default {
  components: { Footer, FloatingPlayer, Analytics },
  setup() {
    useHead({
      title: SITE_TITLE,
      meta: [
        { name: 'description', content: SITE_DESC },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: SITE_TITLE },
        { property: 'og:description', content: SITE_DESC },
        { property: 'og:image', content: `${SITE_URL}/og-image.jpg` },
        { property: 'og:url', content: SITE_URL },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: SITE_TITLE },
        { name: 'twitter:description', content: SITE_DESC },
        { name: 'twitter:image', content: `${SITE_URL}/og-image.jpg` },
      ],
    });
  },
};
</script>

<template>
  <div class="container">
    <div class="nav">
      <router-link v-if="$route.path === '/projects' || $route.path.startsWith('/projects/') || $route.path === '/podcast' || $route.path.startsWith('/podcast/')" to="/">#johnlivingprooff</router-link>
      <template v-else>
        <router-link to="/projects">Projects</router-link>
      </template>
    </div>
    <router-view />
    <Footer />
    <FloatingPlayer />
    <Analytics />
  </div>
</template>

<style scoped>
@import './assets/base.css';

.nav {
  transform-origin: bottom left;
  transform: rotate(90deg);
  width: 100vh;
  display: grid;
  place-items: center;
  justify-content: space-between;
  align-items: center;
  align-self: center;
  position: fixed;
  margin-top: 40vh;
  z-index: 10000;
}

.nav a {
  text-decoration: none;
  color: var(--color-link);
  padding: 5px 20px;
  transition: all 0.3s ease-in-out;
}

.nav a:hover {
  color: var(--color-link-hover);
  background: #444;
}

@media (max-width: 768px) {
  .nav {
    display: none;
  }
}
</style>
