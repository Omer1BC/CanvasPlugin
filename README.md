## Loading the Plugin

First, visit https://github.com/Omer1BC/canvasPlugin/tree/master and fork the project.

<img width="296" alt="image" src="https://github.com/Omer1BC/canvasPlugin/assets/108303028/ecb20d81-8424-449b-8a0f-1f9fc1f5c55f">

 On your version, click Code, and download the zip file. 
 
 <img width="246" alt="image" src="https://github.com/Omer1BC/canvasPlugin/assets/108303028/f1b0c0ac-4857-441e-8849-d0d0e6fa2e11">

Unzip the project, and this should create a new folder with the unzipped contents. Visit chrome://extensions/ and enable developer mode if it’s unticked. Look for the 'load unpacked' option.

<img width="959" alt="image" src="https://github.com/Omer1BC/canvasPlugin/assets/108303028/a32a6e19-bf4c-452e-8234-822290178dc3">

Navigate to the unzipped folder and click select folder once your at this level with the following 2 sub-directories

<img width="367" alt="image" src="https://github.com/Omer1BC/canvasPlugin/assets/108303028/4b61d851-6cd6-4109-878a-50287e4bddb6">

Once successfull, to the right of the search bar you'll find a puzzle piece icon which houses all the plugins. Navigate to the one named 'Plugin'. 

<img width="164" alt="image" src="https://github.com/Omer1BC/canvasPlugin/assets/108303028/2c0e63df-fd2f-431c-b274-16865a6d70ed">

Exit out of the plugin by clicking somewhere outside of the UI on your screen. You can start it up again by following the same procedure on the puzzle piece icon. This resets the plugin to its default state.


## Starting the Server
Load the unzipped file into an IDE like VSCode (a simple drag and drop). Verify you're in the current directory with a call to `ls`. Among the files should be node.exe Then run `node server.js` and you should see the following output.

<img width="581" alt="image" src="https://github.com/Omer1BC/canvasPlugin/assets/108303028/725092ec-ff16-43e1-9633-cfee03b0b1a4">

<img width="89" alt="image" src="https://github.com/Omer1BC/canvasPlugin/assets/108303028/1c0e924f-3e5e-419d-86d8-fd04bdec8a5a">

##  Login and Analysis
With the server running in the background, start up the plugin and navigate to the 'Login' tab. Submit a text file representing your your Piazza username, password, and OpenAI API key in 3 seperate lines. Ensure that there are not trailing spaces. 

<img width="392" alt="image" src="https://github.com/Omer1BC/canvasPlugin/assets/108303028/c406f895-3410-4d42-b65a-ff39a5e74d79">

In the 'Analyze' tab, find a suitable post number and number of comments to analyze. Then give a prompt for ChatGPT to consider.
<img width="228" alt="image" src="https://github.com/Omer1BC/canvasPlugin/assets/108303028/a196856a-54f9-41a5-8928-b39d63da4917"><img width="242" alt="image" src="https://github.com/Omer1BC/canvasPlugin/assets/108303028/47ae5af5-914a-498c-8658-d1e2f046e8fd">

After waiting a few seconds for the response, you'll have the option to download it as a file.
The script being executed is `piazzaScript.py`and it can be tested individually by following the comments to find the argument format.

## ParserScript.py
The 
