import { codeStatus } from "../utils/code-status";

const ErrorMiddleware = (err, req, res, next) => {
  console.log(err)

  const code = err.status || 404;
  res.status(code)

  res.send({
    error: 'Not Found',
    code,
    status: codeStatus(code)
  })
}

export default ErrorMiddleware