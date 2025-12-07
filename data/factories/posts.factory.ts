const generateUniqueTitle = (prefix: string) => {
    const timestamp = new Date().getTime();
    return `${prefix} - ${timestamp}`;
};

export interface PostPayload {
    title: string;
    body: string;
    userId: number;
}

export function postPayloadFactory(
    titlePrefix: string = 'Test Post',
    userId: number = 1
): PostPayload {
    
    const uniqueTitle = generateUniqueTitle(titlePrefix);
    
    return {
        title: uniqueTitle,
        body: `Cuerpo de prueba: ${uniqueTitle}.`,
        userId: userId,
    };
}