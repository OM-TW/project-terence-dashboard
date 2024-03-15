import { memo, useContext, useEffect, useState } from 'react';
import './index.less';
import Button from '../button';
import { IoMdClose } from 'react-icons/io';
import { Context } from '@/settings/constant';
import { ActionType, IAction, IReactProps, TransitionType } from '@/settings/type';
import useTween, { Bezier } from 'lesca-use-tween';
import OnloadProvider from 'lesca-react-onload';

type T = IReactProps & {
  title: string;
  button: { label: string; onClick: () => void } | undefined;
  transition: TransitionType;
  setTransition: React.Dispatch<React.SetStateAction<TransitionType>>;
  setContext: React.Dispatch<IAction>;
};

const Container = memo(({ title, transition, button, children, setTransition, setContext }: T) => {
  const [style, setStyle] = useTween({ y: window.innerHeight });

  useEffect(() => {
    if (transition === TransitionType.FadeIn) {
      setStyle({ y: 0 }, { duration: 500, easing: Bezier.inOutQuart });
    } else if (transition === TransitionType.FadeOut) {
      setStyle(
        { y: window.innerHeight },
        {
          duration: 500,
          easing: Bezier.inOutQuart,
          onEnd: () => {
            setContext({ type: ActionType.Dialog, state: { enabled: false } });
          },
        },
      );
    }
  }, [transition]);

  return (
    <div className='Dialog' style={style}>
      <div className='flex w-full select-none items-center justify-between bg-base-200 text-xl'>
        <div className='flex items-center'>
          <Button className='mr-2 h-16 w-16' onClick={() => setTransition(TransitionType.FadeOut)}>
            <IoMdClose className='h-8 w-8' />
          </Button>
          {title}
        </div>
        <div className='mr-5 flex items-center'>
          {button && (
            <Button className='uppercase' onClick={() => button.onClick()}>
              {button.label}
            </Button>
          )}
        </div>
      </div>
      <div className='w-full flex-1 overflow-y-scroll p-5'>{children}</div>
    </div>
  );
});

const Dialog = memo(() => {
  const [context, setContext] = useContext(Context);
  const { title, body, button } = context[ActionType.Dialog];
  const [transition, setTransition] = useState(TransitionType.Unset);

  return (
    <OnloadProvider onload={() => setTransition(TransitionType.FadeIn)}>
      <div className='fixed z-50 h-screen w-full'>
        <Container
          title={title}
          button={button}
          transition={transition}
          setTransition={setTransition}
          setContext={setContext}
        >
          {body || ''}
        </Container>
      </div>
    </OnloadProvider>
  );
});
export default Dialog;
