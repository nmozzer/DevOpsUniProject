import React from 'react';
import { FFIdea } from '../../api/client';

export const useIdeasHook = () => {
    const [ideas, setIdeas] = React.useState<FFIdea[]>([]);

    return { ideas, setIdeas };
};
