// // localStorage.setItem('myKey', 'myValue');
// // var localValue = localStorage.getItem('myKey');
// // console.log(localValue);

// $(document).ready(function () {
//     // localStorage.clear();
//     // var lSLength = localStorage.length;
//     // var localValue;
//     //
//     // function getValueAfterReload() {
//     //     if(lSLength > 0) {
//     //         for (i = 0; i < lSLength; i++) {
//     //             var key = localStorage.key(i);
//     //             $('.todo-list').append("<li class='item' data-item=" + localStorage.key(i).slice(7)  + ">" + localStorage[key] + "</li>");
//     //         }
//     //     }
//     // }
//     //
//     // getValueAfterReload();

//     addButtonToAddItem();
//     //окремо було
//     function addButtonToAddItem() {
//         $('.add-button').click(function () {
//             var inputTask = $(".new-task").val();
//             if (!inputTask) {
//                 alert("Please input your text! :0 :) ");
//                 return false
//             }
//             var containerForToDo = "<div class='list_ul_plus'><strong>" + inputTask + "</strong><button class='button_edit'>Edit</button><button class='button_delete'>Delete</button></div>";
//             $('.list_ul').append(containerForToDo);
//             $(".new-task").val("");
//             addButtonToDeleteItem();
//             addButtonToEditItem();
//         });
//     }
//
//     function addButtonToDeleteItem() {
//         $('.button_delete').click(function () {
//             $(this).parent(".list_ul_plus").remove();
//         });
//     }
//
//     function addButtonToEditItem() {
//         // $('.button_edit').click(function () {
//         //     // var valueEditTask = $(this).siblings("strong").text();
//         //
//         // })
//         // $(document).on("click", '.button-edit', function () {
//         //     // make the span editable and focus it
//         //     $(this).closest('.list_ul_plus').find("strong").prop("contenteditable", true).focus();
//         //     return false;
//         // });
//     }
//     //до сюда окремо було
//
// });

$(document).ready(function () {
    $('#list-items').html(localStorage.getItem('listItems'));
    $('.add-items').submit(function (event) {
        event.preventDefault();
        var item = $('#todo-list-item').val();

        if (!item) {
            alert("Please input your text! :0 :) ");
            return false
        }
        else {
            $('#list-items').append("<li><input class='checkbox' type='checkbox'/>" + item + "<a class='remove'>Delete</a><hr></li>");
            localStorage.setItem('listItems', $('#list-items').html());
            $('#todo-list-item').val("");
        }
    });
    $(document).on('change', '.checkbox', function () {
        if ($(this).attr('checked')) {
            $(this).removeAttr('checked');
        }
        else {
            $(this).attr('checked', 'checked');
        }
        $(this).parent().toggleClass('completed');
        localStorage.setItem('listItems', $('#list-items').html());
    });
    $(document).on('click', '.remove', function () {
        $(this).parent().remove();
        localStorage.setItem('listItems', $('#list-items').html());
    });
});


var loadMoreContainer = document.getElementById("loadMore");
var btn = document.getElementById("btn");
btn.addEventListener("click", function () {
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://jsonplaceholder.typicode.com/todos');
    ourRequest.onload = function () {
        var ourData = JSON.parse(ourRequest.responseText);
        renderHTML(ourData);
    };
    ourRequest.send();
});


function renderHTML(data) {

    var htmlString = " ";

    for (i = 0; i < data.length; i++) {
        htmlString += "<p>" + data[i].title + "and it is " + data[i].completed + ". </p>"
    }

    loadMoreContainer.insertAdjacentHTML("beforeend", htmlString)
}












