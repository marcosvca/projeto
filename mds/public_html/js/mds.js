
d3.json("projeto_fdp_mds/json/mds.json", function(data){
    
    nPixels = 500; //Quantidade de pixels do quadro.
    var margens = {top: 10, right: 10, bottom: 60, left: 60};
    
    var width = nPixels - margens.left - margens.right;
    var height = nPixels - margens.top - margens.bottom;
    
    var svg = d3.select("body")
                .append("svg")
                .attr("width", width + margens.left + margens.right)
                .attr("height", height + margens.top + margens.bottom)
                .append("g")
                .attr("transform", "translate("+margens.left+","+margens.top+")");
    

    
//Definindo as Escalas
    
    //Capturando o domínio
    var min_x = d3.min(data.X, function(d){return d.x;});       
    var max_x = d3.max(data.X, function(d){return d.x;});
    
    var min_y = d3.min(data.X, function(d){return d.y;}); 
    var max_y = d3.max(data.X, function(d){return d.y;});
    
    
    //Obtendo as escalas
    var escala_x = d3.scale.linear()
                     .domain([min_x, max_x])
                     .range([0, width])
                     .nice();
             
    var escala_y = d3.scale.linear()
                     .domain([min_y, max_y])
                     .range([height, 0])
                     .nice();
    
    
//Plotando os objetos no svg
    
    //Criando os pontos
    var pontos = svg.selectAll(".datapoint")
                    .data(data.X).enter()
                    .append("circle")
                    .attr("class", "datapoint")
                    .attr("cx", function(d){ return escala_x(d.x)})
                    .attr("cy", function(d){ return escala_y(d.y)})
                    .attr("r", 3);

    //Definindo e Criando os Eixos

        //Eixo X
        var eixoX = d3.svg.axis()
                      .scale(escala_x)
                      .orient("bottom")
                      .ticks(5);
              
        svg.append("g").call(eixoX)
                       .attr("class", "axis")
                       .attr("transform", "translate(0,"+ height +" )");
        
        //Espaço entre os eixos
        var padding = -5;
        
        //Eixo Y
        var eixoY = d3.svg.axis()
                      .scale(escala_y)
                      .orient("left")
                      .ticks(5);
        
        
        svg.append("g").call(eixoY)
                       .attr("class", "axis")
                       .attr("transform", "translate("+ padding +",0)");

    //Definindo e plotando os rótulos
    var elevacao = -4;
    var labels = svg.selectAll(".labels")
                    .data(data.X).enter()
                    .append("text")
                    .attr("class", "labels")
                    .attr("x", function (d){return escala_x(d.x);})
                    .attr("y", function (d){return escala_y(d.y)+elevacao;})
                    .text(function(d, i){return data.nomes[i];}); 
});

