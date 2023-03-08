/* Author: Xterminator
	NPC Name: 		Trainer Frod
	Map(s): 		Victoria Road : Pet-Walking Road (100000202)
	Description: 		Pet Trainer
*/
var status = -1;

function action(mode, type, selection) {
    if (status >= 0 && mode == 0) {
	cm.dispose();
	return;
    }
    if (mode == 1)
	status++;
    else
	status--;
    if (status == 0) {
	if (cm.haveItem(4031035)) {
	    cm.sendNext("Eh, that's my brother's letter! Probably scolding me for thinking I'm not working and stuff...Eh? Ahhh...you followed my brother's advice and trained your pet and got up here, huh? Nice!! Since you worked hard to get here, I'll boost your intimacy level with your pet.");
	} else {
	    cm.sendOk("My brother told me to take care of the pet obstacle course, but ... since I'm so far away from him, I can't help but wanting to goof around ...hehe, since I don't see him in sight, might as well just chill for a few minutes.");
	    cm.dispose();
	}
    } else if (status == 1) {
	if (cm.getNumberOfSummonedPet() == 0) {
	    cm.sendNextPrev("Hmmm ... did you really get here with your pet? These obstacles are for pets. What are you here for without it?? Get outta here!");
	} else {
	    cm.gainItem(4031035, -1);
	    cm.gainCloseness(2,0);
	    cm.sendNextPrev("What do you think? Don't you think you have gotten much closer with your pet? If you have time, train your pet again on this obstacle course...of course, with my brother's permission.");
	}
	cm.dispose();
    }
}