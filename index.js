const os = require('object-param').default
require('whatwg-fetch')

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }


module.exports = new class {
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
    const {defaultdeal} = db
    let {url,method = ''} = config;

    const {deal,headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }} = db

    let option = {
      credentials: 'same-origin',
    };

    if(method.toUpperCase() !== 'GET'){
          // Object.assign(option, {
          //     headers,
          //     method: 'post',
          //     body: JSON.stringify(body)
          // })
          option = {
              ...option,
              headers,
              method: method.toUpperCase(),
              body: JSON.stringify(body)
          }
    }else{
        url += `?${os(body)}`
    }

    return new Promise((resolve, reject) => {
        fetch(url, option).then(data => data.json()).then(resp => {

            if(deal){
                deal(resp).then(resolve,reject)
                return
            }

            if(defaultdeal){
                defaultdeal(resp).then(resolve,reject)
                return
            }

            // const {success,data,...err} = resp
            const {
              success,
              data
            } = resp,
                  err = _objectWithoutProperties(resp, ["success", "data"]);
            if (success) {
                resolve(data)
            } else {
                reject(resp)
            }
        }).catch(()=>reject({
          errorMsg:'请求失败',
        }))
    })
}
