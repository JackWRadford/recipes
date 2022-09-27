import {
  DocumentData,
  QueryDocumentSnapshot,
  WithFieldValue,
} from "firebase/firestore/lite";

class Recipe {
  constructor(
    readonly name: string,
    readonly description: string,
    readonly cookTime: number
  ) {}
}

const recipeConverter = {
  toFirestore(recipe: WithFieldValue<Recipe>): DocumentData {
    return {
      name: recipe.name,
      description: recipe.description,
      cookTime: recipe.cookTime,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Recipe {
    const data = snapshot.data()!;
    return new Recipe(data.title, data.description, data.cookTime);
  },
};

export { Recipe, recipeConverter };
