<template>
    <div class="product">
        <ul>
            <!--遍历从后台传回来的数据，然后输出到菜单页面-->
            <li v-for="pro in product" :key="pro.proname" >
                <div class="pic">
                    <a href="">
                        <img v-bind:src="require('../../assets/img/'+ pro.imgpath + '.png')" alt="" width="130px" height="90px">
                    </a>
                </div>
                <div class="main">
                    <div class="name" >{{pro.ProductName}}</div>
                    <div class="price">{{pro.ProductPrice}}元/份</div>
                    <div class="btn-aera">
                        <button  circle style="padding:0px; border: 0; background-color: transparent; outline: none;" @click="add(pro.ProductID,pro.ProductName,pro.ProductPrice,pro.imgpath)">
                            <img src="../../assets/img/add.png" alt="" width="25px">
                        </button>
                        
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
 export default {
    name: 'menucontent',
    data(){
        return{
            productc:this.$parent.label,
            product:{
            }
        }
    },
    created(){
        var _this=this
        //从后台获取菜单数据接口
        this.$http.post(this.HOST+'/menu',{ProductClass:this.productc},{
            headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
            }
          })          
          .then(function(res){
              _this.product=res.data
        })
    },
    methods:{
        //点击下入购物车按钮，通过vuex存储数据
        add(id,name,price,imgpa){
            var i=0;
            for(i=0;i<this.$store.state.orderInf.oinf.length;i++){
                if (name==this.$store.state.orderInf.oinf[i].proname){
                    this.$store.state.orderInf.oinf[i].pronum+=1
                    this.$message.info('成功加入购物车')
                    return 
                }
            }
            this.$store.state.orderInf.oinf.push({"proid":id,"proname":name, "proprice":price, "pronum":1,"proimg":imgpa})
            this.$message.info('成功加入购物车')
        }
    }
}
</script>

<style scoped>
.product{
    height:570px;
    border-top:solid 0.5px #494c4e;
    overflow: scroll;
    padding:0px;
}
ul{
    padding: 0px;
    margin:0px;
}
li{
    margin-top:3px;
    list-style: none;
    border-bottom: solid 0.5px #494c4e;
}
div{
    vertical-align: top;
}
.pic{
    border-radius: 10px;
    display: inline-block;
    margin-right: 10px;
}
.pic a img{
    border-radius: 5px;
}
.main{
    display: inline-block;
    margin-top: 0px;
}
.name{
    margin-top: 15px;
    margin-bottom:15px;
    color: #4587dd;
    font-weight:bolder;
    font-size: larger;
}
.price{
    display: inline-block;
    margin-right: 35px;
}
.btn-aera{
    display: inline-block;
}
</style>