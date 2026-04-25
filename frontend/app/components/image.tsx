export function Image({
  src,
  srcSet,
  css,
  sizes
}: {
  src: string;
  srcSet: string;
  css: string | "";
  sizes: string | "";
}) {
  return (
    <img
      src={src}
      srcSet={srcSet}
      className={`block ${css}`}
      sizes={sizes}
    ></img>
  );
}
