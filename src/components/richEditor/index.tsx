import Button from '@/components/button';
import RichEditor, { RefObject } from '@/components/richEditor/draft';
import { useDebounce } from '@uidotdev/usehooks';
import { memo, useEffect, useRef, useState } from 'react';
import { IoIosSave } from 'react-icons/io';
import { twMerge } from 'tailwind-merge';
import Tab from '../tab';
import './index.less';

type T = {
  onSubmit: (html: string) => void;
  defaultHTML?: string;
  gap?: boolean;
  textAlign?: 'left' | 'center';
};

const Editor = memo(({ onSubmit, defaultHTML, gap = true, textAlign = 'center' }: T) => {
  const ref = useRef<RefObject>(null);
  const [html, setHTML] = useState(defaultHTML || '');
  const debouncedValue = useDebounce(html, 2000);

  useEffect(() => {
    ref.current?.setHTML(html);
  }, [debouncedValue]);

  return (
    <div className={twMerge('Editor prose flex max-w-full flex-row', gap ? 'p-5' : 'pb-5')}>
      <div className='flex-1'>
        <Tab>
          <Tab.Panel label='Rich Editor' defaultChecked>
            <div className='w-full bg-base-300 py-2 text-center' style={{ color: '#fff' }}>
              Rich Editor
            </div>
            <div className={twMerge('richEditor', textAlign === 'center' ? 'alignC' : 'alignL')}>
              <RichEditor
                defaultHTML={defaultHTML}
                onChange={(h) => {
                  setHTML(h);
                }}
                ref={ref}
              />
            </div>
          </Tab.Panel>
          <Tab.Panel label='HTML Editor'>
            <div
              className='w-full bg-base-300 py-2 text-center text-primary'
              style={{ color: '#fff' }}
            >
              HTML Editor
            </div>
            <textarea
              className='h-96 w-full'
              value={html}
              onChange={(e) => {
                setHTML(e.target.value);
              }}
            />
          </Tab.Panel>
        </Tab>
        <div className='flex w-full justify-center px-5 pt-10'>
          <Button
            className='btn-primary btn-lg btn-block btn-block uppercase'
            onClick={() => {
              onSubmit(ref.current?.getHTML() || '');
            }}
          >
            <IoIosSave />
            儲存
          </Button>
        </div>
      </div>
    </div>
  );
});
export default Editor;
