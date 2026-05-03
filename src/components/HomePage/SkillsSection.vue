<template>
  <section class="skills-section">
    <div class="skills-background">
      <div 
        v-for="logo in generatedLogos" 
        :key="logo.id" 
        class="floating-wrapper"
        :style="logo.style"
      >
        <img 
          :src="logo.url" 
          :alt="logo.name"
          class="floating-icon"
        />
      </div>
    </div>

    <div class="skills-container">
      
      <header class="page-header">
        <h2 class="page-title">Technical Expertise<span class="accent-dot">.</span></h2>
        <p class="page-subtitle">A high-definition snapshot of my core stack in engineering and software.</p>
      </header>

      <div class="skills-grid">
        <div 
          v-for="(skillsList, categoryName) in skillCategories" 
          :key="categoryName" 
          class="skill-card"
        >
          <div class="card-header">
            <h3 class="category-title">{{ categoryName }}</h3>
          </div>
          
          <ul class="skill-list">
            <li v-for="skill in skillsList" :key="skill.name || skill">
              {{ skill.name || skill }}
            </li>
          </ul>
        </div>
      </div>

      <footer class="box-footer">
        <a href="/about" class="compact-btn">
          LEARN MORE
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </footer>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { usePortfolioStore } from '@/stores/portfolio';

const store = usePortfolioStore();

// Safely pull the corresponding categories from your store structure
const skillCategories = computed(() => {
  return store.aboutMeData?.skills?.categories || {};
});

