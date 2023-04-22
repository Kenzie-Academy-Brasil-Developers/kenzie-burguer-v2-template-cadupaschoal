import { StyledLoginPage } from "./style";
import LoginForm from "../../components/Form/LoginForm";
import IllustrationBox from "../../components/IllustrationBox";

import { StyledButtonLink } from "../../styles/button";
import { StyledContainer, StyledGridBox } from "../../styles/grid";
import { StyledParagraph, StyledTitle } from "../../styles/typography";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const LoginPage = () => {
  const token = localStorage.getItem("@TOKEN-hamburgueria");
  const userId = localStorage.getItem("@USERID-hamburgueria");

  const { userAutoLogin } = useContext(UserContext);

  if (token && userId) {
    userAutoLogin(token, userId);
  }

  return (
    <StyledLoginPage>
      <StyledContainer>
        <div className="flexGrid">
          <div className="left">
            <StyledGridBox className="formBox">
              <StyledTitle tag="h2" $fontSize="three">
                Login
              </StyledTitle>
              <LoginForm />
              <StyledParagraph textAlign="center" fontColor="gray">
                Crie sua conta para saborear muitas delícias e matar sua fome!
              </StyledParagraph>
              <StyledButtonLink
                to="/register"
                $buttonSize="default"
                $buttonStyle="gray"
              >
                Cadastrar
              </StyledButtonLink>
            </StyledGridBox>
          </div>
          <div className="right">
            <IllustrationBox />
          </div>
        </div>
      </StyledContainer>
    </StyledLoginPage>
  );
};

export default LoginPage;
