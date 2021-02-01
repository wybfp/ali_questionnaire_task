<!--
<template>
  <div>
    <magnifier
      style="padding: 50px; margin: 50px;"
      :boxSize="400"
      :minImgUrl="require('./img/min.jpg')"
      :maxImgUrl="require('./img/max.jpg')"
    ></magnifier>
    -->

<template>
  <div>
    <div class="magnifier-wrap" ref="wrap">
      <div
        class="small-wrap"
        ref="small"
        @mouseleave="onMouseleave"
        @mousemove="onMousemove"
        @mouseenter="onMouseenter"
      >
        <div class="mask-wrap" ref="mask" v-show="isShow"></div>
        <img src="./img/min.jpg" :width="boxSize" :height="boxSize" />
        <!-- <img src="./img/min.jpg" alt="" srcset=""> -->
      </div>
      <div class="max-wrap" ref="maxBox" v-show="isShow">
        <img
          :src="require('./img/max.jpg')"
          :style="{width: maxImgWidth + 'px', height: maxImgHeight + 'px'}"
          class="img"
          ref="img"
          @load="setMaskSize"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { tool } from '../../../utils'
export default {
  name: 'Magnifier',
  props: {
    boxSize: {
      type: Number,
      default: 400
    },
    // minImgUrl: {
    //   type: String,
    //   default: "require('./img/min.jpg')"
    // },
    // maxImgUrl: {
    //   type: String,
    //   default: "require('./img/max.jpg')"
    // },
    autoReverse: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String,
      default: "right"
    }
  },
  data() {
    return {
      isShow: false,
      maxImgWidth: "",
      maxImgHeight: ""
    };
  },
  mounted() {
    window.addEventListener('scroll', tool.throttle(this.setMaxBoxPos))
  },
  beforeDestroy() {
    window.removeEventListener('scroll', tool.throttle)
  },
  methods: {
    // 大盒子为大图片宽高
    // 小盒子为小图片宽高
    setMaskSize(e) {
      // 得到img节点
      // console.log( e.target)
      // 一个加载事件
      // console.log( e)
      // 大图片的最大尺寸为自己的尺寸
      this.isLoad = true;
      this.maxImgWidth = e.target.width;
      this.maxImgHeight = e.target.height;
      this.$refs["img"].width = e.target.width;
      this.$refs["img"].height = e.target.height;

      // Vue中$nextTick方法将回调延迟到下次DOM更新循环之后执行，
      //也就是在下次DOM更新循环结束之后执行延迟回调
      //在修改数据之后立即使用这个方法，能够获取更新后的DOM。
      //简单来说就是当数据更新时，在DOM中渲染完成后，执行回调函数。

     // Vue在更新DOM时是异步执行的，也就是说在更新数据时其不会阻塞代码的执行，
     //直到执行栈中代码执行结束之后，才开始执行异步任务队列的代码，
     //所以在数据更新时，组件不会立即渲染，
     //此时在获取到DOM结构后取得的值依然是旧的值，而在$nextTick方法中设定的回调函数会在组件渲染完成之后执行，取得DOM结构后取得的值便是新的值。
      this.$nextTick(() => {
        // 当数据更新时，执行回调函数
        this.initDom();
      });
    },
    initDom() {
      this.wrap = this.$refs["wrap"];
      this.maxBox = this.$refs["maxBox"];
      this.mask = this.$refs["mask"];
      this.maxImg = this.$refs["img"];
      this.small = this.$refs["small"];
      this.smallWidth = this.getDomAttr(this.small, "width");
      this.smallHeight = this.getDomAttr(this.small, "height");
      this.maxBox.style.width = this.boxSize + "px";
      this.maxBox.style.height = this.boxSize + "px";
    },
    getDomAttr(el, attr) {
    //  console.log(getComputedStyle(el)[attr])  402px
   //  console.log(getComputedStyle(el)[attr].slice(0, -2))  402
  //  去掉单位
      return parseInt(getComputedStyle(el)[attr].slice(0, -2));
    },
    onMouseenter() {
      this.isShow = true;
    },
    onMouseleave() {
      this.isShow = false;
    },
    onMousemove(e) {
      // 存在盒子      有加载图片
      if (!this.wrap || !this.isLoad) return;

      // 遮罩层
      const mask = this.$refs["mask"];
      const maxImgWidth = this.$refs["img"].width;
      const minBoxWidth = this.smallWidth;

      mask.style.width = minBoxWidth * (minBoxWidth / maxImgWidth) + "px";
      mask.style.height = minBoxWidth * (minBoxWidth / maxImgWidth) + "px";

      // 大盒子的左边 和 上边
      const leftPosition = this.wrap.getBoundingClientRect().left;
      const topPosition = this.wrap.getBoundingClientRect().top;
      // 大盒子的左内边距和上内边距
      const paddingLeft = this.getDomAttr(this.wrap, "padding-left");
      const padddingTop = this.getDomAttr(this.wrap, "padding-top");

      // 鼠标在遮罩层中央
      let left = e.clientX - leftPosition - this.mask.offsetWidth / 2;
      let top = e.clientY - topPosition - this.mask.offsetHeight / 2;

      // 根据鼠标移动设置大盒子位置
      this.setMaxBoxPos()

      if (left < paddingLeft) {
        // 遮罩层顶左边
        left = paddingLeft;
      } else if (
        // 遮罩层顶右边
        left > this.small.offsetWidth - this.mask.offsetWidth + paddingLeft
      ) {
        left = this.small.offsetWidth - this.mask.offsetWidth + paddingLeft;
      }

      if (top < padddingTop) {
        top = padddingTop;
      } else if (
        top > this.small.offsetHeight - this.mask.offsetHeight + padddingTop
      ) {
        top = this.small.offsetHeight - this.mask.offsetHeight + padddingTop;
      }
      
      // 更新遮罩层位置
      this.mask.style.left = left + "px";
      this.mask.style.top = top + "px";

      // 更新大图片位置
      const pX =
        (left - paddingLeft) / (this.smallWidth - this.mask.offsetWidth);
      const pY =
        (top - padddingTop) / (this.smallHeight - this.mask.offsetHeight);
      this.maxImg.style.left =
        -pX * (this.maxImg.width - this.maxBox.offsetWidth) + "px";
      this.maxImg.style.top =
        -pY * (this.maxImg.height - this.maxBox.offsetHeight) + "px";
    },

    // 大图片位置
    setMaxBoxPos() {
      // 左边和上边
      const leftPosition = this.wrap.getBoundingClientRect().left;
      const topPosition = this.wrap.getBoundingClientRect().top;
      // 内边距
      const paddingLeft = this.getDomAttr(this.wrap, "padding-left");
      const padddingTop = this.getDomAttr(this.wrap, "padding-top");
      // 右边位置
      const maxBoxRightPos =
        leftPosition +
        this.maxBox.clientLeft +
        this.small.clientLeft +
        this.wrap.clientLeft +
        paddingLeft +
        this.small.clientWidth;
        // 左边位置
      const maxBoxLeftPos =
        leftPosition +
        this.wrap.clientLeft +
        paddingLeft -
        this.small.clientLeft * 2 -
        this.small.clientWidth;

      let maxBoxPos = -1;
      if (this.autoReverse) {
        const isMaxBoxExceedWindow =
          maxBoxRightPos + this.getDomAttr(this.maxBox, "width") >  window.innerWidth;
        maxBoxPos = isMaxBoxExceedWindow ? maxBoxLeftPos : maxBoxRightPos;
      } else {
        if (this.direction === "right") {
          maxBoxPos = maxBoxRightPos;
        } else if (this.direction === "left") {
          maxBoxPos = maxBoxLeftPos;
        }
      }
      this.maxBox.style.left = maxBoxPos + "px";
      this.maxBox.style.top =
        topPosition +
        this.wrap.clientTop -
        this.maxBox.clientTop +
        padddingTop +
        this.small.clientTop +
        "px";
    }
  }
};
</script>

<style lang="less" scoped>
.magnifier-wrap {
  position: relative;
  box-sizing: border-box;
  .small-wrap {
    display: inline-block;
    z-index: 1;
    border: 1px solid #ccc;
    box-sizing: border-box;
    .mask-wrap {
      position: absolute;
      cursor: move;
      background: RGBA(255, 255, 255, 0.5);
      z-index: 1;
    }
  }
  .max-wrap {
    position: fixed;
    border: 1px solid #ccc;
    overflow: hidden;
    background: #fff;
    .img {
      position: absolute;
    }
  }
}
</style>
