
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

    addContact(contact) {
        contactsData.push(contact);
    }

    removeContact(index) {
        contactsData.splice(index, 1);
    }

    editContact(index, contact) {
        contactsData[index] = contact;
    }


}



// ============== VIEW =========================
class AddressBookView {

    init() {
        this.renderContactListModule();
        this.renderContactDetailsModule(0);
        this.addContactModule();
    }

    // -----------------------------------
    // ADD 
    // -----------------------------------

    addContactModule() {
        const $addContact = document.getElementById('add-contact-btn');
        $addContact.addEventListener("click", this.addContactBtnClicked.bind(this));
    }

    addContactBtnClicked() {

        // get the add contact form inputs 
        const $addContactInputs = document.getElementsByClassName('add-contact-input');

        // this object will hold the new contact information
        let newContact = {};

        // loop through View to get the data for the model 
        for (let i = 0, len = $addContactInputs.length; i < len; i++) {

            let key = $addContactInputs[i].getAttribute('data-key');
            let value = $addContactInputs[i].value;
            newContact[key] = value;
        }

        // passing new object to the addContact method 
        addressBookApp.addContact(newContact);

        // render the contact list with the new data set
        this.renderContactListModule();

    }

    // -----------------------------------
    // EDIT 
    // -----------------------------------

    editContactBtnClicked(e) {

        // show edit contact module
        document.getElementById('edit-contact-module').style.display = "block";

        // model
        let selectedIndex = null;

        if (typeof e === 'object') {
            e.stopPropagation();
            selectedIndex = e.target.getAttribute('data-index');
        } else {
            selectedIndex = e;
        }

        this.showContactDataOnEditFormInputs(selectedIndex);

        // save the edited contact
        const $saveContactBtn = document.getElementById('edit-contact-btn');
        $saveContactBtn.setAttribute('data-index', selectedIndex);
        $saveContactBtn.addEventListener("click", this.saveEditContactBtnClicked.bind(this));

    }

    showContactDataOnEditFormInputs(selectedIndex) {

        const $editContactInputs = document.getElementsByClassName('edit-contact-input');

        for (let i = 0, len = $editContactInputs.length; i < len; i++) {
            $editContactInputs[i].value = contactsData[selectedIndex][$editContactInputs[i].getAttribute("data-key")];
        }

    }

    saveEditContactBtnClicked(e) {

        // get the selected index
        const selectedIndex = e.target.getAttribute('data-index');

        // cache the save button
        const $editContactInputs = document.getElementsByClassName('edit-contact-input');

        // create an empty object that will hold the newly edited contact
        const newContact = {};

        // loop throught the inputs and get the data out of it and store it in the object
        for (let i = 0, len = $editContactInputs.length; i < len; i++) {

            let key = $editContactInputs[i].getAttribute('data-key');
            let value = $editContactInputs[i].value;
            newContact[key] = value;

        }

        // passing the index number and new object to the controller
        addressBookApp.editContact(selectedIndex, newContact);

        // render the contact list module in order to get the edited data
        this.renderContactListModule();

        // hide the edit form 
        document.getElementById('edit-contact-module').style.display = "none";

    }

    // -----------------------------------
    // DELETE 
    // -----------------------------------

    removeContact(e) {

        // get the selected index
        let selectedIndex = null;

        if (typeof e === 'object') {
            e.stopPropagation();
            selectedIndex = e.target.getAttribute('data-index')
        } else {
            selectedIndex = e;
        }

    
        // passing it into the removeContact method which is in the controller AddressBookCtrl
        addressBookApp.removeContact(selectedIndex);

        // render the list
        this.renderContactListModule();

    }

    // -----------------------------------
    // RENDER 
    // -----------------------------------

    

    renderContactDetailsModule(e) {


        // get the selected index
        let selectedIndex = null;

        if (typeof e === 'object') {
            e.stopPropagation();
            selectedIndex = e.currentTarget.getAttribute('data-index');
             
        } else {
            selectedIndex = e;
        }
       
        // get the selected contact based on the index from the controller
        const selectedItem = addressBookApp.getContact(selectedIndex);

        // cache the contact details module 
        const $ContactItemUI = document.getElementById('contact-item-details');

        // render the data on the module
        $ContactItemUI.innerHTML = `${selectedItem['fname']} <br> ${selectedItem['lname']} <br> ${selectedItem['phone']} <br> ${selectedItem['email']}`;

        this.hightlightCurrentListItem(selectedIndex);
       
    }


    hightlightCurrentListItem(selectedIndex) {
        const $ContactListItems = document.getElementsByClassName('contact-list-item');

        for (let i = 0, len = $ContactListItems.length; i < len; i++) {
            $ContactListItems[i].classList.remove('active');
        }

        $ContactListItems[selectedIndex].classList.add("active")
    }


    renderContactListModule() {

        // model
        const contacts = addressBookApp.getContacts();

        // view 
        const $ContactListUI = document.getElementById('contact-list')
        $ContactListUI.innerHTML = '';

        

        // ctrl
        for (let i = 0, len = contacts.length; i < len; i++) {

          

            // edit icon
            let $editIcon = document.createElement('small');
            $editIcon.setAttribute('class', 'edit-contact-btn');
            $editIcon.setAttribute('data-index', i);
            $editIcon.innerHTML = '&#9998';
            $editIcon.addEventListener("click", this.editContactBtnClicked.bind(this));

            // remove icon
            let $removeIcon = document.createElement('small');
            $removeIcon.setAttribute('class', 'remove-contact-btn');
            $removeIcon.setAttribute('data-index', i);
            $removeIcon.innerHTML = '&#9747';
            $removeIcon.addEventListener("click", this.removeContact.bind(this));

            // label div
            let $div = document.createElement('div');
            $div.innerHTML = `${contacts[i]['fname']}, <strong>${contacts[i]['lname']}</strong> `;
            $div.append($removeIcon);
            $div.append($editIcon);

              // list item
            let $li = document.createElement('li');
            $li.setAttribute('class', 'contact-list-item');
            $li.setAttribute('data-index', i);


            $li.append($div);
            $li.addEventListener("click", this.renderContactDetailsModule.bind(this));

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