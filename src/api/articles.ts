import { service } from '../utils/fetch'
// 所有
export const getArticles = (params: any = {}, config: any = {}) => {
  return service.get('/api/article/article_all_list', { params: params, ...config })
}
// 分页
export const getArticlesPage = (params: any = {}, config: any = {}) => {
  return service.get('/api/article/article_list', { params: params, ...config })
}
// 归档
export const getArchivePage = (params: any = {}, config: any = {}) => {
  return service.get('/api/article/article_archive_list', { params: params, ...config })
}
// 详情
export const getArticleDetail = (params: any = {}, config: any = {}) => {
  return service.get('/api/article/article_detail', { params: params, ...config })
}
// 时间列表
export const getArchiveTime = (params: any = {}, config: any = {}) => {
  return service.get('/api/article/archive_timeline', { params: params, ...config })
}