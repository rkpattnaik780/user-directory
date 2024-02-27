import { useEffect, useState } from "react"

export const useFetchUsers = (url) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState<any>(null);

    useEffect(() => {

        setIsLoading(true);

        const fetchUsers = async() => {

            try {
                const resp = await fetch(url);
                const data = await resp.json();
                setUsers(data);
            } catch(err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();

    }, [url]);

    return [users, isLoading, error];
}