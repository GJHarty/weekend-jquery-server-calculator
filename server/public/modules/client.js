// setup document start
$(document).ready(onReady);

//setup button determiner
$(document).ready(findOperator);

//create global variable to store operator
let operator = '';

//setup event handler
function onReady(){
    // add event handler for equals submit
    $('#equalsBtn').on('click', postCalculation);

    // run get function on load
    getCalculations();
};

// handler for determining which operator button was clicked. 
function findOperator(){
    $('.calcBtn').on('click', (clickedBtn) => {
        console.log('clickedBtn', clickedBtn.target.innerHTML);
        // set global variable = to clickedBtn
        operator = clickedBtn.target.innerHTML;
        return operator;
    });
};

// add function to grab user input and operator and post to server
function postCalculation(){
    console.log('postCalc');

    // create data object using user inputs and operator variable
    let newCalculation = {
        num1: Number($('#numberOne').val()),
        num2: Number($('#numberTwo').val()),
        operator: operator,
    };
    console.log('newCalculation is', newCalculation);

    // call ajax
    $.ajax({
        // delcare endpoint
        method: 'POST',
        url: '/calcHistory',
        data: newCalculation
    }).then((response) => {
        console.log('POST /calcHistory', response);
        //refresh data on server
        getSolution();
        getCalculations();
    }).catch((error) => {
            console.log('POST /inputs failed', error);
            //alert('There was an error processing the inputs. Please try again');
    });
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

        // render calculations array on DOM
        for (let calc of response){
            $('#calcHistory').append(`
                <li>
                    ${calc.calc}
                </li>
            `);
        };
    });
};

//add get function for currentSolution
function getSolution(){
    console.log('ready to get solution from server');
    $.ajax({
        method: 'GET',
        url: '/solution'
    }).then((response) => { // response = currentSolution object
        console.log('GET /solution', response); 
        
        // assign solution value
        $('#currentSolution').html(`${response.currentSolutionVal}`);
    });
};