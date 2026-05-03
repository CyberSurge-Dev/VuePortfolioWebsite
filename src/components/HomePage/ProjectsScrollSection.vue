<template>
  <section class="ProjectsScrollSection">
    <div class="header-group">
      <h2 class="section-title">Projects</h2>
      
      <div class="nav-buttons desktop-only">
        <button @click="scrollPrev" class="nav-btn prev" aria-label="Previous Project">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <button @click="scrollNext" class="nav-btn next" aria-label="Next Project">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    </div>

    <div class="scroll-wrapper" ref="scrollWrapper">
      <div class="cards-track">
        <ProjectCard 
          v-for="project in projects" 
          :key="project.name || project.name" 
          :project="project"
          @click="goToArticle(project.folderName)"
          class="clickable-card"
        />
        <div class="scroll-spacer"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang='ts'>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePortfolioStore } from '@/stores/portfolio';
import ProjectCard from '../Projects/ProjectCard.vue';

const scrollWrapper = ref<HTMLElement | null>(null);
const router = useRouter();
const store = usePortfolioStore();

// Dynamically pull the loaded articles from the Pinia store
const projects = computed(() => store.articlesList || []);

// Function to route the user to the dynamically generated article page
const goToArticle = (folderName?: string) => {
  if (folderName) {
    // Adjust '/projects/' to match whatever path you set in your Vue Router (e.g., /article/, /work/)
    router.push(`/projects/${folderName}`);
  }
};

const scrollPrev = () => {
  if (scrollWrapper.value) {
    // Adjusted scroll distance to match new narrower cards + tighter gap
    scrollWrapper.value.scrollBy({ left: -380, behavior: 'smooth' });
  }
};

const scrollNext = () => {
  if (scrollWrapper.value) {
    scrollWrapper.value.scrollBy({ left: 380, behavior: 'smooth' });
  }
};
</script>

<style scoped>
.ProjectsScrollSection {
  background-color: black; 
  /* Reduced vertical padding */
  padding: 2rem 0;
  font-family: 'Inter', sans-serif;
  overflow: hidden; 
}

.header-group {
  /* Increased max-width to let content spread out more on wide screens */
  max-width: 90vw;
  margin: 0 auto 1.8rem auto;

  /* Use a fluid viewport width for padding */
  padding: 0 5vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 2.8rem;
  letter-spacing: -1px;
  margin: 0;
  color: #FFFFFF;
}

.nav-buttons {
  display: flex;
  gap: 12px;
}

.nav-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #FFFFFF;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background-color: #FFFFFF;
  color: #111111;
  border-color: #FFFFFF;
}

.scroll-wrapper {
  width: 100%;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch; 
  -ms-overflow-style: none; 
  padding-bottom: 2rem; 
}

.scroll-wrapper::-webkit-scrollbar {
  display: none; 
}

.cards-track {
  display: flex;
  /* Tightened the gap between cards */
  gap: 1.25rem;
  
  /* CRITICAL ALIGNMENT MATH:
    This guarantees the first card perfectly aligns with the title above it, 
    regardless of how wide the screen is, while still allowing the track to bleed off the right.
  */
  padding-left: 3vw;
  padding-right: 2vw;
  
  width: 100%; 
}

/* Ensure the card looks interactive when hovered over */
.clickable-card {
  cursor: pointer;
}

.desktop-only {
  display: flex;
}

.scroll-spacer {
  flex: 0 0 2rem; 
}

/* --- Mobile Specifics --- */
@media (max-width: 992px) {
  .ProjectsScrollSection {
    padding: 1rem 0;
  }

  .header-group {
    padding: 0 0.1rem;
    margin-bottom: 1rem;
  }

  .section-title {
    font-size: 2.2rem;
  }

  .desktop-only {
    display: none;
  }

  .cards-track {
    gap: 1rem;
    padding-left: 1.5rem; 
    padding-right: 1.5rem;
  }
}
</style>