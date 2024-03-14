import Block from '@/components/block';
import Editor from '@/components/richEditor';
import { memo, useMemo } from 'react';
import { BiRename } from 'react-icons/bi';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { PiListNumbers } from 'react-icons/pi';
import { TType } from '../../../setting';
import './index.less';

type TRespond = Extract<TType, { session: string }>;

type T = {
  onSubmit: (html: string) => void;
  data?: TRespond;
};

const DEFAULT_DATA: TRespond = { name: '', engName: '', session: '', timestamp: 0, html: '' };

const Items = memo(({ onSubmit, data = DEFAULT_DATA }: T) => {
  const th = useMemo(() => new Date().getFullYear() - 2008, []);
  return (
    <div className='Items'>
      <Block>
        <h4 className='flex flex-nowrap items-center justify-start'>
          <PiListNumbers className='mr-1' />
          紅領帶屆數
        </h4>
        <select
          name='session'
          className='select select-bordered w-full max-w-xs'
          defaultValue={data.session}
        >
          <option disabled value=''>
            請選擇屆數
          </option>
          {[...new Array(th).keys()].reverse().map((v, i) => {
            const currentValue = v + 1;
            return (
              <option value={currentValue} key={`th${v}-${i}`}>
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
            defaultValue={data.name}
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
            defaultValue={data.engName}
          />
        </div>

        <h4 className='flex flex-nowrap items-center justify-start'>
          <BiRename className='mr-1' />
          文章內文
        </h4>
        <Editor defaultHTML={data.html} onSubmit={onSubmit} gap={false} textAlign='left' />
      </Block>
    </div>
  );
});
export default Items;
