            var data = [];
            var circles = document.getElementsByTagName("circle");
            for(i = 0; i < circles.length; i++){
                var file = {
                    label: circles.item(i).attributes[1].value,
                    x: circles.item(i).attributes[2].value,
                    y: circles.item(i).attributes[3].value
                };
                data.push(file);
            }
            
            var matriz = [];
            for(i = 0; i < data.length; i++){
                var distancias = [];
                for(j = 0; j < data.length; j++){
                    var p = Math.pow((data[i].x - data[j].x), 2);
                    var q = Math.pow((data[i].y - data[j].y), 2);
                    var d = Math.sqrt(p+q);
                    distancias[j] = parseInt(d);
                }

                matriz.push(distancias);
            }
            
            d3.select("body").append("div")
                .attr("id", "tabela");
        
            d3.select("#tabela")
                .append("table")
                .style("border-collapse", "collapse")
                .style("border", "2px black solid")

                .selectAll("tr")
                .data(matriz)
                .enter().append("tr")

                .selectAll("td")
                .data(function(d){return d;})
                .enter().append("td")
                .style("border", "1px black solid")
                .style("padding", "5px")
                .text(function(d){return d;})
                .style("font-size", "12px");