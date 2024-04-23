import Editor from '@/components/richEditor';
import useInsert from '@/hooks/useInsert';
import useSelect from '@/hooks/useSelect';
import useUpdate from '@/hooks/useUpdate';
import { memo, useContext, useEffect, useMemo } from 'react';
import { SETTING, TType } from '../../../setting';
import './index.less';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';

type TRespondType = Extract<TType, { html: string }> & { _id: string };

const RecruitNews = memo(() => {
  const [, setContext] = useContext(Context);
  const [html] = useSelect({ collection: SETTING.mongodb[3].collection });
  const [insertRespond, getInsert] = useInsert();
  const [updateRespond, getUpdate] = useUpdate();

  useEffect(() => {
    if (insertRespond?.res) {
      setContext({ type: ActionType.Alert, state: { enabled: true, body: insertRespond.msg } });
    }
  }, [insertRespond]);

  useEffect(() => {
    if (updateRespond?.res) {
      setContext({ type: ActionType.Alert, state: { enabled: true, body: updateRespond.msg } });
    }
  }, [updateRespond]);

  const currentHTML = useMemo(() => {
    if (html && html.res) {
      if (html.data.length === 0) return '';
      const data = html.data[0] as Extract<TType, { html: string }>;
      return data.html;
    }
    return '';
  }, [html]);

  const onSubmit = (finalHTML: string) => {
    if (html?.data.length === 0) {
      getInsert({
        collection: SETTING.mongodb[3].collection,
        data: { html: finalHTML, timestamp: Date.now() },
      });
    } else {
      const respondData = html?.data[0] as TRespondType;
      getUpdate({
        collection: SETTING.mongodb[3].collection,
        data: { _id: respondData._id, data: { html: finalHTML } },
      });
    }
  };

  return (
    <div className='RecruitNews'>
      {html !== undefined && <Editor defaultHTML={currentHTML} onSubmit={onSubmit} />}
    </div>
  );
});
export default RecruitNews;
