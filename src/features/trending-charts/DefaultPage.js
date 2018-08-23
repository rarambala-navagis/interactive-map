import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import SimpleLineChart from './SimpleLineChart';
import SimplePieChart from './SimplePieChart';
import TwoLevelPieChart from './TwoLevelPieChart';
import LineBarAreaComposedChart from './LineBarAreaComposedChart';

export class DefaultPage extends Component {
  static propTypes = {
    trendingCharts: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="trending-charts-default-page">
        <div>
          <SimpleLineChart />
          <SimplePieChart />
        </div>
        <div>
        <TwoLevelPieChart />
        <LineBarAreaComposedChart />
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    trendingCharts: state.trendingCharts,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultPage);
