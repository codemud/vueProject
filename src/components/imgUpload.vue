<template>
    <div class="img-block">
        <div v-show="!fileName" class="plus">+</div>
        <el-image v-show="fileName" class="img" :src="fileName" fit="fit"/>
        <input v-if="showInput" type="file" accept="image/*" @change="handleFile" class="hiddenInput"/>
    </div>
</template>
<script>
    import {uploadOSS} from "@/utils/oss";

    export default {
        props: {
            files: Function,
            fileName: String,
            target: String,
            filesName: String //对应文件夹名
        },
        data() {
            return {
                showInput: true
            }
        },
        methods: {
            async handleFile(event) {
                let files = event.target.files[0];
                this.showInput = false;
                if (files) {
                    const isLt5M = files.size / 1024 / 1024 < 5;
                    this.showInput = true;
                    if (!isLt5M) {
                        return this.$message.warning("上传文件大小不能超过 5MB!");
                    }
                    let uploadedFile = await uploadOSS(event, this.filesName);
                    uploadedFile.forEach(item=>{
                        this.files(this.target, item.split('?')[0].split('#')[0]);
                    })
                }
                this.showInput = true
            }
        }
    }
</script>
