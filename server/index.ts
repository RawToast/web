import next from 'next'
import express from 'express'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.get('/contest/:contest_id/rankings/:user_id', (req, res) => {
    const page = '/ranking-details'
    const queryParams = {
      contest_id: req.params.contest_id,
      user_id: req.params.user_id,
    }
    app.render(req, res, page, queryParams)
  })

  server.get('/settings/:tab', (req, res) => {
    const page = '/settings'
    const queryParams = {
      tab: req.params.tab,
    }
    app.render(req, res, page, queryParams)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err: Error) => {
    if (err) {
      throw err
    }

    console.log('> Ready and accepting requests')
  })
})
