import { DASHBOARD_EDITOR_UPDATE_LAYOUT } from "../constants/dashboardEditorLayoutConstants";

export const dashboardEditorUpdateLayout = (
  draggedItem: any,
  dropDestination: any
) => {
  return {
    type: DASHBOARD_EDITOR_UPDATE_LAYOUT,
    payload: {
      draggedItem,
      dropDestination
    }
  };
};
