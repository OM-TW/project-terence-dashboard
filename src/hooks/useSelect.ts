import Fetcher from 'lesca-fetcher';
import { useContext, useEffect, useState } from 'react';
import { REST_PATH } from '../settings/config';
import { Context } from '../settings/constant';
import { ActionType } from '@/settings/type';
import { IRespond } from '../../setting';

type TArgument = { collection: string };

const useSelect = (argument: TArgument) => {
  const [, setContext] = useContext(Context);
  const [state, setState] = useState<IRespond | undefined>();
  const fetch = async () => {
    setContext({ type: ActionType.LoadingProcess, state: { enabled: true } });
    const respond = (await Fetcher.post(REST_PATH.select, argument)) as IRespond;
    setState(respond);
    setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
  };

  useEffect(() => {
    fetch();
  }, []);
  return [state, fetch] as const;
};
export default useSelect;
