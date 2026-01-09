<template>
  <section class="galaxy" aria-label="Interactive project galaxy">
    <!-- <div class="toolbar">
      <div class="searchbar" ref="filterRef">
        <input v-model="q" class="search" type="search" placeholder="Search projects…" aria-label="Search projects" />
        <button class="filter-btn" @click="filtersOpen = !filtersOpen" :aria-expanded="filtersOpen" aria-haspopup="true" aria-label="Toggle filters">
          Filter
        </button>
        <div v-if="filtersOpen" class="filters-popover" role="menu" @keydown.esc.prevent.stop="filtersOpen=false">
          <div class="filters-header">Filter by tags</div>
          <label v-for="t in tags" :key="t" class="filter-item">
            <input type="checkbox" :value="t" v-model="selectedTags" />
            <span>{{ toSentenceCase(t) }}</span>
          </label>
          <div class="filters-actions">
            <button class="link" @click="selectedTags=[]">Clear</button>
            <button class="apply" @click="filtersOpen=false">Done</button>
          </div>
        </div>
      </div>
      <div class="view-toggle">
        <button :class="{ active: view==='galaxy' }" @click="view='galaxy'">Galaxy</button>
        <button :class="{ active: view==='grid' }" @click="view='grid'">Grid</button>
      </div>
    </div> -->

    <div class="toggle-bar">
      <div class="view-toggle">
        <button :class="{ active: view==='galaxy' }" @click="view='galaxy'">Node</button>
        <button :class="{ active: view==='grid' }" @click="view='grid'">Grid</button>
      </div>
    </div>

    <div v-if="view==='galaxy'" class="board" ref="boardRef">
      <svg class="lines" :width="container.w" :height="container.h" :viewBox="`0 0 ${container.w} ${container.h}`" aria-hidden="true">
        <line
          v-for="p in positions"
          :key="p.id + '-line'"
          :x1="center.x"
          :y1="center.y"
          :x2="p.x"
          :y2="p.y"
          class="line"
        />
        <line
          v-for="p in positions"
          :key="p.id + '-stub'"
          :x1="p.x"
          :y1="p.y"
          :x2="p.nx"
          :y2="p.ny"
          class="line stub"
        />
      </svg>
      <div class="glass-circle" :style="{ left: center.x + 'px', top: center.y + 'px', width: glassDiameter + 'px', height: glassDiameter + 'px' }"></div>
      <div class="center" :style="{ left: center.x + 'px', top: center.y + 'px' }">
        <img src="/icon.png" alt="Center" />
      </div>
      <button
        v-for="(p, i) in positions"
        :key="p.id"
        :class="['dot', statusClass(p.project), 'spiral-in']"
        :style="Object.assign({ left: p.x + 'px', top: p.y + 'px', animationDelay: (i * 0.08) + 's' }, tintStyle(p.project))"
        @click="open(p.project)"
        :aria-label="p.project.title"
      >
        <span class="tooltip">{{ p.project.title }}</span>
      </button>

      <div
        v-for="(p, i) in positions"
        :key="p.id + '-note'"
        :class="['note', statusClass(p.project), 'spiral-in']"
        :style="Object.assign({ left: p.nx + 'px', top: p.ny + 'px', animationDelay: (i * 0.08 + 0.15) + 's' }, tintStyle(p.project))"
        role="button"
        tabindex="0"
        @click="open(p.project)"
        @keydown.enter="open(p.project)"
      >
        <span class="pin" aria-hidden="true"></span>
        <div class="note-title">{{ p.project.title }}</div>
      </div>
    </div>

    <div v-else class="grid">
      <div v-for="proj in filtered" :key="proj.id" class="card" @click="open(proj)">
        <div class="image"><img :src="proj.image" :alt="proj.title" @error="onImgError" /></div>
        <div class="content">
          <h3>{{ proj.title }}</h3>
          <p>{{ proj.summary }}</p>
          <div class="mini-tags"><span v-for="t in proj.tags" :key="t">{{ toSentenceCase(t) }}</span></div>
        </div>
      </div>
    </div>

    <ProjectModal :open="modalOpen" :project="active" @close="close" />
  </section>
</template>

<script>
import ProjectModal from './ProjectModal.vue';
import { projects, allTags } from '@/data/projects.js';

