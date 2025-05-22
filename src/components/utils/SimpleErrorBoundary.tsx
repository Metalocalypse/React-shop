import{ Component, type ErrorInfo, type ReactNode } from 'react';
import classes from './SimpleErrorBoundary.module.css';

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
}
interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class SimpleErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): Pick<State, 'hasError' | 'error'> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleResetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className={classes.errorBoundaryContainer}>
          <h2 className={classes.errorTitle}>{this.props.fallbackMessage || 'Something went wrong.'}</h2>
          {this.state.error && <p className={classes.errorMessageText}><strong>Error:</strong> {this.state.error.toString()}</p>}
          {this.state.errorInfo && (
            <details className={classes.errorDetails}>
              <summary>Error Details</summary>
              {this.state.errorInfo.componentStack}
            </details>
          )}
          <button onClick={this.handleResetError} className={classes.resetButton}>
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
export default SimpleErrorBoundary;