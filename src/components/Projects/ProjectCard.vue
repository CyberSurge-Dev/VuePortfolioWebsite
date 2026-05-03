<template>
  <div class="project-card">
    <div class="card-top">
      <img 
        v-if="displayImage"
        :src="displayImage" 
        :alt="project.name || project.title" 
        class="project-image"
      />
    </div>
    <div class="card-bottom">
      <div class="text-group">
        <h3 class="project-title">{{ project.name || project.title }}</h3>
        <p class="project-description">{{ project.description }}</p>
        
        <div v-if="project.tags && project.tags.length" class="project-tags">
          <span v-for="tag in project.tags" :key="tag" class="tag">
            {{ tag }}
          </span>

        </div>

      </div>

      <div class="icon-group">
        <a href="#" class="project-link" aria-label="View Project">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed } from 'vue';

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

// Safely get the first image from the new coverImages array, 
// or fallback to the old imageUrl if using old mock data.
const displayImage = computed(() => {
  if (props.project.coverImages && props.project.coverImages.length > 0) {
    return props.project.coverImages[0];
  }
  return props.project.imageUrl || ''; 
});

import { ref, onMounted, onUnmounted } from 'vue';

// --- Screen Detection Logic ---
const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768; 
};

onMounted(() => {
  checkMobile(); 
  window.addEventListener('resize', checkMobile); 
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile); 
});

</script>

<style scoped>
.project-card {
  background-color: #1A1A1A; 
  border-radius: 12px; 
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  /* Reduced card width so they don't feel as massive */
  flex: 0 0 360px; 
  max-width: 85vw; 
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

.card-top {
  /* Slightly shorter image to balance the narrower card */
  height: 230px; 
  background-color: #2A2A2A; 
  overflow: hidden;
  position: relative;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  display: block;
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

.card-bottom {
  /* Tightened up the inner spacing */
  padding: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-grow: 1; 
}

.text-group {
  flex: 1;
}

.project-title {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 1.15rem;
  margin: 0 0 0.4rem 0;
  color: #FFFFFF;
}

.project-description {
  font-family: 'Space Mono', monospace;
  font-weight: 400;
  font-size: 0.85rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

/* --- New Tags Styling --- */
.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.tag {
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  color: #3E64FF;
  background-color: rgba(62, 100, 255, 0.1);
  border: 1px solid rgba(62, 100, 255, 0.2);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.project-link {
  color: #FFFFFF;
  opacity: 0.5;
  transition: all 0.3s ease;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
}

.project-card:hover .project-link {
  opacity: 1;
  color: #3E64FF; 
}

/* --- Mobile Adjustments --- */
@media (max-width: 992px) {
  .project-card {
    flex: 0 0 80vw; 
  }

  .card-top {
    height: 200px;
  }

  .project-description {
    font-size: 0px;
  }
}
</style>