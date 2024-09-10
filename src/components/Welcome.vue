<template>
    <div>
      <span class="wel fade-l">
        <h2 :style="{ fontSize: fontSize + 'px' }" :class="textFadeClass">{{ welcomeText }}</h2>
        <p>- #iWFBL -<br><br>&darr;</p>
      </span>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        originalFontSize: 10, // Original font size
        maxFontSize: 150, // Maximum font size when scrolling up
        fontSize: 10, // Initial font size
        welcomeText: "Welcome", // Initial welcome text
        scrollingDirection: null, // Track scrolling direction: 'up', 'down', or null
        scrollEnabled: false, // Track whether default scroll behavior is enabled
        animationFinished: false, // Track whether initial animation has finished
        textFadeClass: 'fade-in', // Class to manage text fade-in and fade-out
      };
    },
    mounted() {
      const element = this.$el.querySelector('.fade-l');
      element.style.transform = 'translateX(0)';
      element.style.opacity = '1';
      // Start the animation
      this.animateFontSize();
    },
    methods: {
      animateFontSize() {
        // Animate font size increase from original to max size
        const intervalId = setInterval(() => {
          if (this.fontSize < this.maxFontSize) {
            this.fontSize += 5;
          } else {
            clearInterval(intervalId);
            // Once animation finishes, change welcome text
            this.changeWelcomeText();
          }
        }, 50); // Adjust interval as needed for smoother animation
      },
      changeWelcomeText() {
        const languages = [
          "Welcome", "Kaabo", "Karibu", "Akwaaba", "Talofa", "Molweni",
          "Fáilte", "Mauya", "Bienvenue", "Amari", "Yîb griñ", "Tukulor",
          "مرحبا", "أهلاً وسهلاً", "Sawubona", "Hoezit", "Fàilte", "Ia orana",
          "Kushe", "Welkom", "Sawubona", "Talofa", "مرحبا", "Welcome"
        ];
        
        let currentIndex = 0;
  
        const changeText = () => {
          this.textFadeClass = 'fade-out';
          
          setTimeout(() => {
            currentIndex = (currentIndex + 1) % languages.length;
            this.welcomeText = languages[currentIndex];
            this.textFadeClass = 'fade-in';
          }, 500); // Time for fade-out effect to complete
        };
  
        setInterval(changeText, 1200); // Adjust interval as needed for text changes
      }
    }
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Ojuju:wght@200..800&display=swap');
  
  .wel {
    font-family: "Ojuju", sans-serif;
    font-weight: 300;
    text-align: center;
    margin-top: 20px;
    height: 100vh;
    overflow: hidden;
  }
  
  .fade-l {
    transform: translateX(-100%);
  }
  
  .fade-in {
    opacity: 1;
  }
  
  .fade-out {
    opacity: 0;
    transform: translateY(100%);
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  }
  
  .wel p {
    font-size: 1.5rem;
    margin-top: 20px;
  }

  
  
  /* mobile view */
  @media (max-width: 768px) {
    .wel h2 {
      font-size: 30px;
    }
  }
  </style>
  