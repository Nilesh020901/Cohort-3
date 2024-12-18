import react, { useState, useEffect } from 'react';

const FetchApiExample = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new error ('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data.map((post) => (
            <li key={post.id} style={{ textAlign: "left" }}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default FetchApiExample;
