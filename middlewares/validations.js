export const signupValidations = (req, res) => {
  const { name, email, password } = req.body;
  if (name.trim().length > 0) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      if (
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{6,16}$/.test(
          password
        )
      ) {
        return;
      }
    }
    res.status(400).json({
      error: "Invalid data",
      message: "The data provided in the request is not valid.",
    });
  }
};

export const loginValidations = (req, res) => {
  const { email, password } = req.body;
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{6,16}$/.test(
        password
      )
    ) {
      return;
    }
    res.status(400).json({
      error: "Invalid data",
      message: "The data provided in the request is not valid.",
    });
  }
};
