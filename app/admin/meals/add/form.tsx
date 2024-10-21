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
  FormMessage,
  FormDescription
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@components/ui/tooltip';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUploadFile } from '@hooks/use-upload-file';
import { cn } from '@lib/utils';
import { MultiSelect } from '@root/components/ui/multi-select';
import { Switch } from '@root/components/ui/switch';
import { UploadedFilesCard } from '@root/components/uploaded-files-card';
import { Check, ChevronsUpDown, InfoIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { mealSchema } from '@/schemas/mealSchema';
import { allergensList } from '@/utils/allergensList';
import { mealCategories } from '@/utils/mealsCategory';

const CustomForm: React.FC = () => {
  const router = useRouter();

  const { progresses, uploadedFiles, isUploading, onUpload } = useUploadFile(
    'imageUploader',
    { defaultUploadedFiles: [] }
  );

  const form = useForm<z.infer<typeof mealSchema>>({
    resolver: zodResolver(mealSchema),
    defaultValues: {
      name: undefined,
      category: '',
      allergens: [],
      portionSize: undefined,
      price: undefined,
      notes: '',
      description: '',
      image: undefined
    }
  });

  async function onSubmit(values: z.infer<typeof mealSchema>) {
    try {
      const response = await fetch('/api/admin/addMeal', {
        method: 'POST',
        body: JSON.stringify({ ...values, image: uploadedFiles })
      });

      const data = await response.json();

      if (!response.ok) {
        form.setError('root', {
          type: 'manual',
          message: 'Server error, please try again later.'
        });

        toast.error('Error', {
          description: 'Failed to add meal, please try again'
        });
        return;
      }

      toast.success('Meal created successfully');
      router.push(`/meals/${data.mealId}`);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error', {
        description: 'Failed to add meal, please try again'
      });
    }
  }

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
                    <FormLabel>
                      Name <span>*</span>
                    </FormLabel>
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

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[200px_minmax(200px,_1fr)]">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-2 p-1">
                      Category
                      <span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <InfoIcon strokeWidth={1.5} size={16} />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                Meal category/type (e.g.,
                                &quot;Vegetarian&quot;, &quot;Vegan&quot;,
                                &quot;Meat&quot;, &quot;Dessert&quot;,
                                &quot;Beverage&quot;).
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </span>
                    </FormLabel>

                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                'flex w-full items-center justify-between'
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
                    <FormLabel className="flex gap-2 p-1">
                      Allergens
                      <span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <InfoIcon strokeWidth={1.5} size={16} />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                Any allergens associated with the meal (e.g.,
                                &quot;Peanuts&quot;, &quot;Dairy&quot;).
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </span>
                    </FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={allergensList}
                        defaultValue={field.value}
                        onValueChange={(values) => {
                          form.setValue('allergens', values);
                          field.onChange(values);
                        }}
                        placeholder="Select allergens"
                        variant="inverted"
                        // animation={1}
                        maxCount={2}
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
                    <FormLabel>Portion Size *</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select portion" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
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
                    <FormLabel>Price *</FormLabel>
                    <FormControl>
                      <Input
                        id="price"
                        type="number"
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
                name="side"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Meal with Add-ons
                      </FormLabel>
                      <FormDescription>
                        This meal can be added as portion to other meals.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
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
                      <FormLabel>Image *</FormLabel>
                      <FormControl>
                        <FileUploader
                          value={field.value}
                          onValueChange={field.onChange}
                          maxFileCount={1}
                          maxSize={4 * 1024 * 1024}
                          progresses={progresses}
                          onUpload={onUpload}
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

            <div className="flex justify-center">
              <Button className="w-72" type="submit">
                Save
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CustomForm;
