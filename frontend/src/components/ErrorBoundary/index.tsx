import {
    ErrorBoundaryProps,
    ErrorBoundaryState
} from "types/error-boundary.types";
import React, { Component, ErrorInfo } from "react";
import ErrorFallback from "./ErrorFallback";

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    public state: ErrorBoundaryState = {
        hasError: false
    };

    public static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        const { hasError } = this.state;
        const { children } = this.props;

        if (hasError) {
            return <ErrorFallback />;
        }

        return children;
    }
}

export default ErrorBoundary;
