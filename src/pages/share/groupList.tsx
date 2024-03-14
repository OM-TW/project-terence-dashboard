import Button from '@/components/button';
import useDelete from '@/hooks/useDelete';
import useUpdate from '@/hooks/useUpdate';
import { Context } from '@/settings/constant';
import { ActionType, AlertType } from '@/settings/type';
import { memo, useContext, useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { MdOutlineModeEdit } from 'react-icons/md';
import { SETTING, TType } from '../../../setting';
import Form, { TSubmitType } from './form';
import Items from './items';

type TSubmitData = Omit<Extract<TType, { session: string }>, 'timestamp'>;

type T = {
  data: Extract<TType, { session: string }> & { _id: string };
  index: number;
  reload: () => Promise<void>;
};

const defaultData: TSubmitData = {
  session: '',
  name: '',
  engName: '',
  html: '',
};

const GroupList = memo(({ data, index, reload }: T) => {
  const [, setContext] = useContext(Context);
  const [deleteRespond, deleteOne] = useDelete();
  const [updateRespond, updateData] = useUpdate();

  const [submitData, setSubmitData] = useState<TSubmitData>(defaultData);

  useEffect(() => {
    if (deleteRespond && deleteRespond.res) {
      setContext({
        type: ActionType.Alert,
        state: { enabled: true, body: '刪除成功', type: AlertType.Success },
      });
      reload();
    }
  }, [deleteRespond]);

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
      const currentData = {
        collection: SETTING.mongodb[2].collection,
        data: { _id: data._id, data: submitData },
      };
      updateData(currentData);
    }
  }, [submitData]);

  useEffect(() => {
    if (updateRespond) {
      setContext({
        type: ActionType.Alert,
        state: { enabled: true, body: '修改成功', type: AlertType.Success },
      });
      setContext({ type: ActionType.Dialog, state: { enabled: false } });
      reload();
    }
  }, [updateRespond]);

  return (
    <tr>
      <th className='w-12'>{index + 1}</th>
      <td>{data.name}</td>
      <td>{data.engName}</td>
      <td className='join join-horizontal w-36 py-3'>
        <Button
          className='btn-info join-item btn-xs'
          onClick={() => {
            setContext({
              type: ActionType.Dialog,
              state: {
                title: `修改${data.name} / ${data.engName}的資料`,
                enabled: true,
                body: (
                  <Form submit={submit} reset={onReset}>
                    <Items data={data} onSubmit={onSubmit} />
                  </Form>
                ),
                button: undefined,
              },
            });
          }}
        >
          <MdOutlineModeEdit />
          修改
        </Button>
        <Button
          className='btn-error join-item btn-xs'
          onClick={() => {
            deleteOne({ collection: SETTING.mongodb[2].collection, data });
          }}
        >
          <AiFillDelete />
          刪除
        </Button>
      </td>
    </tr>
  );
});
export default GroupList;
