import { Constants } from "./constants";

const { Configuration, OpenAIApi } = require("openai");

import { readFileSync, readdirSync, mkdirSync, writeFileSync, existsSync } from 'fs';
const path = require('path');

// get your API key here https://platform.openai.com/account/api-keys
const configuration = new Configuration({
  apiKey: Constants.OPENAI_API_KEY,
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
  const prompt_system_1: string = readFileSync(path.join(__dirname, 'prompts/system_1.txt'), 'utf8');
  const prompt_system_2: string = readFileSync(path.join(__dirname, 'prompts/system_2.txt'), 'utf8');
  const prompt_user_3: string = readFileSync(path.join(__dirname, 'prompts/user_3.txt'), 'utf8');

  // read files from npc folder 
  const dir = path.join(__dirname, '_input/npc/');
  const files = readdirSync(dir);
  // end
  //console.log(files);

  // loop through the files
  for (const npc_file_name of files) {
    if (npc_file_name.endsWith('.js')) {
      console.log(npc_file_name);

      const script: string = readFileSync(path.join(__dirname, '_input/npc/' + npc_file_name), 'utf8');

      // https://javascript.plainenglish.io/getting-started-with-openai-api-in-javascript-d1bc365069f0
      // https://platform.openai.com/docs/libraries/node-js-library

      // https://platform.openai.com/docs/guides/chat/introduction
      // see CreateChatCompletionRequest in api.d.ts
      try {
        const response = await openai.createChatCompletion({

          messages: [ // The chat log. This is an array of objects, each of which contains a role and a content field. The role field can be either user or system. The content field is the text of the message.
            {
              "role": "system",
              "content": (prompt_system_1 + prompt_system_2),
            },
            {
              "role": "user",
              "content": prompt_user_3.replace('{ENTER_SCRIPT_TO_CONVERT_HERE}', script)
            },
          ],
          "temperature": 0, // Controls randomness: Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive.
          "max_tokens": 600, // The maximum number of tokens to generate. By default, this is 150.
          "top_p": 0.1, // An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.
          "frequency_penalty": 0, // How much to penalize new tokens based on their existing frequency in the text so far. (Higher means the model will avoid repeating the same line over and over).
          "presence_penalty": 0, // How much to penalize new tokens based on whether they appear in the text so far. (Higher means the model will avoid repeating the same line over and over).
          "model": Constants.OPENAI_CHATGPT_MODEL, // The model to use. One of ada, babbage, curie, davinci, or content-filter-alpha-c4.
          "stream": false // Whether to stream back partial progress or not. If set to false, the API will only return a response when the request is complete.
        });

        /*"id": "chatcmpl-6rf34acORrLY3OHS01wEjfUfAPaWC",
        "object": "chat.completion",
        "created": 1678247194,
        "model": "gpt-3.5-turbo-0301",
        "usage": {
            "prompt_tokens": 1625,
            "completion_tokens": 490,
            "total_tokens": 2115
        },
        "choices": [
            {
                "message": {
                    "role": "assistant",
                    "content": "function start() {"
                },
                "finish_reason": "stop",
                "index": 0
            }
        ]*/
        const output_gpt_script = response.data.choices[0].message.content;
        console.log(output_gpt_script);
        // create a file and write its contents
        if (!existsSync(path.join(__dirname, '_output/npc'))) {
          mkdirSync(path.join(__dirname, '_output/npc'));
        }
        // write output_gpt_script to file



        // write the output scripts 
        writeFileSync(path.join(__dirname, '_output/npc/' + npc_file_name), output_gpt_script);
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