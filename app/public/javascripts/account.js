$( "button[name='action']" ).click(function( e ) {
    let btn = $( this )
    
    // Réglages utilisateur
    if( btn.val() == 'save_personal_data' || btn.val() == 'save_password' || btn.val() == 'reset_medias'){
        e.preventDefault();
        let form
    
        if( btn.val() == 'save_personal_data'){
            form = 'personal_data_form';
        }else if( btn.val() == 'save_password'){
            form = 'password_form';
        }else if( btn.val() == 'reset_medias'){
            form = 'medias_form';
        }
        
        var myForm = document.getElementById( form );
        const formData = new FormData(myForm);
    
        let array = {};
        for (var p of formData) {
            array[p[0]] = p[1]
        }
    
        socket.emit('account_edit', btn.val(), JSON.stringify(array) ); 
    }else if(btn.val() == 'delete_account'){
        e.preventDefault();
        socket.emit('account_delete'); 
    }else if(btn.val() == 'undelete_account'){
        e.preventDefault();
        socket.emit('account_undelete'); 
    }
   
});




$( document ).ready(function() {
    socket.on('account_edit_response', function(response) {
        if(response.success == true){
            new Noty({
                type: 'success',
                layout: 'topRight',
                text: response.message,
                timeout: 5000,
                progressBar: false,
            }).show();
        }else{
            for (var key in response.errors) {
                new Noty({
                    type: 'error',
                    layout: 'topRight',
                    text: response.errors[key].message,
                    timeout: 5000,
                    progressBar: false,
                }).show();
            }
        }

        if(response.type == "delete_account"){
            setTimeout(function () {
                window.location.href = `${window.location.origin}/logout`;
            }, 6000);
        }
        if(response.type == "undelete_account"){
            setTimeout(function () {
                window.location.href = '';
            }, 1000);
        }
    });
    
});


