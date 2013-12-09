    nPixels = 600; //Quantidade de pixels do quadro.
    var margens = {top: 10, right: 10, bottom: 60, left: 60};

    var width = nPixels - margens.left - margens.right;
    var height = nPixels - margens.top - margens.bottom;

    var svg = d3.select("#svg_plot")
                .append("svg")
                .attr("width", width + margens.left + margens.right)
                .attr("height", height + margens.top + margens.bottom)
                .append("g")
                .attr("transform", "translate("+margens.left+","+margens.top+")");

    var force = d3.layout.force()
                .size([width, height])
                .charge(-100)
                .linkDistance(function(x){
                        return x.distancia;//*1.17; //Constante de Padding
                });
                //.charge(-3000) //Charge e LinkDistance s√£o inversamente proporcionais
    

    d3.json("http://127.0.0.1/projeto_fdp_mds/json/graph.json", function(data){

        force.nodes(data.nodes)
                 .links(data.links)
                 .on("tick", tick)
                 .start();

        //var radius = d3.scale.sqrt()
        //.range([0, 6]);

        var node = svg.selectAll(".node")
                      .data(data.nodes)
                      .enter()
                      .append("g")
                      .attr("class", "node");

        node.call(force.drag);

        node.append("circle").attr("r", 5)
                             .attr("id", function(d, i){
                                     return d.node;
                             })
                             .style("fill", "black")
                             .style("fill-opacity", .4);
                            //.style("stroke", "#FFF")
                            //.style("stroke-width", 3);

        node.append("text").style("font-size", "10px")
                           .style("fill", "black")
                           .style("fill-opacity", 1)
                           .attr("text-anchor", "top")
                           .text(function(d) { return d.node; });

        var link = svg.selectAll(".link")
                      .data(data.links)
                      .enter().append("line")
                      .attr("class", "link")
                      .style("stroke-width", 15);


        //.style("stroke-width", function(d){ if(d.distancia < 100){return 2;}else{ return 0;}});



        function tick(){
                link.attr("x1", function(d) { return d.source.x; })
                        .attr("y1", function(d) { return d.source.y; })
                        .attr("x2", function(d) { return d.target.x; })
                        .attr("y2", function(d) { return d.target.y; });

                node.attr("transform", function(d){
                        return "translate("+d.x+ ","+d.y+")";
                });
        }

    /*
    * 
    *  			CALCULANDO O STRESS 
    * 
    */ 
        //VERIFICAR INFLU NCIA DA ANIMA«√O.(ok)
        
        document.getElementById("calc_stress").onclick = function (){
            force.stop();
            var nodes_st = force.nodes();
            var links_st = force.links(); 
            var distancias = [];
            var stress  = 0;
            var sum = 0;
            
            for(i = 0; i < nodes_st.length; i++){
                for(j = i+1; j < nodes_st.length; j++){
                    var p = Math.pow((nodes_st[i].x - nodes_st[j].x), 2);
                    var q = Math.pow((nodes_st[i].y - nodes_st[j].y), 2);
                    var d = Math.sqrt(p+q);
                    var l = {
                        source: nodes_st[i].node,
                        target: nodes_st[j].node,
                        distance: parseInt(d)  
                    };

                    distancias.push(l);
                }
            }
                
            //OBTER STRESS << DISTANCIAS x LINKS_ST.DISTANCIA
            for(i = 0; i < links_st.length; i++){
                stress = stress+ Math.pow((links_st[i].distancia - distancias[i].distance), 2);
               // console.log("Original: "+links_st[i].source +","+links_st[i].target+
                 //           "\nPlotado: "+distancias[i].source+","+distancias[i].target);
            }
            for(i = 0; i< links_st.length; i++){
                sum = sum + Math.pow(links_st[i].distancia, 2);
            }
            stress = Math.sqrt(stress/sum);
            d3.select("#resultado")
                    .append("p")
                    .attr("id", "resultado")
                    .style("float", "bottom")
                    .text("Stress: "+ stress);
        };
        
    });


    
    




			    
	
				
