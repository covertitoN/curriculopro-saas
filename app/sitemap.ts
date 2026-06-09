import { MetadataRoute } from "next"
const BASE = process.env.NEXT_PUBLIC_APP_URL || "https://curriculopro.com.br"
const posts = ["como-otimizar-curriculo-ats","palavras-chave-curriculo-por-area","ia-otimizar-curriculo-entrevistas","curriculo-desenvolvedor-2026","curriculo-analista-dados"]
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/privacidade`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/termos`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    ...posts.map(s => ({ url: `${BASE}/blog/${s}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 })),
  ]
}
