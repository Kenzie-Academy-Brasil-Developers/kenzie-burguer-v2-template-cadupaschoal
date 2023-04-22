import { useContext } from "react";
import ProductCard from "./ProductCard";
import { StyledProductList } from "./style";
import { CartContext } from "../../contexts/CartContext";

const ProductList = () => {
  const { listProducts } = useContext(CartContext);
  return (
    <StyledProductList>
      {listProducts.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          img={product.img}
          name={product.name}
          category={product.category}
          price={product.price}
        />
      ))}
    </StyledProductList>
  );
};

export default ProductList;
