<template>
  <div class="drop-down">
    <a-dropdown>
      <a-menu slot="overlay" @click="handleMenuClick">
        <a-menu-item key="1"> <a-icon type="user" />1st menu item </a-menu-item>
        <a-menu-item key="2"> <a-icon type="user" />2nd menu item </a-menu-item>
        <a-menu-item key="3"> <a-icon type="user" />3rd item </a-menu-item>
      </a-menu>
      <a-button style="width:15%"> Button <a-icon type="down" /> </a-button>
    </a-dropdown>
     <a-button class="btn" type="primary" shape="circle" size="small" @click="clickDebtn">
      <a-icon type="close" />
    </a-button>
  </div>
</template>

<script>
export default {
name: "DropDown",
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
    handleButtonClick(e) {
      console.log('click left button', e);
    },
    handleMenuClick(e) {
      console.log('click', e);
    },
  },
}
</script>
<style scoped>
.drop-down{
  margin-top: 1%;
    margin-left: 2%;

}
.btn{
  margin-left: 3%;
}
</style>