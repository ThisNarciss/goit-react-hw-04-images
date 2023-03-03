import styled from 'styled-components';

export const AppBox = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
  justify-content: center;
`;

export const Error = styled.p`
  border: 1px solid red;
  border-radius: 4px;
  padding: 30px 50px;
  color: red;
  font-size: 26px;
  text-align: center;
  width: 400px;
  margin: 0 auto;
`;
