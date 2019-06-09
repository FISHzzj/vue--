import originJSONP from 'jsonp'

export default function jsonp(url,data,option){
  url += (url.indexOf('?')<0 ? '?' : '&') + param(data);
  console.log(url);
  // url:纯净的地址
  // data:传递的参数
  // option：与后端定义的一个字段callback()
  return new Promise((resolve,reject)=>{
    originJSONP(url,option,(err,data)=>{
      if(!err){
        resolve(data)
      }else{
        reject(err)
      }
    })
  })
}

function param(data){
  let url = "";
  for(var k in data){
    let value = data[k] !== undefined ? data[k] : '';
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}


