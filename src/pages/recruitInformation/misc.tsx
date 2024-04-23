import { ListToCommaString } from 'lesca-comma-string';
import { TType } from '../../../setting';

type TData = {
  contacts: Record<string, string>[];
  schedule: string;
  linkURL: string;
};

export const DataToComma = (data: TData): Extract<TType, { linkURL: string }> => {
  const { contacts, schedule, linkURL } = data;
  const [currentContacts] = ListToCommaString(contacts);

  return {
    linkURL,
    schedule,
    contacts: String(currentContacts),
    timestamp: Date.now(),
  };
};
