<template>
  <div v-if="open" class="overlay" @click.self="close">
    <div class="modal" role="dialog" aria-modal="true" :aria-label="project?.title || 'Project'">
      <button class="modal__close" @click="close" aria-label="Close">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2L14 14M14 2L2 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </button>

      <div class="modal__thumb">
        <img :src="project?.image" :alt="project?.title" @error="onImgError" />
      </div>

      <div class="modal__body">
        <div class="modal__meta">
          <span class="modal__status" :data-state="project?.status">{{ project?.status }}</span>
          <div class="modal__tags">
            <span v-for="t in project?.tags || []" :key="t">{{ toSentenceCase(t) }}</span>
          </div>
        </div>

        <h2 class="modal__title">{{ project?.title }}</h2>
        <p class="modal__summary">{{ project?.summary }}</p>

        <div class="modal__actions">
          <a v-if="project?.href" :href="project.href" target="_blank" rel="noopener noreferrer" class="modal__btn modal__btn--primary">
            Visit Live Project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <router-link :to="{ name: 'projects', params: { id: project?.id } }" class="modal__btn modal__btn--outline">Permalink</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectModal',
  props: {
    project: { type: Object, default: null },
    open: { type: Boolean, default: false }
  },
  emits: ['close'],
  methods: {
    close() { this.$emit('close'); },
    toSentenceCase(t) {
      if (!t) return '';
      return String(t).charAt(0).toUpperCase() + String(t).slice(1).toLowerCase();
    },
    onImgError(e) {
      e.target.src = '/logo.png';
      e.target.style.objectFit = 'contain';
      e.target.style.padding = '20px';
    }
  }
}
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 10, 0.5);
  display: grid;
  place-items: center;
  z-index: 1000;
  padding: 20px;
}

.modal {
  position: relative;
  width: min(760px, 100%);
  background: var(--color-surface, #fff);
  color: var(--color-text, #111);
  border: 1px solid var(--color-border, rgba(0,0,0,0.08));
  border-radius: 4px;
  box-shadow: 0 24px 80px rgba(0,0,0,0.18);
  overflow: hidden;
}

.modal__close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border: 1px solid var(--color-border, rgba(0,0,0,0.1));
  border-radius: 4px;
  background: var(--color-surface, #fff);
  color: var(--color-text-muted, #666);
  cursor: pointer;
  z-index: 1;
  transition: background 0.2s, color 0.2s;
}

.modal__close:hover {
  background: var(--color-heading, #0a0a0a);
  color: var(--c-off-white, #f5f4f0);
  border-color: var(--color-heading, #0a0a0a);
}

.modal__thumb {
  width: 100%;
  height: 260px;
  overflow: hidden;
  background: var(--color-surface-2, #f0efe9);
}

.modal__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.modal__body {
  padding: 28px 32px 32px;
}

.modal__meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.modal__status {
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 999px;
  font-family: var(--font-sans, 'Space Grotesk', sans-serif);
}

.modal__status[data-state="live"] {
  background: rgba(200,245,66,0.15);
  color: #3a6000;
  border: 1px solid rgba(200,245,66,0.4);
}

.modal__status[data-state="building"] {
  background: rgba(245,200,66,0.12);
  color: #7a5500;
  border: 1px solid rgba(245,200,66,0.35);
}

.modal__tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.modal__tags span {
  font-size: 0.72rem;
  padding: 3px 10px;
  border-radius: 999px;
  border: 1px solid var(--color-border, rgba(0,0,0,0.1));
  color: var(--color-text-muted, #666);
  font-family: var(--font-sans, 'Space Grotesk', sans-serif);
}

.modal__title {
  font-family: var(--font-display, 'Space Grotesk', sans-serif);
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 700;
  color: var(--color-heading, #0a0a0a);
  margin: 0 0 12px;
  line-height: 1.1;
}

.modal__summary {
  font-size: 0.95rem;
  line-height: 1.75;
  color: var(--color-text-muted, #666);
  margin-bottom: 28px;
}

.modal__actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.modal__btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  font-family: var(--font-sans, 'Space Grotesk', sans-serif);
  letter-spacing: 0.04em;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
}

.modal__btn--primary {
  background: var(--c-accent, #c8f542);
  color: #0a0a0a;
}

.modal__btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(200,245,66,0.3);
}

.modal__btn--outline {
  background: transparent;
  color: var(--color-heading, #0a0a0a);
  border: 1px solid var(--color-border, rgba(0,0,0,0.15));
}

.modal__btn--outline:hover {
  background: var(--color-surface-2, #f0efe9);
}

@media (prefers-reduced-motion: no-preference) {
  .modal { animation: rise 260ms ease-out; }
  @keyframes rise { from { transform: translateY(12px); opacity: 0 } to { transform: none; opacity: 1 } }
}

@media (max-width: 640px) {
  .modal__body { padding: 20px; }
  .modal__thumb { height: 200px; }
}
</style>
