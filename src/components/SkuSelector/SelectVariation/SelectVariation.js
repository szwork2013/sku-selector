import React from 'react';
import VariationButton from './VariationButton/VariationButton';

class SelectVariation extends React.Component {
  render() {
    let variationName = this.props.skuVariation.get('name');
    let variationLabel = this.props.skuVariation.get('label');
    let variationKey = this.props.skuVariation.get('orderedValues');

    return (
      <div className="col-xs-12" key={variationName}>
        <h3 className="v-dream__selector__title">{ variationLabel }:</h3>
        <div>
          {
            variationKey.map((variation) => {
              let isActive = false;

              this.props.facets.forEach((facet) => {
                if (facet.value === variation) {
                  isActive = true;
                }
              });

              return (
                <VariationButton
                  key={variation}
                  editor={false}
                  value={variation}
                  label={variationLabel}
                  name={variationName}
                  type={this.props.skuVariation.get('type')}
                  skus={this.props.skus}
                  isActive={isActive}
                  facets={this.props.facets}
                  addFacet={this.props.addFacet}
                  removeFacet={this.props.removeFacet}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default SelectVariation;
