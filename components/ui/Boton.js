import styled from "@emotion/styled";

const Boton = styled.a`
    display: block;
    font-weight: 700;
    text-transform: uppercase;
    border: 1px solid #1d1d1d;
    padding: .8rem 2rem;
    margin: 2rem auto;
    text-align: center;
    background-color: ${props => props.bgColor ? '#da552f' : 'white'};
    color: ${props => props.bgColor ? 'white' : 'black'};
    border-radius: 5px;
    
    &:last-of-type{
        margin-right: 0;
    }
    
    &:hover{
        cursor: pointer;
    }
`;

export default Boton;
