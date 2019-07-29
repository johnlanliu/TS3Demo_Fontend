import axios from '@/config/axios';
import { baseUrl } from '@/config/env';

/**
 * 登陆
 */
export const login = data => axios.get('/author/login', data);

/**
 * 退出
 */
export const logout = data => axios.get('/author/logout', data);

/**
 * 登陆验证，  判断token是否还有效
 */
export const authToken = data => axios.get('/author/authToken', data);

/**
 * 激活组织
 */
export const organizationActive = (data,body) => axios.post('/author/organizationActive', data, body);
export const getOrgByKey = data => axios.get('/author/getOrgByKey', data);

/**
 * 给指定邮箱发送邮件(找回密码)
 */
export const sendResetPwdEmail = data => axios.get('/author/sendResetPwdEmail', data);

export const getUserByKey = data => axios.get('/author/getUserByKey', data);

/**
 * 重置密码(找回密码or邮件激活账号)
 */
export const resetPwd = (data,body) => axios.post('/author/resetPwd', data, body);

/**
 * 修改密码
 */
export const editPwd = (data, body) => axios.post('/author/editUserPwd', data, body);

/**
 *通用模块
 */
export const getModelSelect = data => axios.get('/common/getAllModelList', data, 'GET');
export const getBatchSelect = data => axios.get('/common/getAllModelList', data, 'GET');
/**
 *通用模块
 */


/**
 *组织管理模块-设备子模块
 */
export const addDevice = (data,body) => axios.post('/orgMDevice/addDevice', data, body,'POST');
export const getDeviceById = data => axios.get('/orgMDevice/getDeviceById', data);
export const getDeviceSettingById = data => axios.get('/orgMDevice/getDeviceSettingById', data);
export const getFirmeUpdateListByModelId = null;
export const getDevices = data => axios.get('/orgMDevice/getDeviceList', data);
export const getDevicesTotalRow = data => axios.get('/orgMDevice/getDeviceCount', data);
export const editDevice = (data,body) => axios.post('/orgMDevice/editDevice', data, body);
export const batchEditDevice = (data,body) => axios.post('/orgMDevice/batchEditDevice', data, body);
export const batchMoveDevice = (data,body) => axios.post('/orgMDevice/batchMoveDevice', data, body);
export const batchUpdateDevice = null;
export const batchEditDeviceSetting = null;
export const deleteDevice = data => axios.get('/orgMDevice/deleteDevice', data);

export const wakeup = null;
export const reset = null;

/**
 *组织管理模块-组织子模块
 */
export const getOrgList = data => axios.get('/orgMOrganization/getOrgList', data);
export const getOrgById = data => axios.get('/orgMOrganization/getOrgById', data);
export const addOrg = (data,body) => axios.post('/orgMOrganization/addOrg', data ,body);
export const addPartner = (data,body) => axios.post('/orgMOrganization/addPartner', data ,body);
export const invitePartner = data => axios.get('/orgMOrganization/sendActiveEmail', data);
export const editOrg = (data,body) => axios.post('/orgMOrganization/editOrg', data ,body);
export const editPushUrl = (data,body) => axios.post('/orgMOrganization/editPushUrl', data ,body);
export const renewApiKey = (data,body) => axios.post('/orgMOrganization/renewApiKey', data ,body);
export const deleteOrg = data => axios.get('/orgMOrganization/deleteOrg', data);
/**
 *组织管理模块-用户子模块
 */
export const addUser = (data,body) => axios.post('/orgMUser/addUser', data ,body);
export const inviteUser = data => axios.get('/orgMUser/sendActiveEmail', data);
export const getUsers = data => axios.get('/orgMUser/getUserList', data);
export const getUserById = data => axios.get('/orgMUser/getUserById', data);
export const getValidRoleList = data => axios.get('/orgMUser/getValidRoleList', data);
export const editUser = (data,body) => axios.post('/orgMUser/editUser', data ,body);
export const deleteUser = data => axios.get('/orgMUser/deleteUser', data);

/**
 *角色管理模块
 */
export const getRoleList = data => axios.get('/roleManager/getAllRoleList', data);
export const addRole = (data,body) => axios.post('/roleManager/addRole', data, body);
export const editRole = (data,body) => axios.post('/roleManager/editRole', data, body);
export const deleteRole = data => axios.get('/roleManager/deleteRole', data);

/**
 *菜单管理模块
 */
export const getMenuList = data => axios.get('/menuManager/getAllMenuList', data);
export const getMenuListById = data => axios.get('/menuManager/getMenuListByRoleId', data);
export const addMenu = (data,body) => axios.post('/menuManager/addMenu', data, body);
export const editMenu = (data,body) => axios.post('/menuManager/editMenu', data, body);
export const deleteMenu = data => axios.get('/menuManager/deleteMenu', data);

/**
 *字典管理模块
 */
export const getDictList = data => axios.get('dictManager/getAllDictList', data);
export const getDictById = (data, body) => axios.post('dictManager/getDictById', data, body);
export const addDict = (data, body) => axios.post('dictManager/addDict', data, body);
export const editDict = (data, body) => axios.post('dictManager/editDict', data, body);
export const deleteDict = data => axios.get('dictManager/deleteDict', data);

/**
 * Payment
 */
export const addPayment = (data, body) => axios.post('orgMPayment/addPayment', data, body);
export const getPaymentList = data => axios.get('/orgMPayment/getPaymentList', data);
export const voidPayment = (data, body) => axios.post('orgMPayment/voidPayment', data, body);
export const getPaymentByPaymentId = data => axios.get('/orgMPayment/getPaymentByPaymentId', data);
export const editPayment = (data, body) => axios.post('orgMPayment/editPayment', data, body);

/**
 * Order
 */
export const addOrder = (data, body) => axios.post('orgMOrder/addOrder', data, body);
export const getOrderList = data => axios.get('/orgMOrder/getOrderList', data);
export const getOrderByOrderId = data => axios.get('orgMOrder/getOrderByOrderId', data);
export const validInvoiceNo = data => axios.get('orgMOrder/validInvoiceNo', data);
export const cancelOrder = (data, body) => axios.post('orgMOrder/cancelOrder', data, body);
export const getLastInvoiceNo = data => axios.get('/orgMOrder/getLastInvoiceNo', data);
export const editOrder = (data, body) => axios.post('/orgMOrder/editOrder', data, body);

/**
 * Order Item
 */
export const getOrderItem = data => axios.get('/orgMOrderItem/getOrderItemList', data);
export const deleteOrderItem = (data, body) => axios.post('/orgMOrderItem/deleteOrderItem', data, body);

/**
 * Payment Item
 */
export const getPaymentItem = data => axios.get('/orgMPaymentItem/getPaymentItemList', data);
export const deletePaymentItem = (data, body) => axios.post('/orgMPaymentItem/deletePaymentItem');
