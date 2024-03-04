import Block from '@/components/block';
import { memo, useMemo } from 'react';
import { BsCalendar2DateFill } from 'react-icons/bs';
import { TType } from '../../../setting';

const Oral = memo(({ data }: { data: Extract<TType, { contacts: string }> | null }) => {
  const currentData = useMemo(() => {
    return data?.oral.split(',');
  }, [data]);
  return (
    <div className='w-full space-y-5'>
      <Block>
        <h4 className='flex flex-nowrap items-center justify-start'>
          <BsCalendar2DateFill className='mr-1' />
          口試公布日期
        </h4>
        <div className='join w-full'>
          <input
            name='oral-publish-date'
            className='input join-item input-bordered w-full'
            placeholder='2024/4/22'
            defaultValue={currentData?.[0] || ''}
          />
        </div>
      </Block>
      <Block>
        <h4 className='flex flex-nowrap items-center justify-start'>
          <BsCalendar2DateFill className='mr-1' />
          口試日期
        </h4>
        <div className='join w-full'>
          <input
            name='oral-date'
            className='input join-item input-bordered w-full'
            placeholder='2024/4/13'
            defaultValue={currentData?.[1] || ''}
          />
        </div>
      </Block>
    </div>
  );
});
export default Oral;
