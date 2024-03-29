import { MdClose } from "react-icons/md";
import CartProductList from "./CartProductList";
import { useContext } from "react";
import { StyledCartModalBox } from "./style";
import { StyledParagraph, StyledTitle } from "../../styles/typography";
import { CartContext } from "../../contexts/CartContext";

const CartModal = () => {
  const { isOpen, setIsOpen, cartList } = useContext(CartContext);

  return isOpen ? (
    <StyledCartModalBox>
      <dialog>
        <header>
          <StyledTitle tag="h2" $fontSize="three">
            Carrinho de compras
          </StyledTitle>
          <button
            type="button"
            aria-label="Fechar"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <MdClose size={21} />
          </button>
        </header>
        <div className="cartBox">
          {cartList.length > 0 ? (
            <CartProductList />
          ) : (
            <div className="emptyBox">
              <StyledTitle tag="h3" $fontSize="three" textAlign="center">
                Sua sacola está vazia
              </StyledTitle>
              <StyledParagraph textAlign="center">
                Adicione itens
              </StyledParagraph>
            </div>
          )}
        </div>
      </dialog>
    </StyledCartModalBox>
  ) : null;
};

export default CartModal;
