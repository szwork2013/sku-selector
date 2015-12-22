import React from 'react';
import Immutable from 'immutable';
import getSkuVariations from 'utils/getSkuVariations';
import SelectVariation from './SelectVariation/SelectVariation';
import { editable } from 'vtex-editor';
import filter from 'lodash-compat/collection/filter';
import './SkuSelector.less';

@editable({
  name: 'SkuSelector@vtex.sku-selector',
  title: 'SkuSelector'
})
class SkuSelector extends React.Component {
  state = {
    facets: []
  }

  addFacet = (variationName, variationValue) => {
    if (this.state.facets.length > 0) {
      this.removeFacet(variationName);
    }

    let facets = [
      ...this.state.facets,
      {
        name: variationName,
        value: variationValue
      }
    ];

    this.props.changeSelectedSku(this.filterSkus(this.props.skus));
    this.setState({ facets });
  }

  removeFacet = (variationName) => {
    let facets = filter(this.state.facets, (facet) => {
      return facet.name !== variationName;
    });

    this.props.changeSelectedSku([]);
    this.setState({ facets });
  }

  filterSkus = (skus) => {
    let result = [];

    this.state.facets.forEach((facet) => {
      skus.forEach((sku) => {
        sku.properties.forEach((property) => {
          let isNameEqual = property.facet.name === facet.name;
          let isValueEqual = property.facet.values[0] === facet.value;
          let isntOnResult = result.indexOf(sku) === -1;

          if (isNameEqual && isValueEqual && isntOnResult) {
            result.push(sku);
          }
        });
      });

      skus = result;
    });

    return result;
  }

  render() {
    let skus = this.props.skus;
    let filteredSkus = this.state.facets.length !== 0 ?
      this.filterSkus(skus) : undefined;
    let skuVariations = this.props.settings && !this.props.settings.isEmpty() ?
      this.props.settings.get('skuVariations') :
      Immutable.fromJS(getSkuVariations(skus));

    return (
      <div className="row clearfix">
        <div className="v-dream__selector-section col-xs-12">
          {
            skuVariations ?
              skuVariations.map((variationType) => {
                return (
                  <div
                    className="v-dream__selector-row row-fluid"
                    key={variationType.get('name')}
                  >
                    <SelectVariation
                      skus={skus}
                      filteredSkus={filteredSkus}
                      addFacet={this.addFacet}
                      removeFacet={this.removeFacet}
                      facets={this.state.facets}
                      skuVariation={variationType}
                      id="select-variation"
                      route="product"
                    />
                  </div>
                );
              }) : null
          }
        </div>
      </div>
    );
  }
}

export default SkuSelector;
