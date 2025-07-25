import React from 'react';
import { Button } from './button';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

interface DialogContentProps {
  children: React.ReactNode;
}

interface DialogHeaderProps {
  children: React.ReactNode;
}

interface DialogTitleProps {
  children: React.ReactNode;
}

interface DialogFooterProps {
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50" 
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export const DialogContent: React.FC<DialogContentProps> = ({ children }) => {
  return <div className="p-6">{children}</div>;
};

export const DialogHeader: React.FC<DialogHeaderProps> = ({ children }) => {
  return <div className="mb-4">{children}</div>;
};

export const DialogTitle: React.FC<DialogTitleProps> = ({ children }) => {
  return <h2 className="text-lg font-semibold text-gray-900">{children}</h2>;
};

export const DialogFooter: React.FC<DialogFooterProps> = ({ children }) => {
  return <div className="flex justify-end space-x-2 mt-6">{children}</div>;
};