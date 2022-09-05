import { load as coreLoad } from "@loaders.gl/core";
import { GLTFLoader } from "@loaders.gl/gltf";

/* load base */
export function loadModel(url) {
  return new Promise((resolve, reject) => {
    coreLoad(url, GLTFLoader).then((data) => {
      const mesh = process(data);
      resolve(mesh);
    });
  });
}

function process(data) {
  const { attributes, indices } = data.meshes[0].primitives[0];
  const {
    POSITION: position,
    NORMAL: normal,
    TEXCOORD_0: texcoord,
  } = attributes;

  const result = {
    position: {
      numComponents: position?.components || null,
      data: position?.value || null,
    },
    normal: {
      numComponents: normal?.components || null,
      data: normal?.value || null,
    },
    texcoord: {
      numComponents: texcoord?.components || null,
      data: texcoord?.value || null,
    },
    indices: {
      numComponents: indices.components || null,
      data: indices.value || null,
    },
  };

  return result;
}
