import { handlers } from '@/auth';
import { NextRequest } from 'next/server';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

function fixRequestUrl(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (basePath && !pathname.startsWith(basePath)) {
    const url = request.nextUrl.clone();
    url.pathname = `${basePath}${pathname}`;
    return new NextRequest(url, request);
  }
  return request;
}

export async function GET(request: NextRequest) {
  return handlers.GET(fixRequestUrl(request));
}

export async function POST(request: NextRequest) {
  return handlers.POST(fixRequestUrl(request));
}
