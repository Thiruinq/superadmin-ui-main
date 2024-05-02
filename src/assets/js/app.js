$('#sidebar-toggle, .sidebar .menu-list li').click(function(){
    var checkClass = $('.sidebar').hasClass('minimize');
    if(checkClass == true) {
        $('.sidebar').removeClass('minimize');
        if(window.innerWidth > 769) {
            $('.topbar').removeClass('minimize');
            $('.app-main-wrapper').removeClass('minimize');     
        }
    } else {
        $('.sidebar').addClass('minimize');
        if(window.innerWidth > 769) {
            $('.topbar').addClass('minimize');
            $('.app-main-wrapper').addClass('minimize');
        }
    }
    
})

 
 