<template>
  <section class="about" id="about">
    <!-- Section label -->
    <div class="about__label">
      <span>01 — About</span>
    </div>

    <!-- Intro block -->
    <div class="about__intro reveal">
      <div class="about__intro-text">
        <h2 class="about__headline">
          Woven—a blend<br>of fear and love.
        </h2>
        <p class="about__sub">
          Writer, designer, creative, innovator. A fusion of creativity and technology.
        </p>
      </div>
      <div class="about__intro-img">
        <img src="/imgs/me.jpg" alt="John" />
      </div>
    </div>

    <!-- Bio block -->
    <div class="about__bio reveal">
      <div class="about__bio-col">
        <h3>Background</h3>
        <p>
          Since 2020, I've been <strong>building web and software solutions</strong>—driven by passion and shaped through both <strong>self-learning</strong> and <strong>formal training</strong>. With support from institutions like <strong>ALX Africa</strong> and <strong>Techno Brain</strong>, I've gained fluency in a range of languages and frameworks.
        </p>
        <p>
          Now, through <a href="https://81px.vercel.app/" target="_blank">81PIXELS</a>, I design clean, purpose-driven digital products for those who value clarity, speed, and real results.
        </p>
      </div>
      <div class="about__bio-col">
        <h3>Skills</h3>
        <ul class="about__skills">
          <li>Graphic Design</li>
          <li>Web Development</li>
          <li>UI/UX Design</li>
          <li>Product Design</li>
          <li>Backend Development</li>
          <li>Software Engineering</li>
          <li>Digital Marketing</li>
          <li>Photography</li>
          <li>Data Visualization</li>
          <li>Branding & Identity</li>
          <li>Content Creation</li>
          <li>Creative Strategy</li>
        </ul>
      </div>
    </div>

    <!-- Work CTA block -->
    <div class="about__work reveal">
      <div class="about__work-img">
        <img src="/imgs/skills.jpg" alt="Work" />
      </div>
      <div class="about__work-text">
        <h3>My Work</h3>
        <p>
          I've collaboratively worked on relevant development projects throughout my learning experience at ALX, where I devoted 1 year to Software Engineering. Looking ahead, I aim to specialize in AI-driven development and contribute to open-source communities.
        </p>
        <div class="about__cta-row">
          <a class="about__cta" href="https://github.com/johnlivingprooff?tab=repositories" target="_blank">
            <span>GitHub</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <router-link class="about__cta about__cta--outline" to="/projects">
            <span>Live Projects</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  mounted() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('revealed');
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.about .reveal').forEach(el => observer.observe(el));
  }
};
</script>

<style scoped>

.about {
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px clamp(20px, 5vw, 80px) 80px;
  scroll-margin-top: 80px;
}

.about__label {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text-muted, #888);
  margin-bottom: 60px;
  font-family: 'Space Grotesk', sans-serif;
}

/* Intro */
.about__intro {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: end;
  margin-bottom: 100px;
}

.about__headline {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2.8rem, 6vw, 5.5rem);
  font-weight: 700;
  line-height: 1.05;
  color: var(--color-heading, #0a0a0a);
  margin-bottom: 24px;
}

.about__sub {
  font-size: 1.1rem;
  color: var(--color-text-muted, #666);
  max-width: 420px;
  line-height: 1.7;
}

.about__intro-img {
  position: relative;
}

.about__intro-img img {
  width: 100%;
  aspect-ratio: 4/5;
  object-fit: cover;
  border-radius: 4px;
  display: block;
}

/* Bio */
.about__bio {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  padding: 60px 0;
  border-top: 1px solid var(--color-border, rgba(0,0,0,0.08));
  border-bottom: 1px solid var(--color-border, rgba(0,0,0,0.08));
  margin-bottom: 100px;
}

.about__bio-col h3 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text-muted, #888);
  margin-bottom: 24px;
}

.about__bio-col p {
  font-size: 0.95rem;
  line-height: 1.8;
  color: var(--color-text, #111);
  margin-bottom: 16px;
}

.about__bio-col p strong {
  color: var(--color-heading, #0a0a0a);
  font-weight: 600;
}

.about__bio-col a {
  color: var(--color-heading, #0a0a0a);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.about__skills {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.about__skills li {
  font-size: 0.8rem;
  padding: 6px 14px;
  border: 1px solid var(--color-border, rgba(0,0,0,0.12));
  border-radius: 999px;
  color: var(--color-text, #111);
  font-family: 'Space Grotesk', sans-serif;
  letter-spacing: 0.02em;
  transition: background 0.2s, border-color 0.2s;
}

.about__skills li:hover {
  background: var(--c-accent, #c8f542);
  border-color: var(--c-accent, #c8f542);
  color: #0a0a0a;
}

/* Work */
.about__work {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.about__work-img img {
  width: 100%;
  aspect-ratio: 3/2;
  object-fit: cover;
  border-radius: 4px;
  display: block;
}

.about__work-text h3 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.8rem, 3vw, 2.8rem);
  font-weight: 700;
  color: var(--color-heading, #0a0a0a);
  margin-bottom: 20px;
}

.about__work-text p {
  font-size: 0.95rem;
  line-height: 1.8;
  color: var(--color-text, #111);
  margin-bottom: 32px;
}

.about__cta-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.about__cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #f5f4f0;
  color:#0a0a0a;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  font-family: 'Space Grotesk', sans-serif;
  letter-spacing: 0.04em;
  transition: background 0.2s, transform 0.2s;
}

.about__cta:hover {
  background: var(--c-accent, #c8f542);
  color: #0a0a0a;
  transform: translateY(-2px);
}

.about__cta--outline {
  background: transparent;
  color: var(--color-heading, #0a0a0a);
  border: 1px solid var(--color-border, rgba(0,0,0,0.2));
}

.about__cta--outline:hover {
  background: var(--c-accent, #c8f542);
  border-color: var(--c-accent, #c8f542);
  color: #0a0a0a;
}

/* Reveal animation */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Mobile */
@media (max-width: 768px) {
  .about {
    padding: 60px 20px 60px;
  }

  .about__intro,
  .about__bio,
  .about__work {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .about__intro {
    margin-bottom: 60px;
  }

  .about__intro-img {
    order: -1;
  }

  .about__intro-img img {
    aspect-ratio: 3/2;
  }

  .about__bio {
    margin-bottom: 60px;
  }

  .about__work-img {
    order: -1;
  }
}
</style>
