import 'server-only';

import {
    DOMNIA_API_BASE_URL,
    ensureDomniaSession,
    getDomniaApiHeaders,
    requireDomniaAccessToken,
} from '@/app/lib/domnia-auth';
import type { DomniaSession } from '@/app/lib/domnia-auth';
import type { ProductResponse } from '@/app/lib/domnia-types';
import mockSalableProductsResponse from '@/app/lib/mocks/domnia-salable-products.json';

export class DomniaProductsRequestError extends Error {
    status: number;

    constructor(status: number) {
        super(`Domnia salable products request failed with status ${status}`);
        this.name = 'DomniaProductsRequestError';
        this.status = status;
    }
}

export function getMockDomniaSalableProducts() {
    return (
        Array.isArray(mockSalableProductsResponse)
            ? mockSalableProductsResponse
            : []
    ).map((product) => ({
        ...product,
        base_price: product.base_price
            ? {
                ...product.base_price,
            }
            : undefined,
    })) as ProductResponse[];
}

export async function fetchDomniaSalableProducts(accessToken: string) {
    const productsResponse = await fetch(
        `${DOMNIA_API_BASE_URL}/api/bb/products/salable`,
        {
            cache: 'no-store',
            headers: getDomniaApiHeaders(accessToken),
            method: 'GET',
        },
    );

    if (!productsResponse.ok) {
        throw new DomniaProductsRequestError(productsResponse.status);
    }

    const products = (await productsResponse.json()) as ProductResponse[];

    return Array.isArray(products) ? products : [];
}

export async function getDomniaSalableProducts(returnTo: string) {
    const accessToken = await requireDomniaAccessToken(returnTo);

    return fetchDomniaSalableProducts(accessToken);
}

export async function getDomniaSalableProductsWithSession(): Promise<{
    products: ProductResponse[];
    session: DomniaSession;
    shouldPersist: boolean;
}> {
    const { session, shouldPersist } = await ensureDomniaSession();
    const products = await fetchDomniaSalableProducts(session.accessToken);

    return {
        products,
        session,
        shouldPersist,
    };
}
