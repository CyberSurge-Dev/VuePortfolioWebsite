<template>
  <section class="awards-section">
    <div class="container">
      
      <div class="section-header">
        <h2 class="section-title">Recognitions<span class="accent-dot">.</span></h2>
        <p class="section-subtitle">Academic honors and certifications.</p>
      </div>

      <div class="category-wrapper">
        <div v-for="(group, groupName) in groupedAwards" :key="groupName" class="award-group">
          
          <div class="group-header">
            <h3 class="group-name">{{ groupName }}</h3>
            <div class="header-line"></div>
          </div>

          <div class="awards-list">
            <div 
              v-for="(item, index) in group" 
              :key="index" 
              class="award-item"
            >
              <div class="award-row">
                <div class="award-content">
                  <div class="award-top-line">
                    <h4 class="award-title">{{ item.title }}</h4>
                    <span class="award-date">{{ item.date }}</span>
                  </div>
                  
                  <div class="award-bottom-line">
                    <p v-if="item.description" class="award-description">
                      {{ item.description }}
                    </p>
                    <a v-if="item.link" :href="item.link" target="_blank" class="compact-link">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  </div>
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
import { computed } from 'vue';
import { usePortfolioStore } from '@/stores/portfolio';

const store = usePortfolioStore();

const groupedAwards = computed(() => {
  // 1. Safely pull the awards data from the store
  const awards = store.aboutMeData?.awards || [];
  
  // 2. Run your existing reduce function to group them by category
  return awards.reduce((acc: Record<string, typeof awards>, obj) => {
    const key = obj.category;
    if (!acc[key]) acc[key] = [];
    acc[key].push(obj);
    return acc;
  }, {});
});
</script>

<style scoped>
.awards-section {
  background-color: #FFFFFF;
  padding: 2rem 0; /* Very compact section padding */
  font-family: 'Inter', sans-serif;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1.25rem;
}

.section-header { margin-bottom: 1.5rem; }
.section-title {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -1px;
  margin: 0;
}
.accent-dot { color: #3E64FF; }
.section-subtitle {
  font-family: 'Space Mono', monospace;
  color: #888;
  font-size: 0.8rem;
}

.category-wrapper { display: flex; flex-direction: column; gap: 1.25rem; }

.group-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.group-name {
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  font-weight: 700;
  color: #3E64FF;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.header-line { flex-grow: 1; height: 1px; background: #F0F0F0; }

.award-item {
  padding: 0.6rem 0; /* Tight vertical spacing */
  border-bottom: 1px dashed #EEE; /* Lighter, cleaner separator */
}
.award-item:last-child { border-bottom: none; }

.award-top-line {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
}

.award-title {
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
  color: #111;
}

.award-date {
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  color: #AAA;
  white-space: nowrap;
}

.award-bottom-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.1rem;
}

.award-description {
  font-size: 0.85rem;
  max-width: 80%;
  color: #666;
  margin: 0;
  line-height: 1.3;
}

.compact-link {
  color: #3E64FF;
  display: flex;
  flex-shrink: 0;
  align-self: flex-end;
  margin-left: auto;
}
.compact-link svg { width: 12px; height: 12px; }

/* --- Mobile Specific Optimization --- */
@media (max-width: 768px) {
  .category-wrapper { gap: 1rem; }
  
  .award-top-line {
    /* Keeps title and date on one line even on small screens */
    flex-wrap: nowrap; 
  }

  .award-title {
    font-size: 0.95rem;
    /* Prevents the title from pushing the date to a new line */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .award-description {
    font-size: 0.8rem;
  }
}
</style>