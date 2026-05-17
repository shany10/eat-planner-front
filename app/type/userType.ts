import { z } from "zod";

type Issues = {
  expected: string;
  code: string;
  path: string[];
  message: string;
};

export const createUserBody = z.object({
  firstname: z
    .string()
    .min(1, "firstname requis")
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ'\-\s]+$/, "Pas de chiffres dans firstname"),
  lastname: z
    .string()
    .min(1, "lastname requis")
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ'\-\s]+$/, "Pas de chiffres dans lastname"),
  email: z.email("email invalide"),
  number: z.string().min(7, "Numéro invalide"),
  password: z.string().min(8, "mot de passe trop court"),
});

export interface UserLoginType {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: "admin" | "manager";
}

export interface UserLoginErrorType {
  error: string;
  issues: Issues[];
}

export type CreateUserInput = z.infer<typeof createUserBody>;
