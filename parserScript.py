import csv
import sys
#An object that stores information about the row, command name, critical columns etc
#Columns marked as x are not expected to be filled
class Command:
    myOptions = []
    myValues = []
    name = ''
    myKeys = {}
    def __init__(self,options,values,keys):
        self.myOptions = options
        self.myValues = values
        self.name = self.myValues[0]
        self.myKeys=keys;
    def printOptions(self):
        print("Command: " + self.name + " options:",self.myOptions);
        for value,option in zip(self.myValues,self.myOptions):
            print(self.myKeys[option] +": " + value + " ",end=" ")
        print()
def raiseError(condition, stream,message): 
  try:
    assert condition
  except AssertionError as err:
    print(message,file=stream)
    sys.exit(1)
keys = {}
def prime(fileName):
    csv_file_path = fileName
    cmds = []
    #Attempt to open the file
    try:
        open(csv_file_path, 'r')
    except Exception as e:
        #Currently files dropped by the user in the java script don't transmit to the python script, so it stops here
        raiseError(False,sys.stderr,"Error in opening the file")
    with open(csv_file_path, 'r') as csv_file:
        csv_reader = csv.reader(csv_file)
        first = True
        i = 0;
    
        for row in csv_reader:
            local = []
            values = []
            for col in row:
                if (col != 'x'):
                    #Append critical columns for this command
                    local.append(i)
                    #print(col,end=" ")
                    #Append the actual value; I intend to store information about the type of data or format later on
                    #For error detection
                    values.append(col.strip())
                if (first):
                    #Column headers
                    keys[i] = col
                i=i+1
            first = False
            i=0
            print()
            #Create command object that stores this information for each row
            currCommand = Command(list(local),list(values),dict(keys))
            currCommand.printOptions();
            cmds.append(currCommand);
            local.clear()
            values.clear()
    return cmds
        
def parse(fileName,cmds):         
    path = fileName
    #Standard csv traversal
    with open(path, 'r') as csv_file:
        csv_reader = csv.reader(csv_file)
        first = True
        parsedVals = []
        for row in csv_reader:
            y = 0
            args = []
            name = ''
            for col in row:
                if (first):
                    first = False
                    for cmd in cmds:
                        #Find the command object and retrieve the critical columns
                        if cmd.name == col:
                            print("options for",cmd.name,"are",cmd.myOptions)
                            args = cmd.myOptions
                            name = cmd.name
                            break;
                #Is the column in the list of option columns for this command?
                if y in args:
                    parsedVals.append(col) 
                elif (col != 'x'):
                    print("command ",name,"has an invalid value of ", col, "found in column",keys[y])             
                y=y+1
            first = True
            print(parsedVals)
            parsedVals.clear()
            
            
#Check for insuffecient arguments, namely 2 files at least          
raiseError(len(sys.argv) >= 3,sys.stderr,"Please provide the template and test file")
templateFile = sys.argv[1]
testFile = sys.argv[2]
#First follow a template and determine which columns are expected to be filled
cmds = prime(templateFile)  
#Pass the generated cmd objects and a test file to determine if there's any errors       
parse(testFile,cmds)                   
            
            
                
            

    

       
        
            

    
