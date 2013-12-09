require(RJSONIO)
require(graphics)
file <- "C:\\Program Files (x86)\\EasyPHP-DevServer-13.1VC11\\data\\localweb\\projeto_fdp_mds\\json\\distancias.json"
data <- fromJSON(paste(readLines(file), collapse=""))

#Convertendo os dados para um objeto de distâncias
x <- matrix(unlist(data$distancias), nrow = length(data$distancias))
dis <- x
n <- as.vector(data$nomes) #Trocar $cities para NOMES dos arquivos
rownames(x)<- n
colnames(x)<- n
x.dist <- as.dist(x, diag = TRUE, upper = FALSE)



fit<- cmdscale(x.dist)
x <- fit[, 1]
y <- -fit[, 2] #Inversão para que o NORTE seja no topo. (UTLIZANDO -1)

#Plot para teste
#plot(x, y, type = "n", xlab = "", ylab = "", asp = 1, axes = TRUE,
#     main = "Teste")
#text(x, y, rownames(fit), cex = .7)


teste <- fit
rownames(teste)<- n
colnames(teste) <- c("x", "y")
teste[,2] = -teste[,2]


js <- toJSON(teste, pretty = TRUE)
nom = paste("{\"X\": \n", js , sep="")


js <- toJSON(dis, pretty = TRUE)
nom = paste(nom, ",\n \"distancias\":\t", sep="")
nom = paste(nom, js, sep="")

js <- toJSON(n, pretty= TRUE)
nom = paste(nom, ",\n \"nomes\":\t", sep="")
nom = paste(nom, js, sep="")

nom = paste(nom, "\n }", sep="")

#teste
d = fromJSON(nom)

file <- "C:\\Program Files (x86)\\EasyPHP-DevServer-13.1VC11\\data\\localweb\\projeto_fdp_mds\\json\\mds.json"
write(nom, file, append=FALSE)