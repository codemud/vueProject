const TOKEN_KEY = "manage_token";
const USER_KEY = "manage_user";
const USER_SKIN = "manage_skin";
const STS_KEY = "manage_sts";
const MENUBAR = "manage_menubars";
const SEX = 'manage_sex';
const STATE = 'manage_state';//状态
const MENBERCERT = "manage_gh_member_cert";//患者认证状态
const GHYUYUE = "manage_gh_yuyue";//预约状态
const GHWORKTIME = "manage_gh_work_time";//挂号池工作时间区间
const DOCTORWORKSTATE = "manage_gh_doctor_work_state";//就诊状态
const AREA = 'manage_area';//区域
const GH_STATE = 'manage_ghstate';//医生挂号状态
const LEVEL = 'manage_level';//医院等级
const PROPERTY = 'manage_property';//医院性质
const GH_HTYPE = 'manage_gh_hospital_type';//医院类型
const HITYPE = 'manage_hitype';//医保类型
const BDNATURE = 'manage_bdnature';//百度类型
const PROFESSION = 'manage_profession';//医生职业
const LOGINCODE = 'manage_logincode';//登录code
// 获取 token
export function getToken () {
  return localStorage.getItem(TOKEN_KEY);
}
// 保存 token
export function setToken (token) {
  return localStorage.setItem(TOKEN_KEY, token);
}
// 获取用户信息
export function getUser () {
  return JSON.parse(localStorage.getItem(USER_KEY));
}
// 保存用户信息
export function setUser (user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}
// 获取皮肤
export function getSkin () {
  return JSON.parse(localStorage.getItem(USER_SKIN));
}
// 设置皮肤
export function setSkin (skin) {
  localStorage.setItem(USER_SKIN, JSON.stringify(skin));
}
// 获取菜单选项卡
export function getMenuBar () {
  return JSON.parse(localStorage.getItem(MENUBAR));
}
// 设置菜单选项卡
export function setMenuBar (menuBar) {
  localStorage.setItem(MENUBAR, JSON.stringify(menuBar));
}
// 设置STS
export function setSTS (msg) {
  localStorage.setItem(STS_KEY, JSON.stringify(msg));
}
// 获取STS
export function getSTS () {
  return JSON.parse(localStorage.getItem(STS_KEY));
}
// 获取 性别
export function getSex () {
    return JSON.parse(localStorage.getItem(SEX));
}
// 保存 性别
export function setSex (sex) {
    return localStorage.setItem(SEX, JSON.stringify(sex));
}
// 获取 状态
export function getState () {
    return JSON.parse(localStorage.getItem(STATE));
}
// 保存 状态
export function setState (state) {
    return localStorage.setItem(STATE, JSON.stringify(state));
}
// 获取 区域
export function getArea () {
    return JSON.parse(localStorage.getItem(AREA));
}
// 保存 区域
export function setArea (area) {
    return localStorage.setItem(AREA, JSON.stringify(area));
}
// 获取 患者认证状态
export function getMenberCert () {
  return JSON.parse(localStorage.getItem(MENBERCERT));
}
// 保存 患者认证状态
export function setMenberCert (menberCert) {
  return localStorage.setItem(MENBERCERT, JSON.stringify(menberCert));
}
//预约状态
// 获取 预约状态
export function getYuYue () {
  return JSON.parse(localStorage.getItem(GHYUYUE));
}
// 保存 预约状态
export function setYuYue (yuYue) {
  return localStorage.setItem(GHYUYUE, JSON.stringify(yuYue));
}
// 获取 挂号状态
export function getGhState () {
    return JSON.parse(localStorage.getItem(GH_STATE));
}
// 保存 挂号状态
export function setGhState (state) {
    return localStorage.setItem(GH_STATE, JSON.stringify(state));
}
// 获取 医院等级
export function getLevel () {
    return JSON.parse(localStorage.getItem(LEVEL));
}
// 保存 医院等级
export function setLevel (level) {
    return localStorage.setItem(LEVEL, JSON.stringify(level));
}
// 获取 医院性质
export function getProperty () {
    return JSON.parse(localStorage.getItem(PROPERTY));
}
// 保存 医院性质
export function setProperty (property) {
    return localStorage.setItem(PROPERTY, JSON.stringify(property));
}

// 获取 医院类型
export function getGHtype () {
  return JSON.parse(localStorage.getItem(GH_HTYPE));
}
// 保存 医院类型
export function setGHtype (property) {
  return localStorage.setItem(GH_HTYPE, JSON.stringify(property));
}

// 获取 医保类型
export function getHitype () {
    return JSON.parse(localStorage.getItem(HITYPE));
}
// 保存 医保类型
export function setHitype (type) {
    return localStorage.setItem(HITYPE, JSON.stringify(type));
}
// 获取 百度类型
export function getBdnature () {
    return JSON.parse(localStorage.getItem(BDNATURE));
}
// 保存 百度类型
export function setBdnature (type) {
    return localStorage.setItem(BDNATURE, JSON.stringify(type));
}
// 获取 医生职业
export function getProfession () {
    return JSON.parse(localStorage.getItem(PROFESSION));
}
// 保存 医生职业
export function setProfession (profession) {
    return localStorage.setItem(PROFESSION, JSON.stringify(profession));
}
// 获取 登录code
export function getLoginCode () {
    return JSON.parse(localStorage.getItem(LOGINCODE));
}
// 保存 登录code
export function setLoginCode (code) {
    return localStorage.setItem(LOGINCODE, JSON.stringify(code));
}
// 获取 挂号池工作时间区间
export function getWorkTime () {
    return JSON.parse(localStorage.getItem(GHWORKTIME));
}
// 保存 挂号池工作时间区间
export function setWorkTime (time) {
    return localStorage.setItem(GHWORKTIME, JSON.stringify(time));
}
// 获取 就诊状态
export function getDoctorWorkState () {
    return JSON.parse(localStorage.getItem(DOCTORWORKSTATE));
}
// 保存 就诊状态
export function setDoctorWorkState (state) {
    return localStorage.setItem(DOCTORWORKSTATE, JSON.stringify(state));
}

// 移除用户信息
export function removeToken () {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(STS_KEY);
  localStorage.removeItem(USER_SKIN);
  localStorage.removeItem(MENUBAR);
}
