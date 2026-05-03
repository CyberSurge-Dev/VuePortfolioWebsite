<template>
  <div class="portfolio-wrapper">
    
    <Navbar />

    <section class="hero">
      <div class="bg-text-container">
        <div class="bg-text-row" :style="{ transform: `translateX(${-scrollY * 0.5}px)` }">
          ZACHARY HOOVER ZACHARY HOOVER ZACHARY HOOVER ZACHARY HOOVER ZACHARY HOOVER
        </div>
        <div class="bg-text-row" :style="{ transform: `translateX(${minOffset + scrollY * 0.4}px)` }">
          ZACHARY HOOVER ZACHARY HOOVER ZACHARY HOOVER ZACHARY HOOVER ZACHARY HOOVER
        </div>
        <div class="bg-text-row" :style="{ transform: `translateX(${-100 - scrollY * 0.6}px)` }">
          ZACHARY HOOVER ZACHARY HOOVER ZACHARY HOOVER ZACHARY HOOVER ZACHARY HOOVER
        </div>
        <div class="bg-text-row" :style="{ transform: `translateX(${minOffset + 200 + scrollY * 0.5}px)` }">
          ZACHARY HOOVER ZACHARY HOOVER ZACHARY HOOVER ZACHARY HOOVER ZACHARY HOOVER
        </div>
        <div class="bg-text-row" :style="{ transform: `translateX(${-300 - scrollY * 0.4}px)` }">
          ZACHARY HOOVER ZACHARY HOOVER ZACHARY HOOVER ZACHARY HOOVER ZACHARY HOOVER
        </div>
      </div>

      <div class="hero-content">
        <div class="hero-image-wrapper">
          <img 
            src="../../assets/HomePage/port.jpg" 
            alt="Zachary Hoover" 
            class="profile-photo" 
          />
        </div>

        <div class="hero-text-wrapper">
          <p class="greeting">HI, I'M</p>
          <h1 class="name">ZACHARY<br />HOOVER</h1>
          <div class="divider"></div>
          <p class="description">
            Electrical & Computer Engineering student at<br class="desktop-br" />
            North Carolina State University, passionate<br class="desktop-br" />
            about robotics, automation, and mechanical<br class="desktop-br" /> 
            design.
          </p>
          
          <a class="cta-button" href="/about">
            ABOUT ME
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, onUnmounted } from 'vue';
import Navbar from '../NavBar.vue';

const scrollY = ref(0);
const minOffset = -800; 

const updateScroll = () => {
  scrollY.value = window.scrollY;
};

onMounted(() => {
  window.addEventListener('scroll', updateScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;900&family=Space+Mono:wght@400;700&display=swap');

.portfolio-wrapper {
  overflow-x: hidden;
}

.hero {
  position: relative;
  background-color: #3E64FF;
  min-height: 92vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.bg-text-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  z-index: 1;
  pointer-events: none; 
}

.bg-text-row {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 12vw;
  line-height: 1;
  color: rgba(255, 255, 255, 0.12); 
  white-space: nowrap;
  will-change: transform;
}

.hero-content {
  position: relative;
  z-index: 2; 
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5rem;
}

.hero-image-wrapper {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.profile-photo {
  width: 100%;
  max-width: 420px;
  height: auto;
  border-radius: 20px;
  object-fit: cover;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.hero-text-wrapper {
  flex: 1;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.greeting {
  font-family: 'Space Mono', monospace;
  font-size: 1.1rem;
  letter-spacing: 2px;
  margin-bottom: 0.5rem;
}

.name {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 5.5rem;
  line-height: 1.05;
  margin: 0 0 1.5rem 0;
  letter-spacing: -1px;
}

.divider {
  width: 45px;
  height: 2px;
  background-color: #FFFFFF;
  margin-bottom: 2rem;
}

.description {
  font-family: 'Space Mono', monospace;
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 3rem;
  color: rgba(255, 255, 255, 0.9);
}

.cta-button {
  background: transparent;
  color: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 50px;
  padding: 0.8rem 1.8rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.cta-button:hover {
  background: #FFFFFF;
  color: #3E64FF;
  border-color: #FFFFFF;
}

/* --- Mobile Adjustments --- */
@media (max-width: 992px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
    padding: 3rem 1.5rem;
  }
  
  .hero-image-wrapper {
    display: none; 
  }
  
  .hero-text-wrapper {
    align-items: center; 
  }

  .name {
    /* Use clamp to ensure it scales cleanly between 3rem and 4.5rem depending on screen width */
    font-size: clamp(3rem, 12vw, 4.5rem); 
  }

  .divider {
    /* Centers the divider since flex-start is removed */
    margin-left: auto;
    margin-right: auto;
  }

  .description {
    text-align: center;
    font-size: 0.95rem;
  }

  .desktop-br {
    /* Remove line breaks on mobile so text flows naturally */
    display: none; 
  }

  .bg-text-row {
    font-family: 'Inter', sans-serif;
    font-weight: 900;
    font-size: 14vh;
    line-height: 1;
    color: rgba(255, 255, 255, 0.12); 
    white-space: nowrap;
    will-change: transform;
    }
}
</style>