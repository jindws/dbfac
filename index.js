import os from 'object-param'
import 'whatwg-fetch'

export default new class {
    create(name, methods) {
        this.DB(name,methods);
    }
    DB(name,methods) {
        for (let method in methods) {
            const config = methods[method];
            if(!this[name])this[name] = [];
            this[name][method] = query => new Request(config, query,this);
        }
        return this;
    }
}

function Request(config,body,db) {
    const {deal} = db
    console.log(db)
    let {url,method = ''} = config;
    const option = {
      credentials: 'same-origin',
    };
    if(method.toUpperCase() === 'POST'){
      Object.assign(option, {
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
          },
          method: 'post',
          body: os(body)
      })
    }else{
      url += `?${os(body)}`
    }

    return new Promise((resolve, reject) => {
        fetch(url, option).then(data => data.json()).then(resp => {
            if(deal){
                deal(resp).then(resolve,reject)
                return
            }

            const {success,data,...err} = resp
            if (success) {
                resolve(data)
            } else {
                reject({
                  success,data,...err
                })
            }
        }).catch(()=>reject({
          errorMsg:'请求失败',
        }))
    })
}
