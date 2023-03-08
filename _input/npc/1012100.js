/* Athena Pierce
	Bowman Job Advancement
	Victoria Road : Bowman Instructional School (100000201)

	Custom Quest 100000, 100002
*/

var status = -1;
var job;

var secondJobAdvancementLetterItem = 4031010; 

function action(mode, type, selection) {
    if (mode == 0 && status == 2) {
	cm.sendOk("Make up your mind and visit me again.");
	cm.dispose();
	return;
    }
    if (mode == 1)
	status++;
    else
	status--;
    
    if (status == 0) {
	if (cm.getJob() == 0) {
	    if (cm.getPlayerStat("LVL") >= 10 && cm.getJob() == 0) {
		cm.sendNext("So you decided to become a #rBowman#k?");
	    } else {
		cm.sendOk("Train a bit more and I can show you the way of the #rBowman#k.")
		cm.dispose();
	    }
	} else {
	    if (cm.getPlayerStat("LVL") >= 30 && cm.getJob() == 300) {
		if (cm.getQuestStatus(100006) >= 1) {
		    if (cm.getQuestStatus(100006) == 2) {
			status = 20;
			cm.sendNext("I see you have done well. I will allow you to take the next step on your long road.");
		    } else {
			if (!cm.haveItem(secondJobAdvancementLetterItem)) {
			    cm.gainItem(secondJobAdvancementLetterItem, 1);
			}
			cm.sendOk("Go and see the #rJob Instructor#k.")
			cm.dispose();
		    }
		} else {
		    status = 10;
		    cm.sendNext("The progress you have made is astonishing.");
		}
	    } else if (cm.getQuestStatus(100100) == 1) {
		if (cm.getQuestStatus(100101) == 0) {
		    cm.forceStartQuest(100101); // Marking for accepting 
		} else {
		    if (cm.getQuestStatus(100101) == 2) {
			cm.sendNext("Nice work. You have defeated my clone and brought the #bBlack Charm#k back safely. You have now proven yourself worthy of the 3rd job advancement. Now, you should give this necklace to #bRene#k in Ossyria to proceed with the second part of the text! Good luck!");
			cm.dispose();
			return;
		    } else {
			if (cm.haveItem(4031059)) {
			    cm.sendNext("Nice work. You have defeated my clone and brought the #bBlack Charm#k back safely. You have now proven yourself worthy of the 3rd job advancement. Now, you should give this necklace to #bRene#k in Ossyria to proceed with the second part of the text! Good luck!");
			    cm.gainItem(4031059,-1);
			    cm.gainItem(4031057,1);
			    cm.forceCompleteQuest(100101);
			    cm.dispose();
			    return;
			}
		    }
		}
		status = 29;
		cm.sendNext("I've been waiting for you. #bRene#k of Ossyria told me about you awhile back. So you're interested in making the leap to the 3rd job advancement for Bowmens? To do that, I will have to test your strength to see whether you are worthy of the advancement. There is an opening in the middle of a deep swamp on Victoria Island, where you'll find a secret passage. Once inside, you'll face my clone. Your task is to defeat him and bring back the #bBlack Charm#k back with you.");
	    } else {
		cm.sendOk("You have chosen wisely.");
		cm.dispose();
	    }
	}
    } else if (status == 1) {
	cm.sendNextPrev("It is an important and final choice. You will not be able to turn back.");
    } else if (status == 2) {
	cm.sendYesNo("Do you want to become a #rBowman#k?");
    } else if (status == 3) {
	if (cm.getJob() == 0) {
	    cm.resetStats(4, 25, 4, 4);
	    cm.expandInventory(1, 4);
	    cm.expandInventory(4, 4);
	    cm.changeJob(300); // BOWMAN
	}
	cm.gainItem(1452002, 1);
	cm.gainItem(2060000, 1000);
	cm.sendOk("So be it! Now go, and go with pride.");
	cm.dispose();
    } else if (status == 11) {
	cm.sendNextPrev("You may be ready to take the next step as a #rRanger#k, or #rSniper#k.")
    } else if (status == 12) {
	cm.sendAcceptDecline("But first I must test your skills. Are you ready?");
    } else if (status == 13) {
        if (cm.canHold(secondJobAdvancementLetterItem)) {
            cm.forceStartQuest(100006);
            cm.gainItem(secondJobAdvancementLetterItem, 1);
            cm.sendOk("Go see the #bJob Instructor#k somewhere in the city. He will show you the way.");
        } else {
            cm.sendOk("You need an empty ETC slot to obtain the letter for your job instructor.");
        }
        cm.dispose();
    } else if (status == 21) {
        cm.sendSimple("What do you want to become?#b\r\n#L0#Hunter#l\r\n#L1#Crossbowman#l#k");
    } else if (status == 22) {
	var jobName;
	if (selection == 0) {
	    jobName = "Hunter";
	    job = 310;
	} else if (selection == 1) {
	    jobName = "Crossbowman";
	    job = 320; 
	}
	cm.sendYesNo("Do you want to become a #r" + jobName + "#k?");
    } else if (status == 23) {
	cm.changeJob(job);
	if (cm.haveItem(4031012))
	    cm.gainItem(4031012, -1);
	cm.sendOk("So be it! Now go, my servant.");
	cm.dispose();
    } else if (status == 30) {
	cm.sendNext("Since he is a clone of me, you can expect a tough battle ahead. He uses a number of special attack skills unlike any you have ever seen, and it is your task to successfully take him down. There is a time limit in the secret passage, so it's crucial that you defeat him fast.! Wish you the best og luck, and I hope you bring back the #kBlack Charm#k with you.");
	cm.dispose();
    }
}