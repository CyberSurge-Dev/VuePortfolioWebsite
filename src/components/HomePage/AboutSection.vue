<template>
  <section class="about-section-wrapper">
    <div 
      class="about-grid-background" 
      :class="{ 'is-paused': isPaused }"
      @mouseenter="handleHover(true)" 
      @mouseleave="handleHover(false)"
    >
      <div 
        v-for="(row, rowIndex) in generatedRows" 
        :key="row.id"
        class="marquee-row" 
        :class="rowIndex % 2 === 0 ? 'scroll-left' : 'scroll-right'"
        :style="{ animationDelay: row.delay }"
      >
        <div class="marquee-content">
          <div 
            v-for="(img, imgIndex) in row.images" 
            :key="`first-${imgIndex}`"
            class="grid-item"
          >
            <img :src="img.url" alt="Grid Image" class="grid-image" />
          </div>
          <div 
            v-for="(img, imgIndex) in row.images" 
            :key="`second-${imgIndex}`"
            class="grid-item"
          >
            <img :src="img.url" alt="Grid Image" class="grid-image" />
          </div>
        </div>
      </div>
    </div>

    <div class="about-box-wrapper">
      <div class="about-box">
        <div class="box-header">
          <h2 class="box-title">About Me</h2>
        </div>
        <div class="box-content">
          <p class="box-subtitle">
            I am a passionate digital creator based in the beautiful city of Prague. With a strong foundation in both design principles and modern web development technologies, I strive to build thoughtful, user-centric experiences that blend aesthetic purpose with functional code.
          </p>
          <p class="box-subtitle hide-on-mobile">
            My expertise spans the entire creative pipeline, from initial conceptualization and wireframing in Figma to implementing robust, responsive frontends using Vue.js and CSS.
          </p>
        </div>
        <div class="box-footer">
          <a href="/contact" class="compact-btn">
            CONTACT ME
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const imageModules = import.meta.glob('../../assets/AboutPhotos/*.{png,jpg,jpeg,webp,avif}', { 
  eager: true, 
  import: 'default' 
});
const importedPhotoUrls = Object.values(imageModules) as string[];

const numRows = 4;
const isPaused = ref(false);

const shuffleArray = (arr: string[]) => [...arr].sort(() => Math.random() - 0.5);

const generatedRows = Array.from({ length: numRows }).map((_, rowIndex) => {
  const hasPhotos = importedPhotoUrls.length > 0;
  const shuffledUrls = hasPhotos ? shuffleArray(importedPhotoUrls) : [];
  
  // Images map without artificial aspect ratios
  const images = Array.from({ length: 10 }).map((_, imgIndex) => ({
    url: hasPhotos ? shuffledUrls[imgIndex % shuffledUrls.length] : ''
  }));

  const delay = `-${Math.random() * 100}s`;

  return { id: rowIndex, images, delay };
});

const handleHover = (status: boolean) => {
  if (window.innerWidth > 768) {
    isPaused.value = status;
  }
};
</script>

<style scoped>
.about-section-wrapper {
  background-color: #000;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center; 
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.about-grid-background {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  z-index: 1; 
}

.is-paused .marquee-content {
  animation-play-state: paused !important;
}

.marquee-row {
  display: flex;
  height: 25vh;
  width: 100%;
  overflow: hidden;
}

.marquee-content {
  display: flex;
  height: 100%;
  width: max-content; 
}

/* Row Directions */
.scroll-left .marquee-content {
  animation: marquee-left 80s linear infinite;
}

.scroll-right .marquee-content {
  animation: marquee-right 80s linear infinite;
}

@keyframes marquee-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); } 
}

@keyframes marquee-right {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}

.grid-item {
  height: 100%;
  flex-shrink: 0; /* CRITICAL: Prevents images from squishing to fit the row */
}

.grid-image {
  height: 100%;
  width: auto; /* Intrinsic ratio takes over */
  display: block; /* Removes native baseline spacing under images */
  filter: grayscale(100%);
  opacity: 0.5;
  transition: filter 0.4s ease, opacity 0.4s ease;
}

@media (hover: hover) {
  .grid-item:hover .grid-image {
    filter: grayscale(0%);
    opacity: 0.9;
  }
}

/* Glass Box Styles */
.about-box-wrapper {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 700px;
  padding: 0 1.5rem;
}

.about-box {
  background: rgba(20, 20, 20, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-left: 6px solid #3E64FF;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.9);
}

.box-title {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 2.25rem;
  color: #3E64FF;
  margin: 0 0 1.5rem 0;
}

.box-subtitle {
  font-family: 'Space Mono', monospace;
  font-size: 0.95rem;
  line-height: 1.7;
  color: #E0E0E0;
  margin-bottom: 1.25rem;
}

.box-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1.5rem;
}

.compact-btn {
  color: #FFF;
  text-decoration: none;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 8px;
}

@media (max-width: 768px) {
  .about-box-wrapper {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 100vw;
    padding: 0 1rem;
  }

  .grid-image {
    transition: none !important;
    filter: grayscale(100%) !important; 
    opacity: 0.35 !important; 
  }

  .about-box {
    padding: 1.5rem; 
    border-left-width: 4px;
    backdrop-filter: blur(12px); 
  }

  .box-header {
    margin-bottom: 1rem;
  }

  .box-title {
    font-size: 1.75rem;
  }

  .box-content {
    margin-bottom: 1.5rem;
    gap: 1rem;
  }

  .box-subtitle {
    font-size: 0.85rem;
    line-height: 1.6;
  }

  .hide-on-mobile {
    display: none;
  }

  .box-footer {
    padding-top: 1.25rem;
  }

  .compact-btn {
    font-size: 0.8rem;
  }
}
</style>