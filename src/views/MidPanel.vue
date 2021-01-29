<template>
  <div id="mid-panel">
    <component v-for="(item,index) in myCom" :key="index" :is="item.component" 
    :propValue="item.id" @clickDebtn="clickDelete"></component>
     <a-button class="content-submit" v-if="myCom.length!=0" @click="handleSubmit">提交</a-button>
  </div>
</template>
<script>

export default {
name: "MidPanel",
data() {
    return {
        // Mycomponents:[]
        myCom:[],
       
    }
},
props:{
    myComponents:{
        type:Array,
        default:null
    }
},
components:{
    // SingleChoice,
    // InputContent

},
watch:{
    myComponents:function(){
     this.setPage()
    }
},
methods: {
    handleSubmit(){
        confirm("确认提交")
    },
    clickDelete(id){
        // console.log(id)
        // console.log(this.myCom)
        this.myCom=this.myCom.filter(item=>{
            return item.id!=id
        })
        // console.log(this.myCom)
    },
    setPage(){
        if(this.myComponents.length){
            var curCom
           var lastClick=this.myComponents.length-1
                switch (this.myComponents[lastClick].index) {
                    case 1:
                       curCom=()=>import("../components/InputContent");//懒加载
                     
                        break;
                     case 2:
                        curCom=()=>import("../components/MultLine");//懒加载
                 
                        break;
                     case 3:
                        curCom=()=>import("../components/DropDown");//懒加载
                       
                        break;
                     case 4:
                        curCom=()=>import("../components/DateChoice");//懒加载
                   
                        break;
                     case 5:
                        curCom=()=>import("../components/SingleChoiceTwo");//懒加载
                   
                        break;
                     case 6:
                        curCom=()=>import("../components/SingleChoiceFour");//懒加载
                      
                        break;
                     case 7:
                        curCom=()=>import("../components/MultChoice");//懒加载
                        
                        break;
                     case 8:
                        curCom=()=>import("../components/FileUpload");//懒加载
                     
                        break;
                
                    default:
                        break;
                }
                 this.myCom.push({
                            id:this.myComponents[lastClick].id,
                            index:this.myComponents[lastClick].index,
                            content:this.myComponents[lastClick].content,
                            component:curCom
                        })  
  
        }
      

    }
},
}
</script>
<style scoped>
#mid-panel{
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    overflow: hidden;
}
.content-submit{
margin-top:3%;
margin-left: 60%;
}
</style>