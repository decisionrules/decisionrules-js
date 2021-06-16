const axios = require('axios');

module.exports = function (api_key_param, geoLocation = null) {
    let module = {};

    const CONFIG = {
        api_key: api_key_param,
        geoLoc: geoLocation,
        baseURL: "api.decisionrules.io/rule/solve"
    }

    module.solver = async function (ruleId, inputData, version = null) {
        const endpoint = urlFactory(ruleId, version);

        const header = {Authorization: `Bearer ${CONFIG.api_key}`, 'Content-Type': 'application/json'}

        return await axios.post(endpoint, inputDataParser(inputData), {headers: header}).catch(error => {
            if (error.response) {
                console.error(`Call ended with ${error.response.status}`);
            } else if (error.request) {
                console.error("The request was made but not response was received");
            } else {
                console.error(`Error: ${error.message}`);
            }
        }).then(r => {
            return r.data;
        });
    }

    function urlFactory(ruleId, version) {
        let url;

        if (CONFIG.geoLoc === null) {
            url = `https://${CONFIG.baseURL}/`;
        } else {
            url = `https://${CONFIG.geoLoc}.${CONFIG.baseURL}/`;
        }

        if (version != null) {
            url += ruleId;
        } else {
            url += `${ruleId}/${version}`;
        }

        return url;
    }

    function inputDataParser(inputData){
        return {
            data: JSON.parse(JSON.stringify(inputData))
        }
    }

    return module;
}
