const axios = require("axios");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var fetch = require ('node-fetch');


const userprofile = async (req, res) => {
    url = req.body.data;
    console.log(url);

};
module.exports = userprofile;


    // fetch (
    //     url,
    //     {
    //        method: 'GET',
    //        headers: { 'Accept': '*/*' }
    //     }
    //  )
    //  .then ((res) => res.buffer());
    // var xhr = new XMLHttpRequest();
    // xhr.open('GET', req.body.data, true);
    // xhr.responseType = 'blob';
    // xhr.onload = function(e) {
    //     if (this.status == 200) {
    //         var myBlob = this.response;
    //         // myBlob is now the blob that the object URL pointed to.
    //         console.log("weldone");
    //     }
    // };
    // xhr.send();
    // const config = { responseType: 'blob' };
    // axios.get(req.body.data, config)
    //     .then(response => {
    //         // new File([response.data], fileName);       
    //     });
    // URL.revokeObjectURL(req.body.data);

    // axios.get(req.body.data, {responseType: 'arraybuffer'})
    //   .then(res => {
    //       console.log("welldone");
    //   });