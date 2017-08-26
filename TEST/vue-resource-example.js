
Vue.config.devtools = true; //https://github.com/vuejs/vue-devtools
Vue.config.debug = true;


new Vue({
    el: '#resourceGetContainer',
    data: {
        repoList: [],
        organization: "",
        loading: false,
    },
    ready: function () {
        // this.loadRepositories();
    },
    methods: {
        loadRepositories: function () {
            var self = this;
            var url = "https://api.github.com/orgs/"&&"https://api.github.com/users/" + this.organization + "/repos";

            this.loading = true;
            // GET request
            this.$http.get(url).then(function (response) {
                this.loading = false;
                // success callback
                this.repoList = response.data;


            }, function (response) {
                this.loading = false;
                // error callback
                this.repoList = [];

            });
        },
    },
});
