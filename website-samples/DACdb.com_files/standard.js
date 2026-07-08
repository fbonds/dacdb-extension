$(document).ready(function(){

	$('.ValidFileName').keypress(function(e){
		var txt = String.fromCharCode(e.which);
		if (txt.match(/[A-Za-z0-9+#.\-\_\(\)\{\}\'\$\%\!]/)) {
			return true;
		}
		return false;
	});

	$('.DecimalFormat').bind('change', function() {
		var amt = parseDecimal( $(this).val( ) );
		if ( isNaN(amt) ) { amt = 0.00;}
		$(this).val ( DecimalFormat(amt) );
	});
	$('.NumberFormat').bind('change', function() {
		var amt = parseInt( $(this).val( ) );
		if ( isNaN(amt) ) { amt = 0;}
		$(this).val ( NumberFormat(amt) );
	});

	$('.LCase').bind('change', function() {
		var s = $(this).val( );
		$(this).val ( s.toLowerCase() );
	});
	$('.UCase').bind('change', function() {
		var s = $(this).val( );
		$(this).val ( s.toUpperCase() );
	});
	$('.ProperCase').bind('change', function() {
		var s = $(this).val().split(" ");
		var pc = new Array();
		for(x in s){
			if ( s[x] == 'III' )
				pc.push(s[x]);
			else
				pc.push(s[x].charAt(0).toUpperCase() + s[x].substr(1).toLowerCase());
		}
		var pc=pc.join(" ").trim();
		$(this).val( pc );
	});

	$('.MinZero').on('change', function() {
		if ( $(this).val().trim().length == 0)
			$(this).val ( 0 );
	});
	
	// old-version check on or off the check box -- based on tables and nearest TR	
	$('.CheckOn').bind('click', function() {
		var tr = $(this).closest('tr');
		if ($(this).attr("title") == "On"){
			tr.find("input").attr('checked','checked');
		}else{
			tr.find("input").removeAttr('checked');
		}
		return false;
	});
	$('.CheckOff').bind('click', function() {
		var tr = $(this).closest('tr');
		if ($(this).attr("title") == "Off"){
			tr.find("input").removeAttr('checked');
		}else{
			tr.find("input").attr('checked','checked');
		}
		return false;
	});

	// new-version check on or off the check box -- based on tables and nearest TR	
	$('.Checkit').on('click', function() {
		if ($(this).attr("id") == "On")
			$(this).closest('tr').find('td input:checkbox').prop('checked', true);
		else
			$(this).closest('tr').find('td input:checkbox').prop('checked', false);
		return false;
	});

	// check on or off the check box -- based on tables and nearest TR	
	$('.Refresh').on('change', function() {
		document.form.submit();
	});

	$('.Reload').on('change', function() {
		RefreshTable(0);
	});

	$( ".Date" ).datepicker({
		showOn: 'both',
		buttonImage : '/images/cal.gif',
		buttonText : 'Click Calendar',
		changeMonth: true,
		changeYear: true,
		numberOfMonths: 1
	});

	Initialize();

	function Initialize() {
		// $( ".buttontext" ).button();   removed erroring
		$(".maximize").hide();
		$('.searchwrap').hide();
		$("#windowiconstandard").hide();
		SetButtons();
		SetSideBarHeight();
		$( ".popupdate" ).datepicker();
		$( ".TxtInDatePicker" ).datepicker();
		$('#nav li ul').slideDown();
		$( "#expandsearch1" ).button({				// Display Option Button
			icons: {
				primary: "ui-icon-expand"
			},
			text: false
		});
	}

	function SetSideBarHeight() {
		$(".sidebarcolumn").css("height", $(document).height() );
	}

	$( "#windowiconfullscreen" ).click(function() {		// hide side bar
		$( ".sidebarcolumn" ).hide();
		$( ".contentwrap" ).css("margin-left","0px");
		$( "#windowiconfullscreen" ).hide();
		$( "#windowiconstandard" ).show();
		return false;
	});

	$( "#windowiconstandard" ).click(function() {		// show side bar
		$( ".sidebarcolumn" ).show();
		$( ".contentwrap" ).css("margin-left","200px");
		$( "#windowiconstandard" ).hide();
		$( "#windowiconfullscreen" ).show();
		return false;
	});

	$('#nav > li > a').click(function(){
		if ($(this).attr('class') != 'active'){
			//$('#nav li ul').slideUp();
			$(this).next().slideToggle();
			$('#nav li a').removeClass('active');
			$(this).addClass('active');
		}
	});

	// Typical Actions for Word, Excel, and PMail

	$( "#screenicon" ).click(function() {
		$('#form').attr('action', 'RunReport.cfm');
		$('#form').submit();
	});

	$( "#pdficon, #pdf" ).click(function() {
		$('#form').attr('action', 'ToPDF.cfm');
		$('#form').submit();
	});

	$( "#wordicon, #word" ).click(function() {
		// alert("wordicon");
		$('#form').attr('action', 'ToWord.cfm');
		$('#form').submit();
	});

	$( "#excelicon, #excel" ).click(function() {
		// alert("excelicon");
		$('#form').attr('action', 'ToExcel.cfm');
		$('#form').submit();
	});

	$( "#pmailicon, #pmail" ).click(function() {
		$('#form').attr('action', '/Pmail2/Index.cfm');
		$('#form').submit();
	});

	$("#printicon, #print").click(function() {
		// alert("printicon");
		$(".contentwrap, .contentwrapcenter, .content-wrapper").css("width","900px");		//was 960  use with  @media print {body {zoom:80%; font-size: 8pt; margin:0; padding:0; background: #fff;}
		$( ".sidebarcolumn" ).hide();
		$( ".contentwrap, .content" ).css("margin-left","0px");
		function myLoop2 () {
			setTimeout(function () {
				window.print();
			},1000)
		}
		myLoop2();

		function myLoop3 () {
			setTimeout(function () {
				$( ".contentwrap, .contentwrapcenter, .content-wrapper" ).css("width","");
				$( ".sidebarcolumn" ).show();
			},2000)
		}
		myLoop3();
		return false;
	});

	$( ".FormLabelLink" ).click(function() {
		$( ".dialogwrapper" ).empty();
		$( ".dialogwrapper" ).html( $(this).parents().eq(0).attr("title") );
		$( ".dialogwrapper" ).dialog({ modal:true, buttons: [
			{
				text: "Close",
				click: function() { $(this).dialog("close"); }
			}
		] });
		return false;
	});

	$( "#switchclub" ).click(function() {
		$("#dialogclubs").dialog({ modal: true, minWidth: 800,
			title:	'Switch Club',
			buttons: [
				{ text: "Close", click: function() {
					//$("#form2").submit();
					$(this).dialog("close") ;
				} }
			]
		});
	});

	function SetButtons() {
		$( ".button, .buttonl, .buttonc" ).button({
			text: true
		});
		$( ".goldbutton, .goldbuttonc, .goldbuttonl" ).button({
			text: true
		});
		$( "#GoldButton" ).button({
			text: true
		});
		$( "#EditButton" ).button({
			text: true
		});
		$( ".editbutton, .editbuttonc, .editbuttonl" ).button({
			text: true
		});

		// Typical Buttons at Top Right of Screen

		$( "#screenicon, #screenicon2" ).button({
			icons: {
				primary: "ui-icon-screen"
			},
			text: false
		});
		$( "#wordicon, #wordicon2" ).button({
			icons: {
				primary: "ui-icon-word"
			},
			text: false
		});
		$( "#excelicon, #excelicon2" ).button({
			icons: {
				primary: "ui-icon-excel"
			},
			text: false
		});
		$( "#xmlicon" ).button({
			icons: {
				primary: "ui-icon-xml"
			},
			text: false
		});
		$( "#pmailicon, #pmailicon2" ).button({
			icons: {
				primary: "ui-icon-pmail"
			},
			text: false
		});
		$( "#printicon, #printicon2" ).button({
			icons: {
				primary: "ui-icon-printer"
			},
			text: false
		});
		$( "#vfcicon" ).button({
			icons: {
				primary: "ui-icon-vfc"
			},
			text: false
		});
		$( "#pdficon, #pdficon2" ).button({
			icons: {
				primary: "ui-icon-pdf"
			},
			text: false
		});

		$( "#windowiconstandard" ).button({
			icons: {
				primary: "ui-icon-normscreen"
			},
			text: false
		});
		$( "#switchclub, #switchclub2" ).button({
			icons: {
				primary: "ui-icon-switch"
			},
			text: false
		});
		$( "#windowiconfullscreen" ).button({
			icons: {
				primary: "ui-icon-fullscreen"
			},
			text: false
		});
		$( "#programconfig" ).button({
			icons: {
				primary: "ui-icon-blackgear"
			},
			text: false
		});

		// Dashboard  ICONS - USE CLASS identifier below -- there maybe more than one!!!!

		$( "#contacticon" ).button({
			icons: {
				primary: "ui-icon-vfc"
			},
			text: false
		});
		$( ".settingsicon" ).button({
			icons: {
				primary: "ui-icon-gear"
			},
			text: false
		});
		$( "#searchicon" ).button({
			icons: {
				primary: "ui-icon-search"
			},
			text: false
		});

		// Dashboard Widget ICONS - USE CLASS identifier below -- there maybe more than one!!!!
		$( ".programsettings" ).button({
			icons: {
				primary: "ui-icon-smallgear"
			},
			text: false
		});
		$( ".smallmin" ).button({
			icons: {
				primary: "ui-icon-smallmin"
			},
			text: false
		});
		$( ".smallmax" ).button({
			icons: {
				primary: "ui-icon-smallmax"
			},
			text: false
		});
		$( ".smallpmail" ).button({
			icons: {
				primary: "ui-icon-smallpmail"
			},
			text: false
		});
		$( ".smallword" ).button({
			icons: {
				primary: "ui-icon-word20"
			},
			text: false
		});
		$( ".smallexcel" ).button({
			icons: {
				primary: "ui-icon-excel20"
			},
			text: false
		});

	}

	$(window).resize(function() {
		SetSideBarHeight();
	});

	$(window).scroll(function() {
		SetSideBarHeight();
	});

	// left Nav Content Switch
	var contractsymbol ='../images/arrowright.png' 	//Path to image to represent contract state.
	var expandsymbol   ='../images/arrowdown.png' 	//Path to image to represent expand state.
	// $(".switchcontent").hide();
	
	$(".content").click(function()   {
		$(this).next(".switchcontent").slideToggle(250);
		if ($(this).closest('li').find('img:first-child').attr('src') == contractsymbol )
			$(this).closest('li').find('img:first-child').attr('src', expandsymbol);
		else
			$(this).closest('li').find('img:first-child').attr('src', contractsymbol);

	});

	$('#headersearch').keyup(debounce(function (event) {
		$("#Filter").val($('#headersearch').val());		//Copy search field not in form scope
		$("#Startrow").val( 1 );						//Set StartRow back to 1
		RefreshTable();
		}, 250)
	);

	$('#Filter').keyup(debounce(function (event) {		// New way
		$("#Startrow").val( 1 );						//Set StartRow back to 1
		RefreshTable();
		}, 250)
	);
});

function debounce(fn, delay) {
	var timer = null;
	return function () {
		var context = this, args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function () {
		fn.apply(context, args);
	}, delay);
	};
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

function minZero(v) {
if (v.value == '') {
	v.value = 0;
	}
 return true; 
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

function noEnter(e) {		// Do not allow Enter Key to cause submission
var keycode;
	if (window.event)  
		keycode = window.event.keyCode;
	else if (e) 
		keycode = e.which;
  return !(keycode == 13); 
}