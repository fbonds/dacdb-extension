// @d 		String. Required.
// @zeros 	Mixed. Optional.
// @trunc 	Boolean. Optional.
//	here's a function to accompany the existing parseInt and parseFloat functions. However, unlike these two, 
// parseDecimal function will strip all characters that are non-numeric before attemting to provide a return 
// value...plus you can provide any number of decimal places to round it to or truncate it


function numDaysBetween (date1, date2) {
	var timeDiff = Math.abs(date2.getTime() - date1.getTime());
	var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
 	return diffDays;
};

function parseDecimal(d, zeros, trunc) {
//d=d.replace(/[^\d\.]/g,"");
d=d.replace(/[a-zA-Z\!\@\#\$\%\^\&\*\(\)\_\+\=\{\}\|\[\]\\\:\"\;'\<\>\?\,\/\~\`]/g,"");
while (d.indexOf(".") != d.lastIndexOf("."))
	d=d.replace(/\./,"");
if (typeof zeros == 'undefined' || zeros == "") {
	return parseFloat(d);
	}
else {
	var mult = Math.pow(10,zeros);
	if (typeof trunc == 'undefined' || (trunc) == false)
		return parseFloat(Math.round(d*mult)/mult);
	else
		return parseFloat(Math.floor(d*mult)/mult);
	}
}

function openURL(url, t, a, x, y) {
var w = 550;
var h = 600;
if (x != null) w = x;
if (y != null) h = y;
if (a != null && a.length > 0) 
	var attr = a;
else {
	var LeftPosition = (screen.width) ? (screen.width-w)/2 : 0;
	var TopPosition = (screen.height) ? (screen.height-h)/2 : 0;
	var attr = 'height='+h+',width='+w+',top='+TopPosition+',left='+LeftPosition+',scrollbars=Yes,status=No,resizable,toolbar=No,menubar=No';
	}
if (t == null)
	var target = "_blank";
else
	var target = t;
winpops = window.open(url, target, attr);
winpops.focus(); 
}

function openURL2(url, t, a, x, y) {
	var w = 550;
	var h = 600;
	if (x != null) w = x;
	if (y != null) h = y;
	if (a != null && a.length > 0) 
		var attr = a;
	else {
		var LeftPosition = (screen.width) ? (screen.width-w)/2 : 0;
		var TopPosition = (screen.height) ? (screen.height-h)/2 : 0;
		var attr = 'height='+h+',width='+w+',top='+TopPosition+',left='+LeftPosition+',scrollbars=Yes,status=No,resizable,toolbar=No,menubar=No';
		}
	if (t == null)
		var target = "_blank";
	else
		var target = t;
	winpops = window.open(url, target, attr);
	winpops.focus();
	return false;
}

function Asc(String) {
	return String.charCodeAt(0);
}

function Chr(AsciiNum) {
	return String.fromCharCode(AsciiNum)
}

function noEntry() {		//do not allow field entry
  return false;
}

function noEnter(e) {		// Do not allow Enter Key to cause submission
var keycode;
	if (window.event)  
		keycode = window.event.keyCode;
	else if (e) 
		keycode = e.which;
  return !(keycode == 13); 
}

function noDelim(c, e) {		// Do not allow Enter Key OR C to cause submission or be entered
var v = c.charCodeAt(0);
var keycode;
	if (window.event)  
		keycode = window.event.keyCode;
	else if (e) 
		keycode = e.which;

  return !(keycode == 13 || keycode == v); 
}

// Added keycode == 118 so FF string paste is allowed  09/06/09 MRL
function numberOnly(e) {
var keycode;
	if (!e) {
		var e = window.event;
		}
	if (e.keyCode) {
		keycode = e.keyCode;
		} 
	else {
		if (e.which) {
			keycode = e.which;
			if (keycode == 118 || keycode == 99)	// allow FF string paste and CTRL-C CTRL-V
				return true;
		}
	}
	return (keycode >= 48 && keycode <= 57 || keycode == 8 || keycode == 9)
}

function numberEnterOnly(e) {	//needed for scanner input
var keycode;
	if (window.event)  
		keycode = window.event.keyCode;
	else if (e) 
		keycode = e.which;
	return ( (keycode >= 48 && keycode <= 57) || keycode == 13);
}

function numberListOnly(e) {  // allow comma(,)  and numbers.
var keycode;
	if (!e) {
		var e = window.event;
		}
	if (e.keyCode) {
		keycode = e.keyCode;
		} 
	else {
		if (e.which) {
			keycode = e.which;
		}
	}
	return ( (keycode >= 48 && keycode <= 57) || keycode == 44 || keycode == 8 )
}
function moneyOnly(e) {  // allow period(46)[190], minus(45)[189], CR(13), comma(44)[188]  and numbers.
	var keycode;
		if (!e) {
			var e = window.event;
			}
		if (e.keyCode) {
			keycode = e.keyCode;
			} 
		else {
			if (e.which) {
				keycode = e.which;
			}
		}
		console.log( keycode );
		// return ( (keycode >= 48 && keycode <= 57) || keycode == 46 || keycode == 45 || keycode == 44 || keycode == 8 || keycode == 9)
		return ( (keycode >= 48 && keycode <= 57) || keycode == 46 || keycode == 45 || keycode == 44 || keycode == 8 || keycode == 9 || keycode == 190 || keycode == 189 || keycode == 188)
}

function decimalOnly(e) {  // allow period(46)[190], minus(45)[189]), CR(13)  and numbers.
var keycode;
	if (!e) {
		var e = window.event;
		}
	if (e.keyCode) {
		keycode = e.keyCode;
		} 
	else {
		if (e.which) {
			keycode = e.which;
		}
	}
	console.log( keycode );
	// return ( (keycode >= 48 && keycode <= 57) || keycode == 46 || keycode == 45 || keycode == 8 || keycode == 9)
	return ( (keycode >= 48 && keycode <= 57) || keycode == 46 || keycode == 45 || keycode == 8 || keycode == 9 || keycode == 190 || keycode == 189)
}

function positiveDecimalOnly(e) {  // allow period(46), CR(13)  and numbers.  Registration cost entry (questiontype=11)
var keycode;
	if (!e) {
		var e = window.event;
		}
	if (e.keyCode) {
		keycode = e.keyCode;
		} 
	else {
		if (e.which) {
			keycode = e.which;
		}
	}
	// return ( (keycode >= 48 && keycode <= 57) || keycode == 46 || keycode == 8 || keycode == 9)
	return ( (keycode >= 48 && keycode <= 57) || keycode == 46 || keycode == 8 || keycode == 9 || keycode == 190)
}
// removed $ from list 8/4/07
// added 8/10/08  \/[]
// removed @ to allow for email in text area
// EMail allows: (a�z, A�Z) or 0 to 9 or . ! # $ % & ' * + - / = ? ^ _ ` { | } ~ 

function noDelimMin(e) {
var inValidChars = "|,";
var keycode;
	if (window.event)  
		c = window.event.keyCode;
	else if (e) 
		c = e.which;
	for (var i = 0; i < inValidChars.length; i++) {	
		if (c == inValidChars.charCodeAt(i) || c == 13) {
			return false;
			}
		}	
   return true;
}
function noDelimChars(e) {
var inValidChars = "_!#%^,:;|\\/\"\'<>[]";
var keycode;
	if (window.event)  
		c = window.event.keyCode;
	else if (e) 
		c = e.which;
	for (var i = 0; i < inValidChars.length; i++) {	
		if (c == inValidChars.charCodeAt(i) || c == 13) {
			return false;
			}
		}	
   return true;
}
function validFolderName(e) {
	var inValidChars = "+$&@?{}[]=<>:!#%^,:;*|\\/\"\'";
	var keycode;
		if (window.event)  
			c = window.event.keyCode;
		else if (e) 
			c = e.which;
		for (var i = 0; i < inValidChars.length; i++) {	
			if (c == inValidChars.charCodeAt(i) || c == 13) {
				return false;
				}
			}	
	   return true;
	}

function validVarName(e) {
	var inValidChars = "-&@_!#%^,:;|\\/\"\'<>[]()*$";
	var keycode;
		if (window.event)  
			c = window.event.keyCode;
		else if (e) 
			c = e.which;
		for (var i = 0; i < inValidChars.length; i++) {	
			if (c == inValidChars.charCodeAt(i) || c == 13) {
				return false;
				}
			}	
	   return true;
	}
//Added to support Text Area Entry w Returns
//removed @ 5/24/12 to allow emails to be entered.
function noDelimTextArea(e) {
var inValidChars = "_!#%^,:;|\"\'<>";
var IsValid = true;
var keycode;
	if (window.event)  
		c = window.event.keyCode;
	else if (e) 
		c = e.which;

	for (var i = 0; i < inValidChars.length; i++) {	
		if (c == inValidChars.charCodeAt(i)) {
			return false;
			}
		}	
   return IsValid;
}

function gsm338Only(e) {  // [a-z][A-Z][0=9].
	var keycode;
	if (window.event)  
		keycode = window.event.keyCode;
	else if (e) 
		keycode = e.which;

	return ( (keycode >= 32  && keycode <= 63)  ||
			 (keycode >= 65  && keycode <= 95)  ||
			 (keycode >= 97  && keycode <= 125) || 
			 keycode == 196 || keycode == 214 || keycode == 209 || keycode == 220 || keycode == 201
		   )
}

function alphaNumericOnly(e) {  // [a-z][A-Z][0=9].
var keycode;
	if (window.event)  
		keycode = window.event.keyCode;
	else if (e) 
		keycode = e.which;

	return ( (keycode >= 48  && keycode <= 57)  || 
			 (keycode >= 65  && keycode <= 90)  ||
			 (keycode >= 97  && keycode <= 122) )
}
function alertListOnly(e) {  // allow minus(45), comma(44)  and numbers.
	var keycode;
		if (window.event)  
			keycode = window.event.keyCode;
		else if (e) 
			keycode = e.which;
		return ( (keycode >= 48 && keycode <= 57) || keycode == 44 || keycode == 45 || keycode == 8 || keycode == 68 || keycode == 72 || keycode == 100 || keycode == 104)
	}
function numericListOnly(e) {  // allow minus(45), comma(44) D, H and numbers.
var keycode;
	if (window.event)  
		keycode = window.event.keyCode;
	else if (e) 
		keycode = e.which;
	return ( (keycode >= 48 && keycode <= 57) || keycode == 44 || keycode == 45 || keycode == 8 )
}
function Max100(n) {
	if (n.value > 100) {
		alert("too large");
		n.value = 100;
		return false;
		}
	return true;
}

function minZero(v) {
	if (isNaN(v.value) )
		v.value = 0;
	if (v.value == '') {
		v.value = 0;
		}
  return true; 
}

function minValue(v, d) {
	if (isNaN(v.value) )
		v.value = d;
	if (v.value == '') {
		v.value = d;
		}
	if (v.value < d) {
		v.value = d;
		}
  return true; 
}

function minZeroDollar(v) {
	if (v.value == '') {
		v.value = '0.00';
		}
  return true; 
}
function minZeroDecimal(v) {
	if (isNaN(v.value) )
		v.value = '0.00';
	if (v.value == '') {
		v.value = '0.00';
		}
  return true; 
}

function fmtDecimal(v) {
	v.value = DecimalFormat(v.value);
}

function isEmpty(s) { 
	return ((s == null) || (s.length == 0))
}
// Return false if characters are a-z, A-Z, or digits.   
function check_numeric(field_name,field_val) 
{
	str=field_val;
	for (var i = 0; i < str.length; i++) 	
	{      
		var ch = str.substring(i, i + 1);      
		if ((ch < "0" || ch > "9")  && (ch != "." || ch != "-")) 
		{         
			alert("\n "+ field_name + " should be Numeric only \n\nPlease re-enter.");         
			return true;
		}      
	}   
	return false;
}	

function trim(inputString) {
   if (typeof inputString != "string") { return inputString; }
   var retValue = inputString;
   var ch = retValue.substring(0, 1);
   while (ch == " ") { // Check for spaces at the beginning of the string
      retValue = retValue.substring(1, retValue.length);
      ch = retValue.substring(0, 1);
   }
   ch = retValue.substring(retValue.length-1, retValue.length);
   while (ch == " ") { // Check for spaces at the end of the string
      retValue = retValue.substring(0, retValue.length-1);
      ch = retValue.substring(retValue.length-1, retValue.length);
   }
   while (retValue.indexOf("  ") != -1) { // Note that there are two spaces in the string - look for multiple spaces within the string
      retValue = retValue.substring(0, retValue.indexOf("  ")) + retValue.substring(retValue.indexOf("  ")+1, retValue.length); // Again, there are two spaces in each of the strings
   }
   return retValue;
} 

function view_article(filepathname)
{
	var win = window.open(filepathname, '', 'width=750,height=550,top=100,left=50,scrollbars,resizable,menubar')
	win.focus()
}

function ucase (m) {
var	s = '';
	for (c=0; c < m.length; c=c + 1) {
	  	s = s + m.charAt(c).toUpperCase(); 
	}
	m = trim(s);
}

function UpperCase (m) {
var	s = '';
	for (c=0; c < m.value.length; c=c + 1) {
	  	s = s + m.value.charAt(c).toUpperCase(); 
	}
	m.value = trim(s);
}

function lcase(m) {
var	s = '';
	for (c=0; c < m.length; c=c + 1) {
	  	s = s + m.charAt(c).toLowerCase(); 
	}
	m = trim(s);
}

function LowerCase (m) {
var	s = '';
	for (c=0; c < m.value.length; c=c + 1) {
	  	s = s + m.value.charAt(c).toLowerCase(); 
	}
	m.value = trim(s);
}

function ProperCase (m) {
//	alert (m.value);
var p;
	s = '';
	for (c=0; c < m.value.length; c=c + 1) {
 			p = c + 1;
			if (m.value.charAt(c) == ' ') {
			  	s = s + ' ' + m.value.charAt(p).toUpperCase(); 
			    c = c + 1;
			}
			else if (m.value.charAt(c) == "'") {
			  	s = s + "'" + m.value.charAt(p).toUpperCase(); 
			    c = c + 1;
			}
		    else {
				if (c == 0)
				   s = s + m.value.charAt(c).toUpperCase();
				else
				   s = s + m.value.charAt(c).toLowerCase();
			}
 	}	//for statement
	m.value = s;
}

function IsValidURLName(sText) {		// Fill Out 
	return true;
}

function IsValidFileName(sText)	{   //  \\ / : * \" < > | , @ % & ' # ^ = ? +
var ValidChars = "\\/:*\"\;<>|,@%*&'#^=?+";
var c;
   for (i = 0; i < sText.length; i++) { 
      c = sText.charAt(i); 
      if (ValidChars.indexOf(c) >= 0) {
         return false;
         }
      }
   return true;
}

function IsNumeric(sText) { 
   var ValidChars = "0123456789.-";
   var IsNumber=true;
   var Char;
   for (i = 0; i < sText.length && IsNumber == true; i++) { 
      Char = sText.charAt(i); 
      if (ValidChars.indexOf(Char) == -1)  {
         IsNumber = false;
         }
      }
   return IsNumber;
}

function DecimalFormat(s) {
var amt = 0.0;
var v = 0.0;

	v = trim(s);	
	if (v.length == 0) 
		return '0.00';
		
	if (IsNumeric(v) == true) {
		var	amt	= parseFloat(v);
		amt = amt.toFixed(2);
		return amt;
		}
	else {
		alert("not numeric");
	}	
	return '0.00';
}

function MoneyFormat(s) {
var amt = 0.0;
	s.value = trim(s.value);	
	if (s.value.length == 0)
		return;
		
	if (IsNumeric(s) == true) {
		var	amt	= parseFloat(s.value);
		s.value = amt.toFixed(2);
		addAmounts();
		}
	else {
		alert("Entry [" + s.value + "] was not numeric");
		s.value = "";
	}
}

function maxChars(c, m) {
  return !(c.length > m);
}

function refreshParent() {
	if (opener != null)
		opener.location.reload();
}

function left(str, n){
	return Left(str, n);
}
	
function Left(str, n){
	if (n <= 0)
	    return "";
	else if (n > String(str).length)
	    return str;
	else
	    return String(str).substring(0,n);
}
function right(str, n) {
	return Right(str, n);
}
function Right(str, n){
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}

function Mid(str, start, len)
{
// Make sure start and len are within proper bounds
    if (start < 0 || len < 0) return "";
    var iEnd, iLen = String(str).length;
    if (start + len > iLen)
          iEnd = iLen;
    else
          iEnd = start + len;
    return String(str).substring(start,iEnd);
}

function inspect(elm){
var attr = "left=200,top=50,width=300,height=600,scrollbars=Yes,status=No,resizable,toolbar=No,menubar=No";
var str  = "";
  for (var i in elm){
    str += i + ": " + elm.getAttribute(i) + "<br>";
  }
myWindow = window.open("", "_blank", attr) 
myWindow.document.write(str);
myWindow.document.bgColor="lightyellow";
}
