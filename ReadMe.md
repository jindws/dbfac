```
// import DBF from '../index.js'
import DBF from 'dbfac'

DBF.deal = resp=>{
    //this is default
    //no deal === this
    const {success,data,...err} = resp
    return new Promise((resolve,reject)=>{
        if (success) {
            resolve(data)
        } else {
            reject({
              success,data,...err
            })
        }
    })
}


DBF.create('YongHu', {
// ==============================================标签
    getUserList:{
        url       :'/api/yonghu/chakan/list',
        method    :'POST',
    },
});

export default DBF

//use
DBF.YongHu.getUserList().then(data=>console.log(222,data))
```
