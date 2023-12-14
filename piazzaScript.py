from bs4 import BeautifulSoup
from piazza_api import Piazza
import openai
import sys
#stdout of this is sent to the client, stderr means an error has occured and is displayed as a red error message at the buttom of the plugin
#Stops the program and prints to stderr, like a perror() in C
def raiseError(condition, stream,message): 
  try:
    assert condition
  except AssertionError as err:
    print(message,file=stream)
    sys.exit(1)
#Ensure that 7 arguments are passed, post offset, number of comments, piazza email, password, openai api key, and prompt 
raiseError(len(sys.argv) == 7,sys.stderr,"You must specify the post number and offset")

email =sys.argv[3]
passW=sys.argv[4]
stimulus = sys.argv[6]


#Log the user in 
p = Piazza()
try:
  p.user_login(email,passW)
except Exception as e:
  raiseError(False,sys.stderr,"Error in login to Piazza, verify login information and format")
user_profile = p.get_user_profile()
output = open("result.html","w")
eece210 = p.network("l6prbn87txz6l5")
i = 0
#get n comments to analyze
p1 = eece210.get_post(sys.argv[1])
children = p1['children']
for child in children:
    #print("The child is:" , child)
    try:
         if (i < int(sys.argv[2])):
            #print("Response" + str(i) + " " + child['subject'])
            #Retrieved as an html file, later cleaned up using beautiful soup as a text file
            output.write(f'Student {i}: '+ child['subject'] + "\n\n")
         else:
             break
         i = i + 1   
    except KeyError:
        print("")

output.close()

#Clean up as a regular text file to be sent as a string to chatGPT
with open('result.html', 'r') as htFile:
    htContent = htFile.read()
parser = BeautifulSoup(htContent,'html.parser')
text = parser.getText()

#Text will now be the cleaned up version
with open('output.txt', 'w', encoding='utf-8') as out:
    out.write(text)
api_key = sys.argv[5]
prompt = text

print(text + "\n---------------\n") #May want to include the student responses analyzed
#Response may not come of this, indicating a token limit or invalid api key
openai.api_key = api_key
try:
  response = openai.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
      {
        "role": "system",
        "content": stimulus
      },
      {
        "role": "user",
        "content": text
      }
    ],
    temperature=0,
    max_tokens=1024,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
  )
except Exception as e:
   raiseError(False,sys.stderr,"Error in prompting, check api key or reduce the number of posts")
print(response.choices[0].message.content)  





