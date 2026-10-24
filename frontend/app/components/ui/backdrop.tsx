export function Backdrop({ onClick }: { onClick(): void }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 z-5 md:hidden"
      onClick={onClick}
    ></div>
  );
}
