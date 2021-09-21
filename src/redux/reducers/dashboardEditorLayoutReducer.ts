import { DASHBOARD_EDITOR_UPDATE_LAYOUT } from "../constants/dashboardEditorLayoutConstants";

import IDashboardEditorLayoutState from "../interfaces/IDashboardEditorLayoutState";

const defaultState: IDashboardEditorLayoutState = {
  dashboardEditorBookmarks: [
    { name: "bookmark01", id: "bm01" },
    { name: "bookmark02", id: "bm02" },
    { name: "bookmark03", id: "bm03" },
    { name: "bookmark04", id: "bm04" },
    { name: "bookmark05", id: "bm05" }
  ],
  dashboardEditorChartsLayout: [
    [{ id: 1, title: "empty" }, { id: 2, title: "empty" }],
    [{ id: 3, title: "empty" }, { id: 4, title: "empty" }],
    [{ id: 5, title: "empty" }, { id: 6, title: "empty" }],
    [{ id: 7, title: "empty" }]
  ]
};

export const dashboardEditorLayoutReducer = (
  state = defaultState,
  action: any
) => {
  switch (action.type) {
    case DASHBOARD_EDITOR_UPDATE_LAYOUT:
      console.log("DASHBOARD_EDITOR_UPDATE_LAYOUT", action.payload);
      const draggedItem = action.payload.draggedItem;
      const dropDestination = action.payload.dropDestination;

      const updatedLayout = state.dashboardEditorChartsLayout.map((row: any) =>
        row.map((item: any) =>
          item.id === dropDestination.id
            ? { ...item, title: draggedItem.name }
            : item
        )
      );

      return {
        ...state,
        dashboardEditorChartsLayout: updatedLayout,
        dashboardEditorBookmarks: state.dashboardEditorBookmarks.filter(
          (bookmark: any) => bookmark.id !== draggedItem.id
        )
      };

    default:
      return state;
  }
};
