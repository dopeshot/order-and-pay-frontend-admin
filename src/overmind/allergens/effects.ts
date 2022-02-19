import { request } from "../../services/axios";
import { Allergen } from "./state";

export type AllergenDto = {
    title: string
    icon: string
}

// Get all allergens
export const getAllergens = () => request.get<Allergen[]>('/allergens')
// Post a allergen
export const createAllergen = (createAllergenDto: AllergenDto) => request.post<Allergen>('/allergens', createAllergenDto)
// Update a allergen
export const updateAllergen = (id: string, updateAllergenDto: AllergenDto) => request.patch<Allergen>(`/allergens/${id}`, updateAllergenDto)
// Delete a allergen
export const deleteAllergen = (id: string) => request.delete(`/allergens/${id}`)