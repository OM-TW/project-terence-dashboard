import { memo, useEffect } from 'react';
import { IReactProps } from '@/settings/type';

const Block = memo(({ children }: IReactProps) => {
  useEffect(() => {}, []);
  return <div className='prose flex w-full max-w-full flex-col'>{children}</div>;
});
export default Block;
