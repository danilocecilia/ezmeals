import CustomForm from '../edit/form';

interface PageProps {
  params: {
    id: string;
  };
}

const Page = async ({ params }: PageProps) => {
  return (
    <div className="container px-4">
      <CustomForm id={params.id} />
    </div>
  );
};

export default Page;
