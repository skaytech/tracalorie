//Item Controller
const ItemCtrl = (function() {

    //Item Constructor
    const Item = function(id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    //Data Structure for the Page - Data Model
    const data = {
        currentItem: null,
        totalCalories: 0
    }

    //Load all the event listeners
    const loadEventListeners = function() {
        //Fetch the UI Selectors from UICtrl
        const uiSelectors = UICtrl.getUISelectors();

        document.querySelector(uiSelectors.addBtn).addEventListener('click', itemAddSubmit);

        //Disable Submit on Enter
        document.addEventListener('keypress', function(e) {
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false;
            }
        })

        document.querySelector(uiSelectors.itemList).addEventListener('click', itemEditSelect);

        document.querySelector(uiSelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

        document.querySelector(uiSelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

        document.querySelector(uiSelectors.backBtn).addEventListener('click', loadPreviousState);

        document.querySelector(uiSelectors.clearBtn).addEventListener('click', clearAllItems);
    }

    const clearAllItems = function(e) {
        ItemCtrl.clearItemsFromData();
        UICtrl.clearItems();
        UICtrl.initialUIState();
        //call the UICtrl to Set Total Calories
        UICtrl.setTotalCalories(ItemCtrl.getTotalCalories());
        StorageCtrl.deleteLocalStoreData();
        e.preventDefault();
    }

    const loadPreviousState = function(e) {
        UICtrl.initialUIState();
        e.preventDefault();
    }

    const itemDeleteSubmit = function(e) {
        const currentItem = ItemCtrl.getCurrentItem();

        ItemCtrl.deleteItem(currentItem);

        //Call the UICtrl to deleteListItem
        UICtrl.deleteListItem(currentItem.id);

        UICtrl.initialUIState();

        //call the UICtrl to Set Total Calories
        UICtrl.setTotalCalories(ItemCtrl.getTotalCalories());

        e.preventDefault();
    }

    const itemUpdateSubmit = function(e) {
        const inputValues = UICtrl.getInputValues();
        if (inputValues.name !== '' && inputValues.calories !== '') {
            //Create newItem using addItem method
            const editItem = ItemCtrl.getCurrentItem();

            editItem.name = inputValues.name;

            editItem.calories = inputValues.calories;

            ItemCtrl.updateItem(editItem);

            //Call the UICtrl to addItemtoList
            UICtrl.updateListItem(editItem);

            UICtrl.initialUIState();

            //call the UICtrl to Set Total Calories
            UICtrl.setTotalCalories(ItemCtrl.getTotalCalories());
        }
    }

    const itemEditSelect = function(e) {
        if (e.target.classList.contains('edit-item')) {
            const parentId = e.target.parentNode.parentNode.id;

            const parentIdArr = parentId.split('-');

            const itemId = parseInt(parentIdArr[1]);

            const itemToEdit = ItemCtrl.findItemById(itemId);

            ItemCtrl.setCurrentItem(itemToEdit);

            UICtrl.editUIState(itemToEdit);
        }
        e.preventDefault();
    }

    const itemAddSubmit = function(e) {
        const inputValues = UICtrl.getInputValues();
        if (inputValues.name !== '' && inputValues.calories !== '') {

            //Create newItem using addItem method
            const newItem = ItemCtrl.addItem(inputValues.name, inputValues.calories);

            //Call the UICtrl to addItemtoList
            UICtrl.addListItem(newItem);

            //Clear Input Fields
            UICtrl.clearInputFields();

            //call the UICtrl to Set Total Calories
            UICtrl.setTotalCalories(ItemCtrl.getTotalCalories());

        } else {
            console.log('Please enter all fields');
        }
        e.preventDefault();
    }

    //Public Methods
    return {
        getItems: function() {
            return StorageCtrl.getLocalStoreData();
        },
        loadEventListeners: loadEventListeners,
        clearItemsFromData: function() {
            StorageCtrl.deleteLocalStoreData();
        },
        addItem: function(name, calories) {
            const items = StorageCtrl.getLocalStoreData();

            //define Id field
            let id;
            if (items.length > 0) {
                id = items[items.length - 1].id + 1
            } else {
                id = 0;
            }

            //Convert calories into number
            calories = parseInt(calories);

            //create a new Item using the Item constructor
            const newItem = new Item(id, name, calories);

            //Append it to the existing list of items
            //data.items.push(newItem);
            StorageCtrl.setLocalStoreData(newItem);

            return newItem;
        },
        updateItem: function(updateItem) {
            StorageCtrl.setLocalStoreData(updateItem);
        },
        deleteItem: function(deleteItem) {
            StorageCtrl.deleteLocalStoreData(deleteItem);
        },
        setCurrentItem: function(item) {
            data.currentItem = item;
        },
        getCurrentItem: function() {
            return data.currentItem;
        },
        findItemById: function(id) {
            const items = StorageCtrl.getLocalStoreData();
            return items.find(item => item.id === id);
        },
        getTotalCalories: function() {
            let total = 0;
            const items = StorageCtrl.getLocalStoreData();
            items.forEach(function(item) {
                total += parseInt(item.calories);
            });

            //Set the total calories as the sum total of item calories
            data.totalCalories = total;

            return data.totalCalories;
        }
    }
}());