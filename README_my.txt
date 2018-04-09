clone git
commit
push/ pull

npm install -g npm 				// установка_обновление npm
npm install gulp-cli -g 			// если не было установлено
npm install gulp --save-dev				// node_modules
npm init 					// инициализация package.json
npm install 					// установка всех зависимых модулей из package.json
npm install smart-grid -save-dev 		// SMART-GRID

GULP WATCH
GULP BUILD 														// cm gulpfile







------------------------------------------------
ОДИН РАЗ НА КОМПЕ
------------------------------------------------

ДЛЯ МАКА И ЛИНУКСА при -g пишем sudo (sudo npm i gulp-cli -g)

1. npm ls -g --depth=0 
	
	( empty )
	
2. npm i gulp-cli -g

3. npm ls -g --depth=0 
	
	( gulp-cli )
	
------------------------------------------------
ДЛЯ ПРОЕКТА
------------------------------------------------

1. Сделать структуру проекта
	
	name
		src
			index.html
			....
			
2. Положить в папку name package.json и gulpfile.js

3. npm i