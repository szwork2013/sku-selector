import React from 'react';
import { stores } from 'sdk';
import './VariationButton.less';

const Img = stores.ComponentStore.state.getIn(['Img@vtex.storefront-sdk', 'constructor']);

class VariationButton extends React.Component {

  getAvailability = (value, valueName) => {
    let availability = 0;
    if (this.props.editor) {
      availability =  1;
    } else {
      let skus = this.props.skus;
      if (this.props.facets.length >= 1) {
        this.props.facets.forEach((facet) => {
          if (facet.name != valueName) {
            skus = this.props.filteredSkus;
          }
        });
      }
      skus.forEach(function(sku) {
        sku.properties.forEach((property)=> {
          if (property.facet.values[0] === value && availability === 0) {
            return availability = sku.offers[0].availability;
          }
        });
      });
    }
    return availability;
  }

  getImgByVariation = (variationName, variationValue) => {
    let img;
    this.props.skus.forEach(function(sku) {
      sku.properties.forEach(function(property) {
        if (property.facet.name === variationName) {
          if (property.facet.values[0] === variationValue) {
            img = sku.images[0].src;
          }
        }
      });
    });
    return img;
  }

  changeState = (ev) => {
    ev.preventDefault();
    if (this.getAvailability(this.props.value, this.props.label) > 0) {
      this.props.isActive ? this.props.removeFacet(this.props.name) :
      this.props.addFacet(this.props.name, this.props.value);
    }
  }

  displayValue = () => {
    if (this.props.type === 'PICKER') {
      return (
        <button className="VariationButton-button-selector" data-is-active={this.props.isActive}
        data-is-available={this.getAvailability(this.props.value, this.props.name) > 0}
        onTouchTap={this.changeState}>
          <span className="VariationButton-button-text">{ this.props.value }</span>
        </button>);
    } else if (this.props.type === 'IMG') {
      return (
        <button className="VariationButton-image-selector"
                data-is-available={this.getAvailability(this.props.value, this.props.name) > 0}
                data-is-active={this.props.isActive} onTouchTap={this.changeState}>
          <Img className="VariationButton-image"
          src={this.getImgByVariation(this.props.name, this.props.value)}
          width={200} height={235}/>
        </button>);
    }
  }

  render() {
    return (
        <div className="VariationButton">
          { this.displayValue() }
        </div>
    );
  }
}

export default VariationButton;
