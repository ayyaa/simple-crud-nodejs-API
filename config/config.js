var config = {
  database: {
      host:      'localhost',     // database host
      user:       'root',         // your database username
      password: '',         // your database password
      port:       3306,         // default MySQL port
      db:       'wonderlabs'         // your database name
  },
  server: {
      host: 'http://localhost:3300'
  },
  api_captcha: {
      API: '6LdplE0UAAAAAOt8IVwk1Yz2EpgIkPxiF3GFJgjL'
  },
  salt: {
      value: '7fa73b47df808d36c5fe328546ddef8b9011b2c6'
  },
  message: {
      from: 'NOREPLY@student.com',
      subject_reset: 'RESET PASSWORD TOKEN at Student Infomation',
      subject_new_password: 'YOUR PASSWORD HAS BEEN CHANGED'
  }
}

module.exports = config