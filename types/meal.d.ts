export interface Meal {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  calories: number;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  preparationTime: number; // in minutes
  cookingTime: number; // in minutes
  servings: number;
}
