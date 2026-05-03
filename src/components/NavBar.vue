<template>
  <header class="navbar">
    <div class="logo">
      <a href="/"><img src="../assets/NewLogo.png" alt="LOGO"/></a>
    </div>

    <nav class="nav-links desktop-only">
      <a href="/" :class="{ active: isActive('/') }">HOME</a>
      <a href="/about" :class="{ active: isActive('/about') }">ABOUT</a>
      <a href="/projects" :class="{ active: isActive('/projects') }">PROJECTS</a>
      <a href="/contact" :class="{ active: isActive('/contact') }">CONTACT</a>
      </nav>

    <button
      class="mobile-menu-btn"
      @click="toggleMenu"
      aria-label="Toggle Navigation"
    >
      <svg
        v-if="!isMobileMenuOpen"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>

      <svg
        v-else
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>

    <div class="mobile-menu" :class="{ 'is-open': isMobileMenuOpen }">
      <nav class="mobile-nav-links">
        <a href="/" :class="{ active: isActive('/') }" @click="toggleMenu">
          HOME
        </a>

        <a
          href="/about"
          :class="{ active: isActive('/about') }"
          @click="toggleMenu"
        >
          ABOUT
        </a>

        <a
          href="/projects"
          :class="{ active: isActive('/projects') }"
          @click="toggleMenu"
        >
          PROJECTS
        </a>
        <a
          href="/contact"
          :class="{ active: isActive('/contact') }"
          @click="toggleMenu"
        >
          CONTACT
        </a>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isMobileMenuOpen = ref(false);

const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const isActive = (path: string) => {
  // If checking the home route, require an exact match
  if (path === '/') {
    return window.location.pathname === '/';
  }
  
  // For other routes (like /projects), check if the current URL starts with that path
  return window.location.pathname.startsWith(path);
};
</script>

<style scoped>
/* ---------- Navbar ---------- */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem;
  background: #ffffff;
  color: #222;
  font-family: "Inter", sans-serif;
  position: relative;
  z-index: 100;
}

/* ---------- Logo ---------- */
.logo {
  z-index: 101;
}

.logo img {
  height: 34px;
  display: block !important;
}

/* ---------- Desktop Nav ---------- */
.nav-links {
  display: flex;
  align-items: center;
  gap: 2.3rem;
  font-size: 0.95rem;
  font-weight: 600;
}

.nav-links a,
.mobile-nav-links a {
  text-decoration: none;
  color: #222;
  transition: 0.25s ease;
}

.nav-links a:hover,
.mobile-nav-links a:hover {
  color: #3e64ff;
}

.nav-links a.active,
.mobile-nav-links a.active {
  color: #3e64ff;
  text-decoration: underline;
  text-underline-offset: 4px;
}

/* ---------- Social Icons ---------- */
.social-icons {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 1rem;
}

.social-icons a {
  color: #222;
  font-size: 1.2rem;
  transition: 0.25s ease;
}

.social-icons a:hover {
  color: #3e64ff;
  transform: translateY(-2px);
}

/* ---------- Mobile Button ---------- */
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: #222;
  cursor: pointer;
  padding: 0;
  z-index: 101;
}

/* ---------- Mobile Menu ---------- */
.mobile-menu {
  display: none;
}

/* ---------- Responsive ---------- */
@media (max-width: 992px) {
  .navbar {
    padding: 1.15rem 1.5rem;
  }

  .desktop-only {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
  }

  .mobile-menu {
    display: flex;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: #ffffff;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.08);
    padding: 2rem;

    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: 0.3s ease;
  }

  .mobile-menu.is-open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .mobile-nav-links {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 1.6rem;
    font-size: 1.15rem;
    font-weight: 600;
  }

  .mobile-social {
    margin-top: 1rem;
    padding-top: 1.4rem;
    border-top: 1px solid #eee;
    width: 100%;
    justify-content: center;
  }
}
</style>