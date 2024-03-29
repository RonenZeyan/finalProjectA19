const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const missionSchema = new Schema({
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  employeeName: { 
    type: String,
    required: true
  },
  missionDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true
  },
  missionDescription: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['waiting','in proccess','completed'], // הגבלת הערכים לסטטוס המשימה
  }
}, { timestamps: true }); // הוספת תאריכי יצירה ועדכון אוטומטיים

const MissionModel = mongoose.model('Mission', missionSchema);

module.exports = MissionModel;
