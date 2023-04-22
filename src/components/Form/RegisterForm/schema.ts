import { z } from "zod";

export const registerSchema = z
  .object({
    email: z
      .string()
      .nonempty("O email é obrigatório")
      .email("Insira um email válido"),
    password: z
      .string()
      .nonempty("A senha é obrigatória")
      .min(7, "A senha deve conter ao menos 7 caracteres")
      .regex(
        new RegExp(".*[A-Z].*"),
        "A senha deve conter ao menos uma letra maiúscula"
      )
      .regex(
        new RegExp(".*[a-z].*"),
        "A senha deve conter ao menos uma letra minúscula"
      )
      .regex(new RegExp(".*\\d.*"), "A senha deve conter ao menos um número")
      .regex(
        new RegExp(".*[!@#$%^&*-].*"),
        "A senha deve conter ao menos um caractere especial"
      ),
    confirmPassword: z
      .string()
      .nonempty("A confirmação de senha é obrigatória"),
    name: z.string().nonempty("O nome é obrigatório"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "As senhas não são iguais, tente novamente",
    path: ["confirmPassword"],
  });

export type TRegisterFormValues = z.infer<typeof registerSchema>;
