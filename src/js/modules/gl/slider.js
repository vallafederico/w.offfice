import Model from "./mod/_model.js";
import Emitter from "tiny-emitter";

import { A } from "../animation";

export default class extends Emitter {
  constructor(gl) {
    super();
    this.gl = gl;

    this.tx = {
      curr: null,
      next: null,
      canSlide: true,
    };

    this.init();
  }

  init() {
    this.items = [...document.querySelectorAll("[data-model]")].map(
      (item, i) => {
        return {
          el: item,
          viz: new Model(this.gl, { el: item }),
          url: item.dataset.model,
          active: i === 0 ? true : false,
          next: false,
        };
      }
    );

    this.items[0].viz.load(this.items[0].url);

    this.initEvents();
  }

  resize() {
    this.items.forEach((item) => {
      if (item.viz.shouldRender) item.viz.resize(this.gl);
    });
  }

  render(t, rmat) {
    this.items.forEach((item, i) => {
      if (item.active) {
        item.viz.render(t, rmat);
        this.tx.curr = item.viz.rt.texture;
      } else if (item.next) {
        item.viz.render(t, rmat);
        this.tx.next = item.viz.rt.texture;
      }
    });
  }

  /** --- DOM Events */
  initEvents() {
    this.currentItemIndex = 0;
    this.nextItemIndex = null;
    this.items.forEach((item, i) => {
      item.el.onclick = () => {
        if (!this.tx.canSlide) return;
        this.onImageChange(i);

        if (!item.viz.isLoaded) {
          // load if not loaded
          item.viz.load(this.items[i].url);
        }
      };
    });
  }

  onImageChange(i) {
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

      this.tx.canSlide = true;
    }, A.transition.duration * 1000);
  }
}
