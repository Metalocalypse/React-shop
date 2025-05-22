import classes from "./FormField.module.css";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string | null;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  error,
  className,
  ...restOfProps
}) => {
  const inputClasses = [
    classes.input,
    error ? classes.inputError : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes.formGroup}>
      <label htmlFor={id} className={classes.label}>
        {label}
      </label>
      <input
        id={id}
        className={inputClasses}
        {...restOfProps}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />

      {error && (
        <p id={`${id}-error`} className={classes.errorMessage}>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
