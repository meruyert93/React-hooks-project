import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
    const[ userIngredients, setUserIngredients ] = useState([]);

    useEffect( () => {
        fetch('https://react-udemy-course-d762c.firebaseio.com/ingredients.json')
        .then(response => response.json())
        .then(responseData => {
            const loadedIngredients = [];
            for (const key in responseData) {
                loadedIngredients.push({
                    id: key,
                    title: responseData[key].title,
                    amount: responseData[key].amount
                });
            }
            setUserIngredients(loadedIngredients);
        }) 
    }, []);
  
    useEffect(() => {
        console.log('rendering ingredients', userIngredients);
    }, [userIngredients]);

    const filteredIngredientsHandler = filteredIngredients => {
        setUserIngredients(filteredIngredients);

    }

    const addIngredientHandler = ingredient => {
        fetch('https://react-udemy-course-d762c.firebaseio.com/ingredients.json', {
            method: 'POST',
            body: JSON.stringify(ingredient),
            headers: { 'Content-type': 'application/json' }
        }).then(response => {
            return response.json();
        }).then(responseData => {
            setUserIngredients(prevIngredients => [
                ...prevIngredients, 
                { id: responseData.name, ...ingredient}
            ]);
        });
    };

    const removeIngredientHandler = ingredientId => {
        setUserIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient.id !== ingredientId ));
    }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler}/>

      <section>
        <Search onLoadedIngredients={filteredIngredientsHandler}/>
            <IngredientList ingredients={userIngredients} onRemoveItem = {removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
