<template>
  <div class="project-view">
    <div class="project-view__header">
      <div class="project-view__label">
        <span>02 — Projects</span>
      </div>
      <h1 class="project-view__headline reveal">
        Live work,<br>in the wild.
      </h1>
      <p class="project-view__sub reveal">
        Explore live projects in an interactive node. Switch to grid, and open details without leaving the page.
      </p>
    </div>
    <section class="project-view__galaxy">
      <ProjectGalaxy :selectedId="$route.params.id || null" />
    </section>
  </div>
</template>

<script>
import ProjectGalaxy from '@/components/ProjectGalaxy.vue';

export default {
  components: { ProjectGalaxy },
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
.project-view {
  background: var(--color-background, #f5f4f0);
  min-height: 100vh;
  font-family: var(--font-sans, 'Space Grotesk', sans-serif);
}

.project-view__header {
  max-width: var(--container-max, 1200px);
  margin: 0 auto;
  padding: 100px var(--container-pad, clamp(20px, 5vw, 80px)) 60px;
}

.project-view__label {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text-muted, #888);
  margin-bottom: 40px;
  font-family: var(--font-sans);
}

.project-view__label span {
  border-bottom: 2px solid var(--c-accent, #c8f542);
  padding-bottom: 2px;
}

.project-view__headline {
  font-family: var(--font-display, 'Space Grotesk', sans-serif);
  font-size: clamp(2.8rem, 6vw, 5.5rem);
  font-weight: 700;
  line-height: 1.05;
  color: var(--color-heading, #0a0a0a);
  margin-bottom: 20px;
}

.project-view__sub {
  font-size: 1rem;
  color: var(--color-text-muted, #666);
  max-width: 480px;
  line-height: 1.7;
}

.project-view__galaxy {
  max-width: var(--container-max, 1200px);
  margin: 0 auto;
  padding: 0 var(--container-pad, clamp(20px, 5vw, 80px)) 80px;
}

/* Reveal animation */
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
  .project-view__header {
    padding: 60px 20px 40px;
  }
  .project-view__galaxy {
    padding: 0 20px 60px;
  }
}
</style>
