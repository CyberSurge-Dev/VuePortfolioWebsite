import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ContactView from '@/views/ContactView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import ProjectDetailsView from '@/views/ProjectDetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },

    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
    },
    {
      // The ':id' matches the route.params.id we used in the component!
      path: '/projects/:id', 
      name: 'ProjectDetail',
      // Adjust this path to wherever you saved the Article Detail page
      component: ProjectDetailsView,
      
      // Optional: This ensures the page always starts at the top when navigating
      beforeEnter: (to, from, next) => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        next();
      }
    }
  ],
})

export default router
