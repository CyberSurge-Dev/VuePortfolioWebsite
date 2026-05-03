<template>
  <main class="main-layout">
    <HeroSection />
    <ProjectsScrollSection />
    <SkillsSection />
    <AboutSection />
    <PageFooter />
  </main>
</template>

<script setup lang='ts'>
// Import your section components here
// Make sure the path matches where you saved HeroSection.vue
import HeroSection from '../components/HomePage/HeroSection.vue'; 
import ProjectsScrollSection from '../components/HomePage/ProjectsScrollSection.vue';
import SkillsSection from '../components/HomePage/SkillsSection.vue';
import AboutSection from '../components/HomePage/AboutSection.vue';
import PageFooter from '../components/PageFooter.vue';
//import ContactCard from '@/components/ContactCard.vue';

// Future imports will look like this:
// import AboutSection from './components/AboutSection.vue';
// import ProjectsSection from './components/ProjectsSection.vue';
// import FooterSection from './components/FooterSection.vue';
</script>

<style>
/* Global Styles & CSS Reset 
  Note: This block does NOT have the 'scoped' attribute so these 
  rules will apply to the entire website, keeping things consistent.
*/

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  width: 100vw;
  /* Prevent horizontal scrolling from full-width elements */
  overflow-x: hidden; 
  /* Smooth scrolling for anchor links (e.g., clicking 'ABOUT' scrolls down) */
  scroll-behavior: smooth; 
  /* Sets the default background color for the rest of the site */
  background-color: #FAFAFA; 
  color: #222222;
  /* Setting a fallback font here in case components don't specify */
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>