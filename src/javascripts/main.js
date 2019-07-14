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

  let previous_scroll_position;
  let last_known_scroll_position = 0;
  let ticking = false;

  function doSomething(scroll_pos, prev_scroll_pos) {
    if (scroll_pos > prev_scroll_pos) {
      document.querySelector("main > nav").classList.add("hidden", "scrolled");
    }
    if (scroll_pos < prev_scroll_pos) {
      document.querySelector("main > nav").classList.remove("hidden");
    }
    if (scroll_pos == 0) {
      document
        .querySelector("main > nav")
        .classList.remove("hidden", "scrolled");
    }
  }
  window.addEventListener("scroll", function() {
    previous_scroll_position = last_known_scroll_position;
    last_known_scroll_position = window.pageYOffset;

    if (!ticking) {
      window.requestAnimationFrame(function() {
        doSomething(last_known_scroll_position, previous_scroll_position);
        ticking = false;
      });

      ticking = true;
    }
  });

  document.addEventListener("click", () => {});

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
