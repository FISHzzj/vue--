webpackJsonp([5],{436:function(e,t,n){function o(e){this.$style=n(782),n(746)}var r=n(56)(n(601),n(707),o,"data-v-05ec4de4",null);e.exports=r.exports},452:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{cname:{type:String,default:""},title:{type:String,default:""},fanhui:{type:String,default:""},shezhi:{type:String,default:""},txt:{type:String,default:""}},data:function(){return{panelClass:"panel",iconfont:"iconfont"}},methods:{txtClick:function(){this.$emit("tranfer","跳转")},sheClick:function(){this.$emit("tranferset","跳转")}}}},453:function(e,t,n){t=e.exports=n(30)(!1),t.push([e.i,"\n.panel[data-v-5e65eab6] {\n  background: #89e0be;\n  padding: 0;\n}\n.panel > div[data-v-5e65eab6]:first-child {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -ms-flex-wrap: nowrap;\n      flex-wrap: nowrap;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  padding: 0.5rem 0.25rem;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  background: #89e0be;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  line-height: 1rem;\n}\n.panel > div:first-child > h4[data-v-5e65eab6] {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  text-align: center;\n  color: #fff;\n  font-size: 0.8rem;\n}\n.iconfont[data-v-5e65eab6] {\n  font-size: 0.75rem;\n  color: #ffffff;\n}",""])},454:function(e,t,n){function o(e){n(456)}var r=n(56)(n(452),n(455),o,"data-v-5e65eab6",null);e.exports=r.exports},455:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{class:[e.panelClass,e.cname]},[n("div",[n("i",{class:[e.iconfont,e.fanhui],on:{click:function(t){return e.$router.back()}}}),e._v(" "),n("h4",[e._v(e._s(e.title))]),e._v(" "),e.shezhi?n("i",{class:[e.iconfont,e.shezhi],on:{click:e.sheClick}}):n("span",{on:{click:e.txtClick}},[e._v(e._s(e.txt))])]),e._v(" "),e._t("default")],2)},staticRenderFns:[]}},456:function(e,t,n){var o=n(453);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);n(31)("13e25ca1",o,!0,{})},549:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={components:{},props:{title:{type:String,default:""},thumb:{type:String,default:""},status:{type:String,default:""},status2:{type:String,default:""}},methods:{selectImg:function(e){console.log(e);var t=e.target.files||e.dataTransfer.files;t.length&&(this.picValue=t[0],this.imgPreview(this.picValue),console.log(this.picValue))},imgPreview:function(e){var t=this;if(e&&window.FileReader&&/^image/.test(e.type)){var n=new FileReader;n.readAsDataURL(e),n.onloadend=function(){var e=this.result,n=new Image;n.src=e,n.onload=function(){var e=t.compress(n);t.headerImage=e,t.$refs.headerImg.src=t.headerImage,t.$emit("selectpic",t.headerImage)}}}},compress:function(e){var t=document.createElement("canvas"),n=t.getContext("2d"),o=(e.src.length,e.width),r=e.height;return t.width=o,t.height=r,n.fillStyle="#fff",n.fillRect(0,0,t.width,t.height),n.drawImage(e,0,0,o,r),t.toDataURL("image/jpeg",.5)}}}},568:function(e,t,n){t=e.exports=n(30)(!1),t.push([e.i,"\n.icon-jiahao1[data-v-25679f87] {\n  position: absolute;\n  font-size: 5rem;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  color: #000;\n}",""])},569:function(e,t,n){t=e.exports=n(30)(!1),t.push([e.i,"\n.src-components-core-inputFile---voucher---bQSux_0 {\n  margin-top: 0.75rem;\n}\n.src-components-core-inputFile---voucher---bQSux_0 h4 {\n  color: #000000;\n  font-size: 0.75rem;\n  font-weight: 600;\n  line-height: 1.25rem;\n}\n.src-components-core-inputFile---voucher---bQSux_0 .src-components-core-inputFile---changeImg---18Tnp_0 {\n  position: relative;\n  width: 95%;\n  margin: 0.25rem auto;\n  border: 0.025rem solid #999;\n  height: 6.25rem;\n  border-radius: 0.25rem;\n}\n.src-components-core-inputFile---voucher---bQSux_0 .src-components-core-inputFile---changeImg---18Tnp_0 > img {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n}\n.src-components-core-inputFile---voucher---bQSux_0 .src-components-core-inputFile---changeImg---18Tnp_0 > input {\n  position: absolute;\n  opacity: 0;\n  width: 100%;\n  height: 100%;\n}",""]),t.locals={voucher:"src-components-core-inputFile---voucher---bQSux_0",changeImg:"src-components-core-inputFile---changeImg---18Tnp_0"}},570:function(e,t,n){function o(e){this.$style=n(576),n(575)}var r=n(56)(n(549),n(573),o,"data-v-25679f87",null);e.exports=r.exports},573:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:e.$style.voucher},[n("h4",[e._v(e._s(e.title))]),e._v(" "),n("div",{class:e.$style.changeImg},[n("i",{staticClass:"iconfont icon-jiahao1"}),e._v(" "),n("img",{ref:"headerImg",attrs:{src:e.thumb,alt:""}}),e._v(" "),2!=e.status&&1!=e.status2?n("input",{attrs:{name:"inputFile",type:"file",multiple:"mutiple",accept:"image/*;capture=camera"},on:{change:function(t){return e.selectImg(t)}}}):e._e()])])},staticRenderFns:[]}},575:function(e,t,n){var o=n(568);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);n(31)("8d44b916",o,!0,{})},576:function(e,t,n){var o=n(569);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);n(31)("295891d6",o,!0,{})},601:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(454),r=n.n(o),s=n(570),i=n.n(s);t.default={name:"lookOver",components:{Panel:r.a,InputFile:i.a},data:function(){return{tagIndex:1,lists:[],id:"",status:"",thumb:""}},created:function(){var e=this;this.$nextTick(function(){e.id=String(e.$route.query.id),e.status=String(e.$route.query.status),console.log(e.status),e._lookOver(e.id,e.status)})},methods:{tag:function(e){this.tagIndex=e},selectImage:function(e){console.log(e),this.thumb=e},_lookOver:function(e,t){var n=this;this.$axios({method:"post",url:this.$URL+"/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_appointment_log",params:{op:"upload",logid:e,status:t}}).then(function(e){console.log(e),n.lists.push(e.data.result.list)})},upLoad:function(){var e=this;if(1==this.status&&""==this.thumb)return void alert("付款凭证不能为空");var t=this.$qs.stringify({op:"payment",logid:this.id,status:this.status,thumb:this.thumb});this.$axios({method:"post",url:this.$URL+"/app/index.php?i=143&c=entry&do=ws_orchard&m=sz_yi&p=ws_appointment_log",data:t}).then(function(t){console.log(t),1==t.data.status?(alert("提交成功"),e.$router.go(-1)):alert("鬼知道哪里错了")})},apply:function(){this.$router.push({path:"/inform",query:{logid:this.id}})}}}},623:function(e,t,n){t=e.exports=n(30)(!1),t.push([e.i,'\n.iconfont[data-v-05ec4de4] {\n  font-size: 1.25rem;\n}\nhtml[data-v-05ec4de4],\nbody[data-v-05ec4de4] {\n  background: #f5f5f5;\n}\n.slide-enter-active[data-v-05ec4de4],\n.slide-leave-active[data-v-05ec4de4] {\n  -webkit-transition: all 1s ease;\n  transition: all 1s ease;\n}\n.slide-enter[data-v-05ec4de4],\n.slide-leave-to[data-v-05ec4de4] {\n  opacity: 0;\n  -webkit-transform: translate3d(100%, 0, 0);\n          transform: translate3d(100%, 0, 0);\n}\n.active[data-v-05ec4de4] {\n  position: relative;\n}\n.active[data-v-05ec4de4]::after {\n  content: "";\n  width: 2.5rem;\n  height: 0;\n  border: 0.05rem solid #33d696;\n  position: absolute;\n  bottom: -0.025rem;\n  left: -0.35rem;\n}',""])},659:function(e,t,n){t=e.exports=n(30)(!1),t.push([e.i,"\n.src-components-lookOver-lookOver---content---3I3WU_0 {\n  position: fixed;\n  top: 0;\n  left: 0;\n  background: #ffffff;\n  height: 93%;\n  width: 100%;\n  font-size: 0.6rem;\n  color: #000000;\n  overflow-y: scroll;\n}\n.src-components-lookOver-lookOver---content---3I3WU_0 .src-components-lookOver-lookOver---detail---Gt6RS_0 {\n  padding: 0.5rem 0.5rem;\n}\n.src-components-lookOver-lookOver---content---3I3WU_0 .src-components-lookOver-lookOver---detail---Gt6RS_0 .src-components-lookOver-lookOver---detailContent---DK-7F_0 p {\n  line-height: 1rem;\n}\n.src-components-lookOver-lookOver---content---3I3WU_0 .src-components-lookOver-lookOver---detail---Gt6RS_0 .src-components-lookOver-lookOver---perNumer---3QocV_0 {\n  margin-top: 0.75rem;\n}\n.src-components-lookOver-lookOver---content---3I3WU_0 .src-components-lookOver-lookOver---detail---Gt6RS_0 .src-components-lookOver-lookOver---perNumer---3QocV_0 > h4 {\n  color: #000000;\n  font-size: 0.75rem;\n  font-weight: 600;\n  line-height: 1.25rem;\n}\n.src-components-lookOver-lookOver---content---3I3WU_0 .src-components-lookOver-lookOver---detail---Gt6RS_0 .src-components-lookOver-lookOver---perNumer---3QocV_0 > div {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin-top: 0.5rem;\n}\n.src-components-lookOver-lookOver---content---3I3WU_0 .src-components-lookOver-lookOver---detail---Gt6RS_0 .src-components-lookOver-lookOver---perNumer---3QocV_0 > div > img {\n  width: 3.75rem;\n  height: 3.75rem;\n}\n.src-components-lookOver-lookOver---content---3I3WU_0 .src-components-lookOver-lookOver---detail---Gt6RS_0 .src-components-lookOver-lookOver---perNumer---3QocV_0 > div > div {\n  margin-left: 0.75rem;\n}\n.src-components-lookOver-lookOver---content---3I3WU_0 .src-components-lookOver-lookOver---detail---Gt6RS_0 .src-components-lookOver-lookOver---perNumer---3QocV_0 > div > div p {\n  line-height: 1rem;\n}\n.src-components-lookOver-lookOver---content---3I3WU_0 .src-components-lookOver-lookOver---detail---Gt6RS_0 .src-components-lookOver-lookOver---up---266xO_0 {\n  width: 90%;\n  margin: 0.5rem auto;\n  height: 1.25rem;\n  background: #89e0be;\n  border-radius: 0.25rem;\n  text-align: center;\n  line-height: 1.25rem;\n  color: #ffffff;\n  margin-bottom: 1rem;\n}",""]),t.locals={content:"src-components-lookOver-lookOver---content---3I3WU_0",detail:"src-components-lookOver-lookOver---detail---Gt6RS_0",detailContent:"src-components-lookOver-lookOver---detailContent---DK-7F_0",perNumer:"src-components-lookOver-lookOver---perNumer---3QocV_0",up:"src-components-lookOver-lookOver---up---266xO_0"}},707:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"slide"}},[n("div",{class:e.$style.content},[n("Panel",{attrs:{fanhui:"icon-huise",title:"交易记录"}}),e._v(" "),e._l(e.lists,function(t,o){return n("section",{key:o,class:e.$style.detail},[n("div",{class:e.$style.detailContent},[n("p",[e._v("种子名称："+e._s(t.title))]),n("p"),n("p",[e._v("种子编号："+e._s(t.seed_id))]),e._v(" "),n("p",[e._v("种子价值："+e._s(t.price))]),e._v(" "),n("p",[e._v("智能合约收益："+e._s(t.profit))]),e._v(" "),n("p",[e._v("挂单时间："+e._s(t.mature_time))]),e._v(" "),n("p",[e._v("付款时间："+e._s(t.createtime1))]),e._v(" "),n("p",[e._v("转让方："+e._s(t.sell_out_name))]),e._v(" "),n("p",[e._v("转让方紧急电话："+e._s(t.sell_out_mobile))]),e._v(" "),n("p",[e._v("领养方："+e._s(t.purchase_name))]),e._v(" "),n("p",[e._v("领养方紧急电话："+e._s(t.purchase_mobile))]),e._v(" "),n("p",[e._v("收益状态："+e._s(t.status))])]),e._v(" "),1==e.status?n("div",{class:e.$style.perNumer},[n("h4",[e._v("转让方收款账号")]),e._v(" "),e._l(t.payment,function(t,o){return n("div",{key:o},[n("img",{attrs:{src:t.thumb,alt:""}}),e._v(" "),n("div",[n("p",[e._v("账户名称："+e._s(t.realname))]),e._v(" "),n("p",[e._v("账号："+e._s(t.username))]),e._v(" "),n("p",[e._v("账户类型："+e._s(t.payment_name))])])])})],2):e._e(),e._v(" "),n("InputFile",{attrs:{title:"付款凭证",thumb:t.thumb,status:e.status,status2:t.status2},on:{selectpic:e.selectImage}}),e._v(" "),0==t.status2||0==t.status1?n("div",{class:e.$style.up,on:{click:e.upLoad}},[e._v("确认")]):e._e(),e._v(" "),2==e.status&&0==t.status2?n("div",{class:e.$style.up,on:{click:e.apply}},[e._v("申诉")]):e._e()],1)})],2)])},staticRenderFns:[]}},746:function(e,t,n){var o=n(623);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);n(31)("204396f5",o,!0,{})},782:function(e,t,n){var o=n(659);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);n(31)("cdd26e8c",o,!0,{})}});