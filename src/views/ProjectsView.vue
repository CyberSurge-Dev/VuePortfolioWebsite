<template>
  <NavBar />
  <div class="projects-view">
    <div class="container">
      
      <header class="page-header">
        <h1 class="page-title">All Projects<span class="accent-dot">.</span></h1>
        <p class="page-subtitle">A deep dive into my work in software, robotics, and electrical engineering.</p>
      </header>

      <div class="masonry-grid">
        <div 
          v-for="project in projectsData" 
          :key="project.name || project.name" 
          class="masonry-item"
        >
          <ProjectCard 
            :project="project" 
            @click="goToArticle(project.folderName)"
            class="clickable-card"
          />
        </div>
      </div>

    </div>
  </div>
  <PageFooter />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePortfolioStore } from '@/stores/portfolio';
import ProjectCard from '@/components/Projects/ProjectCard.vue'; // Adjust path if necessary
import NavBar from '@/components/NavBar.vue';
import PageFooter from '@/components/PageFooter.vue';

const store = usePortfolioStore();
const router = useRouter();

// Safely pull the dynamic array of articles from the Pinia store
const projectsData = computed(() => store.articlesList || []);

// Function to route the user to the dynamically generated article page
const goToArticle = (folderName?: string) => {
  if (folderName) {
    router.push(`/projects/${folderName}`);
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Space+Mono&display=swap');

.projects-view {
  background-color: #0A0A0A;
  min-height: 100vh;
  padding: 2rem 0;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* --- Header --- */
.page-header {
  margin-bottom: 2rem;
  text-align: center;
}

.page-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin: 0 0 0.2rem 0;
  letter-spacing: -1.5px;
}

.accent-dot {
  color: #3E64FF;
}

.page-subtitle {
  font-family: 'Space Mono', monospace;
  color: #888888;
  font-size: 1rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
}

/* --- Masonry Grid --- */
.masonry-grid {
  column-count: 3;
  column-gap: 1.5rem;
}

.masonry-item {
  break-inside: avoid; /* Prevents cards from splitting across columns */
  margin-bottom: 1.5rem;
}

/* Ensures the user knows the card is clickable */
.clickable-card {
  cursor: pointer;
}

/* --- Responsive Layout --- */
@media (max-width: 1024px) {
  .masonry-grid {
    column-count: 2;
  }
}

@media (max-width: 768px) {
  .projects-view {
    padding: 2rem 0;
  }

  .page-title {
    font-size: 2.5rem;
  }

  .masonry-grid {
    column-count: 1; /* Stacks everything into a single column on mobile */
  }
}
</style>