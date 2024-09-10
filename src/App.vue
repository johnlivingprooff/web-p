<template>
  <div class="container">
    <div class="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/">Projects</router-link>
    </div>
    <router-view />
</div>
</template>

<style scoped>
@import './assets/base.css';

.nav {
  transform-origin: left bottom;
  transform: rotate(90deg);
  width: 50vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: center;
  padding: 10px;
  position: fixed;
  margin-top: 150px;
  z-index: 10000;
}

.nav a {
  text-decoration: none;
  color: var(--color-link);
}
</style>