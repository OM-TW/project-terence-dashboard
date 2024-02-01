import { memo, useEffect } from 'react';
import './index.less';
import { IReactProps } from '@/settings/type';

const Form = memo(({ children }: IReactProps) => {
  useEffect(() => {}, []);
  const onSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.delete('tab');
    console.log([...formData]);
  };
  return (
    <form onSubmit={onSubmit} className='w-full'>
      {children}
    </form>
  );
});
export default Form;
