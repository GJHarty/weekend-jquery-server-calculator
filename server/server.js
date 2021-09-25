// require express and body-parser
const express = require('express');
const bodyParser = require('body-parser');

// create app
const app = express();
app.use(express.static('./server/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// global variables
const port = 5000;
// store calculations
// adding in placehodler test
let calcArray = [
    // this is where our posted newCalculations end up
];
// store current solution
let currentSolution = {
    currentSolutionVal: 0
};

// calculate out the real current solution
function calcSolution(array) {
    let firstObject = array[0];
    switch (true) {
        case firstObject.operator === '+':
            return Number(firstObject.num1) + Number(firstObject.num2);
            break;
        case firstObject.operator === '-':
            return Number(firstObject.num1) - Number(firstObject.num2);
            break;
        case firstObject.operator === '*':
            return Number(firstObject.num1) * Number(firstObject.num2);
            break;
        case firstObject.operator === '/':
            return Number(firstObject.num1) / Number(firstObject.num2);
            break;
        case firstObject.operator === '^':
            return Number(firstObject.num1) ** Number(firstObject.num2);
            break;
        case firstObject.operator === '^':
            return Number(firstObject.num1) ** Number(firstObject.num2);
            break;
        case firstObject.operator === '^':
            return Number(firstObject.num1) ** Number(firstObject.num2);
            break;
    };
};

//using the calcSolution, add a key/value pair to the object
function addKeyValuePair(array) {
    let firstObject = array[0];
    firstObject.solution = calcSolution(array);
}

// setup get request for appending calculation history
app.get('/calcHistory', (req, res) => {
    console.log('Ready to send back calculations');
    console.log('Route is:', req.route.path);

    // determine if calcArray has an object, and if so assign a new keyvalue with our current solution
    if (calcArray.length > 0) {
        addKeyValuePair(calcArray);
    };
    console.log(calcArray[0]);
    res.send(calcArray);
});

//setup get request for displaying currentSolution
app.get('/solution', (req, res) => {
    console.log('Ready to send back solution');

    // assign current solution
    currentSolution.currentSolutionVal = calcSolution(calcArray).toFixed(2);
    res.send(currentSolution);
});

//setup post request
app.post('/calcHistory', (req, res) => {
    console.log('Ready to post user input');

    // log data from client
    console.log('req.body', req.body);

    let newCalculation = req.body;

    // validate user inputs
    if (!newCalculation.num1 || !newCalculation.num2 || newCalculation.operator === '') {
        // user has missed an input, indicate client error
        res.status(400).send({
            message: 'Missing required field or operator. Please try again.'
        });
        // end function
        return;
    };

    // push to calculations array NEED TO FORMAT
    calcArray.unshift(newCalculation);

    res.sendStatus(200);
});

// listen for requests
app.listen(port, () => {
    console.log('App is up and running');
});