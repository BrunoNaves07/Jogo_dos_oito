(function() {

    // Array de Peças
    let pecas = [];
    let inicioTela = document.querySelector("#telaInicial");
    inicioTela.addEventListener("click", iniciarJogo, false);


    /**
     * Preenche o array de peças
     */
    function init() {
        for (var i = 1; i < 9; i++) {
            var peca = document.querySelector("#n" + i);
            peca.style.background = "url('img/peca_" + i + ".png')";
            peca.addEventListener("click", movePeca, false); // chama a movimentação da peça ao clicar
            
            pecas.push(peca);
        }
        pecas.push(null);
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
        
        do {
            arrayNovo = [];
            while (arrayNovo.length < arrayAnterior.length) {
                var i = Math.floor(Math.random()*arrayAnterior.length); // retorna um valor entre 0 a 8
                if (arrayNovo.indexOf(arrayAnterior[i]) < 0) {
                    arrayNovo.push(arrayAnterior[i]);
                }
            }
        } while (!validaJogo(arrayNovo));

        return arrayNovo;
    }

    /**
     * Faz a validação do jogo, para que seja possível ser solucionado
     * @param {*} array 
     */
    function validaJogo(array) {
        var inversao = 0;
        var tam = array.length;

        for (var i = 0; i < tam - 1; i++) {
            for (var j = i+1; j < tam; j++) {
                if (array[i] && array[j] && array[i].dataset.valor < array[j].dataset.valor) {
                    inversao++;
                }
            }
        }
        return inversao%2 === 0;
    }


    /**
     * Inicia o Jogo
     */
    function iniciarJogo() {
        // Embaralha as Peças
        pecas = randomSort(pecas);

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
    }

    init();

}());