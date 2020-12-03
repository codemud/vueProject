import request from "@/utils/request";
const common = {
    /**
     * 时间格式化
     * @param {*} value 可转化为时间的值
     * @param {string} fmt 格式 除了月使用大写M，其它都是小写
     * @returns {string}
     */
    dateFormat(value, fmt){
        if (new Date(value).toString() === 'Invalid Date') {
            throw new Error('Invalid Date');
        }
        const date = new Date(value);
        const o = {
            'M+': date.getMonth() + 1, // 月份
            'd+': date.getDate(), // 日
            'h+': date.getHours(), // 小时
            'm+': date.getMinutes(), // 分
            's+': date.getSeconds(), // 秒
            'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
            S: date.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                (date.getFullYear() + '').substr(4 - RegExp.$1.length)
            );
        }
        for (const k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(
                    RegExp.$1,
                    RegExp.$1.length === 1 ?
                        o[k] :
                        ('00' + o[k]).substr(('' + o[k]).length)
                );
            }
        }
        return fmt;
    },
    /**
     * 深拷贝
     */
    deepCopy(obj) {
        let result = Array.isArray(obj) ? [] : {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    result[key] = this.deepCopy(obj[key]) // 递归复制
                } else {
                    result[key] = obj[key]
                }
            }
        }
        return result
    },
    /**
     * 效验手机号码
     */
    checkPhone(phone){
        if(phone === ''){
            this.showToast('手机号码不能为空！');
            return false
        }
        if(!(/^1[2345789]\d{9}$/.test(phone))){
            this.showToast('手机号码有误，请重新输入');
            return false
        }else{
            return true
        }
    },
    /**
     * 生成随机数
     * @param {Object} n 需要几位随机数
     */
    randomn(n) {
        if (n > 21) return null;
        return parseInt((Math.random() + 1) * Math.pow(10,n-1))
    },
    getOptions(json){
        if(json.url){
            request({
                url: json.url,
                method: "post",
                data:json.data || {}
            }).then(res=>{
                let async = this.getSelCurr(json.target());
                json.callback && json.callback(res,async);
            });
        } else{
            this.nextTick(()=>{
                let async = this.getSelCurr(json.target());
                json.callback && json.callback(async);
            })
        }
    },
    getSelCurr(arr) {
        const [formData,objKey] = [...arr];
        return formData.find(item=>item.name === objKey);
    },
};
export default common;
