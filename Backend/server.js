const express = require('express')
const app = express()
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')
const Op = Sequelize.Op

var cors = require('cors')

app.use(cors())



app.get('/', function (req, res) {
  res.send('Hello world')
})

//conectare la baza de date 
const sequelize = new Sequelize('FeedbackApp', 'root', 'root', {
  dialect: 'mysql'
})

//-------------------------------------------//

//atribute tabela Student
const Student = sequelize.define('students', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: true
  },

  lastName: {
    type: Sequelize.STRING,
    allowNull: true
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [5, 20]
    }
  }
})


//---------------------------------------------//

const Professor = sequelize.define('professors', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [5, 20]
    }
  }
})


//--------------------------------------------//




const Activity = sequelize.define('activities', {
  accessCode: {
    type: Sequelize.STRING,
    allowNull: false
  },
  startDate:{
    type: Sequelize.DATE,
    allowNull:false
  },
  duration: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  //1-neterminat, 0-terminat
  status: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  //descrierea activitatii - maximum 100 caractere
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [0, 100]
    }
  }
})


//-----------------------Feedback--------------------------//
const Feedback = sequelize.define('feedbacks', {
  emoji: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  details: {
    type: Sequelize.STRING,
    allowNull: true
  }


})

//--------------------------------------------------------//

//relatia intre tabele -> Un profesor poate avea
// mai multe activitati
Professor.hasMany(Activity)
Activity.hasMany(Feedback)
Student.hasMany(Feedback) 

app.use(bodyParser.json())

//se creeaza baza de date
app.get('/create', async (req, res, next) => {
  try {
    await sequelize.sync({ force: true })
    res.status(201).json({ message: 'created' })
  } catch (err) {
    next(err)
  }
})

//-------------STUDENTI----------//


//se afiseaza lista cu toti studentii
app.get('/students', async (req, res, next) => {
  try {
    const students = await Student.findAll()
    res.status(200).json(students)
  }
  catch (err) {
    next(err);
  }
})


//se creeaza tabela student in caz nu exista
app.post('/students', async (req, res, next) => {
  try {

    await Student.create(req, body)
    req.status(201).json({ message: 'created' })
  }
  catch (err) {
    next(err)
  }
})


//adaugam un student nou - test in postman
app.post('/students/add', async (req, res, next) => {
  try {


    const { firstName, lastName, email, password } = req.body;
    const errors = []

    if (!email) {
      errors.push("Email missing!")
    }
    else if (await Student.findOne({ where: { email }, raw: true })) {
      errors.push("The email is already in use")
    }
    if (!password) {
      errors.push("The password is empty!")
    }

    if (errors.length === 0) {
      await Student.create({ firstName, lastName, email, password });
      if (firstName && lastName) {
        res.status(201).json({ message: `Student ${firstName} ${lastName} was created!` });
      }
      else {
        res.status(201).json({ message: `The student was created!` });
      }
    }
    else {
      res.status(400).json({ errors });
    }

  }
  catch (err) {
    next(err)
  }
})


app.get('/login',async(req,res,next)=>{
  try {
    const { email, password } = req.body;
    const student= await Student.findOne({ where: { email, password }, raw: true })
    if(student){
      res.status(200).json(student.id)
    }else{
      res.status(404).json({ message:"student not found" });
    }
  } catch (err) {
    next(err)
    
  }
})

//---------PROFESORI------------//

//se afiseaza lista cu toti profesorii
app.get('/professors', async (req, res, next) => {
  try {
    const professors = await Professor.findAll()
    res.status(200).json(professors)
  }
  catch (err) {
    next(err);
  }
})


//se creeaza tabela profesor in caz nu exista
app.post('/professors/add', async (req, res, next) => {
  try {


    const { firstName, lastName, email, password } = req.body;
    const errors = []

    if (!firstName) {
      errors.push("First name missing!")
    }
    if (!lastName) {
      errors.push("Last name missing!")
    }

    if (!email) {
      errors.push("Email missing!")
    }
    else if (await Professor.findOne({ where: { email }, raw: true })) {
      errors.push("The email is already in use")
    }
    if (!password) {
      errors.push("The password is empty!")
    }

    if (errors.length === 0) {
      await Professor.create({ firstName, lastName, email, password });

      res.status(201).json({ message: `Professor ${firstName} ${lastName} was created!` });
    }
    else {
      res.status(400).json({ errors });
    }

  }
  catch (err) {
    next(err)
  }
})


