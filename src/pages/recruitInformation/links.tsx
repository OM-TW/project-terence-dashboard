import Block from '@/components/block';
import { CommaStringToArray } from 'lesca-comma-string';
import { memo, useMemo } from 'react';
import { SiGoogleforms } from 'react-icons/si';
import { TType } from '../../../setting';

const Links = memo(({ data }: { data: Extract<TType, { linkURL: string }> | null }) => {
  const currentData = useMemo(() => {
    if (data) return CommaStringToArray(data.linkURL) as string[];
    return [];
  }, [data]);

  return (
    <div className='w-full space-y-5'>
      <Block>
        <h4 className='flex flex-nowrap items-center justify-start'>
          <SiGoogleforms className='mr-1' />
          社會新鮮人連結(Google報名表單?)
        </h4>
        <div className='join w-full'>
          <input
            name='linkURL-0'
            className='input join-item input-bordered w-full'
            placeholder='https://docs.google.com/forms/d/e/xxxxxxxxxxxx/viewform'
            defaultValue={currentData[0] || ''}
          />
        </div>
        <h4 className='flex flex-nowrap items-center justify-start'>
          <SiGoogleforms className='mr-1' />
          我已工作兩年以上的連結(104?)
        </h4>
        <div className='join w-full'>
          <input
            name='linkURL-1'
            className='input join-item input-bordered w-full'
            placeholder='https://www.104.com.tw/company/9rn61mw?jobsource=index_s_cs'
            defaultValue={currentData[1] || ''}
          />
        </div>
        <h4 className='flex flex-nowrap items-center justify-start'>
          <SiGoogleforms className='mr-1' />
          OGILVY NIGHT OUT連結(Google報名表單?) / 報名期間(日期)
        </h4>
        <div className='join w-full'>
          <input
            name='linkURL-2'
            className='input join-item input-bordered w-full'
            placeholder='https://docs.google.com/forms/d/e/xxxxxxxxxxxx/viewform'
            defaultValue={currentData[2] || ''}
          />
          <input
            name='linkURL-3'
            className='input join-item input-bordered w-full'
            placeholder='報名期間:2024/4/29-5/13'
            defaultValue={currentData[3] || ''}
          />
        </div>
      </Block>
    </div>
  );
});
export default Links;
