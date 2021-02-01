// throttle 节流阀
export function throttle(fn, delay = 100) {
  let timer;
  return () => {
    if (!timer) {
      timer = setTimeout(() => {
        // 以数组方式统一传递
        fn.apply(this, arguments);
        timer = null;
      }, delay)
    }
  }
}
