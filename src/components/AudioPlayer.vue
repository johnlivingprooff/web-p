<template>
  <div class="player" :class="{ 'player--playing': playing }">
    <audio ref="audio" :src="src" @timeupdate="onTimeUpdate" @loadedmetadata="onMeta" @ended="playing = false" preload="metadata"></audio>

    <!-- Play / Pause -->
    <button class="player__play" @click="toggle" :aria-label="playing ? 'Pause' : 'Play'">
      <svg v-if="!playing" viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M8 5.14v14l11-7-11-7z"/></svg>
      <svg v-else viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
    </button>

    <!-- Scrubber -->
    <div class="player__scrubber" @click="seek" @mousemove="onHover" @mouseleave="hoverTime = null" ref="scrubber" aria-label="Seek">
      <div class="player__track">
        <div class="player__progress" :style="{ width: progressPct + '%' }"></div>
        <div class="player__thumb" :style="{ left: progressPct + '%' }"></div>
      </div>
      <div class="player__hover-time" v-if="hoverTime !== null" :style="{ left: hoverPct + '%' }">{{ hoverTime }}</div>
    </div>

    <!-- Time -->
    <span class="player__time">{{ currentFmt }} / {{ durationFmt }}</span>

    <!-- Speed -->
    <button class="player__speed" @click="cycleSpeed" :aria-label="`Playback speed: ${speed}x`">{{ speed }}×</button>
  </div>
</template>

<script>
export default {
  name: 'AudioPlayer',
  props: { src: { type: String, required: true } },
  data() {
    return { playing: false, current: 0, duration: 0, hoverTime: null, hoverPct: 0, speed: 1 };
  },
  computed: {
    progressPct() { return this.duration ? (this.current / this.duration) * 100 : 0; },
    currentFmt() { return this.fmt(this.current); },
    durationFmt() { return this.fmt(this.duration); },
  },
  methods: {
    toggle() {
      const a = this.$refs.audio;
      this.playing ? a.pause() : a.play();
      this.playing = !this.playing;
    },
    onTimeUpdate() { this.current = this.$refs.audio.currentTime; },
    onMeta() { this.duration = this.$refs.audio.duration; },
    seek(e) {
      const rect = this.$refs.scrubber.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      this.$refs.audio.currentTime = pct * this.duration;
    },
    onHover(e) {
      const rect = this.$refs.scrubber.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      this.hoverPct = pct * 100;
      this.hoverTime = this.fmt(pct * this.duration);
    },
    cycleSpeed() {
      const speeds = [1, 1.25, 1.5, 2];
      this.speed = speeds[(speeds.indexOf(this.speed) + 1) % speeds.length];
      this.$refs.audio.playbackRate = this.speed;
    },
    fmt(s) {
      if (!s || isNaN(s)) return '0:00';
      const m = Math.floor(s / 60), sec = Math.floor(s % 60);
      return `${m}:${sec.toString().padStart(2, '0')}`;
    },
  },
};
</script>

<style scoped>
.player {
  display: flex;
  align-items: center;
  gap: 14px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px 20px;
  color: var(--color-heading, #0a0a0a);
  font-family: var(--font-sans);
  user-select: none;
}

.player__play {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--c-accent, #c8f542);
  color: #0a0a0a;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s, box-shadow 0.15s;
}
.player__play:hover { transform: scale(1.08); box-shadow: 0 8px 20px rgba(200,245,66,0.35); }

.player__scrubber {
  flex: 1;
  position: relative;
  padding: 10px 0;
  cursor: pointer;
}

.player__track {
  position: relative;
  height: 3px;
  background: rgba(10,10,10,0.12);
  border-radius: 99px;
}

.player__progress {
  position: absolute;
  inset: 0;
  right: auto;
  background: var(--c-accent, #c8f542);
  border-radius: 99px;
  transition: width 0.1s linear;
}

.player__thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--c-accent, #c8f542);
  transition: transform 0.15s;
}
.player__scrubber:hover .player__thumb { transform: translate(-50%, -50%) scale(1); }

.player__hover-time {
  position: absolute;
  bottom: calc(100% - 4px);
  transform: translateX(-50%);
  background: var(--c-accent, #c8f542);
  color: #0a0a0a;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  pointer-events: none;
  white-space: nowrap;
}

.player__time {
  font-size: 0.75rem;
  color: var(--color-text-muted, #888);
  white-space: nowrap;
  flex-shrink: 0;
  letter-spacing: 0.03em;
}

.player__speed {
  flex-shrink: 0;
  font-size: 0.72rem;
  font-weight: 700;
  font-family: var(--font-sans);
  color: var(--color-text-muted, #888);
  background: rgba(10,10,10,0.06);
  border: 1px solid rgba(10,10,10,0.1);
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
}
.player__speed:hover { color: #0a0a0a; background: rgba(200,245,66,0.2); border-color: var(--c-accent, #c8f542); }

@media (prefers-color-scheme: dark) {
  .player {
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(255, 255, 255, 0.1);
    color: var(--c-off-white, #f5f4f0);
  }
  .player__track { background: rgba(245,244,240,0.15); }
  .player__time { color: rgba(245,244,240,0.5); }
  .player__speed { color: rgba(245,244,240,0.5); background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); }
  .player__speed:hover { color: #0a0a0a; }
}
</style>
