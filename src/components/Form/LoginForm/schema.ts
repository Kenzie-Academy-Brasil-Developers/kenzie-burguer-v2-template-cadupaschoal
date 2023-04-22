import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().nonempty("O email é obrigatório"),
  password: z.string().nonempty("A senha é obrigatória"),
});

export type TLoginFormValues = z.infer<typeof LoginSchema>;
