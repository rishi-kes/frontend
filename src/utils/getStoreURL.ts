// 🧠 getStoreURL.ts — smart subdomain → local URL generator
export const getStoreURL = (storeDomain?: string): string => {
  if (!storeDomain) return "http://localhost:5173/demo";

  // 🧹 Clean the domain (remove protocols, trailing slashes, duplicates)
  const cleanDomain = storeDomain
    .replace(/^https?:\/\//, "") // remove http:// or https://
    .replace(/\.localhost:5173$/, "") // remove extra .localhost:5173
    .replace(/\/$/, "") // remove trailing slash
    .trim();

  // 🧠 Build final URL
  return `http://${cleanDomain}.localhost:5173`;
};
