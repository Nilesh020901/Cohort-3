import react, { useEffect, useState } from 'react';
import axios from 'axios';

const AxiosAPIExample = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
                setData(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div>
            <h1>Posts</h1>
            <ul>
            {data.map((post) => (
              <li key={post.key} style={{ textAlign: "left" }}>{post.title}</li>   
            ))}
            </ul>
        </div>
    );
};

export default AxiosAPIExample;