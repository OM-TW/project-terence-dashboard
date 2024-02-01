import Block from '@/components/block';
import { memo } from 'react';
import { FaUserShield } from 'react-icons/fa';

const Contact = memo(() => (
  <div className='w-full space-y-5'>
    <Block>
      <h4 className='flex flex-nowrap items-center justify-start'>
        <FaUserShield className='mr-1' />
        主要聯絡者
      </h4>
      <div className='join w-full'>
        <input className='input join-item input-bordered w-4/6' type='email' placeholder='Email' />
        <input className='input join-item input-bordered w-2/6' type='text' placeholder='姓名' />
      </div>
    </Block>
    <Block>
      <h4 className='flex flex-nowrap items-center justify-start'>
        <FaUserShield className='mr-1' />
        次要聯絡者
      </h4>
      <div className='join w-full'>
        <input className='input join-item input-bordered w-4/6' type='email' placeholder='Email' />
        <input className='input join-item input-bordered w-2/6' type='text' placeholder='姓名' />
      </div>
    </Block>
  </div>
));
export default Contact;
