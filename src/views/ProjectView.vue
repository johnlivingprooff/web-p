<template>
  <div class="project-view">
    <div class="glass-header hidden">
      <p class="tagline">Explore live projects in an interactive node. Switch to grid, and open details without leaving the page.</p>
    </div>
    <section class="projects">
      <ProjectGalaxy :selectedId="$route.params.id || null" />
    </section>
    <br>
  </div>
</template>

<script>
import ProjectGalaxy from '@/components/ProjectGalaxy.vue';

export default {
  components: { ProjectGalaxy },
  mounted() {
    const el = this.$el.querySelector('.glass-header');
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) el.classList.add('show');
      });
    }, { threshold: 0.8 });
    observer.observe(el);
  }
}
</script>

<style scoped>
  .project-view {
    padding: 20px 20px 0 20px;
    place-items: center;
    font-family: 'Raleway', sans-serif;
    color: var(--color-text);
    p { margin-bottom: 15px; }
  }

  .glass-header {
    position: sticky;
    top: 10px;
    z-index: 5;
    margin: 12px auto 16px;
    width: min(960px, 90%);
    padding: 12px 16px;
    border-radius: 12px;
    background: transparent;
    box-shadow: none;
    position: sticky;
    overflow: hidden;
    text-align: center;
  }
  .glass-header .tagline { margin: 0; }
  /* Removed blurred/overlay background */

  .projects { width: 90%; margin-bottom: 25px; }

  /* Fade-in on first reveal */
  .hidden { opacity: 0; transform: translateY(-4px); }
  .show { animation: fadeSlideIn .6s ease-out forwards; }
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  hr {
    color: var(--color-text);
  }

  #cntct {
    place-self: center;
  }

</style>