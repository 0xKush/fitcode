import _ from 'lodash';
import moment from 'moment';

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
      macrosPerMeal = {
        calories: 0,
        proteins: 0,
        carbs: 0,
        fats: 0
      };
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

    if (meal.recipes !== undefined && !_.isEmpty(meal.recipes)) {
      meal.recipes.forEach(obj => {
        const { recipe } = obj;
        if (!_.isNull(recipe)) {
          const macrosFromRecipe = this.macrosPerRecipe(recipe, obj.serving);
          macrosPerMeal.calories += macrosFromRecipe.calories;
          macrosPerMeal.proteins += macrosFromRecipe.proteins;
          macrosPerMeal.carbs += macrosFromRecipe.carbs;
          macrosPerMeal.fats += macrosFromRecipe.fats;
        }
      });
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

  static macrosPerRecipe(recipe, serving = 1) {
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
        calories: calArr.reduce(reducer) * _.parseInt(serving),
        proteins: proArr.reduce(reducer) * _.parseInt(serving),
        carbs: carbArr.reduce(reducer) * _.parseInt(serving),
        fats: fatArr.reduce(reducer) * _.parseInt(serving)
      };

    }

    return macrosPerRecipe;
  }

  static enumerateDaysBetweenDates = (startDate, endDate) => {
    let now = startDate,
      datesLabels = {};

    while (now.isSameOrBefore(endDate)) {
      datesLabels[now.format('YYYY-MM-DD')] = 0;
      now.add(1, 'days');
    }
    return datesLabels;
  };

  static enumerateDaysBetweenDatesLabels = (startDate, endDate) => {
    let now = startDate,
      datesLabels = {};

    while (now.isSameOrBefore(endDate)) {
      datesLabels[now.format('Do')] = 0;
      now.add(1, 'days');
    }
    return datesLabels;
  };

  static datesArr = datesObj => {
    let dates = Object.assign({}, datesObj);
    let datesArr = [];

    for (var key in dates) {
      datesArr.push(key);
    }
    return datesArr;
  };

  static caloriesHistory(dateObj, meals) {
    let dates = Object.assign({}, dateObj);

    let caloriesHistory = [];

    meals.forEach(meal => {
      dates[moment(meal.date).format('YYYY-MM-DD')] += this.macrosPerMeal(meal).calories;
    });

    for (var key in dates) {
      caloriesHistory.push(dates[key]);
    }

    return caloriesHistory;
  }

  static weightsHistory(dateObj, weights) {
    let dates = Object.assign({}, dateObj);

    let weightHistory = [];

    weights.forEach(weight => {
      if (dates.hasOwnProperty(moment(weight.date).format('YYYY-MM-DD')))
        dates[moment(weight.date).format('YYYY-MM-DD')] = weight.weight;
    });

    for (var key in dates) {
      weightHistory.push(dates[key]);
    }

    return weightHistory;
  }
}

export default HomeInfo;
