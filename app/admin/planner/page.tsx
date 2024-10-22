import { Separator } from '@components/ui/separator';

import MealFormPlanner from './form';

const MealPlannerPage = () => {
  return (
    <div className="py- max-w-[700px] container hidden h-full flex-1 flex-col space-y-6 p-8 md:flex ">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Schedule Meals</h2>
          <p className="text-muted-foreground">
            This form you can schedule meals for a range of dates
          </p>
        </div>
      </div>
      <Separator />
      <MealFormPlanner />
    </div>
  );
};

export default MealPlannerPage;
