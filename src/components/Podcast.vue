<template>
  <section class="podcast">
    <div class="podcast__header reveal">
      <span class="podcast__label">03 — Podcast</span>
      <div class="podcast__title-row">
        <div>
          <h2 class="podcast__title">The JohnLivingprooff<br>Podcast</h2>
          <p class="podcast__sub">Conversations on life, creativity, and building things that matter.</p>
        </div>
        <img src="/imgs/the podcast.png" alt="The JohnLivingprooff Podcast" class="podcast__cover" />
      </div>
    </div>

    <!-- Episodes grid -->
    <div class="podcast__grid" v-if="rssItems.length">
      <article
        v-for="(item, index) in rssItems.slice(0, 6)"
        :key="item.link"
        class="podcast__card reveal"
        :style="{ transitionDelay: `${index * 0.08}s` }"
      >
        <div class="podcast__card-img" v-if="item.image">
          <img :src="item.image" :alt="item.title" />
        </div>
        <div class="podcast__card-body">
          <span class="podcast__ep-num">Ep. {{ rssItems.length - index }}</span>
          <h3 class="podcast__ep-title">{{ item.title }}</h3>
          <p class="podcast__ep-date">{{ formatDate(item.pubDate) }}</p>
          <audio :src="item.audio" controls class="podcast__audio"></audio>
          <a :href="item.link" target="_blank" class="podcast__spotify-link">
            <img src="/imgs/spotify-icon.png" width="14" alt="Spotify" />
            Listen on Spotify
          </a>
        </div>
      </article>
    </div>

    <!-- Loading state -->
    <div class="podcast__loading" v-else>
      <div class="podcast__skeleton" v-for="i in 3" :key="i"></div>
    </div>

    <!-- Links -->
    <div class="podcast__footer reveal">
      <a class="podcast__btn" href="https://open.spotify.com/show/2VgMTD1eFU6R66XkZtRqEJ?si=1f822ae349914e5f" target="_blank">
        <img src="/imgs/spotify-icon.png" width="14" alt="" />
        All Episodes on Spotify
      </a>
      <a class="podcast__btn podcast__btn--ghost" href="https://pod.eiteone.org/" target="_blank">
        Visit Podcast Site
      </a>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return { rssItems: [] };
  },
  mounted() {
    this.fetchRSSFeed();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('revealed');
      });
    }, { threshold: 0.1 });

    // Re-observe after items load
    this.$nextTick(() => {
      document.querySelectorAll('.podcast .reveal').forEach(el => observer.observe(el));
    });

    document.querySelectorAll('.podcast .reveal').forEach(el => observer.observe(el));
  },
  methods: {
    async fetchRSSFeed() {
      try {
        const response = await axios.get('https://anchor.fm/s/185e0d68/podcast/rss', {
          headers: { 'Content-Type': 'application/xml; charset=utf-8' },
        });
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'text/xml');
        const items = xmlDoc.querySelectorAll('item');
        this.rssItems = Array.from(items).map(item => ({
          title: item.querySelector('title').textContent,
          link: item.querySelector('link').textContent,
          pubDate: item.querySelector('pubDate').textContent,
          audio: item.querySelector('enclosure')?.getAttribute('url') || '',
          image: this.getImageUrl(item),
        }));

        this.$nextTick(() => {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) entry.target.classList.add('revealed');
            });
          }, { threshold: 0.1 });
          document.querySelectorAll('.podcast .reveal').forEach(el => observer.observe(el));
        });
      } catch (e) {
        console.error('RSS fetch error:', e);
      }
    },
    getImageUrl(item) {
      const itunesImage = item.querySelector('itunes\\:image');
      const mediaThumbnail = item.querySelector('media\\:thumbnail');
      if (itunesImage) return itunesImage.getAttribute('href');
      if (mediaThumbnail) return mediaThumbnail.getAttribute('url');
      return '';
    },
    formatDate(dateStr) {
      try {
        return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
      } catch { return dateStr; }
    }
  }
};
</script>

<style scoped>

.podcast {
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px clamp(20px, 5vw, 80px) 80px;
  border-top: 1px solid var(--color-border, rgba(0,0,0,0.08));
}

.podcast__label {
  display: block;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text-muted, #888);
  font-family: 'Space Grotesk', sans-serif;
  margin-bottom: 32px;
}

.podcast__title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 40px;
  margin-bottom: 80px;
}

.podcast__title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2.2rem, 5vw, 4.5rem);
  font-weight: 700;
  color: var(--color-heading, #0a0a0a);
  line-height: 1.1;
  margin-bottom: 16px;
}

.podcast__sub {
  font-size: 1rem;
  color: var(--color-text-muted, #666);
  max-width: 380px;
  line-height: 1.7;
}

.podcast__cover {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  flex-shrink: 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.podcast__cover:hover {
  transform: translateY(-4px) rotate(-2deg);
  box-shadow: 0 30px 60px rgba(0,0,0,0.2);
}

/* Grid */
.podcast__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 60px;
}

.podcast__card {
  background: var(--box-color, #fff);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--color-border, rgba(0,0,0,0.08));
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.podcast__card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px var(--color-shadow, rgba(0,0,0,0.1));
}

.podcast__card-img img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}

.podcast__card-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.podcast__ep-num {
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted, #888);
  font-family: 'Space Grotesk', sans-serif;
}

.podcast__ep-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-heading, #0a0a0a);
  line-height: 1.4;
}

.podcast__ep-date {
  font-size: 0.75rem;
  color: var(--color-text-muted, #888);
}

.podcast__audio {
  width: 100%;
  height: 36px;
  border-radius: 999px;
  margin-top: 4px;
}

.podcast__spotify-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text-muted, #888);
  text-decoration: none;
  font-family: 'Space Grotesk', sans-serif;
  transition: color 0.2s;
  margin-top: 4px;
}

.podcast__spotify-link:hover {
  color: #1DB954;
}

/* Loading skeleton */
.podcast__loading {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 60px;
}

.podcast__skeleton {
  height: 320px;
  border-radius: 8px;
  background: linear-gradient(90deg, var(--color-surface-2, #f0efe9) 25%, var(--color-surface, #fff) 50%, var(--color-surface-2, #f0efe9) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
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
  background: #f5f4f0;
  color: #0a0a0a;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  font-family: 'Space Grotesk', sans-serif;
  letter-spacing: 0.04em;
  transition: background 0.2s, transform 0.2s;
}

.podcast__btn:hover {
  background: #1DB954;
  color: #fff;
  transform: translateY(-2px);
}

.podcast__btn--ghost {
  background: transparent;
  color: var(--color-heading, #0a0a0a);
  border: 1px solid var(--color-border, rgba(0,0,0,0.2));
}

.podcast__btn--ghost:hover {
  color: var(--c-off-white, #f5f4f0);
}

/* Reveal */
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
  .podcast {
    padding: 60px 20px;
  }

  .podcast__title-row {
    flex-direction: column-reverse;
    gap: 24px;
    margin-bottom: 48px;
  }

  .podcast__cover {
    width: 100px;
    height: 100px;
  }

  .podcast__grid,
  .podcast__loading {
    grid-template-columns: 1fr;
  }
}
</style>