// Fallback logos just in case your store doesn't have a logos array yet
const fallbackLogos = [
  { name: 'Python', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'C#', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg' },
  { name: 'MATLAB', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matlab/matlab-original.svg' },
  { name: 'Arduino', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg' },
  { name: 'Git', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
  { name: 'Docker', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
  { name: 'Solidworks', url: 'https://user-images.githubusercontent.com/71769312/227775653-d28a9cdc-f0e0-4174-aa84-c54c2b7e2879.jpg'},
  { name: 'Canva', url: 'https://public.canva.site/logo/media/dfb96cc174513093cd6ed61489ccb750.svg'},
  { name: 'Drive', url: 'https://logos-world.net/wp-content/uploads/2020/11/Google-Drive-Logo-2014-2020.png'},
  { name: 'Linux', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAx6camOf_G96Zcs2Zj34Yjmy0ysPd-p0oJQ&s'},
  { name: 'Excel', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Microsoft_Office_Excel_%282019%E2%80%932025%29.svg/1280px-Microsoft_Office_Excel_%282019%E2%80%932025%29.svg.png'},
  { name: 'GDocs', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Google_Docs_2020_Logo.svg/250px-Google_Docs_2020_Logo.svg.png'},
  { name: 'Fusion360', url: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/autodesk-fusion-360-icon.png'},
  { name: 'OnShape', url: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/onshape.webp'}
];

const masterLogos = computed(() => {
  return store.aboutMeData?.logos?.length ? store.aboutMeData.logos : fallbackLogos;
});

const generatedLogos = ref<any[]>([]);
const numLogos = 120; // Increased count for a denser, more constant stream

// Function to generate the random trajectory and evenly spaced timings
const buildLogoStream = (logos: any[]) => {
  if (!logos || logos.length === 0) return;

  const shuffledMaster = [...logos].sort(() => 0.5 - Math.random());

  generatedLogos.value = Array.from({ length: numLogos }, (_, i) => {
    const logo = shuffledMaster[i % shuffledMaster.length];
    
    // Trigonometry to calculate a random outward trajectory
    const angle = Math.random() * Math.PI * 2; 
    const distance = 70 + Math.random() * 40; // Ensure they go completely off-screen
    
    const tx = (Math.cos(angle) * distance).toFixed(2);
    const ty = (Math.sin(angle) * distance).toFixed(2);
    
    const scale = 0.6 + Math.random() * 0.9; 
    const duration = 20 + Math.random() * 15; 
    
    // Evenly distribute the negative delays across a 100-second timeline.
    const evenlySpacedDelay = -1 * (i / numLogos) * 100;
    const jitter = Math.random() * 2; 
    const finalDelay = evenlySpacedDelay - jitter;

    return {
      id: i,
      url: logo.url,
      name: logo.name,
      style: {
        '--tx': `${tx}vw`,
        '--ty': `${ty}vh`,
        '--scale': scale,
        'animation-duration': `${duration}s`,
        'animation-delay': `${finalDelay}s`,
      }
    };
  });
};

onMounted(() => {
  // If the store data is already available, build the background immediately
  if (store.aboutMeData) {
    buildLogoStream(masterLogos.value);
  } else if (!store.isLoading) {
    // If missing, tell store to fetch data
    store.fetchRootData();
  }
});

// Reactively watch for the data to arrive from GitHub so the stream populates correctly
watch(() => store.aboutMeData, (newData) => {
  if (newData && generatedLogos.value.length === 0) {
    buildLogoStream(masterLogos.value);
  }
});
</script>

<style scoped>
.skills-section {
  background-color: #FAFAFA; /* Off-white for better visual separation on Home */
  min-height: 80vh; /* Reduced height to make it more compact */
  display: flex;
  align-items: center; 
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 4rem 1.5rem; 
}

/* --- Background Emitter (UNTOUCHED) --- */
.skills-background {
  position: absolute;
  inset: 0;
  z-index: 1; 
  opacity: 0.7; 
  mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
  pointer-events: none; 
}

.floating-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
  
  animation-name: emitOutward;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  will-change: transform, opacity;
}

.floating-icon {
  height: 40px; 
  width: auto;
  object-fit: contain;
  filter: grayscale(100%); 
  backface-visibility: hidden;
}

@keyframes emitOutward {
  0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(var(--scale)); opacity: 0; }
}

/* --- Redesigned Foreground - Compact Bento Box --- */
.skills-container {
  position: relative;
  z-index: 10; 
  width: 100%;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Tighter, centered header */
.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
  color: #111111;
  letter-spacing: -1.5px;
}

.accent-dot {
  color: #3E64FF;
}

.page-subtitle {
  font-family: 'Space Mono', monospace;
  font-size: 1rem;
  color: #666666;
  margin: 0;
  max-width: 500px;
}

/* Clean 3-Column Grid */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  width: 100%;
}

/* Individual Compact Cards */
.skill-card {
  background: rgba(17, 17, 17, 0.98);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.5rem; 
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.skill-card:hover {
  transform: translateY(-5px);
  border-color: #3E64FF;
}

.card-header {
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.category-title {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  text-transform: uppercase;
  color: #888888;
  margin: 0;
  letter-spacing: 2px;
}

.skill-list {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
}

.skill-list li {
  font-size: 1rem;
  margin-bottom: 0.75rem;
  color: #FFFFFF;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
}

.skill-list li::before {
  content: '';
  width: 4px;
  height: 4px;
  background-color: #3E64FF;
  border-radius: 50%;
  display: block;
}

.box-footer {
  width: 100%;
  display: flex;
  justify-content: center;
}

.compact-btn {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.8rem;
  color: #FFFFFF;
  background: #111111;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  border-radius: 100px;
  transition: background 0.3s ease, transform 0.3s ease;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.compact-btn:hover {
  background: #3E64FF;
  transform: translateY(-2px);
}

/* --- Mobile Specifics --- */
@media (max-width: 1024px) {
  .page-title {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .skills-section {
    padding: 3rem 1.5rem;
    min-height: 70vh; /* Allow the section to hug the content on mobile */
  }

  /* Compact header on mobile */
  .page-header {
    margin-bottom: 1.5rem; /* Tighter gap before the button */
  }

  .page-title {
    font-size: 1.75rem;
  }

  /* Completely hide the skills grid to focus on the call-to-action */
  .skills-grid {
    display: none;
  }

  .compact-btn {
    width: 100%;
    justify-content: center;
    padding: 16px 24px; /* Slightly taller button for better tap target */
  }

  /* Slightly larger icons for better readability on mobile background */
  .floating-icon {
    height: 50px; 
  }
}
</style>