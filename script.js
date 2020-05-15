function getGithubInfo(user) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it.
    // The function should finally return the object(it now contains the response!)
	// Make request to Github
    $.ajax({
        url:'https://api.github.com/users/'+username,
        data:{
          client_id:'b9315bcd5a07fcd759d8',
          client_secret:'a2b698bf7e7c02f898197cf136d1a41f704ca8e4'
        },
		statusCode: {
        404: function() {
			noSuchUser(username);
          
        }
    }
    }).done(function(user){
		if(user.name == null){
			noSuchUser(user);
		}
		else{	
		showUser(user);		
		}
      })
      
   
	
	
	


}

function showUser(user) {
    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content
	
	$('#profile').html(`
        <div class="card border-primary mb-3" style="max-width: 100rem;">
          <div class="card-header"><h3>${user.name}</h3></div>
          <div class="card-body">
            <div class="row">
            <div class="col-md-3">
              <img class="img-thumbnail avatar" src="${user.avatar_url}">
              <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
            </div>
            
            </div>
          </div>
        </div>
        `);
}

function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed
	alert(username+" not found");

}

$(document).ready(function () {
    $(document).on('keypress', '#username', function (e) {
        //check if the enter(i.e return) key is pressed
        if (e.which == 13) {
            //get what the user enters
            username = $(this).val();
		
            //reset the text typed in the input
            $(this).val("");
            //get the user's information and store the respsonse
            response = getGithubInfo(username);
            //if the response is successful show the user's details
            if (response.status == 200) {
                showUser(JSON.parse(response.responseText));
                //else display suitable message
            } else {
                noSuchUser(username);
            }
        }
    })
});
