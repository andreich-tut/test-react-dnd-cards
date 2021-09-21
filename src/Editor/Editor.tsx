import React, { Component } from "react";
import PlaceForChart from "./PlaceForChart";
import BookmarkToDrag from "./BookmarkToDrag";
import { connect } from "react-redux";
// import IReduxState from '../../interfaces/IReduxState';
import "./Editor.scss";

interface IDashboardEditorModuleProps {
  dashboardEditorBookmarks: any;
  chartsLayout: any;
}

class DashboardEditorModule extends Component<IDashboardEditorModuleProps> {
  renderPlacesForChartLayout() {
    let layoutJSX = [];
    let rowCounter = 0;
    for (const row of this.props.chartsLayout) {
      let placesForChart = [];
      for (const el of row) {
        placesForChart.push(
          <PlaceForChart key={el.id} id={el.id} title={el.title}>
            {el.title}
          </PlaceForChart>
        );
      }
      layoutJSX.push(
        <div className="places-for-charts-row" key={rowCounter}>
          {placesForChart}
        </div>
      );
      rowCounter++;
    }
    return layoutJSX;
  }

  /* ************************************************** */

  render() {
    return (
      <div
        style={{ padding: 50, background: "blue", color: "white" }}
        className="DashboardEditorModule"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          {this.props.dashboardEditorBookmarks.map((bookmark: any) => (
            <BookmarkToDrag
              name={bookmark.name}
              id={bookmark.id}
              key={`bookmark-to-drag-${bookmark.id}`}
            />
          ))}
        </div>
        {this.renderPlacesForChartLayout()}
      </div>
    );
  }
}

/* ************************************************** */

function mapStateToProps(state: any) {
  return {
    chartsLayout:
      state.dashboardEditorLayoutReducer.dashboardEditorChartsLayout,
    dashboardEditorBookmarks:
      state.dashboardEditorLayoutReducer.dashboardEditorBookmarks
  };
}

export default connect(
  mapStateToProps,
  null
)(DashboardEditorModule);
