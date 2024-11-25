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
      <DialogContent className="sm:max-w-[1056px] z-50">
        <DialogClose className="flex w-5 h-5 lg:w-10 lg:h-10 justify-center items-center" />
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
