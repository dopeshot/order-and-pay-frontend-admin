import { request } from "../../services/axios";
import { Menu } from "./state";

/** Get Menu Single */
export const getMenuEditorOverview = (id: string) => request.get<Menu>(`/menus/${id}/editor`)
