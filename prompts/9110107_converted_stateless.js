function start() {
    cm.say("We are the bearers of palankeen~! Let the bearers take you anywhere, even to Sakura's Ninja Castle~!");
    
    if (cm.getMapId() == 800040000) {
        if (cm.askYesNo("Oh what? What is it? Do you want to go visit Mushroom Shrine?") == 1) {
            cm.say("Okay, I got it! Just let us do the work, and you'll get there in the blink of an eye! Oh, and this won't cost you any money.");
            cm.warp(800000000);
        }
    } else {
        if (cm.askYesNo("Oh what? What is it? Do you want to go visit Ninja Castle") == 1) {
            cm.say("Okay, I got it! Just let us do the work, and you'll get there in the blink of an eye! Oh, and this won't cost you any money.");
            cm.warp(800040000);
        }
    }
}

// Generated by {ENTER_GPT_MODEL_HERE}