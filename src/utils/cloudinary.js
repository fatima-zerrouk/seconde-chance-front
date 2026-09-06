const DEFAULT_FALLBACK_IMAGE =
  'https://cdn.phototourl.com/free/2026-07-16-68b65eb2-6d21-4c71-a9a7-4e251506c9b1.png';

export const optimizeCloudinaryUrl = (url, width = 'auto') => {
  if (!url) return DEFAULT_FALLBACK_IMAGE;

  if (url.includes('cloudinary.com')) {
    return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width},c_scale/`);
  }

  return url;
};
