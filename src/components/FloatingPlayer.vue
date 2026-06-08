<template>
  <Transition name="float">
    <div class="float-player" v-if="store.episode" role="region" aria-label="Now playing">
      <!-- Cover + info -->
      <img :src="store.episode.image || '/imgs/the podcast.png'" :alt="store.episode.title" class="fp__cover" />
      <div class="fp__info">
        <span class="fp__ep">Ep. {{ store.episode.number }}</span>
        <span class="fp__title">{{ store.episode.title }}</span>
      </div>

      <audio
        ref="audio"
        :src="store.episode.audioUrl"
        @timeupdate="onTimeUpdate"
        @loadedmetadata="onMeta"
        @ended="store.playing = false"
        preload="metadata"
      ></audio>

      <!-- Play/Pause -->
      <button class="fp__btn fp__play" @click="toggle" :aria-label="store.playing ? 'Pause' : 'Play'">
        <svg v-if="!store.playing" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M8 5.14v14l11-7-11-7z"/></svg>
        <svg v-else viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
      </button>

      <!-- Scrubber -->
      <div class="fp__scrubber" @click="seek" ref="scrubber" aria-label="Seek">
        <div class="fp__track">
          <div class="fp__progress" :style="{ width: pct + '%' }"></div>
          <div class="fp__thumb" :style="{ left: pct + '%' }"></div>
        </div>
      </div>

      <span class="fp__time">{{ currentFmt }}</span>

      <!-- Close -->
      <button class="fp__btn fp__close" @click="store.close()" aria-label="Close player">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>
  </Transition>
</template>

<script>
import { playerStore } from '@/playerStore.js';

export default {
  name: 'FloatingPlayer',
  data() {
    return { store: playerStore, current: 0, duration: 0 };
  },
  computed: {
    pct() { return this.duration ? (this.current / this.duration) * 100 : 0; },
    currentFmt() {
      const s = this.current;
      if (!s) return '0:00';
      return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
    },
  },
  watch: {
    'store.playing'(val) {
      this.$nextTick(() => {
        val ? this.$refs.audio?.play() : this.$refs.audio?.pause();
      });
    },
    'store.episode'() {
      this.current = 0;
      this.duration = 0;
      if (this.store.playing) {
        this.$nextTick(() => this.$refs.audio?.play());
      }
    },
  },
  methods: {
    toggle() {
      this.store.playing = !this.store.playing;
    },
    onTimeUpdate() { this.current = this.$refs.audio.currentTime; },
    onMeta() { this.duration = this.$refs.audio.duration; },
    seek(e) {
      const rect = this.$refs.scrubber.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      this.$refs.audio.currentTime = pct * this.duration;
    },
  },
};
</script>

<style scoped>
.float-player {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  width: min(680px, calc(100vw - 48px));
  background: rgba(10, 10, 10, 0.72);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
  color: var(--c-off-white, #f5f4f0);
  font-family: var(--font-sans);
  user-select: none;
}

.fp__cover {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
}

.fp__info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 0 0 140px;
}

.fp__ep {
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--c-accent, #c8f542);
  font-weight: 600;
}

.fp__title {
  font-size: 0.78rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--c-off-white, #f5f4f0);
}

.fp__btn {
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-off-white, #f5f4f0);
  transition: color 0.15s, transform 0.15s;
  padding: 4px;
}
.fp__btn:hover { color: var(--c-accent, #c8f542); transform: scale(1.1); }

.fp__play {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--c-accent, #c8f542) !important;
  color: #0a0a0a !important;
  transition: transform 0.15s, box-shadow 0.15s !important;
}
.fp__play:hover { transform: scale(1.08) !important; box-shadow: 0 6px 16px rgba(200,245,66,0.4); }

.fp__scrubber {
  flex: 1;
  padding: 8px 0;
  cursor: pointer;
  min-width: 0;
}

.fp__track {
  position: relative;
  height: 3px;
  background: rgba(245,244,240,0.15);
  border-radius: 99px;
}

.fp__progress {
  position: absolute;
  inset: 0;
  right: auto;
  background: var(--c-accent, #c8f542);
  border-radius: 99px;
  transition: width 0.1s linear;
}

.fp__thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--c-accent, #c8f542);
  transition: transform 0.15s;
}
.fp__scrubber:hover .fp__thumb { transform: translate(-50%, -50%) scale(1); }

.fp__time {
  font-size: 0.72rem;
  color: rgba(245,244,240,0.5);
  white-space: nowrap;
  flex-shrink: 0;
}

.fp__close { opacity: 0.5; }
.fp__close:hover { opacity: 1; color: #ff6b6b !important; }

/* Transition */
.float-enter-active, .float-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.float-enter-from, .float-leave-to { opacity: 0; transform: translateX(-50%) translateY(16px); }

@media (max-width: 480px) {
  .fp__info { display: none; }
  .float-player { gap: 10px; }
}
</style>
