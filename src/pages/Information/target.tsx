import Block from '@/components/block';
import { memo, useMemo } from 'react';
import { PiGraduationCapFill } from 'react-icons/pi';
import './index.less';
import { TType } from '../../../setting';

const Target = memo(({ data }: { data: Extract<TType, { contacts: string }> | null }) => {
  const currentData = useMemo(() => data?.target, [data]);
  return (
    <div className='w-full space-y-5'>
      <Block>
        <h4 className='flex flex-nowrap items-center justify-start'>
          <PiGraduationCapFill className='mr-1' />
          申請者條件
        </h4>
        <div className='join w-full'>
          <input
            name='target'
            className='input join-item input-bordered w-full'
            placeholder='升大四至研究所學生(2023.07-08需有在學身分)'
            defaultValue={currentData}
          />
        </div>
      </Block>
    </div>
  );
});
export default Target;
