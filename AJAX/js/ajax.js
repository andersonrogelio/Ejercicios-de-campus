(() => {
    const xhr = new XMLHttpRequest();
    $xhr = document.getElementById("xhr");
    $fragment = document.createDocumentFragment();

    xhr.addEventListener("readystatechange",e => {});

    xhr.open("GET","https://jsonplaceholder.typicode.com/users");

    xhr.send();
})();