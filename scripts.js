			function draw(){
				var highlighted = [];
				var container = document.createElement("div");
				var spaces = [];
				for(var row=0; row < 8; row++){ //rows
					spaces[row] = [];
					for( var column = 0; column < 8; column++){ // columns
					 	createDiv(row,column);
					}
				}
				function createDiv(row,column){
					var oldLocation; // where the pawn is before we move it
					// Create our Divs
					spaces[row][column] = document.createElement("div");
					spaces[row][column].id = String.fromCharCode(row+65) + (column+1) 
					container.appendChild(spaces[row][column]);
					// set starting space
					if(spaces[row][column].id == "F5"){spaces[row][column].className="pawn";}

					
					spaces[row][column].reverse = function(){
						spaces[row][column].style.backgroundColor = (column % 2) != (row % 2) ? "red": "white";
					}
					
					spaces[row][column].reverse();
					spaces[row][column].onclick = function(){
						var currentLocation = spaces[row][column];
						// are you clicking on a highlighted space?
						function move(){
							for (var i = 0; i < highlighted.length; i++){
								if (currentLocation == highlighted[i]){
									// clear oldLocation's background-image
									oldLocation.className = "";
									// move pawn icon to currentLocation
									currentLocation.className="pawn";
								}
							}
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
							// color them yellow
							for(var it = 0; it < highlighted.length; it ++){
								highlighted[it].style.backgroundColor = "yellow";
							}
							hl = true; // highlighted flag == true
							console.log("hl = " + hl);
						}
						console.log("hl = " + hl);
						oldLocation = spaces[row][column]; // setting old location before we do anything else
						spaces[row][column].reverse(); // unhighlight squares
						console.log("Clicked " + spaces[row][column].id); // log clicks
						(hl ? move() : showAvailableMoves());// highlight or move
	
					}
				}
				document.body.appendChild(container);
				container.className = "board";
			}