import { memo, useEffect } from 'react';
import './index.less';
import Button from '../button';
import { IoMdClose } from 'react-icons/io';

const Dialog = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='Dialog'>
      <div className='flex w-full items-center justify-start bg-base-200'>
        <Button className='mr-2 h-12 w-12'>
          <IoMdClose />
        </Button>
        asdasd
      </div>
    </div>
  );
});
export default Dialog;
