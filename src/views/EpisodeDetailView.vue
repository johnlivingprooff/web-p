<template>
  <div class="ep-detail" v-if="episode">
    <div class="ep-detail__nav">
      <router-link to="/podcast" class="ep-detail__back">← All episodes</router-link>
    </div>

    <article class="ep-detail__inner">
      <!-- Header -->
      <header class="ep-detail__header">
        <img :src="episode.image || '/imgs/the podcast.png'" :alt="episode.title" class="ep-detail__cover" />
        <div class="ep-detail__hero-text">
          <span class="ep-detail__num">Episode {{ episode.number }}</span>
          <h1 class="ep-detail__title">{{ episode.title }}</h1>
          <div class="ep-detail__meta">
            <span>{{ formatDate(episode.date) }}</span>
            <span v-if="episode.duration" class="ep-detail__dot">·</span>
            <span v-if="episode.duration">{{ episode.duration }}</span>
          </div>
        </div>
      </header>

      <!-- Audio player trigger -->
      <div class="ep-detail__player" v-if="episode.audioUrl">
        <button class="ep-detail__play-btn" @click="playEpisode" :aria-label="isPlaying ? 'Pause episode' : 'Play episode'">
          <span class="ep-detail__play-icon">
            <svg v-if="!isPlaying" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M8 5.14v14l11-7-11-7z"/></svg>
            <svg v-else viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          </span>
          <span>{{ isPlaying ? 'Now playing' : 'Play episode' }}</span>
        </button>
      </div>

      <!-- Description -->
      <div class="ep-detail__desc">
        <p>{{ episode.description }}</p>
        <a :href="episode.spotifyUrl" target="_blank" rel="noopener noreferrer" class="ep-detail__spotify-btn">
          <img src="/imgs/spotify-icon.png" width="16" alt="" /> Listen on Spotify
        </a>
      </div>

      <!-- Giscus comments -->
      <div class="ep-detail__comments">
        <h2 class="ep-detail__comments-title">Join the conversation</h2>
        <p class="ep-detail__comments-hint">
          Sign in with GitHub to comment. Powered by
          <a href="https://giscus.app" target="_blank" rel="noopener noreferrer">Giscus</a>.
        </p>
        <div ref="giscus"></div>
      </div>
    </article>
  </div>

  <div class="ep-detail ep-detail--missing" v-else>
    <div class="ep-detail__nav">
      <router-link to="/podcast" class="ep-detail__back">← All episodes</router-link>
    </div>
    <div class="ep-detail__inner">
      <p class="ep-detail__404">Episode not found.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { episodes as staticEpisodes, rssItemToEpisode } from '@/data/episodes.js';
import { playerStore } from '@/playerStore.js';

export default {
  name: 'EpisodeDetailView',
  components: {},
  data() {
    return { episode: null, allEpisodes: [], store: playerStore };
  },
  computed: {
    isPlaying() {
      return this.store.episode?.slug === this.episode?.slug && this.store.playing;
    },
  },
  async mounted() {
    await this.loadEpisodes();
    this.findEpisode();
    this.$nextTick(() => this.mountGiscus());
  },
  watch: {
    '$route.params.slug'() {
      this.findEpisode();
      this.$nextTick(() => this.mountGiscus());
    },
  },
  methods: {
    async loadEpisodes() {
      try {
        const res = await axios.get('https://anchor.fm/s/185e0d68/podcast/rss');
        const doc = new DOMParser().parseFromString(res.data, 'text/xml');
        const items = Array.from(doc.querySelectorAll('item'));
        this.allEpisodes = items.map((item, i) => rssItemToEpisode(item, i, items.length));
      } catch {
        this.allEpisodes = staticEpisodes;
      }
    },
    findEpisode() {
      const slug = this.$route.params.slug;
      this.episode = this.allEpisodes.find(e => e.slug === slug) || null;
    },
    playEpisode() {
      if (this.isPlaying) {
        this.store.playing = false;
      } else if (this.store.episode?.slug === this.episode.slug) {
        this.store.playing = true;
      } else {
        this.store.play(this.episode);
      }
    },
    mountGiscus() {
      const el = this.$refs.giscus;
      if (!el || !this.episode) return;
      el.innerHTML = '';
      const s = document.createElement('script');
      s.src = 'https://giscus.app/client.js';
      s.async = true;
      s.setAttribute('data-repo', 'johnlivingprooff/web-p');
      s.setAttribute('data-repo-id', 'R_kgDOMvgsag');
      s.setAttribute('data-category', 'Podcast');
      s.setAttribute('data-category-id', 'DIC_kwDOMvgsas4C-uIB');
      s.setAttribute('data-mapping', 'specific');
      s.setAttribute('data-term', this.episode.slug);
      s.setAttribute('data-strict', '0');
      s.setAttribute('data-reactions-enabled', '1');
      s.setAttribute('data-emit-metadata', '0');
      s.setAttribute('data-input-position', 'bottom');
      s.setAttribute('data-theme', 'preferred_color_scheme');
      s.setAttribute('data-lang', 'en');
      s.setAttribute('data-loading', 'lazy');
      s.setAttribute('crossorigin', 'anonymous');
      el.appendChild(s);
    },
    formatDate(d) {
      if (!d) return '';
      try { return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }); }
      catch { return d; }
    },
  },
};
</script>

