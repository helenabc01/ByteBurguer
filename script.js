const menu = {
    1: {name: 'Callback Burguer', steps: [{name: 'Cut', time: 3}, {name: 'Grill', time: 8}, {name: 'Mounting', time: 2}]},
    2: {name: 'Null Burger', steps: [{name: 'Cut', time: 4}, {name: 'Grill', time: 7}, {name: 'Mounting', time: 2}]},
    3: {name: 'Crispy Turing', steps: [{name: 'Cut', time: 2}, {name: 'Grill', time: 10}, {name: 'Mounting', time: 1}]},
    4: {name: 'Mongo Melt', steps: [{name: 'Cut', time: 1}, {name: 'Grill', time: 3}]},
    5: {name: 'Webwrap', steps: [{name: 'Cut', time: 4}, {name: 'Grill', time: 2}]},
    6: {name: 'NPM Nuggets', steps: [{name: 'Fry', time: 2}]},
    7: {name: 'Float Juice', steps: [{name: 'Cut', time: 4}, {name: 'Prepare', time: 3}]},
    8: {name: 'Array Apple', steps: [{name: 'Cut', time: 4}, {name: 'Prepare', time: 3}]},
    9: {name: 'Async Berry', steps: [{name: 'Cut', time: 2}, {name: 'Prepare', time: 2}]},
};

const menuContainer = document.querySelector('.menu');
const finalizeButton = document.getElementById('finalize-order');
const confirmationPopup = document.getElementById('confirmation-popup');
const confirmationList = document.getElementById('confirmation-list');
const confirmBtn = document.getElementById('confirm-btn');
const cancelBtn = document.getElementById('cancel-btn');

function createMenuItem(item) {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-item';

    const itemName = document.createElement('h2');
    itemName.textContent = item.name;
    menuItem.appendChild(itemName);

    const stepsList = document.createElement('ul');
    item.steps.forEach(step => {
        const stepItem = document.createElement('li');
        stepItem.textContent = `${step.name} - ${step.time} secs`;
        stepsList.appendChild(stepItem);
    });
    menuItem.appendChild(stepsList);

    const counterDiv = createCounter(item.name);
    menuItem.appendChild(counterDiv);

    return menuItem;
}

function createCounter(itemName) {
    const counterDiv = document.createElement('div');
    counterDiv.className = 'counter';

    const decrementButton = document.createElement('button');
    decrementButton.textContent = '-';
    decrementButton.className = 'counter-button';
    counterDiv.appendChild(decrementButton);

    const countInput = document.createElement('input');
    countInput.type = 'text';
    countInput.value = '0';
    countInput.className = 'counter-input';
    countInput.readOnly = true;
    counterDiv.appendChild(countInput);

    const incrementButton = document.createElement('button');
    incrementButton.textContent = '+';
    incrementButton.className = 'counter-button';
    counterDiv.appendChild(incrementButton);

    let count = 0;

    decrementButton.addEventListener('click', () => {
        count = Math.max(count - 1, 0);
        countInput.value = count;
        checkCounters();
    });

    incrementButton.addEventListener('click', () => {
        count += 1;
        countInput.value = count;
        checkCounters();
    });

    return counterDiv;
}let orderNumber = 1; 

function checkCounters() {
    const counters = document.querySelectorAll('.counter-input');
    const anyNonZero = Array.from(counters).some(input => parseInt(input.value, 10) > 0);

    finalizeButton.style.display = anyNonZero ? 'block' : 'none';
}

function showConfirmationPopup() {
    confirmationList.innerHTML = ''; 

    const menuItems = document.querySelectorAll('.menu-item');

    const orderTitle = document.createElement('h3');
    orderTitle.textContent = `Pedido #${orderNumber}`;
    confirmationList.appendChild(orderTitle); 

    menuItems.forEach(menuItem => {
        const itemName = menuItem.querySelector('h2').textContent; 
        const countInput = menuItem.querySelector('.counter-input');
        const quantity = parseInt(countInput.value, 10);

        if (quantity > 0) {
            const listItem = document.createElement('li');
            listItem.style.listStyleType = 'none';
            listItem.textContent = `${itemName} - Qnt: ${quantity}`;
            confirmationList.appendChild(listItem);
        }
    });

    confirmationPopup.style.display = 'flex';
}

function hideConfirmationPopup() {
    confirmationPopup.style.display = 'none';
}

function finalizeOrder() {
    addToQueue();
    hideConfirmationPopup();
    orderNumber++; 
}

function addToQueue() {
    const queue = document.querySelector('.queue');
    const queueItem = document.createElement('div');
    queueItem.className = 'queue-item';

    const orderTitle = document.createElement('h3');
    orderTitle.textContent = `Pedido #${orderNumber}`;
    queueItem.appendChild(orderTitle);

    const menuItems = document.querySelectorAll('.menu-item');
    const itemList = document.createElement('ul');

    menuItems.forEach(menuItem => {
        const itemName = menuItem.querySelector('h2').textContent;
        const countInput = menuItem.querySelector('.counter-input');
        const quantity = parseInt(countInput.value, 10);

        if (quantity > 0) {
            const listItem = document.createElement('li');
            listItem.style.listStyleType = 'none';
            listItem.textContent = `${itemName}`;
            itemList.appendChild(listItem);
        }
    });

    queueItem.appendChild(itemList);

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancelar pedido';
    cancelButton.addEventListener('click', () => {
        queue.removeChild(queueItem);
    });

    queueItem.appendChild(cancelButton);
    queue.appendChild(queueItem);

    const counters = document.querySelectorAll('.counter-input');
    counters.forEach(input => {
        input.value = '0';
    });

    finalizeButton.style.display = 'none';
}

finalizeButton.addEventListener('click', showConfirmationPopup);
cancelBtn.addEventListener('click', hideConfirmationPopup);
confirmBtn.addEventListener('click', finalizeOrder);

Object.values(menu).forEach(item => {
    const menuItem = createMenuItem(item);
    menuContainer.appendChild(menuItem);
});
