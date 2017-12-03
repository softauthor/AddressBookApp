/*

    Application Name: Address Book
    Author: Raja Tamil

    Description: This AddressBook app demonstrate how to build a simple app with Object Oriented way with MVC patter. ES6 functionalities have been utitlized.


*/

// ============== Data =========================
const contactsData = [{
        'fname': 'Anbu',
        'lname': 'Arasan',
        'phone': '190-309-6101',
        'email': 'anbu.arasan@email.com'
    },
    {
        'fname': 'Arivu',
        'lname': 'Mugilan',
        'phone': '490-701-7102',
        'email': 'arivu.mugilan@email.com'
    },
    {
        'fname': 'Bob',
        'lname': 'Johnson',
        'phone': '574-909-3948',
        'email': 'bob.johnson@email.com'
    },
    {
        'fname': 'Raja',
        'lname': 'Tamil',
        'phone': '090-909-0101',
        'email': 'raja.tamil@email.com'
    },
    {
        'fname': 'Sundar',
        'lname': 'Kannan',
        'phone': '090-909-0101',
        'email': 'sundar.kannan@email.com'
    }
]





// ============== Controller (API) =========================

class AddressBookCtrl {

    constructor(addressBookView) {
        this.addressBookView = addressBookView;
    }

    init() {
        this.addressBookView.init();
    }

    getContacts() {
        return contactsData;
    }

    getContact(index) {
        return contactsData[index];
    }

   

}



// ============== VIEW =========================
class AddressBookView {

    init() {
        this.renderContactListModule();
        this.renderContactDetailsModule(0);
    }

    

    // -----------------------------------
    // RENDER 
    // -----------------------------------


    renderContactDetailsModule(e) {

        // get the selected index
        let selectedIndex = null;

        if (typeof e === 'object') {
            e.stopPropagation();
            selectedIndex = this.getAttribute('data-index')
        } else {
            selectedIndex = e;
        }

        // get the selected contact based on the index from the controller
        const selectedItem = addressBookApp.getContact(selectedIndex);

        // cache the contact details module 
        const $ContactItemUI = document.getElementById('contact-item-details');

        // render the data on the module
        $ContactItemUI.innerHTML = `${selectedItem['fname']} <br> ${selectedItem['lname']} <br> ${selectedItem['phone']} <br> ${selectedItem['email']}`;
    }

    renderContactListModule() {

        // model
        const contacts = addressBookApp.getContacts();

        // view 
        const $ContactListUI = document.getElementById('contact-list')
        $ContactListUI.innerHTML = '';

        

        // ctrl
        for (let i = 0, len = contacts.length; i < len; i++) {

            // list item
            let $li = document.createElement('li');
            $li.setAttribute('class', 'contact-list-item');
            $li.setAttribute('data-index', i);

            // label div
            let $div = document.createElement('div');
            $div.innerHTML = `${contacts[i]['fname']}, <strong>${contacts[i]['lname']}</strong> `;

            $li.append($div);
            $li.addEventListener("click", this.renderContactDetailsModule);

            $ContactListUI.append($li);
        }

    }

}

// create an object from the class AddressBookView
const addressBookView = new AddressBookView();

// create an object from AddressBookCtrl and passing addressBookView in the constructor as a dependent
const addressBookApp = new AddressBookCtrl(addressBookView);

// App starting...
addressBookApp.init();