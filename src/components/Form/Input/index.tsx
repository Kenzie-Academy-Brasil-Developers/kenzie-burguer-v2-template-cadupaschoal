import { FieldError } from "react-hook-form";
import { StyledInputContainer } from "../../../styles/form";
import { StyledParagraph } from "../../../styles/typography";
import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

const Input = forwardRef(
  (
    { label, id, error, ...rest }: IInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div>
        <StyledInputContainer>
          <input ref={ref} {...rest} />
          <label htmlFor={id}>{label}</label>
        </StyledInputContainer>
        {error ? (
          <StyledParagraph fontColor="red">{error.message}</StyledParagraph>
        ) : null}
      </div>
    );
  }
);

export default Input;
