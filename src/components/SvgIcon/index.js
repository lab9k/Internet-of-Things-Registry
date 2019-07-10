import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSvgIcon = styled.svg`
  display: inline-block;
`;

/**
 * Component that will render an inline-block `<svg>` element
 */
const SvgIcon = ({ size, children, title, ...props }) => (
  <StyledSvgIcon
    width={size}
    height={size}
    {...props}
    fill="currentColor"
    aria-hidden="true"
    role="img"
    focusable="false" // https://simplyaccessible.com/article/7-solutions-svgs/
  >
    {title && <title>{title}</title>}
    {children}
  </StyledSvgIcon>
);

SvgIcon.defaultProps = {
  size: 24,
  title: '',
  viewBox: '0 0 24 24'
};

SvgIcon.propTypes = {
  /**
   * Animation, descriptive, shape, structural, gradient, ... elements
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg
   */
  children: PropTypes.node.isRequired,
  /** Width and height value in pixels */
  size: PropTypes.number,
  /** SVG icon title; some browsers show it as tooltip on element hover */
  title: PropTypes.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an svg element. For example, if the SVG
   * element is 500 (width) by 200 (height), and you pass viewBox="0 0 50 20", this means that the coordinates inside
   * the svg will go from the top left corner (0,0) to bottom right (50,20) and each unit will be worth 10px.
   */
  viewBox: PropTypes.string
};

export default SvgIcon;
