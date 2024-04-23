import Block from '@/components/block';
import { memo, useMemo } from 'react';
import { SiGoogleforms } from 'react-icons/si';
import { TType } from '../../../setting';

const GoogleForm = memo(({ data }: { data: Extract<TType, { oral: string }> | null }) => {
  const currentData = useMemo(() => data?.formURL, [data]);

  return (
    <div className='w-full space-y-5'>
      <Block>
        <h4 className='flex flex-nowrap items-center justify-start'>
          <SiGoogleforms className='mr-1' />
          Google報名表單URL
        </h4>
        <div className='join w-full'>
          <input
            name='formURL'
            className='input join-item input-bordered w-full'
            placeholder='https://docs.google.com/forms/d/e/xxxxxxxxxxxx/viewform'
            defaultValue={currentData}
          />
        </div>
      </Block>
    </div>
  );
});
export default GoogleForm;
