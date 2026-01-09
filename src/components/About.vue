<template>
  <div class="abt-box" id="about">
    <div class="abt-one img-box1"></div>
    <div class="abt-one intro">
      <h2>Who Am I?</h2>
      <p>Woven—a blend of fear and love. Writer, designer, creative, innovator. A fusion of creativity and technology.</p><br>
      <p>
        Since 2020, I’ve been <b>building web and software solutions</b>—driven by passion and shaped through both <b>self-learning</b> and <b>formal training</b>. With support from institutions like <b>ALX Africa</b> and <b>Techno Brain</b>, I’ve gained fluency in a range of <b>languages and frameworks</b>.
        <br><br>
        Now, through <a href="https://81px.vercel.app/" target="_blank" style="text-decoration: none; color: inherit;"><b>81PIXELS</b></a>, I design clean, purpose-driven digital products for those who value clarity, speed, and real results.
        Let’s build something that works.
      </p>
    </div>
    <div class="abt-one intro2">
      <h2>Skill-set & Experience</h2>
      <p>Some of my Tech-relevant Skills include: <br> 
      <b>Graphic Design <span style="color: cadetblue;">|</span> Digital Marketing <span style="color: cadetblue;">|</span> Web Development <span style="color: cadetblue;">|</span> Photography <span style="color: cadetblue;">|</span> UI/UX Design <span style="color: cadetblue;">|</span> Product Design <span style="color: cadetblue;">|</span> Backend Development <span style="color: cadetblue;">|</span> Software Engineering <span style="color: cadetblue;">|</span> Data Visualization <span style="color: cadetblue;">|</span> Business Reporting Systems <span style="color: cadetblue;">|</span> Branding & Identity Design <span style="color: cadetblue;">|</span> Content Creation <span style="color: cadetblue;">|</span> Technical Problem-Solving <span style="color: cadetblue;">|</span> Creative Strategy</b></p>
      <br>
      <p>I've also collaboratively worked on relevant development projects with peers throughout my learning experience at ALX, where I devoted 1-year to the study of Software Engineering and honed my skills as a developer</p>
    </div>
    <div class="abt-one img-box2"></div>
    <div class="abt-one img-box3"></div>
    <div class="abt-one intro3">
      <h2>My Work</h2>
      <p>Enough about me 😅, Here's some of the projects I've worked on!</p><br>
      <div class="cta-row">
        <a class="cta" href="https://github.com/johnlivingprooff?tab=repositories">github/johnlivingprooff</a>
        <router-link class="cta" to="/projects">Live Projects</router-link>
      </div>
      <br><br><p>
        Looking ahead, I aim to specialize in AI-driven development and play a part in innovative projects that push the boundaries of what's possible in tech. I am also passionate about contributing to open-source communities.
      </p>
    </div>
  </div>
  <br><br><br>
</template>

<script>
export default {
  mounted() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        } else {
          entry.target.classList.remove('animate');
        }
      });
    },  { threshold: 0.1 });

    const selectedElements = document.querySelectorAll('.abt-one');
    selectedElements.forEach((el) => observer.observe(el));

    // Track cursor position on hover cards
    const hoverCards = document.querySelectorAll('.intro, .intro2, .intro3');
    hoverCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  },
};
</script>

<style scoped>
@import '@/assets/base.css';

.abt-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  margin: 95px 200px;
}

/* Ensure in-page scroll to #about lands with a margin from top */
#about {
  scroll-margin-top: 80px;
}

@keyframes stagger {
  from {
    opacity: 0;
    transform: translateY(250px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.abt-one {
  padding: 20px;
  border-radius: 10px;
  font-family: 'Raleway', sans-serif;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 25px;
  opacity: 0;
  transition: all 0.3s ease;
}

.animate {
  animation: stagger .5s ease forwards;
  animation-delay: 0.5s;
}

.abt-one:nth-child(1) {
  animation-delay: 0.2s;
}

.abt-one:nth-child(2) {
  animation-delay: 0.4s;
}

.abt-one:nth-child(3) {
  animation-delay: 0.6s;
}

.abt-one:nth-child(4) {
  animation-delay: 0.8s;
}

.abt-one:nth-child(5) {
  animation-delay: 1s;
}

.abt-one:nth-child(6) {
  animation-delay: 1.2s;
}

.abt-one h2 {
  font-size: 4.5rem;
  font-weight: 700;
  color: #333;
  line-height: 75px;
  margin-bottom: 25px;
}

.abt-one p {
  font-size: .95rem;
  color: #333;
}

.abt-one a {
  color: var(--color-link2);
  text-decoration: none;
}

.abt-one a:hover {
  color: var(--color-link-hover);
  text-decoration: underline;
}

.intro p b {
  font-weight: 850;
  color: #635b0d;
}

.intro, .intro2, .intro3 {
  background: var(--box-color);
  color: #333;
  border: none;
  padding: 50px;
  transition: scale .3s ease;
  position: relative;
  --mouse-x: 50%;
  --mouse-y: 50%;
}

.intro:hover, .intro2:hover, .intro3:hover {
  background: radial-gradient(circle 200px at var(--mouse-x) var(--mouse-y), rgba(199, 255, 196, 0.685), var(--box-color));
  scale: 1.03;
  cursor: pointer;
}

.img-box1 {
  background: url('/imgs/me.jpg') no-repeat center center/cover;
}

.img-box2 {
  background: url('/imgs/who.jpg') no-repeat center center/cover;
}

.img-box3 {
  background: url('/imgs/darkbg1.jpg') no-repeat center center/cover;
}

.img-box1:hover, .img-box2:hover, .img-box3:hover {
  scale: 1.03; 
  cursor: pointer;
  perspective: 1000px 500px;
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid rgba(255, 215, 0, 0.4);
  color: var(--color-link2);
  text-decoration: none;
  font-weight: 700;
  background: linear-gradient(120deg, rgba(255, 215, 0, 0.16), rgba(255, 255, 255, 0.04));
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.18);
  color: var(--color-link-hover);
}

@media (max-width: 768px) {
  .abt-box {
    grid-template-columns: 1fr;
    margin: 32px 18px;
  }

  .abt-one {
    margin: 8px;
    padding: 22px;
  }

  .abt-one h2 {
    font-size: 2.5rem;
    line-height: 50px;
  }

  .abt-one p {
    font-size: .9rem;
  }

  .img-box1 {
    display: block;
    min-height: 220px;
    border-radius: 14px 14px 0 0;
    box-shadow: none;
    margin-bottom: 0;
  }

  .img-box2, .img-box3 {
    display: none;
  }

  .intro {
    padding: 26px;
    background: var(--box-color);
    scale: 1;
    border-radius: 0 0 14px 14px;
    margin-top: 0;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  }

  .intro2, .intro3 {
    padding: 26px;
    background: var(--box-color);
    scale: 1;
    border-radius: 14px;
    margin-top: 0;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  }

  .intro:hover, .intro2:hover, .intro3:hover {
    background: var(--box-color);
    scale: 1;
  }

  .cta-row {
    flex-direction: column;
    align-items: stretch;
  }

  .cta {
    width: 100%;
    justify-content: center;
  }
}
</style>
