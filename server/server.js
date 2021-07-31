// require express and body-parser
const express = require('express');
const bodyParser = require('body-parser');

// create app
const app = express();
app.use(express.static('./server/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// global variables
const port = 5000;
let currentSolution = {
    currentSolution: 0
};
// store previous calculations
// adding in placehodler test
let calcArray = [
    {
        calc: 'placeholder'
    }
];

// setup get request
app.get('/calcHistory', (req, res) => {
    console.log('Ready to send back calculations');
    console.log('Route is:', req.route.path);
    res.send(calcArray);
});

//setup post request
app.post('/calcHistory', (req, res) => {
    console.log('Ready to post user input');
    
    // log data from client
    console.log('req.body', req.body);

    let newCalculation = req.body;

    // validate user inputs
    if (!newCalculation.num1 || !newCalculation.num2 || newCalculation.operator === ''){
        // user has missed an input, indicate client error
        res.status(400).send({
            message: 'Missing required field or operator. Please try again.'
        });
        // end function
        return;
    };

    // push to calculations array NEED TO FORMAT
    calcArray.push(newCalculation);

    res.sendStatus(200);
});

// listen for requests
app.listen(port, () => {
    console.log('App is up and running');
});