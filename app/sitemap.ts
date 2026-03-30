import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://accessminded.com',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: 'https://accessminded.com/privacy-policy',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: 'https://accessminded.com/szkolenia',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ]
}
