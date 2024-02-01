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
export type TType =
  | {
      userID: string;
      firstName: string;
      lastName: string;
      email: string;
      photo: string;
      age: number;
      timestamp: string;
    }
  | {
      task: string;
      description: string;
      who: string;
      done: boolean;
      timestamp: Date;
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
