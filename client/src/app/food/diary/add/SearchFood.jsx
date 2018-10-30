import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import AddFood from 'app/food/diary/add/AddFood.jsx';
import AddRecipe from 'app/food/diary/add/AddRecipe.jsx';
import transform from 'app/common/Transformations';
import _ from 'lodash';

import { Card, Input, List, Header, Container, Form } from 'semantic-ui-react';

class SearchFood extends Component {
  state = { modalOpenProduct: false, modalOpenRecipe: false };

  handleModalProduct = flag => {
    this.setState({ modalOpenProduct: flag });
  };

  handleModalRecipe = flag => {
    this.setState({ modalOpenRecipe: flag });
  };

  selectProduct = product => {
    this.props.selectProduct(product, 100);
    this.handleModalProduct(true);
  };

  selectRecipe = recipe => {
    this.props.selectRecipe(recipe);
    this.handleModalRecipe(true);
  };

  onSubmit = values => {
    const { term } = values;
    this.props.complexSearchProducts(term);
  };

  renderField = field => {
    const {
      meta: { touched, error }
    } = field;

    let validateError = false;

    if (touched && error) {
      validateError = true;
    }

    return (
      <Form.Field>
        <Input fluid size="medium" icon="search" type="text" placeholder="Search..." {...field.input} />
        {validateError ? (
          <Header as="label" color="red" size="tiny" textAlign="center">
            {error}
          </Header>
        ) : (
          ''
        )}
      </Form.Field>
    );
  };

  renderProductList(products) {
    return (
      <List divided relaxed selection>
        {products.map(product => {
          const { _id, name, brand, calories, proteins, carbs, fats } = product;
          const header = `${calories} CAL | ${proteins} P | ${carbs} C | ${fats} F`;

          return (
            <List.Item onClick={() => this.selectProduct(product)} key={_id}>
              <List.Icon name="food" style={{ float: 'left ', marginTop: '5px' }} size="large" verticalAlign="top" />
              <List.Content
                floated="left"
                header={{ content: name, as: 'a' }}
                description={brand}
                style={{ marginBottom: '5px' }}
              />
              <List.Content floated="right" content={header} />
            </List.Item>
          );
        })}
      </List>
    );
  }

  renderRecipeList(recipes) {
    return (
      <List as={List} divided relaxed selection>
        {recipes.map(recipe => {
          const { _id, name, products } = recipe;
          const macrosPerRecipe = transform.reduceMacros(products);
          const { calories, proteins, carbs, fats } = macrosPerRecipe;
          const header = `${calories} CAL | ${proteins} P | ${carbs} C | ${fats} F`;

          return (
            <List.Item key={_id} onClick={() => this.selectRecipe(recipe)}>
              <List.Icon name="book" style={{ float: 'left', marginTop: '5px' }} size="large" verticalAlign="middle" />
              <List.Content floated="left" header={{ content: name, as: 'a' }} description="Recipe" />
              <List.Content floated="right" verticalAlign="middle" content={header} />
            </List.Item>
          );
        })}
      </List>
    );
  }

  render() {
    // handleSubmit provided by reduxForm
    const {
      handleSubmit,
      products,
      userRecipes,
      selectedProduct,
      selectedMeal,
      selectedRecipe,
      searchMessage,
      loading
    } = this.props;
    const { modalOpenProduct, modalOpenRecipe } = this.state;
    const searchStyle = {
      fontSize: '.82857143em',
      fontWeight: 700,
      color: '#db2828'
    };
    const recipeArr = _.map(userRecipes).reverse();
    const containerStyle = { marginBottom: '2rem' };
    return (
      <div>
        {loading ? (
          <div />
        ) : (
          <Container style={containerStyle}>
            <Card raised fluid>
              <Card.Content textAlign="center">
                <Header size="medium">
                  Search our food database by name or brand
                  <Header.Subheader>{selectedMeal.part}</Header.Subheader>
                  <Header.Subheader style={searchStyle}>{searchMessage}</Header.Subheader>
                </Header>
              </Card.Content>

              <Card.Content>
                <Form onSubmit={handleSubmit(this.onSubmit)}>
                  <Field name="term" component={this.renderField} />
                </Form>
              </Card.Content>
            </Card>
            {products.length !== 0 && (
              <Card raised fluid>
                <Card.Content extra textAlign="center">
                  Food
                </Card.Content>
                <Card.Content>{this.renderProductList(products)}</Card.Content>
              </Card>
            )}

            {recipeArr.length !== 0 && (
              <Card raised fluid>
                <Card.Content extra textAlign="center">
                  Recipes
                </Card.Content>
                <Card.Content>{this.renderRecipeList(recipeArr)}</Card.Content>
              </Card>
            )}
          </Container>
        )}
        <AddFood
          complexAddDiaryProduct={this.props.complexAddDiaryProduct}
          complexAddRecipeProduct={this.props.complexAddRecipeProduct}
          openModal={modalOpenProduct}
          handleModal={this.handleModalProduct}
          selectedProduct={selectedProduct}
          selectedMeal={selectedMeal}
          selectedRecipe={selectedRecipe}
        />

        <AddRecipe
          complexAddDiaryRecipe={this.props.complexAddDiaryRecipe}
          openModal={modalOpenRecipe}
          handleModal={this.handleModalRecipe}
          selectedMeal={selectedMeal}
          selectedRecipe={selectedRecipe}
        />
      </div>
    );
  }
}

const validate = values => {
  const errors = {};
  const required = 'Required field';

  if (!values.term) {
    errors.term = required;
  }

  return errors;
};

export default reduxForm({ validate, form: 'search' })(SearchFood);