//adaugam un profesor nou - test in postman
app.post('/professors/add', async (req, res, next) => {
  try {
    const professors = await Professor.create(req.body);
    res.status(200).json({
      message: 'created!'
    });

  } catch (err) {
    next(err);
  }
})

app.get('/loginp',async(req,res,next)=>{
  try {
    const { email, password } = req.body;
    const professor= await Professor.findOne({ where: { email, password }, raw: true })
    if(professor){
      res.status(200).json(professor.id)
    }else{
      res.status(404).json({ message:"professor not found" });
    }
  } catch (err) {
    next(err)
    
  }
})

//----------ACTIVITATI--------------//

//afisare toate activitati
app.get('/activities', async (req, res, next) => {
  try {
    const activities = await Activity.findAll()
    res.status(200).json(activities)
  }
  catch (err) {
    next(err)
  }
})




//afisare toate activitati ale unui prof
app.get('/professors/:pid/activities', async (req, res, next) => {
  try {
    const professor = await Professor.findByPk(req.params.pid, {
      include: [Activity]
    })
    if (professor) {
      res.status(200).json(professor.activities)
    } else {
      res.status(404).json({ message: 'not found ' })
    }
  } catch (err) {
    next(err)
  }
})




//adauga activitate pt un anumit profesor
app.post('/professors/:pid/add', async (req, res, next) => {
  try {
    const { startDate, duration, description } = req.body
    const errors = []

    

    if(!startDate){
      errors.push("Fill in the date!")
    }

    if (!description) {
      errors.push("Fill in the description!")
    }
    if (!duration || !duration.match(/^[0-9]*$/)) {
      errors.push("Fill in a valid duration!")
    }
    if (errors.length === 0) {
      const activity = await Activity.create({
        accessCode: Math.random().toString(36).slice(5), startDate ,duration, status: 1, description, professorId: req.params.pid
      })
      res.status(201).send({
        message: 'Activity created!'
      })
    }
    else {
      res.status(400).send({ errors })

    }

  }

  catch (err) {
    next(err)
  }
})

//stergerea unei anumite activitati
app.delete('/professors/:pid/activities/:aid', async (req, res, next) => {
  try {
    const professor = await Professor.findByPk(req.params.pid)
    if (professor) {
      const activities = await professor.getActivities({
        id: req.params.aid
      })
      const activity = activities.shift()
      if (activity) {
        await activity.destroy()
        res.status(202).json({ message: 'accepted' })
      } else {
        res.status(404).json({ message: 'not found ' })
      }
    } else {
      res.status(404).json({ message: 'not found ' })
    }
  } catch (err) {
    next(err)
  }
})

app.get('/activities/:aid/feedback', async (req, res, next) => {
  try {
    const activity = await Activity.findByPk(req.params.aid, {
      include: [Feedback]
    })
    if (activity) {
      res.status(200).json(activity.feedbacks)
    } else {
      res.status(404).json({ message: 'not found ' })
    }
  } catch (err) {
    next(err)
  }
})


//----------------------FEEDBACK------------------------//
//afisare tot feedbackul unei activitati

app.post('/feedbacks/add/:aid', async (req, res, next) => {

  try {
    const { emoji, details, activityId } = req.body

    const errors = []

    if (!emoji) {
      errors.push("Select a reaction!")
    }
    if (errors.length === 0) {
      const feedback = await Feedback.create({
        emoji, details, activityId: req.params.aid
      });

      res.status(201).send({
        message: 'Feedback sent!'
      });
    }
    else {
      res.status(400).send({ errors })

    }
  }
  catch (err) {
    next(err)
  }

})

app.listen(8080)