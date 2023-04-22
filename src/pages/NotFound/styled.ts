import styled from "styled-components";

export const StyledNotFoundContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    font-family: Inter;
    font-size: 30px;
  }

  @media (min-width: 800px) {
    h1 {
      font-size: 72px;
    }
  }

  @media (max-width: 510px) {
    h1 {
      width: 80%;
      margin: 0 auto;
    }
  }
`;
