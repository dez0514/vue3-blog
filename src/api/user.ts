import { service } from '../utils/fetch'
import qs from 'qs'

export const getRepos = (params: any = {}, config: any = {}) => {
  return service.get('/api/user/repos', { params: params, ...config })
}

export const clientLogin = (params: any = {}, config: any = {}) => {
  const data = qs.stringify(params)
  return service.post('/api/user/clientLogin', data, { ...config, headers: { 'Content-Type' : 'application/x-www-form-urlencoded' }})
}

export const updateInfos = (params: any = {}, config: any = {}) => {
  const data = qs.stringify(params)
  return service.post('/api/user/saveClientInfo', data, { ...config, headers: { 'Content-Type' : 'application/x-www-form-urlencoded' }})
}

export const getInfosByEmail = (params: any = {}, config: any = {}) => {
  return service.get('/api/user/getClientInfo', { params: params, ...config })
}
