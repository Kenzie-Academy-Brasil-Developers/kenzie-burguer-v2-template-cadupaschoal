import { createContext, useEffect, useState } from "react";
import { api } from "../../api/api";

export const CartContext = createContext({} as ICartContext);

interface ICartContextProps {
  children: React.ReactNode;
}

interface ICartContext {
  listProducts: ILoadProducts[];
  setListProducts: React.Dispatch<React.SetStateAction<ILoadProducts[]>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cartList: any;
  setCartList: React.Dispatch<any>;
  addToCart: (productId: number) => void;
  removeToCart: (productId: number) => void;
  cartTotal: number;
  setCartTotal: React.Dispatch<React.SetStateAction<number>>;
  removeAll: () => void;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  search: (value: string) => void;
}

export interface ILoadProducts {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

export const CartProvider = ({ children }: ICartContextProps) => {
  const [listProducts, setListProducts] = useState<ILoadProducts[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [cartList, setCartList] = useState<any>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("@TOKEN-hamburgueria");
    const loadProducts = async () => {
      try {
        const response = await api.get("/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        //console.log(response.data); // -> Fazer tost
        setListProducts(response.data);
      } catch (error) {
        console.log(error); // -> Fazer tost
      }
    };

    loadProducts();
  }, []);

  const addToCart = (productId: number) => {
    const newCartProduct = listProducts.find(
      (product) => product.id === productId
    );
    setCartList([newCartProduct, ...cartList]);
    console.log(cartList);
  };

  const removeToCart = (productId: number) => {
    const newList = cartList.filter(
      (product: ILoadProducts) => product.id !== productId
    );
    setCartList(newList);
  };

  const removeAll = () => {
    setCartList([]);
    console.log(cartList);
  };
  console.log(cartTotal);

  useEffect(() => {
    const totalPrice = () => {
      const allProductsPrice = cartList.map((product: ILoadProducts) => {
        return product.price;
      });
      const finalBalance = allProductsPrice.reduce(
        (accumulator: number, currentValue: number) => {
          return accumulator + currentValue;
        },
        0
      );

      setCartTotal(finalBalance);
    };
    console.log(cartList);
    totalPrice();
  }, [cartList]);

  const search = (value: string) => {
    const newList = listProducts.filter((product) => {
      const formatName = product.name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

      const formatCategory = product.category
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
      const condiction =
        formatName.includes(
          value
            .trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        ) ||
        formatCategory.toLowerCase().includes(
          value
            .trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        );

      if (condiction) {
        return product;
      }
    });

    if (newList.length === 0) {
      console.log("Nenhum item correspondente a pesquisa");
    } else {
      setListProducts(newList);
    }
  };

  return (
    <CartContext.Provider
      value={{
        listProducts,
        setListProducts,
        isOpen,
        setIsOpen,
        cartList,
        setCartList,
        addToCart,
        removeToCart,
        cartTotal,
        setCartTotal,
        removeAll,
        searchInput,
        setSearchInput,
        search,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
