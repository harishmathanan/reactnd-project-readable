import React from 'react';
import PropTypes from 'prop-types';

const ErrorStatus = (props) => {
  return (
    <div className="wrapper top">
      <h3 className="error">
        {props.message}
      </h3>
    </div>
  );
};

ErrorStatus.propTypes = {
  message: PropTypes.string.isRequired
};

export default ErrorStatus;

