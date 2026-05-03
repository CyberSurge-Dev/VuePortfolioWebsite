<template>
  <div class="about-page">
    <NavBar />
    
    <main>
      <IntroSection />
      <EducationSection />
      <SkillsSection />
      <ExperienceSection />
      <CertsSection />
      <ContactCard />
    </main>

    <PageFooter />
  </div>
</template>

<script setup lang="ts">
import NavBar from '../components/NavBar.vue';
import IntroSection from '../components/AboutPage/IntroSection.vue';
import PageFooter from '../components/PageFooter.vue';
import EducationSection from '@/components/AboutPage/EducationSection.vue';
import SkillsSection from '@/components/AboutPage/SkillsSection.vue';
import ExperienceSection from '@/components/AboutPage/ExperienceSection.vue';
import CertsSection from '@/components/AboutPage/CertsSection.vue';
import ContactCard from '@/components/ContactCard.vue';
</script>

<style scoped>
.about-page {
  background-color: #000000;
}
</style>