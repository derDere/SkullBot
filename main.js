const Discord = require('discord.js');
const shlex = require('shlex');
const commander = require('commander');
const masters = require('./masters.json');

const program = new commander.Command();
program.version('0.0.1');

// init .env config
require('dotenv').config();

// Initialize Discord Bot
var bot = new Discord.Client();

bot.on('ready', function (evt) {
    console.log('Connected');
});

const commands = {
    'test': new commander.Command()
        .option('-t, --test <ttt>', 'sdjfhgbskldjhgb'),
    
    'ping': new commander.Command()
};

bot.on('message', function (msg) {

    console.log(msg);
    
    if(msg.channel.recipient.id in masters) {
    
	var argArr = shlex.split(msg.content);
	msg.command = argArr.splice(0,1)[0].toLowerCase();

	if(msg.command in commands) {
	    
	    argArr.unshift('','');
	    msg.args = commands[msg.command].parse(argArr);
	    
	    switch(msg.command) {
	    case 'ping':
		msg.reply('Pong!');
		break;
		// Just add any case commands if you want to..
	    }

	}
	else {
	    
	}
	
    }
    else {
	if (msg.content === '?')
	    msg.reply(msg.channel.recipient.id);
    }
});

bot.login(process.env.BOT_TOKEN);
