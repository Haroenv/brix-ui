import React from 'react';

import { intrinsicComponent } from '@ustudio-ui/utils/functions';

import { ButtonProps } from './button.props';
import Styled from './button.styles';

const Button = intrinsicComponent<ButtonProps, HTMLButtonElement>(function Button(
  { children, isDisabled, borderRadius, ...props },
  ref
) {
  return (
    <Styled.Button ref={ref} disabled={isDisabled} aria-disabled={isDisabled} $borderRadius={borderRadius} {...props}>
      {children}
    </Styled.Button>
  );
});

export default Button;