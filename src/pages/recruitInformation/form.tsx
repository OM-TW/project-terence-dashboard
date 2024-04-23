import useInsert from '@/hooks/useInsert';
import useUpdate from '@/hooks/useUpdate';
import { Context } from '@/settings/constant';
import { ActionType, AlertType, IReactProps } from '@/settings/type';
import { memo, useContext, useEffect } from 'react';
import { DataToComma } from './misc';
import { ArrayToCommaString } from 'lesca-comma-string';
import { SETTING } from '../../../setting';

type T = IReactProps & {
  reload: () => Promise<void>;
  id: string | false;
};

const Form = memo(({ children, id }: T) => {
  const [saveRespond, saveData] = useInsert();
  const [updateRespond, updateData] = useUpdate();

  const [, setContext] = useContext(Context);

  useEffect(() => {
    if (saveRespond) {
      setContext({
        type: ActionType.Alert,
        state: { enabled: true, body: '儲存成功', type: AlertType.Success },
      });
    }
    if (updateRespond) {
      setContext({
        type: ActionType.Alert,
        state: { enabled: true, body: '儲存成功', type: AlertType.Success },
      });
    }
  }, [saveRespond, updateRespond]);

  const onError = (message: string) => {
    setContext({
      type: ActionType.Alert,
      state: { enabled: true, body: `${message} 欄位不可留白`, type: AlertType.Error },
    });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.delete('tab');
    const data = [...formData];

    // formURL
    const linkURL = data
      .filter(([key]) => key.startsWith('linkURL'))
      .map(([, v]) => String(v).replace(',', ''));

    if (linkURL.filter((item) => item === '').length > 0) {
      onError('站外連結');
      return;
    }

    // contact
    const contacts = data
      .filter(([key]) => key.startsWith('contact'))
      .reduce(
        (prev, next) => {
          const [, index, key] = next[0].split('-');
          if (!prev[parseInt(index)]) prev[parseInt(index)] = { [key]: next[1].toString() };
          else prev[parseInt(index)][key] = next[1].toString();
          return prev;
        },
        [] as Record<string, string>[],
      );
    if (
      contacts.filter((item) => Object.values(item).filter((value) => value === '').length > 0)
        .length > 0
    ) {
      // empty field
      onError('聯絡者');
      return;
    }

    // formURL
    const schedule = data
      .filter(([key]) => key.startsWith('schedule'))
      .map(([, v]) => String(v).replace(',', ''));

    if (schedule.filter((item) => item === '').length > 0) {
      onError('時間表');
      return;
    }

    const currentData = DataToComma({
      linkURL: ArrayToCommaString(linkURL),
      schedule: ArrayToCommaString(schedule),
      contacts,
    });

    if (id)
      updateData({
        collection: SETTING.mongodb[4].collection,
        data: { _id: id, data: currentData },
      });
    else saveData({ collection: SETTING.mongodb[4].collection, data: currentData });
  };

  return (
    <form onSubmit={onSubmit} className='w-full'>
      {children}
    </form>
  );
});
export default Form;
