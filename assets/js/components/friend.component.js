/**
 * <friend>
 * -----------------------------------------------------------------------------
 * A display for a post from a user.
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */
if(typeof window === 'undefined') { var parasails = require('parasails'); }
parasails.registerComponent('friend', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    'user',
    'type' //friend or enemy
  ],

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function (){
    return {
      users: [{id: 0, ratings: 0, fullName: 'None'}],
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
  <ul class="list-group" v-cloak>
    <li class="list-group-item list-group-item-secondary">  {{ type | capitalize }}</li>
    <li class="list-group-item" v-for="user in users" v-bind:key="user.id">{{user.fullName}}</li>
  </ul>
  `,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    //Get data from server
    $.ajax({
      url: '/api/v1/get-friends',
      data: {
        user: this.user.id,
      },
      error: function() {
        alert( 'this is an invalid user' );
      },
      success: resp => {
        if(resp[this.type].length) {
          this.users = resp[this.type];
        }
      },
    });
  },
  mounted: async function(){
    $(this.$el).css({
      'width': '220px',
      'padding': '10px',
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

  },
  filters: {
    capitalize: function (value) {
      if (!value) { return ''; }
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
});
