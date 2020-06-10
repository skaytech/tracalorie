const StorageCtrl = (function() {

    function setLocalStoreData(updateItem) {
        let items = localStorage.getItem('items');

        if (items !== null) {
            items = JSON.parse(items);
            const index = items.findIndex(item => item.id === updateItem.id);

            if (index === -1) {
                items.push(updateItem);
            } else {
                items[index] = updateItem;
            }
        } else {
            items = [];
            items.push(updateItem);
        }

        localStorage.setItem('items', JSON.stringify(items));

    }

    function getLocalStoreData() {
        let items = [];

        if (localStorage.getItem('items') === null) {
            return items;
        } else {
            return JSON.parse(localStorage.getItem('items'));
        }

    }

    function deleteLocalStoreData(delItem) {
        if (!delItem) {
            localStorage.removeItem('items');
        } else {
            let items = localStorage.getItem('items');

            items = JSON.parse(items);
            const index = items.findIndex(item => item.id === delItem.id);
            items.splice(index, 1);
            localStorage.setItem('items', JSON.stringify(items));
        }
    }

    //Public Methods
    return {
        getLocalStoreData: getLocalStoreData,
        setLocalStoreData: setLocalStoreData,
        deleteLocalStoreData: deleteLocalStoreData
    }

}());