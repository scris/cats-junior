﻿var atHome = 1; //for testing
var curProblem;
var problems = [];
var users = [];
var curUser;
var logined = false;
var defaultPass = 12345;
var cid = 791634; // contest id
var sid; // session id
var cmdId; // current number for added command(generated for dynamic creating of sortable elements)
var pathPref = 'http://imcs.dvgu.ru/cats/main.pl?';
var resultsUrl = 'http://imcs.dvgu.ru/cats/main.pl?f=rank_table_content;cid=';
var visited = []; // if tab have already been visited -- for proper tabs displaying
var arrow = [];
var contests;
var cmdClassToName = {
	'forward': 'Прямо',
	'left': 'Налево',
	'right': 'Направо',
	'wait': 'Ждать',
	'block': 'Block',
	'if': 'If',
	'ifelse': 'If..Else..',
	'while': 'While',
	'for': 'For'
};
var classes = ['forward', 'left', 'right', 'wait', 'block', 'if', 'ifelse', 'while', 'for'];
var changeDir = {
	'forward':{
		'up': {dx: 0, dy: -1, curDir: 'up'},
		'down': {dx: 0, dy: 1, curDir: 'down'},
		'left':{dx: -1, dy: 0, curDir: 'left'},
		'right': {dx: 1, dy: 0, curDir: 'right'}
	},
	'left':{
		'up': {dx: 0, dy: 0, curDir: 'left'},
		'down': {dx: 0, dy: 0, curDir: 'right'},
		'left':{dx: 0, dy: 0, curDir: 'down'},
		'right': {dx: 0, dy: 0, curDir: 'up'}
	},
	'right':{
		'up': {dx: 0, dy: 0, curDir: 'right'},
		'down': {dx: 0, dy: 0, curDir: 'left'},
		'left':{dx: 0, dy: 0, curDir: 'up'},
		'right': {dx: 0, dy: 0, curDir: 'down'}
	}, 
	'wait':{
		'up': {dx: 0, dy: 0, curDir: 'up'},
		'down': {dx: 0, dy: 0, curDir: 'down'},
		'left':{dx: 0, dy: 0, curDir: 'left'},
		'right': {dx: 0, dy: 0, curDir: 'right'}
	}
	
}
var dirs = {'R': 'right', 'L': 'left', 'U': 'up', 'D': 'down'};
var maxx = 185;
var miny = 0;
var btnsPlay = ['play', 'next', 'prev', 'fast'];
var btns = ['play', 'pause', 'stop', 'prev', 'next', 'fast'];
var buttonIconClasses = ['ui-icon-play', 'ui-icon-pause', 'ui-icon-stop', 'ui-icon-seek-prev', 'ui-icon-seek-next', 'ui-icon-seek-end'];
var c = 0;
var curDebugState;
var worker;
var lastWatchedIndex = [];
var watchList = [];
var codeareas = [];
var finalcode = [], 
	$gbl = [], 
	$loc = [], 
	$expr = [], 
	$scope = [], 
	nextline = [], 
	$scopename = [], 
	$scopestack = [];
	
var problemsData = [
{
	'code': "D", 
	'id': 792984, 
	'input_format': "<div>\n  Входной файл.\n</div>",	
	'title': "Задача-1",
	'statement': "<div>\n<p>\nВаша задача состоит в том, чтобы, затратив не более, чем определенное в условии количество команд, набрать как можно больше очков.</p>\n<p>Столкновение с монстром означает проигрыш.</p> \n<p>За собранную звездочку получаете 20 очков.\n</p>\n</div>",
	'data': 
		{
			'map': [
			["#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
			["#", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
			["#", ".", "#", ".", "#", ".", ".", ".", "#", "#"],
			["#", ".", "#", "#", "#", "#", "#", ".", "#", "#"],
			["#", ".", ".", ".", ".", ".", "#", ".", ".", "*"],
			["#", ".", "#", "#", "#", ".", "#", "#", ".", "#"],
			["#", ".", "#", ".", ".", ".", "#", ".", ".", "#"],
			["R", ".", ".", ".", ".", ".", "#", ".", ".", "#"],
			["#", ".", "#", "#", "#", ".", "#", ".", ".", "#"],
			["#", ".", ".", ".", ".", ".", "#", ".", ".", "#"],
			["#", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
			["#", "#", "#", "#", "#", "#", "#", "#", "#", "#"]],
			'specSymbols': [
				{
					'symbol': "*",
					'count': 1,
					'style': "star",
					'name': "звезда",
					'action': "eat",
					'points': 50,
					'dLife': 0
				}
			],
			'keys': [],
			'locks': [],
			'movingElements':[],
			'commands': ["forward", "left", "right"],
			'startLife': 1,
			'dLife': 0,
			'startPoints': 0
		}
}];
var cmdAdded = false;
var addedCmds = [];
var prevCmd = undefined;
var stoppedLvl = 0;
var MAX_VALUE = 999999999999999;
var receiveStarted = false;
var elseStmt = undefined;
