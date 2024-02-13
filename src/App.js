import React, { useState, useEffect } from "react";
import Data from "./api/data.json";
import "./App.css";

function App() {
  const initialData = Data;
  const [mainList, setMainList] = useState(initialData);
  const [fruitList, setFruitList] = useState([]);
  const [vegetableList, setVegetableList] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState([]);

  useEffect(() => {
    if (selectedItems.length > 0) {
      for (let i = selectedItems.length - 1; i >= 0; i--) {
        const timeout = setTimeout(
          () => {
            moveItemsToMainList(selectedItems[i]);

            if (selectedItems[i].type === "Fruit") {
              setFruitList((prevFruitList) =>
                prevFruitList.filter((fruit) => fruit !== selectedItems[i])
              );
            } else if (selectedItems[i].type === "Vegetable") {
              setVegetableList((prevVegetableList) =>
                prevVegetableList.filter(
                  (vegetable) => vegetable !== selectedItems[i]
                )
              );
            }
  
            setSelectedItems((prev) =>
              prev.slice(0, i).concat(prev.slice(i + 1))
            );
          },
          total.length - 1 === selectedItems.length - 1 ? 5000 : 1000
        );

        return () => clearTimeout(timeout);
      }
    } else {
      setTotal([])
    }
  }, [selectedItems]);

  const moveItemsToMainList = (items) => {
    setMainList((prev) => [...prev, items]);
  };

  const handleButtonClick = (item) => {
    if (item) {
      setTotal((prev) => [...prev, item]);
      setSelectedItems((prev) => [...prev, item]);
    }

    if (item.type === "Fruit") {
      setFruitList((prevFruitList) => [...prevFruitList, item]);
    } else if (item.type === "Vegetable") {
      setVegetableList((prevVegetableList) => [...prevVegetableList, item]);
    }
    setMainList((prevMainList) =>
      prevMainList.filter((mainItem) => mainItem !== item)
    );
  };

  const removeFromColumn = (itemName) => {
    if (itemName.type === "Fruit") {
      const updatedFruitList = fruitList.filter(
        (item) => item.name !== itemName.name
      );
      setFruitList(updatedFruitList);
      setMainList((prevFruit) => [...prevFruit, itemName]);
    } else if (itemName.type === "Vegetable") {
      const updatedVegetableList = vegetableList.filter(
        (item) => item.name !== itemName.name
      );
      setVegetableList(updatedVegetableList);
      setMainList((prevVegan) => [...prevVegan, itemName]);
    }

    const selectList = selectedItems.filter(
      (main) => main.name !== itemName.name
    );
    setSelectedItems(selectList);
  };

  return (
    <section id="container">
      <div className="first">
        <div className="list">
          {mainList.map((item, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(item)}
              className="data"
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="header">Fruit</div>
        <div className="content">
          {fruitList.map((item, index) => (
            <button
              key={index}
              className="btn"
              onClick={() => removeFromColumn(item)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="header">Vegetable</div>
        <div className="content">
          {vegetableList.map((item, index) => (
            <button
              key={index}
              className="btn"
              onClick={() => removeFromColumn(item)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default App;
