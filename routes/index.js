var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


const gju = require("geojson-utils");


const featureCollection = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              12.542409002780914,
              55.7739903262543
            ],
            [
              12.545885145664215,
              55.77522135052687
            ],
            [
              12.557128965854645,
              55.77230062178747
            ],
            [
              12.560862600803375,
              55.77254201262461
            ],
            [
              12.56300836801529,
              55.77440067199867
            ],
            [
              12.570046484470367,
              55.77681438304559
            ],
            [
              12.57820039987564,
              55.77727297124536
            ],
            [
              12.577814161777496,
              55.778117724855846
            ],
            [
              12.564939558506012,
              55.78038640106636
            ],
            [
              12.564295828342438,
              55.78207575499872
            ],
            [
              12.560218870639801,
              55.78229295233343
            ],
            [
              12.557858526706696,
              55.781206953552704
            ],
            [
              12.541722357273102,
              55.774424809849094
            ],
            [
              12.542409002780914,
              55.7739903262543
            ]
          ]
        ]
      },
      "properties": {}
    }
  ]
}

const polygon = featureCollection.features[0].geometry;

//Create a new polygon meant to be used on clients my airbnb's MapView which
//requres an object as the one we create below (note how we swap lon, lat values)
polygonForClient = {};
polygonForClient.coordinates = polygon.coordinates[0].map(point => {
  return {latitude: point[1],longitude: point[0]}
})

router.post('/geoapi', function(req, res) {
  const location = req.body;
  let isInside = gju.pointInPolygon(location,polygon);
  let result = {};
  result.status = isInside;
  let msg = isInside ? "Point was inside the tested polygon":
                       "Point was NOT inside tested polygon";
  result.msg = msg;
  res.json(result);
});

router.get("/geoapi/allowedarea",(req,res)=>{
  res.json(polygonForClient);
});



module.exports = router;
