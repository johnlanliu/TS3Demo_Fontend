// 英语错误码
const en = {
  // global
  '-5': 'timeout of 15000ms',
  200: 'Response processing is normal',
  400: 'Parameter error',
  403: 'Unauthorized ',
  404: 'not found',
  500: 'Server error',
  5001: 'Database error',
  5002: 'rest api error',
  40001: 'Non picture',
  40002: 'File is too large',
  40010: 'Error in email format',
  // user
  400100: 'User or password error',
  400102: 'The account already exists',
  400103: 'Email or account already exists',
  400104: 'User parameter error',
  400106: 'User Registered',
  400107: 'Repeated binding',
  403100: 'You can\'t change your role ',
  403101: 'Can\'t delete oneself ',
  403102: 'The device does not belong to you',
  403103: 'Account not activated',
  404100: 'This account does not exist',
  404101: 'Account No Binding Account',
  404102: 'Email not found',
  // device
  400200: 'Device password error',
  400201: 'Device inactivated',
  400203: 'Equipment IMEI duplication',
  400204: 'Error in device phone number',
  400205: 'Errors in device settings',
  400206: 'Device IMEI format error',
  400207: 'Device firmware file type error',
  400208: 'Firmware version duplication',
  401200: 'Device has been locked',
  401201: 'Device is not on sale',
  401202: 'Can not modify the direct company when the status is Using',
  401203: 'The company must be a tree structure',
  404200: 'The IMEI device was not found',
  404201: 'The device was not entered Tracker Server',
  // authority
  400400: 'Parameter error',
  400401: 'Repetition of roles',
  404400: 'No role found',
  // sim
  405100: 'Sim interface password error',
  405101: 'SIM card number duplication',
  405102: 'Sim request parameter error',
  404500: 'The SIM card information was not found',
  // org
  400600: 'Can\'t delete oneself ',
  400601: 'Parameter error',
  400602: 'Can\'t delete subordinate company ',
  400603: 'Companies with devices cannot be deleted',
  400604: 'Companies with users cannot be deleted',
  400605: 'repetition',
  400606: 'It is not possible to modify a company\'s parent company as its own or subsidiary company.',
  400607: 'Email already exists',
  403600: 'No permission!',
  404600: 'No company found',
  // model, firmware, batch
  400701: 'Firmware duplication',
  400702: 'Parameter error',
  400703: 'Model duplication',
  400704: 'No deletion of equipment under mode',
  400705: 'Parameter error',
  400706: 'Batch repeat',
  400707: 'Parameter error',
  400708: 'Excel Format Error',
  400709: 'Batch name duplication',
  404701: 'Firmware not found',
  404702: 'Model not found',
  404703: 'Batch not found',
  // order
  400801: 'Order duplication',
  400802: 'Parameter error',
  404800: 'Order not found',
  // POI
  400900: 'Data under POI cannot be deleted',
  403900: 'The POI is not subordinate',
  404900: 'POI not found',
  // vehicle/ driver
  4001100: 'Parameter error',
  4001110: 'Parameter error',
  4001101: 'No permission to operate driver',
  4001111: 'No permission to operate vehicle',
  4041100: 'Can\'t find driver',
  4041110: 'Can\'t find vehicle',
  // share location
  4001300: 'Parameter error',
  4001301: 'Key has expired, and the information of the vehicle will no longer be updated',
  4041300: 'No shared vehicle found'
};

export default en;
