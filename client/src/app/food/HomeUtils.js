import _ from "lodash";

class HomeInfo {
  static macrosPerProduct(product) {
    const per = (num, amount) => {
      return Math.round((num * amount) / 100);
    };

    const {
      grams,
      product: { calories, proteins, carbs, fats }
    } = product;

    return {
      grams: grams,
      calories: per(grams, calories),
      proteins: per(grams, proteins),
      carbs: per(grams, carbs),
      fats: per(grams, fats)
    };
  }

  static macrosPerMeal(meal) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    let calArr = [],
      proArr = [],
      carbArr = [],
      fatArr = [],
      macrosPerMeal = {};
    var flag;

    if (meal.products !== undefined && !_.isEmpty(meal.products)) {
      meal.products.forEach((product, index) => {
        flag = product.product;

        if (_.isNull(flag)) {
          return;
        }

        let serving = this.macrosPerProduct(product);
        const { calories, proteins, carbs, fats } = serving;

        calArr[index] = 0;
        proArr[index] = 0;
        carbArr[index] = 0;
        fatArr[index] = 0;

        calArr[index] += calories;
        proArr[index] += proteins;
        carbArr[index] += carbs;
        fatArr[index] += fats;
      });

      if (_.isNull(flag)) {
        return;
      }

      macrosPerMeal = {
        label: meal.label,
        calories: calArr.reduce(reducer),
        proteins: proArr.reduce(reducer),
        carbs: carbArr.reduce(reducer),
        fats: fatArr.reduce(reducer)
      };
    }

    return macrosPerMeal;
  }

  static macrosRemaining(meals, goals) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    const mealsArr = _.map(meals);

    let calArr = [],
      proArr = [],
      carbArr = [],
      fatArr = [],
      remainingMacros = {};

    if (!_.isEmpty(mealsArr)) {
      mealsArr.forEach((meal, index) => {
        let macrosPerMeal = this.macrosPerMeal(meal);

        calArr[index] = 0;
        proArr[index] = 0;
        carbArr[index] = 0;
        fatArr[index] = 0;

        if (!_.isEmpty(macrosPerMeal)) {
          calArr[index] += macrosPerMeal.calories;
          proArr[index] += macrosPerMeal.proteins;
          carbArr[index] += macrosPerMeal.carbs;
          fatArr[index] += macrosPerMeal.fats;
        }
      });

      remainingMacros = {
        rCalories: goals.calories - calArr.reduce(reducer),
        rProteins: goals.proteins - proArr.reduce(reducer),
        rCarbs: goals.carbs - carbArr.reduce(reducer),
        rFats: goals.fats - fatArr.reduce(reducer)
      };
    }

    return remainingMacros;
  }

  static per = (num, amount) => {
    return Math.round((num * amount) / 100);
  };

  static macrosPerRecipe(recipe) {
    console.log(recipe);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    let calArr = [],
      proArr = [],
      carbArr = [],
      fatArr = [],
      macrosPerRecipe = {};
    var flag;

    if (recipe.products !== undefined && !_.isEmpty(recipe.products)) {
      recipe.products.forEach((product, index) => {
        flag = product.product;

        if (_.isNull(flag)) {
          return;
        }

        let serving = this.macrosPerProduct(product);
        const { calories, proteins, carbs, fats } = serving;

        calArr[index] = 0;
        proArr[index] = 0;
        carbArr[index] = 0;
        fatArr[index] = 0;

        calArr[index] += calories;
        proArr[index] += proteins;
        carbArr[index] += carbs;
        fatArr[index] += fats;
      });

      if (_.isNull(flag)) {
        return;
      }

      macrosPerRecipe = {
        name: recipe.name,
        calories: calArr.reduce(reducer),
        proteins: proArr.reduce(reducer),
        carbs: carbArr.reduce(reducer),
        fats: fatArr.reduce(reducer)
      };
    }

    return macrosPerRecipe;
  }
}

export default HomeInfo;
