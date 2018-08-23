import React, { Component } from 'react';
import SimpleLineChart from './SimpleLineChart';
import SimplePieChart from './SimplePieChart';
import TwoLevelPieChart from './TwoLevelPieChart';
import LineBarAreaComposedChart from './LineBarAreaComposedChart';

export default class TrendingCharts extends Component {
  static propTypes = {

  };

  constructor(props){
    super(props);

    this.state = {
      selectedChart: 1
    }
  }

  onchangeSelectChart(e){
    this.setState({ selectedChart: e.target.value});
  }

  getChartRender(){
    switch(parseInt(this.state.selectedChart)){
      case 1:
        return (
          <SimpleLineChart />
        );
      case 2:
        return (
          <SimplePieChart />
        );
      case 3:
        return (
          <TwoLevelPieChart />
        );
      default:
        return null;
    }
  }

  render() {
    
    if(this.props.isShown){
      let renderedChart = this.getChartRender();
      return (
        <div style={{ padding: "10px",height: "700px"}}>
          <div className="col-sm-6 col-sm-offset-3">            
              <div className="panel panel-success">
              <div className="panel-heading">Trending Charts
                <button type="button" className="close" onClick={() => this.props.closeWindow()}> 
                  <span aria-hidden="true">&times;</span><span className="sr-only">Close</span>
                </button>
              </div>
                <div className="panel-body">
                  <div><label>Select Chart: &nbsp;&nbsp;&nbsp;</label>
                    <select onChange={this.onchangeSelectChart.bind(this)}>
                        <option value="1">{'    '}    Chart 1    </option>
                        <option value="2">    Chart 2    </option>
                        <option value="3">    Chart 3    </option>
                    </select>
                  </div>
                  <hr />
                  <div>
                    <label>Description : </label>
                    &nbsp;&nbsp;Sample chart only.
                    <br /><br />
                    {renderedChart}
                  </div>
                </div>
              </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
