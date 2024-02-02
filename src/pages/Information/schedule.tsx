import Block from '@/components/block';
import { Context } from '@/settings/constant';
import { ActionType, AlertType } from '@/settings/type';
import { memo, useContext, useMemo, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ImCalendar } from 'react-icons/im';
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5';
import './index.less';
import { TType } from '../../../setting';
import { CommaStringToList } from 'lesca-comma-string';

type TData = { date: string; description: string }[];

const Schedule = memo(({ data }: { data: TType }) => {
  const currentData = useMemo(
    () => CommaStringToList(data.schedule, ['date', 'description']) as TData,
    [data],
  );
  const [, setContext] = useContext(Context);
  const descriptionInputFieldRef = useRef<HTMLInputElement>(null);
  const [pickDate, setPickDate] = useState<Date | null>(new Date());
  const [list, setList] = useState<TData>(currentData);
  const addOne = () => {
    if (descriptionInputFieldRef.current) {
      const description = descriptionInputFieldRef.current.value;
      if (pickDate && description) {
        setList((prev) => [...prev, { date: pickDate.toLocaleDateString('sv-SE'), description }]);
        setPickDate(new Date());
        descriptionInputFieldRef.current.value = '';
      } else {
        setContext({
          type: ActionType.Alert,
          state: { enabled: true, body: '欄位不可留白', type: AlertType.Error },
        });
      }
    }
  };
  return (
    <div className='w-full space-y-5'>
      <Block>
        <h4 className='flex flex-nowrap items-center justify-start'>
          <ImCalendar className='mr-1' />
          時間表
        </h4>
        <div className='flex w-full flex-col space-y-1'>
          {list.map((item, index) => (
            <div key={JSON.stringify(item) + index} className='join w-full'>
              <input
                name={`schedule-${index}-date`}
                className='input join-item input-bordered w-2/6'
                type='text'
                placeholder='日期(2024-2-22)'
                defaultValue={item.date}
              />
              <input
                name={`schedule-${index}-description`}
                className='input join-item input-bordered w-2/6'
                type='text'
                placeholder='描述(5個字)'
                defaultValue={item.description}
              />
              <button
                type='button'
                onClick={() => {
                  setList((prev) => prev.filter((i) => i !== item));
                }}
                className='btn btn-error join-item'
              >
                <IoRemoveCircle />
                移除
              </button>
            </div>
          ))}
          <div className='addScheduleGroup join w-full'>
            <DatePicker selected={pickDate} onChange={(date: Date) => setPickDate(date)} />
            <input
              ref={descriptionInputFieldRef}
              className='input join-item input-bordered w-2/6'
              type='text'
              placeholder='描述(5個字)'
            />
            <button type='button' onClick={addOne} className='btn btn-success join-item'>
              <IoAddCircle /> 新增
            </button>
          </div>
        </div>
      </Block>
    </div>
  );
});
export default Schedule;
