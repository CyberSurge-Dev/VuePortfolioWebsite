import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { AboutMeData, MetaArticles, ArticleMeta, LinkItem } from '@/types/portfolio';

export const usePortfolioStore = defineStore('portfolio', () => {
  const aboutMeData = ref<AboutMeData | null>(null);
  const metaArticles = ref<MetaArticles | null>(null);
  const articlesList = ref<ArticleMeta[]>([]);
  const isLoading = ref<boolean>(false);
  const markdownCache = ref<Record<string, string>>({});

  const GITHUB_OWNER = 'CyberSurge-Dev'; 
  const GITHUB_REPO = 'WebsiteData';               
  const BRANCH = 'main'; 
  
  const RAW_BASE_URL = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${BRANCH}`;
  const API_BASE_URL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents`;

  const fetchRootData = async (): Promise<void> => {
    isLoading.value = true;
    try {
      const [aboutRes, metaRes] = await Promise.all([
        fetch(`${RAW_BASE_URL}/AboutMeData.json`),
        fetch(`${RAW_BASE_URL}/MetaArticles.json`)
      ]);

      if (!aboutRes.ok || !metaRes.ok) throw new Error("Failed to fetch root JSON files");

      aboutMeData.value = (await aboutRes.json()) as AboutMeData;
      metaArticles.value = (await metaRes.json()) as MetaArticles;

      await fetchArticles();
    } catch (error) {
      console.error("Failed to load portfolio data:", error);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchArticles = async (): Promise<void> => {
    try {
      const dirResponse = await fetch(API_BASE_URL);
      if (!dirResponse.ok) throw new Error("Failed to fetch directory from GitHub API");
      
      const directoryContents: Array<{ name: string; type: string }> = await dirResponse.json();
      const articleFolders = directoryContents.filter(item => item.type === 'dir');

      const fetchPromises = articleFolders.map(async (folder) => {
        // 1. Fetch meta.json
        const metaRes = await fetch(`${RAW_BASE_URL}/${folder.name}/meta.json`);
        if (!metaRes.ok) return null; 
        const metaData = await metaRes.json();
        
        // 2. Fetch cover images
        let coverImages: string[] = [];
        try {
          const coversRes = await fetch(`${API_BASE_URL}/${folder.name}/covers`);
          if (coversRes.ok) {
            const coversContents: Array<{ name: string; type: string }> = await coversRes.json();
            coverImages = coversContents
              .filter(item => item.type === 'file')
              .map(file => `${RAW_BASE_URL}/${folder.name}/covers/${file.name}`);
          }
        } catch (e) {
          /* Ignore error if folder doesn't exist */
        }

        // 3. Fetch misc downloadable files
        let files: LinkItem[] = [];
        try {
          const filesRes = await fetch(`${API_BASE_URL}/${folder.name}/files`);
          if (filesRes.ok) {
            const filesContents: Array<{ name: string; type: string }> = await filesRes.json();
            files = filesContents
              .filter(item => item.type === 'file')
              .map(file => ({
                name: file.name,
                url: `${RAW_BASE_URL}/${folder.name}/files/${file.name}`
              }));
          }
        } catch (e) {
           /* Ignore error if 'files' folder doesn't exist */
        }

        // 4. Return merged object
        return { 
          ...metaData, 
          folderName: folder.name,
          coverImages,
          files // <-- Inject our dynamically found files array
        } as ArticleMeta;
      });

      const resolvedArticles = await Promise.all(fetchPromises);
      articlesList.value = resolvedArticles.filter((article): article is ArticleMeta => article !== null);
      
    } catch (error) {
      console.error("Failed to fetch articles from directories:", error);
    }
  };

  const fetchArticleMarkdown = async (folderName: string): Promise<string> => {
  // If we already downloaded this article, return it instantly from the stash!
  if (markdownCache.value[folderName]) {
    return markdownCache.value[folderName];
  }

  try {
    const res = await fetch(`${RAW_BASE_URL}/${folderName}/article.md`);
    if (!res.ok) throw new Error("Markdown file not found");
    
    const markdownText = await res.text();
    
    // Save it to the stash for next time before returning
    markdownCache.value[folderName] = markdownText;
    return markdownText;
    
  } catch (error) {
    console.error(`Failed to load article.md for ${folderName}:`, error);
    return "## Error loading article content.";
  }
};

  return {
    aboutMeData,
    metaArticles,
    articlesList,
    isLoading,
    fetchRootData,
    fetchArticleMarkdown
  };
});