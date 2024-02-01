import Block from '@/components/block';
import { memo } from 'react';
import { BsCalendar2DateFill } from 'react-icons/bs';
import './index.less';

const Oral = memo(() => (
  <div className='w-full space-y-5'>
    <Block>
      <h4 className='flex flex-nowrap items-center justify-start'>
        <BsCalendar2DateFill className='mr-1' />
        口試日期
      </h4>
      <div className='join w-full'>
        <input className='input join-item input-bordered w-full' placeholder='2024/4/13' />
      </div>
    </Block>
    <Block>
      <h4 className='flex flex-nowrap items-center justify-start'>
        <BsCalendar2DateFill className='mr-1' />
        口試公布日期
      </h4>
      <div className='join w-full'>
        <input className='input join-item input-bordered w-full' placeholder='2024/4/22' />
      </div>
    </Block>
  </div>
));
export default Oral;
