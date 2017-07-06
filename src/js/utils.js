




module.exports = {
    validators: [],
    validate(name = '') {
        let isValide = true;
        this.validators.map(validator => {
            if (!validator.validate()) isValide = false
        });
        return isValide;
    },
    isArrayNotEmpty(array) {
        if (!Array.isArray(array)) return false;
        if (array.length > 0) return true
        else return false;
    },
    serialize(obj) {
        let str = [];
        for (let p in obj) {
            if (obj.hasOwnProperty(p))  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
        return str.join("&");
    },
    ajax(url, params = {}) {
        return new Promise((resolve, reject) => {
            try {
                // magic crossbrowser constructor
                let xhr = new (XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
                // open request
                xhr.open('POST', apiPath + url, true); // serialize data
                xhr.withCredentials = true;
                // set headers
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                // handle request response
                xhr.onreadystatechange = () => {
                    if (xhr.readyState > 3) {
                        let response = '';
                        // redirect if session is die
                        // if (xhr.status == 401) {
                        //     window.location.replace('/login');
                        //     reject();
                        // }
                        try {
                            // try to parse response 
                            response = JSON.parse(xhr.responseText);
                            response.isOk ? resolve(response) : reject(response);
                        } catch (err) {
                            // if response text not json (internal server error), reject promise 
                            reject({ isOk: false, message: xhr.responseText });
                        }
                    }
                }
                xhr.send(this.serialize(params));
            } catch (err) {
                reject({ isOk: false, message: err });
            }
        });
    },
   
}
