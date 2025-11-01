<script>
import Welcome from '@/components/Welcome.vue';
import About from '@/components/About.vue';
import Clients from '@/components/Clients.vue';
import Podcast from '@/components/Podcast.vue';
export default {
  components: {
    Welcome, About, Clients, Podcast
  },
  mounted() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    },  { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
  },
};
</script>


<template>
  <main>
    <section class="hidden contnr">
      <img src="/icon.png" alt="logo-house" id="logo" class="scroll-logo">
      <Welcome />
    </section>
    <section>
      <About />
    </section>
    <Clients />
    <section>
      <Podcast />
    </section>
  </main>
</template>

<style scoped>
section {
  display: grid;
  place-items: center;
  align-content: center;
  overflow: hidden;
  min-height: 100vh;
}

.contnr {
  background: linear-gradient(#00000000, var(--color-background)),url('/imgs/darkbg.jpg') no-repeat center center/cover;
}
#logo {
  width: 400px;
  height: 400px;
  margin: 0 auto;
  padding: 50px;
  position: sticky;
  display: block;
}

.hidden {
  opacity: 0;
  transition: all 3s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.show {
  animation: fadeIn 1s forwards;
}

@keyframes pop {
  0% {
    transform: scale(0.3);
  }
  100% {
    transform: scale(1);
  }
}

.sticky {
  position: sticky;
}

.scroll-logo {
  animation: pop .8s forwards;
}

.scroll-logo.sticky {
  transform: scale(0.8); /* Optional: scale down the logo when sticky */
  opacity: 0.9;
}

.img-test {
  width: 100%;
  height: 100vh;
}

@media (max-width: 768px) {
  #logo {
    width: 200px;
    height: 200px;
  }
}

</style>
