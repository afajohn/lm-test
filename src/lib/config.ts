export const getApiUrl = () => {
    // In development, use relative URLs
    if (process.env.NODE_ENV === 'development') {
        return '';
    }
    // In production, use the full URL
    return 'https://lm-test-cyan.vercel.app';
};

export const API_URL = getApiUrl(); 