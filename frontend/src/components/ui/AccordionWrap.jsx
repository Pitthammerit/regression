import React from 'react';

/**
 * AccordionWrap - Smooth accordion animation wrapper using CSS Grid
 *
 * Provides smooth expand/collapse animations for dynamic content heights.
 * Uses CSS Grid with grid-template-rows: 0fr → 1fr for reliable animations.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls expanded state (required)
 * @param {string} [props.duration='500ms'] - Animation duration (CSS time value)
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {React.ReactNode} props.children - Content to animate
 *
 * @example
 * ```jsx
 * <AccordionWrap isOpen={isExpanded} duration="300ms">
 *   <div>Dynamic content that smoothly expands/collapses</div>
 * </AccordionWrap>
 * ```
 */
const AccordionWrap = ({
  isOpen,
  duration = '500ms',
  className = '',
  children
}) => {
  return (
    <div
      className={`grid transition-all ease-in-out ${className}`}
      style={{
        transitionDuration: duration,
        gridTemplateRows: isOpen ? '1fr' : '0fr'
      }}
    >
      <div className="overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default AccordionWrap;
