import React from 'react';
import PropTypes from 'prop-types';

const CategorySelect = (props) => {
  return (
    <nav className="nav-dropdown">
      <select>
        <option value="/">Home</option>
        {props.categories.map((category) => {
          return (
            <option key={category.name} value={category.path}>
              {category.name}
            </option>
          );
        })}
      </select>
    </nav>
  );
}

CategorySelect.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired
    })
  ).isRequired
};

export default CategorySelect;
