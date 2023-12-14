//Main server script, delegates the processing to a python script whose stdout is sent back to the client
//Stderr is sent when an error occurs
const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
//Listen on port 3000 localhost
const port = 3000;
app.use(cors())
app.use(bodyParser.json()); 

app.post('/run-python-script', (req, res) => {
    let argument = req.body.argument;

    if (!argument) {
        res.status(400).send('Argument missing in the request body.');
        return;
    }
    //Determines which script to use, "parse" in the argument means a request to the csv processing script, piazza script otherwise
    let obj = removeAndExtractLastWord(argument);
    let lastWord = obj.lastWord
    let targetScript = 'piazzaScript.py'
    if (lastWord == 'parse')
    {
        targetScript = 'parserScript.py'
        argument = obj.stringWithoutLastWord;
    }
    const pythonScript = `python ${targetScript} ${argument}`;

    //Errors in the server are the stderr stream of python script, instances dictated by raiseError() in each script 
    exec(pythonScript, (error, stdout, stderr) => {
        if (error) {
            res.status(500).send(`Error: ${stderr}`);
        } else {
            res.send(` ${stdout}`);
        }
    });
});

app.listen(port, () => {
    console.log(`Port ${port}`);
});

//Chops off the last word of a string, non destructive
function removeAndExtractLastWord(inputString) {
    let trimmedString = inputString.trim();
    let lastSpaceIndex = trimmedString.lastIndexOf(' ');
  
    if (lastSpaceIndex === -1) {
      return trimmedString;
    } 
    let lastWord = trimmedString.substring(lastSpaceIndex + 1);  
    let stringWithoutLastWord = trimmedString.slice(0, lastSpaceIndex);
  
    //Yields an object with the cut string and the last word
    return {
      lastWord: lastWord,
      stringWithoutLastWord: stringWithoutLastWord
    };
  }
