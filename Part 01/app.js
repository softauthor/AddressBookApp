/*

	Application Name: Address Book
	Author: Raja Tamil

	Description: I built a simple AddressBook App to demonstrate how to write testable code that I have been exploring recently. 


	1. Seperation of concerns - MVC
	2. Avoid Ananmoys function
	3. Functions should be small and more than 10 must be split
	4. I have used ES6, Object-Oriented, MVC 

*/

// ============== Model =========================
const contactsData = [
  {
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





// ============== Controller =========================

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


	renderContactListModule() {

		// model
        const contacts = addressBookApp.getContacts(); 

        // view 
        const $ContactListUI = document.getElementById('contact-list')
        $ContactListUI.innerHTML = '';

        // ctrl
        for (let i = 0, len = contacts.length; i < len; i++) {
            let $li = document.createElement('li');
            $li.setAttribute('class', 'contact-list-item');
            $li.setAttribute('data-index', i);
            
            $li.innerHTML = `<div>${contacts[i]['fname']}, <strong>${contacts[i]['lname']}</strong></div>`;

            $ContactListUI.append($li);
        }

	}

}

const addressBookView = new AddressBookView();

const addressBookApp = new AddressBookCtrl(addressBookView);
addressBookApp.init();

