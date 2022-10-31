import Model from "./mod/_model.js";
import Emitter from "tiny-emitter";

import { A } from "../animation";

export default class extends Emitter {
  constructor(gl) {
    super();
    this.gl = gl;

    this.frame = 0;

    this.tx = {
      curr: null,
      next: null,
      canSlide: true,
      isSliding: true,
    };

    this.init();
  }

  init() {
    this.items = [...document.querySelectorAll("[data-model]")].map(
      (item, i) => {
        return {
          el: item,
          h2: item.querySelector("h2"),
          viz: new Model(this.gl, { el: item }),
          url: item.dataset.model,
          active: i === 0 ? true : false,
          next: false,
        };
      }
    );

    console.log(this.items);

    this.items.forEach((item, i) => item.viz.load(this.items[i].url));
    this.initEvents();
  }

  resize() {
    this.items.forEach((item) => {
      if (item.viz.shouldRender) item.viz.resize(this.gl);
    });
  }

  render(t, rmat) {
    this.items.forEach((item) => {
      if (item.active) {
        // if (this.frame % 2 === 0) {
        // console.log("0");
        item.viz.render(t, rmat);
        // }
        this.tx.curr = item.viz.rt.texture;
      } else if (item.next) {
        // if (this.frame % 2 !== 0) {
        // console.log("1");
        item.viz.render(t, rmat);
        // }
        this.tx.next = item.viz.rt.texture;
      }
    });

    this.frame++;
  }

  /** --- DOM Events */
  initEvents() {
    this.currentItemIndex = 0;
    this.nextItemIndex = null;

    this.items[0].h2.classList.add("layer-top");

    this.items.forEach((item, i) => {
      item.el.onclick = () => {
        if (!this.tx.canSlide) return;
        this.tx.isSliding = true;

        this.onImageChange(i);
        if (!item.viz.isLoaded) item.viz.load(this.items[i].url);
      };
    });
  }

  onImageChange(i) {
    if (this.currentItemIndex === i) return;

    // style swap
    this.items[this.currentItemIndex].h2.classList.remove("layer-top");
    this.items[i].h2.classList.add("layer-top");

    this.tx.canSlide = false;
    this.nextItemIndex = i;
    this.items[this.nextItemIndex].next = true;

    this.emit("SLIDE", { d: A.transition.duration });

    setTimeout(() => {
      this.items[this.currentItemIndex].active = false;
      this.items[i].active = true;
      this.currentItemIndex = i;

      this.items[this.nextItemIndex].next = false;
      this.nextItemIndex = null;

      this.tx.isSliding = false;
      this.tx.canSlide = true;
    }, A.transition.duration * 1000);
  }
}
