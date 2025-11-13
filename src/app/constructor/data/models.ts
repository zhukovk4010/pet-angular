export const INGREDIENT_TYPE = {
  BUN: 'bun',
  MAIN: 'main',
  SAUCE: 'sauce'
} as const

export type IngredientType = (typeof INGREDIENT_TYPE)[keyof typeof INGREDIENT_TYPE]

export interface Ingredient {
  _id: string,
  name: string,
  type: IngredientType,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number
}
