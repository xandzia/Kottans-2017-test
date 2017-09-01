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


var app = new Vue({
    el: '#resourceGetContainer',
    data: {
        active: 0,
        showModal: false,
        repos: [],
        putUserName: "",
        loading: false,
        HTMLcontent: null,
        selectedCategory: "All",
        //для сортировки
        sortKey : '',
        reverse : 1, 
        searchKey : '',
        columns : ['name','stargazers_count', 'open_issues_count', 'updated_at'],
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
        
        //алфавитный сорт ПЕРВАЯ ВЕРСИЯ
//        sort: function () {
//    	   this.repos.sort(this.sortAlphaNum);
//        },
//        
//        sortAlphaNum: function (a,b) {
//    	   var reA = /[^a-zA-Z]/g;
//            var reN = /[^0-9]/g;
//            var aA = a.name.replace(reA, "");
//            var bA = b.name.replace(reA, "");
//            if(aA === bA) {
//                var aN = parseInt(a.name.replace(reN, ""), 10);
//                var bN = parseInt(b.name.replace(reN, ""), 10);
//                return aN === bN ? 0 : aN > bN ? 1 : -1;
//            } else {
//                return aA > bA ? 1 : -1;
//            }
//        },
//        reverse: function () {
//    	   this.repos.reverse();
//        },
        sortBy : function(sortKey){
            this.reverse = (this.reverse == -1) ? 1 : -1 ;
            this.sortKey = sortKey;
        },
        
    // set active modal and set index wich content is activeted
    modalOpen: function(i) {
        this.showModal = true; 
        return this.active = i;
      }
  
      
    },
        //checked
        computed: {
		  filteredRepos: function() {
			var vm = this;
			var category = vm.selectedCategory;
			
			if(category === "All") {
				return vm.repos;
			} else {
				return vm.repos.filter(function(person) {
                    if(category === "fork"){
                        return person.fork === true;
                    }
                    if(category === "sourse"){
                        return person.fork === false;
                    }
                        return person.language === category;
 				});
        
            };
		}
	},
    
    filters: {
    moment: function (date) {
      return moment(date).format('ll');
    }
  }
});