React
Blooket is a web-app running on React
and it also uses react to store its values for the games, therefore we can debug/reverse engineer it
A very good tool for this is React-Developer-Tools, a Chrome extension a tool that is used for viewing react values, but we can use it to find where Ben stores game data, and edit it.
Now, this can be extremely confusing at times, that's why i recommend learning React itself before attempting to cheat with it.

Firebase
Blooket uses Firebase for backend, therefore we use it to set values, using firebase.setVal, so it is pretty important
unless you want to use a variant of forceUpdate();

API
Blooket's API is quite important, it is used for things like addTokens and autoAnswer
Now there are two different ways to interact with the API,

jQuery
Fetch API
I personally prefer jQuery, but jQuery has downsides, for example It is a new library to learn, and it is hard to stably inject it into blooket, Because blooket doesn't use jQuery and blocks unknown requests
We can really use it without pasting the entire code to the library, That's why for beginners i recommend using JavaScript's vanilla Fetch API
Anitcheat
One thing that has been coming up a lot recently is Ben adding an Anticheat, now currently he added a detection system for editing React values and adding 500 tokens at once, also he overrode alert(), prompt() and confirm() and added a function to detect if the input had the following bits of text: 'basil', 'incompatible', 'gold', 'script is outdated' in it, if it did, it would send a request to Blooket's API to disable your account. A while back ben also added encryption to his API requests, mainly for adding tokens, so I would reccomend trying to decrypt it.

Bypassing?
We can bypass these patches to an extent there are already bypasses for the alert(), prompt() and confirm() patch here and there is a known fix for the tokens problem, just add 250 tokens twice and it won't detect (maby add some delay aswell, or different increments of tokens), but there is no public bypass for the React problem, so how i would go about it is looking through Ben's code and attempting to find how he is patching it and then coding a bypass.

- Ken
