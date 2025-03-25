export const getApiUrl = () => {
    // In development, use relative URLs
    if (process.env.NODE_ENV === 'development') {
        return '';
    }
    // In production, use the full URL
    return process.env.NEXTAUTH_URL;
};

export const API_URL = getApiUrl(); 