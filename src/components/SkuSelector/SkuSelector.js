import React from 'react';
import Immutable from 'immutable';
import getSkuVariations from 'utils/getSkuVariations';
import SelectVariation from './SelectVariation/SelectVariation';
import { editable } from 'vtex-editor';
import filter from 'lodash-compat/collection/filter';
import reduce from 'lodash-compat/collection/reduce';
import './SkuSelector.less';

@editable({
  name: 'SkuSelector@vtex.sku-selector',
  title: 'SkuSelector'
})
class SkuSelector extends React.Component {
  componentWillMount() {
    let filteredFacets = {};

    this.props.skus.forEach((sku) => {
      sku.properties.forEach((property) => {
        let name = property.facet.name;
        let value = property.facet.values[0];
        let facetArray = filteredFacets[name];

        if (facetArray && facetArray.indexOf(value) === -1) {
          filteredFacets[name].push(value);
        } else {
          filteredFacets[name] = [value];
        }
      });
    });

    let facets = reduce(filteredFacets, (acc, values, name) => {
      if (values.length === 1) {
        acc.push({
          name,
          value: values[0]
        });
      }

      return acc;
    }, []);

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
