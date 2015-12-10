import React from 'react';
import Immutable from 'immutable';
import getSkuVariations from 'utils/getSkuVariations';
import SelectVariation from './SelectVariation/SelectVariation';
import { editable } from 'vtex-editor';
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
    this.state.facets.push({name: variationName, value: variationValue});
    this.props.changeSelectedSku(this.filterSkus(this.props.skus));
    this.setState({
      facets: this.state.facets
    });
  }

  removeFacet = (variationName) => {
    this.state.facets.forEach((facet) => {
      if (facet.name === variationName) {
        let index = this.state.facets.indexOf(facet);
        this.state.facets.splice(index,1);
      }
    });
    this.setState({
      facets: this.state.facets,
    });
  }

  filterSkus = (skus) => {
    let result = [];
    this.state.facets.forEach((facet) => {
      result = [];
      skus.forEach((sku) => {
        sku.properties.forEach((property) => {
          if (property.facet.name === facet.name) {
            if (property.facet.values[0] === facet.value) {
              if (result.indexOf(sku) === -1) {
                result.push(sku);
              }
            }
          }
        });
      });
      skus = result;
    });
    return result;
  }

  render() {
    let classes = 'v-dream__selector-section col-xs-12';
    let skus = this.props.skus;
    let skuVariations = Immutable.fromJS(getSkuVariations(skus));
    let filteredSkus;

    if (this.state.facets.length !== 0) {
      filteredSkus = this.filterSkus(skus);
    }

    if (this.props.settings && !this.props.settings.isEmpty()) {
      skuVariations = this.props.settings.get('skuVariations');
    }

    return (
      <div className="row clearfix">
        <div className={classes}>
        { skuVariations ?
          skuVariations.map((variationType) => {
            return (
              <div className="v-dream__selector-row row-fluid" key={variationType.get('name')}>
                <SelectVariation skus={this.props.skus} filteredSkus={filteredSkus}
                                 addFacet={this.addFacet} removeFacet={this.removeFacet}
                                 facets={this.state.facets} skuVariation={variationType}
                                 id="select-variation" route="product"/>
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
