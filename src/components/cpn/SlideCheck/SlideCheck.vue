//
<slide-check
  :width="300"
  :height="300"
  :src="src"
  @success="success"
  @fail="fail"
></slide-check>

<template>
  <div class="wrap" :style="{ width: width + 'px' }">
    <!-- <img src="./img/timg.jpg" alt="" /> -->
    <!-- 提示信息 -->
    <div class="tips-info">
      <span class="tips">完成拼图验证</span>
      <span class="next-img" v-if="showNextImg" @click="onNextImg">换一张</span>
    </div>
    <!-- 滑动图片框 -->
    <div class="slider-check-wrap" :style="{ width: width + 'px' }">
      <!-- 图片画布 -->
      <canvas ref="bg" :width="width" :height="height" class="bg-canvas" />
      <!-- 验证框画布 -->
      <canvas ref="card" :width="width" :height="height" class="card-canvas" />
      <!-- 控制滑动 -->
      <div class="slider-wrap">
        <!-- 滑动进度条 -->
        <div class="progress-bar" ref="progress-bar"></div>
        <!-- 滑动按钮 -->
        <div class="btn" ref="btn" @mousedown.stop="onMousedown">></div>
        <!-- 滑动条 -->
        <div class="slider" ref="slider">{{ tips }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SlideCheck",
  data() {
    return {
      range: 0,
      tips: "向右滑动完成拼图",
      src: [require("./img/timg.jpg"), require("./img/min.jpg")],
      width: 300,
      height: 300,
      radius: 10,
      theme: "#369",
    };
  },
  //   计算属性
  computed: {
    showNextImg() {
      // isArray() 方法用于判断一个对象是否为数组。
      return Array.isArray(this.src) && this.src.length > 1;
    },
  },
  //   渲染出真实dom，然后执行mounted钩子函数
  //   组件已经出现在页面中，数据、真实dom都已经处理好了,事件都已经挂载好了，可以在这里操作真实dom等事情
  mounted() {
    if (Array.isArray(this.src)) {
      this.initCanvas(this.src[0]);
    } else {
      this.initCanvas(this.src);
    }
    this.initDomInfo();
  },
  methods: {
    initDomInfo() {
      //  Element.getBoundingClientRect（) 方法返回元素的大小及其相对于视口的位置
      this.pos = this.$refs["btn"].getBoundingClientRect();
      //   根据主题颜色修改滑动框和按钮的颜色和阴影
      if (this.theme !== "#369") {
        //   box-shadow: h-shadow v-shadow blur spread color inset;
        // 水平阴影 垂直阴影 模糊距离 阴影大小 颜色 内侧阴影
        this.$refs["slider"].style.boxShadow = `0 0 10px 0 ${this.theme}`;
        this.$refs["slider"].style.color = this.theme;
        this.$refs["btn"].style.background = this.theme;
        this.$refs["btn"].style.boxShadow = `0 0 10px 0 ${this.theme}`;
      }
    },
    //   切换下一张图片
    onNextImg() {
      // 清空画布
      this.reset();
      //   判断是否为数组
      if (Array.isArray(this.src)) {
        this.initCanvas(this.src[Math.floor(Math.random() * this.src.length)]);
      } else {
        this.initCanvas(this.src);
      }
    },

    reset() {
      // getContext("2d") 对象是内建的 HTML5 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法
      const bgCtx = this.$refs["bg"].getContext("2d");
      const card = this.$refs["card"];
      const cardCtx = card.getContext("2d");
      //   clearRect() 方法清空给定矩形内的指定像素
      //   左上角坐标(0,0) 右下角坐标(this.width, this.height)构成的矩形框
      bgCtx.clearRect(0, 0, this.width, this.height);
      cardCtx.clearRect(0, 0, this.width, this.height);
      //   设置对象宽度
      card.width = this.width;
    },

    random(min, max) {
      //[10,15)
      //   [0, 1)*(6)===>[0, 6);
      //[0, 6)+10===>[10, 16)
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    // 初始化画布
    initCanvas(src) {
      const bg = this.$refs["bg"];
      const card = this.$refs["card"];
      //   图片对象
      const bgCtx = bg.getContext("2d");
      //   验证框对象
      const cardCtx = card.getContext("2d");

      const r = this.radius;
      const w = r * 4;
      const cardSize = r * 6;
      this.x = this.random(this.width / 2, this.width - cardSize);
      const y = this.random(2 * r, this.height - cardSize);

      // 创建一个<img>元素
      //   img.src = 'myImage.png'; // 设置图片源地址
      //   HTMLImageElement 接口提供了特别的属性和方法 (在常规的 HTMLElement之外，它也能通过继承使用)来操纵 <img> 元素的布局和图像。
      const img = new Image();
      //   一个 DOMString 表示这个img元素的 CORS 设置
      //   跨域属性 (crossOrigin property)，它允许你配置元素获取数据的 CORS 请求。
      //   anonymous	对此元素的 CORS 请求将不设置凭据标志。
      img.crossOrigin = "Anonymous";

      //   当图像装载完毕时调用的事件句柄。
      img.onload = () => {
        //  drawImage() 方法在画布上绘制图像、画布或视频。
        bgCtx.drawImage(img, 0, 0, this.width, this.height);
        cardCtx.drawImage(img, 0, 0, this.width, this.height);

        const _y = y - r * 2 + 3;
        // 返回 ImageData 对象，该对象为画布上指定的矩形复制像素数据。
        const ImageData = cardCtx.getImageData(this.x, _y, cardSize, cardSize);
        card.width = cardSize;
        // 重新放回画布
        cardCtx.putImageData(ImageData, 0, _y);
      };
      const rect = {
        x: this.x,
        y,
        w,
        r,
      };
      img.src = src;
      //   填充当前绘图（路径）。
      this.draw(bgCtx, "fill", rect);
      //   从原始画布剪切任意形状和尺寸的区域。
      this.draw(cardCtx, "clip", rect);
    },
    draw(ctx, operation, rect) {
      const PI = Math.PI;
      //   对象解构
      const { x, y, w, r } = rect;
      //   起始一条路径
      ctx.beginPath();
      //   添加一个新点，然后在画布中创建从该点到最后指定点的线条，（该方法并不会创建线条）。
      ctx.lineTo(x, y);
      ctx.arc(x + w / 2, y, r, PI, 0);
      ctx.lineTo(x + w, y);
      ctx.arc(x + w, y + w / 2, r, 1.5 * PI, 0.5 * PI);
      ctx.lineTo(x + w, y + w);
      ctx.lineTo(x, y + w);
      ctx.arc(x, y + w / 2, r, 0.5 * PI, 1.5 * PI, true);
      //   创建从当前点回到起始点的路径。闭合路径
      ctx.closePath();
      //   线宽
      ctx.lineWidth = 2;
      //   设置或返回用于填充绘画的颜色、渐变或模式 涂色
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      //   设置或返回用于笔触的颜色、渐变或模式。 画笔
      ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
      // 绘制已定义的路径
      ctx.stroke();
      ctx[operation]();
      //   设置或返回新图像如何绘制到已有的图像上。
      //   destination-over	在源图像上显示目标图像。
      ctx.globalCompositeOperation = "destination-over";
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  display: inline-block;
  padding: 10px !important;
  box-shadow: 0 0 2px 2px #eee;
  border-radius: 5px;
  font-family: "Microsoft YaHei";

  .tips-info {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 5px 0 10px;
  }

  .tips {
    color: #666;
  }

  .next-img {
    color: #06c;
    font-size: 14px;
    cursor: pointer;
  }
}

.slider-check-wrap {
  position: relative;
  line-height: 1.5;
  text-align: left;
  background-color: #fff;

  .slider-wrap {
    position: relative;
    height: 40px;
    border-radius: 20px;
    margin: 10px 10px 20px;
    user-select: none;

    .progress-bar {
      position: absolute;
      left: 0;
      width: 0;
      height: 40px;
      overflow: hidden;
      padding-left: 25px;
      border-radius: 20px 0 0 20px;
      background: #3bbcfc;
    }

    .btn {
      position: absolute;
      margin-top: -5px;
      left: 0;
      width: 50px;
      height: 50px;
      line-height: 46px;
      text-align: center;
      font-size: 40px;
      color: #fff;
      font-weight: bold;
      background: #369;
      border-radius: 50%;
      box-shadow: 0px 0px 10px 0px #369;
    }

    .slider {
      text-align: center;
      line-height: 40px;
      border-radius: 20px;
      box-shadow: 0px 0px 10px 0px #369;
      color: #369;
      overflow: hidden;
    }
  }

  .card-canvas {
    position: absolute;
    left: 0;
  }
}
</style>
