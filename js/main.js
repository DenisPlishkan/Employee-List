import Worker from "./worker.js";

// Массив сотрудников
const workers = [
    new Worker('Олег', 'Фролов', 'Игоревич', 2019, new Date(1996, 2, 20), 'Строитель'),
    new Worker('Данил', 'Астафьев', 'Валентинович', 2016, new Date(1990, 6, 27), 'Электрик'),
    new Worker('Руслана', 'Козакова', 'Андреевна', 2020, new Date(1998, 3, 25), 'Менеджер')
]

const $workerList = document.getElementById('workers-list'),
      $workerListTHAll = document.querySelectorAll('.workersTable th')

let column = 'fio',
    columnDir = true

// Получить TR сотрудника
function newWorkerTR(worker){
    const $workerTR = document.createElement('tr'),
          $fioTD = document.createElement('td'),
          $birthDateTD = document.createElement('td'),
          $workStartTD = document.createElement('td'),
          $postTD = document.createElement('td')

    $fioTD.textContent = worker.fio
    $birthDateTD.textContent = worker.getBirthDateString() + '(' + worker.getAge() + ' лет)'
    $workStartTD.textContent = worker.workStart + '(' + worker.getWorkPeriod() + ' лет)'
    $postTD.textContent = worker.post

    $workerTR.append($fioTD)
    $workerTR.append($birthDateTD)
    $workerTR.append($workStartTD)
    $workerTR.append($postTD)
    
    return $workerTR;
}

// Получить сортировку массива по параметрам
function getSortWorkers(prop, dir){
    const workersCopy = [...workers]
    return workersCopy.sort(function(workerA, workerB){
        if((!dir == false ? workerA[prop] < workerB[prop] : workerA[prop] > workerB[prop]))
        return -1;
    })
}

// Отрисовать 
function render() {
    let worksCopy = [...workers]

    worksCopy = getSortWorkers(column, columnDir)

    $workerList.innerHTML = ''
    
    for(const worker of worksCopy) {
        $workerList.append(newWorkerTR(worker))
    }
}

// События сортировки
$workerListTHAll.forEach(element => {
    element.addEventListener('click', function() {
        const column = this.dataset.column;
        columnDir = !columnDir
        render()
    })
})

// Добавление
document.getElementById('add-worker').addEventListener('submit', function(event) {
    event.preventDefault()
    
    workers.push(new Worker(
        document.getElementById('input-name').value,
        document.getElementById('input-surname').value,
        document.getElementById('input-lastname').value,
        Number(document.getElementById('input-workStart').value),
        new Date(document.getElementById('input-birthDate').value),
        document.getElementById('input-post').value,
    ))

    render()
})

render()





