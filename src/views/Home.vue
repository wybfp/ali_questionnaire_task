<template>
  <div class="home">
    <div class="nav">
     <span>问卷</span> </div>
    <div class="content">
       <div id="left">
         <div class="left-title">
           <span>基础组件</span>
         </div >
        <div class="left-content">
         <ul >     
           <li  @click="handelClick(1)">
             <a-button type="dashed" block >
                单行文本填写框
              </a-button>
            </li>
            <li @click="handelClick(2)">
             <a-button type="dashed" block>
                多行文本填写框
              </a-button>
            </li>
            <li  @click="handelClick(3)">
             <a-button type="dashed" block>
              下拉选项框
              </a-button>
            </li>
            <li @click="handelClick(4)">
             <a-button type="dashed" block>
                日期选择框
              </a-button>
            </li>
            <li @click="handelClick(5)">
             <a-button type="dashed" block>
                单选两项框
              </a-button>
            </li>
            <li @click="handelClick(6)">
             <a-button type="dashed" block>
                单选四项框
              </a-button>
            </li>
            <li @click="handelClick(7)">
             <a-button type="dashed" block>
                多选框
              </a-button>
            </li>
              <li @click="handelClick(8)">
             <a-button type="dashed" block>
                文件上传框
              </a-button>
            </li>
      
         </ul>
         </div>
       </div>
    <div id="mid">
<mid-panel :myComponents="myComponents"/>
    </div>
    <!-- <div id="right">3</div> -->
    </div>
   
  </div>
</template>

<style >
@import "../assets/css/base.less";
@import "../assets/css/home.css";
</style>


<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { nanoid } from 'nanoid'


import MidPanel from './MidPanel.vue'

export default {
  name: 'Home',
  data() {
    return {
      clickIndex:0,
      myComponents:[],
 
    }
  },
  components: {
    MidPanel
  },
  methods: {
 
    handelClick(newclcikIndex){
         var Newcontent=''
      switch (newclcikIndex) {
           case 1:           
               Newcontent= 'input-content'  
               break;
           case 2:     
               Newcontent='mult-line'       
               break;
          case 3:     
               Newcontent='drop-down'       
               break;
           case 4:     
               Newcontent='date-choice'       
               break;
           case 5:     
               Newcontent='single-choice-tow'       
               break;
           case 6:     
               Newcontent='single-choice-four'       
               break;
           case 7:     
               Newcontent='mult-choice'       
               break;
            case 8:     
               Newcontent='file-upload'       
               break;

           default:0
               break;
       }
        this.myComponents.push({
               id:nanoid(),
               index:newclcikIndex,
               content:  Newcontent
             })
    
    }
  },
}
</script>

