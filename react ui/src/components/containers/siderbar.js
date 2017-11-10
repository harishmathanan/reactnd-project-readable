import React from 'react';
import PropTypes from 'prop-types';
import ErrorStatus from '../shared/errorStatus';
import ProgressStatus from '../shared/progressStatus';
import CategoryList from '../category/categoryList';
import CategorySelect from '../category/categorySelect';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllCategories } from '../../actions/categoryActions';

class Sidebar extends React.Component {
  render() {
    if (this.props.isFetching) {
      return (
        <ProgressStatus />
      );
    }

    if (this.props.isError) {
      return (
        <ErrorStatus message={this.props.message} />
      );
    }

    return (
      <div className="wrapper">
        <div className="header">
          <h1>
            <a href="/">Readable</a>
          </h1>
        </div>

        <CategorySelect
          categories={this.props.categories}
        />

        <CategoryList
          categories={this.props.categories}
        />
      </div>
    );
  }

  componentDidMount() {
    if (this.props.categories.length === 0) {
      this.props.getCategories();
    }
  }
}

Sidebar.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  message: PropTypes.string,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired
    })
  ),
  getCategories: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.category.isFetching,
    isError: state.category.isError,
    message: state.category.message,
    categories: state.category.categories
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: bindActionCreators(getAllCategories, dispatch)
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
