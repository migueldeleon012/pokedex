import styled, {keyframes}from "styled-components"

const changeWidth = (width) => keyframes`
  0% {
    width: 0
  }
  100% {
    width: calc(${width} / 255 * 100%);
  }
`

const Bar = styled.div`
  animation : ${props => changeWidth(props.amount)} 500ms ease-in-out forwards;
  height: 100%;
  background: #ec3737;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: white;
  `


export default Bar