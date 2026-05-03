<template>
  <NavBar />
  
  <div class="project-detail-view" v-if="projectMeta">
    
    <header class="hero-banner">
      <div 
        class="parallax-bg" 
        :style="{ transform: `translateY(${scrollY * 0.4}px)` }"
      >
        <transition-group name="fade">
          <img 
            v-for="(img, index) in projectMeta.coverImages" 
            :key="img" 
            :src="img" 
            v-show="index === currentSlide"
            class="slide-img" 
            :alt="projectMeta.name"
          />
        </transition-group>
        
        <div v-if="!projectMeta.coverImages || !projectMeta.coverImages.length" class="slide-img fallback-bg"></div>
      </div>

      <div class="hero-overlay">
        <div class="hero-content">
          <h1 class="title">{{ projectMeta.name }}</h1>
          <div class="tags" v-if="projectMeta.tags && projectMeta.tags.length">
            <span v-for="tag in projectMeta.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
          <div class="publish-date" v-if="formattedDate">
            {{ formattedDate }}
          </div>
        </div>
        
        <button class="share-btn" @click="shareProject" aria-label="Share Project">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
            <polyline points="16 6 12 2 8 6"></polyline>
            <line x1="12" y1="2" x2="12" y2="15"></line>
          </svg>
          <span class="mobile-share-text">Share Project</span>
        </button>
      </div>
    </header>

    <main class="article-wrapper">
      <div class="container main-layout" :class="{ 'is-centered': !hasSidebarContent }">
        
        <div class="content-left">
          <div v-if="isLoadingMarkdown" class="loading-state">Loading article...</div>
          <article v-else class="markdown-content" v-html="parsedMarkdown"></article>
        </div>

        <aside class="sidebar-right" v-if="hasSidebarContent">
          
          <div class="sidebar-block" v-if="repoDetails && repoDetails.length > 0">
            <h3 class="block-title">Repositories</h3>
            <div class="repo-list">
              <a 
                v-for="repo in repoDetails" 
                :key="repo.url" 
                :href="repo.url" 
                target="_blank" 
                class="repo-card"
              >
                <div class="repo-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </div>
                <div class="repo-info">
                  <span class="repo-name">{{ repo.name }}</span>
                  <div class="repo-meta">
                    <span class="repo-link-text">View Source</span>
                    <span v-if="repo.stars !== null" class="repo-stars">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800" stroke="none">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      {{ repo.stars }}
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div class="sidebar-block" v-if="projectMeta.otherLinks && projectMeta.otherLinks.length > 0">
            <h3 class="block-title">Other Links</h3>
            <div class="files-list">
              <a 
                v-for="link in projectMeta.otherLinks" 
                :key="link.url" 
                :href="link.url" 
                target="_blank" 
                class="file-card"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
                <span class="file-name">{{ link.name }}</span>
              </a>
            </div>
          </div>

          <div class="sidebar-block" v-if="projectMeta.files && projectMeta.files.length > 0">
            <h3 class="block-title">Downloads</h3>
            <div class="files-list">
              <a 
                v-for="file in projectMeta.files" 
                :key="file.name" 
                :href="file.url" 
                download 
                class="file-card"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                  <polyline points="13 2 13 9 20 9"></polyline>
                </svg>
                <span class="file-name">{{ file.name }}</span>
              </a>
            </div>
          </div>
          
        </aside>

      </div>
    </main>
  </div>
  
  <div v-else class="loading-screen">
    <h2>Loading Project...</h2>
  </div>

  <PageFooter />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { usePortfolioStore } from '@/stores/portfolio';
import { marked } from 'marked'; 
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; // Syntax highlighting theme

import NavBar from '@/components/NavBar.vue';
import PageFooter from '@/components/PageFooter.vue';

const route = useRoute();
const store = usePortfolioStore();

const folderName = route.params.id as string; 

const parsedMarkdown = ref('');
const isLoadingMarkdown = ref(true);

const currentSlide = ref(0);
const scrollY = ref(0);
let slideInterval: ReturnType<typeof setInterval> | null = null;

const repoDetails = ref<{ name: string; url: string; stars: number | null }[]>([]);

const projectMeta = computed(() => {
  return store.articlesList.find(article => article.folderName === folderName);
});

// Format the date based on the user's locale (e.g. "January 1, 2024")
const formattedDate = computed(() => {
  if (!projectMeta.value?.publishDate) return '';
  const date = new Date(projectMeta.value.publishDate);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
});

