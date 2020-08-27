import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 0px;
  margin-right: 200px;
  box-shadow: 2px 2px 0 0 #999999;
  background-color: #f6f6f6;
  border: solid 1px #cccccc;
  cursor: pointer;
  z-index: 1010;

  font-family: 'Fira Sans';
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #000000;

  &:hover,
  &:focus {
    background-color: #ccc;
    border-color: #000 !important;
    color: #000 !important;
    fill: #000;
  }

  @media screen and (max-width: 540px) {
    display:none;
  }
`;

export default Wrapper;
