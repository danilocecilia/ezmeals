import { Separator } from '@components/ui/separator';

import { DataTable } from './data-table';

const ListMealPlannerPage = () => {
  return (
    <div className="w-full container hidden h-full flex-1 flex-col space-y-6 p-8 md:flex ">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Meals Planner</h2>
          <p className="text-muted-foreground">
            Here you can view and manage all your scheduled meals.
          </p>
        </div>
      </div>
      <Separator />
      <DataTable />
    </div>
  );
};

export default ListMealPlannerPage;
