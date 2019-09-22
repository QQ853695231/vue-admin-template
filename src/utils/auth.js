import Cookies from 'js-cookie'

const TokenKey = 'my_bank'
const UserInfo = 'user-info'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function getUserInfo() {
  return JSON.parse(Cookies.get(UserInfo))
}

export function setUserInfo(playLoad) {
  return Cookies.set(UserInfo, playLoad)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
