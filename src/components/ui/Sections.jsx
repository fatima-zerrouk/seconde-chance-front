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
      className={`px-(--margin-mobile) md:px-(--margin-desktop) py-12 md:pb-16 ${className}`}
      {...props}
    >
      {/* props classique  */}
      <h2 className="title-h2 ">{title}</h2>
      <p className={`py-2 ${className}`}>{paragraph}</p>
      {/* children c'est une propriété pas du toto il passe du contenue html 
      à la difference de title qui passe que du texte avec les props*/}
      {children}
    </section>
  );
}

export function SectionAdmin({
  title,
  paragraph,
  children,
  className = '',
  ...props
}) {
  return (
    <section
      className={`px-(--margin-mobile) lg:px-(--margin-dashboard) pt-18 lg:pt-8 ${className}`}
      {...props}
    >
      <h1 className="title-h1 ">{title}</h1>
      <p className={`pt-2 pb-14  ${className}`}>{paragraph}</p>

      {children}
    </section>
  );
}
