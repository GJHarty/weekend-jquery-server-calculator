// setup document start
$(document).ready(onReady);

//setup button determiner
$(document).ready(findOperator);

$(document).ready(liveDisplayHandler);

//create global variable to store numbers and operator
let numberOne = 0;
let numberTwo = 0;
let operator = '';

// create livedisplay string
let liveDisplayString = $('#liveDisplay').val();

//setup event handler
function onReady(){
    // add event handler for equals submit
    $('#equalsBtn').on('click', postCalculation);
    $('#equalsBtn').on('click', splitLiveDisplay);

    // add handler for clear button
    $('#clearBtn').on('click', clearInputs);

    // run get function on load
    getCalculations();
};

// clear button
function clearInputs(){
    // console.log('Clearing inputs');
    // $('#numberOne').val('');
    // $('#numberTwo').val('');
    // operator = '';
    $('#liveDisplay').val('');
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

// handler for splitting the liveDisplay string
function splitLiveDisplay(){
    let numbers = liveDisplayString.split(/[*]|[+]|[\/]|[\*]/);
    let operators = liveDisplayString.split(/[^*x]/).filter(e => e);
    console.log(numbers);
    console.log(operators);
    numberOne = numbers[0];
    numberTwo = numbers[1];
    operator = operators[0];
};

function liveDisplayHandler(){
    $('.calcBtn').on('click', (clickedBtn) => {
        console.log('clickedBtn', clickedBtn.target.innerHTML);

        let liveDisplay = $('#liveDisplay').val();
        // determine which id was clicked and append to liveDisplay
        switch (true) {
            case clickedBtn.target.innerHTML === '1':
                liveDisplay += '1';
                $('#liveDisplay').val(liveDisplay);
                break;
            case clickedBtn.target.innerHTML === '2':
                liveDisplay += '2';
                $('#liveDisplay').val(liveDisplay);
                break;
            case clickedBtn.target.innerHTML === '3':
                liveDisplay += '3';
                $('#liveDisplay').val(liveDisplay);
                break;
            case clickedBtn.target.innerHTML === '4':
                liveDisplay += '4';
                $('#liveDisplay').val(liveDisplay);
                break;
            case clickedBtn.target.innerHTML === '5':
                liveDisplay += '5';
                $('#liveDisplay').val(liveDisplay);
                break;
            case clickedBtn.target.innerHTML === '6':
                liveDisplay += '6';
                $('#liveDisplay').val(liveDisplay);
                break;
            case clickedBtn.target.innerHTML === '7':
                liveDisplay += '7';
                $('#liveDisplay').val(liveDisplay);
                break;
            case clickedBtn.target.innerHTML === '8':
                liveDisplay += '8';
                $('#liveDisplay').val(liveDisplay);
                break;
            case clickedBtn.target.innerHTML === '9':
                liveDisplay += '9';
                $('#liveDisplay').val(liveDisplay);
                break;
            case clickedBtn.target.innerHTML === '0':
                liveDisplay += '0';
                $('#liveDisplay').val(liveDisplay);
                break;
            case clickedBtn.target.innerHTML === '+':
                liveDisplay += '+';
                $('#liveDisplay').val(liveDisplay);
                break;
            case clickedBtn.target.innerHTML === '-':
                liveDisplay += '-';
                $('#liveDisplay').val(liveDisplay);
                break;
            case clickedBtn.target.innerHTML === '*':
                liveDisplay += '*';
                $('#liveDisplay').val(liveDisplay);
                break;
            case clickedBtn.target.innerHTML === '/':
                liveDisplay += '/';
                $('#liveDisplay').val(liveDisplay);
                break;
            case clickedBtn.target.innerHTML === '.':
                liveDisplay += '.';
                $('#liveDisplay').val(liveDisplay);
                break;
        }
    });
};

// add function to grab user input and operator and post to server
function postCalculation(){
    console.log('postCalc');

    // create data object using user inputs and operator variable
    let newCalculation = {
        num1: $('#numberOne').val(),
        num2: $('#numberTwo').val(),
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
        // refresh data on server
        getSolution();
        getCalculations();

        // clear input fields and reset operator
        $('#numberOne').val('');
        $('#numberTwo').val('');
        operator = '';
    }).catch((error) => {
            console.log('POST /inputs failed', error);
            alert('There was an error processing the inputs or the operator. Please try again');
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
        for (let calc of response){ // response = calcArray, calc = object
            $('#calcHistory').append(`
                <li>
                    ${calc.num1} ${calc.operator} ${calc.num2} = ${calc.solution}
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