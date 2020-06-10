//App Control
const app = (function(UICtrl, ItemCtrl) {
    return {
        init: function() {
            console.log('Initializing App...');

            //Fetch Data from ItemCtrl (load initial data)
            const items = ItemCtrl.getItems();

            //Check if items are present and then populateItemList

            if (items.length === 0) {
                //Hide the <ul> element
                UICtrl.hideList();
            } else {
                //Show the <ul> element
                UICtrl.showList();
                //Use the UICtrl to display the items fetched by the ItemCtrl
                UICtrl.populateItemList(items);
            }

            //Show Total Calories
            UICtrl.setTotalCalories(ItemCtrl.getTotalCalories());

            UICtrl.initialUIState();

            //Load Event Listeners
            ItemCtrl.loadEventListeners();

        }
    }
}(UICtrl, ItemCtrl));

app.init();