<template>
  <div class="m-cont">
    <div class="card">
      <a href="https://81px.vercel.app/" target="_blank">
        <div class="iframe-container">
          <iframe src="https://81px.vercel.app/" frameborder="0"></iframe>
        </div>
        <div class="card-content">
          <h2>81PIXELS</h2>
          <p>Click Here to View the Website</p>
        </div>
      </a>
    </div>
    
    <div class="card">
      <a href="https://wasa-mw.vercel.app/" target="_blank">
        <div class="iframe-container">
          <iframe src="https://wasa-mw.vercel.app/" frameborder="0"></iframe>
        </div>
        <div class="card-content">
          <h2>Work & Study Abroad</h2>
          <p>Click To View the Website</p>
        </div>
      </a>
    </div>

    <div class="card">
      <a href="https://edenestatesmw-v2.vercel.app/" target="_blank">
        <div class="iframe-container">
          <iframe src="https://edenestatesmw.com/" frameborder="0"></iframe>
        </div>
        <div class="card-content">
          <h2>Eden Estate Hotel & Resort</h2>
          <p>Click To View the Website</p>
        </div>
      </a>
    </div>

    <div class="card">
      <a href="https://sam-book-store.vercel.app/" target="_blank">
        <div class="iframe-container">
          <iframe src="https://sam-book-store.vercel.app/" frameborder="0"></iframe>
        </div>
        <div class="card-content">
          <h2>Campus Unlimited</h2>
          <p>Click To View the Website</p>
        </div>
      </a>
    </div>

    <div class="card">
      <a href="https://oak-ul-us.vercel.app/" target="_blank">
        <div class="iframe-container">
          <iframe src="https://oak-ul-us.vercel.app/" frameborder="0"></iframe>
        </div>
        <div class="card-content">
          <h2>O. A. K</h2>
          <p>An Agri-Science Innovative platform to monitor crop plantation [under construction]</p>
        </div>
      </a>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ProjectsBox'
}
</script>

<style scoped>
.m-cont {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 100px;
  padding: 20px;
  place-items: center;
  font-family: 'Raleway', sans-serif;
  color: var(--color-text);
}

.card {
  position: relative;
  width: 100%;
  overflow: hidden;
  border: 1px solid gold;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.card:hover {
  transform: scale(1.05);
}

.iframe-container {
  width: 100%;
  height: 550px; /* Adjust the height as needed */
  overflow: hidden;
  scrollbar-color: transparent;
  scrollbar-width: none; /* For Firefox */
}

.iframe-container iframe {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: none;
}

/* Hide scrollbar for Chrome, Safari, and Opera */
.iframe-container::-webkit-scrollbar, 
.iframe-container iframe::-webkit-scrollbar, 
.card::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* Optional: Hide the scrollbar background */
}

/* Hide scrollbar for IE, Edge, and Firefox */
.iframe-container {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.iframe-container iframe {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.card-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 20px;
  opacity: 0;
  transition: opacity 0.3s;
}

.card:hover .card-content {
  opacity: 1;
}

.card-content h2 {
  font-size: 1.5rem;
  margin: 0;
}

.card-content p {
  font-size: 1rem;
  margin: 10px 0 0;
}
</style>