import useLogin, { TArgument } from '@/hooks/useLogin';
import { Context } from '@/settings/constant';
import { ActionType } from '@/settings/type';
import Storage from 'lesca-local-storage';
import { FormEvent, memo, useCallback, useContext, useEffect } from 'react';
import { SETTING } from '../../../setting';
import coverImage from './img/ogilvyCover.png';

const Login = memo(() => {
  const [, setContext] = useContext(Context);
  const [respond, fetchLogin] = useLogin();

  useEffect(() => {
    if (respond?.res) {
      Storage.set(SETTING.dashboard.session.name, respond);
      setContext({ type: ActionType.Status, state: { enabled: true } });
    }
  }, [respond]);

  const onSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();
    const data = Object.fromEntries([
      ...new FormData(event.target as HTMLFormElement),
    ]) as TArgument;
    fetchLogin(data);
  }, []);

  return (
    <div className='card max-w-2xl bg-base-100 shadow-xl lg:card-side'>
      <figure>
        <img src={coverImage} alt='Album' />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>Welcome to {import.meta.env.VITE_TITLE}</h2>
        <p>Please Login to continue...</p>
        <form onSubmit={onSubmit}>
          <div className='join join-vertical my-5'>
            <input
              className='input join-item border-secondary'
              placeholder='username'
              name='username'
              type='text'
            />
            <input
              className='input  join-item border-primary'
              placeholder='password'
              name='password'
              type='password'
            />
          </div>
          {respond?.res === false && <div className='text-error'>{respond.msg}</div>}
          <div className='card-actions justify-end'>
            <button type='submit' className='btn btn-primary'>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});
export default Login;
