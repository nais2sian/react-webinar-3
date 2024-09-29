import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function PageLayout({ head, footer, children, menu }) {
  const cn = bem('PageLayout');

  return (
    <div className={cn()}>
      <div className={cn('menu')}>{menu}</div>
      <div className={cn('head')}>{head}</div>
      <div className={cn('center')}>{children}</div>
      <div className={cn('footer')}>{footer}</div>
    </div>
  );
}

PageLayout.propTypes = {
  head: PropTypes.node,
  footer: PropTypes.node,
  children: PropTypes.node,
  menu: PropTypes.node,
};

export default memo(PageLayout);
