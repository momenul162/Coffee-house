import React, { cloneElement, isValidElement } from "react";
import { css, keyframes } from "@emotion/react";
import { styled } from "@mui/joy/styles";

const waveKeyframe = keyframes`
  0% {
    transform: translateX(-100%);
  }

  50% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`;

const SkeletonRoot = styled("span")(
  { height: "100%", width: "100%" },
  ({ theme, ownerState }) => css`
    display: ${ownerState.inline ? "inline" : "block"};
    position: ${ownerState.overlay ? "absolute" : ownerState.inline ? "initial" : "relative"};
    overflow: hidden;
    cursor: default;
    pointer-events: none;

    & > * {
      visibility: hidden;
    }

    &::before,
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
    }

    &::before {
      z-index: 9;
      border-radius: ${theme.vars.radius.xs};
      background: ${theme.vars.palette.background.level2};
      width: 100%;
    }

    -webkit-mask-image: -webkit-radial-gradient(white, black);

    &::after {
      animation: ${waveKeyframe} 1.6s linear 0.5s infinite;
      background: linear-gradient(90deg, transparent, rgba(0 0 0 / 0.08), transparent);
      transform: translateX(-100%);
      z-index: 10;
    }
  `
);

export default function Skeleton({ overlay, hidden, inline, children, ...props }) {
  const ownerState = { overlay, hidden, inline, ...props };
  if (hidden) {
    return <>{isValidElement(children) ? cloneElement(children, props) : children}</>;
  }
  return (
    <SkeletonRoot ownerState={ownerState} {...props}>
      {children}
    </SkeletonRoot>
  );
}
