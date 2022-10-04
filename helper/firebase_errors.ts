/**
 * Get UX friendly error message from Firebase code
 *
 * @param code - The Firebase error code string
 * @returns A human readable error string corresponding to the `code` param. Returns "Something went wrong" if no corresponding error message.
 */
export const readableFromCode = (code: string): string => {
  let message = firebaseErrors[code];
  return message ? message : "Something went wrong";
};

export interface IHash {
  [index: string]: string;
}

export const firebaseErrors: IHash = {
  "auth/invalid-email": "Invalid email",
  "auth/internal-error": "Something went wrong",
  "auth/weak-password": "The password must be at least 6 characters long",
  "auth/wrong-password": "Wrong password",
  "auth/email-already-in-use": "Email already in use",
};
