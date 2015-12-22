import React from 'react';
import { stores } from 'sdk';
import reduce from 'lodash-compat/collection/reduce';
import './VariationButton.less';

const Img = stores.ComponentStore.state.getIn(['Img@vtex.storefront-sdk', 'constructor']);

class VariationButton extends React.Component {
  getAvailability = (value, valueName) => {
    let availability = 0;

    if (this.props.editor) {
      availability = 1;
    } else {
      let skus = this.props.facets.length >= 1 ?
        reduce(this.props.facets, (acc, facet) => {
          if (facet.name != valueName) {
            return this.props.filteredSkus;
          }

          return acc;
        }, this.props.skus) : this.props.skus;

      skus.forEach((sku) => {
        sku.properties.forEach((property) => {
          if (property.facet.values[0] === value && availability === 0) {
            availability = sku.offers[0].availability;
          }
        });
      });
    }

    return availability;
  }

  getImgByVariation = (variationName, variationValue) => {
    let img;

    this.props.skus.forEach((sku) => {
      sku.properties.forEach((property) => {
        let isNameEqual = property.facet.name === variationName;
        let isValueEqual = property.facet.values[0] === variationValue;

        if (isNameEqual && isValueEqual) {
          img = sku.images[0].src;
        }
      });
    });

    return img;
  }

  changeState = (ev) => {
    ev.preventDefault();

    let isAvailable = this.getAvailability(this.props.value, this.props.label) > 0;
    let isActive = this.props.isActive;

    if (isAvailable && isActive) {
      this.props.removeFacet(this.props.name);
    } else if (isAvailable && !isActive) {
      this.props.addFacet(this.props.name, this.props.value);
    }
  }

  render() {
    let isAvailable = this.getAvailability(this.props.value, this.props.name) > 0;
    let button = this.props.type === 'PICKER' ?
      (
        <button
          className="VariationButton-button-selector"
          data-is-active={this.props.isActive}
          data-is-available={isAvailable}
          onTouchTap={this.changeState}
        >
          <span className="VariationButton-button-text">
            { this.props.value }
          </span>
        </button>
      ) :
      (
        <button
          className="VariationButton-image-selector"
          data-is-available={isAvailable}
          data-is-active={this.props.isActive}
          onTouchTap={this.changeState}
        >
          <Img
            className="VariationButton-image"
            src={this.getImgByVariation(this.props.name, this.props.value)}
            width={200}
            height={235}
          />
        </button>
      );

    return (
      <div className="VariationButton">
        { button }
      </div>
    );
  }
}

export default VariationButton;
