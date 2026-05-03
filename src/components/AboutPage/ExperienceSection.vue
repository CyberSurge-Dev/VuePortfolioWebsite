<template>
  <section class="experience-section">
    <div class="container">
      
      <div class="section-header">
        <h2 class="section-title">Experience<span class="accent-dot">.</span></h2>
        <p class="section-subtitle">Professional roles and academic involvement.</p>
      </div>

      <div 
        class="experience-list" 
        ref="listRef" 
        :style="listStyle"
      >
        <div 
          v-for="(job, index) in experienceData" 
          :key="index"
          class="experience-item"
          :class="{ 'is-active': activeIndex === index }"
        >
          <button class="item-header" @click="toggleAccordion(index)">
            <div class="header-content">
              <h3 class="job-role">{{ job.role }}</h3>
              <span class="job-company">@ {{ job.company }}</span>
            </div>
            
            <div class="header-meta">
              <span class="job-duration">{{ job.duration }}</span>
              <div class="chevron-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </button>

          <div class="item-body-wrapper">
            <div class="item-body-inner">
              <div class="item-body-content">
                <p v-if="job.description" class="job-description">
                  {{ job.description }}
                </p>
                
                <ul class="job-bullets">
                  <li v-for="(bullet, bIndex) in job.bullets" :key="bIndex">
                    {{ bullet }}
                  </li>
                </ul>

                <div class="tech-stack" v-if="job.technologies && job.technologies.length">
                  <span v-for="(tech, tIndex) in job.technologies" :key="tIndex" class="tech-pill">
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { usePortfolioStore } from '@/stores/portfolio';

const store = usePortfolioStore();

const activeIndex = ref<number | null>(null);
const isMobile = ref(false);

const listRef = ref<HTMLElement | null>(null);
const dynamicMinHeight = ref<number>(0);

const listStyle = computed(() => {
  if (isMobile.value || dynamicMinHeight.value === 0) {
    return {};
  }
  return { minHeight: `${dynamicMinHeight.value}px` };
});

const calculateMaxHeight = async () => {
  await nextTick(); 
  
  if (!listRef.value || isMobile.value) {
    dynamicMinHeight.value = 0;
    return;
  }

  let headersHeight = 0;
  const headers = listRef.value.querySelectorAll('.item-header');
  headers.forEach(h => {
    headersHeight += (h as HTMLElement).offsetHeight;
  });

  let maxBodyHeight = 0;
  const bodies = listRef.value.querySelectorAll('.item-body-content');
  bodies.forEach(b => {
    const bodyHeight = (b as HTMLElement).scrollHeight;
    if (bodyHeight > maxBodyHeight) {
      maxBodyHeight = bodyHeight;
    }
  });

  const itemCount = headers.length;
  const gaps = itemCount > 1 ? (itemCount - 1) * 16 : 0; 
  const borders = itemCount * 2; 

  // Added a rounding buffer to ensure no fractional pixel jittering triggers a scrollbar
  dynamicMinHeight.value = Math.ceil(headersHeight + maxBodyHeight + gaps + borders) + 2;
};

const handleResize = () => {
  const mobileView = window.innerWidth <= 768;
  
  if (mobileView !== isMobile.value) {
    isMobile.value = mobileView;
    if (!isMobile.value && activeIndex.value === null) {
      activeIndex.value = 0; 
    }
  }
  
  calculateMaxHeight();
};

