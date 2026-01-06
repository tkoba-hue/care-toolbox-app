export type Need = {
    id: string;
    content: string;
    category: string;
    tag?: string;
};

export type SolutionType = {
    id: string;
    name: string;
    relatedNeeds: string[];
};

export type Service = {
    id: string;
    title: string;
    provider: string;
    description: string;
    category: string;
    image: string; // URL
    iconType: string;
    priority: number; // For sorting
    solutionIds: string[];
    tags: string[]; // Generated from category + solution->need->tag
};
