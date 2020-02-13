import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature'
import ol from 'ol'
import { Draw, Modify, Select, Snap } from 'ol/interaction';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { click, pointerMove, altKeyOnly } from 'ol/events/condition';

// Loading Open street maps renderings
var raster = new TileLayer({
    source: new OSM()
});

var vs = new VectorSource()
var vector = new VectorLayer({
    source: vs
});


var map = new Map({
    layers: [raster, vector],
    target: 'map',
    view: new View({
        center: [-11000000, 4600000],
        zoom: 4
    })
});



var optionsForm = document.getElementById('options-form');
var button = document.getElementById('button');

var poly;
var select;
    var snap = new Snap({
    source: vector.getSource()
    });

optionsForm.onchange = function(e) {
    var type = e.target.getAttribute('name');
    var value = e.target.value;
    if (type == 'interaction') {
        if (value == 'modify') {
           
           map.removeInteraction(poly);
            select = new Select();
            map.addInteraction(select);

            var modify = new Modify({
              features: select.getFeatures()
              });

            map.addInteraction(modify);


        } else if (value == 'draw') {

             poly = new Draw({
                source: vector.getSource(),
                type: 'Polygon'
            })

            map.addInteraction(poly);
            snap = new Snap({source: source});
            map.addInteraction(snap);

        } else if (value == 'None') {
            map.removeInteraction(poly);
            Select = new Select();
            map.addInteraction(select);

        }
    }
};

var obj = {"disposed_":false,"pendingRemovals_":{},"dispatching_":{},"listeners_":{"change:geometry":[null],"change":[null,null],"propertychange":[null]},"revision_":24,"ol_uid":"74","values_":{"geometry":{"disposed_":false,"pendingRemovals_":{},"dispatching_":{},"listeners_":{"change":[null]},"revision_":23,"ol_uid":"73","values_":{},"extent_":[-15233873.822880812,3797195.7345643155,-13414061.053467335,6145341.24348493],"extentRevision_":23,"simplifiedGeometryMaxMinSquaredTolerance":23931368.624409948,"simplifiedGeometryRevision":23,"layout":"XY","stride":2,"flatCoordinates":[-15233873.822880812,3797195.7345643155,-13414061.053467335,4716886.058891556,-13560820.147774873,6145341.24348493,-15233873.822880812,3797195.7345643155],"ends_":[8],"flatInteriorPointRevision_":-1,"flatInteriorPoint_":null,"maxDelta_":-1,"maxDeltaRevision_":-1,"orientedRevision_":23,"orientedFlatCoordinates_":[-15233873.822880812,3797195.7345643155,-13560820.147774873,6145341.24348493,-13414061.053467335,4716886.058891556,-15233873.822880812,3797195.7345643155]}},"geometryName_":"geometry","geometryChangeKey_":{"target":{"disposed_":false,"pendingRemovals_":{},"dispatching_":{},"listeners_":{"change":[null]},"revision_":23,"ol_uid":"73","values_":{},"extent_":[-15233873.822880812,3797195.7345643155,-13414061.053467335,6145341.24348493],"extentRevision_":23,"simplifiedGeometryMaxMinSquaredTolerance":23931368.624409948,"simplifiedGeometryRevision":23,"layout":"XY","stride":2,"flatCoordinates":[-15233873.822880812,3797195.7345643155,-13414061.053467335,4716886.058891556,-13560820.147774873,6145341.24348493,-15233873.822880812,3797195.7345643155],"ends_":[8],"flatInteriorPointRevision_":-1,"flatInteriorPoint_":null,"maxDelta_":-1,"maxDeltaRevision_":-1,"orientedRevision_":23,"orientedFlatCoordinates_":[-15233873.822880812,3797195.7345643155,-13560820.147774873,6145341.24348493,-13414061.053467335,4716886.058891556,-15233873.822880812,3797195.7345643155]},"type":"change"}}


var marker = new Feature({
    geometry: new ol.geometry.point(ol.proj.transform([16.9071388, 52.4901917], 'EPSG:4326', 'EPSG:3857')),
});

var markers = new ol.source.Vector({
    features: [marker]
});

var markerVectorLayer = new ol.layer.Vector({
    source: markers,
});
map.addLayer(markerVectorLayer);


button.addEventListener("click", function(e) {
   select.getFeatures().forEach(function(each) {
    

    alert(JSON.stringify(each))


      });

}, false);