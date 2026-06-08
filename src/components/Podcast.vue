<template>
  <section class="podcast" aria-label="Episode list">
    <!-- Loading skeletons -->
    <template v-if="loading">
      <div class="podcast__grid" aria-busy="true" aria-label="Loading episodes">
        <div class="podcast__skeleton" v-for="i in PER_PAGE" :key="i" aria-hidden="true"></div>
      </div>
    </template>

    <!-- Episodes grid -->
    <div v-else class="podcast__grid" ref="gridEl">
      <EpisodeCard
        v-for="(ep, i) in pageEpisodes"
        :key="ep.slug"
        :episode="ep"
        variant="grid"
        class="reveal"
        :style="{ transitionDelay: `${i * 0.06}s` }"
        @click="goToEpisode(ep)"
      />
    </div>

    <!-- Pagination -->
    <nav
      v-if="totalPages > 1"
      class="podcast__pagination"
      aria-label="Episode pages"
    >
      <button
        class="podcast__page-btn"
        :disabled="page === 1"
        @click="changePage(page - 1)"
        aria-label="Previous page"
      >← Prev</button>

      <button
        v-for="p in totalPages"
        :key="p"
        class="podcast__page-btn"
        :class="{ active: p === page }"
        @click="changePage(p)"
        :aria-label="`Page ${p}`"
        :aria-current="p === page ? 'page' : undefined"
      >{{ p }}</button>

      <button
        class="podcast__page-btn"
        :disabled="page === totalPages"
        @click="changePage(page + 1)"
        aria-label="Next page"
      >Next →</button>
    </nav>

    <!-- Footer links -->
    <div class="podcast__footer reveal">
      <a
        class="podcast__btn"
        href="https://open.spotify.com/show/2VgMTD1eFU6R66XkZtRqEJ"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/imgs/spotify-icon.png" width="14" alt="" />
        All Episodes on Spotify
      </a>
      <a class="podcast__btn podcast__btn--ghost" href="https://pod.eiteone.org/" target="_blank" rel="noopener noreferrer">
        Visit Podcast Site
      </a>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
import EpisodeCard from './EpisodeCard.vue';
import { episodes as staticEpisodes, rssItemToEpisode } from '@/data/episodes.js';

const PER_PAGE = 6;

export default {
  components: { EpisodeCard },
  data() {
    return {
      PER_PAGE,
      episodes: [],
      page: 1,
      loading: true,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.episodes.length / PER_PAGE);
    },
    pageEpisodes() {
      const start = (this.page - 1) * PER_PAGE;
      return this.episodes.slice(start, start + PER_PAGE);
    },
  },
  async mounted() {
    await this.fetchEpisodes();
    this.observeReveal();
  },
  methods: {
    async fetchEpisodes() {
      try {
        const res = await axios.get('https://anchor.fm/s/185e0d68/podcast/rss');
        const doc = new DOMParser().parseFromString(res.data, 'text/xml');
        const items = Array.from(doc.querySelectorAll('item'));
        this.episodes = items.map((item, i) => rssItemToEpisode(item, i, items.length));
      } catch {
        this.episodes = staticEpisodes;
      } finally {
        this.loading = false;
        this.$nextTick(() => this.observeReveal());
      }
    },
    changePage(p) {
      if (p < 1 || p > this.totalPages) return;
      this.page = p;
      this.$nextTick(() => {
        // Scroll grid top into view
        this.$refs.gridEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.observeReveal();
      });
    },
    observeReveal() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); });
      }, { threshold: 0.1 });
      this.$el.querySelectorAll('.reveal:not(.revealed)').forEach(el => observer.observe(el));
    },
    goToEpisode(ep) {
      this.$router.push(`/podcast/${ep.slug}`);
    },
  },
};
</script>

<style scoped>
.podcast {
  max-width: var(--container-max, 1200px);
  margin: 0 auto;
  padding: 0 var(--container-pad, clamp(20px, 5vw, 80px)) 80px;
}

/* Grid */
.podcast__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 48px;
}

/* Skeletons */
.podcast__skeleton {
  height: 340px;
  border-radius: 8px;
  background: linear-gradient(
    90deg,
    var(--color-surface-2, #f0efe9) 25%,
    var(--color-surface, #fff) 50%,
    var(--color-surface-2, #f0efe9) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Pagination */
.podcast__pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 60px;
}

.podcast__page-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  padding: 0 12px;
  border: 1px solid var(--color-border, rgba(0,0,0,0.12));
  border-radius: 4px;
  background: transparent;
  color: var(--color-text, #111);
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}

.podcast__page-btn:hover:not(:disabled) {
  background: var(--color-heading, #0a0a0a);
  color: var(--c-off-white, #f5f4f0);
  border-color: var(--color-heading, #0a0a0a);
}

.podcast__page-btn.active {
  background: var(--c-accent, #c8f542);
  color: #0a0a0a;
  border-color: var(--c-accent, #c8f542);
  font-weight: 700;
}

.podcast__page-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* Footer */
.podcast__footer {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.podcast__btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: var(--color-surface-2, #f5f4f0);
  color: var(--color-heading, #0a0a0a);
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  font-family: var(--font-sans);
  letter-spacing: 0.04em;
  transition: background 0.2s, transform 0.2s, color 0.2s;
}

.podcast__btn:hover {
  background: #1DB954;
  color: #fff;
  transform: translateY(-2px);
}

.podcast__btn--ghost {
  background: transparent;
  border: 1px solid var(--color-border, rgba(0,0,0,0.2));
}

.podcast__btn--ghost:hover {
  background: var(--color-heading, #0a0a0a);
  color: var(--c-off-white, #f5f4f0);
}

/* Reveal animation */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 900px) {
  .podcast__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .podcast__grid {
    grid-template-columns: 1fr;
  }

  .podcast {
    padding: 0 20px 60px;
  }
}
</style>
