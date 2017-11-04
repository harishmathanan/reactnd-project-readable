import React from 'react';
import Loading from 'react-loading';

const ProgressStatus = () => {
  return (
    <div className="wrapper top">
      <h3>
        Working on it...
        &nbsp;
        <Loading
          className="loader"
          type="spinningBubbles"
          color="#0078d7"
          height="32px"
          width="32px"
          delay={0}
        />
      </h3>
    </div>
  );
};

export default ProgressStatus;
