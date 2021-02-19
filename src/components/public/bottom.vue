<template>
    <div id="bottomNavigationFullScreen">
      <div class="bottomNavigation_content">
        <div class="bottomNavigation_li_content">
            <div class="bottomNavigation_li_public_content"  @click="publicClick('/')">
                <img :src="'/' === $route.path ?imagesUrl.homeIcon.selected:imagesUrl.homeIcon.normal" alt="">
                <div :class="'/' === $route.path ? 'select' : 'no_select' ">首页</div>
            </div>
            <div class="bottomNavigation_li_public_content" @click="publicClick('/menu')">
                <img :src="'/menu' === $route.path ?imagesUrl.menuIcon.selected:imagesUrl.menuIcon.normal" alt="">
                <div :class="'/menu' === $route.path ? 'select' : 'no_select' ">菜单</div>
            </div>
            <div class="bottomNavigation_li_public_content" @click="publicClick('/cart')">
                <img :src="'/cart' === $route.path ?imagesUrl.cartIcon.selected:imagesUrl.cartIcon.normal" alt="">
                <div :class="'/cart' === $route.path ? 'select' : 'no_select' ">购物车</div>
            </div>
            <div class="bottomNavigation_li_public_content" @click="publicClick('/mine')">
                <img :src="'/mine' === $route.path ?imagesUrl.mineIcon.selected:imagesUrl.mineIcon.normal" alt="">
                <div :class="'/mine' === $route.path ? 'select' : 'no_select' ">我的</div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
   export default {
        name: 'bottom',
        data() {
            return {
                imagesUrl: { // 排版图片使用懒加载
                    homeIcon: {normal:require('../../assets/page/home.png'),selected:require('../../assets/page/home_on.png')}, // 首页
                    menuIcon: {normal:require('../../assets/page/menu.png'),selected:require('../../assets/page/menu_on.png')}, // 菜单
                    cartIcon: {normal:require('../../assets/page/cart.png'),selected:require('../../assets/page/cart_on.png')}, // 购物车
                    mineIcon: {normal:require('../../assets/page/mine.png'),selected:require('../../assets/page/mine_on.png')}, // 我的
                }
            }
        },
        methods: {
            // 点击导航栏事件
            publicClick(val) {
                this.$router.replace(val)
            }
        }
    }
</script>


<style>
    #bottomNavigationFullScreen {
        position: fixed;
        bottom: 0;
        z-index: 9999;
        height: 60px;
        width: 100%;
        -webkit-box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
        box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
        background-color: #fff;
    }
 
    .bottomNavigation_li_content {
        height: 60px;
        display: flex;
        justify-content:center;
         align-items: center;
        text-align: center;
    }
 
    .bottomNavigation_li_public_content {
        flex: 1;
        height: 45px;
        /* margin-left: 3px;
        background-color: #ccc; */
    }
    .bottomNavigation_li_public_content img {
        height: 24px;
        width: 24px;
    }
    .bottomNavigation_li_public_content div {
        position: relative;
        bottom: 3px;
    }
 
    .no_select {
        font-size: 12px;
        color: rgb(61, 60, 60);
    }
 
    @keyframes select {
      0% {
        font-size: 12px;
      }
      50% {
        font-size: 13px;
      }
      100% {
        font-size: 14px;
      }
    }
    .select {
        animation: select 0.6s;
        font-size: 14px;
        color: #2196f3;
    }
</style>

