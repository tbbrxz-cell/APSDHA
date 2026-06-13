"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
        <AlertTriangle className="h-8 w-8 text-red-400" />
      </div>
      <h1 className="text-2xl font-bold text-white sm:text-3xl">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-md text-sm text-white/60 sm:text-base">
        We encountered an unexpected error. Please try again, or return to the
        homepage if the problem persists.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-xl bg-army px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-army-light"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-xl border border-white/10 px-6 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-gold/30 hover:text-gold"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
