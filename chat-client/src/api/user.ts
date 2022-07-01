import request from "@/utils/request"

// 获取用户信息
export function getUserInfo() {
  return request({
    url: "/api/userInfo",
    method: "get"
  })
}

// 获取用户列表
export function userList() {
  return request({
    url: "/api/userList",
    method: "get"
  })
}

// 登录
export function login(data: any) {
  return request({
    url: "/api/login",
    method: "post",
    data
  })
}

// 发送邮箱验证码
export function sendEmailCode(data: any) {
  return request({
    url: "/api/sendEmailCode",
    method: "post",
    data
  })
}

// 注册
export function reguser(data: any) {
  return request({
    url: "/api/reguser",
    method: "post",
    data
  })
}