<template>
  <footer class="footer" role="contentinfo">
    <!-- Contact CTA -->
    <div class="footer__cta">
      <div class="footer__cta-inner">
        <span class="footer__cta-label">04 — Contact</span>
        <h2 class="footer__cta-headline">Let's build something<br>that works.</h2>
        <p class="footer__cta-sub">Open to freelance projects, collaborations, and interesting conversations.</p>
        <a href="mailto:johnlivingprooff@gmail.com" class="footer__cta-btn">
          Get in touch
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
      </div>
    </div>

    <!-- Footer bottom -->
    <div class="footer__bottom">
      <div class="footer__bottom-inner">
        <div class="footer__brand">
          <span class="footer__name">#johnlivingprooff</span>
          <span class="footer__tagline">Writer · Designer · Developer</span>
        </div>

        <nav class="footer__links" aria-label="Social links">
          <a href="https://wa.me/265996554837" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <img src="/imgs/whatsapp.png" alt="" class="footer__icon" />
          </a>
          <a href="https://twitter.com/ola0luwajj" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <img src="/imgs/twitter.webp" alt="" class="footer__icon" />
          </a>
          <a href="https://github.com/johnlivingprooff" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <img src="/imgs/github.png" alt="" class="footer__icon" />
          </a>
          <a href="mailto:johnlivingprooff@gmail.com" aria-label="Email">
            <img src="/imgs/email.webp" alt="" class="footer__icon" />
          </a>
        </nav>

        <div class="footer__copy">
          © {{ year }} · Built with 🫶🏾 by
          <a href="https://eiteone.org" target="_blank" rel="noopener noreferrer">eiteone</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return { year: new Date().getFullYear() };
  }
};
</script>

<style scoped>

/* CTA section */
.footer__cta {
  background: var(--color-heading, #0a0a0a);
  color: var(--c-off-white, #f5f4f0);
  padding: 100px clamp(20px, 5vw, 80px);
}

.footer__cta-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.footer__cta-label {
  display: block;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(15, 15, 15, 0.5);
  font-family: 'Space Grotesk', sans-serif;
  margin-bottom: 32px;
}

.footer__cta-headline {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2.5rem, 6vw, 5.5rem);
  font-weight: 700;
  line-height: 1.05;
  color: #0a0a0a;
  margin-bottom: 20px;
}

.footer__cta-sub {
  font-size: 1rem;
  color: rgba(51, 51, 50, 0.6);
  max-width: 400px;
  line-height: 1.7;
  margin-bottom: 48px;
}

.footer__cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  background: var(--c-accent, #c8f542);
  color: #0a0a0a;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 700;
  font-family: 'Space Grotesk', sans-serif;
  letter-spacing: 0.04em;
  transition: transform 0.2s, box-shadow 0.2s;
}

.footer__cta-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(200, 245, 66, 0.3);
}

/* Bottom bar */
.footer__bottom {
  background: #050505;
  padding: 32px clamp(20px, 5vw, 80px);
}

.footer__bottom-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}

.footer__brand {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.footer__name {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: var(--c-off-white, #f5f4f0);
}

.footer__tagline {
  font-size: 0.75rem;
  color: rgba(245, 244, 240, 0.4);
  font-family: 'Space Grotesk', sans-serif;
  letter-spacing: 0.05em;
}

.footer__links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.footer__icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  filter: invert(1);
  opacity: 0.5;
  transition: opacity 0.2s, transform 0.2s;
}

.footer__links a:hover .footer__icon {
  opacity: 1;
  transform: scale(1.15);
}

.footer__copy {
  font-size: 0.8rem;
  color: rgba(245, 244, 240, 0.4);
  font-family: 'Space Grotesk', sans-serif;
}

.footer__copy a {
  color: rgba(245, 244, 240, 0.6);
  text-decoration: none;
  transition: color 0.2s;
}

.footer__copy a:hover {
  color: var(--c-accent, #c8f542);
}

@media (max-width: 768px) {
  .footer__cta {
    padding: 60px 20px;
  }

  .footer__bottom-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
}
</style>
