import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess, loginFailure } from "../store/auth-slice";
import { type AppDispatch, type RootState } from "../store";
import ThemeSwitcher from "../components/ThemeSwitcher/ThemeSwitcher";
import FormField from "../components/UI/FormField";
import BasicButton from "../components/UI/BasicButton";
import classes from "./LoginPage.module.css";

const LoginPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error: authError } = useSelector(
    (state: RootState) => state.auth
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const HARDCODED_USERNAME = "admin";
  const HARDCODED_PASSWORD = "Admin123$";

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/products");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (authError) {
      setPasswordError(authError);
      setUsernameError(null);
    }
  }, [authError]);

  const validateForm = (): boolean => {
    let isValid = true;
    setUsernameError(null);
    setPasswordError(null);

    if (!username.trim()) {
      setUsernameError("Username is required.");
      isValid = false;
    }
    if (!password) {
      if (isValid) {
        setPasswordError("Password is required.");
      }
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (authError) {
      dispatch(loginFailure(null));
    }

    if (!validateForm()) {
      return;
    }

    if (username === HARDCODED_USERNAME && password === HARDCODED_PASSWORD) {
      dispatch(loginSuccess({ username }));
    } else {
      dispatch(loginFailure("Invalid username or password."));
    }
  };

  return (
    <div className={classes.loginPageWrapper}>
      <div className={classes.themeSwitcherLogin}>
        <ThemeSwitcher />
      </div>
      <div className={classes.loginContainer}>
        <form onSubmit={handleSubmit} className={classes.loginForm} noValidate>
          <h2 className={classes.formTitle}>Login</h2>

          <FormField
            type="text"
            id="username"
            label="Username:"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (usernameError) setUsernameError(null);
              if (authError) dispatch(loginFailure(null));
            }}
            autoComplete="username"
            required
            error={usernameError}
          />

          <FormField
            type="password"
            id="password"
            label="Password:"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError && !authError) setPasswordError(null);
              if (authError) dispatch(loginFailure(null));
            }}
            autoComplete="current-password"
            required
            error={passwordError || authError}
          />

          <BasicButton type="submit" className={classes.submitButtonFullWidth}>
            Log In
          </BasicButton>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
