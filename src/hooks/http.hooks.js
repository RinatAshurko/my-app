import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [process, setProcess] = useState('waiting');

    const request = useCallback(async(url, method= 'GET', body = null, headers={'Content-Type': 'application/json'}) => {
        setLoading(true);
        try{
            const response = await fetch(url, {method, body, headers});

            const data =  await response.json();
            setProcess('loading')

            if(!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`)
            }
            setLoading(false);
            return data;
        } catch(e) {
            setProcess('error')
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, [])

    const clearError = useCallback(() => {
        setError(null)
        setProcess('loading')
    }, [])

    return {loading, error, request, clearError, clearError, process, setProcess}
}