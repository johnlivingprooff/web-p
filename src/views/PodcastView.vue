<template>
  <div class="podcast-view">
    <div class="podcast-view__header">
      <div class="podcast-view__label">
        <span>03 — Podcast</span>
      </div>
      <h1 class="podcast-view__headline reveal">
        Conversations<br>from my mind.
      </h1>
      <p class="podcast-view__sub reveal">
        Life, creativity, and our shared reality. New episodes as time permits :).
      </p>
    </div>
    <section class="podcast-view__content">
      <Podcast />
    </section>
  </div>
</template>

<script>
import Podcast from '@/components/Podcast.vue';

export default {
  components: { Podcast },
  mounted() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('revealed');
      });
    }, { threshold: 0.1 });
    this.$el.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
}
</script>

<style scoped>
.podcast-view {
  background: var(--color-background, #f5f4f0);
  min-height: 100vh;
  font-family: var(--font-sans, 'Space Grotesk', sans-serif);
}

.podcast-view__header {
  max-width: var(--container-max, 1200px);
  margin: 0 auto;
  padding: 100px var(--container-pad, clamp(20px, 5vw, 80px)) 60px;
}

.podcast-view__label {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text-muted, #888);
  margin-bottom: 40px;
  font-family: var(--font-sans);
}

.podcast-view__label span {
  border-bottom: 2px solid var(--c-accent, #c8f542);
  padding-bottom: 2px;
}

.podcast-view__headline {
  font-family: var(--font-display, 'Space Grotesk', sans-serif);
  font-size: clamp(2.8rem, 6vw, 5.5rem);
  font-weight: 700;
  line-height: 1.05;
  color: var(--color-heading, #0a0a0a);
  margin-bottom: 20px;
}

.podcast-view__sub {
  font-size: 1rem;
  color: var(--color-text-muted, #666);
  max-width: 480px;
  line-height: 1.7;
}

.podcast-view__content {
  max-width: var(--container-max, 1200px);
  margin: 0 auto;
}

.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 768px) {
  .podcast-view__header {
    padding: 60px 20px 40px;
  }
}
</style>
