import Block from '@/components/block';
import { memo } from 'react';
import { BsCalendar2DateFill } from 'react-icons/bs';
import './index.less';

const Written = memo(() => (
  <div className='w-full space-y-5'>
    <Block>
      <h4 className='flex flex-nowrap items-center justify-start'>
        <BsCalendar2DateFill className='mr-1' />
        筆試日期
      </h4>
      <div className='join w-full'>
        <input
          name='written-date'
          className='input join-item input-bordered w-full'
          placeholder='2024/3/29 18:00-21:00'
        />
      </div>
    </Block>
  </div>
));
export default Written;
