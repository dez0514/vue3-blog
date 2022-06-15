import mitt, { Emitter } from 'mitt';

type Events = {
//   foo: string;
//   bar?: number;
  'change-next-slide': undefined; // 写携带参数类型，undefined不携带参数
  'change-prev-slide': undefined;
};

export const emitter: Emitter<Events> = mitt<Events>();