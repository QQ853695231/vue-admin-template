import request from '@/utils/request'

export function addBill(billData) {
  return request({
    url: '/bill',
    method: 'post',
    data: billData
  })
}

export function getBillListByBillMonth(billMonth) {
  return request({
    url: `/bill/month/${billMonth}/list`,
    method: 'get'
  })
}


export function getBillPreviewPageInfo(queryData) {
  return request({
    url: `/bill/monthly/page/list`,
    method: 'get',
    params: queryData
  })
}
