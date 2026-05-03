<template>
  <section class="about-hero">
    <div class="container hero-container">
      <div class="hero-content">
        
        <div class="text-column">
          <h1 class="bio-title">Biography</h1>
          
          <div class="bio-body" :class="{ 'is-expanded': isExpanded }">
            <p>
              I am a passionate digital creator based in the beautiful city of Prague. With a strong foundation in both design principles and modern web development technologies, I strive to build thoughtful, user-centric experiences.
              
              <span class="read-more-wrapper" v-if="!isExpanded">
                <button @click="isExpanded = true" class="text-toggle-btn">Read more...</button>
              </span>
            </p>
            
            <p class="collapsible-text">
              My expertise spans the entire creative pipeline, from initial conceptualization and wireframing in Figma to implementing robust, responsive frontends using Vue.js and CSS. I am dedicated to continuous learning and enjoy exploring innovative solutions to complex digital challenges.
              
              <button @click="isExpanded = false" class="text-toggle-btn">Show less</button>
            </p>
          </div>

          <div class="contact-inquiries">
            <div class="inquiry-item">
              <div class="icon-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div class="inquiry-text">
                <a href="mailto:zhoover.nc@gmail.com">zhoover.nc@gmail.com</a>
                <a href="mailto:zrhoover@ncsu.edu">zrhoover@ncsu.edu</a>
              </div>
            </div>

            <div class="inquiry-item">
              <div class="icon-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div class="inquiry-text">
                <a href="tel:+19804391766">+1 (980) 439 1766</a>
              </div>
            </div>
          </div>

          <div class="bio-actions">
            <a href="/cv.pdf" class="btn-primary" download>Download CV</a>
            <a href="#contact" class="btn-secondary">Contact Me</a>
          </div>
        </div>

        <div class="image-column">
          <img 
            src="../../assets/HomePage/port.jpg" 
            alt="Zachary Hoover Hiking" 
            class="hero-photo"
          />
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isExpanded = ref(false);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');

.about-hero {
  background-color: #FFFFFF;
  padding: 3.5rem 0; 
  padding-bottom: 14vh;
  display: flex;
  height: 92vh;
  align-items: center; 
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 2rem;
  box-sizing: border-box;
}

.hero-content {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 4rem;
  align-items: center;
}

/* --- Text Column Styling --- */
.text-column {
  display: flex;
  flex-direction: column;
}

.bio-title {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 2.5rem;
  color: #111111;
  margin-top: 0;
  margin-bottom: 1.25rem;
}

.bio-body {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #444444;
  margin-bottom: 2.5rem;
}

.bio-body p {
  margin-top: 0;
  margin-bottom: 1rem;
}

/* Hide toggle buttons by default (Desktop) */
.text-toggle-btn {
  display: none; 
}

/* --- Contact Inquiries --- */
.contact-inquiries {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.inquiry-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon-circle {
  background-color: #222222;
  color: #FFFFFF;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.inquiry-text {
  display: flex;
  flex-direction: column;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  word-break: break-word; 
}

.inquiry-text a {
  color: #111111;
  text-decoration: none;
  transition: color 0.2s ease;
}

.inquiry-text a:hover {
  color: #3E64FF;
}

/* --- Action Buttons --- */
.bio-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap; 
}

.btn-primary {
  background-color: #5B7BFF;
  color: #FFFFFF;
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  text-align: center;
  display: inline-block;
}

.btn-primary:hover {
  background-color: #3E64FF;
  transform: translateY(-2px);
}

.btn-secondary {
  color: #5B7BFF;
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  transition: color 0.3s ease;
  display: inline-block;
}

.btn-secondary:hover {
  color: #3E64FF;
  text-decoration: underline;
}

/* --- Image Column Styling --- */
.image-column {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.hero-photo {
  width: 100%;
  max-width: 400px;
  height: auto;
  display: block;
  object-fit: cover;
  border: 3px solid #8B5CF6;
  border-radius: 4px;
}

/* --- Mobile Version Strict Overrides --- */
@media (max-width: 850px) {
  .about-hero {
    padding: 1rem 0; 
    height: auto; /* Lets the section grow naturally */
    min-height: 92vh;
    align-items: flex-start; /* Keeps it anchored to the top when expanding */
  }

  .hero-container {
    padding: 0 1.5rem;
  }

  .hero-content {
    grid-template-columns: 1fr; 
    gap: 0; 
  }

  .image-column {
    display: none; 
  }

  .bio-title {
    font-size: 2rem;
    margin-bottom: 1rem;
    margin-top: 0; 
  }

  .bio-body {
    font-size: 0.95rem;
    margin-bottom: 1rem;
  }

  /* --- Mobile Read More Logic --- */
  .collapsible-text {
    display: none; 
  }

  .is-expanded .collapsible-text {
    display: block; 
  }

  .text-toggle-btn {
    display: inline;
    background: transparent;
    border: none;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    font-weight: 700;
    padding: 0;
    margin-left: 4px;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 2px;
    opacity: 0.6;
  }

  .contact-inquiries {
    flex-direction: column; 
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .bio-actions {
    gap: 1.25rem;
  }
}

/* Extra small devices (phones) */
@media (max-width: 480px) {
  .btn-primary {
    width: 100%; 
    box-sizing: border-box;
  }
  
  .btn-secondary {
    width: 100%;
    text-align: center;
  }
}
</style>