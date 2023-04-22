import { StyledButton } from "../../../styles/button";
import { StyledForm } from "../../../styles/form";
import Input from "../Input";
import { LoginSchema } from "./schema";
import { useForm } from "react-hook-form";
import { TLoginFormValues } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler } from "react-hook-form";
import { UserContext } from "../../../contexts/UserContext";
import { useContext } from "react";

const LoginForm = () => {
  const { userLogin } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormValues>({
    resolver: zodResolver(LoginSchema),
  });

  return (
    <StyledForm onSubmit={handleSubmit(userLogin)}>
      <Input
        id="login"
        label="E-mail"
        type="text"
        {...register("email")}
        error={errors.email}
      />
      <Input
        id="senha"
        label="Senha"
        type="password"
        {...register("password")}
        error={errors.password}
      />
      <StyledButton $buttonSize="default" $buttonStyle="green" type="submit">
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