// Determine if the sidebar has any content to display
const hasSidebarContent = computed(() => {
  const hasRepos = repoDetails.value && repoDetails.value.length > 0;
  const hasLinks = projectMeta.value?.otherLinks && projectMeta.value.otherLinks.length > 0;
  const hasFiles = projectMeta.value?.files && projectMeta.value.files.length > 0;
  return hasRepos || hasLinks || hasFiles;
});

const handleScroll = () => {
  scrollY.value = window.scrollY;
};

const shareProject = () => {
  const url = window.location.href;
  if (navigator.share) {
    navigator.share({
      title: projectMeta.value?.name || 'Check out this project!',
      url: url
    }).catch(console.error);
  } else {
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  }
};

const fetchRepoStars = async () => {
  if (!projectMeta.value?.repositories) return;
  
  repoDetails.value = projectMeta.value.repositories.map(repo => ({
    name: repo.name,
    url: repo.url,
    stars: null
  }));

  repoDetails.value.forEach(async (repo, index) => {
    if (repo.url.includes('github.com')) {
      try {
        const urlObj = new URL(repo.url);
        const pathParts = urlObj.pathname.split('/').filter(Boolean);
        
        if (pathParts.length >= 2) {
          const owner = pathParts[0];
          const repoName = pathParts[1].replace(/\.git$/, '');
          
          const res = await fetch(`https://api.github.com/repos/${owner}/${repoName}`);
          
          if (res.ok) {
            const data = await res.json();
            repoDetails.value[index] = { 
              ...repoDetails.value[index], 
              stars: data.stargazers_count 
            };
          }
        }
      } catch (error) {
        console.warn(`[GitHub API] Failed to parse URL or fetch stars for ${repo.url}`, error);
      }
    }
  });
};

const setupSlideshow = () => {
  const images = projectMeta.value?.coverImages || [];
  if (images.length > 1) {
    slideInterval = setInterval(() => {
      currentSlide.value = (currentSlide.value + 1) % images.length;
    }, 4500);
  }
};

// Inject Copy Buttons, Highlighting, and Code Headers into the DOM
const addCopyButtons = () => {
  const container = document.querySelector('.markdown-content');
  if (!container) return;

  const blocks = container.querySelectorAll('pre, blockquote');
  
  // SVG Icons
  const copyIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
  const checkIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

  blocks.forEach((block) => {
    // Prevent adding duplicates
    if (block.querySelector('.copy-btn') || block.parentElement?.classList.contains('code-wrapper')) return;

    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.setAttribute('aria-label', 'Copy to clipboard');
    btn.innerHTML = copyIcon;

    // Copy functionality
    btn.addEventListener('click', async () => {
      let textToCopy = '';
      const codeElement = block.querySelector('code');
      
      if (codeElement) {
        textToCopy = codeElement.innerText;
      } else {
        const clone = block.cloneNode(true) as HTMLElement;
        const btnToRemove = clone.querySelector('.copy-btn');
        if (btnToRemove) btnToRemove.remove();
        textToCopy = clone.innerText || clone.textContent || '';
      }

      try {
        await navigator.clipboard.writeText(textToCopy.trim());
        btn.innerHTML = checkIcon;
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerHTML = copyIcon;
          btn.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    });

    // --- CODE BLOCKS (Header & Syntax Highlighting Style) ---
    if (block.tagName.toLowerCase() === 'pre') {
      const wrapper = document.createElement('div');
      wrapper.className = 'code-wrapper';

      const header = document.createElement('div');
      header.className = 'code-header';

      const codeElement = block.querySelector('code');
      let langText = '';

      if (codeElement) {
        // Highlight code & auto-detect language if marked didn't tag it
        hljs.highlightElement(codeElement);
        
        // Extract language name (from marked's class or hljs's detection)
        const match = codeElement.className.match(/language-(\w+)/);
        if (match) langText = match[1];
      }

      const langSpan = document.createElement('span');
      langSpan.className = 'code-lang';
      langSpan.innerText = langText; 

      // Assemble the header (Copy on the Left, Language beside it)
      header.appendChild(langSpan); 
      header.appendChild(btn); 

      // Wrap the <pre> block
      block.parentNode?.insertBefore(wrapper, block);
      wrapper.appendChild(header);
      wrapper.appendChild(block);
    } 
    // --- BLOCKQUOTES (Floating Button Style) ---
    else {
      block.appendChild(btn);
    }
  });
};

const loadContent = async () => {
  isLoadingMarkdown.value = true;
  const rawMarkdown = await store.fetchArticleMarkdown(folderName);
  parsedMarkdown.value = await marked.parse(rawMarkdown);
  isLoadingMarkdown.value = false;
  
  fetchRepoStars();
  setupSlideshow();

  // Wait for Vue to render the v-html to the DOM, then add the copy buttons & highlights
  await nextTick();
  addCopyButtons();
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  if (projectMeta.value) {
    loadContent();
  } else if (!store.isLoading) {
    store.fetchRootData();
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  if (slideInterval) clearInterval(slideInterval);
});

watch(projectMeta, (newMeta) => {
  if (newMeta && isLoadingMarkdown.value) {
    loadContent();
  }
});
</script>

<style scoped>
/* Force box-sizing globally within this view */
.project-detail-view *,
.project-detail-view *::before,
.project-detail-view *::after {
  box-sizing: border-box;
}

.project-detail-view {
  background-color: #FFFFFF; 
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  overflow-x: hidden; 
  width: 100%;
}

/* --- Hero Banner & Parallax --- */
.hero-banner {
  position: relative;
  height: 50vh;
  min-height: 400px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  background-color: #1A1A1A; 
}

.parallax-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120%;
  z-index: 0;
  will-change: transform;
}

