(function() {

    // Array de Peças
    let pecas = [];
    let resposta = [];
    let inicioTela = document.querySelector("#telaInicial");
    inicioTela.addEventListener("click", iniciarJogo, false);
    let telaFinal = document.querySelector("#telaFinal");

    /**
     * Preenche o array de peças
     */
    function init() {
        for (var i = 1; i <= 9; i++) {
            if (i <= 3) {
                var peca = document.querySelector("#n" + i);
                peca.style.background = "url('img/peca_" + i + ".png')";
                peca.addEventListener("click", movePeca, false); // chama a movimentação da peça ao clicar            
                pecas.push(peca);
            } else if (i == 4) {
                peca = document.querySelector("#n" + (i+4));
                peca.style.background = "url('img/peca_" + (i+4) + ".png')";
                peca.addEventListener("click", movePeca, false); // chama a movimentação da peça ao clicar            
                pecas.push(peca);
            } else if (i == 5) {         
                pecas.push(null);
            } else if (i == 6) {
                peca = document.querySelector("#n" + (i-2));
                peca.style.background = "url('img/peca_" + (i-2) + ".png')";
                peca.addEventListener("click", movePeca, false); // chama a movimentação da peça ao clicar            
                pecas.push(peca);
            } else if (i == 9) {
                peca = document.querySelector("#n" + (i-4));
                peca.style.background = "url('img/peca_" + (i-4) + ".png')";
                peca.addEventListener("click", movePeca, false); // chama a movimentação da peça ao clicar            
                pecas.push(peca);
            } else if (i == 8) {
                peca = document.querySelector("#n" + (i-2));
                peca.style.background = "url('img/peca_" + (i-2) + ".png')";
                peca.addEventListener("click", movePeca, false); // chama a movimentação da peça ao clicar            
                pecas.push(peca);
            } else if (i == 7) {
                peca = document.querySelector("#n" + (i));
                peca.style.background = "url('img/peca_" + (i) + ".png')";
                peca.addEventListener("click", movePeca, false); // chama a movimentação da peça ao clicar            
                pecas.push(peca);
            }
        }

       // pecas.push(null);
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

        return arrayNovo;
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

        if (checaVitoria()) {
            finalJogo();
        }
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