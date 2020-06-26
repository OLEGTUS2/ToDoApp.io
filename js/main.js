    let tasks = [];

    const form = document.querySelector('#newTaskForm'),
        tasksList = document.querySelector('#tasksList');

    if (localStorage.getItem('tasks')) {

        tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach((item) => {

            const taskHTML = `

            <li class="list-group-item d-flex justify-content-between">
                <span class="task-title">${item}</span>
                <button type="button" data-action="delete-task" class="btn btn-light align-self-end">Удалить</button>
            </li>
        `;

            tasksList.insertAdjacentHTML('afterbegin', taskHTML);
        });
    }

    const createAlertTemplate = (text, color) => {
        return(
          `<div class="alert alert-${color}" role="alert">
          ${text}
          </div>`
        );
      };
      
      const makeAlert = (type) => {
        switch(type) {
          case 'empty':
            return createAlertTemplate(EMPTY_ALERT, 'dark');
          case 'added':
            return createAlertTemplate(ADDED_ALERT, 'success');
          case 'deleted':
            return createAlertTemplate(DELETED_ALERT, 'danger');
        }
      };
      
      const insertAlert = (type) => {
        const empty = makeAlert(type);
          tasksContainer.insertAdjacentHTML('beforebegin', empty);
      };

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const taskInput = document.querySelector('#addNewTask'),
            taskText = taskInput.value;

        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        const taskHTML = `
            <li class="list-group-item d-flex justify-content-between">
                <span class="task-title">${taskText}</span>
                <button type="button" data-action="delete-task" class="btn btn-light align-self-end">Удалить</button>
            </li>
        `;

        tasksList.insertAdjacentHTML('afterbegin', taskHTML);
        taskInput.value = '';

    });

    tasksList.addEventListener('click', (event) => {
        if (event.target.getAttribute('data-action') == 'delete-task') {

            const taskText = event.target.closest('li').querySelector('.task-title').textContent;
            const taskIndex = tasks.indexOf(taskText);
            tasks.splice(taskIndex, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            event.target.parentElement.remove();
        }
    });