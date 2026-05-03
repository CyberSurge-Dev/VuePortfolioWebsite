<template>
  <section class="skills-section">
    <div class="container">
      
      <div class="section-header">
        <h2 class="section-title">Core Skills<span class="accent-dot">.</span></h2>
        <p class="section-subtitle">Key areas of expertise I am actively developing.</p>
      </div>

      <div class="skills-layout">
        <div class="tabs-column">
          <div class="tabs-nav">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="['tab-btn', { active: activeTab === tab.id }]"
            >
              <span class="tab-label">{{ tab.label }}</span>
            </button>
          </div>
        </div>

        <div class="list-column">
          <transition name="fade-slide" mode="out-in">
            <div :key="activeTab" class="skills-list">
              <div 
                v-for="(skill, index) in filteredSkills" 
                :key="index" 
                class="skill-list-item"
              >
                <div class="skill-header">
                  <h3 class="skill-name">{{ skill.name }}</h3>
                  <div class="skill-experience">
                    <span class="years">{{ skill.years }}</span>
                    <span class="yrs-label">YRS</span>
                  </div>
                </div>
                <p v-if="skill.description" class="skill-description">
                  {{ skill.description }}
                </p>
              </div>
            </div>
          </transition>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePortfolioStore } from '@/stores/portfolio';

const store = usePortfolioStore();

// Keep track of which tab is currently selected
const activeTab = ref('professional');

// Safely pull the tabs configuration from the store
const tabs = computed(() => store.aboutMeData?.skills.tabs || []);

// Safely pull the corresponding category's skills based on the active tab
const filteredSkills = computed(() => {
  const categories = store.aboutMeData?.skills.categories;
  
  // If data hasn't loaded yet, or the category doesn't exist, return an empty array
  if (!categories) return [];
  
  return categories[activeTab.value] || [];
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Space+Mono&display=swap');

.skills-section {
  background-color: #FFFFFF;
  color: #111111;
  padding: 3.5rem 0;
  font-family: 'Inter', sans-serif;
  /* Ensures the entire section never exceeds the viewport height */
  max-height: 100vh; 
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
  color: #111111;
}

.accent-dot {
  color: #3E64FF;
}

.section-subtitle {
  font-family: 'Space Mono', monospace;
  color: #666666;
  font-size: 0.85rem;
  margin: 0;
}

/* --- Layout Structure --- */
.skills-layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 2.5rem;
  align-items: start;
}

/* --- Tab Navigation --- */
.tabs-column {
  min-width: 0; 
}

.tabs-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tab-btn {
  background: transparent;
  border: none;
  text-align: left;
  padding: 0.75rem 1rem;
  cursor: pointer;
  border-left: 3px solid #EEEEEE;
  transition: all 0.2s ease;
}

.tab-label {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: #888888;
  transition: color 0.2s ease;
}

.tab-btn:hover {
  border-left-color: #CCCCCC;
}

.tab-btn:hover .tab-label {
  color: #444444;
}

.tab-btn.active {
  border-left-color: #3E64FF;
  background-color: rgba(62, 100, 255, 0.05);
}

.tab-btn.active .tab-label {
  color: #3E64FF;
}

/* --- Skills List with Scroll --- */
.list-column {
  /* Fixed height forces the section to be constant */
  height: 380px; 
  overflow-y: auto; /* Enables scrolling when content overflows */
  padding-right: 1rem; /* Prevents scrollbar from covering text */
  
  /* Firefox Scrollbar */
  scrollbar-width: thin;
  scrollbar-color: #CCCCCC transparent;
}

/* Webkit Scrollbar (Chrome, Safari, Edge) */
.list-column::-webkit-scrollbar {
  width: 6px;
}

.list-column::-webkit-scrollbar-track {
  background: transparent;
}

.list-column::-webkit-scrollbar-thumb {
  background-color: #CCCCCC;
  border-radius: 10px;
}

.list-column::-webkit-scrollbar-thumb:hover {
  background-color: #3E64FF;
}

.skills-list {
  display: flex;
  flex-direction: column;
}

.skill-list-item {
  padding: 1rem 0;
  border-bottom: 1px solid #EEEEEE;
  transition: transform 0.2s ease;
}

.skill-list-item:first-child {
  padding-top: 0;
}

.skill-list-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.skill-list-item:hover {
  transform: translateX(6px);
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.skill-name {
  font-size: 1.25rem;
  font-weight: 800;
  margin: 0;
  color: #111111;
}

.skill-experience {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.years {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 1rem;
  color: #3E64FF;
}

.yrs-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 800;
  color: #888888;
  letter-spacing: 1px;
}

.skill-description {
  font-size: 0.9rem;
  color: #555555;
  line-height: 1.5;
  margin: 0;
  max-width: 90%;
}

/* --- Transitions --- */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(5px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

/* --- Mobile UI Fixes --- */
@media (max-width: 768px) {
  .skills-section {
    padding: 2.5rem 0;
    max-height: none; /* Release max height on mobile to allow natural flow if needed */
  }

  .skills-layout {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .list-column {
    height: 350px; /* Slightly shorter scroll box for mobile */
    padding-right: 0.5rem;
  }

  /* Fixed Mobile Tabs */
  .tabs-column {
    width: 100%;
    overflow: hidden;
  }

  .tabs-nav {
    flex-direction: row;
    border-bottom: 2px solid #EEEEEE;
    padding-bottom: 0;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .tabs-nav::-webkit-scrollbar {
    display: none;
  }

  .tab-btn {
    flex-shrink: 0;
    border-left: none;
    border-bottom: 3px solid transparent;
    padding: 0.75rem 1.25rem;
    white-space: nowrap;
  }

  .tab-btn.active {
    border-left-color: transparent;
    border-bottom-color: #3E64FF;
    background-color: transparent;
  }

  .skill-name {
    font-size: 1.15rem;
  }

  .skill-description {
    max-width: 100%;
    font-size: 0.85rem;
    gap: 2px;
  }
}
</style>