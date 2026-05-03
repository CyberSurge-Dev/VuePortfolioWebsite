<template>
  <footer class="footer-wrapper">
    <div class="footer-container">
      
      <div v-if="!isMobile" class="desktop-footer">
        <div class="footer-top">
          <h2 class="connect-heading">Let’s Connect<span class="accent-dot">.</span></h2>
          <a href="/contact" class="primary-btn">
            Contact Me
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>

        <div class="footer-divider"></div>

        <div class="footer-main">
          <div class="footer-col">
            <h4 class="col-title">Inquiries</h4>
            <a href="mailto:zhoover.nc@gmail.com" class="footer-link contact-detail">zhoover.nc@gmail.com</a>
            <a href="mailto:zrhoover@ncsu.edu" class="footer-link contact-detail">zrhoover@ncsu.edu</a>
            <a href="tel:+9804391766" class="footer-link contact-detail">+1 (980) 439-1766</a>
          </div>
          <div class="footer-col">
            <h4 class="col-title">Explore</h4>
            <a href="/about" class="footer-link">About Me</a>
            <a href="/projects" class="footer-link">Projects</a>
          </div>
          <div class="footer-col">
            <h4 class="col-title">Socials</h4>
            <div class="social-icons">
              <a href="https://www.linkedin.com/in/zacharyhoover1/" class="social-btn" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="https://github.com/CyberSurge-Dev" class="social-btn" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a href="https://www.instagram.com/zacharyh0over/" class="social-btn" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; {{ currentYear }} Zachary Hoover. All rights reserved.</p>
          <div class="made-with-wrapper">
            <span>Made with</span>
            <svg viewBox="0 0 244.1 212.7" width="14" height="14" aria-label="Vue.js">
              <path fill="#41B883" d="M122.1 212.7L0 0h48.9l73.2 126.5L195.1 0h48.9z"/>
              <path fill="#35495E" d="M122.1 126.5L73.2 41.4 100.8 0h42.6l27.6 41.4z"/>
            </svg>
            <span>Vue</span>
          </div>
        </div>
      </div>

      <div v-else class="mobile-footer">
        
        <h2 class="connect-heading mobile-centered" style="flex-direction: row; margin: auto;">Let's Connect<span class="accent-dot">.</span></h2>
        
        <div class="mobile-contact-me-wrapper mobile-centered">
          <a href="/contact" class="mobile-contact-me">
            CONTACT ME
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </a>
        </div>

        <div class="mobile-social-icons mobile-centered">
          <a href="https://www.linkedin.com/in/zacharyhoover1/" class="social-btn mobile-social-btn" aria-label="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a href="https://github.com/CyberSurge-Dev" class="social-btn mobile-social-btn" aria-label="GitHub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
          <a href="https://www.instagram.com/zacharyh0over/" class="social-btn mobile-social-btn" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
        </div>

        <div class="mobile-inquiries-section mobile-centered">
          <h4 class="mobile-col-title">INQUIRIES</h4>
          <a href="mailto:zhoover.nc@gmail.com" class="mobile-footer-link">zhoover.nc@gmail.com</a>
          <a href="mailto:zrhoover@ncsu.com" class="mobile-footer-link">zrhoover@ncsu.com</a>
          <p class="mobile-footer-link mobile-phone">+1 (980) 439-1766</p>
        </div>

        <div class="mobile-bottom mobile-centered">
          <p class="mobile-copyright">&copy; {{ currentYear }} Zachary Hoover. All rights reserved.</p>
          <div class="made-with-wrapper">
            <span>Made with</span>
            <svg viewBox="0 0 244.1 212.7" width="14" height="14" aria-label="Vue.js">
              <path fill="#41B883" d="M122.1 212.7L0 0h48.9l73.2 126.5L195.1 0h48.9z"/>
              <path fill="#35495E" d="M122.1 126.5L73.2 41.4 100.8 0h42.6l27.6 41.4z"/>
            </svg>
            <span>Vue</span>
          </div>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';

// --- Screen Detection Logic ---
const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768; 
};

