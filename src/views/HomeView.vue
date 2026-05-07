<script>
import Welcome from '@/components/Welcome.vue';
import About from '@/components/About.vue';
import Clients from '@/components/Clients.vue';
import Podcast from '@/components/Podcast.vue';

export default {
  components: { Welcome, About, Clients, Podcast },
};
</script>

<template>
  <main>
    <!-- Hero: dark bg + logo + welcome text (kept as-is) -->
    <section class="hero">
      <img src="/icon.png" alt="logo" class="hero__logo" />
      <Welcome />
    </section>

    <!-- Remaining sections on light background -->
    <div class="content">
      <About />
      <Clients />
      <Podcast />
    </div>
  </main>
</template>

<style scoped>
/* Hero section — unchanged from original */
.hero {
  display: grid;
  place-items: center;
  align-content: center;
  min-height: 100vh;
  overflow: hidden;
  background: linear-gradient(#00000000, var(--c-black, #0a0a0a)),
              url('/imgs/darkbg.jpg') no-repeat center center / cover;
  animation: heroFade 1s ease forwards;
}

@keyframes heroFade {
  from { opacity: 0; }
  to { opacity: 1; }
}

.hero__logo {
  width: clamp(180px, 30vw, 400px);
  height: clamp(180px, 30vw, 400px);
  display: block;
  margin: 0 auto;
  padding: 40px;
  animation: logoPop 0.8s ease forwards;
}

@keyframes logoPop {
  from { transform: scale(0.3); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

/* Content wrapper — light background for all other sections */
.content {
  background: var(--color-background, #f5f4f0);
}
</style>
