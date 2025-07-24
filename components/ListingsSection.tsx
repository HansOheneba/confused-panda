import ListingCard from "./ListingCard";

type Product = {
  id: string;
  name: string;
  price: string;
  type: string;
  image: string;
  colors: string[];
};

interface ListingsSectionProps {
  products: Product[];
}

const ListingsSection: React.FC<ListingsSectionProps> = ({ products }) => {
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">
          Product In-stock
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ListingCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ListingsSection;
