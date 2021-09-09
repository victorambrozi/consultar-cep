const button = document.querySelector("#button");
const zipCodeField = document.querySelector("#cep");
const dataZipCode = document.querySelector(".data");

button.addEventListener("click", event => {
    event.preventDefault();

    let zipCodeValue = zipCodeField.value;

    // limpando o cep
    zipCodeValue = zipCodeValue.replace(' ', '');
    zipCodeValue = zipCodeValue.replace('.', '');
    zipCodeValue = zipCodeValue.replace('-', '');
    zipCodeValue = zipCodeValue.trim();

    function createLine(text) {
        const publicPlace = document.createElement("p");

        publicPlace.innerHTML = text;
        dataZipCode.appendChild(publicPlace);
    }
    axios.get(`https://viacep.com.br/ws/${zipCodeValue}/json/`)
        .then(response => {
            if (response.data.erro) {
                throw new Error("CEP inválido");
            }
            
            dataZipCode.innerHTML = '';

            createLine(response.data.logradouro);
            createLine(`${response.data.localidade}, ${response.data.uf}`);
            createLine(response.data.bairro);

        })
        .catch(error => {
            dataZipCode.innerHTML = '';

            createLine("Digite um CEP válido");
            console.log(error)
        })

});
