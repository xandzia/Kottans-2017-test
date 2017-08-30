$(".btn-searching").click(function() { 
    $(".search").addClass('activeHeadForm');
    $(".search>label").addClass('activeLogo');     
    $(".search-input").css('position', 'relative');     
    $(".filterssorting").css('display', 'flex');     
    $(".container").css('display', 'block');     
});
//загрузка с ENTER KEY
$("#userName").keypress(function (e) {
 var key = e.which;
 if(key == 13)  // the enter key code
  {
    $(".btn-searching").click();
    return false;  
  }
});
//выпадающее меню фильтров и сортировки
$(".btn-filter").click(function() {
    $(".filters-menu").css('display', 'block');
    $("button").attr("aria-expanded","true");
});
$(".menu-close").click(function() {
    $(".filters-menu").css('display', 'none');
    $("button").attr("aria-expanded","false");
});
//закрыть меню при активности вне его
$(document).mouseup(function (e) {
    var container = $(".filters-menu");
    if (container.has(e.target).length === 0){
        container.hide();
    }
});

$(".btn-sorting").click(function() {
    $(".sorting-menu").css('display', 'block');
    $("button").attr("aria-expanded","true");
});
$(".menu-close").click(function() {
    $(".sorting-menu").css('display', 'none');
    $("button").attr("aria-expanded","false");
});
//закрыть меню при активности вне его
$(document).mouseup(function (e) {
    var container = $(".sorting-menu");
    if (container.has(e.target).length === 0){
        container.hide();
    }
});
//function close(){
//    var btn1 = $(".btn-filter");
//    var btn2 = $(".btn-sorting");
//    var menu1 = $(".filters-menu");
//    var menu1 = $(".sorting-menu");
//    if 
//        btn1.click(function() {
//    menu1.css('display', 'block');
//    $("button").attr("aria-expanded","true");
//});
//    else btn1=btn2;
//    menu1 = menu2;
//    
//};
