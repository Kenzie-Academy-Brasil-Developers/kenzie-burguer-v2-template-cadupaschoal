import { createContext } from "react";
import { api } from "../../api/api";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { TLoginFormValues } from "../../components/Form/LoginForm/schema";
import { TRegisterFormValues } from "../../components/Form/RegisterForm/schema";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const userRegister: SubmitHandler<TRegisterFormValues> = async (
    data: IRegister
  ) => {
    try {
      const response = await api.post<IResponse>("/users", data);
      console.log(response.data);
      setTimeout(() => {
        navigate("/");
      }, 2300);
    } catch (error) {
      console.log(error);
    }
  };

  const userLogin: SubmitHandler<TLoginFormValues> = async (data: ILogin) => {
    try {
      const response = await api.post<IResponse>("/login", data);
      console.log(response.data);
      setUser(response.data);
      localStorage.setItem("@TOKEN-hamburgueria", response.data.accessToken);
      localStorage.setItem("@USERID-hamburgueria", response.data.user.id);
      navigate("/shop"); // -> criar toast de sucesso
    } catch (error) {
      console.log(error); // -> criar toast de erro
    }
  };

  const userAutoLogin = async (token: string, userId: string) => {
    try {
      const response = await api.get<IUser>(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response.status === 200) {
        navigate("/shop");
      }
    } catch (error) {
      console.log(error);
    }
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
