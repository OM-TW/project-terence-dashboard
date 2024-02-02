import { ReadyOnly } from '@/settings/type-unity';
import { IType, TUploadRespond } from './type';

// mongodb collection schema setting.
export const SETTING = {
  mongodb: [
    {
      collection: 'application',
      description: '申請資訊',
      schema: {
        contacts: { type: IType.String, required: true },
        general: { type: IType.String, required: true },
        written: { type: IType.String, required: true },
        oral: { type: IType.String, required: true },
        target: { type: IType.String, required: true },
        schedule: { type: IType.String, required: true },
        timestamp: { type: IType.Date, default: 'Date.now()' },
      },
    },
  ],
  dashboard: {
    session: {
      name: 'status',
      time: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  },
};

// set type for mongodb
export type TType = {
  contacts: string;
  general: string;
  written: string;
  oral: string;
  target: string;
  schedule: string;
  timestamp: number;
};

// type for api respond
export type IRespond = ReadyOnly<{
  res: boolean;
  msg: string;
  collection: string;
  data: TType[];
}>;

export type TUploadResult = ReadyOnly<{
  res: boolean;
  msg: string;
  collection: string;
  data: TUploadRespond[];
}>;
