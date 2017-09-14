var express = require('express')
var bodyParser = require('body-parser')
var app = express()

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/employees')
var Employee = mongoose.model('Employee', mongoose.Schema({
    name:       String,
    dept:       String,
    area:       String,
    contact:    String
}))

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/client'))

app.get('/api/employees', function(req, res) {
    console.log('-------------------------')    
    console.log('   begin GET req')
    Employee.find(function(err, employees) {
        if (err){
            res.send(err)
            console.log('   GET failed')
            console.log('-------------------------')
        }else {
            res.json(employees)
            console.log('   GET completed')
            console.log('-------------------------')
        }
    })
    console.log('   end GET req')
})

app.get('/api/employees/:id', function(req, res) {
    var id = req.params.id
    console.log('-------------------------')
    console.log('   begin get info of id:', id)
    Employee.findOne({_id: id},function(err, employee) {
        if (err){
            res.send(err)
            console.log('   GET failed')
            console.log('-------------------------')
        }else {
            res.json(employee)
            console.log('   GET completed')
            console.log('-------------------------')
        }
    })
    console.log('   end GET req')
})

app.post('/api/employees', function(req, res) {
    console.log('-------------------------')
    console.log('   begin CREATE new employee')
    Employee.create(req.body, function(err, employees) {
        if (err) {
            res.send(err)
            console.log('   CREATE failed')
            console.log('-------------------------')
        } else{
            res.json(employees)
            console.log('   CREATE completed')
            console.log('-------------------------')
        }
    })
    console.log('   end POST req')
})

app.delete('/api/employees/:id', function(req, res){
    var id = req.params.id    
    console.log('-------------------------')
    console.log('   begin DELETE employee has id:', id)
	Employee.findOneAndRemove({_id: id}, function(err, employee){
		if(err) {
            res.send(err);
            console.log('   DELETE failed')
            console.log('-------------------------')
        }else {
            res.json(employee);
            console.log('   DELETE completed')
            console.log('-------------------------')
        }
	});
});
app.put('/api/employees/:id', function(req, res){
    var id = req.params.id
	var query = {
		name:req.body.name,
		dept:req.body.dept,
		area:req.body.area,
		contact:req.body.contact
    };
    console.log('-------------------------')
    console.log('   begin UPDATE employee has id:', id, 'with value')
    console.log(query)
	Employee.findOneAndUpdate({_id: id}, query, function(err, employee){
		if(err) {
			res.send(err);
        console.log('   UPDATE failed')
        console.log('-------------------------')
    }else {
        res.json(employee);
        console.log('   UPDATE completed')
        console.log('-------------------------')
    }
	});
});

app.listen(3000, function(){
	console.log('server is running on port 3000');
});