export default {
  name: 'ProjectGalaxy',
  components: { ProjectModal },
  props: {
    selectedId: { type: String, default: null }
  },
  data() {
    return {
      q: '',
      tags: allTags,
      selectedTags: [],
      filtersOpen: false,
      view: 'galaxy',
      modalOpen: false,
      active: null,
      items: projects,
      container: { w: 0, h: 0 },
      center: { x: 0, y: 0 },
      resizeObs: null
    }
  },
  computed: {
    filtered() {
      const q = this.q.trim().toLowerCase();
      return this.items.filter(p => {
        const matchesQ = !q || `${p.title} ${p.summary}`.toLowerCase().includes(q);
        const matchesTags = this.selectedTags.length === 0 || this.selectedTags.every(t => p.tags.includes(t));
        return matchesQ && matchesTags;
      });
    },
    positions() {
      const n = this.filtered.length;
      if (!n || this.container.w === 0 || this.container.h === 0) return [];
      const cx = this.center.x;
      const cy = this.center.y;
      const minDim = Math.min(this.container.w, this.container.h);
      const margin = 80;
      const maxR = Math.max(0, (minDim / 2) - margin);
      const rings = 3;
      const radii = Array.from({ length: rings }, (_, i) => Math.round(maxR * ((i + 1) / (rings + 1)) + maxR * 0.15));
      const pos = [];
      for (let i = 0; i < n; i++) {
        const proj = this.filtered[i];
        const angle = (i / n) * Math.PI * 2;
        const r = radii[i % radii.length] || maxR * 0.6;
        const x = Math.round(cx + r * Math.cos(angle));
        const y = Math.round(cy + r * Math.sin(angle));
        const dx = x - cx; const dy = y - cy;
        const len = Math.max(1, Math.hypot(dx, dy));
        const ux = dx / len; const uy = dy / len;
        const noteOffset = Math.min(140, Math.max(70, maxR * 0.18));
        const nx = Math.round(x + ux * noteOffset);
        const ny = Math.round(y + uy * noteOffset);
        pos.push({ id: proj.id, project: proj, x, y, nx, ny });
      }
      return pos;
    },
    glassDiameter() {
      const minDim = Math.min(this.container.w, this.container.h) || 0;
      return Math.max(160, Math.min(260, Math.round(minDim * 0.32)));
    }
  },
  mounted() {
    if (typeof window !== 'undefined' && window.innerWidth <= 900) {
      this.view = 'grid';
    }
    if (this.selectedId) {
      const found = this.items.find(p => p.id === this.selectedId);
      if (found) { this.open(found); }
    }
    // Observe board size to position dots/lines responsively
    const el = this.$refs.boardRef;
    if (el && 'ResizeObserver' in window) {
      this.resizeObs = new ResizeObserver(() => this.updateSize());
      this.resizeObs.observe(el);
      this.updateSize();
    } else {
      // Fallback: compute once on next tick
      this.$nextTick(this.updateSize);
      window.addEventListener('resize', this.updateSize);
    }
  },
  beforeUnmount() {
    if (this.resizeObs) this.resizeObs.disconnect();
    window.removeEventListener('resize', this.updateSize);
  },
  methods: {
    updateSize() {
      const el = this.$refs.boardRef;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      this.container = { w: Math.round(rect.width), h: Math.round(rect.height) };
      this.center = { x: Math.round(rect.width / 2), y: Math.round(rect.height / 2) };
    },
    toSentenceCase(t) {
      if (!t) return '';
      const s = String(t);
      return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    },
    tintFor(project) {
      const map = new Map([
        ['mobile', '#4db6ff'],
        ['app', '#60a5fa'],
        ['commerce', '#34d399'],
        ['education', '#a78bfa'],
        ['health', '#f472b6'],
        ['agri', '#86efac'],
        ['platform', '#f59e0b'],
        ['pos', '#22d3ee'],
        ['manufacturing', '#fcd34d'],
        ['creative', '#f472b6']
      ]);
      const tag = (project.tags || []).find(t => map.has(t));
      return tag ? map.get(tag) : 'rgba(255,215,0,0.75)';
    },
    tintStyle(project) {
      return { '--tint': this.tintFor(project) };
    },
    statusClass(project) {
      return project.status === 'building' ? 'is-building' : 'is-live';
    },
    open(proj) {
      this.active = proj;
      this.modalOpen = true;
      // push deep link without leaving the page
      if (this.$route?.name === 'projects') {
        this.$router.replace({ name: 'projects', params: { id: proj.id } });
      }
    },
    close() {
      this.modalOpen = false;
      this.active = null;
      if (this.$route?.params?.id) {
        this.$router.replace({ name: 'projects' });
      }
    },
    onImgError(e) {
      e.target.src = '/logo.png';
      e.target.style.objectFit = 'contain';
      e.target.style.padding = '10px';
    }
  }
}
</script>

