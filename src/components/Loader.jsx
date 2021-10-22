import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

const Loader = () => (
  <div className="loader">
    <LoadingOutlined style={{ fontSize: 40, color: 'orange' }} spin />;
  </div>
);

export default Loader;
