export type DishDto = {
    _id: string
    title: string
    description: string
    image: string
    isAvailable: boolean
    price: number
    category: string // id ref: 'Category'
    allergies: string[] // id ref: 'Allergy
    labels: string[] // id ref: 'Label'
}
