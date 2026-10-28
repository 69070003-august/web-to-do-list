document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input");
    const addBtn = document.getElementById("add-btn");
    const todoList = document.getElementById("todo-list");

    function loadTodos() {
        const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        
        todoList.innerHTML = "";

        savedTodos.forEach(todoText => {
            createTodoItem(todoText);
        });
    }


    function saveTodos() {
        const items = [];
        const spans = todoList.querySelectorAll("li span");
        spans.forEach(span => {
            items.push(span.textContent);
        });
        localStorage.setItem("todos", JSON.stringify(items));
    }

    function createTodoItem(text) {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = text;

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "ลบ";

        deleteBtn.addEventListener("click", () => {
            li.remove();
            saveTodos();
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    }

    // เหตุการณ์เมื่อคลิกปุ่ม "เพิ่ม"
    addBtn.addEventListener("click", () => {
        const text = todoInput.value.trim();
        if (text === "") {
            alert("กรุณากรอกข้อมูลสิ่งที่ต้องทำ");
            return;
        }

        createTodoItem(text);
        saveTodos(); // บันทึกข้อมูลลง Local Storage หลังเพิ่ม
        
        todoInput.value = ""; // ล้างช่องพิมพ์ให้ว่าง
        todoInput.focus();
    });

    // รองรับการกดปุ่ม Enter ในช่องกรอกข้อมูล
    todoInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addBtn.click();
        }
    });

    // โหลดข้อมูลเมื่อเริ่มต้นทำงาน
    loadTodos();
});