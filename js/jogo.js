(function() {

    // Array de Peças
    let entradas = [1,2,3,8,0,4,7,6,5];
    let saidas = [];
    let pecas = [];
    let resposta = [];
    let estadoInicial, estadoFinal;
    let inicioTela = document.querySelector("#telaInicial");
    inicioTela.addEventListener("click", iniciarJogo, false);
    let telaFinal = document.querySelector("#telaFinal");

    /**
     * Preenche o array de peças
     */
    function init() {

        entradas.forEach(function(e) {

            if (e == 0) {        
                pecas.push(peca);
            } else {
                var peca = document.querySelector("#n" + e);
                peca.style.background = "url('img/peca_" + e + ".png')";
                peca.addEventListener("click", movePeca, false); // chama a movimentação da peça ao clicar            
                pecas.push(peca);
            }

        });

        estadoFinal = convertePecasParaMatriz(pecas);
        // console.log(estadoFinal);
        resposta = pecas;

        render();
    }


    /**
     * Desenha as peças na tela
     */
    function render() {
        for (var i in pecas) {
            var peca = pecas[i];

            if (peca) {
                peca.style.left = (i%3) * 100 + 5 + "px";
                if (i < 3) {
                    peca.style.top = "5px";
                } else if (i < 6) {
                    peca.style.top = "105px";
                } else {
                    peca.style.top = "205px";
                }
            }
        }
    }

    /**
     * Função de EMbaralhamento
     * @param {*} arrayAnterior 
     */
    function randomSort(arrayAnterior) {
        var arrayNovo;
        
        arrayNovo = [];
        while (arrayNovo.length < arrayAnterior.length) {
            var i = Math.floor(Math.random()*arrayAnterior.length); // retorna um valor entre 0 a 8
            if (arrayNovo.indexOf(arrayAnterior[i]) < 0) {
                arrayNovo.push(arrayAnterior[i]);
            }
        }

        for (var i = 0; i < arrayNovo.length; i++) {
            if (typeof arrayNovo[i] === 'undefined') {
                saidas[i] = 0;
            } else {
                saidas[i] = parseInt(arrayNovo[i].dataset.valor);
            }
            
        }
        estadoInicial = convertePecasParaMatriz(arrayNovo);
        // console.log(estadoInicial);
        return arrayNovo;
    }

    /**
     * Inicia o Jogo
     */
    function iniciarJogo() {
        // Embaralha as Peças
        pecas = randomSort(pecas);
        movimentosPossiveis(convertePecasParaMatriz(pecas));

        this.style.opacity = '0';
        this.style.zIndex = '-1';
        this.removeEventListener("click", iniciarJogo, false);
        
        render();
    }

    /**
     * Faz a movimentação da peça
     */
    function movePeca() {
        var index = pecas.indexOf(this);

        if (index % 3 !== 0) {
            if (!pecas[index-1]) {
                pecas[index-1] = this;
                pecas[index] = null;
            }
        }

        if (index % 3 !== 2) {
            if (!pecas[index+1]) {
                pecas[index+1] = this;
                pecas[index] = null;
            }
        }

        if (index > 2) {
            if (!pecas[index-3]) {
                pecas[index-3] = this;
                pecas[index] = null;
            }
        }

        if (index < 6) {
            if (!pecas[index+3]) {
                pecas[index+3] = this;
                pecas[index] = null;
            }
        }

        render();
        // console.log(convertePecasParaMatriz(pecas));
        // console.log(manhattan(estadoFinal, convertePecasParaMatriz(pecas)));


        if (checaVitoria()) {
            finalJogo();
        }
    }

    /**
     * Converte pecas para matriz
     */
    function convertePecasParaMatriz(pecas) {
        const matriz = [[],[],[]];

        for (var i in pecas) {
            matriz[parseInt(i/3)].push(pecas[i] ? parseInt(pecas[i].id[1]) : 0);
        }
        return matriz;
    }

    /**
     * Retorna a soma das distâncias entre cada peça e o seu local ideal
     */
    function manhattan(matrizDesejada, matrizAtual) {
        let peso = 0;

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                posicaoDaPeca = localizarPeca(matrizDesejada[i][j], matrizAtual);
                peso += Math.abs(posicaoDaPeca[0] - i) + Math.abs(posicaoDaPeca[1] - j);
            }
        }

        return peso;
    }

    /**
     * Localiza a posição da peça na matriz
     */
    function localizarPeca(numeroPeca, matrizAtual) {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (matrizAtual[i][j] === numeroPeca)
                    return [i, j];
            }
        }
    }

    function movimentosPossiveis(matrizAtual) {
        const posicao = localizarPeca(0, matrizAtual);
        const i = posicao[0];
        const j = posicao[1];

        var matrizesPossiveis = [];

        if (i > 0) {
            var copiaMatriz = copiarMatriz(matrizAtual);
            copiaMatriz[i][j] = copiaMatriz[i-1][j];
            copiaMatriz[i-1][j] = 0;
            matrizesPossiveis.push(copiaMatriz);
        }

        if (i < 2) {
            var copiaMatriz = copiarMatriz(matrizAtual);
            copiaMatriz[i][j] = copiaMatriz[i+1][j];
            copiaMatriz[i+1][j] = 0;
            matrizesPossiveis.push(copiaMatriz);
        }

        if (j > 0) {
            var copiaMatriz = copiarMatriz(matrizAtual);
            copiaMatriz[i][j] = copiaMatriz[i][j-1];
            copiaMatriz[i][j-1] = 0;
            matrizesPossiveis.push(copiaMatriz);
        }

        if (j < 2) {
            var copiaMatriz = copiarMatriz(matrizAtual);
            copiaMatriz[i][j] = copiaMatriz[i][j+1];
            copiaMatriz[i][j+1] = 0;
            matrizesPossiveis.push(copiaMatriz);
        }

        console.log('Movimentos possíveis: ', matrizesPossiveis);
    }

    function copiarMatriz (matrizOriginal) {
        var novaMatriz = [[], [], []];
        novaMatriz[0] = [...matrizOriginal[0]];
        novaMatriz[1] = [...matrizOriginal[1]];
        novaMatriz[2] = [...matrizOriginal[2]];

        return novaMatriz;
    }

    /**
     * Checa se houve vitória
     */
    function checaVitoria() {
        for (var i in pecas) {
            var a = pecas[i];
            var b = resposta[i];

            if (a !== b) {
                return false;
            }
        }
        return true;
    }


    function finalJogo() {

        telaFinal.style.opacity = '1';
        telaFinal.style.zIndex = '1';
        setTimeout(function(){
            telaFinal.addEventListener("click", iniciarJogo, false);
        },500)
    }



    init();

}());