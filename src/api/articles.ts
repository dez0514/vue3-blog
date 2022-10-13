import { service } from '../utils/fetch'
// 不分页
export const getArticles = (params: any = {}, config: any = {}) => {
  return service.get('/api/article/article_all_list', { params: params, ...config })
}
// 分页
export const getArticlesPage = (params: any = {}, config: any = {}) => {
  return service.get('/api/article/article_list', { params: params, ...config })
}

export const getArticleDetail = (params: any = {}, config: any = {}) => {
  return service.get('/api/article/article_detail', { params: params, ...config })
}
