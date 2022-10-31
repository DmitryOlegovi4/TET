// modal
const instructionElem = document.getElementById('instruction');
instructionElem.addEventListener('click', function () {
    const modal = document.querySelector('.modal_wrapper');
    modal.classList.add('open_modal');

    const closeBtn = modal.querySelector('.closeModal');
    closeBtn.addEventListener('click',  ()=>{
        modal.classList.remove('open_modal');
    })
    const modal_body = modal.querySelector('.modal_body');
    modal_body.addEventListener('click',  (e)=>{
        e.stopPropagation();
    })
    modal.addEventListener('click',  ()=>{
        modal.classList.remove('open_modal');
    })
})

let infoUser = document.getElementById("infoUser");
let userLogin = document.getElementById("userLogin");
let userCoins = document.getElementById("userCoins");
let userProduct = document.getElementById("userProduct");
let userId;
let saleOptionsBtnArr = document.querySelectorAll('.sale-options-item_btn')
saleOptionsBtnArr.forEach((btn) => btn.addEventListener('click', buyProduct));

// отправка формы
function sendForm(form) {
    let formData = new FormData(form);
    fetch("/",{
        method: "post",
        body: formData
    }).then(response => response.json())
        .then(result => {
            if(result.login){
                userLogin.innerText = "Login: " + result.login;
                userCoins.innerText = result.coins;
                infoUser.innerText = '';
                userId = result.id;
                if(result.products){
                    userProduct.style.display = 'block';
                    userProduct.children[1].innerHTML = result.products;
                }else{
                    userProduct.style.display = 'none';
                    userProduct.children[1].innerHTML = '';
                }
                resetBtns();
                setValInBtn(saleOptionsBtnArr, result.productsId);
            }else if(result.error){
                infoUser.innerText = result.error;
                userLogin.innerText = '';
                userCoins.innerText = '0';
                userId = '';
                userProduct.style.display = 'none';
                resetBtns();
            }
        })
}
function setValInBtn(collectionNode, productsId = []) {
    collectionNode.forEach((elem,i)=>{
        if(productsId.includes(i+1)){
            elem.classList.add('used');
            elem.innerHTML = 'Уже <br> использовано';
            elem.removeEventListener('click',buyProduct);
        }
    })
}
function resetBtns() {
    document.querySelectorAll('.used').forEach(elem=>{
            elem.classList.remove('used');
            elem.innerHTML = 'Использовать <br> скидку';
            elem.addEventListener('click',buyProduct);
        }
    )
}


// приобретение товаров
function buyProduct(e) {
    e.preventDefault();
    if(+userCoins.innerText > +e.target.parentNode.querySelector('.sale-options-item_price span').innerText){
        if(userId){
            const currentNode = e.target.parentNode;
            const parentNode = currentNode.parentNode;
            let id = [...parentNode.children].indexOf(currentNode) + 1;
            fetch("/product",{
                method: "post",
                body:  JSON.stringify({product_id: id, user_id: userId})
            }).then(response => response.json())
                .then(result => {
                    userCoins.innerText = +userCoins.innerText - result.coins;
                    userProduct.style.display = 'block';
                    userProduct.children[1].innerHTML = result.products;
                    resetBtns();
                    setValInBtn(saleOptionsBtnArr, result.productsId);
                })
        } else(
            alert('You need to log in')
        )
    }else{
        alert('У вас недостаточно coins')
    }
}