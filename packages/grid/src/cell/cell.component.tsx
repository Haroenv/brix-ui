import React, { useEffect, useMemo, useRef, WeakValidationMap } from 'react';
import PT, { Requireable } from 'prop-types';

import { useDirection } from '@brix-ui/contexts/direction';
import { classNames, intrinsicComponent } from '@brix-ui/utils/functions';
import { breakpointProps, stylableComponent } from '@brix-ui/prop-types/common';
import useBreakpointProps from '@brix-ui/hooks/use-breakpoint-props';
import { useTheme } from '@brix-ui/theme/hooks';
import Flex from '@brix-ui/core/flex';
import { extract } from '@brix-ui/prop-types/utils';
import { useAreaBuilderContext } from '../area-builder';

import type { CellBreakpointProps, CellProps } from './cell.props';
import Styled from './cell.styles';

const Cell = intrinsicComponent<CellProps, HTMLDivElement>(function Cell(
  { children, className, area, size, offset, sm, md, lg, xl, ...props },
  ref
) {
  const { areas, dispatcher } = useAreaBuilderContext();

  const { breakpoints } = useTheme();

  const currentBreakpointProps = useBreakpointProps(
    {
      sm,
      md,
      lg,
      xl,
      size,
      offset,
    },
    breakpoints
  ) as CellBreakpointProps;

  const { current: internalId } = useRef(Math.random().toString(32).slice(2).replace(/\d+/, ''));
  const id = useMemo(() => area || internalId, [area]);

  useEffect(() => {
    dispatcher.mountCell({
      id,
      size: currentBreakpointProps.size,
      offset: Array.isArray(currentBreakpointProps.offset)
        ? currentBreakpointProps.offset
        : [currentBreakpointProps.offset, currentBreakpointProps.offset],
    });
  }, [id]);

  const direction = useDirection();

  return (
    <Styled.Cell
      ref={ref}
      className={classNames('cell', className)}
      areas={areas}
      area={id}
      direction={direction}
      $size={size}
      {...props}
    >
      {children}
    </Styled.Cell>
  );
});

const cellBreakpointData: WeakValidationMap<CellBreakpointProps> = {
  size: PT.number,
  offset: PT.arrayOf(PT.number) as Requireable<CellBreakpointProps['offset']>,
};

Cell.propTypes = {
  area: PT.string,
  ...extract([Flex]),
  ...breakpointProps(cellBreakpointData),

  ...stylableComponent(),
} as WeakValidationMap<CellProps>;

export default Cell;
