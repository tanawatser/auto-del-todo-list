import React, { useState, useEffect } from "react";
import Data from "./api/data.json";
import "./App.css";

function App() {
  const initialData = Data;
  const [mainList, setMainList] = useState(initialData);
  const [fruitList, setFruitList] = useState([]);
  const [vegetableList, setVegetableList] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (selectedItems.length > 0) {
      for (let i = selectedItems.length - 1; i >= 0; i--) {
        const timeout = setTimeout(() => {
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
        }, (selectedItems.length - i) * 5000);
        return () => clearTimeout(timeout);
      }
    }
  }, [selectedItems]);

  const moveItemsToMainList = (items) => {
    setMainList((prev) => [...prev, items]);
  };

  const handleButtonClick = (item) => {
    if (item) {
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

      <div className="box">
        <div className="content">
          {mainList.map((item) => (
            <button
              key={item.name}
              onClick={() => handleButtonClick(item)}
              className="list"
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="box">
          <div className="content">
            <h2 className="topic">Fruit</h2>
            {fruitList.map((item, index) => (
              <button
                key={index}
                className="list"
                onClick={() => removeFromColumn(item)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <div className="box">
          <div className="content">
            <h2 className="topic">Vegetable</h2>
            {vegetableList.map((item, index) => (
              <button
                key={index}
                className="list"
                onClick={() => removeFromColumn(item)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    
  );
}

export default App;
