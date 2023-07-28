import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(data => {
        setData(data);
        console.log(data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>User Data:</h1>
      {data.map((item, index) => (
        <p key={index}>{item.name}</p>
      ))}
    </div>
  );
}

export default App;
