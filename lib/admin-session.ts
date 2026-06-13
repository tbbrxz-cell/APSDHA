import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_SESSION_COOKIE = "admin_session";
export const ADMIN_LOCKOUT_COOKIE = "admin_lockout";
export const ADMIN_SESSION_MAX_AGE_SEC = 2 * 60 * 60;
export const MAX_PASSWORD_ATTEMPTS = 3;

/** Escalating lockout durations after each set of 3 failed attempts. */
const LOCKOUT_DURATIONS_MS = [
  2 * 60 * 1000, // 2 minutes
  10 * 60 * 1000, // 10 minutes
  30 * 60 * 1000, // 30 minutes
  60 * 60 * 1000, // 1 hour
] as const;

const MAX_LOCKOUT_MS = 24 * 60 * 60 * 1000; // cap at 24 hours

export interface LockoutState {
  failures: number;
  lockoutUntil: number;
  lockoutTier: number;
}

export interface LockoutStatus {
  locked: boolean;
  retryAfterSec: number;
  attemptsRemaining: number;
}

function getSigningSecret(): string {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) {
    throw new Error("ADMIN_PASSWORD is not configured");
  }
  return secret;
}

function getLockoutDurationMs(tier: number): number {
  if (tier < LOCKOUT_DURATIONS_MS.length) {
    return LOCKOUT_DURATIONS_MS[tier];
  }
  const extraTier = tier - LOCKOUT_DURATIONS_MS.length;
  const duration = 60 * 60 * 1000 * 2 ** (extraTier + 1);
  return Math.min(duration, MAX_LOCKOUT_MS);
}

function signPayload(payload: string): string {
  return createHmac("sha256", getSigningSecret()).update(payload).digest("hex");
}

function encodeSignedJson(data: LockoutState): string {
  const payload = JSON.stringify(data);
  const signature = signPayload(payload);
  return Buffer.from(`${payload}|${signature}`).toString("base64url");
}

function decodeSignedJson(token: string): LockoutState | null {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const separatorIndex = decoded.lastIndexOf("|");
    if (separatorIndex === -1) return null;

    const payload = decoded.slice(0, separatorIndex);
    const signature = decoded.slice(separatorIndex + 1);
    const expected = signPayload(payload);

    const actualBuf = Buffer.from(signature, "hex");
    const expectedBuf = Buffer.from(expected, "hex");
    if (actualBuf.length !== expectedBuf.length) return null;
    if (!timingSafeEqual(actualBuf, expectedBuf)) return null;

    const parsed = JSON.parse(payload) as LockoutState;
    if (
      typeof parsed.failures !== "number" ||
      typeof parsed.lockoutUntil !== "number" ||
      typeof parsed.lockoutTier !== "number"
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function createEmptyLockoutState(): LockoutState {
  return { failures: 0, lockoutUntil: 0, lockoutTier: 0 };
}

export function parseLockoutCookie(token: string | undefined): LockoutState {
  if (!token) return createEmptyLockoutState();
  return decodeSignedJson(token) ?? createEmptyLockoutState();
}

export function serializeLockoutCookie(state: LockoutState): string {
  return encodeSignedJson(state);
}

export function getLockoutStatus(state: LockoutState): LockoutStatus {
  const now = Date.now();

  if (state.lockoutUntil > now) {
    return {
      locked: true,
      retryAfterSec: Math.ceil((state.lockoutUntil - now) / 1000),
      attemptsRemaining: 0,
    };
  }

  return {
    locked: false,
    retryAfterSec: 0,
    attemptsRemaining: Math.max(0, MAX_PASSWORD_ATTEMPTS - state.failures),
  };
}

export function recordFailedAttempt(state: LockoutState): {
  state: LockoutState;
  status: LockoutStatus;
} {
  const now = Date.now();
  const active = state.lockoutUntil > now ? state : { ...state, lockoutUntil: 0 };
  const lockCheck = getLockoutStatus(active);

  if (lockCheck.locked) {
    return { state: active, status: lockCheck };
  }

  const failures = active.failures + 1;

  if (failures >= MAX_PASSWORD_ATTEMPTS) {
    const duration = getLockoutDurationMs(active.lockoutTier);
    const nextState: LockoutState = {
      failures: 0,
      lockoutUntil: now + duration,
      lockoutTier: active.lockoutTier + 1,
    };

    return {
      state: nextState,
      status: {
        locked: true,
        retryAfterSec: Math.ceil(duration / 1000),
        attemptsRemaining: 0,
      },
    };
  }

  const nextState: LockoutState = { ...active, failures };
  return {
    state: nextState,
    status: getLockoutStatus(nextState),
  };
}

export function createSessionToken(): string {
  const expiresAt = Date.now() + ADMIN_SESSION_MAX_AGE_SEC * 1000;
  const payload = expiresAt.toString();
  const signature = signPayload(payload);
  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string): boolean {
  try {
    const [payload, signature] = token.split(".");
    if (!payload || !signature) return false;

    const expiresAt = Number.parseInt(payload, 10);
    if (Number.isNaN(expiresAt) || Date.now() > expiresAt) return false;

    const expected = signPayload(payload);
    const actualBuf = Buffer.from(signature, "hex");
    const expectedBuf = Buffer.from(expected, "hex");

    if (actualBuf.length !== expectedBuf.length) return false;
    return timingSafeEqual(actualBuf, expectedBuf);
  } catch {
    return false;
  }
}

export function verifyPassword(input: string, expected: string): boolean {
  const inputBuf = Buffer.from(input);
  const expectedBuf = Buffer.from(expected);
  if (inputBuf.length !== expectedBuf.length) return false;
  return timingSafeEqual(inputBuf, expectedBuf);
}

export function lockoutCookieMaxAge(state: LockoutState): number {
  const now = Date.now();
  const lockRemaining = Math.max(0, state.lockoutUntil - now);
  return Math.ceil((lockRemaining + 30 * 24 * 60 * 60 * 1000) / 1000);
}
