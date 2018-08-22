/**
 * <vote>
 * -----------------------------------------------------------------------------
 * An up or down vote for a post.
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */
if(typeof window === 'undefined') { var parasails = require('parasails'); }
parasails.registerComponent('vote', {
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
      // Main syncing/loading state for this page.
      syncing: false,

      // Form data
      formData: { /* … */ },

      // For tracking client-side validation errors in our form.
      // > Has property set to `true` for each invalid property in `formData`.
      formErrors: { /* … */ },

      // Server error state for the form
      cloudError: '',

      rating: 0,
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
  <div class="vote">
    <ajax-form action="addVote" :syncing.sync="syncing" :cloud-error.sync="cloudError" :handle-parsing="handleParsingForm">
      <ajax-button type="submit" class="btn btn-outline-info" v-on:click="formData.rating=1"><i class="fa fa-thumbs-up"></i></ajax-button>
      <ajax-button type="submit" class="btn btn-outline-info" v-on:click="formData.rating=-1"><i class="fa fa-thumbs-down"></i></ajax-button>
    </ajax-form>
  </div>
  `,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    //…
  },
  mounted: async function(){
    $('.ajax-form').css({
      'display': 'inline-block',
    });
  },
  beforeDestroy: function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    handleParsingForm: function() {
      //Validate Twitter data here-ish to set the body
      this.formData.user = 1;
      this.formData.post = this.post.id;

      return this.formData;
    },

  }
});
