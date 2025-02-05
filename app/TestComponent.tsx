'use client';

import React from 'react';
import { useState } from 'react';

import Link from 'next/link';

const TestComponent = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>Husky Test</h1>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
      <br />
      <Link href="/">Home</Link>
    </div>
  );
};

export default TestComponent;
