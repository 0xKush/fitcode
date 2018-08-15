import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { reduxForm, Field, reset, formValueSelector } from 'redux-form';
import { Header, Modal, Input, Statistic, Form, Button, Card } from 'semantic-ui-react';

import HomeUtils from 'app/food/HomeUtils';

class AddFood extends Component {
  handleClose = () => {
    this.props.handleModal(false);
    this.props.dispatch(reset('addProduct'));
  };

  onSubmit = values => {
    const { selectedProduct, selectedMeal } = this.props;

    const newProduct = {
      product: selectedProduct._id,
      grams: values.serving
    };

    this.handleClose();
    this.props.complexAddProducts(selectedMeal.mealId, newProduct);
  };

  renderMacros = (product, serving) => {
    const { calories, proteins, carbs, fats } = product;

    return (
      <Card.Group centered>
        <Statistic.Group className="prueba">
          <Statistic
            value="Calories"
            label={isNaN(HomeUtils.per(calories, serving)) ? '' : HomeUtils.per(calories, serving)}
          />
          <Statistic
            value="Proteins"
            label={isNaN(HomeUtils.per(proteins, serving)) ? '' : HomeUtils.per(proteins, serving)}
          />
          <Statistic value="Carbs" label={isNaN(HomeUtils.per(carbs, serving)) ? '' : HomeUtils.per(carbs, serving)} />
          <Statistic value="Fats" label={isNaN(HomeUtils.per(fats, serving)) ? '' : HomeUtils.per(fats, serving)} />
        </Statistic.Group>
      </Card.Group>
    );
  };
  renderField = field => {
    return (
      <Input
        fluid
        label={{ basic: true, content: 'g' }}
        labelPosition="right"
        placeholder="Enter weight..."
        type="text"
        maxLength="7"
        {...field.input}
      />
    );
  };

  render() {
    const { selectedProduct, serving, handleSubmit, openModal } = this.props;

    return (
      <Modal style={{ width: 300, textAlign: 'center' }} open={openModal} onClose={this.handleClose} size="mini">
        <Header subheader={selectedProduct.name} content="Add Food" />
        <Modal.Content>{this.renderMacros(selectedProduct, serving)}</Modal.Content>
        <Modal.Actions>
          <Form onSubmit={handleSubmit(this.onSubmit)}>
            <Field name="serving" component={this.renderField} />

            <Button style={{ marginBottom: 5, marginTop: 5 }} primary content="Add" floated="right" />
          </Form>
        </Modal.Actions>
      </Modal>
    );
  }
}

// Selector needed in order to access the value of the 'serving' field of the addProduct form
// This way we can update in real time the macros depending upon serving size
const selector = formValueSelector('addProduct');

export default compose(
  connect(state => ({
    initialValues: {
      serving: state.food.selectedGrams
    }
  })),
  reduxForm({ form: 'addProduct', enableReinitialize: true }),
  connect(state => ({
    serving: selector(state, 'serving')
  }))
)(AddFood);