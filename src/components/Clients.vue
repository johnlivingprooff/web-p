<template>
    <div class="clientele">
        <h2>Some of My Clients:</h2>
        <div class="c-icons">
            <img src="/imgs/clients/07.png" alt="omo-alendo" class="c-icon">
            <img src="/imgs/clients/eiteone.png" alt="81px" class="c-icon">
            <img src="/imgs/clients/06.png" alt="ajagun" class="c-icon">
            <img src="/imgs/clients/cc-logo.png" alt="canaanspeed constructions" class="c-icon">
            <img src="/imgs/clients/04.png" alt="eden-estates-ltd" class="c-icon">
            <img src="/imgs/clients/05.png" alt="oasis-cafe" class="c-icon">
            <img src="/imgs/clients/08.png" alt="ota-connect" class="c-icon">
            <img src="/imgs/clients/09.png" alt="joma-adventure-lodge" class="c-icon">
            <img src="/imgs/clients/12.png" alt="kingdom-development" class="c-icon">
            <img src="/imgs/clients/10.png" alt="RKC" class="c-icon">
            <img src="/imgs/clients/11.png" alt="OAK" class="c-icon">
            <img src="/imgs/clients/14.png" alt="Hazon-Farms" class="c-icon">
            <img src="/imgs/clients/16.png" alt="luc-k-ngoie" class="c-icon">
            <img src="/imgs/clients/15.png" alt="light-farms" class="c-icon">
            <img src="/imgs/clients/17.png" alt="deli-bites" class="c-icon">
        </div>        
    </div>
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

    const selectedElements = document.querySelectorAll('.c-icon');
    selectedElements.forEach((el) => observer.observe(el));
  },
};
</script>

<style>
.clientele {
    display: flex;
    flex-direction: column;
    margin: 5px 180px;
    padding: 50px;
}
.clientele h2 {
    font-size: 2rem;
    text-align: left;
    font-family: 'Raleway', sans-serif;
    color: var(--color-text);
    margin-bottom: 40px;
}
.c-icons {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 10px;
    place-items: center;
}
.c-icon {
    width: 100px;
    height: auto;
    transition: all 0.3s ease-in-out;
    opacity: 0;
}

@keyframes stagger-l-r {
    0% {
        transform: translateX(-100px);
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

.animate {
    animation: stagger-l-r .5s ease forwards;
    animation-delay: 0.5s;
}

.c-icon:nth-child(1) {
    animation-delay: 0.2s;
}
.c-icon:nth-child(2) {
    animation-delay: 0.4s;
}
.c-icon:nth-child(3) {
    animation-delay: 0.6s;
}
.c-icon:nth-child(4) {
    animation-delay: 0.8s;
}
.c-icon:nth-child(5) {
    animation-delay: 1s;
}
.c-icon:nth-child(6) {
    animation-delay: 1.2s;
}
.c-icon:nth-child(7) {
    animation-delay: 1.4s;
}
.c-icon:nth-child(8) {
    animation-delay: 1.6s;
}
.c-icon:nth-child(9) {
    animation-delay: 1.8s;
}
.c-icon:nth-child(10) {
    animation-delay: 2s;
}
.c-icon:nth-child(11) {
    animation-delay: 2.2s;
}
.c-icon:nth-child(12) {
    animation-delay: 2.4s;
}
.c-icon:nth-child(13) {
    animation-delay: 2.6s;
}
.c-icon:nth-child(14) {
    animation-delay: 2.8s;
}
.c-icon:nth-child(15) {
    animation-delay: 3s;
}
.c-icon:nth-child(16) {
    animation-delay: 3.2s;
}
.c-icon:nth-child(17) {
    animation-delay: 3.4s;
}
.c-icon:nth-child(18) {
    animation-delay: 3.6s;
}
.c-icon:nth-child(19) {
    animation-delay: 3.8s;
}
.c-icon:nth-child(20) {
    animation-delay: 4s;
}


.c-icon:hover {
    scale: 1.2;
}

@media (max-width: 768px) {
    .clientele {
        margin: 5px 20px;
    }
    .c-icons {
        grid-template-columns: repeat(5, 1fr);
    }
    .c-icon {
        width: 100px;
    }
}

@media (max-width: 480px) {
    .clientele {
        margin: 5px 10px;
    }
    .c-icons {
        grid-template-columns: repeat(3, 1fr);
    }
    .c-icon {
        width: 100px;
    }
}

</style>