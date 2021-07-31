// setup document start
$(document).ready(onReady);

$(document).ready(liveDisplayHandler);

//create global variable to store numbers and operator
let numberOne;
let numberTwo;
let operator = '';

//setup event handler
function onReady(){
    // add event handler for equals submit
    $('#equalsBtn').on('click', equalsClick);
    
    // add handler for clear button
    $('#clearBtn').on('click', clearInputs);

    // run get function on load
    getCalculations();
};

// condense event handler for equals button click
function equalsClick(){
    splitLiveDisplay();
    postCalculation();
    console.log('equalsClick load succesful');
}

// clear button
function clearInputs(){
    console.log('Clearing inputs');
    $('#liveDisplay').val('');
};

// handler for splitting the liveDisplay string
function splitLiveDisplay(){
    // create livedisplay string
    let liveDisplayString = $('#liveDisplay').val();
    
    // split numbers by operator
    let numbers = liveDisplayString.split(/[*]|[+]|[\/]|[\-]/);

    // single out operator
    let operators = liveDisplayString.split(/[^-|+|\/|\*]/).filter(e => e);

    console.log(numbers);
    console.log(operators);

    // assign numbers and operator
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
        num1: numberOne,
        num2: numberTwo,
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

        // clear out livedisplay and reset globals
        $('#liveDisplay').val('');
        numberOne = 0;
        numberTwo = 0;
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
                    ${calc.num1} ${calc.operator} ${calc.num2} = ${(calc.solution).toFixed(2)}
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