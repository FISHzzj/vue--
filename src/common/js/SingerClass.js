//歌手信息类
export class Singer{
  // 传入一个对象
  constructor({id,name}){
    this.id = id,
    this.name = name,
    this.avatar=`//y.gtimg.cn/music/photo_new/T001R150x150M000${id}.jpg?max_age=2592000`
  }
}
 
export function createSinger(singer){
  return new Singer({
    id:singer.Fsinger_mid,
    name:singer.Fsinger_name
  })
}


