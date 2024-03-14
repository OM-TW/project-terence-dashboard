import useInsert from '@/hooks/useInsert';
import { Context } from '@/settings/constant';
import { ActionType, AlertType } from '@/settings/type';
import { memo, useContext, useEffect, useState } from 'react';
import { SETTING, TType } from '../../../setting';
import Form, { TSubmitType } from './form';
import Items from './items';

type TSubmitData = Omit<Extract<TType, { session: string }>, 'timestamp'>;

const defaultData: TSubmitData = {
  session: '',
  name: '',
  engName: '',
  html: '',
};

type T = {
  increaseKey: React.Dispatch<React.SetStateAction<number>>;
};

const AddShare = memo(({ increaseKey }: T) => {
  const [, setContext] = useContext(Context);
  const [respond, insertData] = useInsert();

  const [submitData, setSubmitData] = useState<TSubmitData>(defaultData);

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
      <Form submit={submit} reset={onReset}>
        <Items onSubmit={onSubmit} />
      </Form>
    </div>
  );
});
export default AddShare;
