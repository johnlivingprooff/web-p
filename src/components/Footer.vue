<template>
  <footer class="site-footer" role="contentinfo" aria-label="Site footer">
    <div class="inner">
      <div class="left">© {{ year }}</div>
      <div class="right">
        Built with 🫶🏾 by
        <a href="https://eiteone.org" target="_blank" rel="noopener noreferrer">eiteone</a>
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
}
</script>

<style scoped>
.site-footer {
  border-top: 1px solid rgba(255, 215, 0, 0.5); /* pale gold */
  background: var(--color-background);
  color: var(--color-text);
  padding: 12px 0;
}
.inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 50px; /* ensure a touch-friendly hit area */
  gap: 10px;
}
.left { padding-left: 50px; }
.right { padding-right: 50px; }
.right a { color: var(--color-link); text-decoration: none; }
.right a:hover { color: var(--color-link-hover); text-decoration: underline; }

@media (max-width: 640px) {
  .inner { flex-direction: column; gap: 6px; padding: 10px 0; text-align: center; }
  .left, .right { padding: 0 16px; }
  .right a { display: inline-flex; }
}
</style>
