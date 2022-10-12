import {
  DocumentData,
  QueryDocumentSnapshot,
  WithFieldValue,
} from "firebase/firestore/lite";
import Difficulty from "../enums/difficulty";

class Recipe {
  constructor(
    readonly name: string,
    readonly author: string,
    readonly userId: string,
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

/**
 * Convert to and from Firestore and Recipe model
 */
const recipeConverter = {
  toFirestore(recipe: WithFieldValue<Recipe>): DocumentData {
    return {
      name: recipe.name,
      author: recipe.author,
      userId: recipe.userId,
      description: recipe.description,
      cookingTime: recipe.cookingTime,
      difficulty: recipe.difficulty,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      notes: recipe.notes,
      dateCreated: recipe.dateCreated,
      nameKeyTerms: recipe.name.toString().toLowerCase().trim().split(" "), // For search
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Recipe {
    const data = snapshot.data()!;
    return new Recipe(
      data.name,
      data.author,
      data.userId,
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
