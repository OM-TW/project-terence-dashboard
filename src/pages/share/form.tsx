import { Context } from '@/settings/constant';
import { ActionType, AlertType, IReactProps } from '@/settings/type';
import { memo, useContext } from 'react';
import { TType } from '../../../setting';

export type TSubmitType = Omit<Extract<TType, { session: string }>, 'timestamp' | 'html'>;

type T = IReactProps & {
  submit: (data: TSubmitType) => void;
  reset: () => void;
};

const Form = memo(({ children, submit, reset }: T) => {
  const [, setContext] = useContext(Context);

  const onError = (message: string) => {
    setContext({
      type: ActionType.Alert,
      state: { enabled: true, body: `${message} 欄位不可留白`, type: AlertType.Error },
    });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.delete('tab');
    const data = [...formData];

    const [session] = data
      .filter(([key]) => key.startsWith('session'))
      .map(([, value]) => value.toString());

    if (session === undefined) {
      onError('紅領帶屆數');
      reset();
      return;
    }

    const [name] = data
      .filter(([key]) => key.startsWith('name'))
      .map(([, value]) => value.toString());

    if (name === '') {
      onError('中文姓名');
      reset();
      return;
    }

    const [engName] = data
      .filter(([key]) => key.startsWith('engName'))
      .map(([, value]) => value.toString());

    if (engName === '') {
      onError('英文姓名');
      reset();
      return;
    }

    const currentData = {
      session,
      name,
      engName,
    };

    submit(currentData);
  };

  return (
    <form onSubmit={onSubmit} className='w-full'>
      {children}
    </form>
  );
});
export default Form;
