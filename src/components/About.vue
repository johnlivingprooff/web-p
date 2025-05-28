<template>
  <div class="abt-box">
    <div class="abt-one img-box1"></div>
    <div class="abt-one intro">
      <h2>Who Am I?</h2>
      <p>Woven—a blend of fear and love. Writer, designer, creative, innovator. A fusion of creativity and technology.</p><br>
      <p>
        Since 2020, I’ve been building web and software solutions—driven by passion and shaped through both self-learning and formal training. With support from institutions like ALX Africa and Techno Brain, I’ve gained fluency in a range of languages and frameworks.
        <br><br>
        Now, through <b>81PIXELS</b>, I design clean, purpose-driven digital products for those who value clarity, speed, and real results.
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
      <h2>My Works</h2>
      <p>Enough about me 😅, Here's some of the projects I've worked on!</p><br>
      <a href="https://github.com/johnlivingprooff?tab=repositories">github/johnlivingprooff</a> &nbsp;|&nbsp;
      <router-link to="/projects">Live Projects</router-link>
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
  transition: all .3s ease;
}

.intro:hover, .intro2:hover, .intro3:hover {
  background: radial-gradient(rgba(199, 255, 196, 0.685), var(--box-color));
  scale: 1.03;
  cursor: pointer;
}

.img-box1 {
  background: url('/imgs/who.jpg') no-repeat center center/cover;
}

.img-box2 {
  background: url('/imgs/skills.jpg') no-repeat center center/cover;
}

.img-box3 {
  background: url('/imgs/where-fear-becomes-love.png') no-repeat center center/cover;
}

.img-box1:hover, .img-box2:hover, .img-box3:hover {
  scale: 1.03; 
  cursor: pointer;
  perspective: 1000px 500px;
}

@media (max-width: 768px) {
  .abt-box {
    grid-template-columns: 1fr;
    margin: 50px;
  }

  .abt-one {
    margin: 10px;
  }

  .abt-one h2 {
    font-size: 2.5rem;
    line-height: 50px;
  }

  .abt-one p {
    font-size: .85rem;
  }

  .img-box1, .img-box2, .img-box3 {
    display: none;
  }
}
</style>
