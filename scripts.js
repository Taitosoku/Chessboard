function draw(){
  // global variables
  var highlighted = [];
  var container = document.createElement("div");
  var spaces = [];
  var hl = false;
  var oldLocation; // where the pawn is before we move it
  var currentLocation; // where you clicked
  //var row, column;

  // create an array of squares
  for(var row=0; row < 8; row++){ //rows
    spaces[row] = [];
    for(var column = 0; column < 8; column++){ // columns
      createDiv(row,column);
    }
   }
   
   // determine each div's color and piece by original position
   function createDiv(row,column){
     // Create our Divs
     spaces[row][column] = document.createElement("div");
     spaces[row][column].id = String.fromCharCode(row+65) + (column+1) // determine the id
     container.appendChild(spaces[row][column]);
      
     // determines the pieces class
     function position(row,column){
       if(row == 1 || row == 6){return "pawn";}
       else if (row == 0 || row == 7){
        if (column == 0 || column == 7 ){return "castle";}
        else if(column == 1 || column == 6){return "knight";}
        else if (column == 2 || column == 5) {return "bishop";}
        else if (column == 4){return "queen";}
        else if (column == 3){return "king";}
        else {return "WTF!";}
       }
     } // end position  
    
     // if the piece black or white?
     function color(row){
       if (row === 0 || row === 1){return "white";}
       else if (row === 6 || row === 7) {return "black";}
       else {return "What Are You?!";}
     } // end color 
    
     //for the sake that the images in the divs are linked to the old classname
     function character_class(position,color){
    
     }

     spaces[row][column].className = position(row,column);
     spaces[row][column].color = color(row);     
    
     // revert any highlighted spaces
	   spaces[row][column].reverse = function(){
		   spaces[row][column].style.backgroundColor = (column % 2) != (row % 2) ? "red": "white";
     }; // end reverse function 
				
	   spaces[row][column].reverse(); // reset the board colors
	   
     // when the user clicks a square
     spaces[row][column].onclick = function(){
	   
       // onclick this is now our current location 
       currentLocation = spaces[row][column];
     
       function move(){
		     for (var i = 0; i < highlighted.length; i++){
			     if (currentLocation == highlighted[i]){
				     currentLocation.className = oldLocation.className // pass along the piece's class
             oldLocation.className = "";  // clear oldLocation's background-image
		 		   }
				   highlighted[i].reverse();
			   }
			   hl = false;
		   } // end move()
						
		   function showAvailableMoves() {
         while(highlighted.length){ // while length of highlighted > 0
				   highlighted.pop().reverse(); // pop out all the old selected tiles
			   }
         //highlighted.push(spaces[row-1][column]);
         switch(true){
           case currentLocation.className == "pawn":
             pawn_showAvailableSpaces(currentLocation.color);
             break;
           case currentLocation.className == "castle":
             castle_showAvailableSpaces(currentLocation.color);
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
		   } // end showAvailableMoves()
      
       function pawn_showAvailableSpaces(color){
         if (color == "black"){
           if (row - 1 >= 0){ // check that square isn't off the edge of the board
             // we want to check all three possibilities
             if (spaces[row-1][column].className == ""){// nothing in front of us so go
               highlighted.push(spaces[row-1][column]);
             }
             // if the spaces diagonal from the pawn are taken by a piece we can
             // move there and take it
             if (column - 1 >= 0){
               if (spaces[row-1][column-1].color != color){
                 highlighted.push(spaces[row-1][column-1]);
               }
             }
             if (column + 1 <= 7){
               if (spaces[row-1][column+1].color != color){
                 highlighted.push(spaces[row-1][column+1]);
               }
             }
           }
         }
         else if (color == "white") {
           if(row + 1 <= 7){
             if (spaces[row+1][column].className == ""){
               highlighted.push(spaces[row+1][column]);
             }
             if(column - 1 >= 0){
               if (spaces[row+1][column-1].color != color){
                 highlighted.push(spaces[row+1][column-1]);
               }
             }
             if (column + 1 <= 7){
               if (spaces[row+1][column+1].color != color){
                 highlighted.push(spaces[row+1][column+1]);
               }
             }
           }
         }
         // otherwise this piece isn't correct and we don't want to move it
         else {console.log("The color passed to pawn_show available spaces: " + color);}
       } // end pawn_showAvailableSpaces

       function castle_showAvailableMoves(color){
         // to the north
         if (row - 1 >= 0){ // check that square isn't off the edge of the board
           for (n = row; n > 0; n--){
             //making sure that you can't go through your teammates
             if (spaces[n][column].color != color){
               highlighted.push(spaces[n][column]);
             }
             else {break;}
           }
         }
         // to the south
         if (row + 1 <= 7){
           for (n = row; n < 7; n++){
             if(spaces[n][column].color != color){
               highlighted.push(spaces[n][column]);
             }
             else {break;}
           }
         }    
         // to the west
         if (column - 1 >= 0){
           for (n = column; n > 0; n--){
             if(spaces[row][n].color != color){
               highlighted.push(spaces[row][n]);
             }
             else {break;}
           }
         }
         // to the east
         if (column + 1 <= 7){
           for (n = column; n < 7; n++){
             if(spaces[row][n].color != color){
               highlighted.push(spaces[row][n]);
             }
             else{break;}
           }
         }
       } // castle_showAvailableMoves()

		   spaces[row][column].reverse(); // unhighlight squares
		   //currentLocation = spaces[row][column];
		   if(hl) {move();}
		   else{showAvailableMoves();}
	
	   }// end onclick() 
   }// end CreateDiv

	document.body.appendChild(container);
	container.className = "board";
} //end of draw
    
