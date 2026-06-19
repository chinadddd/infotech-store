const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend funcionando!");
});

app.post("/criar-pagamento", async (req, res) => {

    try {

        console.log("1 - Requisição recebida");

        const itensCarrinho = req.body.items;

        console.log("2 - Carrinho:");
        console.log(JSON.stringify(itensCarrinho, null, 2));

        const itensInfinite = itensCarrinho.map(item => ({
            quantity: 1,
            price: Math.round(item.preco * 100),
            description: item.nome
        }));

        console.log("3 - Itens formatados:");
        console.log(JSON.stringify(itensInfinite, null, 2));

        const resposta = await axios.post(
            "https://api.checkout.infinitepay.io/links",
            {
                handle: "infotechstore",
                redirect_url: "http://localhost:5500/obrigado.html",
                items: itensInfinite
            }
        );

        console.log("4 - Resposta da InfinitePay:");
        console.log(resposta.data);

         res.json({
         sucesso: true,
        url: resposta.data.url
        });

    } catch (erro) {

        console.log("5 - Entrou no catch");

        console.error(
            JSON.stringify(
                erro.response?.data,
                null,
                2
            )
        );

        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao criar pagamento"
        });

    }

});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});