import request from '@/utils/request'

export function getList() {
  return request({
    url: '/dashboard/line/device_stat',
    method: 'get'
  })
}

export function getOEE(lineId, beginDate, endDate, limit, offset) {
  return request({
    url: '/reports/oee',
    method: 'get',
    params: {
      lineId,
      beginDate,
      endDate,
      limit,
      offset
    }
  })
}

export function getWorkTime(begin_date, end_date, line_id, user_id, limit, offset) {
  return request({
    url: '/punch_logs',
    method: 'get',
    params: {
      begin_date,
      end_date,
      line_id,
      user_id,
      limit,
      offset
    }
  })
}

export function getPlanResult(lineId, beginDate, endDate, statType, limit, offset) {
  return request({
    url: '/reports/plan_result',
    method: 'get',
    params: {
      lineId,
      beginDate,
      endDate,
      statType,
      limit,
      offset
    }
  })
}

export function getPlans(line_id, begin_date, end_date, limit, offset) {
  return request({
    url: '/plans',
    method: 'get',
    params: {
      line_id,
      begin_date,
      end_date,
      limit,
      offset
    }
  })
}

export function getPoor(line_id, beginDate, endDate, limit, offset) {
  return request({
    url: '/poor_quality_logs',
    method: 'get',
    params: {
      line_id,
      beginDate,
      endDate,
      limit,
      offset
    }
  })
}
