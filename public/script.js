let addNewTask = document.getElementById("add-new-task-btn");
let sortByStatus = document.getElementById("sort-by-status");
let sortBydueDate = document.getElementById("sort-by-dueDate");
let sortByPriority = document.getElementById("sort-by-priority");
let backgroundCurtain = document.getElementById("background-curtain");
let editCurtain = document.getElementById("background-curtain-edit");
let noteCurtain = document.getElementById("background-curtain-note");
let taskInput = document.getElementById("task-input");
let taskEdit = document.getElementById("task-edit");
let particularTaskContainer = document.getElementById(
  "particularTaskContainer"
);
let addNewTaskBtn = document.getElementById("add-btn");
let addNoteBtn = document.getElementById("add-note-btn");
let addNewTaskForm = document.forms["addNewTask"];
let editTaskForm = document.forms["editTask"];
let addNewNoteForm = document.forms["addNewNote"];
let tbody = document.getElementById("tbody");
let tbodyOfParticularTask = document.getElementById("tbodyOfParticularTask");
let tbodyForNotes = document.getElementById("tbodyForNotes");
let editTaskBtn = document.getElementById("edit-btn");
let cardTitle = document.getElementById("card-title");
let id;
let taskid;

document.onload = initializer();

async function initializer() {
  let tasks = await getAllTasks();
  tasks.forEach((element) => {
    let keys = ["id", "title", "description", "dueDate", "status", "priority"];
    let tr = document.createElement("tr");
    let ctr = tbody.appendChild(tr);
    keys.forEach((key) => {
      let td = document.createElement("td");
      td.textContent = element[key];
      ctr.appendChild(td);
    });
    let td = document.createElement("td");
    let span1 = document.createElement("button");
    let span2 = document.createElement("button");
    span1.onclick = editTr;
    span2.onclick = deleteTr;
    span1.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="edit" class="svg-inline--fa fa-edit fa-w-18" role="img" viewBox="0 0 576 512"><path fill="currentColor" d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"/></svg>';
    span2.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"/></svg>';
    td.appendChild(span1);
    td.appendChild(span2);

    ctr.appendChild(td);
  });
  addRowHandlers();
}

function addRowHandlers() {
  let rows = tbody.getElementsByTagName("tr");
  for (i = 0; i < rows.length; i++) {
    var currentRow = tbody.rows[i];
    var createClickHandler = function (row) {
      return function () {
        var cell = row.getElementsByTagName("td")[0];
        id = cell.innerHTML;
        tbodyOfParticularTask.innerHTML = "";
        tbodyForNotes.innerHTML = "";
        showNotes(id);
        alert("id:" + id);
      };
    };
    currentRow.onclick = createClickHandler(currentRow);
  }
}

function editTr(e) {
  e.stopPropagation();
  let span = event.target;
  let tr;
  if (span.tagName == "svg") tr = span.parentNode.parentNode.parentNode;
  else if (span.tagName == "path")
    tr = span.parentNode.parentNode.parentNode.parentNode;
  else tr = span.parentNode.parentNode;
  console.log("editTR");
  showEditForm(tr);
}

function deleteTr(e) {
  e.stopPropagation();
  let span = event.target;
  let tr;
  if (span.tagName == "svg") tr = span.parentNode.parentNode.parentNode;
  else if (span.tagName == "path")
    tr = span.parentNode.parentNode.parentNode.parentNode;
  else tr = span.parentNode.parentNode;
  id = tr.children[0].textContent;
  deleteTask();
}

sortBydueDate.onclick = function () {
  sortTable(3);
};

sortByStatus.onclick = function () {
  sortTable(4);
};

sortByPriority.onclick = function () {
  sortPriority(5);
};

addNewTask.onclick = function () {
  showBackgroundCurtain();
};

addNewTaskBtn.onclick = function () {
  addNewTaskJson();
};

addNoteBtn.onclick = function () {
  addNewNote();
  tbodyForNotes.innerHTML = "";
  tbodyOfParticularTask.innerHTML = "";
  showNotes(id);
};

editTaskBtn.onclick = function () {
  editTask();
};

function showEditForm(tr) {
  editCurtain.classList.remove("d-none");
  editCurtain.classList.add("d-flex");
  let forms = editTaskForm;
  id = tr.children[0].textContent;
  forms.elements.title.value = tr.children[1].textContent;
  forms.elements.description.value = tr.children[2].textContent;
  forms.elements.dueDate.value = tr.children[3].textContent;
  forms.elements.status.value = tr.children[4].textContent;
  forms.elements.priority.value = tr.children[5].textContent;
}

function showBackgroundCurtain() {
  backgroundCurtain.classList.remove("d-none");
  backgroundCurtain.classList.add("d-flex");
}

function hideBackgroundCurtain() {
  backgroundCurtain.classList.remove("d-flex");
  backgroundCurtain.classList.add("d-none");
}

backgroundCurtain.onclick = function () {
  hideBackgroundCurtain();
  addNewTaskForm.reset();

  destroy();
  initializer();
};

editCurtain.onclick = function () {
  editCurtain.classList.remove("d-flex");
  editCurtain.classList.add("d-none");
};

