function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
      });
}

/*An array containing all the country names in the world:*/
var countries = ["Singerbhil Airport","Agatti Aerodrome Pandit Deen Dayal Upadhyay Airport","Sardar Vallabh Bhai Patel International Airport","Lengpui Airport","Bamrauli Airport","Sri Guru Ram Dass Jee International Airport","Chikkalthana Airport","Bagdogra Airport","Kempegowda International Airport","Sambre Airport","Bhavnagar Aerodrome","Raja Bhoj","Shyamji Krishna Verma Bhuj Airport","Bodhgaya Airport","Shaheed Bhagat Singh International Airport","Chennai International Airport","Coimbatore International Airport","Jolly Grant","Gaggal Airport","Mohanbari","Dimapur Airport","Diu Airport","Dabolim Airport","Mahayogi Gorakhnath Airport","Lokpriya Gopinath Bordoloi","Rajmata Vijaya Raje Scindia Air Terminal","Rajiv Gandhi International Airport","Bir Tikendrajit International Airport","Devi Ahilya Bai Holkar Airport","Dumna Airport","Jaipur International Airport","Jammu Civil Enclave","Civil Enclave Jamnagar","Civil Airport Jodhpur","Rowriah Airport","Gandhidham Airport","Ganesh Shanker Vidhyarthi Airport","Civil Aerodrome Khajuraho","Cochin International Airport","Netaji Subhas Chandra Bose Karipur Airport","Bhuntar Latur Airport","Kushok Bakula Rimpochee Airport","Lilabari Airport","Chaudhary Charan Singh International Airport","Sahnewal Airport","Madurai Airport Bajpe airport","Chhatrapati Shivaji International Airport","Mandakalli airport","Dr. Babasaheb Ambedkar International Airport","Indira Gandhi Pathankot Airport","Jay Prakash Narayan International Airport","Porbandar Airport","Veer Savarkar International Airport","Pune International Airport","Swami Vivekananda Airport","Rajahmundry Airport","Rajkot Airport","Birsa Munda Airport","Umroi Airport","Shimla Airport","Silchar Airport","Srinagar International Airport","Surat Tezpur Airport","Tirupati International Airport","Tiruchirappalli International Airport","Trivandrum International Airport","Tuticorin Airport","Maharana Pratap Airport","Civil Aerodrome","Lal Bahadur Shastri International Airport","Vijayawada International Airport","Vishakhapatnam Airport","Kolhapur Airport","Jindal Vijaynagar Airport","Sonari Airport","Solapur Airport","Cochin International Airport"];

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), countries);
autocomplete(document.getElementById("myInput1"), countries);