import Button from '@/components/button';
import Tab from '@/components/tab';
import useSelect from '@/hooks/useSelect';
import { memo, useMemo } from 'react';
import { FaSave } from 'react-icons/fa';
import { SETTING, TType } from '../../../setting';
import Contact from './contact';
import Form from './form';
import General from './general';
import GoogleForm from './googleForm';
import './index.less';
import Oral from './oral';
import Schedule from './schedule';
import Target from './target';
import Written from './written';

type TRespondType = Extract<TType, { contacts: string }> & { _id: string };

const Information = memo(() => {
  const [data, getData] = useSelect({ collection: SETTING.mongodb[0].collection });

  const currentData = useMemo<TRespondType | null>(() => {
    if (data && data.res) return data.data[0] as TRespondType;
    return null;
  }, [data]);

  return (
    <div className='Information'>
      <h2 className='text-2xl'>申請資訊</h2>
      <Form reload={getData} id={currentData ? currentData._id : false}>
        <Tab>
          <Tab.Panel label='報名表單' defaultChecked>
            <GoogleForm data={currentData} />
          </Tab.Panel>
          <Tab.Panel label='聯絡者'>
            <Contact data={currentData} />
          </Tab.Panel>
          <Tab.Panel label='申請期間'>
            <General data={currentData} />
          </Tab.Panel>
          <Tab.Panel label='筆試日期'>
            <Written data={currentData} />
          </Tab.Panel>
          <Tab.Panel label='口試日期'>
            <Oral data={currentData} />
          </Tab.Panel>
          <Tab.Panel label='申請者條件'>
            <Target data={currentData} />
          </Tab.Panel>
          <Tab.Panel label='時間表'>
            <Schedule data={currentData} />
          </Tab.Panel>
        </Tab>
        <Button className='btn-primary btn-block mt-5' type='submit'>
          <FaSave />
          儲存
        </Button>
      </Form>
    </div>
  );
});
export default Information;
