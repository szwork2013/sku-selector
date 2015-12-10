export default function(skus) {
  let skuVariations = [];
  let variationNumber = skus[0].properties.length;

  for (let i=0; i<variationNumber; i++) {
    let eachVariation = {name: '', label: '', values: [], orderedValues: [], type: 'PICKER' };

    eachVariation.name = skus[0].properties[i].facet.name;
    eachVariation.label = skus[0].properties[i].facet.name;

    skus.forEach(function(sku) {
      if (eachVariation.values.indexOf(sku.properties[i].facet.values[0]) === -1) {
        eachVariation.values.push(sku.properties[i].facet.values[0]);
        eachVariation.orderedValues.push(sku.properties[i].facet.values[0]);
      }
    });

    eachVariation.type = eachVariation.name === 'Cor' ? 'IMG' : 'PICKER';
    skuVariations.push(eachVariation);
  }

  return skuVariations;
}
