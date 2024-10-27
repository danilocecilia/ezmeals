'use client';

import { Button } from '@components/ui/button';
import { Calendar } from '@components/ui/calendar';
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
import { Separator } from '@components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@lib/utils';
import { Checkbox } from '@radix-ui/react-checkbox';
import { MultiSelect } from '@root/components/ui/multi-select';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { DateRange } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { columns } from './columns';
import { DataTable } from './data-table';

import { mealPlannerSchema } from '@/schemas/mealPlanner';

type Meal = {
  value: string;
  label: string;
};

interface MealPlanner {
  dateFrom: string;
  dateTo: string;
  meals: Array<[string, string]>;
  deliveryDate: string;
}

interface SelectedMeal {
  value: string;
  label: string;
  quantity: number;
  deliveryDate: string;
  dateFrom: string;
  dateTo: string;
}

const MealPlannerForm: React.FC = () => {
  const router = useRouter();
  const [meals, setMeals] = React.useState<Meal[]>([]);
  const [selectedMeals, setSelectedMeals] = React.useState<SelectedMeal[]>([]);
  console.log('🚀 ~ selectedMeals:', selectedMeals);

  const form = useForm<z.infer<typeof mealPlannerSchema>>({
    resolver: zodResolver(mealPlannerSchema),
    defaultValues: {
      dateRange: {
        from: new Date(), // Initialize with today's date or any default date
        to: new Date() // Same here
      },
      quantity: 0,
      selectedMeals: [],
      deliveryDate: undefined
    }
  });
  React.useEffect(() => {
    console.log('Form Errors:', form.formState.errors);
  }, [form.formState.errors]);

  async function onSubmit() {}

  async function Save() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/addPlanner`,
        {
          method: 'POST',
          body: JSON.stringify(selectedMeals)
        }
      );

      const data = await response.json();
      if (!response.ok) {
        form.setError('root', {
          type: 'manual',
          message: 'Server error, please try again later.'
        });
        toast.error('Error', {
          description: 'Failed to add planner, please try again'
        });
        return;
      }
      toast.success('Meal scheduled successfully');
      router.push(`/meal-planner/schedules`);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error', {
        description: 'Failed to add meal planner, please try again'
      });
    }
  }

  React.useEffect(() => {
    async function fetchData() {
      const getAllMeals = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/listMeal`
        );

        const data = await response.json();

        return data;
      };
      const data = await getAllMeals();

      if (data?.meals?.length > 0) {
        const transformedMeals = data.meals.map(
          (meal: { _id: string; name: string }) => {
            return { value: meal._id, label: meal.name };
          }
        );

        setMeals(transformedMeals);
      }
    }
    fetchData();
  }, []);

  const addSelectedRangeMeals = () => {
    if (form.formState.errors && Object.keys(form.formState.errors).length > 0)
      return;

    const {
      selectedMeals,
      deliveryDate,
      quantity,
      dateRange: { from: dateFrom, to: dateTo }
    } = form.getValues();

    const currentSelectedMeal = meals.reduce<SelectedMeal[]>((acc, meal) => {
      const formatDate = (date: Date) => format(date, 'dd/MM/yyyy');

      if (selectedMeals.includes(meal.value)) {
        const currentSelectedMealPlanner = {
          value: meal.value,
          label: meal.label,
          quantity,
          deliveryDate: formatDate(deliveryDate),
          dateFrom: formatDate(dateFrom),
          dateTo: formatDate(dateTo)
        };

        acc.push(currentSelectedMealPlanner);
      }
      return acc;
    }, []);

    setSelectedMeals(currentSelectedMeal);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="dateRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-2 p-1">
                      Schedule From / To <span>*</span>
                    </FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="date"
                            variant={'outline'}
                            className={cn(
                              'w-[300px] justify-start text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className="mr-4" />
                            {field.value?.from ? (
                              field.value.to ? (
                                <>
                                  {format(field.value.from, 'LLL dd, y')} -{' '}
                                  {format(field.value.to, 'LLL dd, y')}
                                </>
                              ) : (
                                format(field.value.from, 'LLL dd, y')
                              )
                            ) : (
                              <span>Pick a date range From / To</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={field?.value?.from}
                            selected={{
                              from: field.value.from!,
                              to: field.value.to
                            }}
                            onSelect={field.onChange}
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="selectedMeals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-2 p-1">Meals *</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={meals}
                        defaultValue={field.value.map((meal) => meal)}
                        onValueChange={(values) => field.onChange(values)}
                        placeholder="Select Meals"
                        variant="inverted"
                        // animation={1}
                        maxCount={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-4 lg:grid-cols-[1fr_minmax(430px,100px)]">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Quantity <span>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        type="number"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deliveryDate"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel className="flex gap-2 p-1">
                        Delivery Date <span>*</span>
                      </FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-[280px] justify-start text-left font-normal',
                                !field && 'text-muted-foreground'
                              )}
                            >
                              <CalendarIcon className="mr-4" />
                              {field.value ? (
                                format(new Date(field.value), 'PPP')
                              ) : (
                                <span>Pick a delivery date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              }
                              onSelect={(date) => {
                                form.setValue(
                                  'deliveryDate',
                                  date || new Date()
                                );
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />

              <Button className="w-20 mt-4" onClick={addSelectedRangeMeals}>
                Add
              </Button>
            </div>
          </div>
        </div>
      </form>
      <div className="flex flex-col max-w-[900px]">
        <h3 className="text-lg py-5 font-semibold">Selected Meals</h3>
        <Separator />

        <DataTable
          columns={columns}
          data={selectedMeals}
          setSelectedMeals={setSelectedMeals}
        />
      </div>
      <div className="flex flex-col max-w-[900px]">
        <Button className="w-72" type="button" onClick={() => Save()}>
          Save
        </Button>
      </div>
    </Form>
  );
};

export default MealPlannerForm;
