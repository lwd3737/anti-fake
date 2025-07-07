export default function ArchiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full">
      <header className="py-8 font-bold text-2xl text-center">아카이브</header>
      <main className="flex-1 px-8 overflow-y-auto">{children}</main>
    </div>
  );
}
