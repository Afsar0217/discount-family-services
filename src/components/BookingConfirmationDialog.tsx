import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BookingConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  serviceName: string;
  vendorName: string;
  selectedMember: string;
  isLoading: boolean;
}

export const BookingConfirmationDialog: React.FC<BookingConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  serviceName,
  vendorName,
  selectedMember,
  isLoading
}) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Confirm Booking">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <span className="text-xl font-bold text-center block">Confirm Booking</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className=" p-4 rounded-lg ">
            <p className="text-sm text-yellow-800">
              <span className="font-medium">Please confirm:</span> Are you sure you want to book this service? 
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Booking...
              </>
            ) : (
              'Yes, Book Now'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};