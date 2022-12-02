import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 1100px;
  margin-top: 40px;
  background: #f2f3f8;
  border-radius: 10px;
  border: 2px solid #1b69ee;
  padding: 20px;
  box-shadow: 0px 0px 10px 0px rgba(1, 1, 1, 1);
  text-align: center;

  .question {
    font-size: 2rem;
  }

  p {
    font-size: 1.125rem;
  }

  @media only screen and (max-width: 768px) {
    width: 75%;
  }
`;

type ButtonWrapperProps = {
  correct: boolean;
  userClicked: boolean;
};

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  transition: all 0.3s ease;

  :hover {
    opacity: 0.6;
  }

  button {
    cursor: pointer;
    user-select: none;
    font-size: 0.8rem;
    width: 100%;
    height: 40px;
    margin: 5px 0;
    background: ${({ correct, userClicked }) =>
      correct
        ? 'linear-gradient(180deg, #2bce54, #53d583)'
        : !correct && userClicked
        ? 'linear-gradient(180deg, #f63543, #9e4e73)'
        : 'linear-gradient(360deg, #4b69ff, #5b8bfc)'};
    border: 3px solid #ffffff;
    box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    color: #fff;
    text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);
  }
`;
