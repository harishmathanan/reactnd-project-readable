import React from 'react';
import PropTypes from 'prop-types';
import ErrorStatus from '../shared/errorStatus';
import ProgressStatus from '../shared/progressStatus';
import CategoryList from '../category/categoryList';
import CategorySelect from '../category/categorySelect';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCategoryList } from '../../actions/categoryActions';

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
          categories={this.props.categoryList}
        />

        <CategoryList
          categories={this.props.categoryList}
        />
      </div>
    );
  }

  componentDidMount() {
    if (this.props.categoryList.length === 0) {
      this.props.getCategories();
    }
  }
}

Sidebar.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  message: PropTypes.string,
  categoryList: PropTypes.arrayOf(
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
    categoryList: state.category.categoryList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: bindActionCreators(getCategoryList, dispatch)
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
