// global component
Vue.component("my-car", {
  template: "#car-info",
  props: {
    active: "active",
    isActive: "isActive",
    carlist: "carlist",
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
new Vue({
  el: "#dialog",
  data: {
    active: 0,
    showModal: false,
    cars: [{
      title: "Default",
      description: "lorem lorem lorem."
    },{
      title: "Citroen",
      description: "Lorem ipsum."
    }, {
      title: "Honda",
      description: "Lorem ipsum lorem lorem."
    }]
  }, 
  methods: {
    // set active modal and set index wich content is activeted
    modalOpen: function(i) {
        this.showModal = true; 
        return this.active = i;
      }
  }
});