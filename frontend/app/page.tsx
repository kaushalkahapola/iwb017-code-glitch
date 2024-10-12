'use client'

import React, { useEffect, useState } from 'react'

const HomePage = () => {

  const [data, setData] = useState<string | null>(null);

  const fetchData = async () => {
    const response = await fetch(`/api/hello`);
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {data}
    </div>
  )
}

export default HomePage