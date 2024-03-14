import Tab from '@/components/tab';
import { memo, useState } from 'react';
import AddShare from './add';
import './index.less';
import UpdateShare from './UpdateShare';

const Share = memo(() => {
  const [key, increaseKey] = useState(0);
  return (
    <div className='Share'>
      <Tab>
        <Tab.Panel label='新增' defaultChecked>
          <AddShare key={`add${key}`} increaseKey={increaseKey} />
        </Tab.Panel>
        <Tab.Panel label='修改'>
          <UpdateShare key={`update${key}`} />
        </Tab.Panel>
      </Tab>
    </div>
  );
});
export default Share;
