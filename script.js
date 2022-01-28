/*
	*
	*	Demo 1: Elements
	*
	*/
	
  var dragElements = document.getElementsByTagName('li');
	var dropAreaBox = document.getElementById('dropAreaBox');
	var currentlyDragElement = null;
	
	for(var i = 0; i<dragElements.length; i++) {
		// Event Listener for when the drag interaction starts.
		dragElements[i].ondragstart = function(event) {
			event.dataTransfer.effectAllowed = 'move';
			event.dataTransfer.setData('text', this.innerHTML);
			currentlyDragElement = this;
			//event.dataTransfer.setDragImage(event.target, 100,0);
		}
		// Event Listener for when the drag interaction finishes.
		dragElements[i].ondragend = function() {
		 	currentlyDragElement = null;
		}
	};
	
	//enable drop area
	dropAreaBox.ondragover = function(event) {
	    event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
	}
	
	//hover effect on drop element
	dropAreaBox.ondragenter = function(event) {   
	   this.className = 'dropBoxHover';
	}
	dropAreaBox.ondragleave = function(event) {
	   this.className = '';	
	}
	
	// Event Listener for when the dragged element dropped in the drop zone.
	dropAreaBox.ondrop = function (event) {
	    event.preventDefault();
		event.stopPropagation();
		var data = event.dataTransfer.getData('text');
		this.innerHTML = 'Dropped ' + data;
		
		// Remove the element from the list.
		document.getElementsByTagName('ul')[0].removeChild(currentlyDragElement);
		
		//hover effect on drop area
		if(data == "Blue Box") this.className = 'blueBoxHover';
		else if(data == "Turquoise box") this.className = 'turquoiseBoxHover';
		else if(data == "Green box") this.className = 'greenBoxHover';
		else if(data == "Yellow box") this.className = 'yellowBoxHover';
		else if(data == "Orange box") this.className = 'orangeBoxHover';
 
		if(currentlyDragElement.id == 'resetBox') {
		   //location.reload();
       history.go(0);
		   this.innerHTML = 'Drop a box Here!';
		}
	}

	/**
	*
	*	Demo 2: text files
	*
	*/
	var dropAreaText = document.getElementById('dropAreaText');
	var pre = document.getElementsByTagName('pre')[0];
	var span = document.getElementsByTagName('span')[1];
	
    dropAreaText.ondragover = function(e) {
	    e.preventDefault();
		e.stopPropagation();
	}
	
	//hover effect on drop element
	dropAreaText.ondragenter = function(e) {
	   this.className = 'dropBoxHover';
	}
	dropAreaText.ondragleave = function(e) {
		this.className = '';
	}
	
    dropAreaText.ondrop = function(event) {
		event.preventDefault();
		event.stopPropagation();
		this.className = '';
		var file = event.dataTransfer.files[0];
		
		//display information about file
		pre.innerHTML = 'File name: ' + file.name + '<br>'
		                + 'File size: ' + file.size + '<br>'
					        	+ 'File type: ' + file.type + '<br><br>' ;
		
		if(file.type == 'text/plain') {
			var reader = new FileReader();
			reader.onload = function(e) {
			  var text = reader.result;
			  span.innerHTML = '<strong>Context of file: </strong>' + text;
			  dropAreaText.innerHTML = 'Thank you';
			  dropAreaText.style.color = '#ACACAC';
			}
			reader.readAsText(file);
		} else {
			this.innerHTML = 'Wrong format';
			this.style.color = 'red';
			span.innerHTML = '';
		  }
	}