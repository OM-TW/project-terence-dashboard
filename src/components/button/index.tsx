import { IReactProps, IRefObject } from '@/settings/type';
import { ReadyOnly } from '@/settings/type-unity';
import { twMerge } from 'tailwind-merge';
import { Ref, forwardRef, useImperativeHandle, useRef } from 'react';

type TRegularProps = IReactProps &
  ReadyOnly<{
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset' | undefined;
    disabled?: boolean;
  }>;

const Button = forwardRef((props: TRegularProps, ref: Ref<IRefObject>) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useImperativeHandle(ref, () => ({
    target: buttonRef.current,
  }));

  return (
    <button
      ref={buttonRef}
      type={props.type}
      className={twMerge('btn', props.className)}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
});

export default Button;
