//UI Controller
const UICtrl = (function() {
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '#add-btn',
        updateBtn: '#update-btn',
        deleteBtn: '#delete-btn',
        backBtn: '#back-btn',
        clearBtn: '#clear-btn',
        itemName: '#item-name',
        itemCalories: '#item-calories',
        totalCalories: '.total-calories',
        listItems: '#item-list li'
    }

    const getUISelectors = function() {
        return UISelectors;
    }

    const getInputValues = function() {
        return {
            name: document.querySelector(UISelectors.itemName).value,
            calories: document.querySelector(UISelectors.itemCalories).value
        }
    }

    const populateItemList = function(items) {
        const itemList = document.querySelector(UISelectors.itemList);
        let outputHtml = '';
        items.forEach(function(item) {
            outputHtml += `<li class="collection-item" id="item-${item.id}">
      <strong>${item.name}: </strong><em>${item.calories}</em>
      <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a></li>`
        });
        itemList.innerHTML = outputHtml;
    }

    const addListItem = function(item) {
        UICtrl.showList();

        //create <li> element
        const li = document.createElement('li');

        li.id = `item-${item.id}`;

        li.className = 'collection-item';

        li.innerHTML = `<strong>${item.name}: </strong><em>${item.calories}</em>
    <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;

        document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
    }

    const updateListItem = function(item) {

        let listItems = document.querySelectorAll(UISelectors.listItems);

        listItems = Array.from(listItems);

        listItems.forEach(function(listItem) {
            const listItemId = listItem.getAttribute('id');
            if (listItemId === `item-${item.id}`) {
                document.querySelector(`#${listItemId}`).innerHTML =
                    `<strong>${item.name}: </strong><em>${item.calories}</em>
                          <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
            }
        });
    }

    const deleteListItem = function(id) {
        const itemId = `#item-${id}`;
        document.querySelector(itemId).remove();
    }

    //Public Methods
    return {
        populateItemList: populateItemList,
        getUISelectors: getUISelectors,
        getInputValues: getInputValues,
        hideList: function() {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showList: function() {
            document.querySelector(UISelectors.itemList).style.display = 'block';
        },
        addListItem: addListItem,
        updateListItem: updateListItem,
        deleteListItem: deleteListItem,
        clearItems: function() {
            let listItems = document.querySelectorAll(UISelectors.listItems);
            listItems = Array.from(listItems);

            listItems.forEach(listItem => listItem.remove());
            UICtrl.hideList();
        },
        clearInputFields: function() {
            document.querySelector(UISelectors.itemName).value = '';
            document.querySelector(UISelectors.itemCalories).value = '';
        },
        setTotalCalories: function(totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        initialUIState: function() {
            document.querySelector(UISelectors.itemName).value = '';
            document.querySelector(UISelectors.itemCalories).value = '';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
        },
        editUIState: function(item) {
            document.querySelector(UISelectors.itemName).value = item.name;
            document.querySelector(UISelectors.itemCalories).value = item.calories;
            document.querySelector(UISelectors.addBtn).style.display = 'none';
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
        }
    }
}());