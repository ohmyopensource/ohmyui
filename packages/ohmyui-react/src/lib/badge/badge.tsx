import styles from './badge.module.css';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  label?: string;
}

export function Badge({
  variant = 'neutral',
  size = 'md',
  label = '',
}: BadgeProps) {
  return (
    <span
      className={`${styles['ohmyui-badge']} ${styles[`ohmyui-badge--${variant}`]} ${styles[`ohmyui-badge--${size}`]}`}
    >
      {label}
    </span>
  );
}

export default Badge;
