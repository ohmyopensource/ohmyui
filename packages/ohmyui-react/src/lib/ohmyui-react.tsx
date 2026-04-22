import styles from './ohmyui-react.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  label?: string;
  onClick?: () => void;
}

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  label = '',
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`${styles['ohmyui-btn']} ${styles[`ohmyui-btn--${variant}`]} ${styles[`ohmyui-btn--${size}`]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
