import CustomForm from '../add/Form';

const getMealById = async (id: string) => {
  console.log('🚀 ~ getMealById ~ id:', id);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/getMeal/${id}`
  );
  const data = await response.json();
  return data;
};

const Page = async ({ params }) => {
  const mealData = await getMealById(params.id);
  return <CustomForm meal={mealData} />;
};

export default Page;
