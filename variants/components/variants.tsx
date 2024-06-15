// components/ProductManager.tsx
import { useState, useEffect } from "react";

type Variant = {
  size: string;
  color: string;
  price: number;
  inventory: number;
};

const sizes = ["XS", "S", "M", "L", "XL"];
const initialColors = ["Red", "Blue", "Green"];

const Variants = () => {
  const [variants, setVariants] = useState<Variant[]>([]);
  const [newColor, setNewColor] = useState<string>("");
  const [colors, setColors] = useState<string[]>(initialColors);

  useEffect(() => {
    const savedVariants = localStorage.getItem("variants");
    if (savedVariants) {
      setVariants(JSON.parse(savedVariants));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("variants", JSON.stringify(variants));
  }, [variants]);

  const addVariant = (size: string, color: string) => {
    setVariants([...variants, { size, color, price: 0, inventory: 0 }]);
  };

  const updateVariant = (
    index: number,
    key: keyof Variant,
    value: string | number
  ) => {
    const newVariants = [...variants];
    newVariants[index][key] = value as never;
    setVariants(newVariants);
  };

  const addColor = () => {
    if (newColor && !colors.includes(newColor)) {
      setColors([...colors, newColor]);
      setNewColor("");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Manager</h1>

      <div className="mb-4">
        <input
          type="text"
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
          placeholder="Add new color"
          className="border p-2 mr-2"
        />
        <button onClick={addColor} className="bg-blue-500 text-white p-2">
          Add Color
        </button>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-4">
        {sizes.map((size) =>
          colors.map((color) => (
            <button
              key={`${size}-${color}`}
              onClick={() => addVariant(size, color)}
              className="border p-2"
            >
              Add {size} {color}
            </button>
          ))
        )}
      </div>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Size</th>
            <th className="border px-4 py-2">Color</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Inventory</th>
          </tr>
        </thead>
        <tbody>
          {variants.map((variant, index) => (
            <tr key={`${variant.size}-${variant.color}`}>
              <td className="border px-4 py-2">{variant.size}</td>
              <td className="border px-4 py-2">{variant.color}</td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={variant.price}
                  onChange={(e) =>
                    updateVariant(index, "price", parseFloat(e.target.value))
                  }
                  className="w-full border p-2"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={variant.inventory}
                  onChange={(e) =>
                    updateVariant(index, "inventory", parseInt(e.target.value))
                  }
                  className="w-full border p-2"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Variants;
