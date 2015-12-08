import React from 'react';
import VariationButton from 'components/SkuSelector/SelectVariation/VariationButton/VariationButton';
import './VariationButtonEditor.less';

class VariationButtonEditor extends React.Component {

  handleOrderChange = (e) => {
    let index = this.getIndex(this.props.variationOrder,e.target.name) ;
    if (index === e.target.value - 1) {
      return;
    } let { variationOrder } = this.props;
    variationOrder = variationOrder.splice(index, 1);
    variationOrder = variationOrder.splice(e.target.value - 1, 0, e.target.name);
    this.props.changeOrder(e.target.id, variationOrder);
  }

  getIndex = (list, variation) => {
    return (
      list.findIndex((value) => {
        return value === variation;
      })
    );
  }

  render() {
    return (
      <div id="button-list" className="VariationButtonEditor">
          {this.props.variationValues.map((variation) => {
            return (
              <div className="list-group-item VariationButtonEditor-row clearfix" key={variation}>
                <VariationButton name={this.props.name} value={variation}
                                 label={this.props.label} type={this.props.type}
                                 skus={this.props.skus} editor={true} />
                <input className="form-control VariationButtonEditor-input" type="number"
                       data-is-type={this.props.type} id={this.props.name} name={variation}
                       value={this.getIndex(this.props.variationOrder, variation) + 1}
                       onChange={this.handleOrderChange}/>
              </div>
            );
          })}
      </div>
    );
  }
}

export default VariationButtonEditor;
