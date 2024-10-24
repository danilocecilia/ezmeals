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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@components/ui/table';
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
  const [meals, setMeals] = React.useState<Meal[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [selectedMeals, setSelectedMeals] = React.useState<SelectedMeal[]>([]);
  console.log('🚀 ~ selectedMeals:', selectedMeals);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined
  });

  const form = useForm<z.infer<typeof mealPlannerSchema>>({
    resolver: zodResolver(mealPlannerSchema),
    defaultValues: {
      dateFrom: undefined,
      dateTo: undefined,
      quantity: 0,
      selectedMeals: [],
      deliveryDate: undefined
    }
  });

  const testData = [
    {
      value: '6712c09352b276ef20860458',
      label: 'Chicken Grilled Salad',
      quantity: 12,
      deliveryDate: '25/10/2024',
      dateFrom: '23/10/2024',
      dateTo: '24/10/2024'
    },
    {
      value: '6712c70252b276ef20860459',
      label: 'Bobo de Camarao',
      quantity: 12,
      deliveryDate: '25/10/2024',
      dateFrom: '23/10/2024',
      dateTo: '24/10/2024'
    },
    {
      value: '67147561a1475231c9ee8ea2',
      label: 'Lasagna',
      quantity: 12,
      deliveryDate: '25/10/2024',
      dateFrom: '23/10/2024',
      dateTo: '24/10/2024'
    }
  ];

  async function onSubmit(values: z.infer<typeof mealPlannerSchema>) {
    console.log('errors', form.formState.errors);
    // try {
    //   const response = await fetch('/api/admin/addMeal', {
    //     method: 'POST',
    //     body: JSON.stringify({ ...values, image: uploadedFiles })
    //   });
    //   const data = await response.json();
    //   if (!response.ok) {
    //     form.setError('root', {
    //       type: 'manual',
    //       message: 'Server error, please try again later.'
    //     });
    //     toast.error('Error', {
    //       description: 'Failed to add meal, please try again'
    //     });
    //     return;
    //   }
    //   toast.success('Meal created successfully');
    //   router.push(`/meals/${data.mealId}`);
    // } catch (error) {
    //   console.error('Error:', error);
    //   toast.error('Error', {
    //     description: 'Failed to add meal, please try again'
    //   });
    // }
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

      setLoading(false);
    }
    fetchData();
  }, []);

  const addSelectedRangeMeals = () => {
    const { dateFrom, dateTo, selectedMeals, deliveryDate, quantity } =
      form.getValues();

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

  function TableSelecedMeals() {
    return (
      <Table className="bg-white">
        <TableHeader>
          <TableRow>
            <TableHead>Date From</TableHead>
            <TableHead>Date To</TableHead>
            <TableHead>Meal Name</TableHead>
            <TableHead className="text-right">Delivery Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testData.map((meal) => (
            <TableRow key={meal.value}>
              <TableCell className="font-medium">{meal.dateFrom}</TableCell>
              <TableCell>{meal.dateTo}</TableCell>
              <TableCell>{meal.label}</TableCell>
              <TableCell className="text-right w-[150px]">
                {meal.deliveryDate}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

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
                              form.setValue(
                                'dateFrom',
                                date?.from || new Date()
                              );
                              form.setValue('dateTo', date?.to || new Date());
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

            <div className="flex justify-center">
              <Button className="w-72" type="submit">
                Save
              </Button>
            </div>
          </div>
        </div>
      </form>
      <div>
        <h3 className="text-lg py-5 font-semibold">Selected Meals</h3>
        <Separator />
        {/* <TableSelecedMeals /> */}
        {/* <Separator /> */}
        <div className="w-full flex">
          <DataTable columns={columns} data={testData} />
        </div>
      </div>
    </Form>
  );
};

export default MealPlannerForm;
