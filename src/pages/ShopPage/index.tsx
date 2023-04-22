import { StyledShopPage } from "./style";
import CartModal from "../../components/CartModal";
import Header from "../../components/Header";
import ProductList from "../../components/ProductList";
import { StyledContainer } from "../../styles/grid";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const ShopPage = () => {
  const {} = useContext(UserContext);
  const token = localStorage.getItem("@TOKEN-hamburgueria");
  const userId = localStorage.getItem("@USERID-hamburgueria");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && !userId) {
      navigate("/");
    }
  }, []);

  return (
    <StyledShopPage>
      <CartModal />
      <Header />
      <main>
        <StyledContainer containerWidth={1300}>
          <ProductList />
        </StyledContainer>
      </main>
    </StyledShopPage>
  );
};

export default ShopPage;
