import React from 'react';
import PT from 'prop-types';

import { intrinsicComponent, orUndefined } from '@brix-ui/utils/functions';
import { intentable, stylableComponent } from '@brix-ui/prop-types/common';

import type { StatusProps } from './status.props';
import Styled from './status.styles';

const Status = intrinsicComponent<StatusProps, HTMLSpanElement>(function Status(
  { isStatic, hasBorder = true, ...props },
  ref
) {
  return (
    <Styled.Status ref={ref} role="status" data-static={isStatic} data-has-border={orUndefined(hasBorder)} {...props} />
  );
});

Status.propTypes = {
  isStatic: PT.bool,
  hasBorder: PT.bool,

  ...intentable,
  ...stylableComponent(),
};

export default Status;
