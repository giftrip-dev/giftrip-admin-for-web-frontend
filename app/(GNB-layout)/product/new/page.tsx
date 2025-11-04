import ShoppingForm from "../[id]/_components/shopping-form";
import ShoppingCreateHeader from "../_components/shopping-create-header";

const NewShoppingProductPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <ShoppingCreateHeader />
      <div className="px-10 pb-10">
        <ShoppingForm mode="create" prev={"1"} />
      </div>
    </div>
  );
};

export default NewShoppingProductPage;
