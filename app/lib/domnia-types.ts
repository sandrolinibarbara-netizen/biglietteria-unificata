type ExperienceDescriptionBlock = {
    children?: Array<{
        text?: string;
    }>;
};

export type ExperienceCardData = {
    cheapest?: number;
    connectedProducts?: Array<number | string>;
    description?: string | ExperienceDescriptionBlock[];
    documentId?: string;
    locations: Array<{
        label?: string;
        lat?: number;
        lng?: number;
        [key: string]: unknown;
    }>;
    slug?: string;
    tagIds?: number[];
    title?: string;
    tipo?: string;
    [key: string]: unknown;
};

export type ProductResponse = {
    base_price?: {
        end_date?: string;
        product_id?: number | string;
        start_date?: string;
        value?: number;
    };
    [key: string]: unknown;
};