<style scoped>
.ep-detail {
  background: var(--color-background);
  min-height: 100vh;
  font-family: var(--font-sans);
}

.ep-detail__nav {
  max-width: var(--container-max, 1200px);
  margin: 0 auto;
  padding: 100px var(--container-pad, clamp(20px,5vw,80px)) 0;
}

.ep-detail__back {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-muted, #888);
  text-decoration: none;
  font-family: var(--font-sans);
  letter-spacing: 0.04em;
  transition: color 0.2s;
}
.ep-detail__back:hover { color: var(--color-heading, #0a0a0a); }

.ep-detail__inner {
  max-width: 800px;
  margin: 0 auto;
  padding: 48px var(--container-pad, clamp(20px,5vw,80px)) 80px;
}

.ep-detail__header {
  display: flex;
  gap: 32px;
  align-items: flex-start;
  margin-bottom: 40px;
}

.ep-detail__cover {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 12px;
  flex-shrink: 0;
  box-shadow: 0 16px 40px rgba(0,0,0,0.15);
}

.ep-detail__hero-text { display: flex; flex-direction: column; gap: 10px; padding-top: 4px; }

.ep-detail__num {
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--c-accent, #c8f542);
  font-weight: 600;
}

.ep-detail__title {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 4vw, 2.8rem);
  font-weight: 700;
  line-height: 1.15;
  color: var(--color-heading, #0a0a0a);
}

.ep-detail__meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  color: var(--color-text-muted, #888);
}
.ep-detail__dot { opacity: 0.5; }

.ep-detail__player { margin-bottom: 40px; }

.ep-detail__play-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 14px 28px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  color: var(--color-heading, #0a0a0a);
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
}
.ep-detail__play-btn:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 10px 28px rgba(0,0,0,0.1);
}

@media (prefers-color-scheme: dark) {
  .ep-detail__play-btn { color: var(--c-off-white, #f5f4f0); border-color: rgba(255,255,255,0.1); }
}

.ep-detail__play-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--c-accent, #c8f542);
  color: #0a0a0a;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ep-detail__desc {
  margin-bottom: 60px;
  padding-bottom: 60px;
  border-bottom: 1px solid var(--color-border, rgba(0,0,0,0.08));
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.ep-detail__desc p { font-size: 1rem; line-height: 1.8; color: var(--color-text, #111); }

.ep-detail__spotify-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: #1DB954;
  color: #fff;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 700;
  font-family: var(--font-sans);
  letter-spacing: 0.04em;
  align-self: flex-start;
  transition: transform 0.2s, box-shadow 0.2s;
}
.ep-detail__spotify-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(29,185,84,0.3);
}

.ep-detail__comments-title {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-heading, #0a0a0a);
  margin-bottom: 8px;
}

.ep-detail__comments-hint {
  font-size: 0.85rem;
  color: var(--color-text-muted, #888);
  margin-bottom: 32px;
  line-height: 1.6;
}
.ep-detail__comments-hint a { color: inherit; text-decoration: underline; text-underline-offset: 3px; }
.ep-detail__comments-hint a:hover { color: var(--color-heading, #0a0a0a); }

.ep-detail__404 { font-size: 1.1rem; color: var(--color-text-muted, #888); padding-top: 60px; }

@media (max-width: 600px) {
  .ep-detail__nav { padding-top: 60px; }
  .ep-detail__header { flex-direction: column; gap: 20px; }
  .ep-detail__cover { width: 100px; height: 100px; }
}
</style>
