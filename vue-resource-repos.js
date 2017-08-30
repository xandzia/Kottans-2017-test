// global component
Vue.component("my-repo", {
  template: "#repo-info",
  props: {
    active: "active",
    isActive: "isActive",
    repolist: "repolist",
    show: {
      type: Boolean,
      required: true,
      twoWay: true
    }
  },
  methods: {
    // check wich content index is active
    modalActiveContent: function(i) {
       return this.active === i
    },
    // close modal
    setModalClose: function() {
     this.show = false;
      //if need set active content to zero object       
     // this.active = 0;
    }
  }
});

Vue.config.devtools = true; //https://github.com/vuejs/vue-devtools
Vue.config.debug = true;


new Vue({
    el: '#resourceGetContainer',
    data: {
        active: 0,
        showModal: false,
        repos: [],
        putUserName: "",
        loading: false,
        HTMLcontent: null,
    },
    ready: function () {
//         this.loadRepositories();
    },
    methods: {
        loadRepositories: function () {
            var self = this;
            var url = "https://api.github.com/orgs/"&&"https://api.github.com/users/" + this.putUserName + "/repos";

            this.loading = true;
            // GET request
            this.$http.get(url).then(function (response) {
                this.loading = false;
                this.HTMLcontent = null;
                // success callback
                this.repos = response.data;


            }, function errors (response, status) {
                this.loading = false;
                // error callback
                console.log(response);
                this.status = response.statusText;
                console.log(this.status);
                if ( this.status === "Not Found"){
                  this.HTMLcontent = `
                    <div>Can't find, error 404</div>
                  `;}
              else{
                this.HTMLcontent = `
                    <div>Ops, error. For more information see console</div>
                  `;};
                
                this.repos = [];

            });
        },
      
    // set active modal and set index wich content is activeted
    modalOpen: function(i) {
        this.showModal = true; 
        return this.active = i;
      }
  
      
    },
    filters: {
    moment: function (date) {
      return moment(date).format('ll');
    }
  }
});