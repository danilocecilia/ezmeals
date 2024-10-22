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
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@lib/utils';
import { MultiSelect } from '@root/components/ui/multi-select';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { DateRange } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { mealPlannerSchema } from '@/schemas/mealPlanner';

type Meal = {
  _id: string;
  name: string;
};

interface MealPlanner {
  dateFrom: string;
  dateTo: string;
  meals: Meal[];
  deliveryDate: string;
}

const MealFormPlanner: React.FC = () => {
  const [meals, setMeals] = React.useState<Meal[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const router = useRouter();

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined
  });

  const form = useForm<z.infer<typeof mealPlannerSchema>>({
    resolver: zodResolver(mealPlannerSchema),
    defaultValues: {
      dateFrom: '',
      dateTo: '',
      selectedMeals: [],
      deliveryDate: ''
    }
  });

  async function onSubmit(values: z.infer<typeof mealPlannerSchema>) {
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
            return { _id: meal._id, name: meal.name };
          }
        );

        setMeals(transformedMeals);
      }

      setLoading(false);
    }
    fetchData();
  }, []);

  const addSelectedRangeMeals = () => {
    const { dateFrom, dateTo, selectedMeals, deliveryDate } = form.getValues();

    const range = {
      dateFrom,
      dateTo,
      selectedMeals,
      deliveryDate
    };

    console.log('range', range);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center justify-center">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="quantity"
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
                            {date?.from ? (
                              date.to ? (
                                <>
                                  {format(date.from, 'LLL dd, y')} -{' '}
                                  {format(date.to, 'LLL dd, y')}
                                </>
                              ) : (
                                format(date.from, 'LLL dd, y')
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
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={(date) => {
                              setDate(date);
                              form.setValue('dateFrom', date?.from);
                              form.setValue('dateTo', date?.to);
                            }}
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
                        options={meals.map((meal) => ({
                          label: meal.name,
                          value: meal._id
                        }))}
                        defaultValue={field.value}
                        onValueChange={(values) => {
                          form.setValue('selectedMeals', values);
                          field.onChange(values);

                          // debugger;
                          // const selectedMeals = values.map((id) =>
                          //   meals.find((meal) => meal._id === id)
                          // );
                          // form.setValue(
                          //   'meals',
                          //   selectedMeals.filter(
                          //     (meal): meal is Meal => meal !== undefined
                          //   )
                          // );
                          // field.onChange(values);
                        }}
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
                                !date && 'text-muted-foreground'
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
                              onSelect={(date: Date) =>
                                form.setValue('deliveryDate', date)
                              }
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

export default MealFormPlanner;
