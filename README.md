## Creating MapleStory (odin based source) NPC Script AI using GPT4 
This is a small technical demonstration showcasing the capabilities of GPT in relation to legacy MapleStory (odin-based source) scripts.

- State based NPC script to stateless NPC script - These scripts are state-based and can often be laborious to write, and even more tedious to convert to a stateless alternative today (thousands upon thousands of them).
- NPC story-writer + script-writer. 


See it live here: [https://chat.openai.com/g/g-P3LABcaro-maplestory-npc-scripter](https://chat.openai.com/g/g-P3LABcaro-maplestory-npc-scripter)


-  08/03/2023 -- With the release of ``gpt-3.5-turbo`` model today that makes it even better, I shall present you with the following that I have for a while.
- 29/03/2023 -- updated for GPT4
- 18/02/2024 -- An example has been included live. [Link](https://chat.openai.com/g/g-P3LABcaro-maplestory-npc-scripter)


![Gif output](https://user-images.githubusercontent.com/4586194/223651643-5af0f58d-ea23-48e2-b7d0-6afa428e91ed.gif)

------------------------

### More examples:
##### Converting from state-based NPC script to stateless:
![image](https://github.com/lastbattle/gpt_stateless_npc_converter/assets/4586194/f035e054-aa4b-4750-9a44-0267ff723acc)

##### Creating a series of NPC scripts revolving around a single theme: 
![image](https://github.com/lastbattle/gpt_stateless_npc_converter/assets/4586194/5526390d-2fa1-441e-88e5-190193b037dc)


##### Creating complex Tic-Tac-Toe NPC script:

![image](https://github.com/lastbattle/gpt_stateless_npc_converter/assets/4586194/88e1dd93-28ca-48a5-8393-48c0b424253c)


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
2. You should see the refractored files under ``_output\npc\``



## FYI
#### Limitations
- You have to adjust the prompts according to your own MapleStory sources, it is not guaranteed to work as you may have different function names for the NPC conversation.
- It may not work 100% of the time. Try to change the "temperature" parameters to 0.2 from 0 for a little added randomless to the output instead of a fixed-deterministic output. 
- ALWAYS test it, before going to production. Every single script.
- Further optimisation is possible down the road when [fine-tuning](https://platform.openai.com/docs/guides/fine-tuning) of a model is supported for GPT3.5/GPT4 and above. To save both cost and for higher accuracy.
- It might not be able to refractor if the script's input size is > 32,768 tokens due to GPT4's current limitation. 
- It may sometimes hallucinate to create functions that lead to nowhere, I'm relatively sure GPT is trained on other MapleStory Odin-based sources out there on GitHub. It might be possible to solve this by showing it more examples of scripts refractored manually by a human vs its unrefractored counterpart when the limitations of 4096 tokens are lifted. Example: 
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
3. [User] Tells GPT to refractor the script to a stateless NPC script.
4. [Assistant] Actually shows it a valid refractored example to guide its knowledge further.
5. [User] Give it a real unconvered script, and ask for conversion.

#### Useful link
 - Chat completions https://platform.openai.com/docs/guides/chat
 - Explore other AI prompts, to adjust its behaviour and personality https://github.com/f/awesome-chatgpt-prompts
 - [GPT Playground](https://platform.openai.com/playground?mode=chat&model=gpt-3.5-turbo-0301) (get the prompts from "/prompts" folder of this repo)
