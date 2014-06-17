$(function (){
    

    if ($("textarea[name=description]").data('editor')=='html')
    {
        $("#formorm_description, textarea[name=description], textarea[name=email_purchase_notes], .cf_textarea_fields").addClass('col-md-6').sceditor({
            plugins: "xhtml",
            height: "450",
            toolbarExclude: "emoticon,cut,copy,paste,pastetext",
            resizeEnabled: "true",
            emoticonsEnabled: "false",
            emoticonsCompat: "false",
            enablePasteFiltering: "true"
        });
    }
    else
    {
        $('#formorm_description, textarea[name=description], textarea[name=email_purchase_notes], .cf_textarea_fields').addClass('col-md-6').sceditorBBCodePlugin({
            toolbar: "bold,italic,underline,strike|left,center,right,justify|" +
            "bulletlist,orderedlist|link,unlink,image,youtube|source",
            resizeEnabled: "true",
            emoticonsEnabled: "false",
            emoticonsCompat: "false",
            enablePasteFiltering: "true"});
    }
    

    $('.tips').popover();

    $("select").chosen();
    
    $('.radio > input:checked').parentsUntil('div .accordion').addClass('in');
    
    $('select[name="locale_select"]').change(function()
    {
         $('#locale_form').submit();
    });
    $('select[name="type"]').change(function()
    {
        // alert($(this).val());
        if($(this).val() == 'email') 
            $('#from_email').parent().parent().css('display','block');
        else
            $('#from_email').parent().parent().css('display','none');
    });

    // form-control class should not be applied on checkbox or radio
    $('input').each(function(){
        if(!$(this).hasClass('form-control')){
            if($(this).attr('type') != "checkbox" && $(this).attr('type') != "radio"){
                $(this).addClass('form-control');
            }
        }
        
    });

    // formorm forms are dynamically generated by kohana, so this is fix for selects
    $('select').each(function(){
        if(!$(this).hasClass('form-control')){
            $(this).addClass('form-control');
            $(this).chosen('destroy').chosen();
        }
    });

    $('.btn-licenses').click(function(){

        id_order = '#'+$(this).attr('data-licenses');
        if($(id_order).hasClass('hide'))
            $(id_order).removeClass('hide');
        else
            $(id_order).addClass('hide');
    });


});


function setCookie(c_name,value,exdays)
{
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays==null) ? "" : ";path=/; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}

//from https://github.com/peachananr/loading-bar
//I have recoded it a bit since uses a loop each, which is not convenient for me at all
$(function(){
    $("a.ajax-load").click(function(e){
        e.preventDefault(); 
        button = $(this);
        //get the link location that was clicked
        pageurl = button.attr('href');

        //to get the ajax content and display in div with id 'content'
        $.ajax({
            url:pageurl+'?rel=ajax',
            beforeSend: function() {
                                        if ($("#loadingbar").length === 0) {
                                            $("body").append("<div id='loadingbar'></div>")
                                            $("#loadingbar").addClass("waiting").append($("<dt/><dd/>"));
                                            $("#loadingbar").width((50 + Math.random() * 30) + "%");
                                        }
                                    }
                                    }).always(function() {
                                        $("#loadingbar").width("101%").delay(200).fadeOut(400, function() {
                                        $(this).remove();});
                                    }).done(function(data) {
                                        document.title = button.attr('title');
                                        if ( history.replaceState ) history.pushState( {}, document.title, pageurl );
                                        $("#content").html(data);});

        return false;  
    });
    
});

/* the below code is to override back button to get the ajax content without reload*/
$(window).bind('popstate', function() {
    $.ajax({url:location.pathname+'?rel=ajax',success: function(data){
        $('#content').html(data);
    }});
});