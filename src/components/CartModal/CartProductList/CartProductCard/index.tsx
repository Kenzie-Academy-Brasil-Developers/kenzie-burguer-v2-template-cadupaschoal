import { MdDelete } from "react-icons/md";

import { StyledCartProductCard } from "./style";
import { StyledTitle } from "../../../../styles/typography";
import { useContext } from "react";
import { CartContext } from "../../../../contexts/CartContext";

interface ICartProductCardProps {
  id: number;
  img: string;
  name: string;
}

const CartProductCard = ({ id, img, name }: ICartProductCardProps) => {
  const { removeToCart } = useContext(CartContext);
  return (
    <StyledCartProductCard>
      <div className="imageBox">
        <img src={img} alt={name} />
      </div>
      <div className="contentBox">
        <StyledTitle tag="h3" $fontSize="three">
          {name}
        </StyledTitle>
        <button
          type="button"
          aria-label="Remover"
          onClick={() => removeToCart(id)}
        >
          <MdDelete size={24} />
        </button>
      </div>
    </StyledCartProductCard>
  );
};

export default CartProductCard;
