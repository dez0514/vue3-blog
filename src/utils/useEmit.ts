import mitt, { Emitter } from 'mitt';
import { MdTitle } from '../utils/marked'
interface Imit {
  index: number;
  item: MdTitle
}
type Events = {
  'change-next-slide': void;
  'change-prev-slide': void;
  'change-detail-menuindex': Imit
};

export const emitter: Emitter<Events> = mitt<Events>();