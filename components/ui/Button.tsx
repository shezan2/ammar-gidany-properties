import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "gold" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-full font-medium uppercase tracking-[0.18em] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold whitespace-nowrap";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-canvas hover:bg-gold-bright hover:shadow-[0_8px_32px_rgba(201,169,98,0.35)]",
  outline:
    "border border-gold/50 text-gold hover:border-gold hover:bg-gold/10 hover:text-gold-bright",
  ghost: "text-ink-dim hover:text-cream",
};

const sizes: Record<Size, string> = {
  md: "px-7 py-3 text-[0.7rem]",
  lg: "px-9 py-4 text-xs",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

type ButtonAsLink = CommonProps & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "className"
  >;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className"
  >;

export default function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "gold", size = "md", children, className = "" } = props;
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (props.href !== undefined) {
    const { href, variant: _v, size: _s, className: _c, ...rest } = props;
    const external = href.startsWith("http") || href.startsWith("tel") || href.startsWith("mailto");
    if (external) {
      return (
        <a href={href} className={cls} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, ...rest } = props;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
