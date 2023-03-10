## GPT MapleStory NPC Script converter
This is a small technical demonstration showcasing the capabilities of GPT in relation to legacy MapleStory (odin-based source) scripts.
These scripts are state-based and can often be laborious to write, and even more tedious to convert to a stateless alternative today (thousands upon thousands of them).

They can be automated for less than a few dollars today without the need of a third world slave. 

With the release of ``gpt-3.5-turbo`` model today 08/03/2023 that makes it even better, I shall present you with the following that I have for a while.


![Gif output](https://user-images.githubusercontent.com/4586194/223651643-5af0f58d-ea23-48e2-b7d0-6afa428e91ed.gif)


#### Before:
![image](https://user-images.githubusercontent.com/4586194/223625239-1c86e732-3179-4345-9105-268d5b578cdb.png)


#### After: 
![image](https://user-images.githubusercontent.com/4586194/223625214-758a2d74-71f5-42c9-af40-fbb47209cc3d.png)


Have fun~! AI-ing~!! 

---------------------------------------

## Instructions to run 
#### Installation & setup
1. Install NodeJS 18: https://nodejs.org/en/ 
2. ```npm install``` 
3. Create an account, and get an [OpenAI API](https://platform.openai.com/account/api-keys) key 
4. Go to ``config.ts`` and enter the API key under ``OPENAI_API_KEY``
5. Place your NPC scripts under ``_input\npc\`` folder

#### Start
1. ```npx ts-node script.ts```
2. You should see the converted files under ``_output\npc\``



## FYI
#### Limitations
- You have to adjust the prompts according to your own MapleStory sources, it is not guaranteed to work as you may have different function names for the NPC conversation.
- It may not work 100% of the time. Try to change the "temperature" parameters to 0.2 from 0 for a little added randomless to the output instead of a fixed-deterministic output. 
- ALWAYS test it, before going to production. Every single script.
- It might not be able to convert if the script's input size is > 4096 due to GPT's current limitation. 
- It may sometimes hallucinate to create functions that lead to nowhere, I'm relatively sure GPT3.5 is trained on other MapleStory Odin-based sources out there on GitHub. It might be possible to solve this by showing it more examples of scripts converted manually by a human vs its unconverted counterpart when the limitations of 4096 tokens are lifted. Example: 
```
function onUserEnter() {
    cm.say("I'm the head of this hair salon. If you have a #b#t5150053##k or a #b#t5151036##k allow me to take care of your hairdo. Please choose the one you want.");
}

function onUserExit() {
    cm.say("Thank you for visiting our salon. Come back soon!");
}

function onDisconnected() {
    cm.say("Oh no! You have disconnected. Please log back in and visit us again!");
}
```

#### How its done:
1. [System] Prompts GPT what persona it needs to be, or to act as. 
2. [System] Tells GPT the stateless NPC functions available
3. [User] Tells GPT to convert the script to a stateless NPC script.
4. [Assistant] Actually shows it a valid converted example to guide its knowledge further.
5. [User] Give it a real unconvered script, and ask for conversion.

#### Useful link
 - Chat completions https://platform.openai.com/docs/guides/chat
 - Explore other AI prompts, to adjust its behaviour and personality https://github.com/f/awesome-chatgpt-prompts
 - [GPT Playground](https://platform.openai.com/playground?mode=chat&model=gpt-3.5-turbo-0301) (get the prompts from "/prompts" folder of this repo)
