import { ListToCommaString } from 'lesca-comma-string';
import { TType } from '../../../setting';

type TData = {
  contacts: Record<string, string>[];
  general: string;
  written: string;
  oral: Record<string, string>;
  target: string;
  schedule: Record<string, string>[];
};

export const DataToComma = (data: TData): TType => {
  const { contacts, general, written, oral, target, schedule } = data;
  const [currentContacts] = ListToCommaString(contacts);
  const currentOral = Object.values(oral).join(',');
  const currentSchedule = schedule.map((item) => Object.values(item).join(',')).join(',');
  return {
    contacts: String(currentContacts),
    general,
    written,
    oral: currentOral,
    target,
    schedule: currentSchedule,
    timestamp: Date.now(),
  };
};
