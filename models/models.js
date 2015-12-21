var path = require('path');

var Sequelize = require('sequelize');

// conectar ORM a BBDD SQLite
// var sequelize = new Sequelize( null, null, null, {dialect: "sqlite", storage: "quiz.sqlite"});

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(null, null, null, 
  { dialect: "sqlite", storage: "quiz.sqlite"}      
);

// importar definición de tabla Quiz segun quiz.js; se invoca desde models.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);

// Importar definicion de la tabla Comment
var comment_path = path.join(__dirname,'comment');
var Comment = sequelize.import(comment_path);
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);



// exportamos objeto Quiz (BBDD) para hacerlo disponible al resto de la aplicación
exports.Quiz = Quiz;
// exportamos objeto Comment (BBDD)
exports.Comment = Comment;
// realiza conexión a BBDD
sequelize.sync().then(function(){
	Quiz.count().then(function(count){
		if(count===0){
			Quiz.create({
				pregunta: 'Capital de Italia',
				respuesta: 'Roma'
			});
			Quiz.create({
				pregunta: 'Capital de Portugal',
				respuesta: 'Lisboa'
			}).then(function(){
				console.log('Base de datos inicializada');
			});
		}
	});
});
