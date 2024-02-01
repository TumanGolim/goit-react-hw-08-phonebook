import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      <h2>
        Ooops! Something went wrong. Please go to <Link to="/">Contacts</Link>
        page
      </h2>
    </div>
  );
};

export default NotFoundPage;