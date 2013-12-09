
<?php
/*
 * Todos os recursos deste script podem ser utilizados por apenas um usu�rio, por vez.
 */


    $distancias = json_decode($_POST['distancias']);
    $nomes = json_decode($_POST['nomes']);
    
    
    //Gerando arquivo distancias.json 
    $matriz['nomes'] = $nomes;
    $matriz['distancias'] = $distancias;
    
    $json_str = json_encode($matriz, JSON_PRETTY_PRINT);

    $fp = fopen('../../json/distancias.json', 'w');
    fwrite($fp, $json_str);
    fclose($fp);
    
    
    //Preparando o Grafo
    $graph = array('nodes' =>'', 'links' =>'', 'distancias' => '');
    
    for($i = 0; $i < count($nomes); $i++){
        $aux_nodes[] = array('node' => "$nomes[$i]");
        
        for($j = $i+1; $j < count($nomes); $j++){
            $aux_links[] = array('source' => $i, 'target' => $j, 'distancia' => $distancias[$j][$i]) ;                                
        }
        
    }
    
    $graph['nodes'] = $aux_nodes;
    $graph['links'] = $aux_links;
    
    //Gerando arquivo graph.json
    $json_str = json_encode($graph, JSON_PRETTY_PRINT);

    $fp = fopen('../../json/graph.json', 'w');
    fwrite($fp, $json_str);
    fclose($fp);

    

    $str_cmd = 'cd C:\Program Files\R\R-3.0.1\bin\x64 & Rscript.exe cod.r';
        exec($str_cmd);
		
		
    //Preparando o Grafo com links duplicados
    $graph2 = array('nodes' =>'', 'links' =>'');
    
    for($i = 0; $i < count($nomes); $i++){
        $aux_nodes2[] = array('node' => "$nomes[$i]");
        
        for($j = 0; $j < count($nomes); $j++){
            $aux_links2[] = array('source' => $i, 'target' => $j, 'distancia' => $distancias[$j][$i]) ;                                
        }
        
    }
    
    $graph2['nodes'] = $aux_nodes2;
    $graph2['links'] = $aux_links2;
    
    //Gerando arquivo graph.json
    $json_str = json_encode($graph2, JSON_PRETTY_PRINT);

    $fp = fopen('../../json/graphdup.json', 'w');
    fwrite($fp, $json_str);
    fclose($fp);
  

    
