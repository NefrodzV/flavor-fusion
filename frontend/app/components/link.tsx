export function Link({
  text,
  to,
  css
}: {
  text: string;
  to: string;
  css?: string;
}) {
  return (
    <a href={to} className={css}>
      {text}
    </a>
  );
}
