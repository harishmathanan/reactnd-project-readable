import React from 'react';
import PropTypes from 'prop-types';

const CategoryList = (props) => {
  return (
    <nav>
      <ul className="nav-list">
        {props.categories.map((category) => {
          return (
            <li key={category.name} className="nav-item">
              <a href={`/${category.path}`}>
                {category.name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired
    })
  ).isRequired
};

export default CategoryList;
