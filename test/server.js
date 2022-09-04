const express = require('express')

const { test } = require('./controller')

const app = express()

app.get('/', test)

app.listen(8001, () => console.log('server running'))
