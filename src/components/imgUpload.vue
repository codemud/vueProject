<template>
    <div class="img-block">
        <div v-show="!fileName" class="plus">+</div>
        <el-image v-show="fileName" class="img" :src="fileName" fit="fit"/>
        <input v-if="showInput" type="file" accept="image/*" @change="handleFile" class="hiddenInput"/>
    </div>
</template>
<script>
    import {uploadFile} from "@/utils/upload";

    export default {
        props: {
            files: Function,
            fileName: String,
            target: String,
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
                    let uploadedFile = await uploadFile(event);
                    this.files(this.target, uploadedFile);

                }
                this.showInput = true
            }
        }
    }
</script>
