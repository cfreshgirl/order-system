var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../login/sqlMap');

// 连接数据库
var conn = mysql.createConnection(models.connection);
conn.connect();

// 注册用户接口
router.post('/register', (req, res) => {
    var sql_add= $sql.users.add;
    var params = req.body;
    var sql_user = $sql.users.select_byID
    conn.query(sql_user,params.userID,function(err, result) {
        if(err) {
            console.log(err)
        }
        if(result[0]!=undefined) {
            res.send('-1')                //用户id已存在
        }else{
            conn.query(sql_add,[params.userID,params.userName,params.password,parseInt("0")], function(err, result) {
                if(err) {
                    console.log(err)
                }
                if(result) {
                    res.send('0')         //注册成功      
                }
            }) 
        }
    }) 
});


//查找用户接口
router.post('/login', (req,res) => {
    var sql_user = $sql.users.select_byID;
    var params = req.body;
    conn.query(sql_user,params.userID,function(err, result) {
        if(err) {
            console.log(err)
        }
        if(result[0]===undefined) {
            res.send('-1')    //查询不出username，data返回-1
        }
        if(result[0].Password == params.password){              //登陆成功，判断用户身份
            if(result[0].Role==0){ 
                res.cookie('username',result[0].UserName, {maxAge: 7 * 24 * 60 * 1000})
                res.cookie('userid',result[0].UserID, {maxAge: 7 * 24 * 60 * 1000})
                res.send('common-user')
            }else if(result[0].Role==1){
                res.cookie('username',result[0].UserName, {maxAge: 7 * 24 * 60 * 1000})
                res.cookie('userid',result[0].UserID, {maxAge: 7 * 24 * 60 * 1000})
                res.send('manager')
            }else if(result[0].Role==2){
                res.cookie('username',result[0].UserName,{maxAge: 7 * 24 * 60 * 1000})
                res.cookie('userid',result[0].UserID, {maxAge: 7 * 24 * 60 * 1000})
                res.send('super manager')
            }
        }
        else{
            res.send('0')                         //密码错误，返回0
        }
    })
});

