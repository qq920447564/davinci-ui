import request from '@/utils/request'

export function getLines() {
  return request({
    url: '/lines',
    method: 'get'
  })
}
