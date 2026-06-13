"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, Lock, ShieldAlert } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthStatus {
  locked: boolean;
  retryAfterSec: number;
  attemptsRemaining: number;
}

interface AdminPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

function formatCountdown(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes <= 0) return `${seconds}s`;
  return `${minutes}m ${seconds.toString().padStart(2, "0")}s`;
}

async function fetchAuthStatus(): Promise<AuthStatus> {
  const res = await fetch("/api/admin/auth", { cache: "no-store" });
  const data = await res.json();
  return {
    locked: Boolean(data.locked),
    retryAfterSec: Number(data.retryAfterSec) || 0,
    attemptsRemaining: Number(data.attemptsRemaining ?? 3),
  };
}

export default function AdminPasswordDialog({
  open,
  onOpenChange,
  onSuccess,
}: AdminPasswordDialogProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [locked, setLocked] = useState(false);
  const [retryAfterSec, setRetryAfterSec] = useState(0);
  const [attemptsRemaining, setAttemptsRemaining] = useState(3);

  const refreshStatus = useCallback(async () => {
    try {
      const status = await fetchAuthStatus();
      setLocked(status.locked);
      setRetryAfterSec(status.retryAfterSec);
      setAttemptsRemaining(status.attemptsRemaining);
      return status;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    refreshStatus();
  }, [open, refreshStatus]);

  useEffect(() => {
    if (!open || !locked || retryAfterSec <= 0) return;

    const timer = window.setInterval(() => {
      setRetryAfterSec((prev) => {
        if (prev <= 1) {
          setLocked(false);
          refreshStatus();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [open, locked, retryAfterSec, refreshStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (locked) return;

    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setPassword("");
        setError("");
        setLocked(false);
        setRetryAfterSec(0);
        onOpenChange(false);
        onSuccess();
        return;
      }

      if (data.locked) {
        setLocked(true);
        setRetryAfterSec(Number(data.retryAfterSec) || 0);
        setAttemptsRemaining(0);
        setError(
          data.error ||
            "Too many failed attempts. Please wait before trying again."
        );
        return;
      }

      setAttemptsRemaining(Number(data.attemptsRemaining ?? 0));
      const remaining = Number(data.attemptsRemaining ?? 0);
      setError(
        remaining > 0
          ? `Invalid password. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`
          : data.error || "Invalid password. Please try again."
      );
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setPassword("");
      setError("");
    }
    onOpenChange(nextOpen);
  };

  const isDisabled = submitting || locked;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-sm border-white/10 bg-charcoal-light/95 backdrop-blur-xl">
        <DialogHeader>
          <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-army/50">
            {locked ? (
              <ShieldAlert className="h-5 w-5 text-red-400" />
            ) : (
              <Lock className="h-5 w-5 text-gold" />
            )}
          </div>
          <DialogTitle className="text-center">
            {locked ? "Temporarily Locked" : "Admin Access"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {locked
              ? `Too many failed attempts. Try again in ${formatCountdown(retryAfterSec)}.`
              : "Enter the admin password to continue."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!locked && attemptsRemaining < 3 && (
            <p className="rounded-lg border border-gold/20 bg-gold/10 px-3 py-2 text-center text-xs text-gold">
              {attemptsRemaining} attempt{attemptsRemaining === 1 ? "" : "s"}{" "}
              remaining before lockout
            </p>
          )}

          <div className="space-y-2">
            <Label htmlFor="admin-password">Password</Label>
            <Input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              autoFocus={!locked}
              disabled={isDisabled}
              aria-invalid={!!error}
            />
            {error && (
              <p className="text-xs text-red-400" role="alert">
                {error}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="gold"
            className="w-full"
            disabled={isDisabled || !password}
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : locked ? (
              `Locked — ${formatCountdown(retryAfterSec)}`
            ) : (
              "Unlock Admin Panel"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
