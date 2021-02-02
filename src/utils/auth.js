const TOKEN_KEY = "manage_token";
const USER_KEY = "manage_user";
const USER_SKIN = "manage_skin";
const STS_KEY = "manage_sts";
const MENUBAR = "manage_menubars";
const SEX = 'manage_sex';
const STATE = 'manage_state';//状态
const LEVEL = 'manage_level';//等级
const PROFESSION = 'manage_profession';//职业
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
// 获取 等级
export function getLevel () {
    return JSON.parse(localStorage.getItem(LEVEL));
}
// 保存 等级
export function setLevel (level) {
    return localStorage.setItem(LEVEL, JSON.stringify(level));
}

// 获取 职业
export function getProfession () {
    return JSON.parse(localStorage.getItem(PROFESSION));
}
// 保存 职业
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

// 移除用户信息
export function removeToken () {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(STS_KEY);
  localStorage.removeItem(USER_SKIN);
  localStorage.removeItem(MENUBAR);
}
