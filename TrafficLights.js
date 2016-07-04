define( ['jquery', 'underscore', 'text!./TrafficLights.css', './extensionUtils', './TrafficLights-properties', './TrafficLights-initialproperties'],
	function ( $, _, cssContent, extensionUtils, props, initProps ) {
		'use strict';
		extensionUtils.addStyleToHeader(cssContent);
		return {
			definition: props,
			initialProperties: initProps,
			snapshot: {
				canTakeSnapshot: true
			},

			paint: function ($element, layout) {
				
				var hc = layout.qHyperCube;
				var arc_width = layout.CircleSize;
				var arc_height = arc_width;
								
				$element.empty();
				
				var id  = layout.qInfo.qId;
				
				var width = '100%';
				var height = '100%';

				var colorRed = "#CF000F";
				var colorBlue = "#2574A9";
				var colorGreen = "#26A65B";
				
				var qMatrix = layout.qHyperCube.qDataPages[0].qMatrix;
				
				if (hc.qDimensionInfo.length==1){
				
					var table = '<div id="traffic_holder_' + id + '" style="overflow: scroll; width: ' + width + '; height: '+ height + '; text-align: center; ">';
					table += '<table >';
					table += '<tbody>';
				
					table += '<tr>';
								
					for (var r = 0; r < qMatrix.length; r++) {
						table += '<td><table style="align: center;">';
						table += '<tbody>';
						for (var c = 2; c <= qMatrix[r].length; c--) {
							if(c<0){
								break;
							}
							if((c!=hc.qDimensionInfo.length) && (hc.qDimensionInfo.length>1) && (c==qMatrix[r].length-2)){
								table += '<tr>';
								table += '<td style="padding: 5px; width: 125px; height: 30px; ">';
								table += qMatrix[r][1].qText;
								table += '</td>';
								table += '</tr>';
							}
							if(c==hc.qDimensionInfo.length){
								table += '<tr>';
								table += '<td style="padding: 5px; width: 125px; height: 30px; ">';
								table += '<div class="qv-object-TrafficLights-circle" style="width: '+ arc_width +'px; height: '+ arc_height +'px; background-color: ';
								if(qMatrix[r][hc.qDimensionInfo.length].qText=="R"){
										table +=	colorRed;
								} else if(qMatrix[r][hc.qDimensionInfo.length].qText=="G"){
										table +=	colorGreen;
								} else if(qMatrix[r][hc.qDimensionInfo.length].qText=="B"){
										table +=	colorBlue;
								}
								table += '"></div>';
								table += '</td>';
								table += '</tr>';
							}
							if((c!=hc.qDimensionInfo.length) && (c==0)){
								table += '<tr>';
								table += '<td style="padding: 5px; width: 125px; height: 30px; ">';
								table += qMatrix[r][0].qText;
								table += '</td>';
								table += '</tr>';
							}
						}
						table += '</tbody>';
						table += '</table></td>';
					}
					table += '</td></tr>';
					table += '</tbody>';
					table += '</table></div>';
					$element.append( table );
				} 
				else {
				
					var div = '<div id="traffic_holder_tmp_' + id + '" style="overflow: scroll; width: ' + width + '; height: '+ height + '; text-align: center; ">';
				
					$element.append( div );
				
					var content = $('<table></table>');
					for (var r = 0; r < qMatrix.length; r++) {
						for (var c = 2; c < qMatrix[r].length; c--) {
							if(c<0){
								break;
							}else {							
								var row = $('<tr><td></td></tr>').text(qMatrix[r][c].qText);
								content.append(row);
							}
						}
					}

					$('#traffic_holder_tmp_'+id).append(content);
				
					var div2 = '<div id="traffic_holder_' + id + '" style="overflow: scroll; width: ' + width + '; height: '+ height + '; text-align: center; ">';
				
					$element.append( div2 );
				
					var track_row = 0;
					var elem = [];
				
					var content_upd = '<table style="align: center;"><tr>';
				
					$('#traffic_holder_tmp_'+id).each(function() {
					
						$("table",this).find('tr').each(function () {
						
							elem[track_row] = $(this).text();
							track_row = track_row + 1;						
							if(track_row == 3) {
								var new_row = '<td style="padding: 5px;"><span class="qv-object-TrafficLights-span">';
								var i = 0;
								for(i=0; i<elem.length; i++){
									if(i==0){
										new_row += '<div class="qv-object-TrafficLights-circle" style="width: '+ arc_width +'px; height: '+ arc_height +'px; background-color: ';
										if(elem[i]=="R"){
											new_row +=	colorRed;
										} else if(elem[i]=="G"){
											new_row +=	colorGreen;
										} else if(elem[i]=="B"){
											new_row +=	colorBlue;
										}
										new_row += '"></div>';
									}else if (i==2) {
										new_row += '<p>'+elem[i] + '</p><br/><br/>';
									}
									else {
										new_row += elem[i] + '<br/>';
										for(var k=0; k<elem[i].length; k++){
											new_row += '__';
										}
										new_row += '<br/><br/>';
									}
								}
								new_row += '</span></td>';
								content_upd += new_row;
								track_row = 0;
								elem = [];
							}
					
						});	
					
					});
				
					content_upd += '</tr></table>';
				
					$('#traffic_holder_'+id).html(content_upd);
					$('#traffic_holder_tmp_'+id).remove();
				
					$('#traffic_holder_'+id).each(function () {
					 
						var merge_col = 1;
						var prev_rec = null;	 
						var i = 1;
						var tmp_test = '';

						$("tbody",this).find('p').each(function () {
                                        
							var curr_rec = $(this);
						
							if (prev_rec == null) {
								prev_rec = curr_rec;
								i = 1;
							} 
							else if (curr_rec.text() == prev_rec.text()) {              
								tmp_test = curr_rec.text();   
								prev_rec.html(' <br/><br/>'); 
								if (i > 1){
									if (tmp_test == curr_rec.text()){
										curr_rec.html(' <br/><br/>');
										prev_rec.text(tmp_test);
									}
								}
								prev_rec = curr_rec; 
								i = i + 1;
							} 
							else {
								if (tmp_test == curr_rec.text()){ 
									curr_rec.html(' <br/><br/>');
								} else {
									$('<td style="padding: 5px;"><span class="qv-object-TrafficLights-span"><div>|<br/>|</div>| <br/>|<p>|<br/>|<br/>|</p>|<br/>|<br/><br/><br/></span></td>').insertBefore(curr_rec.parent().parent());
									prev_rec = curr_rec;
									i = 1;
								}
							}
						});
						
						$("tbody",this).find('p').each(function () {
                                        
							var curr_rec = $(this);
							var tmp_content = '';
						
							if (curr_rec.html().toLowerCase().indexOf('<br>') <= 0) {
								tmp_content = curr_rec.html();
								tmp_content += '<br/><br/>';
								curr_rec.closest('td').attr('style', 'padding: 5px; white-space: nowrap;');
								curr_rec.html(tmp_content);
								console.log(curr_rec.text());
							} 
							
						});
						
					});
				}
			}
		};
	} 
);
