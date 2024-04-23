import Button from '@/components/button';
import Tab from '@/components/tab';
import useSelect from '@/hooks/useSelect';
import { memo, useMemo } from 'react';
import { FaSave } from 'react-icons/fa';
import { SETTING, TType } from '../../../setting';
import Form from './form';
import Links from './links';
import './index.less';
import Contact from './contact';
import Schedule from './schedule';

type TRespondType = Extract<TType, { linkURL: string }> & { _id: string };

const RecruitInformation = memo(() => {
  const [data, getData] = useSelect({ collection: SETTING.mongodb[4].collection });

  const currentData = useMemo<TRespondType | null>(() => {
    if (data && data.res) return data.data[0] as TRespondType;
    return null;
  }, [data]);

  return (
    <div className='RecruitInformation'>
      <h2 className='text-2xl'>申請資訊</h2>
      <Form reload={getData} id={currentData ? currentData._id : false}>
        <Tab>
          <Tab.Panel label='站外連結' defaultChecked>
            <Links data={currentData} />
          </Tab.Panel>
          <Tab.Panel label='時間表'>
            <Schedule data={currentData} />
          </Tab.Panel>
          <Tab.Panel label='聯絡者'>
            <Contact data={currentData} />
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
export default RecruitInformation;
