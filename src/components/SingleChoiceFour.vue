<template>
  <div class="single-choice-four">
   
     <a-radio-group v-model="value" @change="onChange">
      <a-radio :value="1">
        A
      </a-radio>
      <a-radio :value="2">
        B
      </a-radio>
      <a-radio :value="3">
        C
      </a-radio>
      <a-radio :value="4">
        D
      </a-radio>
    </a-radio-group>
     <a-button class="btn" type="primary" shape="circle" size="small" @click="clickDebtn">
      <a-icon type="close" />
    </a-button>
  </div>
</template>
<script>
export default {
name: "singlechoicefour",
data() {
    return {
      value: 1,
    };
  },
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
    onChange(e) {
      console.log('radio checked', e.target.value);
    },
  },
}
</script>
<style scoped>
.single-choice-four{
    margin-top: 1%;
    margin-left: 2%;
}
.btn{
  margin-left: 4%;
}
</style>