import { createContext } from "react";
import { api } from "../../api/api";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { TLoginFormValues } from "../../components/Form/LoginForm/schema";
import { TRegisterFormValues } from "../../components/Form/RegisterForm/schema";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const UserContext = createContext({} as IUserContext);

//Context
interface IUserProviderProps {
  children: React.ReactNode;
}

interface IUserContext {
  userLogin: (data: TLoginFormValues) => void;
  userAutoLogin: (token: string, userId: string) => Promise<void>;
  userRegister: (data: TRegisterFormValues) => void;
  userLogout: () => void;
  user: {} | IResponse;
  setUser: React.Dispatch<React.SetStateAction<{} | IResponse>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

//Response
interface IResponse {
  accessToken: string;
  user: IUser;
}

interface IUser {
  id: string;
  name: string;
  email: string;
}

//Register
interface IRegister {
  email: string;
  password: string;
  name: string;
}

//Login
interface ILogin {
  email: string;
  password: string;
}

//Load Products

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [user, setUser] = useState<IResponse | {}>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userRegister: SubmitHandler<TRegisterFormValues> = async (
    data: IRegister
  ) => {
    try {
      setLoading(true);
      const response = await api.post<IResponse>("/users", data);
      toast.success("Conta criada com sucesso");
      setTimeout(() => {
        navigate("/");
      }, 2300);
    } catch (error: any) {
      if (error.response.data === "Email already exists") {
        toast.error("Este e-mail já está vinculado a uma conta");
      } else {
        toast.error(
          "Algo deu errado, verifique as informações e tente novamente"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const userLogin: SubmitHandler<TLoginFormValues> = async (data: ILogin) => {
    try {
      setLoading(true);
      const response = await api.post<IResponse>("/login", data);
      setUser(response.data);
      localStorage.setItem("@TOKEN-hamburgueria", response.data.accessToken);
      localStorage.setItem("@USERID-hamburgueria", response.data.user.id);
      navigate("/shop");
    } catch (error) {
      toast.error("Senha ou e-mail incorretos");
    } finally {
      setLoading(false);
    }
  };

  const userAutoLogin = async (token: string, userId: string) => {
    try {
      const response = await api.get<IUser>(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        navigate("/shop");
      }
    } catch (error) {}
  };

  const userLogout = () => {
    localStorage.removeItem("@TOKEN-hamburgueria");
    localStorage.removeItem("@USERID-hamburgueria");
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{
        userLogin,
        userAutoLogin,
        userRegister,
        userLogout,
        user,
        setUser,
        loading,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
