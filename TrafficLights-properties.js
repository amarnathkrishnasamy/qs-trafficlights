define( [], function ( ) {
  'use strict';
	  
    var dimensions = {
        uses: "dimensions",
        min: 1,
		max: 2
    };

    var measures = {
        uses: "measures",
        min: 1,
		max: 1
    };

    var sorting = {
        uses: "sorting"
    };

    var settings = {
        uses: "settings",
		items: {
			CircleSize: {
                  type: "number",
                  component: "slider",
                  label: "Indicator Size",
                  ref: "CircleSize",
                  min: 30,
                  max: 60,
                  step: 5,
                  defaultValue: 40
			}
		}
    };

    return {
        type: "items",
        component: "accordion",
        items: {
            dimensions: dimensions,
            measures: measures,
            sorting: sorting,
            settings: settings

        }
    };

});
