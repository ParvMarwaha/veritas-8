import React from 'react';
import Link from 'next/link';

type Variant = 'light' | 'dark' | 'accent' | 'text' | 'brand' | 'outline';

interface BaseProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

type ButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

/** Pass `href` and the button renders as a real link (page link via next/link, "#id" as a plain anchor). */
type LinkProps = BaseProps & {
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  'aria-label'?: string;
};

export type AnimatedButtonProps = ButtonProps | LinkProps;

export const AnimatedButton: React.FC<AnimatedButtonProps> = (props) => {
  const { children, variant = 'light', className = '', ...rest } = props;
  const classes = `custom-btn custom-btn-${variant} font-sans font-medium tracking-tight text-[14px] ${className}`;
  const label = (
    <>
      <span className="btn-text-1">{children}</span>
      <span className="btn-text-2" aria-hidden="true">{children}</span>
    </>
  );

  if (typeof rest.href === 'string') {
    const { href, ...anchorProps } = rest as Omit<LinkProps, keyof BaseProps>;
    return href.startsWith('#') ? (
      <a href={href} className={classes} {...anchorProps}>{label}</a>
    ) : (
      <Link href={href} className={classes} {...anchorProps}>{label}</Link>
    );
  }

  return (
    <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {label}
    </button>
  );
};
