var list = [
    {
        "itemName": "Strawberry",
        "quantity": 2,
        "type": "Beverage"
    },

    {
        "itemName": "Pizza",
        "quantity": 1,
        "type": "Bread and Butter"
    },

    {
        "itemName": "Milk",
        "quantity": 1,
        "type": "Milk and Cheese"
    },

    {
        "itemName": "Cottage Cheese",
        "quantity": 1,
        "type": "Milk and Cheese"
    },

    {
        "itemName": "Eggs",
        "quantity": 10,
        "type": "Milk and Cheese"
    }
];

$(document).ready(function () {
    $('#addItem').click(function () {
    	var item = $("input[name=item]").val();
        $('#todo').append("<li class='list-group-item'>" + item + " <a href='javascript:void(0)' class='close' aria-hidden='true'>&times;</a></li>");
        $('#fridge').append("<li class='list-group-item fridgeItem' id='" + item + "'>" + item + " <a href='javascript:void(0)' class='close' aria-hidden='true'>&times;</a></li>");
    });
    $("body").on('click', '#todo a', function () {
        $(this).closest("li").remove();
    });
    $("body").on('click', '#fridge a', function () {
        $(this).closest("li").remove();
    });
});