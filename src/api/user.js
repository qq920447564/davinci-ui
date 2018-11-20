import request from '@/utils/request'

export function getUsers(mobile, realname, username, limit, offset) {
  return request({
    url: '/users',
    method: 'get',
    params: {
      mobile,
      realname,
      username,
      limit,
      offset
    }
  })
}

export function postUser(email, employee_id, mobile, realname, username, role_id) {
  return request({
    url: '/users',
    method: 'post',
    data: {
      email,
      employee_id,
      mobile,
      realname,
      username,
      role_id
    },
    headers: {
      'Content-type': 'application/json'
    }
  })
}

export function putUser(id, email, employee_id, mobile, realname, username, role_id) {
  return request({
    url: '/users/' + id,
    method: 'put',
    data: {
      email,
      employee_id,
      mobile,
      realname,
      username,
      role_id
    },
    headers: {
      'Content-type': 'application/json'
    }
  })
}
