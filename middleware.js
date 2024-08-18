import ApiError from "./utilities/backend/ApiError";
import { NextResponse } from "next/server";
import { decode } from "./utilities/backend/jwt";

export async function middleware(request) {
  const cookie = request.cookies.get("next-auth.session-token");

  if (request.nextUrl.pathname === '/login') {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('pathname', request.nextUrl.pathname);

    return NextResponse.next({
      request: {
        headers: requestHeaders
      } 
    })
  }
  
  try {
    if (!cookie || !cookie.value) {
      throw new ApiError(401, "Authentication required");
    }

    if (request.nextUrl.pathname.endsWith("/user") && request.method === 'POST') {
      const { token } = await request.json();

      const decoded = await decode({token});

      const decodedToken = decoded.payload;

      if (
        !decodedToken ||
        !decodedToken.email ||
        !decodedToken.access_token ||
        !decodedToken.refresh_token
      ) {
        if (!decodedToken) {
          throw new ApiError(400, "Missing request body");
        }

        if (!decodedToken.email) {
          throw new ApiError(400, "Missing email in the request body");
        }

        if (!decodedToken.access_token || !decodedToken.refresh_token) {
          throw new ApiError(401, decodedToken.error || "Authentication required.");
        }
      }
    }
    
    return NextResponse.next();

  } catch (e) {
    return NextResponse.json(
      {
        message: e.message,
        ...e,
      },
      {
        status: e.code || 500,
      }
    );
  }
}

export const config = {
  matcher: ['/api/user', '/login']
}
