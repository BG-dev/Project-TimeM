import { Result } from 'antd';
import React from 'react';

function ErrorPage() {
  return (
    <div className="error-page">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    </div>
  );
}

export default ErrorPage;
