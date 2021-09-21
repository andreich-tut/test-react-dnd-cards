import React, { Component } from "react";
import {
  DropTarget,
  DropTargetConnector,
  DropTargetMonitor,
  ConnectDropTarget
} from "react-dnd";
import {
  DragSource,
  DragSourceMonitor,
  DragSourceConnector,
  ConnectDragSource
} from "react-dnd";
import dragTypes from "../dragTypes";
import { dashboardEditorSetDropDestination } from "../../redux/actions/dashboardEditorDNDActions";
import { connect } from "react-redux";

import "./PlaceForChart.scss";

export interface PlaceForChartProps {
  id: number;
  title?: string;
  canDrop: boolean;
  isOver: boolean;
  connectDropTarget: ConnectDropTarget;
  isDragging: boolean;
  connectDragSource: ConnectDragSource;
  dashboardEditorSetDropDestination(dropDestination: any): any;
}

class PlaceForChart extends Component<PlaceForChartProps> {
  render() {
    const {
      id,
      title,
      canDrop,
      isDragging,
      isOver,
      connectDropTarget,
      connectDragSource,
      children
    } = this.props;
    let bgColor = canDrop ? "#d18802" : "";
    bgColor = canDrop && isOver ? "#56343d" : bgColor;
    bgColor = title !== "empty" ? "red" : bgColor;
    bgColor = isDragging ? "purple" : bgColor;
    const opacity = isDragging ? 0.5 : 1;
    return connectDragSource(
      connectDropTarget(
        <div
          style={{ background: bgColor, opacity }}
          className="PlaceForChart"
          key={`place-for-chart-${id}`}
        >
          {id} - {children}
        </div>
      )
    );
  }
}

/* ************************************************** */

const dndDragPlaceForChartComponent = DragSource(
  dragTypes.BOOKMARK,
  {
    /* -------------------- */

    beginDrag: (props: any) => {
      console.log("beginDrag");
      return { name: props.name, id: props.id };
    },

    /* -------------------- */

    endDrag(props: any, monitor: DragSourceMonitor) {
      const item = monitor.getItem();
      const dropResult = monitor.getDropResult();
      console.log("dropResult", dropResult);
      if (dropResult) {
        props.dashboardEditorSetDraggedItem(item);
      }
    }

    /* -------------------- */
  },
  (dndConnect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: dndConnect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(PlaceForChart);

/* ************************************************** */

const dndPlaceForChartComponent = DropTarget(
  dragTypes.BOOKMARK,
  {
    drop: (props: any) => {
      const droppedToItem = {
        id: props.id
      };

      props.dashboardEditorSetDropDestination(droppedToItem);
      return { id: props.id };
    }
  },
  (dndConnect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: dndConnect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  })
)(dndDragPlaceForChartComponent);
/* ************************************************** */

export default connect(
  null,
  {
    dashboardEditorSetDropDestination
  }
)(dndPlaceForChartComponent);
