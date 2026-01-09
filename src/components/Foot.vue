<template>
    <div class="mail">
    <img src="/imgs/inbox.svg" alt="chat" id="chat" @click="toggleIcons">
      <div class="icons" v-if="showIcons">
        <a href="https://wa.me/265996554837" target="_blank">
          <img src="/imgs/whatsapp.png" alt="WhatsApp" class="icon">
        </a>
        <a href="https://twitter.com/ola0luwajj" target="_blank">
          <img src="/imgs/twitter.webp" alt="Twitter" class="icon">
        </a>
        <a href="https://github.com/johnlivingprooff" target="_blank">
          <img src="/imgs/github.png" alt="GitHub" class="icon">
        </a>
        <a href="mailto:johnlivingprooff@gmail.com">
          <img src="/imgs/email.webp" alt="Email" class="icon">
        </a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showIcons: false,
      };
    },
    methods: {
      toggleIcons() {
        this.showIcons = !this.showIcons;
      },
    },
  };
  </script>
  
  <style scoped>
  #chat {
    filter: var(--color-filter);
    bottom: 0;
    position: fixed;
    padding: 25px;
    animation: pop 0.97s;
    transition: all 0.3s ease;
    width: 75px;
    cursor: pointer;
    z-index: 2000;
  }

  .mail {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .icons {
    display: flex;
    flex-direction: column;
    position: fixed;
    bottom: 55px; /* Adjust to your needs */
    left: 25px; /* Adjust to your needs */
    gap: 2px;
  }
  
  .icon {
    width: 25px;
    height: auto;
    filter: var(--color-filter);
    transition: transform 0.3s;
  }
  
  .icon:hover {
    transform: scale(1.2);
  }
  
  @keyframes pop {
    0% {
      transform: scale(0.3);
    }
    100% {
      transform: scale(1);
    }
  }
  
  #chat:hover {
    scale: 1.1;
  }

  @media (max-width: 720px) {
    #chat {
      width: 58px;
      padding: 18px;
      left: 10px;
      bottom: 6px;
    }

    .icons {
      bottom: 72px;
      left: 16px;
      gap: 6px;
    }

    .icon {
      width: 28px;
    }
  }
  </style>
  