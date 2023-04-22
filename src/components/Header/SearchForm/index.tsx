import { MdSearch } from "react-icons/md";
import { StyledSearchForm } from "./style";
import { StyledButton } from "../../../styles/button";
import { useContext } from "react";
import { CartContext } from "../../../contexts/CartContext";

const SearchForm = () => {
  const { searchInput, setSearchInput, search } = useContext(CartContext);
  const submit = (event: any) => {
    event.preventDefault();
    search(searchInput);
    console.log(searchInput);
  };

  return (
    <StyledSearchForm onSubmit={submit}>
      <input
        value={searchInput}
        type="text"
        placeholder="Digitar pesquisa"
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <StyledButton type="submit" $buttonSize="medium" $buttonStyle="green">
        <MdSearch />
      </StyledButton>
    </StyledSearchForm>
  );
};

export default SearchForm;
