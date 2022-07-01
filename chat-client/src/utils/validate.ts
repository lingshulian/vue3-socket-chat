/**
 * 密码验证
 */
export function regularPassword(val: string) {
    if (/^[a-zA-Z0-9_]{6,18}$/.test(val)) return true
    return false
}
export function validatorPassword(rule: any, val: string, callback: Function) {
    if (!val) {
        return callback()
    }
    if (!regularPassword(val)) {
        return callback(new Error('请输入6-18位字母数字组合密码'))
    }
    return callback()
}