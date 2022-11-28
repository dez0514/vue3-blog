export interface ConfigState {
  isCollapse: boolean;
  isPc: boolean;
  isShowMask: boolean;
}
export interface UpdateState {
  isCollapse?: boolean;
  isPc?: boolean;
  isShowMask?: boolean;
}
export interface TypeUserState {
  userEmail: string;
  userNick: string;
}
export interface UpdateUserState {
  userEmail?: string;
  userNick?: string;
}
export interface tagItem {
  id?: number | string;
  icon: string;
  name: string;
  color: string;
}

export interface articleItem {
  author?: string;
  banner?: string;
  title?: string;
  content?: string;
  extra_title?: string;
  git?: string;
  id?: number | string;
  tagList?: tagItem[];
  create_time?: string;
  update_time?: string;
  views?: number | string;
  likes?: number | string;
}
export type IreplyType = '' | 'comment' | 'reply'
export interface replyItem {
  id?: string | number;     
  content?: string;
  reply_type?: IreplyType;
  reply_id?: string | number;
  from_uid?: string | number;
  to_uid?: string | number;
  comment_id?: string | number;
  create_time?: string;
}

export type ITopicType = '' | 'messageboard' | 'articleComment';
export interface commentItem {
  topic_type?: ITopicType;
  topic_id?: string | number;
  from_uid?: string | number;
}

export interface ICommentList {
  id: string | number;
  topic_type?: ITopicType;
  topic_id?: string | number;
  from_uid?: string | number;
  create_time: string;
  content?: string;
  replyList?: replyItem[]
}
