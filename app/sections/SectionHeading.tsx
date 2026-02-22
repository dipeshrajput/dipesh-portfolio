type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-10">
      <p className="section-eyebrow mb-3 text-xs font-semibold uppercase tracking-[0.28em]">
        {eyebrow}
      </p>
      <h2 className="tone-heading font-heading text-3xl font-bold sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="tone-body mt-4 max-w-3xl text-sm leading-7 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
