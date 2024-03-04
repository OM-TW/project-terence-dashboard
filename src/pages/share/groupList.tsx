import Button from '@/components/button';
import useDelete from '@/hooks/useDelete';
import { Context } from '@/settings/constant';
import { ActionType, AlertType } from '@/settings/type';
import { memo, useContext, useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { MdOutlineModeEdit } from 'react-icons/md';
import { SETTING, TType } from '../../../setting';

type T = {
  data: Extract<TType, { session: string }> & { _id: string };
  index: number;
  reload: () => Promise<void>;
};

const GroupList = memo(({ data, index, reload }: T) => {
  const [, setContext] = useContext(Context);
  const [deleteRespond, deleteOne] = useDelete();

  useEffect(() => {
    if (deleteRespond && deleteRespond.res) {
      setContext({
        type: ActionType.Alert,
        state: { enabled: true, body: '刪除成功', type: AlertType.Success },
      });
      reload();
    }
  }, [deleteRespond]);

  return (
    <tr>
      <th className='w-12'>{index + 1}</th>
      <td>{data.name}</td>
      <td>{data.engName}</td>
      <td className='w-36 py-3'>
        <Button className='btn-info btn-xs'>
          <MdOutlineModeEdit />
          修改
        </Button>
        <Button
          className='btn-error btn-xs'
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
