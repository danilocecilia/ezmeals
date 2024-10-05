'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@components/ui/command';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import { PhoneInput } from '@components/ui/phone-input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@components/ui/popover';
import { zodResolver } from '@hookform/resolvers/zod';
import { reloadSession } from '@lib/funcs';
import { cn } from '@lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  full_name: z.string(),
  phone_number: z
    .string()
    .refine((val) => val === '' || isValidPhoneNumber(val), {
      message: 'Invalid phone number'
    })
    .optional(),
  address: z.string().optional(),
  postal_code: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  email: z.string().email('This is not a valid email').max(300, {
    message: "Email can't be longer than 300 characters."
  })
});

const provinces = [
  { label: 'Alberta', value: 'AB' },
  { label: 'British Columbia', value: 'BC' },
  { label: 'Manitoba', value: 'MB' },
  { label: 'New Brunswick', value: 'NB' },
  { label: 'Newfoundland and Labrador', value: 'NL' },
  { label: 'Northwest Territories', value: 'NT' },
  { label: 'Nova Scotia', value: 'NS' },
  { label: 'Nunavut', value: 'NU' },
  { label: 'Ontario', value: 'ON' },
  { label: 'Prince Edward Island', value: 'PE' },
  { label: 'Quebec', value: 'QC' },
  { label: 'Saskatchewan', value: 'SK' },
  { label: 'Yukon', value: 'YT' }
] as const;

interface UserProps {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postal_code: string;
  province: string;
}

const ProfileForm = ({ user }: { user: UserProps }) => {
  if (!user) {
    redirect('/login');
  }

  const { data: session, update } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: user?.name,
      email: user?.email,
      phone_number: user?.phone,
      address: user?.address,
      city: user?.city,
      postal_code: user?.postal_code,
      province: user?.province
    }
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch(`/api/updateProfile`, {
      method: 'POST',
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      toast.error('Error', {
        description: 'Failed to update profile, please try again'
      });
      return;
    }

    const responseData = await response.json();

    if (responseData?.error) {
      toast.error('Error', {
        description: 'Invalid credentials, please try again'
      });
      return;
    }

    await update({
      ...session,
      user: {
        ...values,
        name: values.full_name,
        phone: values.phone_number
      }
    });

    reloadSession();
    router.refresh();

    toast.success('Profile updated successfully');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[400px] gap-6">
            <div className="grid grid-cols-2 gap-8 space-between max-w-[300px] justify-self-center mb-10">
              <Avatar className="h-28 w-28 justify-self-center">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt={`@${user?.name}`}
                />

                <AvatarFallback>
                  {user?.name?.slice(0, 2).toUpperCase() ||
                    user?.email?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col justify-center">
                <div className="text-xl font-semibold">{user?.name}</div>
                <div>
                  {user?.city && user.province
                    ? `${user.city}, ${user.province}`
                    : ''}
                </div>
              </div>
            </div>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          id="full_name"
                          placeholder="Full Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel className="text-left">Phone Number</FormLabel>
                      <FormControl className="w-full">
                        <PhoneInput
                          defaultCountry="CA"
                          placeholder="Enter a phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={true}
                          id="email"
                          placeholder="johndoe@whatever.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input id="address" placeholder="Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input id="city" placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="postal_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input
                          id="postal_code"
                          placeholder="Postal Code"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Province</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                'w-[170px] sm:w-[200px] md:w-[200px] justify-between',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value
                                ? provinces.find(
                                    (province) => province.value === field.value
                                  )?.label
                                : 'Select Province'}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search language..." />
                            <CommandList>
                              <CommandEmpty>No language found.</CommandEmpty>
                              <CommandGroup>
                                {provinces.map((province) => (
                                  <CommandItem
                                    value={province.label}
                                    key={province.value}
                                    onSelect={() => {
                                      form.setValue('province', province.value);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        province.value === field.value
                                          ? 'opacity-100'
                                          : 'opacity-0'
                                      )}
                                    />
                                    {province.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
