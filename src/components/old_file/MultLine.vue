<template>
  <div class="mult-line">
      <a-textarea
      style="width:50%"
      placeholder="Autosize height with minimum and maximum number of lines"
      :auto-size="{ minRows: 2, maxRows: 4 }"
    />
     <a-button class="btn" type="primary" shape="circle" size="small" @click="clickDebtn">
      <a-icon type="close" />
    </a-button>
  </div>
</template>
<script>
export default {
name: "MultLine",
props:{
  propValue:{
       type:String
  }
},
methods: {
   clickDebtn(){
    console.log(111)
    this.$emit("clickDebtn",this.propValue)
  }
},
}
</script>
<style scoped>
.mult-line{
  width: 78%;
    margin-left: 2%;
   margin-top: 1%;
}
.btn{
  margin-left: 4%;
}
</style>