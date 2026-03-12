import { useEffect } from "react";

interface SeoOptions {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
}

const BASE_URL = "https://mihrab.app";
const SITE_NAME = "محراب";

export function useSeo({ title, description, keywords, canonicalPath }: SeoOptions) {
  useEffect(() => {
    // Update title
    const fullTitle = `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    // Update or create meta description
    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    // Update or create meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.name = "keywords";
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = keywords;
    }

    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
    if (ogTitle) ogTitle.content = fullTitle;

    const ogDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
    if (ogDesc) ogDesc.content = description;

    const ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement;
    if (ogUrl && canonicalPath) ogUrl.content = `${BASE_URL}${canonicalPath}`;

    // Update Twitter tags
    const twTitle = document.querySelector('meta[name="twitter:title"]') as HTMLMetaElement;
    if (twTitle) twTitle.content = fullTitle;

    const twDesc = document.querySelector('meta[name="twitter:description"]') as HTMLMetaElement;
    if (twDesc) twDesc.content = description;

    // Update canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonical && canonicalPath) {
      canonical.href = `${BASE_URL}${canonicalPath}`;
    }

    // Cleanup: restore defaults when component unmounts
    return () => {
      document.title = "محراب - مواقيت الصلاة، الأحاديث، أسعار الذهب، والأذكار | mihrab.app";
    };
  }, [title, description, keywords, canonicalPath]);
}
