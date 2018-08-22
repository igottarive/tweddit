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
var parasails = require('parasails');
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
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ post.title }}</h5>
      <p class="card-text" v-html="post.body"></p>
      <a :href="post.url" target="_blank" class="twitter btn btn-outline-info"><i class="fa fa-twitter"></i></a>
      <vote class="vote" v-bind:post="post" v-bind:user="user"></vote>
      <small class="fromNow text-muted">{{ post.fromNow }}</small>
      <postkarma class="postkarma" v-bind:votes="post.votes"></postkarma>
    </div>
  </div>
  `,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    //…
  },
  mounted: async function(){
    $(this.$el).css({
      'position': 'relative',
      'margin': '10px',
    });
    $('.twitter').css({
      'position': 'absolute',
      'bottom': '5px',
      'right': '5px',
    });
    $('.vote').css({
      'position': 'absolute',
      'top': '5px',
      'right': '5px',
    });
    $('.postkarma').css({
      'position': 'absolute',
      'top': '5px',
      'left': '5px',
    });
    $('.fromNow').css({
      'position': 'absolute',
      'bottom': '3px',
      'right': '50px',
    });
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
