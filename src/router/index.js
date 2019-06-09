import Vue from 'vue'
import Router from 'vue-router'
// import Recommend from '@/components/recommend/index'
// import Search from '@/components/search/search'
// import Singer from '@/components/singer/index'
// import Rank from '@/components/rank/rank'
// import SingerDetail from '@/components/singer-detail/singer-detail'
// import Center from '@/components/center/center'
// import Appointment from '@/components/appointment/appointment'
// import Aliment from '@/components/aliment/aliment'
// import Transfer from '@/components/transfer/transfer'
// import Account from '@/components/account/account'
// import AddCard from '@/components/addCard/addCard'
// import Market from '@/components/market/market'
// import Orchard from '@/components/orchard/orchard'
// import Login from '@/components/login/login'
// import Register from '@/components/register/register'
// import WalletDetails from '@/components/walletDetails/walletDetails'
// import Exchange from '@/components/exchange/exchange'
// import RollOut from '@/components/rollOut/rollOut'
// import Customer from '@/components/customer/customer'
// import Inform from '@/components/inform/inform'
// import GetRecord from '@/components/getRecord/getRecord'
// import CallCenter from '@/components/callCenter/callCenter'
// import Examine from '@/components/examine/examine'
// import Rechange from '@/components/rechange/rechange'
// import GetAccount from '@/components/getAccount/getAccount'
// import LookOver from '@/components/lookOver/lookOver'
// import ReservationList from '@/components/reservationList/reservationList'
// import Dgyrollout from '@/components/dgyrollout/dgyrollout'
// import Informant from '@/components/informant/informant'
// import LeaveMessage from '@/components/leaveMessage/leaveMessage'
// import ComplaintResults from '@/components/complaintResults/complaintResults'
// import QrCode from '@/components/qrCode/qrCode'
// import Shezhi from '@/components/shezhi/shezhi'
// import Loginpwd from '@/components/loginpwd/loginpwd'
// import ForgetPwd from '@/components/forgetPwd/forgetPwd'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
    // component: Login
      component: resolve => require(['@/components/login/login'], resolve)
    },
    {
      path: '/register',
    // component: Register
      component: resolve => require(['@/components/register/register'], resolve)
    }, {
      path: '/rank',
    // component: Rank
      component: resolve => require(['@/components/rank/rank'], resolve)
    }, {
      path: '/recommend',
    // component: Recommend
      component: resolve => require(['@/components/recommend/index'], resolve)

    }, {
      path: '/singer',
    // component: Singer,
      component: resolve => require(['@/components/singer/index'], resolve),
      children: [
        {
          path: ':id',
        // component: SingerDetail
          component: resolve => require(['@/components/singer-detail/singer-detail'], resolve)
        }
      ]
    }, {
      path: '/search',
    // component: Search
      component: resolve => require(['@/components/search/search'], resolve)

    }, {
      path: '/center',
    // component: Center
      component: resolve => require(['@/components/center/center'], resolve)

    }, {
      path: '/appointment',
    // component: Appointment
      component: resolve => require(['@/components/appointment/appointment'], resolve)

    }, {
      path: '/aliment',
    // component: Aliment
      component: resolve => require(['@/components/aliment/aliment'], resolve)

    }, {
      path: '/transfer',
    // component: Transfer
      component: resolve => require(['@/components/transfer/transfer'], resolve)

    }, {
      path: '/account',
    // component: Account
      component: resolve => require(['@/components/account/account'], resolve)

    }, {
      path: '/addCard',
    // component: AddCard
      component: resolve => require(['@/components/addCard/addCard'], resolve)

    }, {
      path: '/market',
    // component: Market
      component: resolve => require(['@/components/market/market'], resolve)

    }, {
      path: '/orchard',
    // component: Orchard
      component: resolve => require(['@/components/orchard/orchard'], resolve)

    }, {
      path: '/walletDetails',
    // component: WalletDetails
      component: resolve => require(['@/components/walletDetails/walletDetails'], resolve)

    }, {
      path: '/exchange',
    // component: Exchange
      component: resolve => require(['@/components/exchange/exchange'], resolve)

    }, {
      path: '/rollOut',
    // component: RollOut
      component: resolve => require(['@/components/rollOut/rollOut'], resolve)

    }, {
      path: '/customer',
    // component: Customer
      component: resolve => require(['@/components/customer/customer'], resolve)

    }, {
      path: '/inform',
    // component: Inform
      component: resolve => require(['@/components/inform/inform'], resolve)

    }, {
      path: '/getRecord',
    // component: GetRecord
      component: resolve => require(['@/components/getRecord/getRecord'], resolve)

    }, {
      path: '/callCenter',
    // component: CallCenter,
      component: resolve => require(['@/components/callCenter/callCenter'], resolve),
      children: [
        {
          path: ':id',
        // component: Examine
          component: resolve => require(['@/components/examine/examine'], resolve)

        }
      ]
    }, {
      path: '/rechange',
    // component: Rechange
      component: resolve => require(['@/components/rechange/rechange'], resolve)

    }, {
      path: '/getAccount',
    // component: GetAccount
      component: resolve => require(['@/components/getAccount/getAccount'], resolve)

    }, {
      path: '/lookOver',
    // component: LookOver
      component: resolve => require(['@/components/lookOver/lookOver'], resolve)

    }, {
      path: '/reservationList',
    // component: ReservationList
      component: resolve => require(['@/components/reservationList/reservationList'], resolve)

    }, {
      path: '/dgyrollout',
    // component: Dgyrollout
      component: resolve => require(['@/components/dgyrollout/dgyrollout'], resolve)

    }, {
      path: '/informant',
    // component: Informant
      component: resolve => require(['@/components/informant/informant'], resolve)

    }, {
      path: '/leaveMessage',
    // component: LeaveMessage,
      component: resolve => require(['@/components/leaveMessage/leaveMessage'], resolve),
      children: [
        {
          path: ':id',
        // component: ComplaintResults
          component: resolve => require(['@/components/complaintResults/complaintResults'], resolve)

        }
      ]
    }, {
      path: '/qrCode',
    // component: QrCode
      component: resolve => require(['@/components/qrCode/qrCode'], resolve)

    }, {
      path: '/shezhi',
    // component: Shezhi
      component: resolve => require(['@/components/shezhi/shezhi'], resolve)

    }, {
      path: '/loginpwd',
    // component: Loginpwd
      component: resolve => require(['@/components/loginpwd/loginpwd'], resolve)

    }, {
      path: '/forgetPwd',
    // component: ForgetPwd
      component: resolve => require(['@/components/forgetPwd/forgetPwd'], resolve)

    }]

})
