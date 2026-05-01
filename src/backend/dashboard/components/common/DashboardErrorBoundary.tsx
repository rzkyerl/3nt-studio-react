import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class DashboardErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Dashboard Error Boundary caught error:', error);
    console.error('Error Info:', errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
          <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="text-red-600 dark:text-red-400" size={24} />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  Dashboard Error
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  An error occurred while loading the dashboard page.
                </p>
                
                {this.state.error && (
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
                    <p className="text-xs font-mono text-red-600 dark:text-red-400 mb-2">
                      {this.state.error.message}
                    </p>
                    {this.state.error.stack && (
                      <details className="text-xs font-mono text-gray-600 dark:text-gray-400">
                        <summary className="cursor-pointer hover:text-gray-800 dark:hover:text-gray-200">
                          Stack trace
                        </summary>
                        <pre className="mt-2 overflow-auto max-h-40 text-[10px]">
                          {this.state.error.stack}
                        </pre>
                      </details>
                    )}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Reload Page
                  </button>
                  <button
                    onClick={() => window.location.href = '/admin'}
                    className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg text-sm font-medium transition-colors"
                  >
                    Go to Dashboard Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default DashboardErrorBoundary;