noteCurtain.onclick = function () {
  noteCurtain.classList.remove("d-flex");
  noteCurtain.classList.add("d-none");
};

taskInput.onclick = function (e) {
  e.stopPropagation();
};

taskEdit.onclick = function (e) {
  e.stopPropagation();
};

particularTaskContainer.onclick = function (e) {
  e.stopPropagation();
};

function destroy() {
  tbody.innerHTML = "";
}
function destroyAllNotes() {
  tbodyForNotes.innerHtml = "";
}

async function showNotes(id) {
  noteCurtain.classList.remove("d-none");
  noteCurtain.classList.add("d-flex");

  taskid = id;
  let task = await getParticularTask(id);
  console.log(task);
  let keys = ["id", "title", "description", "dueDate", "status", "priority"];
  let tr = document.createElement("tr");
  let ctr = tbodyOfParticularTask.appendChild(tr);
  keys.forEach((key) => {
    let td = document.createElement("td");
    td.textContent = task[key];
    ctr.appendChild(td);
  });

  let notes = await getAllNotes(id);
  console.log(notes);
  notes.forEach((element) => {
    let keys = ["id", "description"];
    let tr = document.createElement("tr");
    let ctr = tbodyForNotes.appendChild(tr);
    keys.forEach((key) => {
      let td = document.createElement("td");
      td.textContent = element[key];
      ctr.appendChild(td);
    });

    let td = document.createElement("td");
    let span1 = document.createElement("button");
    span1.onclick = deleteNoteTr;
    span1.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"/></svg>';
    td.appendChild(span1);
    ctr.appendChild(td);
  });
}

async function showAllNotes(id) {
  console.log("showAllNotes");
  console.log(id);
  let notes = await getAllNotes(id);
  console.log(notes);
  notes.forEach((element) => {
    let keys = ["id", "description"];
    let tr = document.createElement("tr");
    let ctr = tbodyForNotes.appendChild(tr);
    keys.forEach((key) => {
      let td = document.createElement("td");
      td.textContent = element[key];
      ctr.appendChild(td);
    });

    let td = document.createElement("td");
    let span1 = document.createElement("button");
    span1.onclick = deleteNoteTr;
    span1.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"/></svg>';
    td.appendChild(span1);
    ctr.appendChild(td);
  });
}

function deleteNoteTr(e) {
  let span = event.target;
  let tr;
  if (span.tagName == "svg") tr = span.parentNode.parentNode.parentNode;
  else if (span.tagName == "path")
    tr = span.parentNode.parentNode.parentNode.parentNode;
  else tr = span.parentNode.parentNode;
  id = tr.children[0].textContent;
  console.log("ye print hua");
  console.log(tr.children);
  console.log(id);
  deleteNote(id);
}

async function getAllNotes(id) {
  const resp = await fetch("/tasks/" + id + "/notes", { method: "GET" });
  const notes = await resp.json();
  return notes;
}

async function getAllTasks() {
  const resp = await fetch("/tasks", { method: "GET" });
  const tasks = await resp.json();
  return tasks;
}

async function editTask() {
  let forms = editTaskForm;
  let title = forms.elements.title.value;
  let description = forms.elements.description.value;
  let dueDate = forms.elements.dueDate.value;
  let status = forms.elements.status.value;
  let priority = forms.elements.priority.value;

  const resp = await fetch("/tasks/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, dueDate, status, priority }),
  });

  editCurtain.classList.remove("d-flex");
  editCurtain.classList.add("d-none");

  destroy(); //destroy all tables.
  initializer();
}

async function getParticularTask(id) {
  const resp = await fetch("/tasks/" + id, { method: "GET" });
  const task = await resp.json();
  return task;
}

async function deleteTask() {
  const resp = await fetch("/tasks/" + id, {
    method: "DELETE",
  });

  destroy();
  initializer();
}

async function deleteNote(noteId) {
  const resp = await fetch("/tasks/notes/" + noteId, {
    method: "DELETE",
  });
  tbodyForNotes.innerHTML = "";
  showAllNotes(taskid);
}

async function addNewTaskJson() {
  let forms = addNewTaskForm;
  console.log(document.getElementsByName("id").value);
  let title = forms.elements.title.value;
  let description = forms.elements.description.value;
  let dueDate = forms.elements.dueDate.value;
  let status = forms.elements.status.value;
  let priority = forms.elements.priority.value;
  const resp = await fetch("/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, dueDate, status, priority }),
  });
  forms.reset();
}

async function addNewNote() {
  let forms = addNewNoteForm;
  let description = forms.elements.descriptionOfNote.value;
  const resp = await fetch("/tasks/" + id + "/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, description }),
  });
  forms.reset();
}

function sortTable(n) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById("mainTable");
  switching = true;

  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (n == 3) {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else {
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc" && n != 3) {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function sortPriority(n) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("mainTable");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];

      if (
        (x.innerHTML == "low" && y.innerHTML == "medium") ||
        (x.innerHTML == "medium" && y.innerHTML == "high") ||
        (x.innerHTML == "low" && y.innerHTML == "high")
      ) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
