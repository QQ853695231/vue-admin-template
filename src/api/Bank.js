import request from '@/utils/request'

export function getBankList() {
  return request({
    url: '/bank/list',
    method: 'get'
  })
}