.slide-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0.5) 100%);
  -webkit-mask-image: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 100%);
}

.fallback-bg {
  background: linear-gradient(135deg, #3E64FF 0%, #1A2B7C 100%);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1.5s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* --- Hero Overlay Content --- */
.hero-overlay {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 2.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2rem;
}

.hero-content {
  color: #FFFFFF;
  width: 100%;
}

.title {
  font-size: clamp(2rem, 4vw, 3.5rem); 
  font-weight: 800;
  margin: 0;
  line-height: 1.1;
  text-shadow: 0 2px 8px rgba(0,0,0,0.7);
  letter-spacing: -0.5px;
}

.publish-date {
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
  color: #E2E8F0;
  margin-top: 0.75rem;
  opacity: 0.9;
  text-shadow: 0 1px 4px rgba(0,0,0,0.5);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.tag {
  background-color: rgba(62, 100, 255, 0.15);
  color: #B1C2FF; 
  border: 1px solid rgba(62, 100, 255, 0.4);
  padding: 0.35rem 0.85rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  font-family: 'Space Mono', monospace;
  text-transform: uppercase;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.share-btn {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.mobile-share-text {
  display: none; 
}

.share-btn:hover {
  background: #3E64FF;
  border-color: #3E64FF;
  transform: scale(1.05);
}

/* --- Main Layout Grid --- */
.article-wrapper {
  background-color: #FFFFFF; 
  position: relative;
  z-index: 20;
  width: 100%;
}

.main-layout {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 3rem;
  align-items: start;
  width: 100%;
}

/* Modifier when Sidebar is Empty */
.main-layout.is-centered {
  grid-template-columns: minmax(0, 1fr);
  max-width: 900px; /* Constrains text width for readability */
}

.content-left {
  min-width: 0; 
  width: 100%;
}

/* --- Sidebar Styling --- */
.sidebar-right {
  min-width: 0;
  width: 100%;
}

.sidebar-block {
  margin-bottom: 1.75rem;
  width: 100%;
}

.block-title {
  color: #111111;
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 0.75rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #F0F0F0;
  font-family: 'Inter', sans-serif;
}

/* Redesigned Repo Cards */
.repo-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.repo-card {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #FFFFFF;
  border: 1px solid #EAEAEA;
  border-left: 4px solid #3E64FF; 
  padding: 1rem;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
  width: 100%; 
}

.repo-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.08);
  border-color: #D0D0D0;
}

.repo-icon {
  color: #3E64FF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.repo-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0; 
}

.repo-name {
  color: #111111;
  font-weight: 600;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.25rem;
  width: 100%;
}

.repo-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  width: 100%;
}

.repo-link-text {
  color: #888888;
}

.repo-stars {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #555555;
  font-weight: 600;
  flex-shrink: 0;
}

/* Redesigned Files & General Links */
.files-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.file-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  background: #F8F9FA;
  border: 1px solid #EAEAEA;
  border-radius: 8px;
  color: #333333;
  text-decoration: none;
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  width: 100%;
}

.file-card svg {
  color: #3E64FF;
  flex-shrink: 0;
}

.file-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}

