export interface RawRequest {
    rawPath: string;
    body: string;
    requestContext?: { http: { method: string } };
}

export interface FFIdea {
    uid?: string;
    name: string;
    system: string;
    beans: string;
    difficulty: string;
    creator: string;
    assigned: boolean;
}
