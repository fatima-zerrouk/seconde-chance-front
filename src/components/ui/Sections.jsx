import React from 'react';

export function SectionSubtitles({
  title,
  paragraph,
  children,
  className = '',
  ...props
}) {
  return (
    <section
      className={`px-(--margin-mobile) md:px-(--margin-desktop) py-12 md:py-18 ${className}`}
      {...props}
    >
      {/* props classique  */}
      <h2 className="title-h2">{title}</h2>
      <p className={`py-1 ${className}`}>{paragraph}</p>
      {/* children c'est une propriété pas du toto il passe du contenue html 
      à la difference de title qui passe que du texte avec les props*/}
      {children}
    </section>
  );
}
