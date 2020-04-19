import request from '@/utils/request'

// 查询用户所有可用设备列表
export function CarOperation(query) {
  return request({
    url: '/carDrive/operation',
    method: 'get',
    params: query
  })
}

