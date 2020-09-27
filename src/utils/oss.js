import OSS from "ali-oss";
import stsAPI from "@/api/sts";
import {setSTS} from "@/utils/auth";

function getOSS(data, callback) {
    // let timestamp = Date.parse(new Date()) / 1000;
    // if (getSTS() && getSTS().expiration - 0 - (timestamp - 0) > 100) {
    //     callback(getSTS())
    // } else {
    //     stsAPI.getSTS(data).then(response => {
    //         const resp = response.data;
    //         console.log(resp.ossParams);
    //         setSTS(resp);
    //         callback(resp)
    //     });
    // }

    stsAPI.getSTS(data).then(response => {
        const resp = response.data;
        // console.log(resp.ossParams);
        setSTS(resp);
        callback(resp)
    });
}

// function random_string(len) {
//     len = len || 32;
//     var chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
//     var maxPos = chars.length;
//     var pwd = "";
//     for (let i = 0; i < len; i++) {
//         pwd += chars.charAt(Math.floor(Math.random() * maxPos));
//     }
//     return pwd;
// }

function uploadOSS(event, filesName) {
    let files = event.target.files[0];
    const filesType = files.type.split("/").shift();
    let type = '';
    switch (filesType || '') {
        case 'image':
            type = 1;
            break;
        case 'video':
            type = 2;
            break;
        default:
            type = 0;
            break;
    }
    return new Promise((resolve, reject) => {
        getOSS({
            filename: files.name,
            folder: filesName,
            type: type
        }, res => {
            var client = new OSS({
                region: res.ossParams.region,
                accessKeyId: res.ossParams.accessKeyId,
                stsToken: res.ossParams.stsToken,
                accessKeySecret: res.ossParams.accessKeySecret,
                bucket: res.ossParams.bucket
            });
            // var file = event.name ? event : event.target.files[0];
            // let randomName = filesName + '/' + res.ossParams.FileName + random_string(6) + '_' + file.size;
            client.multipartUpload(
                res.ossParams.FileName,
                files,
                {
                    // progress,
                    partSize: 1000 * 1024,
                    timeout: 120000
                }
            ).then(data => {
                resolve(data.res.requestUrls);
            }).catch(err => {
                console.log(err);
                reject(err);
            });
            // resolve(`${res.uploadHost}/${result.name}`);

        });
    })

}

export {uploadOSS, getOSS};
