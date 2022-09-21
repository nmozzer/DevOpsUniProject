export const STAGES = ['Beta', 'Prod'] as const;
export type CustomStage = typeof STAGES[number];
