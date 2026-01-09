<template>
  <div v-if="open" class="overlay" @click.self="close">
    <div class="modal" role="dialog" aria-modal="true" :aria-label="project?.title || 'Project'">
      <button class="close" @click="close" aria-label="Close">×</button>
      <div class="header">
        <img class="thumb" :src="project?.image" :alt="project?.title" @error="onImgError" />
        <div class="meta">
          <h2>{{ project?.title }}</h2>
          <div class="badges">
            <span v-for="t in project?.tags || []" :key="t" class="tag">{{ t }}</span>
            <span class="status" :data-state="project?.status">{{ project?.status }}</span>
          </div>
        </div>
      </div>
      <p class="summary">{{ project?.summary }}</p>
      <div class="actions">
        <a v-if="project?.href" :href="project.href" target="_blank" rel="noopener noreferrer" class="primary">
          Visit Live Project
        </a>
        <router-link :to="{ name: 'projects', params: { id: project?.id } }" class="secondary">Permalink</router-link>
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
  background: rgba(0,0,0,0.6);
  display: grid;
  place-items: center;
  z-index: 1000;
}
.modal {
  width: min(820px, 92vw);
  background: var(--color-background-soft);
  color: var(--color-text);
  border: 1px solid gold;
  border-radius: 14px;
  box-shadow: 0 18px 60px rgba(0,0,0,0.45);
  padding: 20px;
}
.close {
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 24px;
  border: none;
  background: transparent;
  color: var(--color-text);
  cursor: pointer;
}
.header {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 16px;
  align-items: center;
}
.thumb {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid rgba(255,215,0,0.5);
}
.badges { display: flex; flex-wrap: wrap; gap: 8px; }
.tag {
  font-size: 0.8rem;
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(255,215,0,0.12);
  border: 1px solid rgba(255,215,0,0.4);
}
.status {
  margin-left: auto;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(0,0,0,0.25);
  border: 1px dashed gold;
  text-transform: capitalize;
}
.summary { margin: 16px 0; }
.actions { display: flex; gap: 12px; }
.primary, .secondary {
  text-decoration: none;
  padding: 10px 16px;
  border-radius: 8px;
}
.primary {
  background: gold;
  color: #242424;
  font-weight: 700;
}
.secondary { border: 1px solid gold; color: gold; }

@media (prefers-reduced-motion: no-preference) {
  .modal { animation: rise 260ms ease-out; }
  @keyframes rise { from { transform: translateY(10px); opacity: 0 } to { transform: none; opacity: 1 } }
}
</style>
