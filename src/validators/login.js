import * as Yup from 'yup';
import axios from 'axios';
import config from '@config'
const LoginSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required()
});

export default (req, res, next) => {
  LoginSchema.validate(req.body)
    .then(() => {
      const secret_key = config.recaptchaLoginSecret;
      const token = req.body.token;
      const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;
      axios.post(url)
        .then(response => {
          if (response.data.success) {
            next()
          } else {

            res.status(422).json({
              'error': 'Capthca Failed'
            })
          }
        })
        .catch(error => res.status(422).json({
            
          })); 
    })
    .catch(error => {
      res.status(422).json({
        [error.path]: error.message
      });
    });
};
