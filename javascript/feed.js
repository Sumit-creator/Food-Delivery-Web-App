var c=1;
var cc=2;
var month = ['Jan','Feb','Mar','April','May','June','July','Aug','Sept','Oct','Nov','Dec']

function sa()
{
	swal({title: "Warning",text: "Cannot submit empty text!",type: "warning",confirmButtonText: "OK"});
}

// to enable and disable buttons when one is clicked
var stat_state=0;
var comment_state=0;
var reply_state=0;
// add user feedback to the list of feedbacks
function add(){
	if (stat_state==1)
		return 0;
	else{
		stat_state=1;
		comment_state=1;
		reply_state=1;
		var maindiv=document.createElement("div");
		
		// create textbox for user input
		var collcontent=document.createElement("textarea");
		collcontent.setAttribute("placeholder","Type your feedback here");
		collcontent.setAttribute("rows","5");
		collcontent.setAttribute("cols","100");
		
		// save the entered feedback
		var savebtn=document.createElement("input");
		savebtn.setAttribute("value","Submit");
		savebtn.setAttribute("id","btnsave");
		savebtn.setAttribute("type","button");
		savebtn.setAttribute("onclick","savefn(this.id)");

		maindiv.appendChild(collcontent);
		maindiv.appendChild(savebtn);
		var z=document.getElementById("userfd");
		z.appendChild(maindiv);
	}
}

function savefn(x){
	var date=new Date();
	sd =month[date.getMonth()]+" "+date.getDate()+" , "+date.getFullYear();
	var btn=document.getElementById(x);
	var maindiv=btn.parentNode;
	var status=btn.parentNode.children[0].value;
	if(status=='')
		sa();
	else{
		while(btn.parentNode)
			btn.parentNode.removeChild(btn.parentNode.firstChild);
		
		maindiv.setAttribute("id","fd"+c);
		maindiv.innerHTML="<strong style=\"position:absolute;top:1vh;left:5vw;color:black\">"+"Alex Parrish"+"<br></strong><p class=\"stat\"><span style=\"color:blue;\"># "+sd+"</span><br>"+status+"</p>";
		
		var likebtn=document.createElement("input");
		likebtn.setAttribute("type","button");
		likebtn.setAttribute("value","Like(0)");
		likebtn.setAttribute("id","likebtnsave"+c);
		likebtn.setAttribute("onclick","likefn(this.id)");
		
		var commentbtn=document.createElement("input");
		commentbtn.setAttribute("type","button");
		commentbtn.setAttribute("value","Comment");
		commentbtn.setAttribute("id","commentbtnsave"+c);
		commentbtn.setAttribute("onclick","commentfn(this.id)");
		
		var delbtn=document.createElement("input");
		delbtn.setAttribute("type","button");
		delbtn.setAttribute("value","Delete");
		delbtn.setAttribute("id","delbtnsave"+c);
		delbtn.setAttribute("onclick","delfn(this.id)");
		c++;

		maindiv.appendChild(likebtn);
		maindiv.appendChild(commentbtn);
		maindiv.appendChild(delbtn);
		stat_state=0;
		comment_state=0;
		reply_state=0;
	}
}

// to increase likes for a feedback
function likefn(x){
	var btn=document.getElementById(x);
	var s = btn.getAttribute("value");
	var start = s.indexOf('(');
	var end = s.indexOf(')');
	var n = Number(s.slice(start+1,end))+1;
	btn.setAttribute("value","Like("+n.toString()+")");
}

//to comment on the feedback
function commentfn(x){
	if (comment_state==1)
		return 0;
	else{
		stat_state=1;
		comment_state=1;
		var btn=document.getElementById(x);
		
		var cdiv=document.createElement("div");
		var txt=document.createElement("input");
		txt.setAttribute("type","text");
		txt.setAttribute("id","com-text"+cc);
		txt.setAttribute("placeholder","Enter your comment here");
		var savebtn=document.createElement("input");
		savebtn.setAttribute("value","comment");
		savebtn.setAttribute("id","comsave"+cc);
		savebtn.setAttribute("type","button");
		savebtn.setAttribute("onclick","com(this.id)");
		
		btn.parentNode.appendChild(cdiv);
		cdiv.appendChild(txt);
		cdiv.appendChild(savebtn);
	}
}

//to delete the whole feedback
function delfn(x){
	stat_state=0;
	comment_state=0;
	reply_state=0;
	var elem=document.getElementById(x);
	var par=elem.parentNode.parentNode;
	par.removeChild(elem.parentNode);
}

//to reply to a comment
function replyfn(x){
	if (reply_state==1)
		return 0;
	else{
		stat_state=1;
		comment_state=1;
		reply_state=1;
		var elem=document.getElementById(x);
		var maindiv=elem.parentNode;
		
		var cdiv=document.createElement("div");
		var txt=document.createElement("input");
		txt.setAttribute("type","text");
		txt.setAttribute("id","rep"+cc);
		txt.setAttribute("placeholder","Enter your reply here");
		var savebtn=document.createElement("input");
		savebtn.setAttribute("value","Reply");
		savebtn.setAttribute("id","repsave"+cc);
		savebtn.setAttribute("type","button");
		savebtn.setAttribute("onclick","rep(this.id)");
		
		maindiv.appendChild(cdiv);
		cdiv.appendChild(txt);
		cdiv.appendChild(savebtn);
	}
}

//to read reply and save it
function rep(x){
	var elem=document.getElementById(x);
	var maindiv=elem.parentNode;
	var s=maindiv.firstChild.value;
	
	if(s=='')
		sa();
	else{
		maindiv.removeChild(maindiv.firstChild);
		maindiv.removeChild(maindiv.firstChild);
		cc++;
		maindiv.innerHTML="<p style=\"position: relative;left: 15vw;\">Reply :  "+s+"</p>";
		stat_state=0;
		comment_state=0;
		reply_state=0;
	}
}

//to read comment and save it
function com(x){
	var elem=document.getElementById(x);
	var maindiv=elem.parentNode;
	var s=maindiv.firstChild.value;
	if(s=='')
		sa();
	else{
		maindiv.removeChild(maindiv.children[1]);
		
		var replybtn=document.createElement("input");
		replybtn.setAttribute("type","button");
		replybtn.setAttribute("id","repbtn"+String(cc));
		replybtn.setAttribute("value","Reply to comment");
		replybtn.setAttribute("onclick","replyfn(this.id)");
		cc++;
		maindiv.innerHTML="<p style=\"position: relative;left: 10vw;\">Comment : "+s+"</p>";
		maindiv.appendChild(replybtn);
		stat_state=0;
		comment_state=0;
	}
}
