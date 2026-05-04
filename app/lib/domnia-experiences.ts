import 'server-only';

import {
    DOMNIA_API_BASE_URL,
    getDomniaApiHeaders,
    requireDomniaAccessToken,
} from '@/app/lib/domnia-auth';
import mockProductGroupsResponse from '@/app/lib/mocks/domnia-product-groups.json';
import type {
    ExperienceCardData,
    ProductResponse,
} from '@/app/lib/domnia-types';

type ProductGroupResponse = {
    data: ExperienceCardData[];
};

async function fetchDomniaJson<T>(path: string, accessToken: string): Promise<T> {
    const response = await fetch(`${DOMNIA_API_BASE_URL}${path}`, {
        cache: 'no-store',
        headers: getDomniaApiHeaders(accessToken),
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error(`Domnia API request failed with status ${response.status}`);
    }

    return response.json() as Promise<T>;
}

function getMockProductGroups() {
    return (
        Array.isArray(mockProductGroupsResponse.data)
            ? mockProductGroupsResponse.data
            : []
    ).map((productGroup) => ({
        ...productGroup,
    })) as ExperienceCardData[];
}

function attachFallbackConnectedProducts(
    productGroups: ExperienceCardData[],
    products: ProductResponse[],
) {
    const availableProducts = products.filter(
        (product) => product.base_price?.product_id !== undefined,
    );

    if (availableProducts.length === 0) {
        return productGroups;
    }

    return productGroups.map((productGroup, index) => {
        if (
            Array.isArray(productGroup.connectedProducts) &&
            productGroup.connectedProducts.length > 0
        ) {
            return productGroup;
        }

        const fallbackProduct =
            availableProducts[index % availableProducts.length];
        const fallbackProductId = fallbackProduct.base_price?.product_id;
        const fallbackPrice = fallbackProduct.base_price?.value;

        return {
            ...productGroup,
            cheapest:
                fallbackPrice !== undefined
                    ? fallbackPrice
                    : productGroup.cheapest,
            connectedProducts:
                fallbackProductId !== undefined ? [fallbackProductId] : [],
        };
    });
}

async function fetchProductGroupsWithFallback(accessToken: string) {
    try {
        const response = await fetchDomniaJson<ProductGroupResponse>(
            '/api/shop/product-groups?tagIds=1',
            accessToken,
        );

        return {
            data: Array.isArray(response.data) ? response.data : [],
            isFallback: false,
        };
    } catch (error) {
        console.warn(
            'Domnia product groups unavailable, using local mock response',
            error,
        );

        return {
            data: getMockProductGroups(),
            isFallback: true,
        };
    }
}

async function fetchProductsWithFallback(accessToken: string) {
    try {
        const response = await fetchDomniaJson<ProductResponse[]>(
            '/api/bb/products/salable',
            accessToken,
        );

        return Array.isArray(response) ? response : [];
    } catch (error) {
        console.warn(
            'Domnia salable products unavailable, continuing without enrichment',
            error,
        );

        return [];
    }
}

function enrichExperiences(
    productGroups: ExperienceCardData[],
    products: ProductResponse[],
) {
    return productGroups.map((productGroup) => {
        const connectedProducts = new Set(
            (Array.isArray(productGroup.connectedProducts)
                ? productGroup.connectedProducts
                : []
            ).map((productId) => productId.toString()),
        );

        const cheapest = products.reduce<number | undefined>((lowest, product) => {
            const productId = product.base_price?.product_id;
            const value = product.base_price?.value;

            if (
                productId === undefined ||
                value === undefined ||
                !connectedProducts.has(productId.toString())
            ) {
                return lowest;
            }

            if (lowest === undefined || value < lowest) {
                return value;
            }

            return lowest;
        }, productGroup.cheapest);

        return {
            ...productGroup,
            cheapest,
        };
    });
}

export async function fetchExperiencesWithAccessToken(accessToken: string) {
    const [productGroupsResult, products] = await Promise.all([
        fetchProductGroupsWithFallback(accessToken),
        fetchProductsWithFallback(accessToken),
    ]);
    const productGroups = productGroupsResult.isFallback
        ? attachFallbackConnectedProducts(productGroupsResult.data, products)
        : productGroupsResult.data;

    return enrichExperiences(
        productGroups,
        products,
    );
}

export async function getExperiences(returnTo: string) {
    const accessToken = await requireDomniaAccessToken(returnTo);

    return fetchExperiencesWithAccessToken(accessToken);
}
