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
   

}



// ============== VIEW =========================
class AddressBookView {

    init() {
        this.renderContactListModule();
    }

    

    // -----------------------------------
    // RENDER 
    // -----------------------------------
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