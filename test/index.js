import DBF from '../index.js'
// import DBF from 'dbfac'

DBF.deal = resp=>{
    const {success,data,...err} = resp
    return new Promise((resolve,reject)=>{
        if (success) {
            resolve(data)
        } else {
            alert(0)
            reject({
              success,data,...err
            })
        }
    })
}

DBF.headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
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
