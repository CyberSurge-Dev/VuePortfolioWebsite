<template>
  <div class="about-page">
    <NavBar />
    
    <main>
      <ContactCard />
    </main>

    <PageFooter />
  </div>
</template>

<script setup lang="ts">
import ContactCard from '@/components/ContactCard.vue';
import NavBar from '@/components/NavBar.vue';
import PageFooter from '@/components/PageFooter.vue';
</script>

<style scoped>
.about-page {
  background-color: #000000;
}
</style>