// exports.auth = {
//   guards: [
//     {
//       osama: {
//         driver: 'session',
//         provider: 'admins'
//       }
//     }
//   ]
// }

const Admin = require("../models/Admin");

exports.authObject = {
  defaults : {
    guard : "admin"
  } , 
  guards : {
    // osama : {
    //   driver : "",
    //   provider : "",

    // },
    admin : {
      driver : "session",
      provider : "admins"
    }
  },
  providers : {
    admins : {
      model : Admin ,
      driver : "Sequelize"
    }
  }
}