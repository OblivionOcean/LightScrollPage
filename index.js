/**
 * @author <a href="https://www.oblivionocean.top/">Team OblivionOcean</a>
 * @copyright Copyright (c) 2024 Team OblivionOcean
 * @license <a href="https://github.com/OblivionOcean/LightScrollPage/blob/master/LICENSE">MIT License</a>
 * @description 一个基于原生JS的微型滚动动画库，不需要依赖，只需要一个JS文件，源代码小于1KB
 * @version 1.0.1
 * @class
 * @param {string|Element} element 动画盒子的CSS选择器或element对象
 * @returns {ScrollPage} lsp对象
 * @example
 * const lsp = new ScrollPage(".scrollPage");// 初始化lsp对象, 需要传入目标的CSS选择器或者element对象
 * lsp.addEventListener((event) => {// 创建监听事件
 *    // event对象
 *    // 在滚动动画范围内
 *      pageNum: 当前页码
 *      pageHeight: 当前页长度
 *      pageToTop: 当前页距离顶端（相对于页面长度）
 *      scrollPage: 当前页距离顶端（相对于整个动画盒子的长度）
 *      element: 动画盒子的元素对象
 *      page: 当前页的元素对象
 *
 *   // 超出范围时
 *     without: up/down 分别为从上端超出和从下端超出
 * })
*/
class ScrollPage {
    /**
     * 创建lsp对象  
     *     
     * @constructor    
     * @param {string|HTMLElement} element 动画盒子的CSS选择器或element对象
     * @returns {ScrollPage} - lsp对象
    */
    constructor(element) {
        this.element = (typeof element === "string") ? document.querySelector(element) : element
        this.content = this.element.querySelectorAll('.page')
        this.events = []
        this.init()
    }

    /**
     * 事件处理函数
     * 
     * @private
     * @memberof ScrollPage
     * @returns {void}
     */
    _event() {
        this.element.clientRect = this.element.getBoundingClientRect()
        let event = undefined;
        if (this.element.clientRect.top < 0 && this.element.clientRect.bottom > window.innerHeight) {
            this.setAllElements(this.content, (i) => {
                i.style.position = "fixed";
                i.style.top = "50%";
                i.style.left = "50%";
                i.style.transform = "translate(-50%, -50%)";
                if (i.style.display != "none") {
                    i.tmp.display = i.style.display;
                }
                i.style.display = "none";
            })
            let pageNum = Math.floor((-this.element.clientRect.top - ((-this.element.clientRect.top) % (this.element.clientRect.height / this.content.length))) / (this.element.clientRect.height / this.content.length));
            this.content[pageNum].style.display = this.content[pageNum].tmp.display;
            event = {
                pageNum: pageNum,
                pageHeight: this.element.clientRect.height / this.content.length,
                pageToTop: pageNum * this.element.clientRect.height / this.content.length,
                scrollPage: -this.element.clientRect.top % (this.element.clientRect.height / this.content.length) / (this.element.clientRect.height / this.content.length),
                element: this.element,
                page: this.content[pageNum],
            }
        } else {
            this.setAllElements(this.content, (i) => {
                if (i.style.display != "none") {
                    i.tmp.display = i.style.display;
                }
                this.setStyle(i, "position:absolute;dispaly:none;transform:none")
            })
            if (this.element.clientRect.top > 0) {
                this.content[0].style.display = this.content[0].tmp.display;
                this.setStyle(this.content[0], "top:unset;left:0;bottom:unset")
            } else {
                this.setStyle(this.content[this.content.length - 1], "top:unset;left:0;bottom:0")
                this.content[this.content.length - 1].style.display = this.content[this.content.length - 1].tmp.display;
            }
        }
        for (let eventFunc of this.events) {
            try {
                eventFunc(event || { without: (this.element.clientRect.top > 0) ? "up" : "down" })
            } catch (e) {
                console.log(e)
            }
        }
    }

    /**
     * 设置元素的CSS样式
     * 
     * 内附微型CSS解释器
     * 
     * @param {HTMLElement} element 元素
     * @param {string} style CSS代码
     * @private
     * @memberof ScrollPage
     * @returns {void}
     */
    setStyle(element, style) {
        style = style.split(";");
        for (let i of style) {
            if (i.trim() != "") {
                let tmp = i.trim().split(":");
                element.style[tmp[0].trim()] = tmp.slice(1).join(":").trim();
            }
        }
    }

    /**
     * 设置所有元素的属性
     * 
     * @param {HTMLElement[]} elements 元素集合
     * @param {function(element:HTMLElement) : void} func 设置函数
     * @private
     * @memberof ScrollPage
     * @returns {void}
     */

    setAllElements(elements, func) {
        for (let i of elements) {
            func(i)
        }
    }

    /**
     * 初始化
     * 
     * @private
     * @memberof ScrollPage
     * @returns {void}
    */

    init() {
        this.element.style.position = "relative";
        this.element.style.width = "100%";
        this.setAllElements(this.content, (i) => {
            i.tmp = {};
            i.tmp.display = i.style.display;
            this.setStyle(i, "display:none;position:absolute;top:0;left:0;bottom:unset;transform:none;width:100%;height:100vh")
        })
        this.content[0].style.display = this.content[0].tmp.display;
        window.addEventListener("scroll", this._event.bind(this))
        window.addEventListener("resize", this._event.bind(this))
        window.addEventListener("orientationchange", this._event.bind(this))
    }
    /**
     * 滚动监听
     * 
     * @param {function(event:object) : void} func 监听处理器 
     * @returns void
     * @memberof ScrollPage
     */
    addEventListener(func) {
        this.events.push(func);
    }
}

// 滚动页面 自动模式处理函数注册
document.addEventListener("DOMContentLoaded", () => { // 初始化
    for (let i of document.querySelectorAll(".scroll-page")) {
        i.sp = new ScrollPage(i)
    }
})
