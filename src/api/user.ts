import { service } from '../utils/fetch'

export const getRepos = (params: any = {}, config: any = {}) => {
  return service.get('/api/user/repos', { params: params, ...config })
}
