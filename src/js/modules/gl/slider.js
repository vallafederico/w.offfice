import Model from "./mod/_model.js";

export default class {
  constructor(gl) {
    this.gl = gl;

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
        };
      }
    );

    this.items[0].viz.load(this.items[0].url);
    // console.log(this.items);

    this.initEvents();
  }

  resize() {
    this.items.forEach((item) => {
      if (item.viz.shouldRender) item.viz.resize(this.gl);
    });
  }

  render(t, rmat) {
    this.items.forEach((item, i) => {
      if (!item.active) return;
      item.viz.render(t, rmat);
    });
  }

  /** --- DOM Events */
  initEvents() {
    this.currentItemIndex = 0;
    this.items.forEach((item, i) => {
      item.el.onclick = () => {
        this.items[this.currentItemIndex].active = false;
        this.items[i].active = true;
        this.currentItemIndex = i;
        this.items[i].viz.load(this.items[i].url);
      };
    });
  }
}
