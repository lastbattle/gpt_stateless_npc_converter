
export class Config {

    // only `gpt-3.5-turbo` and `gpt-3.5-turbo-0301` 
    public static readonly OPENAI_CHATGPT_MODEL: string = "gpt-3.5-turbo-0301";
     // Controls randomness: Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive.
     public static readonly GPT3_5_CONFIG_TEMPERATURE: number = 0; 
     // The maximum number of tokens to generate. By default, this is 150.
     public static readonly GPT3_5_CONFIG_MAXTOKENS: number = 1000;
     // An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.
     public static readonly GPT3_5_CONFIG_TOPP: number = 1;
     // How much to penalize new tokens based on their existing frequency in the text so far. (Higher means the model will avoid repeating the same line over and over).
     public static readonly GPT3_5_CONFIG_FREQUENCYPENALTY: number = 0;
     // How much to penalize new tokens based on whether they appear in the text so far. (Higher means the model will avoid repeating the same line over and over).
     public static readonly GPT3_5_CONFIG_PRESENCEPENALTY: number = 0;


    // https://platform.openai.com/account/api-keys
    public static readonly OPENAI_API_KEY: string = '<replace with your own api key>';

    public static readonly INPUT_FOLDER_PROMPT: string = "prompts";
    public static readonly INPUT_FOLDER: string = "_input";
    public static readonly OUTPUT_FOLDER: string = "_output";

    // The number of times to run the same script to the model to achieve better results
    public static readonly NUM_LITERATIONS_TO_RUN_SCRIPT_THROUGH_MODEL = 1;
}