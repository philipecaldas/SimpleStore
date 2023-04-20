export default function Product({ product, addToCart }) {
  const { name, price, image, qty } = product;

  return (
    <div className="flex flex-col items-center justify-center w-64 p-6 bg-white rounded-lg shadow-lg">
      <img src={image} alt={name} className="w-32 h-32 object-cover mb-4" />
      <h2 className="text-lg font-medium">{name}</h2>
      <p className="text-gray-600">${price.toFixed(2)}</p>
      <h5 className="text-sm font-medium">Qty: {qty}</h5>
      <button
        onClick={() => addToCart(product)}
        disabled={qty < 1}
        className="mt-4 px-4 py-2 text-sm font-medium text-white disabled:bg-indigo-200 bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Add to Cart
      </button>
    </div>
  );
}
