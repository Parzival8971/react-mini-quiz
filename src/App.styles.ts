import styled, { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import BGImage from './images/bg_earth.jpg';

export const GlobalStyle = createGlobalStyle`
${normalize}

html {
  height: 100%;
}

body {
  background-image: url(${BGImage});
  background-position:center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

* {
  font-family: 'Walter Turncoat', cursive; 
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  > p {
    color: #fff;
    text-shadow: #a3a3a3 1px 1px 1px;
  }
  .score {
    color: #fff;
    font-size: 2rem;
    margin: 0;
  }
  h1 {
    background-image: linear-gradient(180deg, #fff, #4b69ff);
    font-weight: 400;
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    filter: drop-shadow(5px 5px #4b69ff);
    font-size: 70px;
    text-align: center;
    margin: 20px;

    @media only screen and (max-width: 768px) {
      font-size: 55px;
    }
  }
  .start,
  .next {
    cursor: pointer;
    background: linear-gradient(180deg, #ffffff, #e9e9ee);
    border: 2px solid #e9e9e9;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 1);
    border-radius: 5px;
    height: 40px;
    margin: 20px 0;
    padding: 0 40px;
  }

  .start {
    max-width: 200px;
  }
`;