onMounted(async () => {
  isMobile.value = window.innerWidth <= 768;
  
  if (isMobile.value) {
    activeIndex.value = null; 
  } else {
    activeIndex.value = 0;    
  }

  window.addEventListener('resize', handleResize);
  await calculateMaxHeight();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

const experienceData = computed(() => store.aboutMeData?.experience || []);
watch(experienceData, () => {
  calculateMaxHeight();
}, { deep: true });

const toggleAccordion = (index: number) => {
  if (isMobile.value) {
    activeIndex.value = activeIndex.value === index ? null : index;
  } else {
    if (activeIndex.value !== index) {
      activeIndex.value = index;
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Space+Mono&display=swap');

.experience-section {
  background-color: #0A0A0A;
  color: #FFFFFF;
  padding: 3.5rem 0;
  font-family: 'Inter', sans-serif;
  height: fit-content;
  display: flex;
  align-items: center;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1.5rem;
  width: 100%;
}

/* --- Section Header --- */
.section-header {
  margin-bottom: 2rem;
  text-align: left;
}

.section-title {
  font-size: 2.25rem;
  font-weight: 800;
  margin: 0 0 0.25rem 0;
  letter-spacing: -1px;
}

.accent-dot {
  color: #3E64FF;
}

.section-subtitle {
  font-family: 'Space Mono', monospace;
  color: #888888;
  font-size: 0.85rem;
  margin: 0;
}

/* --- Accordion List --- */
.experience-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: min-height 0.3s ease; 
}

/* --- Accordion Item --- */
.experience-item {
  background-color: #111111;
  border: 1px solid #222222;
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.3s ease;
  flex-shrink: 0; 
}

.experience-item:hover {
  border-color: #333333;
}

.experience-item.is-active {
  border-color: #3E64FF;
}

/* --- Accordion Header --- */
.item-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  border: none;
  padding: 1.25rem 1.5rem;
  cursor: pointer;
  color: #FFFFFF;
  text-align: left;
}

.header-content {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.job-role {
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0;
}

.job-company {
  font-size: 1rem;
  font-weight: 600;
  color: #3E64FF;
}

.header-meta {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.job-duration {
  font-family: 'Space Mono', monospace;
  font-size: 0.85rem;
  color: #888888;
}

.chevron-icon {
  color: #888888;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease, color 0.3s ease;
}

.experience-item.is-active .chevron-icon {
  transform: rotate(180deg);
  color: #3E64FF;
}

/* --- Accordion Body (CSS Grid Animation) --- */
.item-body-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease-out;
}

.experience-item.is-active .item-body-wrapper {
  grid-template-rows: 1fr;
}

.item-body-inner {
  min-height: 0; /* CRITICAL: Prevents CSS Grid from snapping to content height mid-animation */
  overflow: hidden;
}

.item-body-content {
  /* CRITICAL: Keep padding and margins static so the calculated height doesn't change mid-animation */
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  margin-top: 0.5rem;
  border-top: 1px solid #222222;
}

/* --- Content Styling --- */
.job-description {
  font-size: 0.95rem;
  color: #AAAAAA;
  line-height: 1.5;
  margin: 0 0 1rem 0;
}

.job-bullets {
  margin: 0 0 1.5rem 0;
  padding-left: 1.25rem;
  color: #CCCCCC;
}

.job-bullets li {
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 0.5rem;
}

.job-bullets li::marker {
  color: #3E64FF;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-pill {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  background-color: rgba(62, 100, 255, 0.1);
  color: #5B7BFF;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  border: 1px solid rgba(62, 100, 255, 0.2);
}

/* --- Mobile UI Strict Overrides --- */
@media (max-width: 768px) {
  .experience-section {
    padding: 2.5rem 0;
    max-height: none; 
    display: block;   
  }

  .section-title {
    font-size: 2rem;
  }

  .experience-list {
    gap: 0.75rem;
  }

  /* Compact Header */
  .item-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 0.85rem 1rem;
  }

  .header-content {
    flex-direction: column;
    gap: 0.25rem;
  }

  .job-role {
    font-size: 1rem;
  }

  .job-company {
    font-size: 0.9rem;
  }

  .header-meta {
    width: 100%;
    justify-content: space-between;
  }

  .job-duration {
    font-size: 0.75rem;
  }

  /* Compact Body */
  .item-body-content {
    padding: 0.75rem 1rem 1rem 1rem;
    margin-top: 0.25rem;
  }

  .job-description {
    font-size: 0.85rem;
    margin-bottom: 0.75rem;
  }

  .job-bullets {
    margin-bottom: 1rem;
    padding-left: 1rem;
  }

  .job-bullets li {
    font-size: 0.85rem;
    margin-bottom: 0.35rem;
  }

  /* Compact Tech Pills */
  .tech-stack {
    gap: 0.35rem;
  }

  .tech-pill {
    font-size: 0.65rem;
    padding: 0.15rem 0.4rem;
  }
}
</style>