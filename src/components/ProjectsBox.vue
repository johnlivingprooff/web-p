<template>
  <div class="m-cont">
    <div v-for="proj in projects" :key="proj.href" class="card">
      <a :href="proj.href" target="_blank" rel="noopener noreferrer">
        <div class="image-container">
          <img :src="proj.image" :alt="proj.title" loading="lazy" @error="onImgError" />
        </div>
        <div class="card-content">
          <h2>{{ proj.title }}</h2>
          <p>{{ proj.desc }}</p>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectsBox',
  data() {
    const favicon = (url) => `https://www.google.com/s2/favicons?sz=128&domain_url=${encodeURIComponent(url)}`;
    return {
      projects: [
        {
          title: '81PIXELS',
          href: 'https://81px.vercel.app/',
          image: '/imgs/projs/web-apps.png',
          desc: 'Click Here to View the Website'
        },
        {
          title: 'Work & Study Abroad',
          href: 'https://wasa-mw.vercel.app/',
          image: '/imgs/projs/wasa.jpg',
          desc: 'Click To View the Website'
        },
        {
          title: 'Eden Estate Hotel & Resort',
          href: 'https://edenestatesmw-v2.vercel.app/',
          image: '/imgs/clients/04.png',
          desc: 'Click To View the Website'
        },
        {
          title: 'Campus Unlimited',
          href: 'https://sam-book-store.vercel.app/',
          image: '/imgs/projs/campus_u.jpg',
          desc: 'Click To View the Website'
        },
        {
          title: 'O. A. K',
          href: 'https://oak-ul-us.vercel.app/',
          image: '/imgs/projs/desktop.png',
          desc: 'An Agri-Science Innovative platform to monitor crop plantation [under construction]'
        },
        {
          title: 'Alo-Hospital',
          href: 'https://hospitalmanagementmihr.netlify.app/',
          image: '/imgs/projs/social_cover_2.png',
          desc: 'An Entreprise Grade Hospital Management System to keep track of patients and daily operations'
        },
        {
          title: 'Habicore POS',
          href: 'https://habicore-pos-frontend.vercel.app/',
          image: '/imgs/projs/lane-1_catalog-B.png',
          desc: 'A Sales & Inventory Management software, that also includes Manufacturing functionalities'
        }
      ]
    }
  },
  methods: {
    onImgError(e) {
      e.target.src = '/logo.png';
      e.target.style.objectFit = 'contain';
      e.target.style.padding = '20px';
    }
  }
}
</script>

<style scoped>
.m-cont {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 30px;
  padding: 20px;
  place-items: stretch;
  font-family: 'Raleway', sans-serif;
  color: var(--color-text);
}

@media (max-width: 1024px) {
  .m-cont { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 640px) {
  .m-cont { grid-template-columns: 1fr; }
}

.card {
  position: relative;
  width: 100%;
  overflow: hidden;
  border: 1px solid gold;
  border-radius: 10px;
  box-shadow: 0 4px 8px var(--color-shadow);
  transition: transform 0.3s ease;
}

.card:hover { transform: scale(1.03); }

.image-container {
  width: 100%;
  height: 260px; /* thumbnail height */
  background: linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.35));
  display: grid;
  place-items: center;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: contrast(1.02) saturate(1.02);
}

.card-content {
  position: absolute;
  inset: auto 0 0 0; /* bottom overlay */
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 16px 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card:hover .card-content { opacity: 1; }

.card-content h2 {
  font-size: 1.25rem;
  margin: 0;
}

.card-content p {
  font-size: 0.95rem;
  margin: 8px 0 0;
}
</style>