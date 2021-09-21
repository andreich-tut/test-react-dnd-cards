import {
  DASHBOARD_EDITOR_SET_DRAGGED_ITEM,
  DASHBOARD_EDITOR_SET_DROP_DESTINATION
} from "../constants/dashboardEditorDNDConstants";

import { dashboardEditorUpdateLayout } from "./dashboardEditorLayoutActions";
import IReduxState from "../../interfaces/IReduxState";

export const dashboardEditorSetDropDestination = (dropDestination: any) => {
  return {
    type: DASHBOARD_EDITOR_SET_DROP_DESTINATION,
    payload: dropDestination
  };
};

export const dashboardEditorSetDraggedItem = (draggedItem: any) => {
  return (dispatch: any, getState: () => IReduxState) => {
    dispatch({
      type: DASHBOARD_EDITOR_SET_DRAGGED_ITEM,
      payload: draggedItem
    });
    const dropDestination = getState().dashboardEditorDNDReducer
      .dropDestination;

    dispatch(dashboardEditorUpdateLayout(draggedItem, dropDestination));
  };
};
