import Tab from '@/components/tab';
import { memo } from 'react';
import AddShare from './add';
import './index.less';
import UpdateShare from './UpdateShare';

// type TRespondType = Extract<TType, { session: number }> & { _id: string };

const Share = memo(() => {
  return (
    <div className='Share'>
      <Tab>
        <Tab.Panel label='新增' defaultChecked>
          <AddShare />
        </Tab.Panel>
        <Tab.Panel label='修改'>
          <UpdateShare />
        </Tab.Panel>
      </Tab>
    </div>
  );
});
export default Share;
