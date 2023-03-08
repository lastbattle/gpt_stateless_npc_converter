## GPT MapleStory NPC Script converter
This is a small technical demonstration showcasing the capabilities of GPT in relation to legacy MapleStory (odin-based source) scripts.
These scripts are state-based and can often be laborious to write, and even more tedious to convert to a stateless alternative today (thousands upon thousands of them).

They can be automated for less than a few dollars today without the need of a third world slave. 

With the release of ``gpt-3.5-turbo`` model today 08/03/2023 that makes it even better, I shall present you with the following that I have for a while.


[GPT Playground](https://platform.openai.com/playground?mode=chat&model=gpt-3.5-turbo-0301) (get the prompts from "/prompts" folder of this repo)
![image](https://user-images.githubusercontent.com/4586194/223625940-698427c4-a6b3-48a9-9a5b-45a85ee11385.png)



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
3. Create an account, and get a GPT API key at https://platform.openai.com/account/api-keys
4. Go to ``constants.ts`` and enter the API key under ``OPENAI_API_KEY``
5. Place your NPC scripts under ``_input\npc\`` folder

#### Start
1. ```npx ts-node script.ts```
2. You should see the converted files under ``_output\npc\``



## FYI
#### Limitations
- You have to adjust the prompts according to your own MapleStory sources, it is not guaranteed to work as you may have different function names for the NPC conversation.
- It may not work 100% of the time. Try to change the "temperature" parameters to 0.2 from 0 for a little added randomless to the output instead of a fixed-deterministic output. 
- It might not be able to convert if the script's input size is > 4096 due to GPT's current limitation. 

#### How its done:
1. [System] Prompts GPT what persona it needs to be, or to act as. 
2. [System] Tells GPT the stateless NPC functions available
3. [User] Tells GPT to convert the script to a stateless NPC script.
4. [Assistant] Actually shows it a valid converted example to guide its knowledge further.
5. [User] Give it a real unconvered script, and ask for conversion.

#### Useful link
 - Chat completions https://platform.openai.com/docs/guides/chat
 - Explore other AI prompts, to adjust its behaviour and personality https://github.com/f/awesome-chatgpt-prompts

