<template>
  <div class="input-content">   
  <a-input style="width: 40%;" placeholder="Basic usage" />
  <a-button class="btn" type="primary" shape="circle" size="small" @click="clickDebtn">
      <a-icon type="close" />
    </a-button>
  </div>
  
</template>
<script>
export default {
name: "InputContent",
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
.input-content{
  
    margin-top: 1%;
    margin-left: 2%;
}
.btn{
  margin-left: 3%;
}
</style>