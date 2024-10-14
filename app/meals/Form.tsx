'use client';
import { FileUploader } from '@components/file-uploader';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@components/ui/select';
import { Textarea } from '@components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUploadFile } from '@hooks/use-upload-file';
import { cn } from '@lib/utils';
import { MultiSelect } from '@root/components/ui/multi-select';
import { UploadedFilesCard } from '@root/components/uploaded-files-card';
import { Check, ChevronsUpDown } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { mealSchema } from '@/schemas/mealSchema';
import { mealCategories } from '@/utils/mealsCategory';

const CustomForm: React.FC = () => {
  async function onSubmit(values: z.infer<typeof mealSchema>) {
    const response = await fetch(`/api/updateProfile`, {
      method: 'POST',
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      // toast.error('Error', {
      //   description: 'Failed to update profile, please try again'
      // });
      return;
    }

    const responseData = await response.json();

    if (responseData?.error) {
      // toast.error('Error', {
      //   description: 'Invalid credentials, please try again'
      // });
      return;
    }

    // await update({
    //   ...session,
    //   user: {
    //     ...values,
    //     name: values.full_name,
    //     phone: values.phone_number
    //   }
    // });

    // reloadSession();
    // router.refresh();

    // toast.success('Profile updated successfully');
  }
  const { onUpload, progresses, uploadedFiles, isUploading } = useUploadFile(
    'imageUploader',
    { defaultUploadedFiles: [] }
  );
  const form = useForm<z.infer<typeof mealSchema>>({
    resolver: zodResolver(mealSchema),
    defaultValues: {}
  });

  const [selectedAllergen, setSelectedAllergen] = useState<string[]>([]);

  const allergensList = [
    { value: 'milk', label: 'Milk (Diary)' },
    { value: 'eggs', label: 'Eggs' },
    { value: 'peanuts', label: 'Peanuts' },
    { value: 'tree-nuts', label: 'Tree Nuts' },
    { value: 'fish', label: 'Fish' },
    { value: 'shellfish', label: 'Shellfish' },
    { value: 'soy', label: 'Soy' },
    { value: 'wheat', label: 'Wheat' },
    { value: 'gluten', label: 'Gluten' },
    { value: 'sesame', label: 'Sesame' },
    { value: 'sulphites', label: 'Sulphites' },
    { value: 'lupin', label: 'Lupin' },
    { value: 'celery', label: 'Celery' },
    { value: 'moluscs', label: 'Moluscs' },
    { value: 'glucose', label: 'Glucose' }
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center justify-center py-12">
          <div className="grid gap-6">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meal Name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="Grilled Chicken Salad"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                'flex w-full p-1 items-center justify-around'
                              )}
                            >
                              {field.value
                                ? mealCategories.find(
                                    (category) => category.value === field.value
                                  )?.label
                                : 'Select Category'}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search meal category..." />
                            <CommandList>
                              <CommandEmpty>No category found.</CommandEmpty>
                              <CommandGroup>
                                {mealCategories.map((category) => (
                                  <CommandItem
                                    value={category.label}
                                    key={category.value}
                                    onSelect={() => {
                                      form.setValue('category', category.value);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        category.value === field.value
                                          ? 'opacity-100'
                                          : 'opacity-0'
                                      )}
                                    />
                                    {category.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="allergens"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Allergens</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={allergensList}
                        onValueChange={setSelectedAllergen}
                        defaultValue={selectedAllergen}
                        placeholder="Select allergens"
                        variant="inverted"
                        // animation={2}
                        maxCount={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="portionSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portion Size</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select portion" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {/* <SelectLabel>Portion Size</SelectLabel> */}
                            <SelectItem value="S">Small - 300g</SelectItem>
                            <SelectItem value="M">Medium - 500g</SelectItem>
                            <SelectItem value="L">Large - 800g</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        id="price"
                        type="text"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        placeholder="0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid">
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Instructions/Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        id="notes"
                        placeholder="Any special notes or instructions related to the meal (e.g., 'Spicy level', 'No nuts')."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel className="text-left">Description</FormLabel>
                    <FormControl className="w-full">
                      <Textarea
                        id="description"
                        placeholder="A brief description of the meal, including ingredients or any special notes."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <div className="space-y-6">
                    <FormItem className="w-full">
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <FileUploader
                          value={field.value}
                          onValueChange={field.onChange}
                          maxFileCount={1}
                          maxSize={4 * 1024 * 1024}
                          progresses={progresses}
                          // pass the onUpload function here for direct upload
                          // onUpload={uploadFiles}
                          disabled={isUploading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    {uploadedFiles.length > 0 ? (
                      <UploadedFilesCard uploadedFiles={uploadedFiles} />
                    ) : null}
                  </div>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              Save
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );

  return null;
};

export default CustomForm;
