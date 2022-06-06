const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost:27017/my-students', { useNewUrlParser: true })
  .then(() => console.log('connected to mongodb'))
  .catch((error) => console.log(error))

const studentSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  age: { type: Number },
  phone: { type: Number },
  hobbies: [String],
  //   dob: Date,
  //   entryDate: { type: Date, default: Date.now },
  passed: Boolean,
  subjects: [{ name: String, marks: { type: Number, min: 0, max: 100 } }],
})

const Student = mongoose.model('Student', studentSchema)

const createStudent = async () => {
  const student = new Student({
    firstName: 'Ifrat',
    lastName: 'Hasnat',
    age: 25,
    phone: 123122222222,
    hobbies: ['Travelling', 'Dancing'],
    passed: true,
    subjects: [
      { name: 'Nodejs', marks: 95 },
      { name: 'Rest API', marks: 85 },
    ],
  })

  try {
    const data = await student.save()
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

// createStudent()

const readStudent = async () => {
  const studentData = await Student.find({ age: 25 })
  console.log(studentData)
}

// readStudent()

const updateStundent = async (id) => {
  const updatedStudent = await Student.updateOne(
    { _id: id },
    {
      $set: { passed: false },
    },
  )
  console.log(updatedStudent)
}

// updateStundent('629d9c49e6232272a4db10ce')

const deleteStudent = async (id) => {
  const resp = await Student.deleteOne({ _id: id })
  console.log(resp)
}
// deleteStudent('629d9c49e6232272a4db10ce')
