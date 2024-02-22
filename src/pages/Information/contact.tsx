import Block from '@/components/block';
import { memo, useMemo } from 'react';
import { FaUserShield } from 'react-icons/fa';
import { TType } from '../../../setting';
import { CommaStringToList } from 'lesca-comma-string';

type TData = {
  email: string;
  name: string;
}[];

const Contact = memo(({ data }: { data: Extract<TType, { contacts: string }> | null }) => {
  const currentData = useMemo(() => {
    if (data) return CommaStringToList(data.contacts, ['email', 'name']) as TData;
  }, [data]);
  return (
    <div className='w-full space-y-5'>
      <Block>
        <h4 className='flex flex-nowrap items-center justify-start'>
          <FaUserShield className='mr-1' />
          主要聯絡者
        </h4>
        <div className='join w-full'>
          <input
            name='contact-0-email'
            className='input join-item input-bordered w-4/6'
            type='email'
            placeholder='Email'
            defaultValue={currentData?.[0]?.email || ''}
          />
          <input
            name='contact-0-name'
            className='input join-item input-bordered w-2/6'
            type='text'
            placeholder='姓名'
            defaultValue={currentData?.[0]?.name || ''}
          />
        </div>
      </Block>
      <Block>
        <h4 className='flex flex-nowrap items-center justify-start'>
          <FaUserShield className='mr-1' />
          次要聯絡者
        </h4>
        <div className='join w-full'>
          <input
            name='contact-1-email'
            className='input join-item input-bordered w-4/6'
            type='email'
            placeholder='Email'
            defaultValue={currentData?.[1]?.email || ''}
          />
          <input
            name='contact-1-name'
            className='input join-item input-bordered w-2/6'
            type='text'
            placeholder='姓名'
            defaultValue={currentData?.[1]?.name || ''}
          />
        </div>
      </Block>
    </div>
  );
});
export default Contact;
