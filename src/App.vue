<script setup lang="ts">
import { RouterView } from 'vue-router'

import { onMounted } from 'vue';
import { usePortfolioStore } from '@/stores/portfolio';

const store = usePortfolioStore();

onMounted(() => {
  store.fetchRootData(); // <-- This is what actually pulls the JSON
});

</script>

<template>
  <RouterView class='main'/>
</template>

<style scoped>
main {
  width: 100vw;
  margin-left: 0px;
}
</style>


