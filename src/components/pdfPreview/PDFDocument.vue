<template>
  <div class="pdf-document">
    <PDFPage
      v-for="page in pages"
      v-bind="{scale}"
      :key="page.pageNumber"
      :page="page"
    />
  </div>
</template>

<script>
import PDFPage from './PDFPage';
import range from 'lodash/range';
const PDFJS = require('pdfjs-dist');
PDFJS.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.entry');
export default {
  components: {
    PDFPage,
  },
  props: {
    url: {
      type: String,
      required: true,
    },
    scale: {
      type: Number,
      default: 1.0,
    },
  },

  data() {
    return {
      pdf: undefined,
      pages: [],
    };
  },

  watch: {
    pdf: {
      handler(pdf) {
        this.pages = [];
        const promises = range(1, pdf.numPages + 1).map(number => pdf.getPage(number));
        return Promise.all(promises).
          then(pages => this.pages = pages)
      }
    },
  },

  methods: {
    fetchPDF() {
      PDFJS.getDocument({url:this.url,cMapUrl:'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.5.207/cmaps/',cMapPacked: true}).promise.then((pdf)=>{
        this.pdf = pdf;
      }).catch(err=>{
        console.log(err)
      })

    },
  },
  created() {
    this.fetchPDF();
  },
};
</script>
<style>
.pdf-document {
  position: fixed;
  overflow: scroll;
  width: 100%;
  height: 90%;
}
</style>
