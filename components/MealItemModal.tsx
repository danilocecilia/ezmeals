// import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@components/ui/dialog';

interface MealItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function MealItemModal({
  isOpen,
  onClose,
  children
}: MealItemModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1056px]">
        <DialogClose className="flex w-10 h-10 justify-center items-center" />
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
