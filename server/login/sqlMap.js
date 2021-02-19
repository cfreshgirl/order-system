var sqlMap = {
    users: {
        add: 'insert into users( UserID, UserName,Password,Role) values ( ?,?, ?,?)',
        select_byID: 'SELECT * from users where UserID = ?',    //查询用户通过id
        changepassword:'UPDATE users SET Password = ? WHERE UserID = ?',                  //通过用户id修改密码
        select:'SELECT * from users',                             //全部用户信息    
        delete_byid:'delete from users where UserID= ? ',       //根据用户id删除用户
        change_byid:'UPDATE users SET UserName = ?,Password=? ,Role=? WHERE UserID = ?',               //根据用户id修改用户 
        select_byidoname:'SELECT * from users where UserID = ? OR UserName = ?',               //根据用户名称或id查询用户    
        add_user:'insert into users( UserID, UserName,Password,Role) values ( ?,?, ?,?)',              //超级管理员添加用户   
    },
    products: {
        select_byClass:'SELECT * from products where ProductClass = ?',                //根据菜品类别查询菜品
        select:'SELECT * from products',                    //获取全部菜品id
        delete_byid:'delete from products where ProductID=?',       //根据菜品id删除菜品
        add:'insert into products( ProductName, ProductClass,ProductPrice,imgpath) values ( ?,?, ?,?)',
        select_byidoname:'SELECT * from products where ProductID = ? OR ProductName = ?',               //根据菜品名称或id查询菜品
        change_byid:'UPDATE products SET ProductName = ?,ProductPrice=? ,ProductClass=?,imgpath=? WHERE ProductID = ?',               //根据菜品id修改菜品
    },
    address:{
        select_byuserid:'SELECT * from address where userid = ?',     //通过用户id查询地址信息
        select_byaddressid:'UPDATE address SET ContactPerson=? , Address = ?,phone=? WHERE AddressID = ?',       //通过地址id找到该条信息并修改
        delete_address:'delete from address where AddressID=?',         //通过地址id在数据库中删除该条地址
        add:'insert into address( userid,ContactPerson, Address,phone) values ( ?,?,?, ?)',             //在地址表中添加地址
    },
    orders:{
        add:'call add_selectid(?,?,?,?,?,?,@oid)',                  //创建存储过程添加订单同时可以获取id
        selectid:' select @oid',                                   //获取订单id(用来根据id进行订单细节表的添加)
        select_unaffirm:"select * from orders where OrderState='not pay' or OrderState='pay'",                       //获取待确认订单接口
        edit_state:'UPDATE orders SET OrderState=? WHERE OrderID = ?',           //修改订单状态接口
        select_bydate:"select * from orders where OrderState='complete' and Date(OrderTime)=?",           //按照日期查询订单接口
        select_tobydata:"select SUM(OrderPrice) AS totalprice from orders where OrderState='complete' and Date(OrderTime)=?",           //按照日期查询订单总价接口
        select_bymonth:"select * from orders where OrderState='complete' and DATE_FORMAT(OrderTime, '%Y-%m')=?",           //按照月份查询订单接口
        select_tobymonth:"select SUM(OrderPrice) AS totalprice from orders where OrderState='complete' and DATE_FORMAT(OrderTime, '%Y-%m')=?",           //按照月份查询订单总价接口
    },
    orderdetails:{
        add:'insert into orderdetails( OrderID, ProductID,ProductNum) values ( ?, ?, ?)',
    },
    selectorder:{                                                            //创建的根据用户id查询订单信息的视图（查询orders表，products表，和ordertails表，根据orders表中的id，返回订单中的菜品的名字，图片、价格、数量，该笔订单的下单时间、类型以及状态）
        selectorder_byid:'select * from selectorder where UserID=?',
    },
    findorderbyid:{                                                            //创建的根据订单号查询订单信息的视图（查询orders表和ordertails表根据订单的id查询其下单时间，订单类型，菜品的id，名字，价格，数量，以及该笔订单的总价格）
        findorderbyid:'select * from findorderbyid where OrderID=?',           
    },
    findpronum:{                                                                 //创建视图，其中包括订单id，用户id，菜品的名称和数量，下单的时间和订单的类型，在查询菜品时使用
        findproinf_bydate:'select * from findpronum where ProductName=? and Date(OrderTime)=?',      //通过菜名和日期时间获取菜品销售情况
        findpronum_bydate:'select SUM(ProductNum)  AS totalnum from findpronum where ProductName=? and Date(OrderTime)=?',      //通过菜名和日期时间获取菜品销售总量
        findproinf_bymonth:"select * from findpronum where ProductName=? and DATE_FORMAT(OrderTime, '%Y-%m')=?",      //通过菜名和日期时间获取菜品销售情况
        findpronum_bymonth:"select SUM(ProductNum) AS totalnum from findpronum where ProductName=? and DATE_FORMAT(OrderTime, '%Y-%m')=?",      //通过菜名和日期时间获取菜品销售总量
    }
}
module.exports = sqlMap;