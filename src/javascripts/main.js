import "core-js/stable";
import "regenerator-runtime/runtime";

import GL from "./libs/go-light";
import barba from "@barba/core";

import "../stylesheets/main.scss";

// Initial Animations
const initAnimations = () => {
  if (GL.checkIE()) document.body.classList.add("browser-warning");
};

//DOM Ready
document.addEventListener("DOMContentLoaded", function() {
  initAnimations();

  barba.init({
    // debug: true,
    prevent: ({ el }) => {
      return (
        el.href &&
        (el.href.includes("/wp-admin") ||
          el.href.includes("/feed") ||
          el.classList.contains("ab-item"))
      );
    },
    transitions: [
      {
        // sync: true,
        leave() {},
        afterLeave(d) {
          d.current.container.parentNode.removeChild(d.current.container);
          GL.scrollTo(0, 100, d.next.container);
        },
        beforeEnter(d) {
          let html = document.createElement("html");
          html.innerHTML = d.next.html.trim();

          // Update Body Classes
          const bodyClasses = html.querySelector("body").className;
          document.body.className = bodyClasses;
        },
        after() {
          initAnimations();
        }
      }
    ]
  });
});
