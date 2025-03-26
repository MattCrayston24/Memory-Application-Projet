// pages/swagger.tsx
import React from 'react';
import SwaggerUIComponent from '../components/swaggerui';

const SwaggerPage: React.FC = () => {
  return (
    <div>
      <h1>Documentation API</h1>
      <SwaggerUIComponent />
    </div>
  );
};

export default SwaggerPage;
