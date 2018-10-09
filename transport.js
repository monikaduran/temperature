var dataset;

//Define bar chart function 
	function barChart(dataset){	

		//Set width and height as fixed variables
		var w = 520;
		var h = 500;
		var padding = 25;

		//Scale function for axes and radius
		var yScale = d3.scale.linear()
						.domain(d3.extent(dataset, function(d){return d.Jan;}))
						.range([w+padding,padding]);

		var xScale = d3.scale.ordinal()
						.domain(dataset.map(function(d){ return d.Year;}))
						.rangeRoundBands([padding,h+padding],.5);

		//To format axis as a percent
		var formatPercent = d3.format("%1");

		//Create y axis
		var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(5);

		//Define key function
		var key = function(d){return d.Year};

		//Define tooltip for hover-over info windows
		var div = d3.select("body").append("div")   
  							.attr("class", "tooltip")               
  							.style("opacity", 0);

		//Create svg element
		var svg = d3.select("#chart-container").append("svg")
				.attr("width", w).attr("height", h)
				.attr("id", "chart")
				.attr("viewBox", "0 0 "+w+ " "+h)
				.attr("preserveAspectRatio", "xMinYMin");
		
		//Resizing function to maintain aspect ratio (uses jquery)
		var aspect = w / h;
		var chart = $("#chart");
			$(window).on("resize", function() {
			    var targetWidth = $("body").width();
			   	
	    		if(targetWidth<w){
	    			chart.attr("width", targetWidth); 
	    			chart.attr("height", targetWidth / aspect); 			
	    		}
	    		else{
	    			chart.attr("width", w);  
	    			chart.attr("height", w / aspect);	
	    		}

			});


		//Initialize state of chart according to drop down menu
		var state = d3.selectAll("option");

		//Create barchart
		svg.selectAll("rect")
			.data(dataset, key)
			.enter()
		  	.append("rect")
		    .attr("class", function(d){return d.Jan < 0 ? "negative" : "positive";})
		    .attr({
		    	x: function(d){
		    		return xScale(d.Year);
		    	},
		    	y: function(d){
		    		return yScale(Math.max(0, d.Jan)); 
		    	},
		    	width: xScale.rangeBand(),
		    	height: function(d){
		    		return Math.abs(yScale(d.Jan) - yScale(0)); 
		    	}
		    })
		    .on('mouseover', function(d){
							d3.select(this)
							    .style("opacity", 0.2)
							    .style("stroke", "black")
					
					var info = div
							    .style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
							    .text(d.Year);

					if(state[0][0].selected){
						info.append("p")
							    .text(formatPercent(d.Jan));

					}
					else if(state[0][1].selected){
						info.append("p")
							    .text(formatPercent(d.Feb));
					}


					else if(state[0][2].selected){
						info.append("p")
							    .text(formatPercent(d.Mar));
					}

					else if(state[0][3].selected){
						info.append("p")
							    .text(formatPercent(d.Apr));
					}
					
					else if(state[0][4].selected){
						info.append("p")
							    .text(formatPercent(d.May));
					}
					
					else if(state[0][5].selected){
						info.append("p")
							    .text(formatPercent(d.Jun));
					}
					
					else if(state[0][6].selected){
						info.append("p")
							    .text(formatPercent(d.Jul));
					}
					else if(state[0][7].selected){
						info.append("p")
							    .text(formatPercent(d.Aug));
					}
					else if(state[0][8].selected){
						info.append("p")
							    .text(formatPercent(d.Sep));
					}
					else if(state[0][9].selected){
						info.append("p")
							    .text(formatPercent(d.Oct));
					}
					else if(state[0][10].selected){
						info.append("p")
							    .text(formatPercent(d.Nov));
					}
					else if(state[0][11].selected){
						info.append("p")
							    .text(formatPercent(d.Dec));
					}
					
					
					
						})
        				.on('mouseout', function(d){
        					d3.select(this)
							.style({'stroke-opacity':0.5,'stroke':'#a8a8a8'})
							.style("opacity",1);

							div
	    						.style("opacity", 0);
        				});

		//Add y-axis
		svg.append("g")
				.attr("class", "y axis")
				.attr("transform", "translate(40,0)")
				.call(yAxis);

		//Sort data when sort is checked
		d3.selectAll(".checkbox").
		on("change", function(){
			var x0 = xScale.domain(dataset.sort(sortChoice())
			.map(function(d){return d.Year}))
			.copy();

			var transition = svg.transition().duration(750);
			var delay = function(d, i){return i*10;};

			transition.selectAll("rect")
			.delay(delay)
			.attr("x", function(d){return x0(d.Year);});

		})

		//Function to sort data when sort box is checked
		function sortChoice(){
				var state = d3.selectAll("option");
				var sort = d3.selectAll(".checkbox");

				if(sort[0][0].checked && state[0][0].selected){
					var out = function(a,b){return b.Mar - a.Mar;}
					return out;
				}
				else if(sort[0][0].checked && state[0][1].selected){
					var out = function(a,b){return b.Jun - a.Jun;}
					return out;
				}

				else if(sort[0][0].checked && state[0][2].selected){
					var out = function(a,b){return b.Jan - a.Jan;}
					return out;
				}	

				else if(sort[0][0].checked && state[0][3].selected){
					var out = function(a,b){return b.Feb - a.Feb;}
					return out;
				}	

				else if(sort[0][0].checked && state[0][4].selected){
					var out = function(a,b){return b.Apr - a.Apr;}
					return out;
				}

				else if(sort[0][0].checked && state[0][5].selected){
					var out = function(a,b){return b.May - a.May;}
					return out;
				}

				else if(sort[0][0].checked && state[0][6].selected){
					var out = function(a,b){return b.Jul - a.Jul;}
					return out;
				}

				else if(sort[0][0].checked && state[0][7].selected){
					var out = function(a,b){return b.Aug - a.Aug;}
					return out;
				}

				else if(sort[0][0].checked && state[0][8].selected){
					var out = function(a,b){return b.Sep - a.Sep;}
					return out;
				}

				else if(sort[0][0].checked && state[0][9].selected){
					var out = function(a,b){return b.Oct - a.Oct;}
					return out;
				}
				else if(sort[0][0].checked && state[0][10].selected){
					var out = function(a,b){return b.Nov - a.Nov;}
					return out;
				}
				else if(sort[0][0].checked && state[0][11].selected){
					var out = function(a,b){return b.Dec - a.Dec;}
					return out;
				}
				else{
					var out = function(a,b){return d3.ascending(a.Year, b.Year);}
					return out;
				}
		};

		//Change data to correct values on input change
			d3.selectAll("select").
			on("change", function() {
			
				var value= this.value;

				if(value=="June"){
					var x_value = function(d){return d.Jun;};
					var color = function(d){return d.Jun < 0 ? "negative" : "positive";};
					var y_value = function(d){
			    		return yScale(Math.max(0, d.Jun)); 
			    	};
			    	var height_value = function(d){
			    		return Math.abs(yScale(d.Jun) - yScale(0));
			    	};	
				}
				else if(value=="March"){
					var x_value = function(d){return d.Mar;};
					var color = function(d){return d.Mar < 0 ? "negative" : "positive";};
					var y_value = function(d){
			    		return yScale(Math.max(0, d.Mar)); 
			    	};
			    	var height_value = function(d){
			    		return Math.abs(yScale(d.Mar) - yScale(0)); 
			    	};	
				}


					else if(value=="January"){
					var x_value = function(d){return d.Jan;};
					var color = function(d){return d.Jan < 0 ? "negative" : "positive";};
					var y_value = function(d){
			    		return yScale(Math.max(0, d.Jan)); 
			    	};
			    	var height_value = function(d){
			    		return Math.abs(yScale(d.Jan) - yScale(0)); 
			    	};	
				}

					else if(value=="February"){
					var x_value = function(d){return d.Feb;};
					var color = function(d){return d.Feb < 0 ? "negative" : "positive";};
					var y_value = function(d){
			    		return yScale(Math.max(0, d.Feb)); 
			    	};
			    	var height_value = function(d){
			    		return Math.abs(yScale(d.Feb) - yScale(0)); 
			    	};	
				}

					else if(value=="April"){
					var x_value = function(d){return d.Apr;};
					var color = function(d){return d.Apr < 0 ? "negative" : "positive";};
					var y_value = function(d){
			    		return yScale(Math.max(0, d.Apr)); 
			    	};
			    	var height_value = function(d){
			    		return Math.abs(yScale(d.Apr) - yScale(0)); 
			    	};	
				}

				else if(value=="May"){
					var x_value = function(d){return d.May;};
					var color = function(d){return d.May < 0 ? "negative" : "positive";};
					var y_value = function(d){
			    		return yScale(Math.max(0, d.May)); 
			    	};
			    	var height_value = function(d){
			    		return Math.abs(yScale(d.May) - yScale(0)); 
			    	};	
				}

					else if(value=="July"){
					var x_value = function(d){return d.Jul;};
					var color = function(d){return d.Jul < 0 ? "negative" : "positive";};
					var y_value = function(d){
			    		return yScale(Math.max(0, d.Jul)); 
			    	};
			    	var height_value = function(d){
			    		return Math.abs(yScale(d.Jul) - yScale(0)); 
			    	};	
				}
					else if(value=="August"){
					var x_value = function(d){return d.Aug;};
					var color = function(d){return d.Aug < 0 ? "negative" : "positive";};
					var y_value = function(d){
			    		return yScale(Math.max(0, d.Aug)); 
			    	};
			    	var height_value = function(d){
			    		return Math.abs(yScale(d.Aug) - yScale(0)); 
			    	};	
				}

					else if(value=="September"){
					var x_value = function(d){return d.Sep;};
					var color = function(d){return d.Sep < 0 ? "negative" : "positive";};
					var y_value = function(d){
			    		return yScale(Math.max(0, d.Sep)); 
			    	};
			    	var height_value = function(d){
			    		return Math.abs(yScale(d.Sep) - yScale(0)); 
			    	};	
				}
					else if(value=="October"){
					var x_value = function(d){return d.Oct;};
					var color = function(d){return d.Oct < 0 ? "negative" : "positive";};
					var y_value = function(d){
			    		return yScale(Math.max(0, d.Oct)); 
			    	};
			    	var height_value = function(d){
			    		return Math.abs(yScale(d.Oct) - yScale(0)); 
			    	};	
				}

					else if(value=="November"){
					var x_value = function(d){return d.Nov;};
					var color = function(d){return d.Nov < 0 ? "negative" : "positive";};
					var y_value = function(d){
			    		return yScale(Math.max(0, d.Nov)); 
			    	};
			    	var height_value = function(d){
			    		return Math.abs(yScale(d.Nov) - yScale(0)); 
			    	};	
				}
					else if(value=="December"){
					var x_value = function(d){return d.Dec;};
					var color = function(d){return d.Dec < 0 ? "negative" : "positive";};
					var y_value = function(d){
			    		return yScale(Math.max(0, d.Dec)); 
			    	};
			    	var height_value = function(d){
			    		return Math.abs(yScale(d.Dec) - yScale(0)); 
			    	};	
				}

				//Update y scale
				yScale.domain(d3.extent(dataset, x_value));

				//Update with correct data
				var rect = svg.selectAll("rect").data(dataset, key);
				rect.exit().remove();

				//Transition chart to new data
				rect
				.transition()
				.duration(2000)
				.ease("linear")
				.each("start", function(){
					d3.select(this)
					.attr("width", "0.2")
					.attr("class", color)
				})
				.attr({
			    	x: function(d){
			    		return xScale(d.Year);
			    	},
			    	y: y_value,
			    	width: xScale.rangeBand(),
			    	height: height_value
							
				});

				//Update y-axis
				svg.select(".y.axis")
					.transition()
					.duration(1000)
					.ease("linear")
					.call(yAxis);
			});
		
	};

	//Load data and call bar chart function 
		d3.csv("data.csv", function(error,data){
				if(error){
					console.log(error);
				}
				else{
					data.forEach(function(d) {
						d.Mar = parseFloat(d.Mar);
						d.Jun = parseFloat(d.Jun);
						d.Jan=parseFloat(d.Jan);
						d.Feb=parseFloat(d.Feb);
						d.Apr=parseFloat(d.Apr);
						d.May=parseFloat(d.May);
						d.Jul=parseFloat(d.Jul);
						d.Aug=parseFloat(d.Aug);
						d.Sep=parseFloat(d.Sep);
						d.Oct=parseFloat(d.Oct);
						d.Nov=parseFloat(d.Nov);
						d.Dec=parseFloat(d.Dec);
					});
					dataset=data;
					barChart(dataset);
				}
			});

