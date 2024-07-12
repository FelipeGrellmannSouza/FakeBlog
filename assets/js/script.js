// https://jsonplaceholder.typicode.com/posts
async function readPosts() {
    let postArea = document.querySelector('.posts');
    postArea.innerHTML = 'Carregando...'

    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let json = await response.json();

    if(json.length > 0) {
        postArea.innerHTML = '';

        for (let i in json) {
            let postHtml = `<di><h1>${json[i].title}</h1>${json[i].body}<hr></div>`
            postArea.innerHTML += postHtml; //append seria melhor dimensionado
        }
    } else {
        postArea.innerHTML = 'Nenhum post para exibir'
    }
}

async function createPost(title, body) {  
    await fetch(
        'https://jsonplaceholder.typicode.com/posts', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                title: title,
                body: body,
                userId: 2
            })
        }
    );
    document.querySelector('#titleField').value = '';
    document.querySelector('#bodyField').value = '';

    readPosts();
}


document.querySelector('#insertButton').addEventListener('click', () => {
    let title = document.querySelector('#titleField').value;
    let body = document.querySelector('#bodyField').value;

    if (body && title) {
        createPost(title, body)
    } else {
        alert('preencha todos os campos'); 
    }
});
readPosts(); 