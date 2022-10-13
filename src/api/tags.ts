import { service } from '../utils/fetch'
// tag all list
export const getAllTags = (params: any = {}, config: any = {}) => {
  return service.get('/api/tag/tag_all_list', { params: params, ...config })
}
// tag list
export const getTags = (params: any = {}, config: any = {}) => {
  return service.get('/api/tag/tag_list', { params: params, ...config })
}

