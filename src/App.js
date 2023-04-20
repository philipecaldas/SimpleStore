import { useState, useEffect } from "react";
import Cart from "./Cart";
import Product from "./Product";
import { inventory } from "./products";

function App() {
  const [products, setProducts] = useState();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`https://api.github.com/users/philipecaldas`)
        .then((res) => console.log(res.json()))
        .then((res) => setProducts(inventory))
        .catch((e) => console.error(e));
    };
    const timer = setTimeout(() => {
      fetchData();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const addToCart = (product) => {
    if (products.find((i) => i.id === product.id).qty > 0) {
      if (cartItems.filter((i) => i.id === product.id).length > 0) {
        setCartItems(
          cartItems.map((item) => {
            if (item.id === product.id) {
              return {
                ...item,
                qty: item.qty + 1,
              };
            } else {
              return item;
            }
          })
        );
      } else {
        setCartItems([...cartItems, { ...product, qty: 1 }]);
      }
      setProducts(
        products.map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              qty: item.qty - 1,
            };
          } else {
            return item;
          }
        })
      );
    }
  };

  const removeFromCart = (productId) => {
    let nextProducts = cartItems.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          qty: product.qty - 1,
        };
      } else {
        return product;
      }
    });
    nextProducts = nextProducts.filter((p) => p.qty > 0);
    setCartItems(nextProducts);

    setProducts(
      products.map((item) => {
        if (item.id === productId) {
          return {
            ...item,
            qty: item.qty + 1,
          };
        } else {
          return item;
        }
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Store</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((product) => (
            <Product key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </div>
      <Cart items={cartItems} removeFromCart={removeFromCart} />
    </div>
  );
}
export default App;