<style scoped>
.galaxy { width: 100%; display: grid; gap: 16px; }
.toolbar { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 12px; }
.searchbar { position: relative; display: grid; }
.search { width: 100%; padding: 10px 84px 10px 12px; border: 1px solid gold; border-radius: 10px; background: transparent; color: var(--color-text); }
.filter-btn { position: absolute; right: 6px; top: 6px; padding: 6px 10px; border-radius: 8px; border: 1px solid gold; background: rgba(255,215,0,0.08); color: gold; cursor: pointer; }
.filters-popover { position: absolute; right: 0; top: calc(100% + 6px); min-width: 280px; background: var(--color-background-soft); border: 1px solid rgba(255,215,0,0.5); border-radius: 12px; box-shadow: 0 18px 40px rgba(0,0,0,0.35); padding: 10px; z-index: 20; }
.filters-header { font-weight: 700; margin: 4px 6px 8px; }
.filter-item { display: flex; align-items: center; gap: 8px; padding: 6px 6px; }
.filters-actions { display: flex; justify-content: space-between; align-items: center; padding: 6px; }
.filters-actions .link { background: transparent; border: none; color: gold; cursor: pointer; }
.filters-actions .apply { border: 1px solid gold; background: gold; color: #222; padding: 6px 10px; border-radius: 8px; }
.toggle-bar { position: fixed; top: 50px; right: 50px; z-index: 50; display: flex; justify-content: flex-end; }
.view-toggle { display: flex; gap: 8px; background: rgba(0,0,0,0.25); padding: 6px; border-radius: 12px; box-shadow: 0 10px 24px rgba(0,0,0,0.3); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
 .view-toggle button { padding: 8px 14px; border: 1px solid gold; background: rgba(0,0,0,0.25); color: gold; border-radius: 10px; }
.view-toggle .active { background: gold; color: #222; font-weight: 700; }


/* Static crime-board style */
.board { position: relative; min-height: 640px; }
.lines { position: absolute; inset: 0; pointer-events: none; z-index: 1; }
.line { stroke: rgba(255,215,0,0.6); stroke-width: 1.2; }
.glass-circle { position: absolute; transform: translate(-50%, -50%); border-radius: 50%; z-index: 2; background: rgba(20,20,20,0.25); -webkit-backdrop-filter: blur(8px) saturate(120%); backdrop-filter: blur(8px) saturate(120%); border: 1px solid rgba(255,215,0,0.35); box-shadow: inset 0 8px 24px rgba(0,0,0,0.25); }
.center { position: absolute; transform: translate(-50%, -50%); width: 130px; height: 130px; display: grid; place-items: center; z-index: 3; }
.center img { width: 100px; height: 100px; opacity: 0.95; }
.dot { position: absolute; transform: translate(-50%, -50%); width: 18px; height: 18px; border-radius: 50%; background: #111; border: 2px solid var(--tint, gold); box-shadow: 0 6px 18px rgba(0,0,0,0.35); cursor: pointer; z-index: 4; }
.dot .tooltip { position: absolute; top: -8px; left: 50%; transform: translate(-50%, -100%); background: rgba(0,0,0,0.8); color: gold; padding: 4px 8px; border-radius: 8px; font-size: .75rem; white-space: nowrap; opacity: 0; pointer-events: none; transition: opacity .2s ease, transform .2s ease; border: 1px solid rgba(255,215,0,0.35); }
.dot:hover .tooltip, .dot:focus .tooltip { opacity: 1; transform: translate(-50%, -110%); }
.stub { stroke-width: 1.2; opacity: 0.9; stroke-dasharray: 2 6; }
.is-building.line, .is-building.stub, .is-live.line { }
.is-building.dot { opacity: 0.85; }
.note { position: absolute; transform: translate(-50%, -50%) rotate(-1deg); background: rgba(255, 253, 231, 0.9); color: #1a1a1a; padding: 6px 10px; border-radius: 6px; font-size: .8rem; box-shadow: 0 10px 22px rgba(0,0,0,0.25); border: 1px solid color-mix(in oklab, var(--tint, gold) 40%, #e6e6e6); z-index: 4; }
.note .pin { position: absolute; width: 8px; height: 8px; background: var(--tint, gold); border-radius: 50%; top: -4px; left: 50%; transform: translateX(-50%); box-shadow: 0 2px 6px rgba(0,0,0,0.45); }
.note .note-title { font-weight: 700; }

.grid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 18px; }
@media (max-width: 1024px) { .grid { grid-template-columns: repeat(2, minmax(0,1fr)); } }
@media (max-width: 640px) { .grid { grid-template-columns: 1fr; } }
.card { border: 1px solid gold; border-radius: 10px; overflow: hidden; box-shadow: 0 10px 20px rgba(0,0,0,0.25); background: var(--color-background-soft); }
.image { height: 220px; display: grid; place-items: center; background: linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.36)); }
.image img { width: 100%; height: 100%; object-fit: cover; }
.content { padding: 12px 14px; }
.content h3 { margin: 0 0 6px; }
.mini-tags { display: flex; gap: 6px; flex-wrap: wrap; }
.mini-tags span { font-size: .75rem; border: 1px solid rgba(255,215,0,0.4); border-radius: 999px; padding: 4px 8px; color: gold; }

@media (prefers-reduced-motion: reduce) {
  .spiral-in { animation: none !important; opacity: 1 !important; }
}

/* Spiral-in animation on load */
.spiral-in {
  opacity: 0;
  animation: spiralIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes spiralIn {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.2) rotate(-180deg);
  }
  60% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1) rotate(0deg);
  }
}

@media (max-width: 900px) {
  .toggle-bar {
    position: sticky;
    top: 66px;
    right: 0;
    width: 100%;
    justify-content: center;
    padding: 6px 10px;
  }

  .view-toggle {
    gap: 6px;
    width: min(420px, 100%);
    justify-content: center;
  }

  .view-toggle button {
    flex: 1;
    font-weight: 600;
  }

  .board {
    min-height: 520px;
    margin-top: 12px;
  }

  .dot .tooltip { display: none; }
}

@media (max-width: 640px) {
  .galaxy { gap: 10px; }
  .card { border-radius: 12px; }
  .image { height: 190px; }
}
</style>
