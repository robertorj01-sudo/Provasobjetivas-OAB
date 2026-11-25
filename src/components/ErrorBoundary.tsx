import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  declare props: Readonly<ErrorBoundaryProps>;
  state: ErrorBoundaryState = { hasError: false, message: '' };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error?.message || 'Erro inesperado ao carregar os dados da plataforma.',
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error('JurisTantum ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      let friendlyDetail =
        'Ocorreu uma falha temporária de comunicação ou permissão com o banco de dados.';
      if (this.state.message.includes('Quota exceeded')) {
        friendlyDetail =
          'A cota gratuita diária de leituras do Firestore foi atingida. Ela será redefinida automaticamente amanhã.';
      }

      return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Algo interrompeu sua sessão
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">{friendlyDetail}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-amber-400" />
              <span>Recarregar Plataforma</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
