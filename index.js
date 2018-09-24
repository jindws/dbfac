const os = require('object-param')
require('whatwg-fetch')
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }


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

    const option = {
      credentials: 'same-origin',
    };

    if(method.toUpperCase() === 'POST'){
      Object.assign(option, {
          headers,
          method: 'post',
          body: JSON.stringify(body)
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
                reject(_objectSpread({
                  success,
                  data
                }, err));
            }
        }).catch(()=>reject({
          errorMsg:'请求失败',
        }))
    })
}
