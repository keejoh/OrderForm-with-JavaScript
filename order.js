/*
   Filename: order.js
*/

//Called on the load event of the form
/* function initForm() {
//Code that displays the current date:
	var current = new Date();
	var myMonth = current.getMonth()+1<10 ?  '0' +((current.getMonth())+1) : current.getMonth()+1; 
	var myDate = current.getDate()<10 ?  '0' +((current.getDate())) : current.getDate(); 
	var currentDate = myMonth+"-"+  myDate +"-" +  current.getFullYear();

	document.getElementById("date").value=currentDate;
//Code that hides the phone field:
	//hide the phone number field on load if the subscribe button is not checked 
	var phoneBox=document.getElementById("subscribe");
	if(phoneBox.checked == false){
		document.getElementById("fSetSelection").hidden=true;
	}

//Code that disablse the submit button
	var mySubmitButtons = document.getElementById("myButtons").getElementsByTagName("input");
	mySubmitButtons[1].disabled=true;
} */
//Called when the calculate button is clicked
function calculateTotal() {
	//get the values inside the form
	var frm = document.getElementById("orders");
	//get the submit and reset buttons values 
	var mySubmitButtons = document.getElementById("myButtons").getElementsByTagName("input");
	//allow submit button to be able to be used 
	mySubmitButtons[1].disabled=false;
	//check and validate the values entered into the form 
	if((parseInt(frm.qty1.value)==0 ||frm.qty1.value=="") && (parseInt(frm.qty2.value)==0 ||frm.qty2.value=="")&&(parseInt(frm.qty3.value)==0 ||frm.qty3.value=="")){
		alert("You must order at least one product and use a numerical amount");
	}
	else if(isNaN(frm.qty1.value)||isNaN(frm.qty2.value) ||isNaN(frm.qty3.value)){
		alert("You must order at least one product and use a numerical amount");
	}

	//Calculate the total of the order and display it in the total field
	//Need to calculate the taxes too and add it to subtotal. Enable the submit button when the total is calculated properly.
	//validate one of the correct zipcodes was entered
	else if(!(frm.zipcode.value=="46901" || frm.zipcode.value=="46902" || frm.zipcode.value=="46903"|| frm.zipcode.value=="46904")){
		alert("You must enter either 46901, 46902, 46903, or 46904 as a zipcode");
	}
	//calculate the total now that all values have been validated 
	else{
		//get zipcode value 
		var zipcode = frm.zipcode.value;
		var shippingCost= 0;
		//set the correct zipcode shipping cost
		if(zipcode == "46901"){
			shippingCost= 4.95;
		}
		if(zipcode == "46902"){
			shippingCost= 5.95;
		}
		if(zipcode == "46903"){
			shippingCost= 6.95;
		}
		if(zipcode == "46904"){
			shippingCost= 7.95;
		}	
		if(frm.qty1.value==""){
			frm.qty1.value=0;
		}
		if(frm.qty2.value==""){
			frm.qty2.value=0;
		}
		if(frm.qty3.value==""){
			frm.qty3.value=0;
		}
		//set values for each cost of the items chosen
		var cost1 = parseFloat(frm.price1.value)* parseFloat(frm.qty1.value);
		var cost2 = parseFloat(frm.price2.value)* parseFloat(frm.qty2.value);
		var cost3 = parseFloat(frm.price3.value)* parseFloat(frm.qty3.value);
		//update values inside the form
		frm.cost1.value=cost1.toFixed(2);
		frm.cost2.value=cost2.toFixed(2);
		frm.cost3.value=cost3.toFixed(2);
		//calculate tax amoount 
		var taxTotal = (cost1+cost2+cost3)*.05;
		//update form value for tax 
		frm.tax.value=taxTotal.toFixed(2);
		//set total value/cost of order
		var completeTotal = (cost1+cost2+cost3+taxTotal+shippingCost);
		//update form with the total cost of the order
		frm.total.value=completeTotal.toFixed(2);
	}
}
//Called on the onclick event of the subscribe checkbox
function handleSubscription() {
	//either hides or reveals the phone box field based on if the phone option is checked 
	var phoneBox=document.getElementById("subscribe");
	if(phoneBox.checked == false){
		document.getElementById("fSetSelection").hidden=true;
	}
	else {
		document.getElementById("fSetSelection").hidden=false;
	}
}

//Called on the submit event of the submit button.
function handleSubmit() {
//DON'T VALIDATE PHONE IF THE CHECKBOX IS NOT CHECKED
//Else validate the phone number using a regular expression
	//get value of the phone number checkbox  
	var phoneBox=document.getElementById("subscribe");
	//only validate phone number if the phone number option is checked 
	if(phoneBox.checked == true){
		//get the phone number value 
		var phoneNumber = document.getElementById("phone").value;
		//regular expression for validating the phone number 
		var validatePhone = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
			//validate the phone number 
			if(!(validatePhone.test(phoneNumber))){
				alert("That phone number is not valid");
				return false;
	}

}

}