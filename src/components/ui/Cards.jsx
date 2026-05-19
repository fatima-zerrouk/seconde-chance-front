import React from 'react';

export function CardMission({ icon: Icon, title, text, className }) {
  return (
    <article
      className={`bg-cream rounded-(--radius-card) shadow-(--shadow-card) px-8 py-10  ${className}`}
    >
      <Icon className="text-terracotta text-4xl mb-4" />
      <h3 className="title-h3 py-2">{title}</h3>
      <p className="">{text}</p>
    </article>
  );
}
export function CardHow({ icon: Icon, title, text, className }) {
  return (
    <article
      className={`bg-cream rounded-(--radius-card) shadow-(--shadow-card) p-6  ${className}`}
    >
      <Icon className="text-brown text-6xl mb-4" />
      <h3 className="title-h3 py-2">{title}</h3>
      <p>{text}</p>
    </article>
  );
}
