import useInsert from '@/hooks/useInsert';
import useUpdate from '@/hooks/useUpdate';
import { Context } from '@/settings/constant';
import { ActionType, AlertType, IReactProps } from '@/settings/type';
import { memo, useContext, useEffect } from 'react';
import { SETTING } from '../../../setting';
import { DataToComma } from './misc';

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
    const [formURL] = data
      .filter(([key]) => key.startsWith('formURL'))
      .map(([, value]) => value.toString());

    if (formURL === '') {
      onError('google表單');
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

    // general
    const [general] = data
      .filter(([key]) => key.startsWith('general'))
      .map(([, value]) => value.toString());

    if (general === '') {
      onError('申請期間');
      return;
    }

    // written
    const [written] = data
      .filter(([key]) => key.startsWith('written'))
      .map(([, value]) => value.toString());

    if (written === '') {
      onError('筆試日期');
      return;
    }

    // oral
    const oral = data
      .filter(([key]) => key.startsWith('oral'))
      .reduce(
        (prev, next) => {
          const [, key] = next[0].split('-');
          prev[key] = next[1].toString();
          return prev;
        },
        {} as Record<string, string>,
      );
    if (Object.values(oral).filter((value) => value === '').length > 0) {
      onError('口試日期');
      return;
    }

    // target
    const [target] = data
      .filter(([key]) => key.startsWith('target'))
      .map(([, value]) => value.toString());

    if (target === '') {
      onError('申請者條件');
      return;
    }

    // schedule
    const schedule = data
      .filter(([key]) => key.startsWith('schedule'))
      .reduce(
        (prev, next) => {
          const [, index, key] = next[0].split('-');
          if (!prev[parseInt(index)]) prev[parseInt(index)] = { [key]: next[1].toString() };
          else prev[parseInt(index)][key] = next[1].toString();
          return prev;
        },
        [] as Record<string, string>[],
      );
    if (schedule.length === 0) {
      onError('時間表');
      return;
    }

    const currentData = DataToComma({
      contacts,
      general,
      written,
      oral,
      target,
      schedule,
      formURL,
    });

    if (id)
      updateData({
        collection: SETTING.mongodb[0].collection,
        data: { _id: id, data: currentData },
      });
    else saveData({ collection: SETTING.mongodb[0].collection, data: currentData });
  };

  return (
    <form onSubmit={onSubmit} className='w-full'>
      {children}
    </form>
  );
});
export default Form;
