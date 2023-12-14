    //Early work on modifying the dom to display the output

    // const dom = document.createElement("button");
    // const toggle = document.createElement("button");
    // const ui = document.getElementById('menu')
    // toggle.textContent = 'Toggle Visibility';


    // dom.textContent = "Sample response";
    // dom.className = 'input'
    
    // dom.style.position = "fixed";
    // dom.style.top = "10px";
    // dom.style.left = "10px";
    // dom.style.padding = "10px";
    // dom.style.background = "#fff";
    // dom.style.color = "#000";
    // dom.style.border = "1px solid #000";
    // dom.style.zIndex = "9999";
   // document.body.appendChild(dom);
   // menu.appendChild(toggle);


    //Toggle on and off dom element 

    // toggle.onclick = function() {
    //   dom.style.display = (dom.style.display === 'none') ? 'block' : 'none';
    //   toggle.style.display == 'none';
    // };

    let downloadLink = null;

    document.addEventListener('DOMContentLoaded', function() {




    //First 3 lines in the text file represent piazza login and and openai key
    let lines = null;
    const input = document.getElementById("id");
    //Button 1, for piazza response, other one for csv portion of the project
    const button = document.getElementById('register');
    const process = document.getElementById('processCsv');
    const input2 = document.getElementById("nPosts");

    
    //Login file
    let fileInput = null;
    let file = null;

    //Template and test file for csv tab
    let templateFile = null;
    let tempFile = null;

    let testFile = null;
    let tFile = null;

    //Grabs login file when the user uploads it in the login tab
    const fileContentData = '';

    document.getElementById('fileInput').addEventListener('change', event => {
      
        fileInput = event.target;
        file = fileInput.files[0];

    });

    //Grabs the template and test csv file, one for creating a format for command, and test is for error detection with that format
    document.getElementById('fileInput2').addEventListener('change', event => {
      
      templateFile = event.target;
      tempFile = templateFile.files[0];

  });

  
  document.getElementById('fileInput3').addEventListener('change', event => {
      
    testFile = event.target;
    tFile = testFile.files[0];

  });

  //Analyze piazza comment section following a post id and number of posts
    button.addEventListener('click', (event)=> {

      // const fileInput = document.getElementById('fileInput');
      // const file = fileInput.files[0];
      
      if (file == null)
      {
        document.getElementById("error").textContent = 'Make sure to provide the login file'
      }
      if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
              const content = e.target.result;
              lines = content.split('\n').slice(0, 3);        
              if (lines == null)
              {

                 document.getElementById("error").textContent = 'Failed to find 3 lines of information'
              }
              else
              {
                //Stimulus is the question you're asking chatGPT regarding the posts, for instance whether they answer the discussion
                document.getElementById("error").textContent = ''
                const resp = sendPostRequest(input.value,input2.value,lines[0],lines[1],lines[2],document.getElementById('stimulus').value)
              }       
             // dom.textContent = fileContentData
          };
          document.getElementById("error").textContent = 'Make sure to provide the login file and press login'
          reader.readAsText(file);
      }


    }) 
    //For the third tab button, currently bugged
    process.addEventListener('click', (event)=> {
      if (tFile == null || tempFile == null)
      {
        document.getElementById("error").textContent = 'Make sure to submit both files'
      }
      else
      {
        //This time we want to detect the errors in a test file, whether it fits the template of commands, parse keyword is to distinguish the calls
        sendParseRequest(tempFile.name,tFile.name,"parse");
      }
    })

  });
  //Regular piazza analysis routine, sent to a server which then executes a python script that prmopts gpt
  function sendPostRequest(offset,nPost,user,pass,key,value)
  {
      const url = 'http://localhost:3000/run-python-script';
      //Python script argument, later ran server side using exec
      const argument = `${offset} ${nPost} ${user} ${pass} ${key} "${value}"`;

      const data = {                                                                    
        argument: argument
      };

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'     
        },
        body: JSON.stringify(data)
      };

      fetch(url, requestOptions)
        .then(response => {
          if (response.ok) {
            fileContentData = response.txt
            return response.text(); 
          } else {

            return response.text().then(errorMessage => {
              document.getElementById("error").textContent = `HTTP error! ${errorMessage}`; //Errors are the stderr stream of the python script
              throw new Error(`HTTP error! ${errorMessage}`);
            });
            // document.getElementById("error").textContent = `HTTP error! Status: ${response.text()}`
            // throw new Error(`HTTP error! Status: ${response.status}`);            
          }
        })
        .then(data=> {
          document.getElementById("response").value = data;
          //Create a download link for the response
          fileContentData = data
          const blob = new Blob([fileContentData], { type: 'text/plain' });
          if (!downloadLink) {
            // If the download link doesn't exist, create a new one
            downloadLink = document.createElement('a');
            downloadLink.download = 'response.txt';
            downloadLink.textContent = 'Download Response';
            document.getElementById('tab2_content').appendChild(downloadLink);
          }
        
          downloadLink.href = URL.createObjectURL(blob);
        })
        .catch(error => {
          console.error('Error:', error);
        });



  }
  //Csv analysis routine, similar procedure piazza routine, except passing the 2 files to python script named parserScript.py
  function sendParseRequest(tempFile,tFile,parseFile)
  {
    //tempFile is the template, and tFile gives a dummy set of commands to be validated for errors
      const url = 'http://localhost:3000/run-python-script';
      const argument = `${tempFile} ${tFile} ${parseFile}`;

      const data = {                                                                    
        argument: argument
      };

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'    
        },
        body: JSON.stringify(data)
      };

      fetch(url, requestOptions)
        .then(response => {
          if (response.ok) {
            fileContentData = response.txt
            return response.text(); 
          } else {

            return response.text().then(errorMessage => {
              document.getElementById("error2").textContent = `HTTP error! ${errorMessage}`;
              throw new Error(`HTTP error! ${errorMessage}`);
            });
            // document.getElementById("error").textContent = `HTTP error! Status: ${response.text()}`
            // throw new Error(`HTTP error! Status: ${response.status}`);
      
          }
        })
        .then(data=> {
          document.getElementById("response").value = data;

          // fileContentData = data
          // const blob = new Blob([fileContentData], { type: 'text/plain' });

          // const url = URL.createObjectURL(blob);
      
          // const downloadLink = document.createElement('a');
          // downloadLink.href = url;
          // downloadLink.download = 'response.txt';
          // downloadLink.textContent = 'Download Response';
      
          // document.getElementById('tab2_content').appendChild(downloadLink);
          // console.log(data); 
        })
        .catch(error => {
          console.error('Error:', error);
        });

  }


