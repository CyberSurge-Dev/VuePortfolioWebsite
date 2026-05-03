<template>
  <section class="contact-section">
    <div class="pattern-bg" aria-hidden="true">
      <div v-for="n in 8" :key="n" class="pattern-row">
        ZACHARY HOOVER ZACHARY HOOVER ZACHARY HOOVER
      </div>
    </div>

    <div class="container relative-z">
      <div class="glass-card">
        <div class="contact-grid">
          
          <div class="contact-info">
            <h2 class="contact-title">Let's Connect<span class="accent-white">.</span></h2>
            <p class="contact-text">
              Wanna reach out about a project, an opportunity, or just want to chat about engineering?
            </p>

            <div class="info-items">
              <div class="info-item">
                <div class="icon-circle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div class="details">
                  <span>Email</span>
                  <a href="mailto:zhoover.nc@gmail.com">zhoover.nc@gmail.com</a>
                  <a href="mailto:zrhoover@ncsu.edu">zrhoover@ncsu.edu</a>
                </div>
              </div>

              <div class="info-item">
                <div class="icon-circle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div class="details">
                  <span>Phone</span>
                  <a href="tel:+19804391766">+1 (980) 439 1766</a>
                </div>
              </div>
            </div>
          </div>

          <div class="contact-form-container">
            <form @submit.prevent="handleSubmit" class="contact-form">
              <div class="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Zachary Hoover" required />
              </div>
              
              <div class="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="name@example.com" required />
              </div>

              <div class="form-group">
                <label>Message</label>
                <textarea rows="4" placeholder="How can I help you?" required></textarea>
              </div>

              <button type="submit" class="submit-btn">
                Send Message
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const handleSubmit = () => {
  alert("Message sent! (Placeholder)");
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&family=Space+Mono&display=swap');

/* --- CRITICAL: Fixes the width overflow cutoff on mobile --- */
*, *::before, *::after {
  box-sizing: border-box;
}

.contact-section {
  background-color: #3E64FF;
  padding: 6rem 0;
  font-family: 'Inter', sans-serif;
  height: 92vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1060px;
  margin: 0 auto;
  padding: 0 1.5rem;
  width: 100%;
}

.relative-z { 
  position: relative; 
  z-index: 10; 
}

/* --- Background Pattern --- */
.pattern-bg {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  user-select: none;
  pointer-events: none;
  opacity: 0.06;
  z-index: 1;
}

.pattern-row {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 10vw;
  white-space: nowrap;
  line-height: 1.05;
  color: #FFFFFF;
  margin-left: -5vw;
}

.pattern-row:nth-child(even) { 
  margin-left: -15vw; 
}

/* --- Main Card --- */
.glass-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
}

/* --- Left Info Panel --- */
.contact-info {
  padding: 4rem;
  background: transparent;
  color: white;
  display: flex;
  flex-direction: column;
}

.contact-title {
  font-size: 2.75rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  letter-spacing: -1px;
}

.contact-text {
  font-size: 1.05rem;
  line-height: 1.6;
  opacity: 0.9;
  margin-bottom: 3.5rem;
}

.info-items {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  margin-top: auto;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
}

.icon-circle {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-circle svg { 
  width: 20px; 
}

.details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.details span {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.details a {
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.05rem;
  transition: opacity 0.2s ease;
}

.details a:hover {
  opacity: 0.8;
}

/* --- Right Form Panel --- */
.contact-form-container {
  padding: 4rem;
  background: #FAFAFA;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.8rem;
  font-weight: 700;
  color: #555;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input,
.form-group textarea {
  padding: 1rem 1.25rem;
  border: 1px solid #E5E7EB;
  background: #FFFFFF;
  border-radius: 12px;
  font-size: 1rem; 
  font-family: 'Inter', sans-serif;
  color: #111;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3E64FF;
  box-shadow: 0 0 0 4px rgba(62, 100, 255, 0.1);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #A1A1AA;
}

.submit-btn {
  background: #111111;
  color: white;
  border: none;
  padding: 1.1rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.2s ease;
  margin-top: 0.5rem;
}

.submit-btn svg {
  width: 18px;
  transition: transform 0.2s ease;
}

.submit-btn:hover {
  background: #3E64FF;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(62, 100, 255, 0.2);
}

.submit-btn:hover svg {
  transform: translateX(3px) translateY(-3px);
}

/* ===================================== */
/* MOBILE OVERRIDES (COMPACTED)          */
/* ===================================== */
@media (max-width: 768px) {


  .contact-section {
    padding: 1rem 0;
    min-height: 92vh; /* Dynamic height ensures it stays inside Safari/Chrome UI bars */
  }

  .container {
    padding: 0 1rem; /* Tighter margins on the sides */
  }

  .pattern-row {
    font-size: 25vw; 
  }

  .glass-card {
    border-radius: 16px;
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }

  /* Compacting the Top Blue Section */
  .contact-info {
    padding: 1.5rem 1.25rem 1.25rem;
    text-align: center;
  }

  .contact-title {
    font-size: 1.85rem;
    margin-bottom: 0.35rem;
  }

  .contact-text {
    font-size: 0.8rem;
    line-height: 1.4;
    margin-bottom: 0; 
  }

  .info-items {
    display: none !important;
  }

  /* Compacting the White Form Section */
  .contact-form-container {
    padding: 1.25rem 1.25rem 1.5rem;
  }

  .contact-form {
    gap: 0.85rem; /* Super tight form gaps */
  }

  .form-group {
    gap: 0.3rem;
  }

  .form-group label {
    font-size: 0.75rem;
  }

  .form-group input,
  .form-group textarea {
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
    /* Explicitly keeping 1rem font size here avoids iOS auto-zooming on tap */
  }

  .form-group textarea {
    min-height: 70px; /* Forces textarea to take up much less vertical real estate */
    height: 70px;
  }

  .submit-btn {
    padding: 0.85rem;
    margin-top: 0.25rem;
    font-size: 0.8rem;
  }
}
</style>