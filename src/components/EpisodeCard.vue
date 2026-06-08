<template>
  <article
    class="ep-card"
    :class="{ 'ep-card--detail': variant === 'detail' }"
    @click="$emit('click', episode)"
    :role="variant === 'grid' ? 'button' : undefined"
    :tabindex="variant === 'grid' ? 0 : undefined"
    @keydown.enter="variant === 'grid' && $emit('click', episode)"
    @keydown.space.prevent="variant === 'grid' && $emit('click', episode)"
    :aria-label="variant === 'grid' ? `View episode: ${episode.title}` : undefined"
  >
    <div class="ep-card__img">
      <img :src="episode.image || '/imgs/the podcast.png'" :alt="episode.title" loading="lazy" />
    </div>
    <div class="ep-card__body">
      <span class="ep-card__num">Ep. {{ episode.number }}</span>
      <h3 class="ep-card__title">{{ episode.title }}</h3>
      <div class="ep-card__meta">
        <span>{{ formatDate(episode.date) }}</span>
        <span v-if="episode.duration" class="ep-card__sep">·</span>
        <span v-if="episode.duration">{{ episode.duration }}</span>
      </div>
      <p class="ep-card__desc">{{ truncated }}</p>
      <span v-if="variant === 'grid'" class="ep-card__cta" aria-hidden="true">
        Listen →
      </span>
    </div>
  </article>
</template>

<script>
export default {
  name: 'EpisodeCard',
  emits: ['click'],
  props: {
    episode: { type: Object, required: true },
    variant: { type: String, default: 'grid' }, // 'grid' | 'detail'
  },
  computed: {
    truncated() {
      const d = this.episode.description || '';
      return d.length > 120 ? d.slice(0, 120).trimEnd() + '…' : d;
    },
  },
  methods: {
    formatDate(dateStr) {
      if (!dateStr) return '';
      try {
        return new Date(dateStr).toLocaleDateString('en-US', {
          year: 'numeric', month: 'short', day: 'numeric',
        });
      } catch { return dateStr; }
    },
  },
};
</script>

<style scoped>
.ep-card {
  background: var(--box-color, #fff);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--color-border, rgba(0,0,0,0.08));
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.ep-card:hover,
.ep-card:focus-visible {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px var(--color-shadow, rgba(0,0,0,0.1));
  outline: none;
}

.ep-card:focus-visible {
  outline: 2px solid var(--c-accent, #c8f542);
  outline-offset: 2px;
}

.ep-card--detail {
  cursor: default;
}

.ep-card--detail:hover {
  transform: none;
  box-shadow: none;
}

.ep-card__img img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}

.ep-card__body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.ep-card__num {
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted, #888);
  font-family: var(--font-sans);
}

.ep-card__title {
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-heading, #0a0a0a);
  line-height: 1.4;
}

.ep-card__meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: var(--color-text-muted, #888);
  font-family: var(--font-sans);
}

.ep-card__sep { opacity: 0.5; }

.ep-card__desc {
  font-size: 0.82rem;
  color: var(--color-text-muted, #666);
  line-height: 1.6;
  flex: 1;
}

.ep-card__cta {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--c-accent, #c8f542);
  font-family: var(--font-sans);
  letter-spacing: 0.04em;
  margin-top: auto;
  transition: letter-spacing 0.2s;
}

.ep-card:hover .ep-card__cta {
  letter-spacing: 0.08em;
}
</style>
