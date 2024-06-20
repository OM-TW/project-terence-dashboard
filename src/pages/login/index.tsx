import { Suspense, lazy, memo, useEffect, useMemo, useState } from 'react';

let ctrlState = false;

const Login = memo(() => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Control' || e.key === 'Meta') {
        ctrlState = true;
      }
      if (e.key === 'c') {
        if (ctrlState) setEnabled(true);
      }
    });
    window.addEventListener('keyup', (e) => {
      if (e.key === 'Control' || e.key === 'Meta') {
        ctrlState = false;
      }
    });
  }, []);

  const page = useMemo(() => {
    if (enabled) {
      const Element = lazy(() => import('./login.tsx'));
      console.log(Element);

      if (Element) {
        return (
          <Suspense fallback=''>
            <Element />
          </Suspense>
        );
      }
      return null;
    }
    return null;
  }, [enabled]);

  console.log(page);

  return <div className='flex h-full w-full items-center justify-center'>{page}</div>;
});
export default Login;
