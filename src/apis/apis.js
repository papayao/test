import axios from 'axios';

axios.defaults.baseURL= 'http://127.0.0.1:5000'
// 登录api
export var api_login = params => axios.post ('/users/checkLogin',params)
// 添加账号api
export var api_add = params => axios.post('/users/add',params)
// 账号列表api
export var api_accList = params => axios.get('/users/list',params);
// 删除账号api
export var api_delet = params => axios.get('/users/batchdel',params)
// 删除单个账号
export var api_deletThis = params =>axios.get('/users/del',params)
// 修改信息api
export var api_edit = params => axios.post('/users/edit',params)
// 修改密码
export var api_editpwd = params => axios.post('/users/editpwd',params)
// 检查旧密码是否正确
export var api_checkoldpwd = params => axios.get('/users/checkoldpwd',params)
// 获取账号信息
export var api_accountinfo = params => axios.get('/users/accountinfo',params)
// 发送token请求
export var api_token = params => axios.get('/users/checktoken',params)
// 上传头像api
export var avatar_upload = params => axios.post('/users/avatar_upload',params)
// 获取分类
export var api_catelist = params => axios.get('/goods/catelist',params)
// 修改分类
export var api_editcate = params => axios.post('/goods/editcate',params)
// 增加分类
export var api_addcate = params => axios.post('/goods/addcate',params)
// 删除分类
export var api_delcate = params => axios.get('/goods/delcate',params)
// 商品列表
export var api_goodslist = params => axios.get('/goods/list',params)
// 商品列表编辑
export var api_goodsedit = params => axios.post('/goods/edit',params)
// 商品列表删除
export var api_goodsdel = params => axios.get('/goods/del',params)
// 获取分类名称
export var api_categories = params => axios.get('/goods/categories',params)
// 添加商品
export var api_goodsadd = params => axios.post('/goods/add',params)
// 获取店铺详情
export var api_shopinfo = params => axios.get('/shop/info',params)
// 修改店铺数据
export var api_shopedit = params => axios.post('/shop/edit',params)
// 获取订单数据
export var api_orderList = params => axios.get('/order/list',params)
// 修改订单信息
export var api_orderEdit = params => axios.post('/order/edit',params)
// 首页报表
export var api_totaldata = params => axios.get('/order/totaldata',params)
// 订单报表
export var api_ordertotal = params => axios.get('/order/ordertotal',params)









