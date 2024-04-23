import Block from '@/components/block';
import { memo, useMemo } from 'react';
import { BsCalendar2DateFill } from 'react-icons/bs';
import { TType } from '../../../setting';

const General = memo(({ data }: { data: Extract<TType, { oral: string }> | null }) => {
  const currentData = useMemo(() => data?.general, [data]);
  return (
    <div className='w-full space-y-5'>
      <Block>
        <h4 className='flex flex-nowrap items-center justify-start'>
          <BsCalendar2DateFill className='mr-1' />
          申請期間
        </h4>
        <div className='join w-full'>
          <input
            name='general'
            className='input join-item input-bordered w-full'
            placeholder='2024/2/15至2024/3/26'
            defaultValue={currentData}
          />
        </div>
      </Block>
    </div>
  );
});
export default General;
