<template>
  <div class="date-choice">
       <a-date-picker style="width:15%" @change="onChange" />
       <a-button class="btn" type="primary" shape="circle" size="small" @click="clickDebtn">
      <a-icon type="close" />
    </a-button>
  </div>
</template>
<script>
export default {
name: "DateChoice",
props:{
  propValue:{
       type:String
  }
},
methods: {
   clickDebtn(){
    console.log(111)
    this.$emit("clickDebtn",this.propValue)
  },
    onChange(date, dateString) {
      console.log(date, dateString);
    },
  }
}
</script>
<style scoped>
.date-choice{
  margin-top: 1%;
  margin-left: 2%;
}
.btn{
  margin-left: 3%;
}
</style>