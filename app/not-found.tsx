import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[80svh] flex-col items-center justify-center px-5 text-center">
      <p className="eyebrow mb-5">Page Not Found</p>
      <h1 className="font-display text-5xl font-medium text-cream sm:text-7xl">
        This address doesn&apos;t <span className="italic text-gold-bright">exist.</span>
      </h1>
      <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-dim">
        The page you&apos;re looking for has moved, sold, or never came to market. The portfolio,
        however, is very much available.
      </p>
      <div className="mt-9 flex gap-4">
        <Button href="/">Back Home</Button>
        <Button href="/properties" variant="outline">
          View Portfolio
        </Button>
      </div>
    </div>
  );
}
