//mine defense
//http://www.scholtek.com/js/minedefense/minedefense-1.032.js



// money clicks
var dig_click_fn = function() {
	MD.dig(100, 100, void 0);
};
// 25 clicks/sec
var dig_interval_id = setInterval(dig_click_fn, 40);
// clearInterval(dig_interval_id);

// mage clicks
var mage_click_fn = function() {
	for(var i=0;i<6;i++) {
		MD.clickMage(i);
	}
};
// click every minute
var mage_interval_id = setInterval(mage_click_fn, 1000 * 60);
// clearInterval(mage_interval_id);

// sandshrew clicks
var sandshrew_click_fn = function() {
	if(MD.HIRELINGS_OWNED[3] < 100) {
		for(var i=0;i<100;i++) {
			MD.hire(3);
		}
	}
};
// click every minute
var sandshrew_interval_id = setInterval(sandshrew_click_fn, 500);
// clearInterval(sandshrew_interval_id);

// quarry clicks
var quarry_click_fn = function() {
	MD.findQuarryReward()
};
// click every minute
var quarry_interval_id = setInterval(quarry_click_fn, 700 * 1);
// clearInterval(quarry_interval_id);

function clickAllGoblins() {
	for(var i=0,iLen=MD.GOBLIN_PRESENT.length;i<iLen;i++) {
		if(MD.GOBLIN_PRESENT[i]) {
			MD.clickGoblin(i);
		}
	}
}
var goblin_click_interval_id = setInterval(clickAllGoblins, 500);
// clearInterval(goblin_click_interval_id);

function clickAllSpiders() {
	for(var i=0,iLen=MD.SPIDER_PRESENT.length;i<iLen;i++) {
		if(MD.SPIDER_PRESENT[i]) {
			MD.clickSpider(i);
		}
	}
}
var spider_click_interval_id = setInterval(clickAllSpiders, 500);
// clearInterval(spider_click_interval_id);

// keep population under a level
var scholar_submit_fn = function() {
	if(MD.POPULATION > 200000) {
		MD.addScholars();
		$('#construct-dialog-10').dialog('close')
	}
};
var scholar_interval_id = setInterval(scholar_submit_fn, 1000 * 5);
// clearInterval(scholar_interval_id);

var feed_novice_dragon = function() {
	if(MD.DRAGONS[MD.CURRENT_DRAGON].id === 5 && MD.POPULATION > 100000) {
		MD.feedDragon("10P");
	}
}
var novice_dragon_id = setInterval(feed_novice_dragon, 1000 * 1);
// clearInterval(novice_dragon_id);

var auto_dragon = function() {
	if(MD.DRAGONS[MD.CURRENT_DRAGON].id <= 5 && MD.EARTH_ESSENCE > 2000) {
		MD.feedDragon("100P");
	}
	if(MD.DRAGONS[MD.CURRENT_DRAGON].id === 6) {
		MD.sacrificeDragon(true);
		// click essence add button to add new essence
		MD.addSpirit(5);
	}
}
var auto_dragon_id = setInterval(auto_dragon, 1000 * 1);
// clearInterval(auto_dragon_id);

var auto_military = function() {
	if(MD.getEnemyStrength()*1.2 < MD.getMilitaryStrength()) {
		MD.launchCampaign(true);
		//Check if we need to drop a bomb
		if(MD.hasUpgrade("Strike Blindly")){
			MD.bombEnemies(true);
		}
	}
}
var auto_military_id = setInterval(auto_military, 400);
// clearInterval(auto_military_id);

var custom_li = document.createElement('div');
custom_li.textContent = 'C';

var shop_li = document.createElement('li');
shop_li.id = 'tabHeader_5';
shop_li.appendChild(custom_li);

var shop_ul = $('div.shop ul');
shop_ul.append(shop_li);

var content_box = $('div.tabscontent');
var custom_box = document.createElement('div');
custom_box.id = 'tabpage_5';
custom_box.className = 'tabpage';
custom_box.style = 'display: none;';
custom_box.textContent = "lol testing things";

content_box.append(custom_box);

MDART.prepareTabs(); // re-click on highlighted tab to fix styling
function make_stat_div(text) {
	var ret = document.createElement('div');
	ret.innerHTML = text;
	return ret;	
};
MD._updateStats = MD.updateStats;
MD.updateStats = function () {
	MD._updateStats();
	
	var custom_box = $('div#tabpage_5');
	custom_box.empty();

    custom_box.append(make_stat_div((MD.CAMPAIGNS_WON > 0) ? "Campaigns Won: " + s(MD.CAMPAIGNS_WON) : ""));
    custom_box.append(make_stat_div((MD.SOLDIERS_LOST > 0) ? "Soldiers Lost: " + s(MD.SOLDIERS_LOST) : ""));

    //Industry
    custom_box.append(make_stat_div((MD.TOTAL_FOOD > 0) ? "Food: " + s(MD.FOOD) : ""));
    custom_box.append(make_stat_div((MD.TOTAL_DIRT > 0) ? "Dirt: " + s(MD.DIRT) : ""));
    custom_box.append(make_stat_div((MD.TOTAL_STONE > 0) ? "Stone: " + s(MD.STONE) : ""));
    custom_box.append(make_stat_div((MD.TOTAL_COAL > 0) ? "Coal: " + s(MD.COAL) : ""));
    custom_box.append(make_stat_div((MD.TOTAL_IRON > 0) ? "Iron: " + s(MD.IRON) : ""));
    custom_box.append(make_stat_div((MD.TOTAL_STEEL > 0) ? "Steel: " + s(MD.STEEL) : ""));
    custom_box.append(make_stat_div((MD.TOTAL_ADAMANTIUM > 0) ? "Adamantium: " + s(MD.ADAMANTIUM) : ""));
    custom_box.append(make_stat_div((MD.TOTAL_FLAX > 0) ? "Flax: " + s(MD.FLAX) : ""));
    custom_box.append(make_stat_div((MD.TOTAL_DRAGONSCALE > 0) ? "Dragonscale: " + s(MD.DRAGONSCALE) : ""));

    //Essence
    custom_box.append(make_stat_div((MD.TOTAL_FIRE_ESSENCE > 0) ? "Fire Essence: " + s(MD.FIRE_ESSENCE) : ""));
    custom_box.append(make_stat_div((MD.TOTAL_WATER_ESSENCE > 0) ? "Water Essence: " + s(MD.WATER_ESSENCE) : ""));
    custom_box.append(make_stat_div((MD.TOTAL_EARTH_ESSENCE > 0) ? "Earth Essence: " + s(MD.EARTH_ESSENCE) : ""));
    custom_box.append(make_stat_div((MD.TOTAL_LIGHTNING_ESSENCE > 0) ? "Lightning Essence: " + s(MD.LIGHTNING_ESSENCE) : ""));
    custom_box.append(make_stat_div((MD.TOTAL_SPIRIT_ESSENCE > 0) ? "Spirit Essence: " + s(MD.SPIRIT_ESSENCE) : ""));
};
