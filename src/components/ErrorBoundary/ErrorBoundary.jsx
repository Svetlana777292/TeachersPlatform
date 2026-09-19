import {Component} from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false, errorMessage: ""};
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, errorMessage: error.toString() };
    }

    componentDidCatch(error, errorInfo) {
        console.log("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <article className="error-boundary-card">
                    <h1>
                        Something went wrong. Please, try again.
                    </h1>
                    <pre className="error-details">{this.state.errorMessage}</pre>
                </article>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;