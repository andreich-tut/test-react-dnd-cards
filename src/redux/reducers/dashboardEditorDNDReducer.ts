import {
  DASHBOARD_EDITOR_SET_DRAGGED_ITEM,
  DASHBOARD_EDITOR_SET_DROP_DESTINATION
} from "../constants/dashboardEditorDNDConstants";

import IDashboardEditorDNDState from "../../interfaces/IDashboardEditorDNDState";

const defaultState: IDashboardEditorDNDState = {
  draggedItem: null,
  dropDestination: null
};

export const dashboardEditorDNDReducer = (
  state = defaultState,
  action: any
) => {
  switch (action.type) {
    case DASHBOARD_EDITOR_SET_DRAGGED_ITEM:
      console.warn("DASHBOARD_EDITOR_SET_DRAGGED_ITEM", action.payload);
      return { ...state, draggedItem: action.payload };

    case DASHBOARD_EDITOR_SET_DROP_DESTINATION:
      console.warn("DASHBOARD_EDITOR_SET_DROP_DESTINATION", action.payload);
      return { ...state, dropDestination: action.payload };

    default:
      return state;
  }
};
