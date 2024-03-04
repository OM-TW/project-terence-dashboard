import Block from '@/components/block';
import Editor from '@/components/richEditor';
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import { BiRename } from 'react-icons/bi';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { PiListNumbers } from 'react-icons/pi';
import Form, { TSubmitType } from './form';
import { SETTING, TType } from '../../../setting';
import useInsert from '@/hooks/useInsert';
import { Context } from '@/settings/constant';
import { ActionType, AlertType } from '@/settings/type';

type TSubmitData = Omit<Extract<TType, { session: string }>, 'timestamp'>;

const defaultData: TSubmitData = {
  session: '',
  name: '',
  engName: '',
  html: '',
};

const AddShare = memo(() => {
  const [, setContext] = useContext(Context);
  const [respond, insertData] = useInsert();
  const th = useMemo(() => new Date().getFullYear() - 2008, []);
  const [submitData, setSubmitData] = useState<TSubmitData>(defaultData);
  const [key, increaseKey] = useState(0);

  const onSubmit = (finalHTML: string) => {
    setSubmitData((S) => ({ ...S, html: finalHTML, session: '', name: '', engName: '' }));
  };

  const submit = (data: TSubmitType) => {
    setSubmitData((S) => ({ ...S, ...data }));
  };

  const onReset = () => {
    setSubmitData(defaultData);
  };

  useEffect(() => {
    if (Object.values(submitData).every((v) => v !== '')) {
      insertData({ collection: SETTING.mongodb[2].collection, data: submitData });
    }
  }, [submitData]);

  useEffect(() => {
    if (respond && respond.res) {
      setContext({
        type: ActionType.Alert,
        state: { enabled: true, body: '新增成功', type: AlertType.Success },
      });
      increaseKey((K) => K + 1);
    }
  }, [respond]);

  return (
    <div className='w-full space-y-5'>
      <Form submit={submit} reset={onReset} key={key}>
        <Block>
          <h4 className='flex flex-nowrap items-center justify-start'>
            <PiListNumbers className='mr-1' />
            紅領帶屆數
          </h4>
          <select name='session' className='select select-bordered w-full max-w-xs' defaultValue=''>
            <option disabled value=''>
              請選擇屆數
            </option>
            {[...new Array(th).keys()].map((v, i) => {
              const currentValue = v + 1;
              return (
                <option value={currentValue} key={`th${v}${i}`}>
                  第{currentValue}屆({v + 2008 + 1})
                </option>
              );
            })}
          </select>
          <h4 className='flex flex-nowrap items-center justify-start'>
            <MdDriveFileRenameOutline className='mr-1' />
            中文姓名
          </h4>
          <div className='join w-full'>
            <input
              name='name'
              className='input join-item input-bordered w-full'
              placeholder='中文姓名'
            />
          </div>
          <h4 className='flex flex-nowrap items-center justify-start'>
            <BiRename className='mr-1' />
            英文姓名
          </h4>
          <div className='join w-full'>
            <input
              name='engName'
              className='input join-item input-bordered w-full'
              placeholder='英文姓名'
            />
          </div>

          <h4 className='flex flex-nowrap items-center justify-start'>
            <BiRename className='mr-1' />
            文章內文
          </h4>
          <Editor defaultHTML='' onSubmit={onSubmit} gap={false} />
        </Block>
      </Form>
    </div>
  );
});
export default AddShare;
