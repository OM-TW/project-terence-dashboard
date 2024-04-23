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
        formURL: { type: IType.String, required: true },
        timestamp: { type: IType.Date, default: 'Date.now()' },
      },
    },
    {
      collection: 'news',
      description: '最新消息',
      schema: {
        html: { type: IType.String, required: true },
        timestamp: { type: IType.Date, default: 'Date.now()' },
      },
    },
    {
      collection: 'share',
      description: '歷屆分享',
      schema: {
        session: { type: IType.Number, require: true },
        name: { type: IType.String, required: true },
        engName: { type: IType.String, required: true },
        html: { type: IType.String, required: true },
        timestamp: { type: IType.Date, default: 'Date.now()' },
      },
    },
    {
      collection: 'recruitNews',
      description: '最新消息',
      schema: {
        html: { type: IType.String, required: true },
        timestamp: { type: IType.Date, default: 'Date.now()' },
      },
    },
    {
      collection: 'recruitInformation',
      description: '資訊管理',
      schema: {
        contacts: { type: IType.String, required: true },
        linkURL: { type: IType.String, required: true },
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
      contacts: string;
      general: string;
      written: string;
      oral: string;
      target: string;
      schedule: string;
      formURL: string;
      timestamp: number;
    }
  | {
      html: string;
      timestamp: number;
    }
  | {
      session: string;
      name: string;
      engName: string;
      html: string;
      timestamp: number;
    }
  | {
      contacts: string;
      linkURL: string;
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
