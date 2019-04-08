/**
 * 密码格式
 */
const regPwd = /^[a-zA-Z0-9]{6,32}$/;
/**
 * 邮箱格式
 */
const regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

export {
  regPwd,
  regEmail
};