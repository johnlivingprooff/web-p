import { reactive } from 'vue';

export const playerStore = reactive({
  episode: null,   // full episode object
  playing: false,
  play(episode) {
    this.episode = episode;
    this.playing = true;
  },
  close() {
    this.episode = null;
    this.playing = false;
  },
});
