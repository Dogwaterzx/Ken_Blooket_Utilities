#v2.3.0
import requests
import time
import json

email = [""]
password = [""]


repo = requests.get("https://raw.githubusercontent.com/thegamebegins25/blookethack/main/hack/update.py")
file = open("update.py", "r")

if file.read()[:7] != repo.text[:7]:
    file.close()
    print("Update available. Updating now...")
    file2 = open("update.py", "w")
    lines = repo.text.split("\n")
    for i in range(0, len(lines)):
        lines[i] = lines[i] + "\n"
    file2.writelines(lines)
    time.sleep(3)
    file2.close()
    print("Update complete.")


repo = requests.get("https://raw.githubusercontent.com/thegamebegins25/blookethack/main/hack/main.py")


module = __import__(__name__)
file = open(module.__file__, "r")
if file.read()[:7] != repo.text[:7]:
    print("Update available. Updating now...")
    import update
    time.sleep(3)
    print("Update complete. The program will now stop for the updates to process.")
    quit()





#fake useragent
headers = {'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36",
    'Accept-Encoding': "gzip, deflate",
    'Accept': "application/json",
    'Content-Type': "application/json;charset=utf-8",
    'Accept-Language': "en-GB,en;q=0.9"}

#create a requests session
session = requests.Session()
session.headers.update(headers)


#login to blooket and start the session
def login(email, password):
    payload = {"name": email, "password": password}
    payload = json.dumps(payload)
    log = session.post("https://api.blooket.com/api/users/login", data=payload)
    print(log)
    try:
        log.raise_for_status()
        verify()
    except Exception as exception:
        print("Your username or password might have changed. Update your password and try again. Error: " + str(exception))
        quit()

#verify the connection is secure
def verify():
    global username
    ver = session.get("https://api.blooket.com/api/users/verify-session")
    print(ver)
    
    try:
        ver.raise_for_status()
        username = json.loads(ver.text)["name"]
        print(username)

    except Exception as exception:
        print("The session could not be verified. Please try again. Error: " + str(exception))
        quit()
    

def logout():
    log = session.post("https://api.blooket.com/api/users/logout", data="{}")
    print(log)

def TDsave(round, hp, tokens):
    data = {"id":"61da3d8c265066676c30538a","corrects":{"7":1,"17":1,"18":1},"incorrects":{},"dmg":0,"round": round,"health": hp, "tokens": tokens, "towers":[]}
    data = json.dumps(data)
    saved = session.put("https://api.blooket.com/api/defenses/save", data=data)










#add tokens
def addTokens():
    global username
    addData = {'name': username, 'addedTokens': 500, "addedXp": 500}

    addData = json.dumps(addData)

    addResponse = session.put('https://api.blooket.com/api/users/add-rewards', data=addData)

    
    try:
        print(addResponse.text)
    except:
        print("Unicode Error. You must be using IDLE, no action is needed.")






#buy blooks
def buy(box):
    global username
    buyData = {"name":username,"box":box}
    buyData = json.dumps(buyData)

    response = session.get('https://api.blooket.com/api/users/tokens')
    print(response.text)
    response = int(''.join(filter(str.isdigit, response.text)))
    text = {'tokens' : response} 
    while text['tokens'] > 24:
        time.sleep(.5)
        response = session.put('https://api.blooket.com/api/users/unlockblook', data=buyData)
        text = json.loads(response.text)
        if text['isNewBlook'] == True:
            newblooks.append(text['unlockedBlook'])
            print('New Blook!')
    
        print(response.text)
    print(newblooks)
    sell(box=box)

#sell duplicate blooks
def sell(box):
    global username
    print('Selling Dupe Blooks...')
    blooks = session.get('https://api.blooket.com/api/users/blooks')
    blooks = blooks.text
    blooks = json.loads(blooks)
    print(blooks)
    
    for key, value in blooks.items():
        if int(value) > 1:
            time.sleep(.5)
            sellData = {'name': username, 'blook': key, 'numSold': int(value) - 1}
            sellData = json.dumps(sellData)
            sold = session.put('https://api.blooket.com/api/users/sellblook', data=sellData)
            print(key)



    response = session.get('https://api.blooket.com/api/users/tokens')
    text = {'tokens': int(response.text[1:-2])} 


    if text['tokens'] < 25:
        print('Worked')
    else:
        buy(box=box)
    





#un-hashtag the below function if you wish to add a tower defense save with any number of tokens.
#TDsave(round=1, hp=100, tokens=0)
newblooks = []


#put your credentials here
for i in range(0, len(email)):
    login(email=email[i], password=password[i])
    addTokens()
    try:
        print(box[i])
    except:
        box.append("")
    if box[i] != "":
        buy(box[i])
    logout()
