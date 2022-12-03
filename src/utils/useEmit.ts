import mitt, { Emitter } from 'mitt';

type Events = {
//   foo: string;
//   bar?: number;
  'change-next-slide': () => void;
  'change-prev-slide': () => void;
};

export const emitter: Emitter<Events> = mitt<Events>();