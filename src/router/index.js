import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'
import Menu from '@/components/Menu'
import Cart from '@/components/Cart'
import Mine from '@/components/Mine'
import Affirm from '@/components/Affirm'
import Addresslist from '@/components/addresslist'
import Addedit from '@/components/addedit'
import Addadd from '@/components/addadd'
import Myorder from '@/components/myorder'
import Changepassword from '@/components/changepassword'
import ManagerHome from '@/components/manager/home'
import Findproduct from '@/components/manager/findproduct'
import Editproduct from '@/components/manager/editproduct'
import Addproduct from '@/components/manager/addproduct'
import SupermanagerHome from '@/components/supermanager/home'
import SupermanagerUseredit from '@/components/supermanager/useredit'
import Finduser from '@/components/supermanager/finduser'
import Adduser from '@/components/supermanager/adduser'
import Suaffirmorder from '@/components/order/suaffirmorder'
import Sufindorder from '@/components/order/sufindorder'
import Sufindincome from '@/components/order/sufindincome'
import Maaffirmorder from '@/components/order/maaffirmorder'
import Mafindorder from '@/components/order/mafindorder'
import Mafindincome from '@/components/order/mafindincome'
import Mafindpronum from '@/components/order/mafindpronum'
import Sufindpronum from '@/components/order/sufindpronum'
Vue.use(Router) 

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '/register',
      name: 'Register',
      component: Register
    },{
      path: '/',
      name: 'Home',
      component: Home
    },{
      path: '/menu',
      name: 'Menu',
      component: Menu
    },{
      path: '/cart',
      name: 'Cart',
      component: Cart
    },{
      path: '/mine',
      name: 'Mine',
      component: Mine
    },{
      path: '/affirm',
      name: 'Affirm',
      component: Affirm
    },{
      path: '/affirm/addresslist',
      name: 'Addresslist',
      component: Addresslist
    },{
      path: '/addedit',
      name: 'Addedit',
      component: Addedit
    },{
      path: '/addadd',
      name: 'Addadd',
      component: Addadd
    },{
      path: '/myorder',
      name: 'Myorder',
      component: Myorder
    },{
      path: '/changepassword',
      name: 'Changepassword',
      component: Changepassword
    },{
      path: '/manager/',
      name: 'managerhome',
      component: ManagerHome
    },{
      path: '/manager/findproduct',
      name: 'findproduct',
      component: Findproduct
    },{
      path: '/manager/addproduct',
      name: 'addproduct',
      component: Addproduct
    },{
      path: '/manager/editproduct',
      name: 'editproduct',
      component: Editproduct
    },{
      path: '/supermanager/',
      name: 'supermanagerhome',
      component: SupermanagerHome
    },{
      path: '/supermanager/useredit',
      name: 'supermanageruseredit',
      component: SupermanagerUseredit
    },{
      path: '/supermanager/finduser',
      name: 'finduser',
      component: Finduser
    },{
      path: '/suaffirmorder',
      name: 'suaffirmorder',
      component: Suaffirmorder
    },{
      path: '/sufindorder',
      name: 'sufindorder',
      component: Sufindorder
    },{
      path: '/sufindincome',
      name: 'sufindincome',
      component: Sufindincome
    },{
      path: '/maaffirmorder',
      name: 'maaffirmorder',
      component: Maaffirmorder
    },{
      path: '/mafindorder',
      name: 'mafindorder',
      component: Mafindorder
    },{
      path: '/mafindincome',
      name: 'mafindincome',
      component: Mafindincome
    },{
      path: '/supermanager/adduser',
      name: 'adduser',
      component: Adduser
    },{
      path: '/mafindpronum',
      name: 'mafindpronum',
      component: Mafindpronum
    },{
      path: '/sufindpronum',
      name: 'sufindpronum',
      component: Sufindpronum
    }
  ]
})