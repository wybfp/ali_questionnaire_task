<template>
<div class="file-upload">
  <a-upload
    name="file"
    :multiple="true"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    :headers="headers"
    @change="handleChange"
    
  >
    <a-button  > <a-icon type="upload" /> Click to Upload </a-button>
    <a-button class="btn" type="primary" shape="circle" size="small" @click="clickDebtn">
      <a-icon type="close" />
    </a-button>
  </a-upload>
   
  </div>
</template>
<script>
export default {
  data() {
    return {
      headers: {
        authorization: 'authorization-text',
      },
    };
  },
  props:{
  propValue:{
       type:String
  }
},
  methods: {
      clickDebtn(){
    // console.log(111)
    this.$emit("clickDebtn",this.propValue)
  },
    handleChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
  },
};
</script>
<style scoped>
.file-upload{
/* border: 1px solid black; */
  margin-top: 1%;
  margin-left: 2%;
  position: relative;
}
.btn{
 position: absolute;
 top:12%;
 left:16%;
}
</style>