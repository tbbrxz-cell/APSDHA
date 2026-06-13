import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_LOCKOUT_COOKIE,
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SEC,
  createSessionToken,
  getLockoutStatus,
  lockoutCookieMaxAge,
  parseLockoutCookie,
  recordFailedAttempt,
  serializeLockoutCookie,
  verifyPassword,
  verifySessionToken,
} from "@/lib/admin-session";

function readLockoutState() {
  const token = cookies().get(ADMIN_LOCKOUT_COOKIE)?.value;
  return parseLockoutCookie(token);
}

function writeLockoutState(
  response: NextResponse,
  state: ReturnType<typeof parseLockoutCookie>
) {
  response.cookies.set(ADMIN_LOCKOUT_COOKIE, serializeLockoutCookie(state), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: lockoutCookieMaxAge(state),
    path: "/",
  });
}

function clearLockoutState(response: NextResponse) {
  response.cookies.set(ADMIN_LOCKOUT_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}

export async function GET() {
  try {
    const sessionToken = cookies().get(ADMIN_SESSION_COOKIE)?.value;
    const authenticated = sessionToken ? verifySessionToken(sessionToken) : false;

    if (authenticated) {
      return NextResponse.json({ authenticated: true, locked: false });
    }

    const lockoutStatus = getLockoutStatus(readLockoutState());

    return NextResponse.json({
      authenticated: false,
      locked: lockoutStatus.locked,
      retryAfterSec: lockoutStatus.retryAfterSec,
      attemptsRemaining: lockoutStatus.attemptsRemaining,
    });
  } catch {
    return NextResponse.json({
      authenticated: false,
      locked: false,
      attemptsRemaining: 3,
    });
  }
}

export async function POST(request: Request) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json(
      { error: "Admin authentication is not configured" },
      { status: 503 }
    );
  }

  const currentLockout = readLockoutState();
  const lockoutStatus = getLockoutStatus(currentLockout);

  if (lockoutStatus.locked) {
    const response = NextResponse.json(
      {
        error: "Too many failed attempts. Please wait before trying again.",
        locked: true,
        retryAfterSec: lockoutStatus.retryAfterSec,
        attemptsRemaining: 0,
      },
      { status: 429 }
    );
    writeLockoutState(response, currentLockout);
    return response;
  }

  let body: { password?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { password } = body;

  if (!password || !verifyPassword(password, adminPassword)) {
    const { state, status } = recordFailedAttempt(currentLockout);

    const response = NextResponse.json(
      {
        error: status.locked
          ? "Too many failed attempts. Account temporarily locked."
          : "Invalid password. Please try again.",
        locked: status.locked,
        retryAfterSec: status.retryAfterSec,
        attemptsRemaining: status.attemptsRemaining,
      },
      { status: status.locked ? 429 : 401 }
    );

    writeLockoutState(response, state);
    return response;
  }

  const token = createSessionToken();
  const response = NextResponse.json({ ok: true });

  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: ADMIN_SESSION_MAX_AGE_SEC,
    path: "/",
  });

  clearLockoutState(response);
  return response;
}
