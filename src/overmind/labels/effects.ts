import { request } from "../../services/axios";
import { Label } from "./state";

export type LabelDto = {
    title: string
    icon: string
}

// Get all labels
export const getLabels = () => request.get<Label[]>('/labels')
// Post a label
export const createLabel = (createLabelDto: LabelDto) => request.post<Label>('/labels', createLabelDto)
// Update a label
export const updateLabel = (id: string, updateLabelDto: LabelDto) => request.patch<Label>(`/labels/${id}`, updateLabelDto)
// Delete a label
export const deleteLabel = (id: string) => request.delete(`/labels/${id}`)