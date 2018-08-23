/**
 * <add-post>
 * -----------------------------------------------------------------------------
 * A display for a post from a user.
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */
if(typeof window === 'undefined') { var parasails = require('parasails'); }
parasails.registerComponent('add-post', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
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

      heroHeightSet: false,
      dashboardModalVisible: false,
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
  <div v-cloak>
    <button class="btn btn-outline-info ml-2" @click="clickOpenDashboardModalButton()">Tweddit</button>

    <modal class="example-modal" v-if="dashboardModalVisible" @close="closeDashboardModal()" v-cloak>
      <div class="modal-header">
        <h2 class="modal-title">Tweddit</h2>
        <p>Create a new Tweddit</p>
        <hr/>
        <button type="button" class="modal-close-button" data-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <ajax-form action="addPost" :syncing.sync="syncing" :cloud-error.sync="cloudError" @submitted="submittedForm()" :handle-parsing="handleParsingForm">
          <div class="row">
            <div class="col-sm-6">
              <div class="form-group">
                <label for="title">Title</label>
                <input class="form-control" id="title" name="title" type="text"  :class="[formErrors.title ? 'is-invalid' : '']" v-model.trim="formData.title" placeholder="Another great Tweddit" autocomplete="title" focus-first>
                <div class="invalid-feedback" v-if="formErrors.title">Please enter a great Title.</div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <label for="url">Twitter Link</label>
                <input class="form-control" id="url" name="url" type="url"  :class="[formErrors.url ? 'is-invalid' : '']" v-model.trim="formData.url" placeholder="https://twitter.com/PizzaPizzaLtd/status/1029794684485259264" autocomplete="twitter">
                <div class="invalid-feedback" v-if="formErrors.url">The url for the tweet you want to add.</div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <p class="text-danger" v-if="cloudError === 'emailAlreadyInUse'">There is already an account using that email address.</p>
              <p class="text-danger" v-else-if="cloudError">An error occured while processing your request. Please check your information and try again, or <a href="/contact">contact support</a> if the error persists.</p>
            </div>
            <div class="col-sm-6">
              <div class="form-group text-right">
                <button class="btn btn-outline-info" data-dismiss="modal">Cancel</button>
                <ajax-button type="submit" :syncing="syncing" class="btn btn-info">Save changes</ajax-button>
              </div>
            </div>
          </div>
        </ajax-form>
      </div>
    </modal>
  </div>
  `,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Set the form data.
    this.formData.title = 'A New Tweddit';
    this.formData.url = 'https://twitter.com/Eden_Eats/status/725826134911283200';
    if(this.user && this.user.id) {
      this.formData.user = this.user.id;
    }
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

    clickOpenDashboardModalButton: async function() {
      this.dashboardModalVisible = true;
    },

    closeDashboardModal: async function() {
      this.dashboardModalVisible = false;
    },

    submittedForm: async function() {
      //Handle Twitter api call here-ish to set the body

      //Close Modal once successful
      this.closeDashboardModal();
    },

    handleParsingForm: function() {
      //Validate Twitter data here-ish to set the body

      // Clear out any pre-existing error messages.
      this.formErrors = {};

      var argins = this.formData;

      // Validate title:
      if(!argins.title) {
        this.formErrors.title = true;
      }

      // Validate url:
      if(!argins.url) {
        this.formErrors.url = true;
      }

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)
      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      return argins;
    },


    click: async function(){
      this.$emit('click');
    },

  }
});
