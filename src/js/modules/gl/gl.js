import { resizeCanvasToDisplaySize } from "twgl.js";
import Camera from "./camera.js";
import Scene from "./scene";
import Post from "./post/post";

export default class {
  constructor() {
    this.canvas = document.querySelector("[data-gl='c']");
    this.gl = this.canvas.getContext("webgl");
    this.gl.clearColor(0.04, 0.04, 0.04, 0);
    this.gl.vp = { dpr: Math.min(window.devicePixelRatio, 2) };

    this.gl.enable(this.gl.CULL_FACE);
    this.gl.enable(this.gl.DEPTH_TEST);
    // this.gl.cullFace(this.gl.BACK);

    this.camera = new Camera(this.gl);
    this.gl.camera = this.camera.get(this.gl);

    new ResizeObserver((entry) => this.resize(entry[0].contentRect)).observe(
      this.canvas
    );
    this.resize();

    this.time = 0;
    this.scroll = 0;

    this.create();

    this.render();
    this.resize();
  }

  create() {
    this.scene = new Scene(this.gl);

    this.post = new Post(this.gl);
    this.post.isActive = true;

    // events - obj change
    this.scene.slider.on("SLIDE", this.handleSceneChange.bind(this));
  }

  handleSceneChange(e) {
    // console.log("handleSceneChange");
    if (this.post) this.post.onSceneChange(e);
  }

  render(y = 0) {
    this.time += 0.01;
    this.scroll = y * this.gl.vp.px || 0;

    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

    // if (this.post && this.post.isActive) this.post.setupRender();
    if (this.scene) this.scene.render(this.time, this.scroll);

    if (this.post && this.post.isActive) {
      this.post.render(
        this.time,
        this.scene.slider.tx.curr,
        this.scene.slider.tx.next
      );
    }

    requestAnimationFrame(this.render.bind(this));
  }

  resize() {
    resizeCanvasToDisplaySize(this.gl.canvas, this.gl.vp.dpr);

    // viewport data
    this.gl.vp = {
      viewSize: this.viewSize,
      px: this.pixelSize,
      inner: [window.innerWidth, window.innerHeight],
      scroll: this.scroll || 0,
    };

    if (this.gl.camera) this.gl.camera = this.camera.get(this.gl);

    // resize scene
    if (this.scene) this.scene.resize(this.gl);
    if (this.post) this.post.resize(this.gl);
  }

  /**
   * ----- Utils
   */

  get viewSize() {
    const height = Math.abs(
      this.gl.camera.z * Math.tan(this.gl.camera.fov / 2) * 2
    );
    return [height * (this.gl.canvas.width / this.gl.canvas.height), height];
  }

  get pixelSize() {
    return this.viewSize[0] / window.innerWidth;
  }

  /** --  Events */
}
