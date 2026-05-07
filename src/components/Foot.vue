<template>
  <div class="float-contact">
    <button class="float-contact__toggle" @click="open = !open" :aria-expanded="open" aria-label="Toggle contact links">
      <img src="/imgs/inbox.svg" alt="" class="float-contact__icon" :class="{ 'is-open': open }" />
    </button>

    <transition name="pop">
      <div class="float-contact__links" v-if="open" role="list">
        <a href="https://wa.me/265996554837" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" role="listitem">
          <img src="/imgs/whatsapp.png" alt="WhatsApp" class="float-contact__link-icon" />
        </a>
        <a href="https://twitter.com/ola0luwajj" target="_blank" rel="noopener noreferrer" aria-label="Twitter" role="listitem">
          <img src="/imgs/twitter.webp" alt="Twitter" class="float-contact__link-icon" />
        </a>
        <a href="https://github.com/johnlivingprooff" target="_blank" rel="noopener noreferrer" aria-label="GitHub" role="listitem">
          <img src="/imgs/github.png" alt="GitHub" class="float-contact__link-icon" />
        </a>
        <a href="mailto:johnlivingprooff@gmail.com" aria-label="Email" role="listitem">
          <img src="/imgs/email.webp" alt="Email" class="float-contact__link-icon" />
        </a>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return { open: false };
  }
};
</script>

<style scoped>
.float-contact {
  position: fixed;
  bottom: 24px;
  left: 24px;
  z-index: 2000;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 8px;
}

.float-contact__toggle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-heading, #0a0a0a);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  transition: transform 0.2s, box-shadow 0.2s;
}

.float-contact__toggle:hover {
  transform: scale(1.08);
  box-shadow: 0 8px 24px rgba(0,0,0,0.25);
}

.float-contact__icon {
  width: 22px;
  height: 22px;
  filter: invert(1);
  transition: transform 0.3s ease;
}

.float-contact__icon.is-open {
  transform: rotate(45deg);
}

.float-contact__links {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}

.float-contact__link-icon {
  width: 28px;
  height: 28px;
  object-fit: contain;
  filter: var(--color-filter, invert(0));
  transition: transform 0.2s;
}

.float-contact__links a:hover .float-contact__link-icon {
  transform: scale(1.2);
}

/* Transition */
.pop-enter-active {
  animation: pop-in 0.25s ease forwards;
}

.pop-leave-active {
  animation: pop-in 0.2s ease reverse;
}

@keyframes pop-in {
  from { opacity: 0; transform: scale(0.8) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

@media (max-width: 720px) {
  .float-contact {
    bottom: 16px;
    left: 16px;
  }

  .float-contact__toggle {
    width: 44px;
    height: 44px;
  }
}
</style>
