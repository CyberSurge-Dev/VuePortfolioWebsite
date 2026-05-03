<template>
  <section class="education-section">
    <div class="container">
      
      <div class="section-header">
        <h2 class="section-title">Education<span class="accent-dot">.</span></h2>
        <p class="section-subtitle">My academic journey and qualifications.</p>
      </div>

      <div class="timeline-container">
        <div class="timeline-line"></div>

        <div 
          v-for="(item, index) in educationHistory" 
          :key="index" 
          class="timeline-item"
        >
          <div class="timeline-dot"></div>

          <div class="timeline-content">
            <div class="card-header">
              <h3 class="institution-name">{{ item.institution }}</h3>
              <span class="year-badge">{{ item.years }}</span>
            </div>

            <div class="degrees-list">
              <div 
                v-for="(degree, dIndex) in item.degrees" 
                :key="dIndex" 
                class="degree-item"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="degree-icon">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
                <span>{{ degree }}</span>
              </div>
            </div>

            <div class="details-row">
              <div v-if="item.gpa" class="gpa-block">
                <span class="label">GPA:</span>
                <span class="value">{{ item.gpa }}</span>
              </div>
              <div v-if="item.honors" class="honors-block">
                <span class="label">Honors:</span>
                <span class="value">{{ item.honors }}</span>
              </div>
            </div>

            <p v-if="item.description" class="description">
              {{ item.description }}
            </p>
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

// Safely pull the education data from the store once it loads.
// We default to an empty array ([]) so the template doesn't break while loading.
const educationHistory = computed(() => store.aboutMeData?.education || []);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Space+Mono&display=swap');

.education-section {
  background-color: #0A0A0A; 
  color: #FFFFFF;
  padding: 3rem 0; /* Drastically reduced from 6rem */
  font-family: 'Inter', sans-serif;
}

.container {
  max-width: 900px; /* Slightly narrower to fit the compact theme */
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* --- Section Header --- */
.section-header {
  margin-bottom: 2rem; /* Reduced from 4rem */
  text-align: left;
}

.section-title {
  font-size: 2.25rem; /* Shrunk title */
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
  font-size: 0.85rem; /* Shrunk subtitle */
  margin: 0;
}

/* --- Timeline Structure --- */
.timeline-container {
  position: relative;
  padding-left: 1.5rem; /* Tighter padding to the line */
}

.timeline-line {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #3E64FF, rgba(62, 100, 255, 0.1));
  border-radius: 2px;
}

.timeline-item {
  position: relative;
  margin-bottom: 1.5rem; /* Halved the margin between items */
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: -1.85rem; 
  top: 1.25rem; /* Aligned with the new card padding */
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #0A0A0A;
  border: 3px solid #3E64FF;
  box-shadow: 0 0 8px rgba(62, 100, 255, 0.5);
  z-index: 2;
}

/* --- Card Content --- */
.timeline-content {
  background-color: #111111;
  border: 1px solid #222222;
  border-radius: 8px;
  padding: 1.25rem; /* Reduced from 2rem */
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.timeline-content:hover {
  transform: translateX(4px); /* Switched to horizontal nudge for compact feel */
  border-color: #3E64FF;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Aligns items perfectly horizontally */
  margin-bottom: 0.75rem; /* Tighter gap */
  flex-wrap: wrap;
  gap: 0.5rem;
}

.institution-name {
  font-size: 1.15rem; /* Shrunk font */
  font-weight: 700;
  margin: 0;
  color: #FFFFFF;
}

.year-badge {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  background-color: rgba(62, 100, 255, 0.1);
  color: #5B7BFF;
  padding: 0.2rem 0.6rem;
  border-radius: 4px; /* Squared off badge slightly */
  border: 1px solid rgba(62, 100, 255, 0.2);
}

.degrees-list {
  display: flex;
  flex-direction: column;
  gap: 0.35rem; /* Extremely tight gap */
  margin-bottom: 0.75rem;
}

.degree-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem; /* Shrunk font */
  font-weight: 600;
  color: #E0E0E0;
}

.degree-icon {
  color: #3E64FF;
  flex-shrink: 0;
}

.details-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #222222;
}

.gpa-block, .honors-block {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
}

.label {
  color: #888888;
  margin-right: 0.25rem;
}

.value {
  color: #FFFFFF;
  font-weight: 700;
}

.description {
  color: #AAAAAA;
  line-height: 1.4; /* Tighter line height */
  margin: 0;
  font-size: 0.85rem; /* Shrunk font */
}

/* --- Mobile Responsiveness --- */
@media (max-width: 768px) {
  .education-section {
    padding: 2rem 0; /* Extremely tight mobile padding */
  }

  .section-title {
    font-size: 2rem;
  }

  .timeline-container {
    padding-left: 1.25rem;
  }

  .timeline-dot {
    left: -1.6rem;
    top: 1rem;
  }

  .timeline-content {
    padding: 1rem; /* Minimum comfortable padding */
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .details-row {
    flex-direction: row; /* Keep row on mobile if possible */
    gap: 1rem;
  }
}
</style>