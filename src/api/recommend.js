import jsonp from "common/js/jsonp.js"
import {commonParams,options} from "./config.js"
import axios from "axios";


/**
 * jsonp 抓取推荐页轮播图数据
 * 接口：https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg
 */
export function getRecommend(){
  const url = "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
  const data = Object.assign({},commonParams,{
    platform: 'h5',
    needNewCode: 1,
    uin: 0
  })
  return jsonp(url,data,options)
}

/**
 * axios 抓取推荐页列表数据
 * 接口：https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg
 * 接口提供方使用了 referer:https://y.qq.com/portal/playlist.html
 * axios 结合 node.js 代理后端请求
 */
export function getList(){
  
  let data = Object.assign({},commonParams,{
    rnd: Math.random(),
    hostUin: 0,
    format: 'json',
    platform: 'yqq',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29
  })  
  
  return axios.get('/api/getList',{
    params:data
  }).then((res)=>{
    // console.log(res);
    return Promise.resolve(res.data)
  }).catch(function(error){
    console.log(error);
  })
}

export function getRank(){
  const url = "https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg";
  const data = Object.assign({},commonParams,{
    platform:'h5',
    needNewCode: '1',
    uin: '0'
  })
  return jsonp(url,data,options)
}
















