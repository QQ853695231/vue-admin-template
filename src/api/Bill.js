import request from '@/utils/request'

export function addBill(billData) {
  return request({
    url: '/bill',
    method: 'post',
    data: billData
  })
}
