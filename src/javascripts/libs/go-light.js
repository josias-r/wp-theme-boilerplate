const GL = {};

GL.checkIE = () => {
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf("MSIE ");
  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv:11\./)) {
    return true;
  }
  return false;
};

GL.forEach = (array, callback, scope) => {
  for (let i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]);
  }
};

GL.hasClass = (el, cls) => {
  const str = " " + el.className + " ";
  const testCls = " " + cls + " ";
  return str.indexOf(testCls) != -1 ? el : false;
};

GL.isDescendant = (target, descendant) => {
  let node = target;
  while (
    node != null &&
    node !== document.body &&
    node !== document.documentElement
  ) {
    if (typeof descendant === "string") {
      if (node.matches(descendant)) return node;
    } else {
      if (node == target) return node;
    }
    node = node.parentNode;
  }
  return false;
};

GL.scrollTo = (to, duration, element) => {
  if (!element) element = document.scrollingElement || document.documentElement;
  const start = element.scrollTop,
    change = to - start,
    startDate = +new Date(),
    // t = current time
    // b = start value
    // c = change in value
    // d = duration
    easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    },
    animateScroll = () => {
      let currentDate = +new Date();
      let currentTime = currentDate - startDate;
      element.scrollTop = parseInt(
        easeInOutQuad(currentTime, start, change, duration)
      );
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        element.scrollTop = to;
      }
    };
  animateScroll();
};

export default GL;
