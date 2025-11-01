<script>
import Foot from '@/components/Foot.vue';
export default {
  components: {
    Foot,
  },
};
</script>

<template>
  <div class="container">
    <div class="nav">
      <router-link to="/projects">Projects</router-link>
    </div>
    <router-view />
    <Foot />
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