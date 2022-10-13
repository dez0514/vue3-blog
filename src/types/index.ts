export interface ConfigState {
  isCollapse: boolean;
  isPc: boolean;
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