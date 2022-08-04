import styled from "styled-components";
export const Spinner = () => {
  return (
    <LoadingSpinnerContainer className="loadingSpinnerContainer">
      <div className="loadingSpinner"></div>
    </LoadingSpinnerContainer>
  );
};
const LoadingSpinnerContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5000;
  display: flex;
  justify-content: center;
  align-items: center;
  .loadingSpinner {
    width: 64px;
    height: 64px;
    border: 8px solid;
    border-color: #000 transparent #555 transparent;
    border-radius: 50%;
    animation: spin 1.2s linear infinite;
  }
`;
