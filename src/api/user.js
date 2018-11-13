import request from '@/utils/request'

export function getUsers(mobile, realname, username) {
  return request({
    url: '/users',
    method: 'get',
    params: {
      mobile,
      realname,
      username
    }
  })
}
