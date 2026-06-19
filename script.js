// =====================================
// INFOTECH STORE
// =====================================

// CONTADOR DE VISITANTES

const visitantes = document.createElement("div");

visitantes.innerHTML =
"🔥 <strong>12 pessoas</strong> estão vendo este produto agora";

visitantes.style.position = "fixed";
visitantes.style.bottom = "20px";
visitantes.style.left = "20px";
visitantes.style.background = "#111";
visitantes.style.color = "#fff";
visitantes.style.padding = "12px 18px";
visitantes.style.borderRadius = "10px";
visitantes.style.zIndex = "999";
visitantes.style.boxShadow = "0 0 15px rgba(0,200,255,.5)";

document.body.appendChild(visitantes);

if(window.innerWidth < 768){

    visitantes.style.display = "none";

}

setInterval(() => {

    const numero = Math.floor(Math.random() * 20) + 5;

    visitantes.innerHTML =
    `🔥 <strong>${numero} pessoas</strong> estão vendo este produto agora`;

}, 8000);


// =====================================
// CARRINHO
// =====================================

let carrinho = [];
let total = 0;

const carrinhoSalvo =
localStorage.getItem("carrinho");

const totalSalvo =
localStorage.getItem("total");

if(carrinhoSalvo){

    carrinho =
    JSON.parse(carrinhoSalvo);

}

if(totalSalvo){

    total =
    parseFloat(totalSalvo);

}

const badge =
document.getElementById("badgeCarrinho");
if(window.innerWidth < 768){

    badge.style.top = "95px";
    badge.style.right = "10px";
    badge.style.padding = "10px 14px";

}

const cartItems =
document.getElementById("cartItems");

const cartTotal =
document.getElementById("cartTotal");

const botoes =
document.querySelectorAll(".btn-comprar");

botoes.forEach(botao => {

    botao.addEventListener("click", () => {

        const produto =
        botao.closest(".produto, .produto-info");

        const nome =
        produto.querySelector("h3, h2").innerText;

        let precoTexto;

        if(produto.querySelector(".preco-atual")){

            precoTexto =
            produto.querySelector(".preco-atual")
            .innerText;

        }else{

            precoTexto =
            produto.querySelector(".preco")
            .innerText;
        }

        const preco = parseFloat(
            precoTexto
            .replace("R$","")
            .replace(".","")
            .replace(",",".")
        );

        carrinho.push({
            nome,
            preco
        });

        total += preco;

        atualizarCarrinho();

        mostrarNotificacao(
            "Produto adicionado ao carrinho!"
        );

    });

});

function atualizarCarrinho(){

    badge.innerHTML = `🛒 ${carrinho.length}`;

    cartItems.innerHTML = "";

    carrinho.forEach((item, index) => {

        const produto = document.createElement("div");

        produto.classList.add("cart-product");

        produto.innerHTML = `
            <h4>${item.nome}</h4>
            <p>R$ ${item.preco.toFixed(2)}</p>

            <button class="remover-item"
                    onclick="removerItem(${index})">
                ❌ Remover
            </button>
        `;

        cartItems.appendChild(produto);
        localStorage.setItem(
    "carrinho",
    JSON.stringify(carrinho)
);

localStorage.setItem(
    "total",
    total
);

    });

    cartTotal.innerHTML =
    `R$ ${total.toFixed(2)}`;
}

function removerItem(index){

    total -= carrinho[index].preco;

    carrinho.splice(index, 1);

    atualizarCarrinho();

}


// =====================================
// NOTIFICAÇÃO
// =====================================

function mostrarNotificacao(texto){

    const notificacao = document.createElement("div");

    notificacao.innerHTML = texto;

    notificacao.style.position = "fixed";
    notificacao.style.top = "120px";
    notificacao.style.right = "20px";
    notificacao.style.background = "#00c8ff";
    notificacao.style.color = "#000";
    notificacao.style.padding = "15px 25px";
    notificacao.style.borderRadius = "12px";
    notificacao.style.fontWeight = "700";
    notificacao.style.zIndex = "9999";

    document.body.appendChild(notificacao);

    setTimeout(() => {

        notificacao.remove();

    }, 2500);

}


// =====================================
// ANIMAÇÃO AO ROLAR
// =====================================

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if(entry.isIntersecting){

            entry.target.classList.add("mostrar");

        }

    });

});

const elementos = document.querySelectorAll(
    ".card, .produto, .depoimento"
);

elementos.forEach((el) => {

    el.classList.add("escondido");

    observer.observe(el);

});


// =====================================
// BOTÃO WHATSAPP
// =====================================

const whatsapp = document.createElement("a");

whatsapp.href =
"https://wa.me/5521971243194";

whatsapp.target = "_blank";

whatsapp.innerHTML = "💬";

whatsapp.style.position = "fixed";
whatsapp.style.bottom = "20px";
whatsapp.style.right = "20px";
whatsapp.style.width = "65px";
whatsapp.style.height = "65px";
whatsapp.style.display = "flex";
whatsapp.style.alignItems = "center";
whatsapp.style.justifyContent = "center";
whatsapp.style.fontSize = "30px";
whatsapp.style.textDecoration = "none";
whatsapp.style.background = "#25D366";
whatsapp.style.borderRadius = "50%";
whatsapp.style.zIndex = "9999";
whatsapp.style.boxShadow = "0 0 20px rgba(37,211,102,.6)";

document.body.appendChild(whatsapp);


// =====================================
// CONTADOR REGRESSIVO
// =====================================

const contador = document.createElement("div");

contador.style.position = "fixed";
contador.style.top = "150px";
contador.style.left = "20px";
contador.style.background = "#ff3d3d";
contador.style.color = "#fff";
contador.style.padding = "15px";
contador.style.borderRadius = "10px";
contador.style.fontWeight = "700";
contador.style.zIndex = "999";

document.body.appendChild(contador);

if(window.innerWidth < 768){

    contador.style.display = "none";

}

let horas = 5;
let minutos = 59;
let segundos = 59;

setInterval(() => {

    segundos--;

    if(segundos < 0){

        segundos = 59;
        minutos--;

    }

    if(minutos < 0){

        minutos = 59;
        horas--;

    }

    contador.innerHTML =
    `⏳ Oferta termina em ${horas}h ${minutos}m ${segundos}s`;

},1000);

// ======================
// CHECKOUT
// ======================

const checkoutBtn =
document.querySelector(".checkout-btn");

const checkoutModal =
document.getElementById("checkoutModal");

const closeCheckout =
document.getElementById("closeCheckout");

checkoutBtn.addEventListener("click", async () => {

    try {

        const resposta = await fetch(
            "https://infotech-store.onrender.com/criar-pagamento",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    items: carrinho
                })
            }
        );

        const dados = await resposta.json();

console.log(dados);

if (dados.url) {

    window.location.href = dados.url;

} else {

    alert("Erro ao gerar pagamento");

}

    } catch (erro) {

        console.error(erro);

        alert("Erro ao conectar com o backend");

    }

});










const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

badge.style.cursor = "pointer";

badge.addEventListener("click", () => {
    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");
});

cartOverlay.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");
});


atualizarCarrinho();