import { request } from "../../services/axios";
import { Menu } from "./state";

export const getMenuEditorOverview = (id: string) => request.get<Menu>(`/menus/${id}/editor`)
