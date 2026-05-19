import React from 'react';

export function SectionTitle({
  title,
  paragraph,
  children,
  className = '',
  ...props
}) {
  return (
    <section
      className={`px-(--margin-mobile) md:px-(--margin-desktop) ${className}`}
      {...props}
    >
      <h1 className="title-h1">{title}</h1>
      <p className="">{paragraph}</p>

      <div> {children} </div>
    </section>
  );
}

export function SectionSubtitles({
  title,
  paragraph,
  children,
  className = '',
  ...props
}) {
  return (
    <section
      className={`px-(--margin-mobile) md:px-(--margin-desktop) ${className}`}
      {...props}
    >
      <h2 className="title-h2">{title}</h2>
      <p className="">{paragraph}</p>

      <div> {children} </div>
    </section>
  );
}
