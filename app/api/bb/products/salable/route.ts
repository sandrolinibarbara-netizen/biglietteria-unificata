import { NextResponse } from 'next/server';

import {
    getDomniaSessionCookies,
} from '@/app/lib/domnia-auth';
import {
    DomniaProductsRequestError,
    getMockDomniaSalableProducts,
    getDomniaSalableProductsWithSession,
} from '@/app/lib/domnia-products';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const { products, session, shouldPersist } =
            await getDomniaSalableProductsWithSession();
        const response = NextResponse.json(products);

        if (shouldPersist && session.refreshToken && session.refreshExpiresAt) {
            const cookies = await getDomniaSessionCookies({
                accessExpiresAt: session.accessExpiresAt,
                accessToken: session.accessToken,
                refreshExpiresAt: session.refreshExpiresAt,
                refreshToken: session.refreshToken,
            });

            cookies.forEach((cookie) => {
                response.cookies.set(cookie.name, cookie.value, cookie.options);
            });
        }

        response.headers.set('Cache-Control', 'no-store');

        return response;
    } catch (error) {
        console.warn(
            'Domnia salable products unavailable, using local mock response',
            error,
        );

        const response = NextResponse.json(getMockDomniaSalableProducts());

        response.headers.set('Cache-Control', 'no-store');
        response.headers.set('X-Domnia-Fallback', 'mock-products');

        if (error instanceof DomniaProductsRequestError) {
            response.headers.set('X-Domnia-Upstream-Status', String(error.status));
        }

        return response;
    }
}
