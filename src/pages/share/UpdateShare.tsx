import useSelect from '@/hooks/useSelect';
import { memo, useMemo } from 'react';
import { SETTING, TType } from '../../../setting';
import GroupList from './groupList';

type TRespond = Extract<TType, { session: string }> & { _id: string };

export const UpdateShare = memo(() => {
  const [respond, reload] = useSelect({ collection: SETTING.mongodb[2].collection });

  const currentData = useMemo(() => {
    if (respond && respond.res) {
      const data = respond.data as TRespond[];
      return data.reduce(
        (prev, next) => {
          if (!Object.prototype.hasOwnProperty.call(prev, next.session)) {
            return { ...prev, [next.session]: [next] };
          }
          return { ...prev, [next.session]: [...prev[next.session], next] };
        },
        {} as Record<string, TRespond[]>,
      );
    }
    return {};
  }, [respond]);

  return (
    <div className='Update'>
      <div className='join join-vertical w-full'>
        {Object.entries(currentData)
          .reverse()
          .map(([key, value], index) => {
            return (
              <div key={key} className='collapse join-item collapse-arrow border border-base-300'>
                <input type='radio' name='my-accordion-4' defaultChecked={index === 0} />
                <div className='collapse-title text-xl font-medium'>第 {key} 屆</div>
                <div className='collapse-content'>
                  <div className='overflow-x-auto'>
                    <table className='table table-zebra table-xs w-96'>
                      <thead>
                        <tr>
                          <th></th>
                          <th>中文名字</th>
                          <th>英文名字</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {value.map((item: TRespond, index) => {
                          return (
                            <GroupList key={item._id} data={item} index={index} reload={reload} />
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
});

export default UpdateShare;
