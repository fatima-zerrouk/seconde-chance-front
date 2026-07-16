export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  lazy = true,
  className = '',
  fetchPriority,
}) {
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={lazy ? 'lazy' : 'eager'}
        className={className}
        fetchPriority={fetchPriority}
      />
    </picture>
  );
}
