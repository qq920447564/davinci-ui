import request from '@/utils/request'

export function getList() {
  return request({
    url: '/dashboard/line/device_stat',
    method: 'get'
  })
}

export function getOEE(lineId, beginDate, endDate) {
  return request({
    url: '/reports/oee',
    method: 'get',
    params: {
      lineId,
      beginDate,
      endDate
    }
  })
}

export function getWorkTime(begin_date, end_date, line_id, user_id) {
  return request({
    url: '/punch_logs',
    method: 'get',
    params: {
      begin_date,
      end_date,
      line_id,
      user_id
    }
  })
}

export function getPlanResult(lineId, beginDate, endDate, statType) {
  return request({
    url: '/reports/plan_result',
    method: 'get',
    params: {
      lineId,
      beginDate,
      endDate,
      statType
    }
  })
}
