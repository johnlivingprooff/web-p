<script>
import Footer from '@/components/Footer.vue';
import FloatingPlayer from '@/components/FloatingPlayer.vue';
export default {
  components: { Footer, FloatingPlayer },
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