onMounted(() => {
  checkMobile(); 
  window.addEventListener('resize', checkMobile); 
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile); 
});

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Space+Mono&display=swap');

/* --- General Wrapper --- */
.footer-wrapper {
  background-color: #111111;
  color: #FFFFFF;
  padding: 3rem 1.5rem 1.5rem 1.5rem; /* Restored compact desktop padding */
  border-top: 4px solid #3E64FF;
  font-family: 'Inter', sans-serif;
  display: flex;
  justify-content: center;
}

.footer-container {
  width: 100%;
  max-width: 1200px;
}

/* --- Shared Desktop styles --- */
.connect-heading {
  font-size: 3rem; /* Scaled down for compactness */
  font-weight: 800;
  margin: 0;
  letter-spacing: -1px;
}

.accent-dot {
  color: #3E64FF;
}

.primary-btn {
  background-color: #3E64FF;
  color: #FFFFFF;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 8px 15px -5px rgba(62, 100, 255, 0.4);
}

.primary-btn:hover {
  background-color: #FFFFFF;
  color: #3E64FF;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px -5px rgba(255, 255, 255, 0.2);
}

.social-btn {
  color: rgba(255, 255, 255, 0.7);
  background-color: rgba(255, 255, 255, 0.05);
  padding: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.social-btn:hover {
  color: #FFFFFF;
  background-color: #3E64FF;
  transform: translateY(-2px);
}

.made-with-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
}

/* --- Desktop Specific Layout Styles --- */
.desktop-footer .footer-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem; /* Restored compact gap */
}

.desktop-footer .footer-divider {
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem; /* Restored compact gap */
}

.desktop-footer .footer-main {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem; /* Restored compact gap */
  margin-bottom: 2rem;
}

.desktop-footer .footer-col {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.desktop-footer .col-title {
  color: #3E64FF;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin: 0 0 0.25rem 0;
  font-weight: 600;
}

.desktop-footer .footer-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-family: 'Space Mono', monospace;
  font-size: 0.95rem;
  transition: color 0.3s ease, padding-left 0.3s ease;
  width: fit-content;
}

.desktop-footer .footer-link:hover {
  color: #FFFFFF;
  padding-left: 5px;
}

.desktop-footer .social-icons {
  display: flex;
  gap: 1rem;
}

.desktop-footer .footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 1.5rem; /* Restored compact gap */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.desktop-footer .footer-bottom p {
  margin: 0;
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
}

/* --- Mobile Specific Layout Styles --- */
.mobile-footer {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.mobile-centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.mobile-footer .connect-heading {
  font-size: 2.25rem; /* Shrunk from 3.2rem */
  margin-bottom: 0.5rem; /* Reduced gap */
}

.mobile-contact-me-wrapper {
  margin-bottom: 1.5rem;
}

.mobile-contact-me {
  color: #3E64FF;
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-weight: 800; /* Matched previous compact button weight */
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 6px;
  letter-spacing: 1px;
}

.mobile-social-icons {
  flex-direction: row; 
  gap: 1rem; /* Tighter gap */
  justify-content: center; 
  margin-bottom: 1.5rem; /* Tighter margin */
}

.mobile-social-btn {
  padding: 8px; /* Tighter padding */
}

.mobile-inquiries-section {
  margin-bottom: 1.5rem; /* Tighter margin */
  gap: 0.25rem;
}

.mobile-col-title {
  color: #3E64FF;
  font-size: 0.8rem;
  letter-spacing: 1.5px;
  margin: 0 0 0.5rem 0;
  font-weight: 600;
}

.mobile-footer-link {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-family: 'Space Mono', monospace;
  font-size: 0.85rem;
  margin: 0;
}

.mobile-phone {
  margin-top: 0.25rem;
}

.mobile-bottom {
  gap: 0.75rem; /* Tighter gap */
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.mobile-copyright {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

/* Adjust outer wrapper padding just for mobile */
@media (max-width: 768px) {
  .footer-wrapper {
    padding: 2rem 1rem 1rem 1rem;
  }
}
</style>