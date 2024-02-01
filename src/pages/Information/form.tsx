import { memo, useEffect } from 'react';
import './index.less';
import { IReactProps } from '@/settings/type';

const Form = memo(({ children }: IReactProps) => {
  useEffect(() => {}, []);
  return <form className='w-full'>{children}</form>;
});
export default Form;
