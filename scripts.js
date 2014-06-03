function draw(){
  // global variables
  var highlighted = [];
  var container = document.createElement("div");
	var spaces = [];
	var hl = false;
	var oldLocation; // where the pawn is before we move it
	var currentLocation; // where you clicked

  // create an array of squares
  for(var row=0; row < 8; row++){ //rows
	  spaces[row] = [];
	  for( var column = 0; column < 8; column++){ // columns
		  createDiv(row,column);
		}
	}

    function createDiv(row,column){
	  // Create our Divs
		spaces[row][column] = document.createElement("div");
		spaces[row][column].id = String.fromCharCode(row+65) + (column+1) // determine the id
		container.appendChild(spaces[row][column]);
	 					
	  function BoardSetup(){
     // set up classes
     if (String.fromCharCode(row+65) == 'B') {spaces[row][column].className = "white_pawn";}
     else if(String.fromCharCode(row+65) == 'G'){spaces[row][column].className = "black_pawn";} 
     
     if (String.fromCharCode(row+65) == 'H'){
       if (column == 5 || column == 2){spaces[row][column].className = "black_bishop";}
       else if (column == 1 || column == 6){spaces[row][column].className ="black_knight";}
       else if (column == 0 || column == 7) {spaces[row][column].className = "black_castle";}
       else if (column == 3){spaces[row][column].className = "black_queen";}
       else if (column == 4){spaces[row][column].className = "black_king";}
     }
     else if(String.fromCharCode(row+65) == 'A'){
       if (column == 5 || column == 2){ spaces[row][column].className = "white_bishop";}
       else if (column == 1 || column == 6) {spaces[row][column].className="white_knight";}
       else if (column == 0 || column == 7) {spaces[row][column].className = "white_castle";}
       else if (column == 3){spaces[row][column].className = "white_queen";}
       else if (column == 4) {spaces[row][column].className = "white_king";}
     }
     //currentLocation = oldLocation;
	 }
   BoardSetup();
   
   // revert any highlighted spaces
	 spaces[row][column].reverse = function(){
		 spaces[row][column].style.backgroundColor = (column % 2) != (row % 2) ? "red": "white";
   }
				
	 spaces[row][column].reverse(); // reset the board colors
	 // when the user clicks a square
   spaces[row][column].onclick = function(){
	   // onclick this is now our current location 
     currentLocation = spaces[row][column];
		 console.log(currentLocation.className) 
     function move(){
		   for (var i = 0; i < highlighted.length; i++){
			   if (currentLocation == highlighted[i]){
				   currentLocation.className = oldLocation.className // pass along the piece's class
           oldLocation.className = "";  // clear oldLocation's background-image
		 		 }
				 highlighted[i].reverse();
			 }
			 hl = false;
		 }
						
		 function showAvailableMoves() {
       console.log("enter show available spaces")
       while(highlighted.length){ // while length of highlighted > 0
				 highlighted.pop().reverse(); // pop out all the old selected tiles
			 }
       //highlighted.push(spaces[row-1][column]);
       switch(true){
         case currentLocation.className == "black_pawn" || currentLocation.className == "white_pawn":
           pawn_showAvailableSpaces(currentLocation.className);
           // repopulates highlighted with pawnspecific spaces
           break;
         case currentLocaiton.className == "black_castle" || currentLocation.className == "white_castle":
           castle_showAvailableSpaces(currentLocation.className);
           break;
         case "black_bishop":
           break;
         case "black knght":
           break;
         case "black_queen":
       }
  		 for(var it = 0; it < highlighted.length; it ++){
				 highlighted[it].style.backgroundColor = "yellow";
			 }
			 hl = true; // highlighted flag == true
       // the square you clicked on is now the old location and the highlighted
       // squares are now the possible new (current)locations
       oldLocation = currentLocation;
		 }
      
     function pawn_showAvailableSpaces(color){
       if (color == "black_pawn"){
         if (row - 1 >= 0){ // check that square isn't off the edge of the board
           // we want to check all three possibilities
           if (spaces[row-1][column].className == ""){
             highlighted.push(spaces[row-1][column]);
           }
           // if the spaces diagonal from the pawn are taken by a piece we can
           // move there and take it
           if (column - 1 >= 0){
             if (spaces[row-1][column-1].className.indexOf("white") != -1){
               highlighted.push(spaces[row-1][column-1]);
             }
           }
           if (column + 1 <= 7){
             if (spaces[row-1][column+1].className.indexOf("white") != -1){
               highlighted.push(spaces[row-1][column+1]);
             }
           }
         }
           //call_draw.showAvailableSpaces(highlighted);
       }
       else if (color == "white_pawn") {
         if(row + 1 <= 7){
           if (spaces[row+1][column].className == ""){
             highlighted.push(spaces[row+1][column]);
           }
           if(column - 1 >= 0){
             if (spaces[row+1][column-1].className.indexOf("black") != -1){
               highlighted.push(spaces[row+1][column-1]);
             }
           }
           if (column + 1 <= 7){
             if (spaces[row+1][column+1].className.indexOf("black") != -1){
               highlighted.push(spaces[row+1][column+1]);
             }
           }
         }
       }
       // otherwise this piece isn't correct and we don't want to move it
       else {console.log("The color passed to pawn_show available spaces: " + color);}
     }

     function castle_showAvailableMoves(color){
      if (color == "black_castle"){
         if (row - 1 >= 0){ // check that square isn't off the edge of the board
           // check for blockage to the north
           for (n = row; n > 0; n--){
             if (spaces[n][column].className == ""){
               highlighted.push(spaces[n][column]);
             }
           }
         }    
           //call_draw.showAvailableSpaces(highlighted);
       }
       else if (color == "white_castle") {
         /*if(row + 1 <= 7){
           if (spaces[row+1][column].className == ""){
             highlighted.push(spaces[row+1][column]);
           }
           if (spaces[row+1][column-1].className.indexOf("black") != -1){
             highlighted.push(spaces[row+1][column-1]);
           }
           if (spaces[row+1][column+1].className.indexOf("black") != -1){
             highlighted.push(spaces[row+1][column+1]);
           }
         }*/
       }
     }

		 spaces[row][column].reverse(); // unhighlight squares
		 //currentLocation = spaces[row][column];
		 console.log("currentLocation = " + currentLocation.id);
		 console.log("Clicked " + spaces[row][column].id); // log clicks
		 if(hl) {move();}
		 else{showAvailableMoves();}
	
	  }
  }

	document.body.appendChild(container);
	container.className = "board";
}
    
function rand(min,max){
  return Math.floor(Math.random() * (max - min) + min);
}

