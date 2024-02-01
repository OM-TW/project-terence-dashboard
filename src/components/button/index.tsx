import { IReactProps } from '@/settings/type';
import { ReadyOnly } from '@/settings/type-unity';
import { twMerge } from 'tailwind-merge';

type TRegularProps = IReactProps &
  ReadyOnly<{
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset' | undefined;
  }>;

const Button = ({ children, className = '', onClick, type = 'button' }: TRegularProps) => {
  return (
    <button type={type} className={twMerge('btn', className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
