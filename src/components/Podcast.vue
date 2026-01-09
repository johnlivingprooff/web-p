<template>
    <div class="pod-c">
      <img src="/imgs/the podcast.png" alt="TJP" id="tjp" class="pod-a">
      <h2 class="pod-a">I Host a Show called <b style="font-weight: 900">The JohnLivingprooff Podcast</b>,<br>check out some of the recent episodes</h2>

      <!--Display the RSS feed items (podcast episodes) -->
      <div class="pod"> 
      <ul v-if="rssItems.length">
        <li v-for="(item, index) in rssItems.slice(0, 6)" :key="item.link"
            :style="{ animationDelay: `${index * 0.2}s` }"
            class="stagger-item pod-item">
          <img v-if="item.image" :src="item.image" :alt="item.title" />
          <div class="pod-body">
            <h3>{{ item.title }}</h3>
            <audio :src="item.audio" controls></audio>
            <p><b>Published:</b> {{ item.pubDate }}</p>
            <!-- <p v-html="item.description"></p> -->
            <a :href="item.link" target="_blank"><img src="/imgs/spotify-icon.png" width="15px"/> Listen on Spotify</a>
          </div>
        </li>
      </ul>

    </div>
    <div class="pod-links">
        <a class="btn-s" href="https://open.spotify.com/show/2VgMTD1eFU6R66XkZtRqEJ?si=1f822ae349914e5f" target="_blank"><img src="/imgs/spotify-icon.png" width="12px"/> Listen on Spotify</a>
        <a class="btn-s" href="https://pod.eiteone.org/" target="_blank">Visit Website</a>
    </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        rssItems: [], // Array to hold parsed RSS feed items
      };
    },
    mounted() {
      this.fetchRSSFeed();

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            } else {
            entry.target.classList.remove('animate');
            }
        });
        }, { threshold: 0.1 });

        const observer2 = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                // Add the animate class to all <li> elements within the <ul>
                const listItems = entry.target.querySelectorAll('li');
                listItems.forEach((li) => {
                    li.classList.add('stagger-item');
                });
                observer.unobserve(entry.target); // Stop observing once the animation is triggered
                }
            });
            }, { threshold: 0.1 });

            // Select the pod <ul> element
            const podUl = document.querySelector('.pod ul');
            if (podUl) {
            observer2.observe(podUl);
            }

        const selectedElements = document.querySelectorAll('.pod-a');
        selectedElements.forEach((el) => observer.observe(el));

    },
    methods: {
      async fetchRSSFeed() {
        try {
          // Fetch the RSS feed content from your podcast RSS URL
          const response = await axios.get('https://anchor.fm/s/185e0d68/podcast/rss', {
            headers: { 'Content-Type': 'application/xml; charset=utf-8' },
          });
  
          // Parse the XML response
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(response.data, 'text/xml');
  
          // Extract <item> elements from the XML (each represents an episode)
          const items = xmlDoc.querySelectorAll('item');
  
          // Parse each <item> and get relevant data including image
          this.rssItems = Array.from(items).map((item) => ({
            title: item.querySelector('title').textContent,
            link: item.querySelector('link').textContent,
            pubDate: item.querySelector('pubDate').textContent,
            description: item.querySelector('description').textContent,
            audio: item.querySelector('enclosure') ? item.querySelector('enclosure').getAttribute('url') : '',
            
            // Handle multiple potential image sources
            image: this.getImageUrl(item)
          }));
        } catch (error) {
          console.error('Error fetching or parsing the RSS feed:', error);
        }
      },
  
      // Helper function to get image URL from different possible tags
      getImageUrl(item) {
        // Try fetching from different common image tags
        const itunesImage = item.querySelector('itunes\\:image');
        const mediaThumbnail = item.querySelector('media\\:thumbnail');
        const imageTag = item.querySelector('image');
  
        if (itunesImage) {
          return itunesImage.getAttribute('href');
        } else if (mediaThumbnail) {
          return mediaThumbnail.getAttribute('url');
        } else if (imageTag) {
          return imageTag.getAttribute('url');
        } else {
          return ''; // Fallback if no image is found
        }
      },
    },
  };
  </script>
  
<style scoped>
.pod-c {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 60px;
    margin-top: 50px;
}
#tjp {
    grid-row: 1; 
    grid-column: 2;
    width: 200px;
    height: 200px;
    filter: drop-shadow(-15px 15px 10px  var(--color-shadow));
    transition: scale 0.3s ease, filter 0.3s ease;
    perspective: 1000px; /* Gives depth to the transform */
    z-index: 1500;
    margin-bottom: 50px;
}

#tjp:hover {
    scale: 1.05;
    filter: drop-shadow(-25px 25px 20px  var(--color-shadow));
}

.pod-a {
    opacity: 0;
    text-align: center;
    font-family: 'Raleway', sans-serif;
    margin-top: 25px;
    margin-bottom: 50px;
    font-weight: 500;
}

@keyframes stagger {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate {
  animation: stagger .5s ease forwards;
  animation-delay: 0.5s;
}

.pod {
    display: flex;
    flex-direction: column;
    align-self: center;
    width: 80%;
    z-index: 1620;
}

.pod ul {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 40px;
    margin-top: 25px;
    margin-bottom: 25px;
    place-content: center;
}

.pod li {
  padding: 20px;
  border-radius: 10px;
  font-family: 'Raleway', sans-serif;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  grid-column: span 1;
  transform: translateX(-50px);
  opacity: 0;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 10px;
}

.stagger-item {
  animation: stagger-r .5s ease forwards;
}

@keyframes stagger-r {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* editing each list of the pod */
.pod-item {
  background: var(--box-color);
  color: var(--color-text2);
  transition: all 0.3s ease-in-out;
}

.pod-item:hover {
    scale: 0.98;
  color: var(--color-link);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    background: linear-gradient(145deg, #dbce18, #db2f18);
}

.pod-item a {
    color: var(--color-link2);
    text-decoration: none;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: all 0.3s ease-in-out;
}

.pod-item a:hover {
    color: var(--color-link-hover);
    scale: 0.98;
}

.pod-item h3 {
    font-size: 1rem;
    margin-bottom: 10px;
    font-weight: 600;
}

.pod-item img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.25);
}

.pod-body {
  display: grid;
  grid-template-rows: auto auto auto auto;
  gap: 10px;
}

.pod-item audio {
    width: 100%;
    margin-bottom: 10px;
    background: transparent;
    color: red;
    border: 1px solid var(--color-text2);
    border-radius: 45px 45px 45px 10px;
}
.btn-s {
    background: var(--color-link);
    color: var(--color-link2);
    padding: 10px 20px;
    border: none;
    border-radius: 45px;
    font-weight: 600;
    font-size: .8rem;
    transition: all 0.3s ease-in-out;
    width: 180px;
    text-align: center;
    align-self: center;
    text-decoration: none;
}
.btn-s:hover {
    background: var(--color-link-hover);
    color: var(--color-link);
    scale: 0.98;
    box-shadow: 0 0 15px #dbce18;
}

@media (max-width: 768px) {
    .pod ul {
        grid-template-columns: repeat(1, 1fr);
    }
    .pod-item {
        grid-column: span 1;
    transform: none;
      padding: 0;
      overflow: hidden;
      border-radius: 14px;
    }

  .pod-item img {
      height: 210px;
      border-radius: 0;
      box-shadow: none;
  }

    .pod-body {
      padding: 16px;
      background: var(--box-color);
    }
}

.pod-links {
  margin-top: 15px;
  display: grid;
  justify-content: center;
  place-content: center;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
}
</style>
