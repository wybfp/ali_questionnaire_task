<template>
  <div class="mult-choice">
    <a-checkbox-group v-model="checkedList" :options="plainOptions" @change="onChange" />
     <a-checkbox :checked="checkAll" @change="onCheckAllChange">
       all
      </a-checkbox>
      <a-button class="btn" type="primary" shape="circle" size="small" @click="clickDebtn">
      <a-icon type="close" />
    </a-button>
  </div>
</template>
<script>
const plainOptions = ['A', 'B', 'C'];
const defaultCheckedList = ['A', 'C'];
export default {
name: "MultChoice",

data() {
    return {
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      plainOptions,
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
    onChange(checkedList) {
      this.indeterminate = !!checkedList.length && checkedList.length < plainOptions.length;
      this.checkAll = checkedList.length === plainOptions.length;
    },
    onCheckAllChange(e) {
      Object.assign(this, {
        checkedList: e.target.checked ? plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked,
      });
    },
  },
}
</script>
<style scoped>
.mult-choice{
  margin-top: 1%;
  margin-left: 2%;
}
.btn{
  margin-left: 3%;
}
</style>