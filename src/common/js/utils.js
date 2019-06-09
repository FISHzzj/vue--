// 通用方法
/*
* @Author: zzj
* @Date:   2017-08-01 10:45:26
* @Last Modified by:   zzj
* @Last Modified time: 2017-08-09 16:57:07
*
* import { myDOM } from '@/common/js/utils.js'
* 使用本对象中的方法时，使用 this。this.hasClass(el, className)
* 使用本库其他对象中的方法时，直接调用。myNumber.getRandom(0, i)
*/



export const myDOM = {



  
  /**
   * 获取/设置 自定义属性 data-${name}=val
   * 如果传入了 val 就设置自定义属性 `data-${name}` 的值为 val
   * 如果没有传入了 val 就获取自定义属性 `data-${name}` 的值
   */
  customAttribute(el,name,val){
    if(val){
      return el.setAttribute(`data-${name}`,val)
    }else{
      return el.getAttribute(`data-${name}`)
    }

  }
}
