$(document).ready(function(){

	$( "#programconfig, #config" ).click(function() {
		//console.log("programconfig, TabNo="+$("#TabNo").val());
		$( "#programwrap" ).load('Dialog/ConfigureClubMembers.cfm?TabNo='+$("#TabNo").val(), function() {

			$('#Edit').on('click', function() {
				//alert("add");
				$(this).target = "_blank";    //If you make this _blank -- it opens to a new tab.
				window.location = "../Club/ClubAdmin.cfm?Action=E&ClubID=" + $("#ClubID").val();
				return false;
			});

			DisplayOfficers();
			DisplayRegion();
			DisplayAccount();

			$("#ShowClub").on("change", function() {
				DisplayOfficers();
			});
			$("#ShowRegion").on("change", function() {
				DisplayRegion()
			});
			$("#ShowAccount").on("change", function() {
				DisplayAccount();
			});

//			$( ".Link" ).click(function() {
//				var table = $(this).closest('table');
//				if ($(this).attr("title") == "On")
//					$('td input:checkbox', table).attr('checked', 'checked');
//				else
//					$('td input:checkbox', table).removeAttr('checked', 'checked');
//			});
			$( "#ConfigSortInUse" ).sortable({
				connectWith: ".connectedSortable",
				opacity: 0.6,
				cursor: 'move',
				update: function( e, ui ) {
					var order = $(this).sortable('serialize', {key:'Q'} );
					$.post("Action/ConfigUpdateClubMembers.cfm?TabNo="+$("#TabNo").val(), order);
				}
			});
			$( ".ConfigSortAvail" ).sortable({
				connectWith: ".connectedSortable",
				opacity: 0.6,
				cursor: 'move'
			});

			var systemText  = 'Set System Default [Lvl-9]';
			var accountText = "Set Account Default";
			var defaultText = "Set Club Default";

			$("#programwrap").dialog({ modal:true, winWidth:800, width: '90%', buttons: [
				{
					text: systemText,		// (0,0,0)
					click: function() {
					var order = $("#ConfigSortInUse").sortable('serialize', {key:'Q'} );
						$.ajax({
							type: "POST",
							url: "Action/ConfigUpdateClubMembers.cfm?"+order+"&System=TRUE",
							data: $("#ConfigForm").serialize(),
							success: function(data) {
								refreshParent();
								$("#programwrap").dialog("close");
							}
						});
					}
				},
				{
					text: accountText,		// (AccountID, 0,0)
					click: function() {
					var order = $("#ConfigSortInUse").sortable('serialize', {key:'Q'} );
						$.ajax({
							type: "POST",
							url: "Action/ConfigUpdateClubMembers.cfm?"+order+"&Account=TRUE",
							data: $("#ConfigForm").serialize(),
							success: function(data) {
								refreshParent();
								$("#programwrap").dialog("close");
							}
						});
					}
				},
				{
					text: defaultText,		// (AccoutID,ClubID,0)
					click: function() {
						var order = $("#ConfigSortInUse").sortable('serialize', {key:'Q'} );
						$.ajax({
							type: "POST",
							url: "Action/ConfigUpdateClubMembers.cfm?"+order+"&Default=TRUE",
							data: $("#ConfigForm").serialize(),
							success: function(data) {
								refreshParent();
								$("#programwrap").dialog("close");
							}
						});
					}
				},
				{
					text: "Reset My Configuration",		// (AccoutID,ClubID,UserID)
					click: function() {
						$.ajax({
							type: "POST",
							url: "Action/ConfigUpdateClubMembers.cfm?Reset=TRUE",
							data: $("#ConfigForm").serialize(),
							success: function(data) {
								refreshParent();
								$("#programwrap").dialog("close");
							}
						});
					}
				},
				{
					text: "Set My Configuration",		// (AccoutID,ClubID,UserID)
					click: function() {
						var order = $("#ConfigSortInUse").sortable('serialize', {key:'Q'} );
						$.ajax({
							type: "POST",
							url: "Action/ConfigUpdateClubMembers.cfm?"+order,
							data: $("#ConfigForm").serialize(),
							success: function(data) {
								refreshParent();
								$("#programwrap").dialog("close");
							}
						});
					}
				}]
			});
			if ( $("#RoleID").val() < 9 )		// If we are not the super user, delete button
				$(".ui-dialog-buttonpane button:contains('System')").hide();
			if ( $("#RoleID").val() < 7 )		// If we are not the account Admin, delete button
				$(".ui-dialog-buttonpane button:contains('Account')").hide();
			if ( $("#RoleID").val() < 3 )		// If we are not the office, delete button
				$(".ui-dialog-buttonpane button:contains('Club')").hide();
		});
	});

	$( ".showstate" ).click(function() {
		if ( $(this).parents().eq(5).siblings().eq(0).is(":visible") ) {
			$(this).parents().eq(5).siblings().eq(0).hide();
			$(this).attr("src","../images/collapse2.gif");
		} else {
			$(this).attr("src","../images/collapse.gif");
			$(this).parents().eq(5).siblings().eq(0).show();
		}
	});

	$(".labelwrap .StandardLink").click(function() {
		$(this).parents().eq(1).find("img").not(":hidden").trigger("click");
	});

	$( "#advancedsearchlink" ).click(function() {
		if ( $(this).attr("id") == "advancedsearchlink" ){
			$(this).attr("id","advancedsearchlinkclose");
			$( ".advancedsearch" ).show();
			$( ".advancedsearchheader" ).css("border-bottom","1px solid gainsboro");
		} else {
			$(this).attr("id","advancedsearchlink");
			$( ".advancedsearch" ).hide();
			$( ".advancedsearchheader" ).css("border-bottom","");
		}
		return false;
	});

	$( "#expandsearch1" ).click(function() {
		if ( $(this).attr("id") == "expandsearch1" ){
			$(this).attr("id","expandsearchclose");
			$( ".advancedsearch" ).show();
			$( ".advancedsearchheader" ).css("border-bottom","1px solid gainsboro");
		} else {
			$(this).attr("id","expandsearch1");
			$( ".advancedsearch" ).hide();
			$( ".advancedsearchheader" ).css("border-bottom","0px solid gainsboro");
		}
		return false;
	});

	$( ".SearchControlLink" ).click(function() {
		if ($(this).attr("title") == "On"){
			$(this).parents().eq(6).siblings().eq(0).children().find("input").attr('checked','checked');
		}else{
			$(this).parents().eq(6).siblings().eq(0).children().find("input").removeAttr('checked');
		}
		return true;
	});

	$( ".checkbox" ).change(function() {
		if (this.checked) {
			var chkd = true;
			$(".subinnercontentwrapper").children().find(".checkbox").each(function (i) {
				if (  !$(this).is(':checked') )
					chkd = false;
			});
			if (chkd) {
				$("#CheckAll").attr('checked','checked');
				$("#Type").val('ClubID');
				}
			}
		else {
			$("#CheckAll").removeAttr('checked');
			$("#Type").val('UserIDs');
		}
	});

});
	
function DisplayOfficers() {
	var showCrk = $("#ShowClub").val();
	if (showCrk == 'Y')
		$(".OfficerRoleKeys").show();
	else
		$(".OfficerRoleKeys").hide();
}

function DisplayRegion() {
	var showRrk = $("#ShowRegion").val();
	if (showRrk == 'Y')
		$(".RegionRoleKeys").show();
	else
		$(".RegionRoleKeys").hide();
}

function DisplayAccount() {
	var showArk = $("#ShowAccount").val();
	if (showArk == 'Y')
		$(".AccountRoleKeys").show();
	else
		$(".AccountRoleKeys").hide();
}
