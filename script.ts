import { Config } from "./config";

const { Configuration, OpenAIApi } = require("openai");

import { readFileSync, readdirSync, mkdirSync, writeFileSync, existsSync } from 'fs';
const path = require('path');

// get your API key here https://platform.openai.com/account/api-keys
const configuration = new Configuration({
  apiKey: Config.OPENAI_API_KEY,
});

// main
const main = async () => {
  // Console log time
  var log = console.log;
  console.log = function (obj, ...placeholders) {
    var dateUTCstr = new Date().toLocaleString();

    var first_parameter = arguments[0];
    var other_parameters = Array.prototype.slice.call(arguments, 1);
    log.apply(console, ["[" + dateUTCstr + "] " + first_parameter].concat(other_parameters));
  }
  // end

  // Setup openAI
  const openai = new OpenAIApi(configuration);

  // read a single file from folder
  const prompt_system_1: string = readFileSync(path.join(__dirname, Config.INPUT_FOLDER_PROMPT, '1_system.txt'), 'utf8');
  const prompt_system_2: string = readFileSync(path.join(__dirname, Config.INPUT_FOLDER_PROMPT, '2_system.txt'), 'utf8');
  const prompt_user_3: string = readFileSync(path.join(__dirname, Config.INPUT_FOLDER_PROMPT, '3_user.txt'), 'utf8');
  const prompt_unconverted_stateless_npc_example: string = readFileSync(path.join(__dirname, Config.INPUT_FOLDER_PROMPT, '9110107.js'), 'utf8');
  const prompt_converted_stateless_npc_example: string = readFileSync(path.join(__dirname, Config.INPUT_FOLDER_PROMPT, '9110107_converted_stateless.js'), 'utf8');
  const prompt_assistant_4: string = readFileSync(path.join(__dirname, Config.INPUT_FOLDER_PROMPT, '4_assistant.txt'), 'utf8');
  const prompt_user_5: string = readFileSync(path.join(__dirname, Config.INPUT_FOLDER_PROMPT, '5_user.txt'), 'utf8');

  /*
  * 1. [System] Prompts GPT what persona it needs to be, or to act as. 
  * 2. [System] Tells GPT the stateless NPC functions available
  * 3. [User] Tells GPT to convert the script to a stateless NPC script.
  * 4. [Assistant] Actually shows it a valid converted example to guide its knowledge further.
  * 5. [User] Give it a real unconvered script, and ask for conversion.
  */

  // read files from npc folder 
  const dir = path.join(__dirname, Config.INPUT_FOLDER, 'npc/');
  const files = readdirSync(dir);
  // end
  //console.log(files);

  // loop through the files
  for (const npc_file_name of files) {
    if (npc_file_name.endsWith('.js')) {
      console.log(npc_file_name);

      const script_original: string = readFileSync(path.join(__dirname, Config.INPUT_FOLDER, 'npc/' + npc_file_name), 'utf8');
      var script: string = script_original;

      // https://javascript.plainenglish.io/getting-started-with-openai-api-in-javascript-d1bc365069f0
      // https://platform.openai.com/docs/libraries/node-js-library

      // https://platform.openai.com/docs/guides/chat/introduction
      // see CreateChatCompletionRequest in api.d.ts
      try {
        for (let i = 0; i < Config.NUM_LITERATIONS_TO_RUN_SCRIPT_THROUGH_MODEL; i++) {

          const response = await openai.createChatCompletion({
            messages: [ // The chat log. This is an array of objects, each of which contains a role and a content field. The role field can be either user or system. The content field is the text of the message.
              {
                "role": "system",
                "content": (prompt_system_1 + prompt_system_2),
              },
              {
                "role": "user",
                "content": prompt_user_3.replace('{ENTER_SCRIPT_TO_CONVERT_HERE}', prompt_unconverted_stateless_npc_example)
              },
              {
                "role": "assistant",
                "content": prompt_assistant_4.replace('{ENTER_SCRIPT_TO_CONVERT_HERE}', prompt_converted_stateless_npc_example),
              },
              {
                "role": "user",
                "content": prompt_user_5.replace('{ENTER_SCRIPT_TO_CONVERT_HERE}', script)
              },
            ],
            "temperature": Config.GPT3_5_CONFIG_TEMPERATURE, // Controls randomness: Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive.
            "max_tokens": Config.GPT3_5_CONFIG_MAXTOKENS, // The maximum number of tokens to generate. By default, this is 150.
            "top_p": Config.GPT3_5_CONFIG_TOPP, // An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.
            "frequency_penalty": Config.GPT3_5_CONFIG_FREQUENCYPENALTY, // How much to penalize new tokens based on their existing frequency in the text so far. (Higher means the model will avoid repeating the same line over and over).
            "presence_penalty": Config.GPT3_5_CONFIG_PRESENCEPENALTY, // How much to penalize new tokens based on whether they appear in the text so far. (Higher means the model will avoid repeating the same line over and over).
            "model": Config.OPENAI_CHATGPT_MODEL, // The model to use. One of ada, babbage, curie, davinci, or content-filter-alpha-c4.
            "stream": false // Whether to stream back partial progress or not. If set to false, the API will only return a response when the request is complete.
          });
          const output_gpt_script = response.data.choices[0].message.content;
          script = output_gpt_script;
        }

        // write to console to peek at the result
        console.log(script);

        // create a file and write its contents
        if (!existsSync(path.join(__dirname, Config.OUTPUT_FOLDER, 'npc'))) {
          mkdirSync(path.join(__dirname, Config.OUTPUT_FOLDER, 'npc'));
        }
        // write the output scripts 
        writeFileSync(path.join(__dirname, Config.OUTPUT_FOLDER, 'npc/' + npc_file_name), script);
      } catch (e) {
        console.log(e.toString());
      }
    }
  }
};

main()
  .then(() => {
    //console.log("Load completed.");
  })
  .catch((e) => {
    console.error(e);
  });