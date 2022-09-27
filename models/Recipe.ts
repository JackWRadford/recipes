import {
  DocumentData,
  QueryDocumentSnapshot,
  WithFieldValue,
} from "firebase/firestore/lite";
import Difficulty from "../enums/Difficulty";

class Recipe {
  constructor(
    readonly name: string,
    readonly author: string,
    readonly description: string,
    readonly cookingTime: number,
    readonly difficulty: Difficulty,
    readonly ingredients: string[],
    readonly instructions: string[],
    readonly notes: string,
    readonly dateCreated: any,
    readonly id?: string
  ) {}
}

/// Convert to and from Firestore and Recipe model
const recipeConverter = {
  toFirestore(recipe: WithFieldValue<Recipe>): DocumentData {
    return {
      name: recipe.name,
      author: recipe.author,
      description: recipe.description,
      cookingTime: recipe.cookingTime,
      difficulty: recipe.difficulty,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      notes: recipe.notes,
      dateCreated: recipe.dateCreated,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Recipe {
    const data = snapshot.data()!;
    return new Recipe(
      data.name,
      data.author,
      data.description,
      data.cookingTime,
      data.difficulty,
      data.ingredients,
      data.instructions,
      data.notes,
      data.dateCreated,
      snapshot.id
    );
  },
};

export { Recipe, recipeConverter };