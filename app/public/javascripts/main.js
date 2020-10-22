




// Modal
$( ".modal-btn" ).click(function( e ) {
    let dest = $( this ).data( "modal-dest" )
    const modal = $( "#delete-account-modal" )

    modal.removeClass('fadeOut');
	modal.addClass('fadeIn');
	modal.css("display", "flex");
})
$( ".modal-close-btn" ).click(function( e ) {
    const modal = $( this ).parents( ".modal" )

    modal.removeClass('fadeIn');
	modal.addClass('fadeOut');
	modal.css("display", "none");
})

window.onclick = function (event) {
    if( event.target.classList.contains('modal') ){
        const modal = $( ".modal" )
        modal.removeClass('fadeIn');
        modal.addClass('fadeOut');
        modal.css("display", "none");
    }
}


// Tabs
$(document).ready(function () {
    var previousActiveTabIndex = 0;

    $(".tab-switcher").on('click keypress', function (event) {
        // event.which === 13 means the "Enter" key is pressed

        if ((event.type === "keypress" && event.which === 13) || event.type === "click") {

            var tabClicked = $(this).data("tab");

            if(tabClicked != previousActiveTabIndex) {
                $(".tab-container").each(function () {
                    if($(this).data("tab") == tabClicked) {
                        $(".tab-container").addClass("hidden");
                        $(this).removeClass("hidden");
                        previousActiveTabIndex = $(this).data("tab");
                        return;
                    }
                });
            }
        }
    });
});


// Filters
$(document).ready(function () {
    $(".filter-btn-group .filter-item").on('click', function (event) {
        var type = this.dataset.filter;

        $( ".filter-btn-group .filter-item" ).removeClass('font-black text-primary-700');
        $( this ).addClass('font-black text-primary-700');
        if(type == 'all'){
            $( ".article-item" ).fadeIn(200);
            $( ".article-item" ).show();
        }else{
            $( ".article-item" ).hide();
            $( "[data-category='"+ type +"']" ).fadeIn(200);
        }
    });
});