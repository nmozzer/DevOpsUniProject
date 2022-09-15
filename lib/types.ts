export const STAGES = ['Prod', 'Beta', 'Test'] as const;
export type Stage = typeof STAGES[number];
