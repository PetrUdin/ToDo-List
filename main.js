function todoStart() {
    const input = document.querySelector(".todo__input");
    const ul = document.querySelector(".todo__list");
    const saveBtn = document.querySelector(".todo__btn-save");
    const clearBtn = document.querySelector("button.clear");
    const showHelp = document.querySelector("button.showTips");
    const closeHelp = document.querySelector(".help__close");
    const helpBlock = document.querySelector(".help");
    const todoTitle = document.querySelector(".todo__title")
    let nowDate = new Date().toLocaleDateString();

    function createTodo() {
        const li = document.createElement("li");
        const textSpan = document.createElement("span");
        textSpan.classList.add("todo__text");
        const newTodo = input.value;
        textSpan.append(newTodo);

        const deleteBtn = document.createElement("span");
        deleteBtn.classList.add("trash-ico");
        deleteBtn.innerHTML = "&times;";
        ul.appendChild(li).append(textSpan, deleteBtn);
        input.value = "";
        listenDeleteTodo(deleteBtn);
    };

    /*Удаление элемента*/

    function listenDeleteTodo(elem) {
        elem.addEventListener("click", () => {
            elem.parentElement.remove();
        });
    };

    /*Зачеркивает пункт как выполненный*/
    function onClickTodo(event) {
        if (event.target.tagName === "LI") {
            event.target.classList.toggle("checked");
        }
    }
    ul.addEventListener("click", onClickTodo);

    /*загрузка сохраненных из storage*/

    function loadTodos() {
        const data = localStorage.getItem("todo__list");
        if (data) {
            ul.innerHTML = data;
        }
        const deleteButtons = document.querySelectorAll("span.todo-trash");
        for (const button of deleteButtons) {
            listenDeleteTodo(button);
        }
    }
    loadTodos();


    /*Действия кнопок*/

    saveBtn.addEventListener("click", () => {
        localStorage.setItem("todo__list", ul.innerHTML);
    });
    clearBtn.addEventListener("click", () => {
        ul.innerHTML = "";
        localStorage.removeItem('todo__list', ul.innerHTML);
    });
    showHelp.addEventListener("click", () => {
        helpBlock.classList.toggle("active");
    });
    closeHelp.addEventListener("click", () => {
        helpBlock.classList.toggle("active");
    });

    document.addEventListener("click", function (event) {
        if (event.target == helpBlock) {
            helpBlock.classList.toggle("active");
        }
    });
    input.addEventListener("keypress", (keyPressed) => {
        const keyEnter = 13;
        if (keyPressed.which == keyEnter) {
            createTodo();
        }
    });
    todoTitle.append(nowDate);

};


document.addEventListener("DOMContentLoaded", todoStart);
