			function draw(){
				var highlighted = [];
				var container = document.createElement("div");
				var spaces = [];
				var hl = false;
				var oldLocation; // where the pawn is before we move it
				var currentLocation; // where you clicked
				var pawn = new Pawn();
				console.log("strength = " + pawn.strength);
				console.log("defense = " + pawn.defense);
				for(var row=0; row < 8; row++){ //rows
					spaces[row] = [];
					for( var column = 0; column < 8; column++){ // columns
					 	createDiv(row,column);
					}
				}
				function createDiv(row,column){
					// Create our Divs
					spaces[row][column] = document.createElement("div");
					spaces[row][column].id = String.fromCharCode(row+65) + (column+1) 
					container.appendChild(spaces[row][column]);
					// set starting space
					if(spaces[row][column].id == "F5"){
						spaces[row][column].className="pawn";
						oldLocation = spaces[row][column]; // start the old location here
						console.log("old location = " + oldLocation.id);
					}
					
					function BoardSetup(){
						if (String.fromCharCode(row+65) == 'B' || String.fromCharCode(row+65) == 'G'){
							// these are all pawns
							spaces[row][column].className = "pawn";
						}
            else if(String.fromCharCode(row+65) == 'A' || String.fromCharCode(row+65) == 'H'){
              if (column == 6 || column == 3){
                spaces[row][column].className = "bishop";
              }
              //else if (column == 
            }
					}
          BoardSetup();

					spaces[row][column].reverse = function(){
						spaces[row][column].style.backgroundColor = (column % 2) != (row % 2) ? "red": "white";
					}
					
					spaces[row][column].reverse(); // reset the board colors
					spaces[row][column].onclick = function(){
						// are you clicking on a highlighted space?
						function move(){
							for (var i = 0; i < highlighted.length; i++){
								if (currentLocation == highlighted[i]){
									// clear oldLocation's background-image
									oldLocation.className = "";
									// move pawn icon to currentLocation
									currentLocation.className="pawn";
									oldLocation = currentLocation;
								}
								highlighted[i].reverse();
							}
							hl = false;
						}
						
						function showAvailableMoves(){
							while(highlighted.length){ // while length of highlighted > 0
								highlighted.pop().reverse(); // pop out all the old selected tiles
							}
							// boundaries/ add new tiles to be highlighted
							if(column-1 >= 0){
								highlighted.push(spaces[row][column-1]);
							}
							if(column+1 <= 7){
								highlighted.push(spaces[row][column+1]);
							}
							if(row-1 >= 0){
								highlighted.push(spaces[row-1][column]);
							}
							if(row+1 <= 7){
								highlighted.push(spaces[row+1][column]);
							}
							highlighted.push(spaces[row][column]);
							// color them yellow
							for(var it = 0; it < highlighted.length; it ++){
								highlighted[it].style.backgroundColor = "yellow";
							}
							hl = true; // highlighted flag == true
							console.log("hl = " + hl);
						}
						console.log("hl = " + hl);
						spaces[row][column].reverse(); // unhighlight squares
						currentLocation = spaces[row][column];
						console.log("currentLocation = " + currentLocation.id);
						console.log("Clicked " + spaces[row][column].id); // log clicks
						if(hl) {move();}
						else{showAvailableMoves();}
	
					}
				}
				document.body.appendChild(container);
				container.className = "board";
			}
			function Pawn(){
				function rand(min,max){
					return Math.floor(Math.random() * (max - min) + min);
				}
				this.movement = 2;
				this.strength = rand(0,4); // id4 0 == a miss
				this.healthPoints = 6;
			}
