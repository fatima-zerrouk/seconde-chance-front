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

export function CardContact({
  icon: Icon,
  title,
  link,
  className,
  ariaLabel,
  text,
  target,
}) {
  return (
    <li
      className={`flex flex-row items-center gap-4 bg-[#DD9B87] text rounded-(--radius-card) shadow-(--shadow-card) p-6  ${className}`}
    >
      <Icon
        aria-label={ariaLabel}
        className="text-brown  bg-[#E4AF9F] w-auto h-auto text-3xl p-2 rounded-xl"
      />
      <div className="w-full lg:w-44">
        <h3 className="font-semibold">{title}</h3>
        <a
          href={link}
          target={target}
          className="inline-block transition-transform duration-300 hover:translate-x-4"
        >
          {text}
        </a>
      </div>
    </li>
  );
}

export function CardRules({ title, text, items = [], className = '' }) {
  return (
    <section
      className={`bg-cream p-6 text-left rounded-(--radius-card) my-8 w-full md:w-220 ${className}`}
    >
      <h3 className="title-h3 mb-4">{title}</h3>
      <p className="items-center mb-4">{text}</p>

      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-[#AC5439] text-xl leading-none font-bold">
              •
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
