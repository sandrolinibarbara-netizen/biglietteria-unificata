import { NextResponse } from 'next/server';

import {
    getDomniaSessionCookies,
} from '@/app/lib/domnia-auth';
import {
    DomniaProductsRequestError,
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
        console.error('Failed to proxy Domnia salable products', error);

        return NextResponse.json(
            { message: 'Unable to load salable products' },
            {
                status:
                    error instanceof DomniaProductsRequestError
                        ? error.status
                        : 500,
            },
        );
    }
}
