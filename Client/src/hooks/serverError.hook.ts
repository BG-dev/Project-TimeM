import axios, { AxiosError } from 'axios';

const useServerError = () => {
    const handleServerError = (error: any): string => {
        if (axios.isAxiosError(error)) {
            const err = error as AxiosError<{ message: string }>;
            return err.response?.data.message || '';
        }
        return error.message;
    };

    return { handleServerError };
};

export default useServerError;