.file-card:hover {
  background: #F0F4FF;
  border-color: #3E64FF;
  color: #3E64FF;
}

.loading-screen, .loading-state {
  text-align: center;
  padding: 5rem;
  font-family: 'Space Mono', monospace;
  color: #888;
}

/* --- Responsive Adjustments --- */
@media (max-width: 992px) {
  .main-layout {
    grid-template-columns: minmax(0, 1fr);
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .hero-banner {
    height: 40vh;
  }
  
  .hero-overlay {
    flex-direction: column;
    align-items: flex-start;
    padding: 0 1.25rem 2rem 1.25rem; 
  }

  .share-btn {
    width: 100%;
    height: 48px;
    border-radius: 8px;
    margin-top: 1rem;
    background: rgba(30, 30, 30, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.15);
  }

  .share-btn:hover {
    transform: none; 
  }

  .mobile-share-text {
    display: inline-block;
    margin-left: 0.5rem;
    font-family: 'Space Mono', monospace;
    font-size: 0.9rem;
    font-weight: 600;
  }

  .main-layout {
    padding: 2.5rem 1.25rem; 
  }
}
</style>

<style>
.markdown-content {
  line-height: 1.7;
  font-size: 1rem;
  color: #333333; 
  overflow-wrap: break-word;
  word-wrap: break-word;
}

.markdown-content h1, 
.markdown-content h2, 
.markdown-content h3 {
  color: #111111; 
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.markdown-content p {
  margin-bottom: 1.5rem;
}

.markdown-content a {
  color: #3E64FF;
  text-decoration: none;
  border-bottom: 1px dotted #3E64FF;
  transition: all 0.2s ease;
}

.markdown-content a:hover {
  border-bottom-style: solid;
  background: rgba(62, 100, 255, 0.05);
}

.markdown-content img {
  max-width: 100%;
  border-radius: 8px;
  margin: 2rem 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.markdown-content ul, .markdown-content ol {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

.markdown-content li {
  margin-bottom: 0.5rem;
}

/* --- Inline Code --- */
.markdown-content code {
  font-family: 'Space Mono', monospace;
  background-color: #F0F0F0;
  color: #D63384; 
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.85em;
}

/* --- Code Blocks & Headers --- */
.code-wrapper {
  background-color: #1A1A1A; /* Keeps main block dark */
  border-radius: 8px;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden; 
}

.code-header {
  display: flex;
  justify-content: flex-start; /* Aligns contents left */
  align-items: center;
  gap: 0.75rem; /* Spacing between copy button and language text */
  background-color: #2D2D2D; 
  padding: 0.4rem 1rem;
  border-bottom: 1px solid #404040;
}

.code-lang {
  color: #888888;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.markdown-content pre {
  margin: 0; 
  padding: 1.25rem 1rem;
  overflow-x: auto;
  max-width: 100%; 
  background-color: transparent; 
}

/* Keep the code background transparent so the wrapper dictacts the dark look */
.markdown-content pre code.hljs {
  background-color: transparent;
  padding: 0;
  color: #E0E0E0; 
  font-size: 0.85em;
}

/* --- Blockquotes --- */
.markdown-content blockquote {
  position: relative;
  border-left: 4px solid #3E64FF;
  margin: 1rem 0; 
  padding: 1rem 1.5rem; 
  color: #555555;
  font-style: italic;
  line-height: 1.6; 
  background: #F8F9FA; 
  border-radius: 0 8px 8px 0;
  display: block; 
}

/* --- General Copy Button Styles --- */
.copy-btn {
  background: transparent;
  border: none;
  color: #888888;
  cursor: pointer;
  display: flex;
  align-self: flex-end;
  margin-left: auto;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.copy-btn:hover {
  color: #FFFFFF;
  background: rgba(255, 255, 255, 0.1);
}

.copy-btn.copied {
  color: #10B981;
}

/* Blockquote specific floating copy button */
.markdown-content blockquote .copy-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  color: #888888;
  background: rgba(0, 0, 0, 0.05);
  opacity: 0;
}

.markdown-content blockquote:hover .copy-btn,
.markdown-content blockquote .copy-btn:focus {
  opacity: 1;
}

.markdown-content blockquote .copy-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #3E64FF;
}

@media (hover: none) {
  .markdown-content blockquote .copy-btn {
    opacity: 1;
  }
}
</style>