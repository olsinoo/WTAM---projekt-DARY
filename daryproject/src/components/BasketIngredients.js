export function BasketIngredients({ingredientsArray}){
    
    const updatedIngredinets = [];
    
    const UpdateIngredinets = () => {
        ingredientsArray.forEach(ingredients => {
            ingredients.forEach(ingredient =>{
                if (updatedIngredinets.hasOwnProperty(ingredient.name)){
                    updatedIngredinets[ingredient.name].amount += ingredient.amount;
                    updatedIngredinets[ingredient.name].price += ingredient.price;
                
                }
                else{
                    updatedIngredinets[ingredient.name] = ingredient; 
                }
            })
        })
    }

    const ShowIngredients = () => {
        UpdateIngredinets();

        return(
            <div>
                {updatedIngredinets.map((ingredinetName) => (
                    <div>
                        {ingredinetName}
                    </div>
                ))}
            </div>
        );
    }

    // const UpdateIngredinets = () => {
    //     ingredientsArray.forEach(ingredients => {
    //             ingredients.forEach(ingredient =>{
    //                 if (updatedIngredinets.hasOwnProperty(ingredient.name)){
    //                     console.log('includes')
    //                     console.log('amount')
    //                     console.log(updatedIngredinets[ingredient.name].amount)
    //                     updatedIngredinets[ingredient.name].amount += ingredient.amount;
    //                     console.log(ingredient.amount)
    //                     console.log(updatedIngredinets[ingredient.name].amount)     
    //                     // updatedIngredinets[ingredient.name].price += ingredient.price;
                    
    //                 }
    //                 else{
    //                     updatedIngredinets[ingredient.name] = ingredient; 
    //                 }
    //             })
    //         })
    // }
    
    
    
    

    return(
        <div className="basket-ingredients">
            <ShowIngredients />
        </div>
    )
}