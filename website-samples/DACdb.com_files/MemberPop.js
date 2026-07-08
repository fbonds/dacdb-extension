$(document).ready(function(){

  var showDelay = 750;  
  var hideDelay = 500;  
  var currentID;
  var showTimer = null;
  var hideTimer = null;

  // One instance that's reused to show info for the current person
  var container = $('<div id="personPopupContainer">'
      + '<table width="" border="0" cellspacing="0" cellpadding="0" align="center" class="personPopupPopup">'
      + '<tr>'
      + '   <td class="corner topLeft"></td>'
      + '   <td class="top"></td>'
      + '   <td class="corner topRight"></td>'
      + '</tr>'
      + '<tr>'
      + '   <td class="left">&nbsp;</td>'
      + '   <td><div id="personPopupContent"></div></td>'
      + '   <td class="right">&nbsp;</td>'
      + '</tr>'
      + '<tr>'
      + '   <td class="corner bottomLeft">&nbsp;</td>'
      + '   <td class="bottom">&nbsp;</td>'
      + '   <td class="corner bottomRight"></td>'
      + '</tr>'
      + '</table>'
      + '</div>');

  $('body').append(container);

  $('.personPopupTrigger').on('mouseover', function()
  {
      var uid = $(this).attr('id');

      // If no uid, don't popup blank
      if (uid == '')
          return;

      if (hideTimer)
          clearTimeout(hideTimer);
      if (showTimer)
          clearTimeout(showTimer);

      var pos = $(this).offset();
      var width = $(this).width();

      showTimer = setTimeout(function() {
	      container.css({
	          left: (pos.left + width) + 'px',
	          top: pos.top - 5 + 'px'
	      });
	      $('#personPopupContent').html('&nbsp;');
	      $.ajax({
	          type: 'GET',
	          url: 'Action/MemberPop.cfm',
	          data: {
			  UserID:		 uid,
			  fMultiAccount: $("#fMultiAccount").val(),
			  fAccountEvent: $("#fAccountEvent").val()
			  },
	          success: function(data) {
	             var text = $(data).html();
	             $('#personPopupContent').html(text);
	          }
	      });
	      container.css('display', 'block');
      }, showDelay);
	  	  
  });

  $('.personPopupTrigger').on('mouseout', function()
  {
      if (hideTimer)
          clearTimeout(hideTimer);
      if (showTimer)
          clearTimeout(showTimer);
      hideTimer = setTimeout(function()
      {
          container.css('display', 'none');
      }, hideDelay);
  });

  // Allow mouse over of details without hiding details
  $('#personPopupContainer').mouseover(function()
  {
      if (hideTimer)
          clearTimeout(hideTimer);
  });

  // Hide after mouseout
  $('#personPopupContainer').mouseout(function()
  {
      if (hideTimer)
          clearTimeout(hideTimer);
      hideTimer = setTimeout(function()
      {
          container.css('display', 'none');
      }, hideDelay);
  });
});