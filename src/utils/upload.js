import API from "@/api/uploadFile";

function uploadFile(event) {
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
    let formData = new FormData();
    formData.append('file', files);
    formData.append('type', type);
    return new Promise((resolve, reject) => {
        API.uploadFiles(formData).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err);
        });
    })
}

export {uploadFile};
