<template>
  <section class="clients">
    <div class="clients__header reveal">
      <span class="clients__label">02 — Clients</span>
      <h2 class="clients__title">Trusted by brands<br>across industries</h2>
    </div>

    <div class="clients__marquee-wrap">
      <div class="clients__marquee">
        <div class="clients__track">
          <img v-for="(client, i) in clients" :key="'a' + i" :src="client.src" :alt="client.alt" class="clients__logo" />
          <!-- Duplicate for seamless loop -->
          <img v-for="(client, i) in clients" :key="'b' + i" :src="client.src" :alt="client.alt" class="clients__logo" aria-hidden="true" />
        </div>
      </div>
    </div>

    <div class="clients__count reveal">
      <div class="clients__stat">
        <span class="clients__stat-num">15+</span>
        <span class="clients__stat-label">Clients served</span>
      </div>
      <div class="clients__stat">
        <span class="clients__stat-num">2020</span>
        <span class="clients__stat-label">Year started</span>
      </div>
      <div class="clients__stat">
        <span class="clients__stat-num">∞</span>
        <span class="clients__stat-label">Ideas built</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      clients: [
        { src: '/imgs/clients/07.png', alt: 'Omo Alendo' },
        { src: '/imgs/clients/eiteone.png', alt: '81px' },
        { src: '/imgs/clients/06.png', alt: 'Ajagun' },
        { src: '/imgs/clients/cc-logo.png', alt: 'Canaan Speed Constructions' },
        { src: '/imgs/clients/04.png', alt: 'Eden Estates' },
        { src: '/imgs/clients/05.png', alt: 'Oasis Cafe' },
        { src: '/imgs/clients/08.png', alt: 'Ota Connect' },
        { src: '/imgs/clients/09.png', alt: 'Joma Adventure Lodge' },
        { src: '/imgs/clients/12.png', alt: 'Kingdom Development' },
        { src: '/imgs/clients/10.png', alt: 'RKC' },
        { src: '/imgs/clients/11.png', alt: 'OAK' },
        { src: '/imgs/clients/14.png', alt: 'Hazon Farms' },
        { src: '/imgs/clients/16.png', alt: 'Luc K Ngoie' },
        { src: '/imgs/clients/15.png', alt: 'Light Farms' },
        { src: '/imgs/clients/17.png', alt: 'Deli Bites' },
      ]
    };
  },
  mounted() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('revealed');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.clients .reveal').forEach(el => observer.observe(el));
  }
};
</script>

<style scoped>

.clients {
  padding: 100px 0;
  overflow: hidden;
  border-top: 1px solid var(--color-border, rgba(0,0,0,0.08));
}

.clients__header {
  max-width: 1200px;
  margin: 0 auto 60px;
  padding: 0 clamp(20px, 5vw, 80px);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 40px;
}

.clients__label {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text-muted, #888);
  font-family: 'Space Grotesk', sans-serif;
  white-space: nowrap;
}

.clients__title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.8rem, 3.5vw, 3rem);
  font-weight: 700;
  color: var(--color-heading, #0a0a0a);
  line-height: 1.15;
  text-align: right;
}

/* Marquee */
.clients__marquee-wrap {
  position: relative;
  padding: 40px 0;
  background: var(--color-surface-2, #f0efe9);
}

.clients__marquee-wrap::before,
.clients__marquee-wrap::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 120px;
  z-index: 2;
  pointer-events: none;
}

.clients__marquee-wrap::before {
  left: 0;
  background: linear-gradient(to right, var(--color-background, #f5f4f0), transparent);
}

.clients__marquee-wrap::after {
  right: 0;
  background: linear-gradient(to left, var(--color-background, #f5f4f0), transparent);
}

.clients__marquee {
  overflow: hidden;
}

.clients__track {
  display: flex;
  align-items: center;
  gap: 60px;
  width: max-content;
  animation: marquee 30s linear infinite;
}

.clients__track:hover {
  animation-play-state: paused;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.clients__logo {
  height: 48px;
  width: auto;
  object-fit: contain;
  filter: grayscale(1);
  opacity: 0.6;
  transition: filter 0.3s, opacity 0.3s, transform 0.3s;
  flex-shrink: 0;
}

.clients__logo:hover {
  filter: grayscale(0);
  opacity: 1;
  transform: scale(1.1);
}

/* Stats */
.clients__count {
  max-width: 1200px;
  margin: 60px auto 0;
  padding: 0 clamp(20px, 5vw, 80px);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  border-top: 1px solid var(--color-border, rgba(0,0,0,0.08));
  padding-top: 60px;
}

.clients__stat {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.clients__stat-num {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 700;
  color: var(--color-heading, #0a0a0a);
  line-height: 1;
}

.clients__stat-label {
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted, #888);
  font-family: 'Space Grotesk', sans-serif;
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
  .clients {
    padding: 60px 0;
  }

  .clients__header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 40px;
  }

  .clients__title {
    text-align: left;
  }

  .clients__count {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .clients__logo {
    height: 36px;
  }
}
</style>
