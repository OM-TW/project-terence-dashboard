import Block from '@/components/block';
import { CommaStringToArray } from 'lesca-comma-string';
import { memo, useMemo } from 'react';
import { GrSchedule } from 'react-icons/gr';
import { TType } from '../../../setting';

const Schedule = memo(({ data }: { data: Extract<TType, { linkURL: string }> | null }) => {
  const currentData = useMemo(() => {
    if (data) return CommaStringToArray(data.schedule) as string[];
    return [];
  }, [data]);

  return (
    <div className='w-full space-y-5'>
      <Block>
        <h4 className='flex flex-nowrap items-center justify-start'>
          <GrSchedule className='mr-1' />
          STEP1
        </h4>
        <div className='join w-full'>
          <input
            name='schedule-0'
            className='input join-item input-bordered w-full'
            placeholder='2024/4/15 – 5/12 網路報名開跑'
            defaultValue={currentData[0] || ''}
          />
        </div>
        <h4 className='flex flex-nowrap items-center justify-start'>
          <GrSchedule className='mr-1' />
          STEP2
        </h4>
        <div className='join w-full'>
          <input
            name='schedule-1'
            className='input join-item input-bordered w-full'
            placeholder='2024/5/2'
            defaultValue={currentData[1] || ''}
          />
        </div>
        <h4 className='flex flex-nowrap items-center justify-start'>
          <GrSchedule className='mr-1' />
          STEP3
        </h4>
        <div className='join w-full'>
          <input
            name='schedule-2'
            className='input join-item input-bordered w-full'
            placeholder='2024/5/18'
            defaultValue={currentData[2] || ''}
          />
        </div>
        <h4 className='flex flex-nowrap items-center justify-start'>
          <GrSchedule className='mr-1' />
          STEP4
        </h4>
        <div className='join w-full'>
          <input
            name='schedule-3'
            className='input join-item input-bordered w-full'
            placeholder='2024/6/3-6/7'
            defaultValue={currentData[3] || ''}
          />
        </div>
        <h4 className='flex flex-nowrap items-center justify-start'>
          <GrSchedule className='mr-1' />
          STEP5
        </h4>
        <div className='join w-full'>
          <input
            name='schedule-4'
            className='input join-item input-bordered w-full'
            placeholder='2024/6/17-6/21'
            defaultValue={currentData[4] || ''}
          />
        </div>
        <h4 className='flex flex-nowrap items-center justify-start'>
          <GrSchedule className='mr-1' />
          STEP6
        </h4>
        <div className='join w-full'>
          <input
            name='schedule-5'
            className='input join-item input-bordered w-full'
            placeholder='2024/06/28 公布錄取名單'
            defaultValue={currentData[5] || ''}
          />
        </div>
        <h4 className='flex flex-nowrap items-center justify-start'>
          <GrSchedule className='mr-1' />
          STEP7
        </h4>
        <div className='join w-full'>
          <input
            name='schedule-6'
            className='input join-item input-bordered w-full'
            placeholder='2024/07/15 新人到職'
            defaultValue={currentData[6] || ''}
          />
        </div>
      </Block>
    </div>
  );
});
export default Schedule;
