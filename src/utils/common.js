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
        //时间戳10位需要*1000,13位不用
        const time = new Date((value+'')).getTime();
        const date = time.length === 10 ? new Date(time * 1000):new Date(time);
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
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
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
    /**
     *解决cardFrom表单组件中发送请求并回调赋值的操作
     * @param json:{
     * url:请求地址
     * target：[数组源数据,需要赋值的那条数据name值]
     * callback()：回调函数，返回getSelCurr匹配到的数组源数据中那条数据
     * }
     */
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
    /**
     * 解决需要将数组数据中某些值进行转变，如id:'1'变成value:'1'
     * @param arr:数据源 ,Array
     * @param targetKey:将转换成的key ,Object : {id:'value',name:'label'}
     *         id --> value;name --> label
     * @param nodeString:树形结构节点,一般是'children',  String ,默认children
     */
    changeTree(arr,targetKey,nodeString = 'children') {
        let sourceArr = arr;
        sourceArr.map(res=>{
            for(let [key, value] of Object.entries(targetKey)){
                res[value] = res[key];
            }
            if(res[nodeString]){
                this.changeTree(res[nodeString],targetKey)
            }
        });
        return sourceArr;
    },
    /**
     * 根据数据中的id或其他值，找到对应那条数据
     * @param arr 数据源
     * @param value 集合中的value值,列表返回里面的例如sex：1
     * @param key 依据key值找到对应的那条数据
     */
    getSelectName(arr,value,key){
        return arr.find(item=>item[key] === value)
    },
    /**
     * js 文本复制
     * @param value 需复制的值
     */
    copy(value) {
        let currentFocus = document.activeElement; // 保存当前活动节点
        let input = document.createElement('input'); // 创建一个input标签
        document.body.appendChild(input); // 把标签添加给body
        input.style.opacity = 0; //设置input标签设置为透明(不可见)
        input.value = value; // 把需要复制的值放到input上
        // 记录当前滚动位置, 因为添加节点并选中的时候会影响页面滚动
        let scrollY = window.scrollY;
        input.focus(); // input节点获取焦点
        input.setSelectionRange(0, input.value.length); // 选中input框中的所有文字
        let res = document.execCommand('copy', true); // 复制文字并获取结果
        currentFocus.focus(); // 之前活动节点获得焦点
        document.body.removeChild(input); // 删除添加的input节点
        // 页面滚动到之前位置
        window.scrollTo(0, scrollY);
        return res; // 返回操作结果
    },
};
export default common;
