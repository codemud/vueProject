<template>
    <iframe id="pdfIframe" frameborder="0" :src="`../../static/pdf/web/viewer.html?file=${encodeURIComponent(previewUrl)}`">
    </iframe>
</template>

<script>
    export default {
        name: "pdfView",
        props:{
            previewUrl:{
                type: String,
                required:true,
                default: ()=>{
                    return 'https://opensource.com/sites/default/files/ebooks/pythonscriptingwithscribus.pdf'
                }
            }
        },
        data(){
            return {
                defaultUrl:'https://opensource.com/sites/default/files/ebooks/pythonscriptingwithscribus.pdf'
            }
        }
    }
</script>

<style scoped>

</style>