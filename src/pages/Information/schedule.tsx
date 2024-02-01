import Block from '@/components/block';
import { memo, useEffect, useRef, useState } from 'react';
import { ImCalendar } from 'react-icons/im';
import './index.less';

type TData = Record<string, string>[];

const Schedule = memo(() => {
  const DateInputFieldRef = useRef<HTMLInputElement>(null);
  const descriptionInputFieldRef = useRef<HTMLInputElement>(null);
  const [list, setList] = useState<TData>([]);
  useEffect(() => {}, []);
  const addOne = () => {
    if (DateInputFieldRef.current && descriptionInputFieldRef.current) {
      const date = DateInputFieldRef.current.value;
      const description = descriptionInputFieldRef.current.value;
      if (date && description) {
        setList((prev) => [...prev, { date, description }]);
        DateInputFieldRef.current.value = '';
        descriptionInputFieldRef.current.value = '';
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
          {list.map((item) => (
            <div key={JSON.stringify(item)} className='join w-full'>
              <input
                className='input join-item input-bordered w-2/6'
                type='text'
                placeholder='日期(2024-2-22)'
                defaultValue={item.date}
              />
              <input
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
                移除
              </button>
            </div>
          ))}
          <div className='join w-full'>
            <input
              ref={DateInputFieldRef}
              className='input join-item input-bordered w-2/6'
              type='text'
              placeholder='日期(2024-2-22)'
            />
            <input
              ref={descriptionInputFieldRef}
              className='input join-item input-bordered w-2/6'
              type='text'
              placeholder='描述(5個字)'
            />
            <button type='button' onClick={addOne} className='btn btn-success join-item'>
              新增
            </button>
          </div>
        </div>
      </Block>
    </div>
  );
});
export default Schedule;
