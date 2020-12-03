Vue.component("node-list", {
  template: /*html*/`
    <div>
      <h4>Node list</h4>
      <table class="table">
        <thead>
          <tr>
            <th>Mod</th>
            <th>Image</th>
            <th>Nodename</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="nodename in Object.keys(mtinfo.nodes)">
            <td>{{ nodename.substring(0, nodename.indexOf(":")) }}</td>
            <td>
              <img :src="mtinfo.imageresolver(mtinfo.nodes[nodename])"/>
            </td>
            <td>
              <router-link :to="'/nodes/' + nodename">
                {{ nodename }}
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
});

Vue.component("node-info", {
  props: ["name"],
  computed: {
    previewImage: function(){
      return mtinfo.imageresolver(mtinfo.nodes[this.name]);
    }
  },
  template: /*html*/`
    <div>
      <h4>Node info: {{ name }}</h4>
      <pre>
        {{ JSON.stringify(mtinfo.nodes[name]) }}
      </pre>
      <div class="row">
        <div class="col-md-6">
          <!-- <img :src="previewImage" style="height: 64px; width: 64px;"/> -->
          <node-preview-normal v-if="mtinfo.nodes[name].drawtype == 'normal'" :node="mtinfo.nodes[name]"></node-preview-normal>
          <node-preview-normal v-if="mtinfo.nodes[name].drawtype == 'glasslike'" :node="mtinfo.nodes[name]"></node-preview-normal>
          <node-preview-normal v-if="mtinfo.nodes[name].drawtype == 'allfaces_optional'" :node="mtinfo.nodes[name]"></node-preview-normal>
          <div v-else>
            No preview available
          </div>
        </div>
        <div class="col-md-6">
        </div>
      </div>
    </div>
  `
});


Vue.component("node-preview-normal", {
  props: ["node"],
  computed: {
    frontStyle: function(){
      let texture = "pics/unknown_node.png";
      if (this.node.tiles){
        if (this.node.tiles.length >= 3) {
          // x+
          texture = "textures/" + mtinfo.stripimagetransforms(this.node.tiles[2]);
        } else {
          // last tile
          texture = "textures/" + mtinfo.stripimagetransforms(this.node.tiles[this.node.tiles.length-1]);
        }
      }

      return {
        "transform-origin": "0 0",
	      "position": "absolute",
        "width": "100px",
        "height": "100px",
        "background-image": "url('" + texture + "')",
      	"background-size": "cover",
      	"transform": "rotate(0deg) skewY(30deg) scaleX(0.864) translate(31px, 69px)"
      };
    },
    sideStyle: function(){
      let texture = "pics/unknown_node.png";
      if (this.node.tiles){
        if (this.node.tiles.length >= 5) {
          // z+
          texture = "textures/" + mtinfo.stripimagetransforms(this.node.tiles[4]);
        } else {
          // last tile
          texture = "textures/" + mtinfo.stripimagetransforms(this.node.tiles[this.node.tiles.length-1]);
        }
      }

      return {
        "transform-origin": "0 0",
	      "position": "absolute",
        "width": "100px",
        "height": "100px",
        "background-image": "url('" + texture + "')",
        "background-size": "cover",
        "transform": "rotate(-30deg) skewX(-30deg) translate(130px, 173px) scaleY(0.864)"
      };
    },
    topStyle: function(){
      let texture = "pics/unknown_node.png";
      if (this.node.tiles && this.node.tiles.length >= 1){
        texture = "textures/" + mtinfo.stripimagetransforms(this.node.tiles[0]);
      }

      return {
        "transform-origin": "0 0",
	      "position": "absolute",
        "width": "100px",
        "height": "100px",
        "background-image": "url('" + texture + "')",
      	"background-size": "cover",
      	"transform": "rotate(210deg) skew(-30deg) translate(-200px, -60px) scaleY(0.864)"
      };
    }
  },
  template: /*html*/`
    <div style="width: 300px; height: 300px; overflow: hidden;">
      <h4>Preview: {{ node.name }}</h4>
			<div v-bind:style="frontStyle"></div>
			<div v-bind:style="sideStyle"></div>
			<div v-bind:style="topStyle"></div>
    </div>
  `
});
