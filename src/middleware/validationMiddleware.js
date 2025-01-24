export const validationMiddleware = schema => (req, res, next) => {
  const {error} = schema.validate(req.body)
  if(error) {
    return res.status(400).json({
      message: 'Дані не коректні',
      error: error.details[0].message
    })
  }
next()
}