var fetchedData;
var tableContainer = document.getElementById("theTable")

var pageIndex = 1;

fetch('https://jsonplaceholder.typicode.com/todos')
.then(response => response.json())
.then(json => {
    fetchedData = json;
    updateTable(fetchedData, pageIndex*10);
});


function updateTable(json, page) {

    let existingRows = document.querySelectorAll(".changable")
    existingRows.forEach(element => {
        element.parentNode.removeChild(element);
    });
    let i = page - 10;
    for ( i; i < page; i++) {
        const element = json[i];
        console.log(element);

        let completed;
        if (element.completed === true) {
            completed = "Completed"
        }else{
            completed = "Not completed"
        }

        let dateNow = new Date();
        let dateCut = dateNow.getDate() + "-" + dateNow.getMonth() + "-" + dateNow.getFullYear();

        // tableContainer.innerHTML += `<tr class="changable"><td>${element.id}</td><td>${completed}</td><td>${element.title}</td><td>${dateCut}</td><td>${dateCut}</td><td><button>Delete</button></td></tr>`
        tableContainer.innerHTML += `
        <tr class="changable">
          <td>${element.title}</td>
          <td>${completed}</td>
          <td>Luka Sulaberidze</td>
          <td>${dateCut}</td>
          <td>${dateCut}</td>
          <td>
          <button>Delete</button>
          </td>
      </tr>`
    }
}

function nextPage() {
    if (pageIndex + 1 <= Math.floor(fetchedData.length/10)) {
        pageIndex += 1;
        updateTable(fetchedData, pageIndex*10);
    }
}

function prevPage() {
    if (pageIndex - 1 > 0) {
        pageIndex -= 1;
        updateTable(fetchedData, pageIndex*10);
    }
}

let pageButtons = [...document.querySelectorAll(".pagination-page")];
pageButtons.forEach(element => {
    element.addEventListener("click", function () {
        let index = pageButtons.indexOf(element);
        pageIndex = index+1
        updateTable(fetchedData, pageIndex*10);
    });
});

function openModal() {
    document.getElementById("modal").classList.add("active");
}

function save() {
  let id = fetchedData.length;
  let taskName = document.getElementById("taskName").value;

  if (document.getElementById("taskCompleted").value === "true") {
    taskCompleted = true;
  }else{
    taskCompleted = false;
  }

  let obj = {
    id: id,
    userId: 999,
    title: taskName,
    completed: taskCompleted
  }

  fetchedData = [obj, ...fetchedData];
  pageIndex = 1;
  updateTable(fetchedData, pageIndex*10);
  document.getElementById("modal").classList.remove("active");
}
function closeModal() {
  document.getElementById("modal").classList.remove("active");
}