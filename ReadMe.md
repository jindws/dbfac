
> 配置

`dbfactory.js`

```
    import DBF from 'dbfac'

    DBF.create('User', {
        getUserList:{
            url       :'/api/user/list', //请求地址
            method    :'POST',          //请求方法,默认get,只支持get/post
        },
        delete:{
            url       :'/api/user/delete',
        },
    });

    export default DBF
```

> 调用使用

```
import DB from '*/dbfactory'

DBF.User.getUserList().then(data=>{
    //成功的回调
},data=>{
    //失败的回调
})
```

> 默认接受的后台数据格式

```
//成功
{
    data:xxxx,
    success:true,
}

//失败

{
    errorMsg:xxxx,
    success:false,
}
```

>自定义 `DBF.deal`

```
DBF.deal = resp=>{

    return new Promise((resolve,reject)=>{
        //以下自定义 成功resolve,失败reject
        
        const {success,data,...err} = resp
        if (success) {
            resolve(data)
        } else {
            reject({
              success,data,...err
            })
        }
    })
}
```
