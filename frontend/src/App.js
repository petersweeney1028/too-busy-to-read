import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/articles`)
      .then(response => setArticles(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Too Busy to Read</h1>
      <ul>
        {articles.map(article => (
          <li key={article._id}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
            <p>{new Date(article.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
