import Block from '@/components/block';
import { memo } from 'react';
import { PiGraduationCapFill } from 'react-icons/pi';
import './index.less';

const Target = memo(() => (
  <div className='w-full space-y-5'>
    <Block>
      <h4 className='flex flex-nowrap items-center justify-start'>
        <PiGraduationCapFill className='mr-1' />
        申請者條件
      </h4>
      <div className='join w-full'>
        <input
          className='input join-item input-bordered w-full'
          placeholder='升大四至研究所學生(2023.07-08需有在學身分)'
        />
      </div>
    </Block>
  </div>
));
export default Target;