//获取菜品信息的接口
router.post('/menu',(req,res) => {
    var sql_pro=$sql.products.select_byClass;
    var params = req.body;
    conn.query(sql_pro,params.ProductClass,function(err, result) {
        if(err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
});

//获取地址信息接口
router.post('/address',(req,res) => {
    var sql_add=$sql.address.select_byuserid;
    var params = req.body;
    conn.query(sql_add,params.Userid,function(err, result) {
        if(err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
});

//修改地址信息接口
router.post('/addresschange',(req,res) => {
    var sql_add=$sql.address.select_byaddressid;
    var sql_addadd=$sql.address.add;
    var params = req.body;
        conn.query(sql_add,[params.Name,params.Address,params.phone,params.AddressID],function(err, result) {
            if(err) {
                console.log(err)
            }
            else{
                res.send("1")
            }
        }) 
});

//添加地址信息接口
router.post('/addressadd',(req,res) => {
    var sql_add=$sql.address.select_byaddressid;
    var sql_addadd=$sql.address.add;
    var params = req.body;
        conn.query(sql_addadd,[params.userid,params.Name,params.Address,params.phone],function(err, result) {
            if(err) {
                console.log(err)
            }
            else{
                res.send("1")
            }
        }) 
});

//删除地址信息接口
router.post('/addressdelete',(req,res) => {
    var sql_add=$sql.address.delete_address;
    var params = req.body;
    conn.query(sql_add,params.AddressID,function(err, result) {
        if(err) {
            console.log(err)
        }
        else{
            res.send("1")
        }
    })
});

//提交订单信息接口
router.post('/submit',(req,res) => {
    var sql_add=$sql.orders.add;
    var sql_selectid=$sql.orders.selectid;
    var sql_adddetail=$sql.orderdetails.add;
    var params = req.body;
    console.log(params.OrderDetails)
    conn.query(sql_add,[params.userID,params.OrderPrice,params.OrderTime,params.OrderState,params.AddressID,params.OrderClass],function(err, result) {
        if(err) {
            console.log(err)
        }
        else{
            conn.query(sql_selectid,function(err,result){
                if(err) {
                    console.log(err)
                }
                else{                           //获取订单号
                    for (var i in result){
                        for (var j in result[i]){
                            var orderid=result[i][j]
                        }
                    }
                    var m=0;                                 //存入订单细节表
                    for(m=0;m<params.OrderDetails.length;m++){
                        conn.query(sql_adddetail,[orderid,params.OrderDetails[m].proid,params.OrderDetails[m].pronum],function(err,result){
                            if(err) {
                                console.log(err)
                                return 
                            }
                        })
                    }
                    res.send('1')
                }
            })
        }
    })
});

//查询订单信息接口
router.post('/orderbyid',(req,res) => {
    var sql_selectorder_byid=$sql.selectorder.selectorder_byid;
    var params = req.body;
    conn.query(sql_selectorder_byid,params.UserID,function(err, result) {
        if(err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
});

//修改密码接口
router.post('/passwordchange',(req,res) => {
    var sql_selectbyid=$sql.users.select_byID;
    var sql_changepass=$sql.users.changepassword;
    var params = req.body;
        conn.query(sql_selectbyid,[params.UserID],function(err, result) {
            if(err) {
                console.log(err)
            }
            else{
                if(result[0].Password!=params.OldPassword){
                    res.send('0')                              //旧密码不正确，返回0
                }else{
                    conn.query(sql_changepass,[params.Password,params.UserID],function(err, result) {
                        if(err){
                            console.log(err)
                        }else{
                            res.send('1')                       //密码修改成功，返回1
                        }
                    })
                }
            }
        }) 
});

//获取菜单信息接口
router.get('/displaymenu',(req,res) => {
    var sql_select=$sql.products.select;
    conn.query(sql_select,function(err, result) {
        if(err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
});

//修改菜单信息接口
router.post('/editproduct',(req,res) => {
    var sql_change=$sql.products.change_byid;
    var params = req.body;
    conn.query(sql_change,[params.ProductName,params.ProductPrice,params.ProductClass,params.imgpath,params.ProductID],function(err, result) {
        if(err) {
            console.log(err)
        }
        else{
            res.send('1')
        }
    })
});


//删除菜品信息接口
router.post('/prodel',(req,res) => {
    var sql_deletebyid=$sql.products.delete_byid;
    var params = req.body;
    conn.query(sql_deletebyid,params.ProductID,function(err, result) {
        if(err) {
            console.log(err)
        }
        else{
            res.send('1')
        }
    })
});

//添加菜品信息接口
router.post('/addproduct',(req,res) => {
    var sql_add=$sql.products.add;
    var params = req.body;
    conn.query(sql_add,[params.ProductName,params.ProductClass,params.ProductPrice,params.imgpath],function(err, result) {
        if(err) {
            console.log(err)
        }
        else{
            res.send("1")
        }
    })
});

//根据菜品id或名称查询菜品信息接口
router.post('/findproduct',(req,res) => {
    var sql_select=$sql.products.select_byidoname;
    var params = req.body;
    conn.query(sql_select,[params.ProductID,params.ProductName],function(err, result) {
        if(err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
});

//获取用户信息接口
router.get('/displayuser',(req,res) => {
    var sql_select=$sql.users.select;
    conn.query(sql_select,function(err, result) {
        if(err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
});

//修改用户信息接口
router.post('/useredit',(req,res) => {
    var sql_change=$sql.users.change_byid;
    var params = req.body;
    conn.query(sql_change,[params.UserName,params.Password,params.Role,params.UserID],function(err, result) {
        if(err) {
            console.log(err)
        }
        else{
            res.send('1')
        }
    })
});

//超级管理员添加用户的接口
router.post('/adduser',(req,res) => {
    var sql_add=$sql.users.add_user;
    var params = req.body;
    var sql_user = $sql.users.select_byID
    conn.query(sql_user,params.UserID,function(err, result) {
        if(err) {
            console.log(err)
        }
        if(result[0]!=undefined) {
            res.send('-1')                //用户id已存在
        }else{
            conn.query(sql_add,[params.UserID,params.UserName,params.Password,params.Role],function(err, result) {
                if(err) {
                    console.log(err)
                }
                else{
                    res.send('1')              //添加成功
                }
            }) 
        }
    }) 
});

//根据用户id或用户名查询用户信息接口
router.post('/finduser',(req,res) => {
    var sql_select=$sql.users.select_byidoname;
    var params = req.body;
    conn.query(sql_select,[params.UserID,params.UserName],function(err, result) {
        if(err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
});

//删除用户信息接口
router.post('/userdel',(req,res) => {
    var sql_deletebyid=$sql.users.delete_byid;
    var params = req.body;
    conn.query(sql_deletebyid,params.UserID,function(err, result) {
        if(err) {
            console.log(err)
        }
        else{
            res.send('1')
        }
    })
});

//获取待确认订单信息接口
router.get('/displayorder',(req,res) => {
    var sql_select=$sql.orders.select_unaffirm;
    conn.query(sql_select,function(err, result) {
        if(err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
});

//修改订单状态信息接口
router.post('/orderedstate',(req,res) => {
    var sql_edstate=$sql.orders.edit_state;
    var params = req.body;
    conn.query(sql_edstate,[params.OrderState,params.OrderID],function(err, result) {
        if(err) {
            console.log(err)
        }
        else{
            res.send('1')
        }
    })
});

//根据订单号查询订单信息接口
router.post('/findorder',(req,res) => {
    var sql_findorderbyid=$sql.findorderbyid.findorderbyid;
    var params = req.body;
    conn.query(sql_findorderbyid,params.OrderID,function(err, result) {
        if(err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
});

//根据下单日期查询订单信息接口
router.post('/findincomebyday',(req,res) => {
    var sql_find=$sql.orders.select_bydate;
    var params = req.body;
    conn.query(sql_find,params.Date,function(err, result) {
        if(err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
});

//根据下单日期查询订单总额信息接口
router.post('/findincometotal',(req,res) => {
    var sql_find=$sql.orders.select_tobydata;
    var params = req.body;
    conn.query(sql_find,params.Date,function(err, result) {
        if(err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
});

//根据下单月份查询订单信息接口
router.post('/findincomebymon',(req,res) => {
    var sql_find=$sql.orders.select_bymonth;
    var params = req.body;
    conn.query(sql_find,params.Date,function(err, result) {
        if(err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
});

//根据下单月份查询订单总额信息接口
router.post('/findincometotalmon',(req,res) => {
    var sql_find=$sql.orders.select_tobymonth;
    var params = req.body;
    conn.query(sql_find,params.Date,function(err, result) {
        if(err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
});



//根据下单日期查询菜品销售信息接口
router.post('/findproinfbyday',(req,res) => {
    var sql_find=$sql.findpronum.findproinf_bydate;
    var params = req.body;
    conn.query(sql_find,[params.ProductName,params.Date],function(err, result) {
        if(err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
});

//根据下单日期查询菜品总销量信息接口
router.post('/findprototalbyday',(req,res) => {
    var sql_find=$sql.findpronum.findpronum_bydate;
    var params = req.body;
    conn.query(sql_find,[params.ProductName,params.Date],function(err, result) {
        if(err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
});

//根据下单月份查询订单信息接口
router.post('/findproinfbymon',(req,res) => {
    var sql_find=$sql.findpronum.findproinf_bymonth;
    var params = req.body;
    conn.query(sql_find,[params.ProductName,params.Date],function(err, result) {
        if(err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
});

//根据下单月份查询订单总额信息接口
router.post('/findprototalmon',(req,res) => {
    var sql_find=$sql.findpronum.findpronum_bymonth;
    var params = req.body;
    conn.query(sql_find,[params.ProductName,params.Date],function(err, result) {
        if(err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
});
module.exports = router;