clone git
commit
push/ pull

npm install -g npm 				// установка_обновление npm
npm install gulp-cli -g 			// если не было установлено
npm install gulp --save-dev			// node_modules
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
------------------------------------------------
НАСТРОЙКА SMARTGRID, ГЕНЕРАЦИЯ СЕТКИ
------------------------------------------------
smart-grid.js должен быть в корне проекта с переопределением основных настроек

------------------------------------------------
smart-grid.js
------------------------------------------------
module.exports = {
    outputStyle: 'scss',
    columns: 12,
    offset: '30px',
    mobileFirst: true,
    container: {
        maxWidth: "950px",
        fields: "30px"
    },
    breakPoints: {
        md: {
            width: "992px"
        },
        sm: {
            width: "720px",
        	fields: "20px"
        },
        xs: {
            width: "576px",
        	fields: "15px",
        },
        xxs: {
        	width: "400px",
            fields: "5px",
            offset: "10px"
        }
    }
};

------------------------------------------------
GULP TASK "GRID"
------------------------------------------------
const config = {
    root: './dist/',
        smartgrid: {
        src: 'smartgrid.js',
        dest: 'scss'
    }
};



gulp.task('grid', function(){
    delete require.cache[require.resolve('./' + config.smartgrid.src)];
    let options = require('./' + config.smartgrid.src);
    smartgrid(config.root + config.smartgrid.dest, options);

    options.offset = '3.15%';
    options.breakPoints.xxs.offset = '1%';
    options.filename = 'smart-grid-per';
    smartgrid(config.root + config.smartgrid.dest, options);
});
