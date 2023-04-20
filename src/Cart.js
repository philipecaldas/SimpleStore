export default function Cart({ items, removeFromCart }) {
  return (
    <div className="fixed bottom-0 right-0 p-4 bg-white rounded-t-lg shadow-lg">
      <h2 className="text-lg font-medium mb-2">Cart</h2>
      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className="flex items-center justify-between">
              <p className="text-gray-600 pr-5">
                {item.qty} x {item.name}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-opacity-75"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
