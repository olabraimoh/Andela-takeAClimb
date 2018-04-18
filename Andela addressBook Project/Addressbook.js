var contactsArray = [];
var selectedIndex = -1;
    
    function init() {
        document.getElementById("tableRows").innerHTML = "";
        if (localStorage.contactsForm) {
            contactsArray = JSON.parse(localStorage.contactsForm);
            for (var i = 0; i < contactsArray.length; i++) {
                prepareTableCell(i, contactsArray[i].name, contactsArray[i].phone, contactsArray[i].email);
            }
        }
    }
        
    function onSubmitPress() {
        var fullName = document.getElementById("name").value;
        var phoneNumber = document.getElementById("phone").value;
        var emailAddress = document.getElementById("email").value;
        var contactsObj = {name: fullName, phone: phoneNumber, email: emailAddress};
        if (selectedIndex === -1) {
            contactsArray.push(contactsObj);
        } else {
            contactsArray.splice(selectedIndex, 1, contactsObj);
        }
        localStorage.contactsForm = JSON.stringify(contactsArray);
        init();
        onClearPress();
    }
    
    function prepareTableCell(index, fullName, phoneNumber, emailAddress) {
        var table = document.getElementById("tableRows");
        var row = table.insertRow();
        var fullNameCell = row.insertCell(0);
        var phoneNumberCell = row.insertCell(1);
        var emailAddressCell = row.insertCell(2);
        var actionCell = row.insertCell(3);
        fullNameCell.innerHTML = fullName;
        fullNameCell.className='full_name';
        phoneNumberCell.innerHTML = phoneNumber;
        emailAddressCell.innerHTML = emailAddress;
        actionCell.innerHTML = '<button onclick="onEditPress(' + index + ')">Edit</button><br/><button onclick="deleteTableRow(' + index + ')">Delete</button>';
        $(phoneNumberCell).hide();
        $(emailAddressCell).hide();
    }
    
    function deleteTableRow(index) {
        contactsArray.splice(index, 1);
        localStorage.contactsForm = JSON.stringify(contactsArray);
        init();
    }
        
    function onClearPress() {
        selectedIndex = -1;
        document.getElementById("name").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("email").value = "";
        document.getElementById("submit").innerHTML = "Submit";
    }
        
    function onEditPress(index) {
        selectedIndex = index;
        var contactsObj = contactsArray[index];
        document.getElementById("name").value = contactsObj.name;
        document.getElementById("phone").value = contactsObj.phone;
        document.getElementById("email").value = contactsObj.email;
        document.getElementById("submit").innerHTML = "Update";
    }

    $(document).ready(function () {
        $('.full_name').on('click', function() {
            if ($($(this).siblings()[1]).is(':visible'))
            {
                $($(this).siblings()[0]).hide();
                $($(this).siblings()[1]).hide();
            } else {
                    $(this).siblings().show();
            }
            console.log('calling');
            
        });
    });