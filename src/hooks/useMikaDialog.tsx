/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react';
import { MikaDialog } from '@/components/shared/MikaDialog';

interface MikaDialogContextType {
  showMikaAlert: (title: string, message: string, confirmLabel?: string) => Promise<void>;
  showMikaConfirm: (
    title: string,
    message: string,
    confirmLabel?: string,
    cancelLabel?: string
  ) => Promise<boolean>;
}

const MikaDialogContext = createContext<MikaDialogContextType | undefined>(undefined);

interface DialogState {
  isOpen: boolean;
  type: 'alert' | 'confirm';
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  resolvePromise: ((value: boolean) => void) | null;
}

const initialDialogState: DialogState = {
  isOpen: false,
  type: 'alert',
  title: '',
  message: '',
  resolvePromise: null,
};

export function MikaDialogProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DialogState>(initialDialogState);

  const showMikaAlert = (title: string, message: string, confirmLabel?: string): Promise<void> => {
    return new Promise<void>((resolve) => {
      setState({
        isOpen: true,
        type: 'alert',
        title,
        message,
        confirmLabel,
        resolvePromise: () => {
          resolve();
        },
      });
    });
  };

  const showMikaConfirm = (
    title: string,
    message: string,
    confirmLabel?: string,
    cancelLabel?: string
  ): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      setState({
        isOpen: true,
        type: 'confirm',
        title,
        message,
        confirmLabel,
        cancelLabel,
        resolvePromise: (value) => {
          resolve(value);
        },
      });
    });
  };

  const handleConfirm = () => {
    if (state.resolvePromise) {
      state.resolvePromise(true);
    }
    setState(initialDialogState);
  };

  const handleCancel = () => {
    if (state.resolvePromise) {
      state.resolvePromise(false);
    }
    setState(initialDialogState);
  };

  return (
    <MikaDialogContext.Provider value={{ showMikaAlert, showMikaConfirm }}>
      {children}
      <MikaDialog
        isOpen={state.isOpen}
        type={state.type}
        title={state.title}
        message={state.message}
        confirmLabel={state.confirmLabel}
        cancelLabel={state.cancelLabel}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </MikaDialogContext.Provider>
  );
}

export function useMikaDialog() {
  const context = useContext(MikaDialogContext);
  if (!context) {
    throw new Error('useMikaDialog must be used within a MikaDialogProvider');
  }
  return context;
}
