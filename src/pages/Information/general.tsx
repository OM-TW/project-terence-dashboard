import Block from '@/components/block';
import { memo } from 'react';
import { BsCalendar2DateFill } from 'react-icons/bs';
import './index.less';

const General = memo(() => (
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
        />
      </div>
    </Block>
  </div>
));
export default General;
