export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/*
        Safe Cinematic Page Reveal
        Instead of wrapping the page content (which breaks CSS 'fixed' positioning for the Navbar),
        we place a solid overlay on top of everything that slowly fades away.
        It is a pure CSS animation (.page-reveal in globals.css): it starts at first paint and does not
        wait for React to hydrate, which on a phone can take seconds.
      */}
      <div
        aria-hidden="true"
        className="page-reveal fixed inset-0 z-[99999] bg-[#090909] pointer-events-none"
      />
      {children}
    </>
  );
}
