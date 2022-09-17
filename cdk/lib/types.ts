export const STAGES = ['Test', 'Beta', 'Prod'] as const;
export type Stage = typeof STAGES[number];
