/* eslint-disable max-statements */
import { NextResponse, NextRequest } from 'next/server';
import acceptLanguage from 'accept-language';
import { fallbackLng, languages, cookieName } from '@/app/i18n/settings';
import {
  adminRoutes,
  loginRoutes,
  routes,
  userRoutes,
} from '@/app/utils/routes';
import { Language, Role } from '@/app/utils/enum';
import { getPathname, isMatch } from '@/app/utils/helpers';
import { REDIRECT_TO, ROLE, TOKEN } from '@/app/utils/constants';

acceptLanguage.languages(languages);

export const config = {
  matcher: ['/vi/:path*', '/en/:path*'],
};

function redirectTo(path: string, req: NextRequest) {
  return NextResponse.redirect(new URL(path, req.url));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(TOKEN)?.value;
  const role = req.cookies.get(ROLE)?.value;

  if (
    req.nextUrl.pathname.indexOf('icon') > -1 ||
    req.nextUrl.pathname.indexOf('chrome') > -1
  )
    return NextResponse.next();
  let lng;
  if (req.cookies.has(cookieName)) {
    lng = acceptLanguage.get(
      (req.cookies.get(cookieName) as App.Any).value,
    ) as Language;
  }
  if (!lng) {
    lng = fallbackLng as Language;
  }

  // Redirect if lng in path is not supported
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(
      new URL(getPathname(lng, req.nextUrl.pathname), req.url),
    );
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer') as string);
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`),
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  const path = pathname.replace(`/${lng}`, '') || routes.HOME;

  if (token && isMatch(path, loginRoutes)) {
    const redirectPath = path.startsWith('/admin')
      ? routes.DASHBOARD
      : routes.HOME;
    return NextResponse.redirect(new URL(`/${lng}${redirectPath}`, req.url));
  }

  if (isMatch(path, adminRoutes)) {
    if (!token) {
      req.cookies.set(REDIRECT_TO, pathname);
      return redirectTo(getPathname(lng, routes.ADMIN_LOGIN), req);
    }
    if (role !== Role.ADMIN) {
      return redirectTo(getPathname(lng, routes.NOT_FOUND), req);
    }
  }

  if (isMatch(path, userRoutes)) {
    if (!token) {
      req.cookies.set(REDIRECT_TO, pathname);
      return redirectTo(getPathname(lng, routes.LOGIN), req);
    }
  }

  if (!isMatch(path, Object.values(routes))) {
    return NextResponse.rewrite(
      new URL(getPathname(lng, routes.NOT_FOUND), req.url),
    );
  }

  return NextResponse.next();
}
