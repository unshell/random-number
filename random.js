/**
 * 随机一个数（包含最大值、最小值）
 * 
 * @param {Number}  min   最小值
 * @param {Number}  max   最大值
 * @param {Array}   range 自定义区间
 */
function randomOne(min, max, range) {
    if (!min) min = 1;
    if (!max) max = 10;
    if (!range) range = [];
    if (range.length > 0) {
        min = 0;
        max = range.length - 1;
        return range[Math.floor(Math.random() * (max - min + 1)) + min];
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 随机多个数（包含最大值、最小值）
 * 
 * @param {Number}  min           最小值
 * @param {Number}  max           最大值
 * @param {Number}  limit         出数量
 * @param {Array}   reservation   预留数字
 * @param {Boolean} duplicated    允许重复
 * @param {Array}   range         自定义区间
 */
function randomMore(min, max, limit, reservation, duplicated, range) {
    if (!min) min = 1;
    if (!max) max = 10;
    if (!limit || limit <= 0) limit = 1;
    if (!reservation) reservation = [];
    if (duplicated === undefined) duplicated = false;
    for (var i = 0, n = 0; i < limit; i++) {
        // 预留数字长度大于出数量的处理
        if (reservation.length >= limit) {
            reservation = reservation.slice(0, limit);
            break;
        }
        // 出数量大于范围值的处理
        if (limit > (max - min + 1)) {
            break;
        };
        // 是否出现重复数字的处理
        do {
            n = randomOne(min, max, range);
        } while (!duplicated && reservation.indexOf(n) != -1);

        reservation.push(n);
    }
    return sort(reservation, false);
}

/**
 * 数组排序
 * 
 * @param {Array} array     排序的数组
 * @param {Boolean} random    随机排序
 */
function sort(array, random) {
    return array.sort(function (a, b) {
        if (random) return 0.5 - Math.random();
        return a - b;
    });
}

/**
 * Copy 粘贴板
 * 
 * @param {String} text
 */
function copy(text) {
    var transfer = document.createElement('textarea');
    document.body.appendChild(transfer);

    transfer.value = text;
    transfer.focus();
    transfer.select();
    if (document.execCommand('copy')) {
        document.execCommand('copy');
    }
    transfer.blur();
    document.body.removeChild(transfer);
}

/**
 * 设置本地缓存
 * 
 * @param {String}  key   键
 * @param {*}       value 值
 */
function setStorage(key, value) {
    if (window.localStorage) {
        if (!value) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }
}

/**
 * 获取本地缓存
 * 
 * @param {String}  key 键
 */
function getStorage(key) {
    if (window.localStorage) {
        var value = localStorage.getItem(key);
        return value ? JSON.parse(value) : {};
    }
    return {};
}

/**
 * 设置历史缓存
 * 
 * @param {*} value 值
 */
function setHistory(value) {
    setStorage('random-history', value);
}

/**
 * 设置历史缓存
 */
function getHistory() {
    return getStorage('random-history') || {};
}