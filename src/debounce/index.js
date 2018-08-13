/**
 * 
 * @param {*func} func 回调函数
 * @param {*number} wait 等待时间
 * @param {*bool} immediate 是否立即执行
 */
const debounce = (func, wait, immediate) => {
    let timeout, result;

    const debounced = (...args) => {
        if (timeout) {
            clearTimeout(timeout);
        }
        if (immediate) {
            // 如果已经执行过就不再执行
            const callNow = !timeout;
            timeout = setTimeout(() => {
                timeout = null;
            }, wait);
            if (callNow) {
                result = func(...args);
            }
        } else {
            timeout = setTimeout(() => {
                func(...args);
            }, wait);
        }

        return result;
    };

    debounced.cancel = () => {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
};

export default debounce;
