import User from '@models/User';

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User().findOne({ name: username });

  if (user) {
    if (user.comparePasswords(password)) {
      const token = user.generateToken();
      return res.json({
        user,
        token,
        status: true
      });
    }
  }
  return res.status(400).json({
    form: 'Неверный логин или пароль'
  });
};


export default {
  login
};
