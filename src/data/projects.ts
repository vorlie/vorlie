export interface ProjectOverride {
    featured?: boolean;
    order?: number;
    image?: string;
    description?: string;
}

export const projectOverrides: Record<string, ProjectOverride> = {
    kioku: {
        featured: true,
        order: 1,
        image: "/images/projects/kioku.webp",
    },

    aniplay: {
        featured: true,
        order: 2,
        image: "/images/projects/aniplay.webp",
    },
};