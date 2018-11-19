import request from '@/utils/request'

export function getPoints(data_point_ids, begin_date, end_date, limit, offset) {
  return request({
    url: '/data_points/history',
    method: 'get',
    params: {
      data_point_ids,
      begin_date,
      end_date,
      limit,
      offset
    }
  })
}
