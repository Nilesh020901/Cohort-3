import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ErrorHandling = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/invalid-endpoint')
    .then((response) => {
       setData(response.data);
       setIsLoading(false);
    })
    .catch((error) => {
      setError(error)
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  if (error) {
    return <p>Error:(error)</p>;
  }

  return (
    <div>
      <h1>Data</h1>
      <ul>
        {data.map((item)=>(
      <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorHandling;