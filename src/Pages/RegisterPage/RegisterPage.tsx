import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as authMethods from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

interface IFormInput {
  email: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
}

export const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [confirmMessage, setConfirmMessage] = useState("");
  const { error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: "onBlur",
  });

  const password = useRef({});

  password.current = watch("password", "");

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    dispatch(authMethods.register(data))
      .then(() => {
        if (!error) {
          setConfirmMessage("Please check your email for verification");
        }

        reset();
      })
      .catch((e) => {
        throw new Error(e);
      });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="auth">
        <div className="auth__bg">
          <header className="header page__header auth__header">
            <a className="logo" href=".">
              <svg width="153" height="66" viewBox="0 0 153 66" fill="#fff">
                <path
                  d="M31.8049 29.3792H26.9936C26.9057 28.7567 26.7263 28.2038 26.4553 27.7205C26.1843 27.2298 25.8365 26.8124 25.4117 26.4682C24.987 26.124 24.4963 25.8604 23.9398 25.6773C23.3905 25.4942 22.7937 25.4027 22.1492 25.4027C20.9848 25.4027 19.9706 25.6919 19.1064 26.2705C18.2423 26.8417 17.5722 27.6765 17.0962 28.775C16.6202 29.8662 16.3822 31.1917 16.3822 32.7515C16.3822 34.3553 16.6202 35.7028 17.0962 36.7939C17.5795 37.8851 18.2533 38.709 19.1174 39.2655C19.9816 39.8221 20.9812 40.1004 22.1163 40.1004C22.7534 40.1004 23.3429 40.0162 23.8848 39.8477C24.4341 39.6793 24.9211 39.434 25.3458 39.1117C25.7706 38.7822 26.1221 38.3831 26.4004 37.9144C26.686 37.4457 26.8837 36.9111 26.9936 36.3106L31.8049 36.3326C31.6804 37.3652 31.3692 38.3611 30.8712 39.3205C30.3806 40.2725 29.7178 41.1256 28.883 41.8799C28.0554 42.6269 27.0668 43.2201 25.917 43.6595C24.7746 44.0915 23.4821 44.3076 22.0394 44.3076C20.0328 44.3076 18.2386 43.8535 16.6568 42.9455C15.0823 42.0374 13.8374 40.7229 12.922 39.0019C12.0139 37.2809 11.5598 35.1975 11.5598 32.7515C11.5598 30.2982 12.0212 28.2111 12.9439 26.4902C13.8667 24.7692 15.1189 23.4583 16.7008 22.5576C18.2826 21.6495 20.0621 21.1955 22.0394 21.1955C23.3429 21.1955 24.5513 21.3785 25.6644 21.7447C26.7848 22.1109 27.7771 22.6455 28.6413 23.3485C29.5054 24.0442 30.2085 24.8973 30.7504 25.908C31.2996 26.9186 31.6511 28.0756 31.8049 29.3792ZM39.5989 44.3186C38.5224 44.3186 37.5631 44.1318 36.7209 43.7583C35.8787 43.3775 35.2123 42.8173 34.7217 42.0777C34.2383 41.3307 33.9967 40.4006 33.9967 39.2875C33.9967 38.3501 34.1688 37.5629 34.513 36.9258C34.8571 36.2886 35.3258 35.776 35.919 35.3879C36.5122 34.9997 37.1859 34.7068 37.9402 34.5091C38.7018 34.3114 39.5001 34.1722 40.3349 34.0917C41.3162 33.9891 42.1071 33.8939 42.7076 33.8061C43.3082 33.7109 43.7439 33.5717 44.0148 33.3886C44.2858 33.2056 44.4213 32.9346 44.4213 32.5758V32.5098C44.4213 31.8141 44.2016 31.2759 43.7622 30.8951C43.3301 30.5143 42.715 30.3239 41.9167 30.3239C41.0746 30.3239 40.4045 30.5106 39.9065 30.8841C39.4085 31.2503 39.079 31.7116 38.9179 32.2682L34.5898 31.9167C34.8095 30.8914 35.2416 30.0053 35.8861 29.2583C36.5305 28.504 37.3617 27.9255 38.3796 27.5227C39.4049 27.1126 40.5912 26.9076 41.9387 26.9076C42.8761 26.9076 43.7732 27.0174 44.63 27.2371C45.4941 27.4568 46.2594 27.7973 46.9258 28.2587C47.5996 28.7201 48.1305 29.3133 48.5186 30.0383C48.9068 30.7559 49.1008 31.6164 49.1008 32.6197V44H44.663V41.6602H44.5311C44.2602 42.1875 43.8977 42.6525 43.4436 43.0553C42.9896 43.4508 42.444 43.762 41.8069 43.989C41.1698 44.2087 40.4338 44.3186 39.5989 44.3186ZM40.9391 41.089C41.6275 41.089 42.2353 40.9535 42.7626 40.6826C43.2898 40.4043 43.7036 40.0308 44.0039 39.5621C44.3041 39.0934 44.4542 38.5625 44.4542 37.9693V36.1788C44.3078 36.274 44.1064 36.3619 43.8501 36.4424C43.6011 36.5157 43.3191 36.5852 43.0042 36.6511C42.6893 36.7097 42.3744 36.7646 42.0595 36.8159C41.7446 36.8598 41.459 36.9001 41.2027 36.9367C40.6535 37.0173 40.1738 37.1455 39.7637 37.3212C39.3536 37.497 39.035 37.735 38.808 38.0352C38.581 38.3282 38.4675 38.6943 38.4675 39.1337C38.4675 39.7708 38.6982 40.2578 39.1595 40.5947C39.6282 40.9242 40.2214 41.089 40.9391 41.089ZM61.4645 27.1273V30.6424H51.0509V27.1273H61.4645ZM53.4346 44V25.908C53.4346 24.685 53.6726 23.6707 54.1486 22.8652C54.632 22.0596 55.2911 21.4554 56.1259 21.0527C56.9608 20.6499 57.9091 20.4485 58.971 20.4485C59.6887 20.4485 60.3441 20.5034 60.9373 20.6133C61.5378 20.7231 61.9845 20.822 62.2774 20.9098L61.4426 24.425C61.2595 24.3664 61.0325 24.3115 60.7615 24.2602C60.4979 24.209 60.2269 24.1833 59.9486 24.1833C59.2602 24.1833 58.7806 24.3444 58.5096 24.6667C58.2387 24.9816 58.1032 25.4246 58.1032 25.9958V44H53.4346ZM71.0683 44.3295C69.3327 44.3295 67.8388 43.978 66.5865 43.275C65.3415 42.5646 64.3822 41.5614 63.7085 40.2652C63.0347 38.9616 62.6979 37.4201 62.6979 35.6405C62.6979 33.9049 63.0347 32.3817 63.7085 31.0708C64.3822 29.76 65.3306 28.7384 66.5535 28.0061C67.7838 27.2737 69.2265 26.9076 70.8816 26.9076C71.9947 26.9076 73.0309 27.087 73.9903 27.4458C74.9569 27.7973 75.7991 28.3283 76.5168 29.0386C77.2418 29.749 77.8057 30.6424 78.2085 31.7189C78.6112 32.7881 78.8126 34.0404 78.8126 35.4758V36.761H64.5653V33.861H74.4077C74.4077 33.1872 74.2612 32.5904 73.9683 32.0705C73.6754 31.5505 73.2689 31.1441 72.749 30.8511C72.2364 30.5509 71.6395 30.4008 70.9585 30.4008C70.2481 30.4008 69.6183 30.5655 69.0691 30.8951C68.5271 31.2173 68.1024 31.653 67.7948 32.2023C67.4872 32.7442 67.3298 33.3484 67.3225 34.0148V36.772C67.3225 37.6068 67.4763 38.3282 67.7838 38.936C68.0987 39.5438 68.5418 40.0125 69.113 40.342C69.6842 40.6716 70.3616 40.8364 71.1452 40.8364C71.6652 40.8364 72.1412 40.7631 72.5732 40.6167C73.0053 40.4702 73.3751 40.2505 73.6827 39.9576C73.9903 39.6646 74.2246 39.3058 74.3857 38.8811L78.7138 39.1667C78.4941 40.2066 78.0437 41.1146 77.3626 41.8909C76.6889 42.6598 75.8174 43.2604 74.7482 43.6924C73.6864 44.1172 72.4597 44.3295 71.0683 44.3295ZM81.614 44V21.503H86.3705V30.7852H96.0261V21.503H100.772V44H96.0261V34.7068H86.3705V44H81.614ZM115.085 36.8159V27.1273H119.765V44H115.272V40.9352H115.096C114.715 41.9239 114.082 42.7184 113.196 43.3189C112.317 43.9194 111.244 44.2197 109.977 44.2197C108.849 44.2197 107.857 43.9634 107 43.4508C106.143 42.9381 105.473 42.2095 104.99 41.2648C104.514 40.3201 104.272 39.1886 104.265 37.8705V27.1273H108.945V37.0356C108.952 38.0316 109.219 38.8188 109.746 39.3973C110.274 39.9759 110.98 40.2652 111.867 40.2652C112.43 40.2652 112.958 40.137 113.448 39.8807C113.939 39.617 114.334 39.2289 114.635 38.7163C114.942 38.2037 115.092 37.5702 115.085 36.8159ZM123.255 44V21.503H127.935V29.9614H128.078C128.283 29.5073 128.579 29.046 128.967 28.5773C129.363 28.1013 129.876 27.7058 130.505 27.3909C131.142 27.0687 131.933 26.9076 132.878 26.9076C134.108 26.9076 135.243 27.2298 136.283 27.8742C137.323 28.5114 138.154 29.4744 138.777 30.7633C139.399 32.0448 139.711 33.6523 139.711 35.5856C139.711 37.4677 139.407 39.0568 138.799 40.353C138.198 41.6419 137.378 42.6196 136.338 43.286C135.306 43.9451 134.149 44.2746 132.867 44.2746C131.959 44.2746 131.186 44.1245 130.549 43.8242C129.92 43.524 129.403 43.1468 129 42.6928C128.598 42.2314 128.29 41.7664 128.078 41.2977H127.869V44H123.255ZM127.836 35.5636C127.836 36.5669 127.975 37.442 128.253 38.189C128.532 38.936 128.935 39.5182 129.462 39.9356C129.989 40.3457 130.63 40.5508 131.384 40.5508C132.146 40.5508 132.79 40.342 133.317 39.9246C133.845 39.4999 134.244 38.914 134.515 38.167C134.793 37.4128 134.932 36.5449 134.932 35.5636C134.932 34.5896 134.797 33.7328 134.526 32.9932C134.255 32.2535 133.856 31.675 133.328 31.2576C132.801 30.8402 132.153 30.6314 131.384 30.6314C130.623 30.6314 129.978 30.8328 129.451 31.2356C128.931 31.6384 128.532 32.2096 128.253 32.9492C127.975 33.6889 127.836 34.5604 127.836 35.5636Z"
                  fill="white"
                />
              </svg>
            </a>
          </header>
        </div>

        <div className="auth__content">
          <div className="auth__block">
            <h3 className="auth__title">Реєстрація</h3>
            <p className="auth__message">Привіт! Ти вже маєш акаунт?</p>
            <a href="#/login" className="auth__redirect-link">
              <p className="auth__redirect-p">Вхід</p>
            </a>

            {error && <h3>Щось пішло не так, спробуйте ще раз</h3>}

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form__block">
                <TextField
                  label="Прізвище"
                  variant="outlined"
                  size="small"
                  color="success"
                  error={!!errors.lastName}
                  type="text"
                  autoComplete="off"
                  {...register("lastName", {
                    required: true,
                  })}
                  sx={{
                    width: "100%",
                    mb: 1,
                  }}
                />

                {errors.lastName?.type === "required" && (
                  <p className="form__error-message">
                    Будь ласка, введіть прізвище
                  </p>
                )}
              </div>

              <div className="form__block">
                <TextField
                  label="Ім'я"
                  variant="outlined"
                  size="small"
                  type="text"
                  color="success"
                  autoComplete="off"
                  error={!!errors.firstName}
                  {...register("firstName", {
                    required: true,
                  })}
                  sx={{
                    width: "100%",
                    mb: 1,
                  }}
                />

                {errors.firstName?.type === "required" && (
                  <p className="form__error-message">
                    Будь ласка, введіть ім&apos;я
                  </p>
                )}
              </div>

              <div className="form__block">
                <TextField
                  label="Email"
                  variant="outlined"
                  size="small"
                  type="email"
                  color="success"
                  autoComplete="off"
                  error={!!errors.email}
                  {...register("email", {
                    required: true,
                    minLength: 6,
                  })}
                  sx={{
                    width: "100%",
                    mb: 1,
                  }}
                />

                {errors.email?.type === "required" && (
                  <p className="form__error-message">
                    Будь ласка, введіть email
                  </p>
                )}
                {errors.email?.type === "minLength" && (
                  <p className="form__error-message">
                    Email повинен бути не меншим ніж 6 символів
                  </p>
                )}
              </div>

              <div className="form__block">
                <FormControl
                  sx={{ mb: 1, width: "100%" }}
                  variant="outlined"
                  size="small"
                >
                  <InputLabel
                    htmlFor="password"
                    color="success"
                    error={!!errors.password}
                  >
                    Пароль
                  </InputLabel>
                  <OutlinedInput
                    {...register("password", {
                      required: true,
                      minLength: 6,
                    })}
                    autoComplete="off"
                    color="success"
                    error={!!errors.password}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Пароль"
                  />
                </FormControl>

                {errors.password?.type === "required" && (
                  <p className="form__error-message">
                    Будь ласка, введіть пароль
                  </p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="form__error-message">
                    Пароль повинен бути не меншим ніж 6 символів
                  </p>
                )}
              </div>

              <div className="form__block">
                <FormControl
                  sx={{ mb: 1, width: "100%" }}
                  variant="outlined"
                  size="small"
                >
                  <InputLabel
                    htmlFor="repeatPassword"
                    color="success"
                    error={!!errors.repeatPassword}
                  >
                    Повторіть пароль
                  </InputLabel>
                  <OutlinedInput
                    {...register("repeatPassword", {
                      required: true,
                      minLength: 6,
                      validate: (value) =>
                        value === password.current ||
                        "the passwords do not match",
                    })}
                    autoComplete="off"
                    color="success"
                    error={!!errors.repeatPassword}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Повторіть пароль"
                  />
                </FormControl>

                {errors.repeatPassword?.type === "required" && (
                  <p className="form__error-message">
                    Будь ласка, введіть пароль
                  </p>
                )}
                {errors.repeatPassword?.type === "minLength" && (
                  <p className="form__error-message">
                    Пароль повинен бути не меншим ніж 6 символів
                  </p>
                )}
                {errors.repeatPassword && (
                  <p>{errors.repeatPassword.message}</p>
                )}
              </div>

              <input
                type="submit"
                value="Зареєструватись"
                className="form__submit"
              />
            </form>
            {confirmMessage && !error && <p>{confirmMessage}</p>}
          </div>
        </div>
      </div>
    </>
  );
};
