import { request } from "../../services/axios";
import { MenuPopulated } from "../menus/type";

/** Get Menu Single */
export const getMenuEditorOverview = (id: string) => request.get<MenuPopulated>(`/menus/${id}/editor`)
