import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { isDarkBackground, color, space } from './Utils';
import Check from "./Check";
export const Btn = styled.button`
  position: relative;
  color: ${props => isDarkBackground(props.color) ? color.white : color.black};
  outline: none;
  font-family: inherit;
  display: inline-block;
  text-decoration: none;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  transition: 0.2s all ease;
  background-color: ${props => props.color ? color[props.color] : color.blue};
  font-size: 16px;
  padding: ${space[2] + 'px'} ${space[3] + 'px'};
  ${props => props.size === "lg" && css`
    font-size: 18px;
    padding: ${space[2] + 4 + 'px'} ${space[4]+ 'px'};
  `}
  ${props => props.size === "sm" && css`
    font-size: 14px;
    padding: ${space[1] + 'px'} ${space[2] + 'px'};
  `}
  &:hover {
    cursor: pointer;
    border-radius: 4px;
  }
`

const flash = keyframes`
  0%   { opacity: 1 }
  100% { opacity: 0.4 }
`;

const dash = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`;

const fadeIn = keyframes`
  from {
    opacity:0;
    transform: translateY(10px)
  }
  to {
    opacity:1;
    transform: translateY(0)
  }
`;

const Dot = styled.div`
  border-radius: 10px;
  height: 8px;
  width: 8px;
  background-color: black;
  display: inline-block;
  margin: 0 4px;
  animation: ${flash} .4s infinite;
  animation-direction: alternate;
  animation-delay: ${props => props.index / 10}s;
`

const DotContainer = styled.div`
  position: absolute;
  top: calc(50% - 11px);
  left: calc(50% - 32px);
`

const CompletedContainer = styled.div`
  position: absolute;
  left: 0;
  top: 15px;
  width: 100%;
`

const CompletedIcon = styled.span`
  display: inline-block;
  transform: translateX(-5px);
  animation-delay: 0.3s;

  & polyline {
    stroke-dasharray: 18;
    stroke-dashoffset: 18;
    animation: ${dash} 0.5s ease forwards;
  }
`

const CompletedText = styled.span`
  display: inline-block;
  animation: ${fadeIn} 0.5s ease-out;
`


export function BtnLoading(props) {
  const [state, setState] = useState("default");
  return (
    <Btn
      onClick={() => {
        setState("loading")
        setTimeout(() => {
          setState("completed")
        }, 3000)
      }}
      color={state === 'completed' ? 'green' : 'blue'}
    >
      {state === "loading" || state === "completed" ? (
        <div>
          <span style={{opacity: 0}}>{props.children}</span>
            {state === "completed" ? (
              <CompletedContainer>
                <CompletedIcon>
                  <Check />
                </CompletedIcon>
                <CompletedText>
                  Done
                </CompletedText>
              </CompletedContainer>
            ) : (
              <DotContainer>
                {[0,1,2,3].map((d, i) => (
                    <Dot key={d} index={i}/>
                  ))}
              </DotContainer>
            )
            }

        </div>
      ) : props.children}
  </Btn>
  );
}
