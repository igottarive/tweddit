/**
 * <post>
 * -----------------------------------------------------------------------------
 * A display for a post from a user.
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */
if(typeof window === 'undefined') { var parasails = require('parasails'); }
parasails.registerComponent('post', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    'post',
    'user',
  ],

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function (){
    return {
      //…
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
  <div class="post card">
    <div class="card-body postCard">
      <h3 class="card-title text-info">{{ post.title }}</h3>
      <p class="card-text text-info" v-html="post.body"></p>
      <a :href="post.url" target="_blank" class="twitter btn btn-outline-info"><i class="fa fa-twitter"></i></a>
      <vote class="vote" v-bind:post="post" v-bind:user="user"></vote>
      <small class="fromNow text-muted">{{ post.fromNow }}</small>
      <postkarma class="postkarma" v-bind:votes="post.votes"></postkarma>
      <button type="button" class="openComments btn btn-outline-info" data-toggle="collapse"
        :data-target="'#' + id" aria-expanded="false" :aria-controls="id">
        <i class="fa fa-comment"></i>
      </button>
      <div class="collapse" :id="id">
        <div class="card card-body card-comment">
          <add-comment v-bind:post="post" v-bind:user="user"></add-comment>
          <list-comment v-bind:post="post"></list-comment>
        </div>
      </div>
    </div>
  </div>
  `,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    //…
    this.id = 'comment' + this.post.id;
  },
  mounted: async function(){
    //…
  },
  beforeDestroy: function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    click: async function(){
      this.$emit('click');
    },

  }
});
