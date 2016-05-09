import React from 'react';
import Immutable from 'immutable';
import getSkuVariations from 'utils/getSkuVariations'
import SelectVariationEditor from './SelectVariationEditor/SelectVariationEditor';
import SVGIcon from 'utils/SVGIcon';
import downArrowIcon from 'assets/icons/down-arrow_icon.svg';
import downArrowImg from 'assets/icons/down-arrow_icon.png';
import './SkuSelectorEditor.less';

class SkuSelectorEditor extends React.Component {
  constructor(props) {
    super(props);

    let settings = this.props.settings;
    let { skus } = this.props.componentProps;
    let skuVariations = Immutable.fromJS(getSkuVariations(skus));

    this.state = {
      skuVariations: settings && !settings.isEmpty() ? settings.get('skuVariations') : skuVariations,
      skus: skus
    };
  }

  changeValue = (currentLabel, newValue, id) => {
    id = id === 'label-selector' ? 'label' : id;
    let skuVariations = this.state.skuVariations;
    let index = skuVariations.findIndex((variation) => {
      return variation.get('label') === currentLabel;
    });
    skuVariations = skuVariations.update(index, (variation) => {
      return variation.set(id, newValue);
    });
    this.setState({
      skuVariations: skuVariations
    });
  }

  changeOrder = (variationName, newOrder) => {
    let skuVariations = this.state.skuVariations;
    let index = skuVariations.findIndex((variation) => {
      return variation.get('name') === variationName;
    });
    skuVariations = skuVariations.update(index, (variation) => {
      return variation.set('orderedValues', newOrder);
    });
    this.setState({
      skuVariations: skuVariations
    });
  }

  handleSave = () => {
    this.props.saveSettings(this.state);
  }

  render() {
    let ActionBar = this.props.actionBar;
    let skuVariations = this.state.skuVariations;

    let defineConfigOpen = true;

    return (
      <div className="SkuSelectorEditor">
        <button className="SkuSelectorEditor-config-header theme-font" data-is-open={defineConfigOpen}>
          <div className="SkuSelectorEditor-config-inner">
            <div className="SkuSelectorEditor-config-copy">Configuração Geral</div>
            <SVGIcon className="SkuSelectorEditor-icon" svg={downArrowIcon} fallback={downArrowImg} height={10} fill="#97A1B0" />
          </div>
        </button>
        {skuVariations.map((variationType) => {
          return (
          	<SelectVariationEditor key={variationType.get('name')} name={variationType.get('name')} changeValue={this.changeValue}
                               	   type={variationType.get('type')} variationLabel={variationType.get('label')} skus={this.state.skus}
                               	   isConfigOpen={defineConfigOpen} variationOrder={variationType.get('orderedValues')} variationValues={variationType.get('values')} changeOrder={this.changeOrder}/>
			    );
        })}
        <div className="SkuSelectorEditor-actionbar">
          <ActionBar title={this.props.title} onSave={this.handleSave.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default SkuSelectorEditor;
