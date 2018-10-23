**接口信息**

get /         首页
get /index    首页
get /post/*　 文章入口
get /analyse  网站数据分析
post /account/login  登录接口 

已下页面需要登录权限，所有需要权限的页面，验证失败都跳转到登录页面

- get /account/login 登录页面
- get /account/admin 后台管理页面
- get /account/edit?id=id 编辑文章(没有id返回空白页面)
- post /account/edit 上传文章
- put /account/edit?id=id 更新文章
> post无幂等性
