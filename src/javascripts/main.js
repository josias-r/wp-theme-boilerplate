import "core-js/stable";
import "regenerator-runtime/runtime";

import GL from "./libs/go-light";
import barba from "@barba/core";

// Import all your SCSS from here and don't forget to link it inside your <head> / header.php
import "../stylesheets/main.scss";

// Initial Animations
const initAnimations = () => {
  if (GL.checkIE()) document.body.classList.add("browser-warning");
};

//DOM Ready
document.addEventListener("DOMContentLoaded", function() {
  let scrollPos = 0;
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
          scrollPos = d.current.container.scrollTop;
          d.current.container.parentNode.removeChild(d.current.container);
        },
        beforeEnter(d) {
          const html = document.createElement("html");
          html.innerHTML = d.next.html.trim();

          // Update Body Classes
          const bodyClasses = html.querySelector("body").className;
          document.body.className = bodyClasses;
        },
        after(d) {
          GL.scrollTo(scrollPos, 0, d.next.container);
          if (d.trigger.hash) {
            const targetEl = document.querySelector(d.trigger.hash);
            const offsetTop = targetEl.getBoundingClientRect().top;
            GL.scrollTo(offsetTop + scrollPos - 10, 400, d.next.container);
          } else {
            GL.scrollTo(0, 100, d.next.container);
          }

          initAnimations();
        }
      }
    ]
  });
});
