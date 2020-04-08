import styled from "@emotion/styled";

export const Formulario =styled.form`
  max-width: 600px;
  width: 95%;
  margin: 5rem auto 0 auto;
  
  fieldset {
    margin: 2rem 0;
    border: 1px solid var(--gris3);
    font-size: 1.5rem;
    border-radius: 5px;
    // padding: 2rem;
  }
  
  legend {
    padding: 1rem;
    text-transform: uppercase;
    font-size: 2rem;
  }
  
`;

export const Campo = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  
  label {
    flex: 0 0 150px;
    font-size: 1.8rem;
  }
  
  input, textarea {
    flex: 1;
    padding: 1rem;
    border-radius: 5px;
  }
  
  textarea{
    height: 100px;
  }
  
`;

export const InputSubmit = styled.input`
  background-color: var(--naranja);
  width: 100%;
  padding: 1.5rem;
  text-align: center;
  color: white;
  font-size: 1.8rem;
  text-transform: uppercase;
  border: none;
  font-family: 'PT Sans', sans-serif;
  font-weight: 700;
  border-radius: 5px;
  
  &:hover{
    cursor: pointer;
  }
`;

export const Error = styled.p`
  background-color: red;
  padding: 1rem;
  font-family: 'PT Sans', sans-serif;
  font-weight: 700;
  font-size: 1.4rem;
  color: white;
  text-align: center;
  text-transform: uppercase;
  margin: 2rem 0;
  border-radius: 5px;
`;

