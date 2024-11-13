'use client';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from '@components/ui/command';
import { Input } from '@components/ui/input';
import { Popover, PopoverAnchor, PopoverContent } from '@components/ui/popover';
import { Skeleton } from '@components/ui/skeleton';
import { cn } from '@lib/utils';
import { Command as CommandPrimitive } from 'cmdk';
import { Check } from 'lucide-react';
import { useMemo, useState } from 'react';

type Props = {
  selectedValue: string;
  onSelectedValueChange: (value: string) => void;
  searchValue: string;
  onSearchValueChange: (value: string) => void;
  items: string[];
  isLoading?: boolean;
  emptyMessage?: string;
  placeholder?: string;
};

export function AutoComplete({
  selectedValue,
  onSelectedValueChange,
  searchValue,
  onSearchValueChange,
  items,
  isLoading,
  emptyMessage = 'No items.',
  placeholder = 'Search...'
}: Props) {
  const [open, setOpen] = useState(false);

  const reset = () => {
    onSelectedValueChange('');
    onSearchValueChange('');
  };

  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // if (selectedValue !== searchValue) {
    //   console.log('🚀 ~ onInputBlur ~ searchValue:', searchValue);
    //   console.log('🚀 ~ onInputBlur ~ selectedValue:', selectedValue);
    //   reset();
    // }
  };

  const onSelectItem = (inputValue: string) => {
    debugger;
    if (inputValue === selectedValue) {
      reset();
    } else {
      debugger;
      onSelectedValueChange(inputValue);
      onSearchValueChange(inputValue);
    }
    setOpen(false);
  };

  return (
    <div className="flex items-center">
      <Popover open={open} onOpenChange={setOpen}>
        <Command shouldFilter={false}>
          <PopoverAnchor asChild>
            <CommandPrimitive.Input
              asChild
              value={searchValue}
              onValueChange={(e) => {
                debugger;
                onSearchValueChange(e);
              }}
              onKeyDown={(e) => setOpen(e.key !== 'Escape')}
              onMouseDown={() => setOpen((open) => !!searchValue || !open)}
              onFocus={() => setOpen(true)}
              onBlur={onInputBlur}
            >
              <Input placeholder={placeholder} />
            </CommandPrimitive.Input>
          </PopoverAnchor>
          {!open && <CommandList aria-hidden="true" className="hidden" />}
          <PopoverContent
            asChild
            onOpenAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={(e) => {
              if (
                e.target instanceof Element &&
                e.target.hasAttribute('cmdk-input')
              ) {
                e.preventDefault();
              }
            }}
            className="w-[--radix-popover-trigger-width] p-0"
          >
            <CommandList>
              {isLoading && (
                <CommandPrimitive.Loading>
                  <div className="p-1">
                    <Skeleton className="h-6 w-full" />
                  </div>
                </CommandPrimitive.Loading>
              )}
              {items.length > 0 && !isLoading ? (
                <CommandGroup>
                  {items.map((option) => (
                    <>
                      <Input
                        key={option}
                        value={option}
                        onChange={(e) => {
                          debugger;
                        }}
                      />

                      {/* <CommandItem
                        key={option}
                        value={option}
                        onSelect={(value) => {
                          debugger;
                          onSelectItem(option);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            selectedValue === option
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {option}
                      </CommandItem> */}
                    </>
                  ))}
                </CommandGroup>
              ) : null}
              {!isLoading ? (
                <CommandEmpty>{emptyMessage ?? 'No items.'}</CommandEmpty>
              ) : null}
            </CommandList>
          </PopoverContent>
        </Command>
      </Popover>
    </div>
  );
}
