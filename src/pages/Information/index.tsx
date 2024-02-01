import Tab from '@/components/tab';
import { memo } from 'react';
import Contact from './contact';
import Form from './form';
import General from './general';
import './index.less';
import Oral from './oral';
import Target from './target';
import Written from './written';
import Schedule from './schedule';
import Button from '@/components/button';
import { FaSave } from 'react-icons/fa';

const Information = memo(() => (
  <div className='Information'>
    <h2 className='text-2xl'>申請資訊</h2>
    <Form>
      <Tab>
        <Tab.Panel defaultChecked label='聯絡者'>
          <Contact />
        </Tab.Panel>
        <Tab.Panel label='申請期間'>
          <General />
        </Tab.Panel>
        <Tab.Panel label='筆試日期'>
          <Written />
        </Tab.Panel>
        <Tab.Panel label='口試日期'>
          <Oral />
        </Tab.Panel>
        <Tab.Panel label='申請者條件'>
          <Target />
        </Tab.Panel>
        <Tab.Panel label='時間表'>
          <Schedule />
        </Tab.Panel>
      </Tab>
      <Button className='btn-primary btn-block mt-5' type='submit'>
        <FaSave />
        儲存
      </Button>
    </Form>
  </div>
));
export default Information;
