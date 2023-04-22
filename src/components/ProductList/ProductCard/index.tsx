import { StyledProductCard } from "./style";
import { StyledButton } from "../../../styles/button";
import { StyledParagraph, StyledTitle } from "../../../styles/typography";
import { useContext } from "react";
import { CartContext } from "../../../contexts/CartContext";

interface IProductCardProps {
  id: number;
  img: string;
  name: string;
  category: string;
  price: number;
}

const ProductCard = ({ id, img, name, category, price }: IProductCardProps) => {
  const { addToCart } = useContext(CartContext);
  const currency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <StyledProductCard>
      <div className="imageBox">
        <img src={img} alt={name} />
      </div>
      <div className="content">
        <StyledTitle tag="h3" $fontSize="three">
          {name}
        </StyledTitle>
        <StyledParagraph className="category">{category}</StyledParagraph>
        <StyledParagraph className="price">
          {currency.format(price)}
        </StyledParagraph>
        <StyledButton
          $buttonSize="medium"
          $buttonStyle="green"
          onClick={() => {
            addToCart(id);
          }}
        >
          Adicionar
        </StyledButton>
      </div>
    </StyledProductCard>
  );
};

export default ProductCard;
