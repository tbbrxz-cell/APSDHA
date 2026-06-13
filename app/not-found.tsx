import Link from "next/link";
import { Home, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 shadow-glow-gold-sm">
        <SearchX className="h-8 w-8 text-gold-light" />
      </div>
      <p className="text-sm font-medium uppercase tracking-widest text-gold-light">
        404
      </p>
      <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
        Page Not Found
      </h1>
      <p className="mt-3 max-w-md text-caption sm:text-base">
        The page you are looking for does not exist. Please check the URL or return to the home page.
      </p>
      <Button asChild className="mt-8" size="lg">
        <Link href="/">
          <Home className="h-4 w-4" />
          Return Home
        </Link>
      </Button>
    </div>
  );
}
