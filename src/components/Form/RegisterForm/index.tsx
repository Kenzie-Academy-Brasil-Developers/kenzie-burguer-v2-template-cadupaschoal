import Input from "../Input";
import { StyledButton } from "../../../styles/button";
import { StyledForm } from "../../../styles/form";
import { useForm } from "react-hook-form";
import { TRegisterFormValues } from "./schema";
import { registerSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

const RegisterForm = () => {
  const { userRegister } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <StyledForm onSubmit={handleSubmit(userRegister)} noValidate>
      <Input
        id="name"
        type="text"
        {...register("name")}
        label="Nome"
        error={errors.name}
      />
      <Input
        id="email"
        type="email"
        {...register("email")}
        label="E-mail"
        error={errors.email}
      />
      <Input
        id="passwors"
        type="password"
        {...register("password")}
        label="Senha"
        error={errors.password}
      />
      <Input
        id="confirmPassword"
        type="password"
        {...register("confirmPassword")}
        label="Confirmar senha"
        error={errors.confirmPassword}
      />
      <StyledButton $buttonSize="default" $buttonStyle="gray" type="submit">
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
