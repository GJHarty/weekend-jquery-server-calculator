// setup document start
$(document).ready(onReady);

//setup event handler
function onReady(){
    // add event handler for equals submit
    $('#equalsBtn').on('click', submitCalc);

    // run get function
};

// add function to grab user input and operator and post to server
function submitCalc(){
    console.log('SubmitCalc');
};

// add function to get the calcArray and display on server
function getCalculations(){
    // call ajax
    $.ajax({
        // declare endpoint
        method: 'GET',
        url: '/calcHistory'
    }).then((response) => {
        console.log('GET /calcHistory response', response);

        // target our ul
        let calculationsList = $('#calcHistory');

        //empty ul
        calculationsList.empty();
        // render calculations on DOM
        for (let calc of response){
            $('#calcHistory').append(`
                <li>
                    ${calc.calc}
                </li>
            `);
        };
    });
};