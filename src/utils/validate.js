// let patternMainLand = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;//大陆
let paternMainLand = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}X)$)$/;
let patternHongkong = /^((\s?[A-Za-z])|([A-Za-z]{2}))\d{6}(\([0-9aA]\)|[0-9aA])$/; //香港
let patternTaiwan = /^[a-zA-Z][0-9]{9}$/; //台湾
let patternMacao = /^[1|5|7][0-9]{6}\([0-9Aa]\)/; //澳门

/** 身份证匹配 */
export function isId(id) {
    id = id || "";
    let isMainLand = paternMainLand.test(id);
    let isHongKong = patternHongkong.test(id);
    let isTaiwan = patternTaiwan.test(id);
    let isMacao = patternMacao.test(id);

    return isMainLand || isHongKong || isTaiwan || isMacao;
}

let nameReg = /^[\u4E00-\u9FA5]{2,20}(?:·[\u4E00-\u9FA5]{2,20})*$|^[a-zA-Z]+\s?[\.·\-()a-zA-Z]*[a-zA-Z]+$/;

export function isName(name) {
    name = name || "";
    return nameReg.test(name.trim());
}

let phoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;

export function isPhone(phone) {
    phone = phone || "";
    return phoneReg.test(phone.trim());
}

let emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
export function isEmail(email) {
    email = email || "";
    return emailReg.test(email.trim());
}

let workPhoneReg = /^\d{3,4}-\d{7,8}$/
export function isWorkPhone(phone) {
    phone = phone || "";
    return workPhoneReg.test(phone.trim());
}

let executeNumberReg = /^\d{17}$/;
export function isExecuteNumber(str) {
    str = str || "";
    return executeNumberReg.test(str.trim());
}

export function isPassword(str) {
    str = str || "";
    str = str.trim();
    return str.length >= 6 && str.length <= 12;
}

/** 长度小于num */
export function isLessThan(str, num) {
    let valiStr = str || "";
    valiStr = valiStr + " ";
    valiStr = valiStr.trim();
    return valiStr.length <= num;
}

let codeReg = /^[a-zA-Z0-9_]+$/;
export function isCode(code) {
    code = code || "";
    return codeReg.test(code.trim());
}

// 正整数
let integerReg = /^[0-9]*[1-9][0-9]*$/;
export function isInteger(value) {
    value = value || "";
    return integerReg.test(value);
}

// url 
let urlReg = /^(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$/;
export function isUrl(value) {
    value = value || "";
    return urlReg.test(value);
}