import React from "react";
import {
  DragSource,
  DragSourceMonitor,
  DragSourceConnector,
  ConnectDragSource
} from "react-dnd";
import dragTypes from "../dragTypes";
import { connect } from "react-redux";
import { dashboardEditorSetDraggedItem } from "../../redux/actions/dashboardEditorDNDActions";
// import IReduxState from '../../redux/interfaces/IReduxState';

import "./BookmarkToDrag.scss";

interface BookmarkToDragProps {
  name: string;
  id: string;
  isDragging: boolean;
  connectDragSource: ConnectDragSource;
  dashboardEditorSetDraggedItem(item: any): any;
}

/* ************************************************** */

const BookmarkToDrag: React.FC<BookmarkToDragProps> = ({
  name,
  isDragging,
  connectDragSource
}) => {
  const opacity = isDragging ? 0.5 : 1;
  return connectDragSource(
    <div style={{ opacity }} className="BookmarkToDrag">
      {name}
    </div>
  );
};

/* ************************************************** */

const dndBookmarkComponent = DragSource(
  dragTypes.BOOKMARK,
  {
    /* -------------------- */

    beginDrag: (props: BookmarkToDragProps) => {
      return { name: props.name, id: props.id };
    },

    /* -------------------- */

    endDrag(props: BookmarkToDragProps, monitor: DragSourceMonitor) {
      const item = monitor.getItem();
      const dropResult = monitor.getDropResult();

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
)(BookmarkToDrag);

/* ************************************************** */

export default connect(
  null,
  {
    dashboardEditorSetDraggedItem
  }
)(dndBookmarkComponent);
