<template>
  <div class="project-view">
    <h1>Projects</h1>
    <p>Here are some of the web projects I've worked on.</p>
    <section class="projects">
      <ProjectBox />
    </section>
    <br>
    <div id="cntct">
      <img src="/imgs/contct.png" alt="let's work together">
    </div>
  </div>
</template>

<script>
import Foot from '@/components/Foot.vue';
import ProjectBox from '@/components/ProjectsBox.vue';

export default {
  components: { ProjectBox, Foot },
}
</script>

<style scoped>
  .project-view {
    padding: 20px 20px 0 20px;
    place-items: center;
    font-family: 'Raleway', sans-serif;
    color: var(--color-text);
    h1 {
      font-size: 2.5rem;
      font-weight: 1000;
      margin-bottom: 10px;
      margin-top: 55px;
    }
    p {
      margin-bottom: 15px;
    }
  }

  .projects {
    /* background-color: aliceblue; */
    width: 90%;
    margin-bottom: 25px;
  }

  hr {
    color: var(--color-text);
  }

  #cntct {
    place-self: center;
  }

</style>