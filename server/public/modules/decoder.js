//I am the infamous hacker known as Garret

$(document).ready(onReady);

//setup event handler
function onReady(){
    // add event handler for decoder
    $('#decoder').on('click', decode);
};

function decode(){
    $('*').css('font-family', 'menlo');
    $('#decoderDiv').remove();
    console.log('Page has been decoded');
};