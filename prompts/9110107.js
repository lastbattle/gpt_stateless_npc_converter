function start() {
    if (cm.getMapId() == 800040000) {
        if (cm.say("We are the bearers of palankeen~! Let the bearers take you anywhere, even to Sakura's Ninja Castle~!") == 1) {
            if (cm.askYesNo("Oh what? What is it? Do you want to go visit Mushroom Shrine?") == 1) {
                if (cm.say("Okay, I got it! Just let us do the work, and you'll get there in the blink of an eye! Oh, and this won't cost you any money. Today's a good day for me, so I'll just let you get on it for free! Now, doesn't that make you feel good or what? Anyway, off we go!") == 1) {
                    cm.warp(800000000);
                }
            }
        }
    } else {
        if (cm.say("We are the bearers of palankeen~! Let the bearers take you anywhere, even to Sakura's Ninja Castle~!") == 1) {
            if (cm.askYesNo("Oh what? What is it? Do you want to go visit Ninja Castle") == 1) {
                if (cm.say("Okay, I got it! Just let us do the work, and you'll get there in the blink of an eye! Oh, and this won't cost you any money. Today's a good day for me, so I'll just let you get on it for free! Now, doesn't that make you feel good or what? Anyway, off we go!") == 1) {
                    cm.warp(800040000);
                }
            }
        }
    }
    cm.dispose();
}

// Generated by gpt-3.5-turbo