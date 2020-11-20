//const { OperationCanceledException } = require("typescript");
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
//const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
//const request = require('request');

module.exports = class DeployToEpiserverPlugin {
    constructor(options = {}){
        this.options = options;
    }
    
    apply(compiler){
        var that = this;
        compiler.hooks.afterEmit.tap('DeployToEpiserverPlugin', (compilation) => {
            console.debug('DeployToEpiserverPlugin HIT!');
            var filepath = path.resolve(that.options.filepath, that.options.filename);
            console.debug(filepath);

            const url = that.options.base + that.options.path;
            console.log(url);

            const formData = new FormData();
            formData.append(that.options.filename, fs.createReadStream(filepath));
            axios.post(url, formData, {
               headers: formData.getHeaders() 
            }).then((response) => {
                //
                console.log(response.data);
            }, (error) => {
                //
                console.error(error);
            });
        });
    }
}